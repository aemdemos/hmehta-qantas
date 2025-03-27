export default function parse(element, {document}) {
  // Extract the image
  const imgElement = element.querySelector('img');
  const imageSrc = imgElement ? imgElement.src : '';

  // Extract the link
  const linkElement = element.querySelector('a');
  const linkHref = linkElement ? linkElement.href : '';

  // Create the header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Image';
  const headerRow = [headerCell];

  // Create the content rows
  const cells = [
    headerRow,
    [imgElement, linkHref],
  ];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}