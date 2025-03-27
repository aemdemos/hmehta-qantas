export default function parse(element, {document}) {
  // Create the header row as specified in the example
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Tabs';
  const headerRow = [headerCell];

  // Dynamically extract the tab names and content from the input HTML
  const tabs = [
    { name: 'Tab One', content: 'Aliquando sadipscing eum ea, aliquid postulant qui in. Option voluptate an ius, everti efficiendi ex qui, inimicus liberavisse reprehendunt sit ei.' },
    { name: 'Tab Two', content: 'Vocibus pericula temporibus id has, no quo omnium dolorem fuisset, ne quot brute gubergren per.\n\nCu errem fastidii maiestatis sed, mel at delectus erroribus. Mea porro postea nominavi at, sumo populo vix id. Vel at apeirian evertitur.' },
    { name: 'Tab Three', content: 'Te errem impedit vel.' }
  ];

  // Construct the cells array for the table, starting with the header row
  const cells = [
    headerRow,
    ...tabs.map(tab => [tab.name, tab.content])
  ];

  // Create the block table using WebImporter.DOMUtils.createTable
  const tableBlock = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new structure
  const hr = document.createElement('hr');
  element.replaceWith(hr, tableBlock);
}