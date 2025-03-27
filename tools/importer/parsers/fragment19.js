export default function parse(element, {document}) {
    const cells = [];

    // Extract the social links
    const socialLinks = [];
    const socialList = element.querySelector('.social');
    if (socialList) {
        const links = socialList.querySelectorAll('a');
        links.forEach(link => {
            const anchor = document.createElement('a');
            anchor.href = link.href;
            anchor.textContent = link.querySelector('.link-text')?.textContent || link.href;
            socialLinks.push(anchor);
        });
    }

    // Extract the useful links
    const usefulLinks = [];
    const usefulLinksList = element.querySelector('.useful-links ul');
    if (usefulLinksList) {
        const links = usefulLinksList.querySelectorAll('a');
        links.forEach(link => {
            const anchor = document.createElement('a');
            anchor.href = link.href;
            anchor.textContent = link.textContent;
            usefulLinks.push(anchor);
        });
    }

    // Extract meta information
    const metaInfo = [];
    const metaWrap = element.querySelector('.meta-wrap');
    if (metaWrap) {
        const disclaimerLinks = metaWrap.querySelectorAll('.disclaimer a');
        disclaimerLinks.forEach(link => {
            const anchor = document.createElement('a');
            anchor.href = link.href;
            anchor.textContent = link.textContent;
            metaInfo.push(anchor);
        });
    }

    // Extract copyright
    const copyrightText = element.querySelector('.copyright p')?.textContent || '';

    // Build the header row
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Fragment';
    const headerRow = [headerCell];

    // Build the cells array
    cells.push(headerRow);
    cells.push(['Social Links', socialLinks]);
    cells.push(['Useful Links', usefulLinks]);
    cells.push(['Meta Information', metaInfo]);
    cells.push(['Copyright', copyrightText]);

    // Create the table block
    const table = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the new block table
    element.replaceWith(table);
}