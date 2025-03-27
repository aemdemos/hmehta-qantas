export default function parse(element, {document}) {
  // Extract the search input and related data
  const searchLabel = element.querySelector('label[for="sli_search_1"]');
  const searchInput = element.querySelector('#sli_search_1');
  const searchButton = element.querySelector('#_qantas_search_go');
  const searchLink = searchButton.href;

  // Create the header row
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Search';

  // Create the content row dynamically based on extracted content
  const linkElement = document.createElement('a');
  linkElement.href = searchLink;
  linkElement.textContent = searchLink;

  const contentRow = [
    searchLabel ? searchLabel.textContent : 'Search Qantas.com',
    linkElement
  ];

  // Create the table element
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original element with the table
  element.replaceWith(table);
}