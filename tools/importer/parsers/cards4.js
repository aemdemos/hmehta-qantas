export default function parse(element, {document}) {
    // Extract the navigation links dynamically from the <nav> tag
    const navLinks = Array.from(element.querySelectorAll('nav ul li a'));

    // Extract the search form data dynamically
    const searchForm = element.querySelector('.search-form');
    const searchLabel = document.createElement('span');
    searchLabel.textContent = searchForm.querySelector('.search-label')?.textContent || 'No label';

    const searchInput = document.createElement('input');
    searchInput.placeholder = searchForm.querySelector('.search-field')?.placeholder || 'No placeholder';

    const searchButton = document.createElement('button');
    searchButton.textContent = searchForm.querySelector('.search-submit')?.value || 'No submit value';

    // Create table header row dynamically
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Cards'; // Ensure header matches the example exactly
    const headerRow = [headerCell];

    // Prepare table rows
    const cells = [
        headerRow,
        [
            navLinks.map(link => {
                const linkElement = document.createElement('a');
                linkElement.href = link.href;
                linkElement.textContent = link.textContent;
                return linkElement;
            }),
            [searchLabel, searchInput, searchButton]
        ]
    ];

    // Create the block table using WebImporter.DOMUtils.createTable
    const blockTable = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the new block table
    element.replaceWith(blockTable);
}