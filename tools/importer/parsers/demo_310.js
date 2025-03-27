export default function parse(element, {document}) {
  // Extract the image and its link
  const link = element.querySelector('a.swipebox');
  const img = link ? link.querySelector('img') : null;

  // Handle case where image or link may be missing
  const imgClone = img ? img.cloneNode(true) : document.createElement('span');
  imgClone.textContent = img ? '' : 'Image missing';

  // Create the headers dynamically to match the example structure
  const metadataHeader = document.createElement('strong');
  metadataHeader.textContent = 'Metadata';

  const componentInfoHeader = document.createElement('strong');
  componentInfoHeader.textContent = 'Component Information';

  // Create the cells for the block table
  const cells = [
    [metadataHeader],
    ['Title', 'Library metadata'],
    ['Image', imgClone],
    ['Breadcrumbs', 'true']
  ];

  // Create the block table for Metadata section
  const metadataTable = WebImporter.DOMUtils.createTable(cells, document);

  // Create section separator
  const sectionSeparator = document.createElement('hr');

  // Create the cells for the Component Information table
  const componentCells = [
    [componentInfoHeader],
    ['Name', 'Demo 3'],
    ['Description', 'Demo 3']
  ];

  // Create the block table for Component Information section
  const componentTable = WebImporter.DOMUtils.createTable(componentCells, document);

  // Create a container to hold both tables and separator
  const container = document.createElement('div');
  container.appendChild(metadataTable);
  container.appendChild(sectionSeparator);
  container.appendChild(componentTable);

  // Replace the original element with the new container
  element.replaceWith(container);
}