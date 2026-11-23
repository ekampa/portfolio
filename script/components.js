// Shared nav + footer for every page.
//
// Usage in each page:
//   <body>                        (homepage: <body data-nav="overlay">)
//     <div id="site-nav"></div>
//     <script src="script/components.js"></script>
//     ...page content...
//     <div id="site-footer"></div>
//
// The nav is injected immediately (this script runs synchronously right after
// #site-nav), so it is in place before script.js looks up `.navbar`. The footer
// is injected on DOMContentLoaded, once #site-footer has been parsed.

(function () {
    const NAV_LINKS = [
        { href: 'artwork.html', label: 'Portfolio' },
        { href: 'shop.html', label: 'Shop' },
        { href: 'statement.html', label: 'Statement' },
        { href: 'about.html', label: 'About' },
    ];

    // Current page filename; "/" or "/portfolio/" means the homepage.
    const currentPage = location.pathname.split('/').pop() || 'index.html';

    // Homepage: transparent nav over the hero image. Elsewhere: standard nav.
    const overlay = document.body.dataset.nav === 'overlay';

    // yellow color option for the homepage links: #FEFF92 or yellow
    const linkColor = overlay ? '#ffffff' : 'black';

    const links = NAV_LINKS.map(({ href, label }) => {
        const current = href === currentPage ? ' aria-current="page"' : '';
        return `
                    <li class="nav-item">
                        <a class="nav-link" href="${href}" style="color: ${linkColor};"${current}>${label}</a>
                    </li>`;
    }).join('');

    const toggler = overlay
        ? `
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>`
        : `
            <button class="navbar-toggler" style="padding: 0; outline: none !important; width: 36px; height: 36px;" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 648 712">
                    <!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                    <!-- https://fontawesome.com/icons/bars?s=solid -->
                    <path d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z"/>
                </svg>
            </button>`;

    const navAttrs = overlay
        ? 'class="navbar navbar-expand-lg fixed-top navbar-dark" style="position: absolute;"'
        : 'class="navbar navbar-expand-lg"';

    const brandStyle = overlay ? 'font-size: 1.5rem;' : 'color: black; font-size: 1.5rem;';

    const navHTML = `
    <nav ${navAttrs}>
        <div class="container">
            <a class="navbar-brand" style="${brandStyle}" href="./">Emily Kampa</a>${toggler}
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto">${links}
                </ul>
            </div>
        </div>
    </nav>`;

    const footerHTML = `
    <footer id="footer">
        <div class="container-fluid">
            <div class="social-icons mt-4 copyright">
                <p style="margin: 0;">
                    <span>Copyright © ${new Date().getFullYear()} Emily Kampa - All Rights Reserved.</span>
                    <!-- social media icons -->
                    <a href="https://www.instagram.com/stressyandlemonzesty/" target="_blank" style="float: right; font-size: 16px; color: rgb(89, 89, 89); padding-right: 5px;"><i class="fab fa-instagram"></i></a>
                    <a href="https://www.linkedin.com/in/emilykampa/" target="_blank" style="float: right; font-size: 16px; color: rgb(89, 89, 89); padding-right: 5px;"><i class="fab fa-linkedin"></i></a>
                </p>
            </div>
        </div>
    </footer>`;

    const navSlot = document.getElementById('site-nav');
    if (navSlot) navSlot.outerHTML = navHTML;

    document.addEventListener('DOMContentLoaded', () => {
        const footerSlot = document.getElementById('site-footer');
        if (footerSlot) footerSlot.outerHTML = footerHTML;
    });

    // Close the mobile menu when the user taps anywhere outside the navbar
    document.addEventListener('pointerdown', (event) => {
        const menu = document.getElementById('navbarSupportedContent');
        const menuIsOpen = menu && menu.classList.contains('show');
        const tappedInsideNav = event.target.closest('.navbar');
    
        if (menuIsOpen && !tappedInsideNav) {
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
        }
    });
})();
