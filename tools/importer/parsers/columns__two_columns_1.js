export default function parse(element, {document}) {
    // Helper function to create an HR element
    const createHr = () => document.createElement('hr');

    // Extract the title
    const titleEl = element.querySelector('.post-title a');
    const title = titleEl ? titleEl.textContent : '';

    // Extract the metadata
    const metaEl = element.querySelector('.post-meta');
    const metadata = metaEl ? metaEl.textContent.trim() : '';

    // Extract the excerpt
    const excerptEl = element.querySelector('.post-excerpt');
    const excerpt = excerptEl ? excerptEl.textContent.trim() : '';

    // Extract the image
    const imageEl = element.querySelector('.post-image img');
    const image = imageEl ? imageEl.cloneNode(true) : document.createTextNode('');

    // Extract the read more link
    const readMoreEl = element.querySelector('.read-more');
    const readMore = readMoreEl ? readMoreEl.cloneNode(true) : document.createTextNode('');

    // Prepare header row (block type declaration)
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Columns';
    const headerRow = [headerCell];

    // Prepare content rows
    const contentRow1 = [title, metadata];
    const contentRow2 = [excerpt, image];
    const contentRow3 = [readMore, createHr()];

    // Create block table
    const cells = [headerRow, contentRow1, contentRow2, contentRow3];
    const block = WebImporter.DOMUtils.createTable(cells, document);

    // Replace original element
    element.replaceWith(block);
}