export default function parse(element, {document}) {
  const cards = [];

  const gridItems = element.querySelectorAll('.grid-item');

  gridItems.forEach((item) => {
    const imageWrapper = item.querySelector('.inner-image-wrapper img');
    const image = document.createElement('img');
    image.src = imageWrapper?.src || '';
    image.alt = imageWrapper?.alt || '';

    const titleLink = item.querySelector('.post-title');
    const title = document.createElement('strong');
    title.textContent = titleLink?.querySelector('h2')?.textContent || '';

    const meta = item.querySelector('.post-meta')?.textContent || '';
    const excerpt = item.querySelector('.excerpt')?.textContent || '';

    const content = document.createElement('div');
    if (meta || excerpt) {
      const metaParagraph = document.createElement('p');
      metaParagraph.textContent = meta;
      const excerptParagraph = document.createElement('p');
      excerptParagraph.textContent = excerpt;
      content.append(metaParagraph, excerptParagraph);
    }

    cards.push([image, [title, content]]);
  });

  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Cards';
  const headerRow = [headerCell];

  const cells = [
    headerRow,
    ...cards,
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}