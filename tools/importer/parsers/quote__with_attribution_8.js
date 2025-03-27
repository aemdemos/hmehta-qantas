export default function parse(element, {document}) {
  const cells = [];

  // Create the header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Quote';
  const headerRow = [headerCell];
  cells.push(headerRow);

  // Extract quote content
  const quoteContentElement = element.querySelector('.search-label');
  let quoteText = 'Default Quote Text'; // Default fallback
  if (quoteContentElement) {
    quoteText = quoteContentElement.textContent.trim();
  }
  cells.push([quoteText]);

  // Extract attribution or source
  const attributionElement = element.querySelector('.screen-reader-text');
  let attributionText = 'Attribution, Source'; // Default fallback
  if (attributionElement && attributionElement.textContent.trim()) {
    attributionText = attributionElement.textContent.trim();
  }
  cells.push([attributionText]);

  // Create the table using WebImporter.DOMUtils.createTable
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(blockTable);
}