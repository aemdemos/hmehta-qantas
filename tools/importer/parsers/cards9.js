export default function parse(element, {document}) {
  const galleriesModule = element.querySelector('.galleries-module');

  // Ensure galleriesModule exists
  if (!galleriesModule) {
    console.error('No galleries-module found in the provided element.');
    return;
  }

  const items = galleriesModule.querySelectorAll('li');

  // Create the header row for the table
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Cards';

  const cells = [headerRow];

  // Iterate through each gallery item
  items.forEach((item) => {
    const image = item.querySelector('img');
    const meta = item.querySelector('.gallery-meta');

    // Ensure both image and meta exist
    if (!image || !meta) {
      console.warn('Missing image or metadata for a gallery item, skipping.');
      return;
    }

    const imgElement = document.createElement('img');
    imgElement.src = image.src;
    imgElement.alt = image.alt;

    const metaElement = document.createElement('strong');
    metaElement.textContent = meta.textContent.trim();

    cells.push([imgElement, metaElement]);
  });

  // Create the table block
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}