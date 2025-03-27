export default function parse(element, {document}) {
  const cells = [];

  // Extracting header dynamically
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Search (minimal)';
  const headerRow = [headerCell];
  cells.push(headerRow);

  // Extracting link dynamically
  const linkElement = element.querySelector('a');
  if (linkElement) {
    const searchLink = document.createElement('a');
    searchLink.href = linkElement.href;
    searchLink.textContent = linkElement.href;
    cells.push([searchLink]);
  } else {
    // Handle missing link case
    cells.push(['No link available']);
  }

  // Creating the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}