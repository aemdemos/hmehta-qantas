export default function parse(element, {document}) {
  const galleriesModule = element.querySelector('.galleries-module');
  const galleryItems = galleriesModule.querySelectorAll('.gallery');

  // Create header row with strong tag
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Cards';
  const cells = [[headerCell]];

  galleryItems.forEach((gallery) => {
    const imageLink = gallery.querySelector('.gallery-image img');
    const titleLink = gallery.querySelector('.gallery-text .title');
    const description = gallery.querySelector('.gallery-description');

    const imageElement = document.createElement('img');
    imageElement.src = imageLink ? imageLink.src : '';

    const titleElement = document.createElement('p');
    titleElement.textContent = titleLink ? titleLink.textContent : '';

    const descriptionElement = description ? document.createElement('p') : null;
    if (descriptionElement) {
      descriptionElement.textContent = description.textContent;
    }

    const content = [titleElement];
    if (descriptionElement) {
      content.push(descriptionElement);
    }

    cells.push([imageElement, content]);
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}