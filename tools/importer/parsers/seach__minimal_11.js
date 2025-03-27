export default function parse(element, {document}) {
  // Extract the link associated with the search functionality
  const searchLink = element.querySelector('a#_qantas_search_go');
  const searchHref = searchLink ? searchLink.href : '';

  // Create the header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Search (minimal)';
  const headerRow = [headerCell];

  // Create the content row dynamically
  const contentCell = document.createElement('a');
  if (searchHref) {
    contentCell.href = searchHref;
    contentCell.textContent = searchHref;
  } else {
    contentCell.textContent = 'No link available';
  }
  const contentRow = [contentCell];

  // Create the table structure
  const cells = [
    headerRow,
    contentRow
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}