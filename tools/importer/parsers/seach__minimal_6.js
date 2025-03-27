export default function parse(element, {document}) {
  // Extracting relevant content dynamically from the element
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Search (minimal)';

  const searchInput = element.querySelector('input');
  const placeholderText = searchInput?.getAttribute('placeholder') || 'No placeholder available';

  const searchIcon = element.querySelector('#_qantas_search_go img');
  const searchIconElement = searchIcon
    ? document.createElement('img')
    : document.createTextNode('No icon available');
  if (searchIcon) {
    searchIconElement.src = searchIcon.getAttribute('src');
    searchIconElement.alt = searchIcon.getAttribute('alt');
  }

  const searchLink = element.querySelector('a[href]');
  const linkElement = document.createElement('a');
  linkElement.href = searchLink?.href || '';
  linkElement.textContent = searchLink?.href || 'No link available';

  // Constructing the cells array for the block table
  const cells = [
    [headerCell], // Header row
    [`Placeholder: ${placeholderText}`],
    [searchIconElement],
    [linkElement],
  ];

  // Creating the block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replacing the original element with the new block table
  element.replaceWith(blockTable);
}