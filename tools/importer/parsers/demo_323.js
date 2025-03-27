export default function parse(element, {document}) {
  // Dynamically extract posts and prepare table cells
  const posts = Array.from(element.querySelectorAll('li.post'));

  const cells = posts.map(post => {
    const titleLink = post.querySelector('h2.post-title a');
    const titleText = titleLink ? titleLink.textContent.trim() : '';
    const titleHref = titleLink ? titleLink.href : '';

    const postMeta = post.querySelector('.post-meta');
    const metaText = postMeta ? postMeta.textContent.trim() : '';

    const postExcerpt = post.querySelector('.post-excerpt.full p');
    const excerptText = postExcerpt ? postExcerpt.textContent.trim() : '';

    return [
      titleText,
      metaText,
      excerptText,
      titleHref
    ];
  });

  // Ensure the header row exactly matches the example
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Metadata'; // Example header text
  const headerRow = [headerCell];

  // Create the structured block table
  const blockTable = WebImporter.DOMUtils.createTable([headerRow, ...cells], document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}