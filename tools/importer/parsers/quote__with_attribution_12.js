export default function parse(element, {document}) {
  // Import helper function
  const createTable = WebImporter.DOMUtils.createTable;

  // Extract relevant content from the input section dynamically
  const title = document.querySelector('.main-section .module-title');
  const sidebarIntro = document.querySelector('.sidebar-intro');

  if (!title || !sidebarIntro) {
    console.error('Required elements are missing. Returning without processing.');
    return;
  }

  // Ensure table header format matches example exactly
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Quote';
  const headerRow = [headerCell];

  // Extract additional content dynamically if available
  const titleContent = title.cloneNode(true); // Clone the title node to preserve structure
  const sidebarContent = sidebarIntro.cloneNode(true); // Clone the sidebar node

  // Create the table cells array with structured content
  const cells = [
    headerRow,
    [titleContent],
    [sidebarContent],
  ];

  // Create the block table using createTable
  const blockTable = createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}