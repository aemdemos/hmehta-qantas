export default function parse(element, {document}) {
  // Create header row with strict adherence to example
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Footer Information';
  const headerRow = [headerCell];

  // Extract social links and ensure proper structure
  const socialLinks = element.querySelectorAll('.social-wrap .social li a');
  const socialCells = Array.from(socialLinks).map(link => {
    const linkContent = link.querySelector('.link-text');
    if (linkContent) {
      linkContent.textContent = linkContent.textContent.trim();
    }
    const icon = link.querySelector('i');
    return [link.cloneNode(true)]; // Include the full link content directly
  });

  // Extract useful links and ensure proper structure
  const usefulLinks = element.querySelectorAll('.useful-links ul li a');
  const usefulCells = Array.from(usefulLinks).map(link => {
    const linkContent = link.querySelector('.link-text');
    if (linkContent) {
      linkContent.textContent = linkContent.textContent.trim();
    }
    return [link.cloneNode(true)]; // Include the full link content directly
  });

  // Extract disclaimer links and ensure proper structure
  const disclaimerLinks = element.querySelectorAll('.disclaimer a');
  const disclaimerCells = Array.from(disclaimerLinks).map(link => {
    const linkContent = link.querySelector('.link-text');
    if (linkContent) {
      linkContent.textContent = linkContent.textContent.trim();
    }
    return [link.cloneNode(true)]; // Include the full link content directly
  });

  // Extract copyright text and structure it consistently
  const copyrightText = element.querySelector('.copyright p')?.textContent.trim();
  const copyrightCell = [document.createElement('p')];
  copyrightCell[0].textContent = copyrightText || '';

  // Compile cells array
  const cells = [
    headerRow,
    ...socialCells,
    ...usefulCells,
    ...disclaimerCells,
    [copyrightCell],
  ];

  // Create table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the new block
  element.replaceWith(block);
}