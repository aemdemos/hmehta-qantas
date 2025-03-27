export default function parse(element, {document}) {
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Search';

  const searchForm = element.querySelector('form.search-form');
  const actionUrl = searchForm ? searchForm.getAttribute('action') : '';

  const link = document.createElement('a');
  link.href = actionUrl;
  link.textContent = actionUrl || 'No URL available';

  const cells = [
    headerRow,
    [link]
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block);
}