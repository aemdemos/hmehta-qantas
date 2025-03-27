export default function parse(element, {document}) {
  const ul = element.querySelector('ul');
  const topics = [...ul.querySelectorAll('li.topic')];

  const cells = [];

  // Header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Cards';
  const headerRow = [headerCell];
  cells.push(headerRow);

  topics.forEach((topic) => {
    const imageSrc = topic.querySelector('.topics-background')?.src;
    const title = topic.querySelector('.topic-title')?.textContent;
    const link = topic.querySelector('.topic-overlay')?.href;

    // Handle missing data gracefully
    if (!imageSrc || !title || !link) return;

    // Create image element
    const imgElement = document.createElement('img');
    imgElement.src = imageSrc;
    imgElement.alt = title;

    // Create title element
    const titleElement = document.createElement('strong');
    titleElement.textContent = title;

    // Create link element
    const linkElement = document.createElement('a');
    linkElement.href = link;
    linkElement.textContent = 'Learn more';

    cells.push([imgElement, [titleElement, document.createElement('br'), linkElement]]);
  });

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}