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

    function buildServicesIntro() {
        const mount = qs('[data-services-intro]');
        if (!mount) return;

        const cards = [
            {
                icon: 'layout-list',
                title: 'Choose by appliance',
                text: 'Start with a clear service category such as refrigerator, washer, dryer, dishwasher, oven, or range.'
            },
            {
                icon: 'search-check',
                title: 'Use diagnostics if unsure',
                text: 'When symptoms are unclear, Appliance Diagnostics can be used as the starting request category.'
            },
            {
                icon: 'users',
                title: 'Compare provider paths',
                text: 'Review available participating provider options where coverage exists in your service area.'
            }
        ];

        mount.innerHTML = `
            <section class="services-intro section section--white" id="overview" aria-labelledby="services-intro-title">
                <div class="container-wide">
                    <div class="services-intro__head" data-aos="fade-up">
                        <p class="section-kicker">Service categories intro</p>
                        <h2 id="services-intro-title">
                            Pick the appliance <span class="text-mark">path</span> that fits your issue.
                        </h2>
                    </div>

                    <div class="services-intro__grid">
                        ${cards.map((card, index) => `
                            <article class="services-intro-card shine-surface" data-aos="fade-up" data-aos-delay="${index * 80}">
                                <div>
                                    <h3>${safeText(card.title)}</h3>
                                    <p>${safeText(card.text)}</p>
                                </div>

                                <i data-lucide="${safeText(card.icon)}" aria-hidden="true"></i>
                            </article>
                        `).join('')}
                    </div>
                </div>
            </section>
        `;

        refreshIcons();
    }

    function buildServiceShowcase() {
        const mount = qs('[data-service-showcase]');
        if (!mount) return;

        const services = config.services || [];

        mount.innerHTML = `
            <section class="service-showcase section section--soft" id="services" aria-labelledby="service-showcase-title">
                <div class="container-wide">
                    <div class="service-showcase__layout">
                        <div class="service-showcase__head">
                            <p class="section-kicker">Full service category grid</p>

                            <h2 id="service-showcase-title">
                                Browse appliance repair provider-matching <span class="text-mark">categories</span>.
                            </h2>

                            <p>
                                Servexa keeps the request path focused on appliance type, symptoms, timing, and local provider availability. Choose the closest category or start with diagnostics when the issue is not clear.
                            </p>

                            <div class="section-actions">
                                <a class="btn btn--emerald" href="contact.html">
                                    Start a request
                                    <i data-lucide="arrow-up-right" aria-hidden="true"></i>
                                </a>

                                <a class="btn btn--soft" href="#matching-guide">
                                    Match symptoms
                                </a>
                            </div>

                            <div class="service-showcase__controls">
                                <button class="slider-btn service-showcase-prev" type="button" aria-label="Previous service">
                                    <i data-lucide="arrow-left" aria-hidden="true"></i>
                                </button>

                                <button class="slider-btn service-showcase-next" type="button" aria-label="Next service">
                                    <i data-lucide="arrow-right" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>

                        <div class="service-showcase__slider" data-aos="fade-left">
                            <div class="swiper service-showcase__swiper">
                                <div class="swiper-wrapper">
                                    ${services.map((service) => `
                                        <div class="swiper-slide">
                                            <a class="service-showcase-card" href="${safeText(service.file)}" aria-label="Open ${safeText(service.title)}">
                                                <span class="service-showcase-card__image" aria-hidden="true">
                                                    <img src="${safeText(service.image)}" alt="" width="620" height="620" loading="lazy">
                                                </span>

                                                <span class="service-showcase-card__content">
                                                    <span class="service-showcase-card__top">
                                                        <h3>${safeText(service.title)}</h3>
                                                        <i class="service-showcase-card__icon" data-lucide="${safeText(service.icon)}" aria-hidden="true"></i>
                                                    </span>

                                                    <p>${safeText(service.description)}</p>
                                                </span>
                                            </a>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;

        refreshIcons();

        if (window.Swiper) {
            new Swiper('.service-showcase__swiper', {
                slidesPerView: 2,
                spaceBetween: 18,
                loop: true,
                speed: 620,
                grabCursor: true,
                watchOverflow: true,
                navigation: {
                    nextEl: '.service-showcase-next',
                    prevEl: '.service-showcase-prev'
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

    function buildMatchingGuide() {
        const mount = qs('[data-matching-guide]');
        if (!mount) return;

        const items = [
            {
                icon: 'thermometer-snowflake',
                text: 'Refrigerator not cooling → Refrigerator Repair'
            },
            {
                icon: 'waves',
                text: 'Washer not draining → Washer Repair'
            },
            {
                icon: 'flame',
                text: 'Dryer not heating → Dryer Repair'
            },
            {
                icon: 'droplets',
                text: 'Dishwasher leaking → Dishwasher Repair'
            },
            {
                icon: 'cooking-pot',
                text: 'Oven not heating → Oven & Range Repair'
            },
            {
                icon: 'search-check',
                text: 'Unknown issue → Appliance Diagnostics'
            }
        ];

        mount.innerHTML = `
            <section class="matching-guide" id="matching-guide" aria-labelledby="matching-guide-title">
                <div class="matching-guide__bg" aria-hidden="true">
                    <img src="assets/images/hero-services.jpg" alt="" width="1600" height="900" loading="lazy">
                </div>

                <div class="container">
                    <div class="matching-guide__content" data-aos="fade-up">
                        <p class="section-kicker section-kicker--light">Appliance issue matching guide</p>

                        <h2 id="matching-guide-title">
                            Match symptoms to a useful service <span class="text-mark">category</span>.
                        </h2>

                        <p>
                            These examples can help users choose a starting category. Final assessment, pricing, scheduling, and terms come from participating providers.
                        </p>

                        <div class="matching-guide__list">
                            ${items.map((item) => `
                                <div class="matching-guide__item">
                                    <i data-lucide="${safeText(item.icon)}" aria-hidden="true"></i>
                                    <span>${safeText(item.text)}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </section>
        `;

        refreshIcons();
    }

    function buildRequestProcess() {
        const mount = qs('[data-request-process]');
        if (!mount) return;

        const listItems = [
            'Choose the closest appliance category',
            'Submit symptoms, timing, and service area',
            'Review available participating provider options',
            'Compare availability, quote clarity, and provider communication',
            'Decide whether to continue directly with a provider'
        ];

        const steps = [
            {
                icon: 'layout-list',
                title: 'Choose category',
                text: 'Start with the appliance type or select diagnostics when the issue is unclear.'
            },
            {
                icon: 'clipboard-pen',
                title: 'Submit details',
                text: 'Share symptoms, urgency, location, and contact information through Servexa.'
            },
            {
                icon: 'list-checks',
                title: 'Review options',
                text: 'Review available participating provider options where service coverage exists.'
            },
            {
                icon: 'mouse-pointer-click',
                title: 'Decide next step',
                text: 'Choose whether to continue based on provider pricing, availability, and terms.'
            }
        ];

        mount.innerHTML = `
            <section class="request-process section section--white" id="process" aria-labelledby="request-process-title">
                <div class="container-wide">
                    <div class="request-process__top">
                        <div class="request-process__photos" data-aos="fade-right">
                            <div class="request-process__photo image-frame">
                                <img src="assets/images/service-4.jpg" alt="Dishwasher in a modern kitchen" width="520" height="760" loading="lazy">
                            </div>

                            <div class="request-process__photo image-frame">
                                <img src="assets/images/service-2.jpg" alt="Laundry appliance area" width="520" height="760" loading="lazy">
                            </div>
                        </div>

                        <div class="request-process__content" data-aos="fade-left">
                            <p class="section-kicker">General request process</p>

                            <h2 id="request-process-title">
                                One clear flow for service requests and comparison <span class="text-mark">factors</span>.
                            </h2>

                            <p>
                                Servexa helps organize the early request path. Users can compare provider-related factors before deciding whether to continue with a participating provider.
                            </p>

                            <div class="request-process__list">
                                ${listItems.map((item) => `
                                    <div class="request-process__list-item">
                                        <i data-lucide="check" aria-hidden="true"></i>
                                        <span>${safeText(item)}</span>
                                    </div>
                                `).join('')}
                            </div>

                            <div class="section-actions">
                                <a class="btn btn--emerald" href="contact.html">
                                    Submit details
                                    <i data-lucide="arrow-up-right" aria-hidden="true"></i>
                                </a>

                                <a class="btn btn--soft" href="#faq">
                                    Read FAQ
                                </a>
                            </div>
                        </div>
                    </div>

                    <div class="request-process__steps">
                        ${steps.map((step, index) => `
                            <article class="process-circle" data-aos="zoom-in" data-aos-delay="${index * 80}">
                                <div class="process-circle__inner">
                                    <i data-lucide="${safeText(step.icon)}" aria-hidden="true"></i>
                                    <h3>${safeText(step.title)}</h3>
                                    <p>${safeText(step.text)}</p>
                                </div>
                            </article>
                        `).join('')}
                    </div>
                </div>
            </section>
        `;

        refreshIcons();
    }

    function buildAllServicesFAQ() {
        const mount = qs('[data-all-services-faq]');
        if (!mount) return;

        const faq = [
            {
                question: 'How do I choose the right appliance category?',
                answer: 'Start with the appliance type that best matches the issue. If the symptoms are unclear or involve multiple concerns, Appliance Diagnostics can be used as the starting category.'
            },
            {
                question: 'Does Servexa repair appliances directly?',
                answer: 'No. Servexa is an independent provider-matching platform and does not perform appliance repair work directly.'
            },
            {
                question: 'What affects provider availability?',
                answer: 'Availability may depend on service area, appliance category, timing, provider coverage, and provider-specific scheduling policies.'
            },
            {
                question: 'Who provides final pricing and service terms?',
                answer: 'Participating providers provide final pricing, scheduling, warranty details, and service terms. Servexa does not guarantee those terms.'
            },
            {
                question: 'Does submitting a request create a service agreement?',
                answer: 'No. Submitting a request through Servexa does not create a service agreement. Users choose whether to continue with a provider.'
            }
        ];

        mount.innerHTML = `
            <section class="services-faq section section--soft" id="faq" aria-labelledby="all-services-faq-title">
                <div class="container">
                    <div class="services-faq__grid">
                        <div class="services-faq__intro" data-aos="fade-right">
                            <p class="section-kicker">All services FAQ</p>

                            <h2 id="all-services-faq-title">
                                Category questions answered before you <span class="text-mark">continue</span>.
                            </h2>

                            <p>
                                Servexa helps with the request path, while participating providers handle repair-related terms.
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

        injectFAQSchema(faq, 'all-services-faq-schema');
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
        buildServicesIntro();
        buildServiceShowcase();
        buildMatchingGuide();
        buildRequestProcess();
        buildAllServicesFAQ();

        refreshIcons();

        if (window.AOS && typeof window.AOS.refreshHard === 'function') {
            window.AOS.refreshHard();
        }
    }

    document.addEventListener('DOMContentLoaded', init);
})();
