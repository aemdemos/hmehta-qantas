/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/* global window, WebImporter, XPathResult */
/* eslint-disable no-console */
import columns__two_columns_1Parser from './parsers/columns__two_columns_1.js';
import columns__two_columns_2Parser from './parsers/columns__two_columns_2.js';
import seach__minimal_3Parser from './parsers/seach__minimal_3.js';
import cards4Parser from './parsers/cards4.js';
import seach__minimal_6Parser from './parsers/seach__minimal_6.js';
import columns__two_columns_7Parser from './parsers/columns__two_columns_7.js';
import quote__with_attribution_8Parser from './parsers/quote__with_attribution_8.js';
import cards9Parser from './parsers/cards9.js';
import demo_310Parser from './parsers/demo_310.js';
import seach__minimal_11Parser from './parsers/seach__minimal_11.js';
import quote__with_attribution_12Parser from './parsers/quote__with_attribution_12.js';
import cards13Parser from './parsers/cards13.js';
import search14Parser from './parsers/search14.js';
import cards15Parser from './parsers/cards15.js';
import cards16Parser from './parsers/cards16.js';
import search17Parser from './parsers/search17.js';
import search18Parser from './parsers/search18.js';
import fragment19Parser from './parsers/fragment19.js';
import tabs20Parser from './parsers/tabs20.js';
import table21Parser from './parsers/table21.js';
import youtube22Parser from './parsers/youtube22.js';
import demo_323Parser from './parsers/demo_323.js';
import cards24Parser from './parsers/cards24.js';
import search25Parser from './parsers/search25.js';

import headerParser from './parsers/header.js';

import {
  generateDocumentPath,
  handleOnLoad,
  postTransformRules,
  preTransformRules,
} from './import.utils.js';

WebImporter.Import = {
  isEmpty: (cells) => {
    if (Array.isArray(cells)) {
      return cells.length === 0;
    } else if (typeof cells === 'object' && cells !== null) {
      return Object.keys(cells).length === 0;
    }
    return !cells;
  },
  getElementByXPath: (document, xpath) => {
    const result = document.evaluate(
      xpath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null,
    );
    return result.singleNodeValue;
  },
  getFragmentXPaths: (instances, url) => instances
    .filter((instance) => instance.url === url)
    .map(({ xpath }) => xpath),
};

const parsers = {
      'Columns (two columns) 1': columns__two_columns_1Parser,
    'Columns (two columns) 2': columns__two_columns_2Parser,
    'Seach (minimal) 3': seach__minimal_3Parser,
    'Cards 4': cards4Parser,
    'Seach (minimal) 6': seach__minimal_6Parser,
    'Columns (two columns) 7': columns__two_columns_7Parser,
    'Quote (with attribution) 8': quote__with_attribution_8Parser,
    'Cards 9': cards9Parser,
    'Demo 3 10': demo_310Parser,
    'Seach (minimal) 11': seach__minimal_11Parser,
    'Quote (with attribution) 12': quote__with_attribution_12Parser,
    'Cards 13': cards13Parser,
    'Search 14': search14Parser,
    'Cards 15': cards15Parser,
    'Cards 16': cards16Parser,
    'Search 17': search17Parser,
    'Search 18': search18Parser,
    'Fragment 19': fragment19Parser,
    'Tabs 20': tabs20Parser,
    'Table 21': table21Parser,
    'Youtube 22': youtube22Parser,
    'Demo 3 23': demo_323Parser,
    'Cards 24': cards24Parser,
    'Search 25': search25Parser,
};

/**
* Page transformation function
*/
function transformPage(main, { inventory: { fragments = [], blocks = [] }, ...source }) {
  const { document, params: { originalURL } } = source;

  // first, get dom elements for each block for the current page
  const blockElements = blocks.map((block) => {
    const foundInstance = block.instances.find((instance) => instance.url === originalURL);
    if (foundInstance) {
      /* eslint-disable no-param-reassign */
      block.element = WebImporter.Import.getElementByXPath(document, foundInstance.xpath);
    }
    return block;
  });
  // also get all fragment elements for the current page
  const fragmentElements = fragments.flatMap((frg) => frg.instances)
    .filter((instance) => instance.url === originalURL)
    .map((instance) => WebImporter.Import.getElementByXPath(document, instance.xpath));

  // remove fragment elements
  fragmentElements.forEach((element) => {
    element.remove();
  });

  // transform all blocks using parsers
  blockElements.forEach(({ name, cluster, element }) => {
    const parserFn = parsers[`${name} ${cluster}`];

    if (!parserFn) return;

    try {
      parserFn.call(this, element, { ...source });
    } catch (e) {
      console.warn(`Failed to parse block: ${name} from cluster: ${cluster}`, e);
    }
  });
}

/**
* Fragment transformation function
*/
function transformFragment(main, { fragment, inventory, ...source }) {
  const { document, params: { originalURL } } = source;

  if (fragment.name === 'nav') {
    const navEl = document.createElement('div');

    // get number of blocks in the nav fragment
    const navBlocks = Math.floor(fragment.instances.length / fragment.instances.filter((ins) => ins.uuid.includes('-00-')).length);
    console.log('navBlocks', navBlocks);

    for (let i = 0; i < navBlocks; i += 1) {
      const { xpath } = fragment.instances[i];
      const el = WebImporter.Import.getElementByXPath(document, xpath);
      if (!el) {
        console.warn(`Failed to get element for xpath: ${xpath}`);
      } else {
        navEl.append(el);
      }
    }

    // body width
    const bodyWidthAttr = document.body.getAttribute('data-hlx-imp-body-width');
    const bodyWidth = bodyWidthAttr ? parseInt(bodyWidthAttr, 10) : 1000;

    try {
      const headerBlock = headerParser(navEl, {
        ...source, document, fragment, bodyWidth,
      });
      main.append(headerBlock);
    } catch (e) {
      console.warn('Failed to parse header block', e);
    }
  } else {
    (fragment.instances || [])
      .filter(({ url }) => `${url}?frag=${fragment.name}` === originalURL)
      .map(({ xpath }) => ({
        xpath,
        element: WebImporter.Import.getElementByXPath(document, xpath),
      }))
      .filter(({ element }) => element)
      .forEach(({ xpath, element }) => {
        main.append(element);

        const fragmentBlock = inventory.blocks
          .find(
            ({ instances }) => instances
              .find(({ url, xpath: blockXpath }) => `${url}?frag=${fragment.name}` === originalURL && blockXpath === xpath),
          );

        if (!fragmentBlock) return;
        const { name, cluster } = fragmentBlock;
        const parserFn = parsers[`${name} ${cluster}`];
        if (!parserFn) return;

        try {
          parserFn.call(this, element, source);
        } catch (e) {
          console.warn(`Failed to parse block: ${name} from cluster: ${cluster} with xpath: ${xpath}`, e);
        }
      });
  }
}

export default {
  onLoad: async (payload) => {
    await handleOnLoad(payload);
  },

  transform: async (source) => {
    const { document, url, params: { originalURL } } = source;

    // sanitize the original URL
    const sanitizedOriginalURL = new URL(originalURL).href;
    /* eslint-disable no-param-reassign */
    source.params.originalURL = sanitizedOriginalURL;

    /* eslint-disable-next-line prefer-const */
    let publishUrl = window.location.origin;
    // $$publishUrl = '{{{publishUrl}}}';

    let inventory = null;
    // $$inventory = {{{inventory}}};
    if (!inventory) {
      // fetch the inventory
      const inventoryUrl = new URL('/tools/importer/inventory.json', publishUrl);
      try {
        const inventoryResp = await fetch(inventoryUrl.href);
        inventory = await inventoryResp.json();
      } catch (e) {
        console.error('Failed to fetch inventory');
      }
      if (!inventory) {
        return [];
      }
    }

    // pre-transform rules
    preTransformRules({
      root: document.body,
      document,
      url,
      publishUrl,
      originalURL,
    });

    // perform the transformation
    let main = null;
    let path = null;
    const sourceUrl = new URL(originalURL);
    const sourceParams = new URLSearchParams(sourceUrl.search);
    if (sourceParams.has('frag')) {
      // fragment transformation
      const fragName = sourceParams.get('frag');
      const fragment = inventory.fragments.find(({ name }) => name === fragName);
      if (!fragment) {
        return [];
      }
      main = document.createElement('div');
      transformFragment(main, { ...source, fragment, inventory });
      path = fragment.path;
    } else {
      // page transformation
      main = document.body;
      transformPage(main, { ...source, inventory });
      path = generateDocumentPath(source);
    }

    // post transform rules
    postTransformRules({
      root: main,
      document,
      originalURL,
    });

    return [{
      element: main,
      path,
    }];
  },
};
