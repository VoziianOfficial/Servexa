'use strict';

(function () {
    const config = window.SERVEXA_SITE_CONFIG || window.SiteConfig || {};

    const qs = (selector, scope = document) => scope.querySelector(selector);
    const qsa = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

    const getValueByPath = (object, path) => {
        if (!object || !path) return '';
        return path.split('.').reduce((acc, key) => {
            if (acc && Object.prototype.hasOwnProperty.call(acc, key)) {
                return acc[key];
            }

            return '';
        }, object);
    };

    const safeText = (value) => {
        if (value === null || value === undefined) return '';
        return String(value);
    };

    const setAttributes = (element, attrs = {}) => {
        Object.entries(attrs).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                element.setAttribute(key, value);
            }
        });
    };

    const createIcon = (name, className = '') => {
        const icon = document.createElement('i');
        icon.setAttribute('data-lucide', name);

        if (className) {
            icon.className = className;
        }

        icon.setAttribute('aria-hidden', 'true');
        return icon;
    };

    const normalizePath = (path) => {
        const value = path.split('/').pop() || 'index.html';
        return value === '' ? 'index.html' : value;
    };

    const currentPage = normalizePath(window.location.pathname);

    function injectConfigText() {
        qsa('[data-config]').forEach((element) => {
            const key = element.getAttribute('data-config');
            const value = getValueByPath(config, key);

            if (value !== '') {
                element.textContent = safeText(value);
            }
        });
    }

    function injectConfigLinks() {
        qsa('[data-config-href]').forEach((element) => {
            const type = element.getAttribute('data-config-href');

            if (type === 'phone') {
                element.setAttribute('href', `tel:${safeText(config.contact?.phoneRaw)}`);
            }

            if (type === 'email') {
                element.setAttribute('href', `mailto:${safeText(config.contact?.email)}`);
            }
        });
    }

    function buildLogoHTML() {
        return `
            <a class="site-logo" href="index.html" aria-label="${safeText(config.brand?.name)} home">
                <img class="site-logo__icon" src="${safeText(config.brand?.logo)}" alt="${safeText(config.brand?.logoAlt)}" width="96" height="85">
                <span class="site-logo__text">
                    <span class="site-logo__name" data-config="brand.name">${safeText(config.brand?.name)}</span>
                    <span class="site-logo__tagline" data-config="brand.shortTagline">${safeText(config.brand?.shortTagline)}</span>
                </span>
            </a>
        `;
    }

    function buildHeader() {
        const mount = qs('[data-header]');
        if (!mount) return;

        const navigation = Array.isArray(config.navigation) ? config.navigation : [];
        const services = Array.isArray(config.services) ? config.services : [];

        const navLinks = navigation.map((item) => {
            if (item.label === 'Services') {
                return `
                    <div class="services-menu">
                        <a class="desktop-nav__button ${currentPage === normalizePath(item.url) ? 'is-active' : ''}" href="${item.url}" aria-haspopup="true">
                            ${item.label}
                            <i data-lucide="chevron-down" aria-hidden="true"></i>
                        </a>

                        <div class="services-dropdown" aria-label="Service pages">
                            ${services.map((service) => `
                                <a class="services-dropdown__link" href="${service.file}">
                                    <span>${service.title}</span>
                                    <i data-lucide="${service.icon}" aria-hidden="true"></i>
                                </a>
                            `).join('')}
                        </div>
                    </div>
                `;
            }

            return `
                <a class="desktop-nav__link ${currentPage === normalizePath(item.url) ? 'is-active' : ''}" href="${item.url}">
                    ${item.label}
                </a>
            `;
        }).join('');

        mount.innerHTML = `
            <header class="site-header" id="site-header">
                <div class="container-wide site-header__inner">
                    ${buildLogoHTML()}

                    <nav class="desktop-nav" aria-label="Primary navigation">
                        ${navLinks}
                    </nav>

                    <div class="header-actions">
                        <a class="icon-btn icon-btn--phone" href="tel:${safeText(config.contact?.phoneRaw)}" aria-label="Call ${safeText(config.brand?.name)}">
                            <i data-lucide="phone" aria-hidden="true"></i>
                        </a>

                        <a class="icon-btn icon-btn--email" href="mailto:${safeText(config.contact?.email)}" aria-label="Email ${safeText(config.brand?.name)}">
                            <i data-lucide="mail" aria-hidden="true"></i>
                        </a>

                        <button class="icon-btn menu-toggle" type="button" aria-label="Open menu" aria-controls="mobile-menu" aria-expanded="false">
                            <i data-lucide="menu" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            </header>
        `;
    }

    function buildMobileMenu() {
        const mount = qs('[data-mobile-menu]');
        if (!mount) return;

        const navigation = Array.isArray(config.navigation) ? config.navigation : [];
        const services = Array.isArray(config.services) ? config.services : [];

        mount.innerHTML = `
            <div class="mobile-menu" id="mobile-menu" aria-hidden="true">
                <div class="container-wide mobile-menu__head">
                    ${buildLogoHTML()}

                    <button class="icon-btn mobile-menu__close" type="button" aria-label="Close menu">
                        <i data-lucide="x" aria-hidden="true"></i>
                    </button>
                </div>

                <div class="mobile-menu__body">
                    <div class="container mobile-menu__grid">
                        <div>
                            <p class="mobile-menu__section-title">Navigation</p>
                            <nav class="mobile-menu__links" aria-label="Mobile navigation">
                                ${navigation.map((item) => `
                                    <a class="mobile-menu__link" href="${item.url}">
                                        <span>${item.label}</span>
                                        <i data-lucide="arrow-up-right" aria-hidden="true"></i>
                                    </a>
                                `).join('')}
                            </nav>
                        </div>

                        <div>
                            <p class="mobile-menu__section-title">Service categories</p>
                            <nav class="mobile-menu__links" aria-label="Mobile service navigation">
                                ${services.map((service) => `
                                    <a class="mobile-menu__link" href="${service.file}">
                                        <span>${service.title}</span>
                                        <i data-lucide="${service.icon}" aria-hidden="true"></i>
                                    </a>
                                `).join('')}
                            </nav>
                        </div>

                        <div>
                            <p class="mobile-menu__section-title">Contact</p>
                            <div class="mobile-menu__contact">
                                <a class="mobile-menu__link" href="tel:${safeText(config.contact?.phoneRaw)}">
                                    <span>${safeText(config.contact?.phoneDisplay)}</span>
                                    <i data-lucide="phone" aria-hidden="true"></i>
                                </a>

                                <a class="mobile-menu__link" href="mailto:${safeText(config.contact?.email)}">
                                    <span>${safeText(config.contact?.email)}</span>
                                    <i data-lucide="mail" aria-hidden="true"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    function setupMobileMenu() {
        const menu = qs('#mobile-menu');
        const openButton = qs('.menu-toggle');
        const closeButton = qs('.mobile-menu__close');

        if (!menu || !openButton || !closeButton) return;

        const openMenu = () => {
            menu.classList.add('is-open');
            menu.setAttribute('aria-hidden', 'false');
            openButton.setAttribute('aria-expanded', 'true');
            document.body.classList.add('menu-open');
        };

        const closeMenu = () => {
            menu.classList.remove('is-open');
            menu.setAttribute('aria-hidden', 'true');
            openButton.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('menu-open');
        };

        openButton.addEventListener('click', openMenu);
        closeButton.addEventListener('click', closeMenu);

        qsa('a', menu).forEach((link) => {
            link.addEventListener('click', closeMenu);
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && menu.classList.contains('is-open')) {
                closeMenu();
            }
        });
    }

    function setupStickyHeader() {
        const header = qs('.site-header');
        if (!header) return;

        const handleScroll = () => {
            header.classList.toggle('is-scrolled', window.scrollY > 12);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    function buildFooter() {
        const mount = qs('[data-footer]');
        if (!mount) return;

        const navigation = Array.isArray(config.navigation) ? config.navigation : [];
        const services = Array.isArray(config.services) ? config.services : [];
        const legalLinks = Array.isArray(config.legalLinks) ? config.legalLinks : [];

        mount.innerHTML = `
            <footer class="site-footer">
                <div class="container-wide">
                    <div class="site-footer__top">
                        <div class="footer-brand">
                            ${buildLogoHTML()}

                            <p data-config="footer.description">${safeText(config.footer?.description)}</p>

                            <div class="site-footer__disclaimer" data-config="legal.disclaimer">
                                ${safeText(config.legal?.disclaimer)}
                            </div>
                        </div>

                        <div class="site-footer__col">
                            <p class="footer-title">Pages</p>
                            <nav class="footer-links" aria-label="Footer navigation">
                                ${navigation.map((item) => `
                                    <a href="${item.url}">${item.label}</a>
                                `).join('')}
                            </nav>
                        </div>

                        <div class="site-footer__col">
                            <p class="footer-title">Services</p>
                            <nav class="footer-links" aria-label="Footer service navigation">
                                ${services.map((service) => `
                                    <a href="${service.file}">${service.title}</a>
                                `).join('')}
                            </nav>
                        </div>

                        <div class="site-footer__col">
                            <p class="footer-title">Company</p>
                            <div class="footer-contact">
                                <a href="tel:${safeText(config.contact?.phoneRaw)}">
                                    <i data-lucide="phone" aria-hidden="true"></i>
                                    <span data-config="contact.phoneDisplay">${safeText(config.contact?.phoneDisplay)}</span>
                                </a>

                                <a href="mailto:${safeText(config.contact?.email)}">
                                    <i data-lucide="mail" aria-hidden="true"></i>
                                    <span data-config="contact.email">${safeText(config.contact?.email)}</span>
                                </a>

                                <span>
                                    <i data-lucide="map-pin" aria-hidden="true"></i>
                                    <span data-config="company.address">${safeText(config.company?.address)}</span>
                                </span>

                                <span>
                                    <i data-lucide="map" aria-hidden="true"></i>
                                    <span data-config="company.serviceArea">${safeText(config.company?.serviceArea)}</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="site-footer__bottom">
                        <p data-config="footer.copyright">${safeText(config.footer?.copyright)}</p>

                        <nav class="footer-links" aria-label="Legal links">
                            ${legalLinks.map((item) => `
                                <a href="${item.url}">${item.label}</a>
                            `).join('')}
                        </nav>
                    </div>
                </div>
            </footer>
        `;
    }

    function buildSharedHero() {
        qsa('[data-shared-hero]').forEach((hero) => {
            const page = hero.getAttribute('data-shared-hero');
            const heroData = getValueByPath(config.hero || {}, page) || {};

            const title = safeText(heroData.title || hero.getAttribute('data-hero-title'));
            const markedWord = safeText(heroData.markedWord || '');
            const markedTitle = markedWord && title.includes(markedWord)
                ? title.replace(markedWord, `<span class="text-mark">${markedWord}</span>`)
                : title;

            hero.innerHTML = `
                <section class="shared-hero" aria-labelledby="${page}-hero-title">
                    <div class="shared-hero__image" aria-hidden="true">
                        <img src="${safeText(heroData.image)}" alt="" width="1600" height="860">
                    </div>

                    <div class="container shared-hero__content">
                        <div class="shared-hero__inner" data-reveal="up">
                            ${heroData.kicker ? `<p class="section-kicker section-kicker--light">${safeText(heroData.kicker)}</p>` : ''}

                            <h1 id="${page}-hero-title">${markedTitle}</h1>

                            ${heroData.text ? `<p>${safeText(heroData.text)}</p>` : ''}

                            <div class="shared-hero__actions">
                                ${heroData.primaryButton ? `
                                    <a class="btn btn--primary btn--large" href="${heroData.primaryButton.url}">
                                        ${heroData.primaryButton.label}
                                        <i data-lucide="arrow-up-right" aria-hidden="true"></i>
                                    </a>
                                ` : ''}

                                ${heroData.secondaryButton ? `
                                    <a class="btn btn--ghost-dark btn--large" href="${heroData.secondaryButton.url}">
                                        ${heroData.secondaryButton.label}
                                    </a>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                </section>
            `;
        });
    }

    function buildPostHeroStrip() {
        qsa('[data-post-hero-strip]').forEach((strip) => {
            const links = config.postHeroNav?.defaultLinks || [];
            const placeholder = config.postHeroNav?.searchPlaceholder || 'Search services';

            strip.innerHTML = `
                <section class="post-hero-strip" aria-label="Section navigation and service search">
                    <div class="container-wide post-hero-strip__inner">
                        <nav class="post-hero-strip__links" aria-label="Page sections">
                            ${links.map((item) => `
                                <a class="post-hero-strip__link" href="${item.target}">
                                    <i data-lucide="${item.icon}" aria-hidden="true"></i>
                                    <span>${item.label}</span>
                                </a>
                            `).join('')}
                        </nav>

                        <div class="service-search" data-service-search>
                            <i data-lucide="search" aria-hidden="true"></i>
                            <label class="visually-hidden" for="service-search-input">Search services</label>
                            <input id="service-search-input" type="search" placeholder="${placeholder}" autocomplete="off">
                            <div class="search-results" data-search-results aria-label="Search results"></div>
                        </div>
                    </div>
                </section>
            `;
        });
    }

    function setupServiceSearch() {
        qsa('[data-service-search]').forEach((search) => {
            const input = qs('input', search);
            const results = qs('[data-search-results]', search);
            const services = Array.isArray(config.services) ? config.services : [];

            if (!input || !results) return;

            const closeResults = () => {
                results.classList.remove('is-visible');
                results.innerHTML = '';
            };

            const renderResults = (query) => {
                const cleanedQuery = query.trim().toLowerCase();

                if (!cleanedQuery) {
                    closeResults();
                    return;
                }

                const matches = services.filter((service) => {
                    const haystack = [
                        service.title,
                        service.shortTitle,
                        service.description,
                        ...(service.symptoms || [])
                    ].join(' ').toLowerCase();

                    return haystack.includes(cleanedQuery);
                });

                results.classList.add('is-visible');

                if (!matches.length) {
                    results.innerHTML = `
                        <span>
                            <i data-lucide="search-x" aria-hidden="true"></i>
                            No matching service found
                        </span>
                    `;
                    refreshIcons();
                    return;
                }

                results.innerHTML = matches.map((service) => `
                    <a href="${service.file}">
                        <i data-lucide="chevron-right" aria-hidden="true"></i>
                        <span>${service.title}</span>
                    </a>
                `).join('');

                refreshIcons();
            };

            input.addEventListener('input', () => renderResults(input.value));

            document.addEventListener('click', (event) => {
                if (!search.contains(event.target)) {
                    closeResults();
                }
            });

            input.addEventListener('keydown', (event) => {
                if (event.key === 'Escape') {
                    closeResults();
                    input.blur();
                }
            });
        });
    }

    function buildPrefooterCTA() {
        qsa('[data-prefooter-cta]').forEach((mount) => {
            const type = mount.getAttribute('data-prefooter-cta') || 'home';
            const cta = config.cta?.[type] || config.cta?.home || {};

            const title = safeText(cta.title);
            const titleWithMark = title.includes('options')
                ? title.replace('options', '<span class="text-mark">options</span>')
                : title.includes('request')
                    ? title.replace('request', '<span class="text-mark">request</span>')
                    : title;

            mount.innerHTML = `
                <section class="prefooter">
                    <div class="container-wide">
                        <div class="prefooter-cta shine-surface">
                            <div class="prefooter-cta__content">
                                <h2>${titleWithMark}</h2>
                                ${cta.text ? `<p>${safeText(cta.text)}</p>` : ''}
                            </div>

                            <div class="prefooter-cta__actions">
                                <a class="btn btn--primary" href="${safeText(cta.primaryUrl)}">
                                    ${safeText(cta.primaryLabel)}
                                    <i data-lucide="arrow-up-right" aria-hidden="true"></i>
                                </a>

                                <a class="btn btn--outline-light" href="${safeText(cta.secondaryUrl)}">
                                    ${safeText(cta.secondaryLabel)}
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            `;
        });
    }

    function setupAccordions() {
        qsa('[data-accordion]').forEach((accordion) => {
            const items = qsa('.accordion-item', accordion);

            items.forEach((item, index) => {
                const button = qs('.accordion-button', item);

                if (!button) return;

                button.setAttribute('aria-expanded', item.classList.contains('is-open') ? 'true' : 'false');

                button.addEventListener('click', () => {
                    const isOpen = item.classList.contains('is-open');

                    items.forEach((otherItem) => {
                        const otherButton = qs('.accordion-button', otherItem);
                        otherItem.classList.remove('is-open');
                        if (otherButton) otherButton.setAttribute('aria-expanded', 'false');
                    });

                    if (!isOpen) {
                        item.classList.add('is-open');
                        button.setAttribute('aria-expanded', 'true');
                    }
                });

                if (index === 0 && !items.some((accordionItem) => accordionItem.classList.contains('is-open'))) {
                    item.classList.add('is-open');
                    button.setAttribute('aria-expanded', 'true');
                }
            });
        });
    }

    function buildCookieBanner() {
        if (localStorage.getItem('servexaCookieConsent')) return;

        const banner = document.createElement('div');
        banner.className = 'cookie-banner is-visible';
        banner.setAttribute('role', 'dialog');
        banner.setAttribute('aria-label', 'Cookie consent');

        banner.innerHTML = `
            <p class="cookie-banner__text">
                Servexa uses essential browser storage for cookie consent and basic site preferences.
                Read our <a href="privacy-policy.html">Privacy Policy</a>,
                <a href="cookie-policy.html">Cookie Policy</a>, and
                <a href="terms-of-service.html">Terms of Service</a>.
            </p>

            <div class="cookie-banner__actions">
                <button class="btn btn--primary btn--small" type="button" data-cookie-choice="accepted">
                    Accept
                </button>

                <button class="btn btn--ghost-dark btn--small" type="button" data-cookie-choice="declined">
                    Decline
                </button>
            </div>
        `;

        document.body.appendChild(banner);

        qsa('[data-cookie-choice]', banner).forEach((button) => {
            button.addEventListener('click', () => {
                localStorage.setItem('servexaCookieConsent', button.getAttribute('data-cookie-choice'));
                banner.classList.remove('is-visible');
                setTimeout(() => banner.remove(), 220);
            });
        });
    }

    function setupYear() {
        qsa('[data-current-year]').forEach((element) => {
            element.textContent = new Date().getFullYear();
        });
    }

    function refreshIcons() {
        if (window.lucide && typeof window.lucide.createIcons === 'function') {
            window.lucide.createIcons();
        }
    }

    function initScrollReveal(root = document) {
        const items = Array.from(root.querySelectorAll('[data-reveal]'));

        if (!items.length) return;

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            items.forEach((item) => item.classList.add('is-visible'));
            return;
        }

        const observer = new IntersectionObserver((entries, currentObserver) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add('is-visible');
                currentObserver.unobserve(entry.target);
            });
        }, {
            threshold: 0.16,
            rootMargin: '0px 0px -8% 0px'
        });

        items.forEach((item, index) => {
            if (!item.style.getPropertyValue('--reveal-delay')) {
                item.style.setProperty('--reveal-delay', `${Math.min(index * 45, 220)}ms`);
            }

            observer.observe(item);
        });
    }

    function init() {
        buildHeader();
        buildMobileMenu();
        buildSharedHero();
        buildPostHeroStrip();
        buildPrefooterCTA();
        buildFooter();

        injectConfigText();
        injectConfigLinks();

        setupStickyHeader();
        setupMobileMenu();
        setupServiceSearch();
        setupAccordions();
        setupYear();
        buildCookieBanner();

        refreshIcons();
        initScrollReveal(document);
    }

    document.addEventListener('DOMContentLoaded', init);

    window.ServexaUtils = {
        qs,
        qsa,
        safeText,
        createIcon,
        refreshIcons,
        setupAccordions,
        getValueByPath
    };

    window.initScrollReveal = initScrollReveal;
})();
