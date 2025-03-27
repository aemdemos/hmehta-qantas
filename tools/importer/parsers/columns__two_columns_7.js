export default function parse(element, {document}) {
    const socialLinks = Array.from(element.querySelectorAll('.social li a')).map(link => {
        const text = link.querySelector('.link-text')?.textContent.trim() || '';
        const icon = link.querySelector('i')?.cloneNode(true) || document.createElement('span');
        return [text, icon];
    });

    const usefulLinksHeader = document.createElement('strong');
    usefulLinksHeader.textContent = 'Useful Links';
    const usefulLinks = Array.from(element.querySelectorAll('.useful-links ul li a')).map(link => {
        const text = link.textContent.trim();
        return [text];
    });

    const disclaimerLinksHeader = document.createElement('strong');
    disclaimerLinksHeader.textContent = 'Disclaimer Links';
    const disclaimerLinks = Array.from(element.querySelectorAll('.disclaimer a')).map(link => {
        const text = link.textContent.trim();
        return [text];
    });

    const copyrightHeader = document.createElement('strong');
    copyrightHeader.textContent = 'Copyright';
    const copyrightText = element.querySelector('.copyright p')?.textContent.trim() || 'No copyright information available';

    const socialHeader = document.createElement('strong');
    socialHeader.textContent = 'Social Links';

    const cells = [
        [socialHeader, WebImporter.DOMUtils.createTable([['Social Links'], ...socialLinks], document)],
        [usefulLinksHeader, WebImporter.DOMUtils.createTable([['Useful Links'], ...usefulLinks], document)],
        [disclaimerLinksHeader, WebImporter.DOMUtils.createTable([['Disclaimer Links'], ...disclaimerLinks], document)],
        [copyrightHeader, copyrightText]
    ];

    const block = WebImporter.DOMUtils.createTable(cells, document);

    element.replaceWith(block);
}