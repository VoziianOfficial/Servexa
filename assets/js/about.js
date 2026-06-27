'use strict';

(function () {
    const config = window.SERVEXA_SITE_CONFIG || window.SiteConfig || {};
    const utils = window.ServexaUtils || {};

    const qs = utils.qs || ((selector, scope = document) => scope.querySelector(selector));
    const qsa = utils.qsa || ((selector, scope = document) => Array.from(scope.querySelectorAll(selector)));
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

    function setupAccordions() {
        if (utils.setupAccordions) {
            utils.setupAccordions();
        }
    }

    function buildPlatformStory() {
        const mount = qs('[data-about-story]');
        if (!mount) return;

        mount.innerHTML = `
            <section class="about-story section section--white" id="overview" aria-labelledby="about-story-title">
                <div class="container-wide">
                    <div class="about-story__head" data-aos="fade-up">
                        <p class="section-kicker">Platform story</p>
                        <h2 id="about-story-title">
                            Built for clearer appliance repair <span class="text-mark">requests</span>.
                        </h2>
                    </div>

                    <div class="about-story__collage">
                        <div class="about-story__photo image-frame" data-aos="zoom-in">
                            <img src="assets/images/service-6.jpg" alt="Modern refrigerator in a clean kitchen" width="520" height="520" loading="lazy">
                        </div>

                        <div class="about-story__photo image-frame" data-aos="zoom-in" data-aos-delay="70">
                            <img src="assets/images/service-4.jpg" alt="Washer and laundry appliances in a home" width="520" height="520" loading="lazy">
                        </div>

                        <div class="about-story__photo image-frame" data-aos="zoom-in" data-aos-delay="140">
                            <img src="assets/images/service-2.jpg" alt="Modern dryer area in a laundry room" width="520" height="520" loading="lazy">
                        </div>

                        <div class="about-story__photo image-frame" data-aos="zoom-in" data-aos-delay="210">
                            <img src="assets/images/service-5.jpg" alt="Oven and range in a premium kitchen" width="520" height="520" loading="lazy">
                        </div>

                        <div class="about-story__photo about-story__photo--wide image-frame" data-aos="fade-up">
                            <img src="assets/images/hero-contact.jpg" alt="Premium home appliance area" width="1320" height="520" loading="lazy">
                        </div>
                    </div>

                    <div class="about-story__text" data-aos="fade-up">
                        <p>
                            Servexa exists to help homeowners describe appliance issues with more clarity before comparing available local provider options. Instead of guessing which path fits best, users can start with appliance type, symptoms, location, and preferred timing.
                        </p>

                        <div class="section-actions">
                            <a class="btn btn--emerald" href="all-services.html">
                                View services
                            </a>

                            <a class="btn btn--soft" href="contact.html">
                                Start a request
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    function buildIndependentModel() {
        const mount = qs('[data-about-independent-model]');
        if (!mount) return;

        const items = [
            {
                icon: 'badge-check',
                title: 'Servexa is independent',
                text: 'Servexa is a provider-matching platform for appliance repair requests, not a direct repair company.'
            },
            {
                icon: 'wrench',
                title: 'Repairs are not performed by Servexa',
                text: 'Participating providers handle repair-related work, availability, pricing, scheduling, warranties, and service terms.'
            },
            {
                icon: 'mouse-pointer-click',
                title: 'Users choose whether to continue',
                text: 'Submitting a request does not require the user to hire or continue with any provider.'
            },
            {
                icon: 'file-text',
                title: 'Provider terms come from providers',
                text: 'Final quote details and service agreements are handled directly between the user and the provider.'
            }
        ];

        mount.innerHTML = `
            <section class="independent-model section section--emerald" id="comparison" aria-labelledby="independent-model-title">
                <div class="container">
                    <div class="independent-model__grid">
                        <div class="independent-model__list" data-aos="fade-right">
                            ${items.map((item) => `
                                <article class="independent-model__item">
                                    <i data-lucide="${item.icon}" aria-hidden="true"></i>
                                    <div>
                                        <strong>${item.title}</strong>
                                        <p>${item.text}</p>
                                    </div>
                                </article>
                            `).join('')}
                        </div>

                        <div class="independent-model__content" data-aos="fade-left">
                            <p class="section-kicker section-kicker--light">Independent matching model</p>

                            <h2 id="independent-model-title">
                                A transparent path before provider <span class="text-mark">selection</span>.
                            </h2>

                            <p>
                                Servexa helps users organize appliance issue details and review available provider options. The platform does not claim to diagnose, repair, schedule, price, warrant, or guarantee appliance repair work.
                            </p>

                            <div class="section-actions">
                                <a class="btn btn--primary" href="contact.html">
                                    Start a request
                                    <i data-lucide="arrow-up-right" aria-hidden="true"></i>
                                </a>

                                <a class="btn btn--outline-light" href="terms-of-service.html">
                                    Read terms
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    function buildHomeownerHelp() {
        const mount = qs('[data-about-help]');
        if (!mount) return;

        const items = [
            {
                icon: 'layout-list',
                title: 'Choose category',
                text: 'Start with the closest appliance type.'
            },
            {
                icon: 'clipboard-pen',
                title: 'Describe symptoms',
                text: 'Share what changed, when it happens, and any visible error codes.'
            },
            {
                icon: 'send',
                title: 'Submit details',
                text: 'Send request information through the Servexa form.'
            },
            {
                icon: 'list-checks',
                title: 'Compare options',
                text: 'Review available provider paths where participating coverage exists.'
            }
        ];

        mount.innerHTML = `
            <section class="about-help section section--soft" id="process" aria-labelledby="about-help-title">
                <div class="container">
                    <div class="about-help__grid">
                        <div class="about-help__photo photo-cover" data-aos="zoom-in">
                            <img src="assets/images/hero-services.jpg" alt="Home appliance service request planning" width="760" height="760" loading="lazy">
                        </div>

                        <div class="about-help__content" data-aos="fade-left">
                            <p class="section-kicker">How Servexa helps homeowners</p>

                            <h2 id="about-help-title">
                                Less confusion when appliance symptoms feel <span class="text-mark">unclear</span>.
                            </h2>

                            <p>
                                Servexa gives users a structured way to describe appliance issues, choose a category, and compare available provider options without presenting Servexa as the repair provider.
                            </p>

                            <div class="about-help__icons">
                                ${items.map((item) => `
                                    <div class="about-help__icon-item">
                                        <i data-lucide="${item.icon}" aria-hidden="true"></i>
                                        <div>
                                            <strong>${item.title}</strong>
                                            <span>${item.text}</span>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    function buildCompareCards() {
        const mount = qs('[data-about-compare-cards]');
        if (!mount) return;

        const cards = [
            {
                icon: 'clock',
                title: 'Availability & timing',
                text: 'Users may compare provider availability, response timing, and scheduling paths where options are available.'
            },
            {
                icon: 'refrigerator',
                title: 'Appliance type & symptoms',
                text: 'Requests can include appliance category, symptoms, model details if available, and urgency.'
            },
            {
                icon: 'receipt-text',
                title: 'Quote details & provider terms',
                text: 'Final quote clarity, warranty details, service terms, and agreements come from participating providers.'
            }
        ];

        mount.innerHTML = `
            <section class="compare-cards section section--white" aria-label="What users can compare">
                <div class="container-wide">
                    <div class="compare-cards__grid">
                        ${cards.map((card, index) => `
                            <article class="compare-card shine-surface" data-aos="fade-up" data-aos-delay="${index * 90}">
                                <div>
                                    <h3>${card.title}</h3>
                                    <p>${card.text}</p>
                                </div>

                                <i data-lucide="${card.icon}" aria-hidden="true"></i>
                            </article>
                        `).join('')}
                    </div>
                </div>
            </section>
        `;
    }

    function buildTrustNotes() {
        const mount = qs('[data-about-trust-notes]');
        if (!mount) return;

        const cards = config.about?.transparencyCards || [];
        if (!cards.length) return;

        mount.innerHTML = `
            <section class="trust-notes section section--soft" aria-label="Trust and transparency notes">
                <div class="container">
                    <div class="trust-notes__top" data-aos="fade-up">
                        <div class="slider-controls">
                            <button class="slider-btn trust-notes-prev" type="button" aria-label="Previous transparency note">
                                <i data-lucide="arrow-left" aria-hidden="true"></i>
                            </button>

                            <button class="slider-btn trust-notes-next" type="button" aria-label="Next transparency note">
                                <i data-lucide="arrow-right" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>

                    <div class="swiper trust-notes__swiper" data-aos="fade-up">
                        <div class="swiper-wrapper">
                            ${cards.map((card) => `
                                <div class="swiper-slide">
                                    <article class="trust-note-card">
                                        <div>
                                            <h3>${safeText(card.title)}</h3>
                                            <p>${safeText(card.text)}</p>
                                        </div>

                                        <span class="trust-note-card__icon">
                                            <i data-lucide="${safeText(card.icon)}" aria-hidden="true"></i>
                                        </span>
                                    </article>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </section>
        `;

        refreshIcons();

        if (window.Swiper) {
            new Swiper('.trust-notes__swiper', {
                slidesPerView: 2,
                spaceBetween: 18,
                loop: true,
                speed: 620,
                grabCursor: true,
                watchOverflow: true,
                navigation: {
                    nextEl: '.trust-notes-next',
                    prevEl: '.trust-notes-prev'
                },
                breakpoints: {
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 14
                    },
                    680: {
                        slidesPerView: 2,
                        spaceBetween: 16
                    },
                    1180: {
                        slidesPerView: 2,
                        spaceBetween: 18
                    }
                }
            });
        }
    }

    function buildAboutIconMarquee() {
        const mount = qs('[data-about-icon-marquee]');
        if (!mount) return;

        const rowOne = [
            'shield-check',
            'badge-check',
            'search-check',
            'list-checks',
            'clipboard-check',
            'wrench',
            'plug-zap',
            'sparkles'
        ];

        const rowTwo = [
            'refrigerator',
            'thermometer-snowflake',
            'droplets',
            'settings-2',
            'users',
            'handshake',
            'circle-check',
            'gauge'
        ];

        const renderItems = (icons) => icons.map((icon) => `
            <span class="about-icon-marquee__item" aria-hidden="true">
                <i data-lucide="${icon}"></i>
            </span>
        `).join('');

        mount.innerHTML = `
            <section class="about-icon-marquee section section--dark" aria-label="About page service icon marquee">
                <div class="about-icon-marquee__inner">
                    <div class="about-icon-marquee__row-wrap">
                        <div class="about-icon-marquee__track">
                            <div class="about-icon-marquee__row">
                                ${renderItems(rowOne)}
                            </div>
                            <div class="about-icon-marquee__row" aria-hidden="true">
                                ${renderItems(rowOne)}
                            </div>
                        </div>
                    </div>

                    <div class="about-icon-marquee__row-wrap about-icon-marquee__row-wrap--reverse">
                        <div class="about-icon-marquee__track about-icon-marquee__track--reverse">
                            <div class="about-icon-marquee__row">
                                ${renderItems(rowTwo)}
                            </div>
                            <div class="about-icon-marquee__row" aria-hidden="true">
                                ${renderItems(rowTwo)}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;

        refreshIcons();
    }

    function buildAboutFAQ() {
        const mount = qs('[data-about-faq]');
        if (!mount) return;

        const faq = config.about?.faq || [];
        if (!faq.length) return;

        mount.innerHTML = `
            <section class="about-faq section section--white" id="faq" aria-labelledby="about-faq-title">
                <div class="container">
                    <div class="about-faq__grid">
                        <div class="about-faq__intro" data-aos="fade-right">
                            <p class="section-kicker">About FAQ</p>

                            <h2 id="about-faq-title">
                                Platform questions, answered <span class="text-mark">clearly</span>.
                            </h2>

                            <p>
                                These answers explain Servexa’s independent provider-matching model.
                            </p>
                        </div>

                        <div class="accordion" data-accordion data-aos="fade-left">
                            ${faq.map((item, index) => `
                                <article class="accordion-item ${index === 0 ? 'is-open' : ''}">
                                    <button class="accordion-button" type="button" aria-expanded="${index === 0 ? 'true' : 'false'}">
                                        <span>${safeText(item.question)}</span>
                                        <i data-lucide="plus" aria-hidden="true"></i>
                                    </button>

                                    <div class="accordion-panel">
                                        <div class="accordion-panel__inner">
                                            <p>${safeText(item.answer)}</p>
                                        </div>
                                    </div>
                                </article>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </section>
        `;

        injectFAQSchema(faq, 'about-faq-schema');
        refreshIcons();
        setupAccordions();
    }

    function injectFAQSchema(faq, id) {
        if (!faq.length || qs(`#${id}`)) return;

        const schema = {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faq.map((item) => ({
                '@type': 'Question',
                name: safeText(item.question),
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: safeText(item.answer)
                }
            }))
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = id;
        script.textContent = JSON.stringify(schema);
        document.head.appendChild(script);
    }

    function init() {
        buildPlatformStory();
        buildIndependentModel();
        buildHomeownerHelp();
        buildCompareCards();
        buildTrustNotes();
        buildAboutIconMarquee();
        buildAboutFAQ();

        refreshIcons();

        if (window.AOS && typeof window.AOS.refreshHard === 'function') {
            window.AOS.refreshHard();
        }
    }

    document.addEventListener('DOMContentLoaded', init);
})();
