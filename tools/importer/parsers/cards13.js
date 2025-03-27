export default function parse(element, {document}) {
  const cells = [];

  // Add header row
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Cards';
  cells.push(headerRow);

  // Process each 'li' element in the 'ul'
  const items = element.querySelectorAll('li.homepage-gallery');
  items.forEach((item) => {
    const link = item.querySelector('a');
    const image = link.querySelector('img');
    const title = link.querySelector('h3');

    if (image && title && link) { // Ensure all elements exist before processing
      const imgElement = document.createElement('img');
      imgElement.src = image.src;
      imgElement.alt = image.alt;

      const titleElement = document.createElement('strong');
      titleElement.textContent = title.textContent;

      const linkElement = document.createElement('a');
      linkElement.href = link.href;
      linkElement.textContent = link.href;

      cells.push([imgElement, [titleElement, linkElement]]);
    }
  });

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}