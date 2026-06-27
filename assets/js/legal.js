'use strict';

(function () {
    const config = window.SERVEXA_SITE_CONFIG || window.SiteConfig || {};
    const utils = window.ServexaUtils || {};

    const qs = utils.qs || ((selector, scope = document) => scope.querySelector(selector));
    const safeText = utils.safeText || ((value) => value === null || value === undefined ? '' : String(value));

    function refreshIcons() {
        if (utils.refreshIcons) {
            utils.refreshIcons();
            return;
        }

        if (window.lucide && typeof window.lucide.createIcons === 'function') {
            window.lucide.createIcons();
        }
    }

    const legalPages = {
        privacy: {
            title: 'Privacy Policy',
            kicker: 'Servexa privacy information',
            heroTitle: 'Privacy Policy',
            heroText: 'Learn how Servexa may collect, use, store, and process information submitted through the provider-matching request path.',
            lastUpdated: 'June 27, 2026',
            sections: [
                {
                    title: 'Overview',
                    text: [
                        'This Privacy Policy explains how Servexa may collect and use information submitted through this website. Servexa is an independent appliance repair provider-matching platform, not a direct appliance repair company.',
                        'When users submit appliance issue details, that information may be used to respond to the request, organize the request details, and help connect users with participating local provider options where available.'
                    ]
                },
                {
                    title: 'Information users may submit',
                    text: [
                        'Users may submit information such as full name, email address, phone number, appliance category, appliance symptoms, service area, urgency, and other message details provided through the contact form.',
                        'Users should avoid submitting sensitive information that is not necessary for an appliance provider-matching request.'
                    ],
                    list: [
                        'Name and contact details',
                        'Appliance type and issue description',
                        'Preferred timing or urgency',
                        'Service area or general location',
                        'Request source page and form metadata'
                    ]
                },
                {
                    title: 'How information may be used',
                    text: [
                        'Submitted information may be used to respond to inquiries, organize appliance issue details, operate the request form, improve website functionality, and help connect users with participating provider options.',
                        'Final pricing, availability, scheduling, warranties, service agreements, and provider terms are provided by participating providers.'
                    ]
                },
                {
                    title: 'Participating providers',
                    text: [
                        'Servexa may share submitted request details with participating providers or service partners when reasonably necessary to help respond to a request or present provider options.',
                        'Participating providers are independent from Servexa. Users should review provider terms and verify requirements before continuing with any provider.'
                    ]
                },
                {
                    title: 'Cookies and browser storage',
                    text: [
                        'Servexa may use essential browser storage, such as localStorage, to remember cookie consent choices and support basic site functionality.',
                        'If optional analytics or tracking tools are added later, they should be disclosed clearly and used in accordance with applicable requirements.'
                    ]
                },
                {
                    title: 'User choices',
                    text: [
                        'Users may choose not to submit the request form. Users may also contact Servexa using the contact details listed on this website.',
                        'Cookie consent choices can be managed through the cookie banner when shown or by clearing browser storage.'
                    ]
                },
                {
                    title: 'Data security',
                    text: [
                        'Servexa uses reasonable organizational and technical measures designed to protect submitted information. However, no website or email transmission can be guaranteed to be completely secure.',
                        'Users should submit only information necessary for the appliance provider-matching request.'
                    ]
                },
                {
                    title: 'Contact',
                    text: [
                        'Questions about this Privacy Policy or submitted request information can be sent using the contact details below.'
                    ],
                    contact: true
                }
            ]
        },

        terms: {
            title: 'Terms of Service',
            kicker: 'Servexa website terms',
            heroTitle: 'Terms of Use',
            heroText: 'Review the terms that apply when using Servexa as an independent appliance repair provider-matching platform.',
            lastUpdated: 'June 27, 2026',
            sections: [
                {
                    title: 'Acceptance of terms',
                    text: [
                        'By using this website, users agree to these Terms of Service. If a user does not agree with these terms, the user should not use the website or submit a request.',
                        'Servexa may update these terms from time to time. Continued use of the website after changes means the updated terms apply.'
                    ]
                },
                {
                    title: 'Independent provider-matching platform',
                    text: [
                        'Servexa is an independent appliance repair provider-matching platform. Servexa is not a direct appliance repair company, contractor, technician team, installer, inspector, manufacturer, retailer, or official service company.',
                        'Servexa does not perform appliance repairs directly and does not claim to diagnose, repair, schedule, price, warrant, or guarantee appliance repair work.'
                    ]
                },
                {
                    title: 'Participating providers',
                    text: [
                        'Participating providers are independent from Servexa. Provider availability, service area coverage, pricing, scheduling, warranties, licensing, insurance, and service terms may vary.',
                        'Users are responsible for reviewing provider details and deciding whether to continue with any provider.'
                    ],
                    list: [
                        'Servexa does not guarantee provider availability',
                        'Servexa does not guarantee provider pricing',
                        'Servexa does not guarantee provider licensing or insurance',
                        'Servexa does not guarantee provider workmanship or outcomes',
                        'Servexa does not create a service agreement between user and provider'
                    ]
                },
                {
                    title: 'User responsibility',
                    text: [
                        'Users are responsible for submitting accurate request information and verifying provider qualifications, licensing, insurance, and terms where required before hiring or continuing with any provider.',
                        'Submitting a request through Servexa does not create a repair appointment, service agreement, warranty, or direct contractor relationship with Servexa.'
                    ]
                },
                {
                    title: 'No guaranteed results',
                    text: [
                        'Servexa may help users review available provider options, but does not guarantee that a provider will be available, that a quote will be offered, or that any appliance issue will be resolved.',
                        'Repair outcomes depend on the participating provider, appliance condition, parts availability, diagnosis, user decisions, and provider-specific terms.'
                    ]
                },
                {
                    title: 'Website content',
                    text: [
                        'Website content is provided for general provider-matching and request organization purposes. It should not be treated as technical repair advice, safety advice, or a diagnosis.',
                        'Users should rely on participating providers or qualified professionals for repair-specific evaluations and recommendations.'
                    ]
                },
                {
                    title: 'Limitation of liability',
                    text: [
                        'To the fullest extent permitted by law, Servexa is not responsible for independent provider actions, omissions, quotes, services, warranties, schedules, licensing, insurance, workmanship, or repair outcomes.',
                        'Users interact with participating providers at their own discretion and should review all provider terms before continuing.'
                    ]
                },
                {
                    title: 'Contact',
                    text: [
                        'Questions about these Terms of Service can be sent using the contact details below.'
                    ],
                    contact: true
                }
            ]
        },

        cookies: {
            title: 'Cookie Policy',
            kicker: 'Servexa cookie information',
            heroTitle: 'Cookie Policy',
            heroText: 'Learn how Servexa may use essential cookies, localStorage, and browser-based preferences on this website.',
            lastUpdated: 'June 27, 2026',
            sections: [
                {
                    title: 'Overview',
                    text: [
                        'This Cookie Policy explains how Servexa may use cookies, localStorage, and similar browser storage technologies. Servexa uses a compact consent banner so users can accept or decline non-essential storage when applicable.',
                        'The website currently uses essential localStorage to remember a user’s cookie consent choice.'
                    ]
                },
                {
                    title: 'What cookies and localStorage do',
                    text: [
                        'Cookies and localStorage can help websites remember user choices, support basic functionality, and improve the browsing experience.',
                        'For example, Servexa may store whether a user accepted or declined the cookie banner so the banner does not keep appearing after a choice is made.'
                    ]
                },
                {
                    title: 'Types of storage Servexa may use',
                    text: [
                        'Servexa may use essential browser storage for basic site functionality and consent management. Optional analytics or tracking tools should only be used when disclosed and configured appropriately.'
                    ],
                    list: [
                        'Essential consent storage',
                        'Basic website preference storage',
                        'Optional analytics storage if added later',
                        'Security or anti-spam form metadata when applicable'
                    ]
                },
                {
                    title: 'Cookie consent banner',
                    text: [
                        'The cookie banner appears at the bottom of the website until the user accepts or declines. The choice is stored in localStorage.',
                        'The banner includes links to the Privacy Policy, Terms of Service, and Cookie Policy.'
                    ]
                },
                {
                    title: 'Managing choices',
                    text: [
                        'Users can manage or clear cookie and localStorage choices through browser settings. Clearing browser storage may cause the consent banner to appear again.',
                        'Declining optional cookies should not prevent access to essential website content.'
                    ]
                },
                {
                    title: 'Third-party tools',
                    text: [
                        'If analytics, advertising pixels, or other third-party tools are added later, those tools may use cookies or similar technologies according to their own policies.',
                        'Any such implementation should be reviewed for compliance with applicable privacy and advertising requirements.'
                    ]
                },
                {
                    title: 'Contact',
                    text: [
                        'Questions about this Cookie Policy can be sent using the contact details below.'
                    ],
                    contact: true
                }
            ]
        }
    };

    function getPageType() {
        const root = qs('[data-legal-page]');
        if (!root) return 'privacy';

        return root.getAttribute('data-legal-page') || 'privacy';
    }

    function buildLegalHero() {
        const mount = qs('[data-legal-hero]');
        if (!mount) return;

        const page = legalPages[getPageType()] || legalPages.privacy;

        mount.innerHTML = `
            <section class="shared-hero shared-hero--small" aria-labelledby="legal-hero-title">
                <div class="shared-hero__image" aria-hidden="true">
                    <img src="assets/images/hero-about.jpg" alt="" width="1600" height="860">
                </div>

                <div class="container shared-hero__content">
                    <div class="shared-hero__inner" data-aos="fade-up">
                        <p class="section-kicker section-kicker--light">${safeText(page.kicker)}</p>

                        <h1 id="legal-hero-title">
                            ${safeText(page.heroTitle).replace('Policy', '<span class="text-mark">Policy</span>').replace('Use', '<span class="text-mark">Use</span>')}
                        </h1>

                        <p>${safeText(page.heroText)}</p>

                        <div class="shared-hero__actions">
                            <a class="btn btn--primary btn--large" href="all-services.html">
                                View services
                                <i data-lucide="arrow-up-right" aria-hidden="true"></i>
                            </a>

                            <a class="btn btn--ghost-dark btn--large" href="contact.html">
                                Contact Servexa
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    function buildLegalContent() {
        const mount = qs('[data-legal-content]');
        if (!mount) return;

        const type = getPageType();
        const page = legalPages[type] || legalPages.privacy;
        const legalLinks = config.legalLinks || [];

        mount.innerHTML = `
            <section class="legal-layout section section--soft" id="overview" aria-labelledby="legal-content-title">
                <div class="container-wide">
                    <div class="legal-layout__grid">
                        <aside class="legal-sidebar" data-aos="fade-right">
                            <p class="legal-sidebar__title">Legal pages</p>

                            <nav class="legal-sidebar__links" aria-label="Legal page navigation">
                                ${legalLinks.map((link) => `
                                    <a href="${safeText(link.url)}">
                                        <span>${safeText(link.label)}</span>
                                        <i data-lucide="arrow-up-right" aria-hidden="true"></i>
                                    </a>
                                `).join('')}
                            </nav>
                        </aside>

                        <div class="legal-content" data-aos="fade-left">
                            <article class="legal-card legal-card--highlight">
                                <div class="legal-meta">
                                    <span class="legal-meta__pill">
                                        <i data-lucide="calendar-days" aria-hidden="true"></i>
                                        Last updated: ${safeText(page.lastUpdated)}
                                    </span>

                                    <span class="legal-meta__pill">
                                        <i data-lucide="badge-check" aria-hidden="true"></i>
                                        ${safeText(config.brand?.tagline)}
                                    </span>
                                </div>

                                <h2 id="legal-content-title">${safeText(page.title)}</h2>

                                <p>
                                    Servexa is designed as an independent appliance repair provider-matching platform. The website helps users submit request details and review available provider options where participating coverage exists.
                                </p>
                            </article>

                            ${page.sections.map((section, index) => buildLegalSection(section, index)).join('')}

                            <article class="legal-disclaimer" id="disclaimer">
                                <h2>Required disclaimer</h2>
                                <p data-config="legal.disclaimer">${safeText(config.legal?.disclaimer)}</p>
                            </article>
                        </div>
                    </div>
                </div>
            </section>
        `;

        refreshIcons();
    }

    function buildLegalSection(section, index) {
        const modifier = index % 5 === 1 ? ' legal-card--black' : '';

        return `
            <article class="legal-card${modifier}">
                <h2>${safeText(section.title)}</h2>

                ${(section.text || []).map((paragraph) => `
                    <p>${safeText(paragraph)}</p>
                `).join('')}

                ${section.list ? `
                    <ul>
                        ${section.list.map((item) => `
                            <li>${safeText(item)}</li>
                        `).join('')}
                    </ul>
                ` : ''}

                ${section.contact ? buildContactBlock() : ''}
            </article>
        `;
    }

    function buildContactBlock() {
        return `
            <div class="legal-contact-card">
                <a href="mailto:${safeText(config.contact?.email)}">
                    <i data-lucide="mail" aria-hidden="true"></i>
                    <span>${safeText(config.contact?.email)}</span>
                </a>

                <a href="tel:${safeText(config.contact?.phoneRaw)}">
                    <i data-lucide="phone" aria-hidden="true"></i>
                    <span>${safeText(config.contact?.phoneDisplay)}</span>
                </a>

                <span>
                    <i data-lucide="map-pin" aria-hidden="true"></i>
                    <span>${safeText(config.company?.address)}</span>
                </span>

                <span>
                    <i data-lucide="badge-check" aria-hidden="true"></i>
                    <span>${safeText(config.company?.legalName)} · ${safeText(config.company?.companyId)}</span>
                </span>
            </div>
        `;
    }

    function updateDocumentTitle() {
        const page = legalPages[getPageType()] || legalPages.privacy;

        if (page.title) {
            document.title = `${page.title} | Servexa`;
        }
    }

    function init() {
        updateDocumentTitle();
        buildLegalHero();
        buildLegalContent();
        refreshIcons();

        if (window.AOS && typeof window.AOS.refreshHard === 'function') {
            window.AOS.refreshHard();
        }
    }

    document.addEventListener('DOMContentLoaded', init);
})();