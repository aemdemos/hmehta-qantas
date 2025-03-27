export default function parse(element, {document}) {
  // Helper function to create tables
  const createTable = WebImporter.DOMUtils.createTable;

  // Extract relevant content dynamically
  const form = element.querySelector('.search-form');
  const actionUrl = form ? form.getAttribute('action') : '';

  // Handle edge case: missing action URL
  const link = document.createElement('a');
  if (actionUrl) {
    link.href = actionUrl;
    link.textContent = actionUrl;
  } else {
    link.textContent = 'No search URL available';
  }

  // Create the header row dynamically matching the example
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Search';

  // Create the content row
  const contentRow = [link];

  // Construct the cells array
  const cells = [
    headerRow, // Header row
    contentRow // Content row
  ];

  // Create the block table
  const blockTable = createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}