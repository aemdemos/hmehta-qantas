export default function parse(element, {document}) {
    const createTable = WebImporter.DOMUtils.createTable;

    // Helper function to replace element
    const replaceElement = (oldElement, newElement) => {
        oldElement.parentNode.replaceChild(newElement, oldElement);
    };

    // Extracting Twitter Section
    const twitterSection = element.querySelector('.sidebar-twitter .module-title');
    const twitterContent = twitterSection ? twitterSection.textContent.trim() : '';
    const twitterBlock = createTable([
        [document.createElement('strong').textContent = 'Twitter'],
        [twitterContent || 'Follow us on Twitter'],
    ], document);

    // Extracting Topics Section
    const topicsSection = element.querySelector('.sidebar-topics');
    const topics = topicsSection ? Array.from(topicsSection.querySelectorAll('.sidebar-topic a')).map((link) => [link.textContent.trim()]) : [];
    const topicsBlock = createTable([
        [document.createElement('strong').textContent = 'Topics'],
        ...topics,
    ], document);

    // Extracting Most Viewed Section
    const postsSection = element.querySelector('.sidebar-posts');
    const posts = postsSection ? Array.from(postsSection.querySelectorAll('.sidebar-post-title')).map((post) => {
        const title = post.querySelector('a')?.textContent.trim() || '';
        const meta = post.querySelector('.sidebar-post-meta')?.textContent.trim() || '';
        return [title, meta];
    }) : [];
    const postsBlock = createTable([
        [document.createElement('strong').textContent = 'Most Viewed'],
        ...posts,
    ], document);

    // Create final block with hr separating sections
    const hr = document.createElement('hr');
    const finalBlock = document.createDocumentFragment();
    finalBlock.appendChild(twitterBlock);
    finalBlock.appendChild(hr.cloneNode());
    finalBlock.appendChild(topicsBlock);
    finalBlock.appendChild(hr.cloneNode());
    finalBlock.appendChild(postsBlock);

    // Replace the original element with finalBlock
    replaceElement(element, finalBlock);
}