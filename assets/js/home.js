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

    function findServiceByTitle(title) {
        return (config.services || []).find((service) => service.title === title);
    }

    function buildQuickPath() {
        const mount = qs('[data-home-quick-path]');
        if (!mount) return;

        const items = config.home?.quickPathItems || [];
        if (!items.length) return;

        mount.innerHTML = `
            <section class="home-quick-path section section--white" id="overview" aria-labelledby="home-quick-path-title">
                <div class="container-wide">
                    <div class="home-quick-path__head">
                    <div data-reveal="left">
                            <p class="section-kicker">Appliance issue quick path</p>
                            <h2 id="home-quick-path-title">
                                Start with the <span class="text-mark">symptom</span>, not the guess.
                            </h2>
                        </div>

                        <p data-reveal="right">
                            Select a common appliance concern and Servexa will show the type of details that can make a provider request clearer.
                        </p>
                    </div>

                    <div class="home-quick-path__grid">
                        <div class="home-quick-path__photo image-frame" data-reveal="left">
                            <img src="${safeText(items[0].image)}" alt="${safeText(items[0].title)}" width="860" height="620" data-quick-path-image>
                        </div>

                        <div class="home-quick-path__list" data-reveal="right" role="tablist" aria-label="Appliance issue options">
                            ${items.map((item, index) => `
                                <button
                                    class="home-quick-path__button ${index === 0 ? 'is-active' : ''}"
                                    type="button"
                                    role="tab"
                                    aria-selected="${index === 0 ? 'true' : 'false'}"
                                    data-quick-path-index="${index}"
                                >
                                    <span aria-hidden="true"></span>
                                    <strong>${safeText(item.title)}</strong>
                                    <i data-lucide="${safeText(item.icon)}" aria-hidden="true"></i>
                                </button>
                            `).join('')}
                        </div>

                        <article class="home-quick-path__detail" data-reveal="up" data-quick-path-detail>
                            <span class="home-quick-path__detail-icon">
                                <i data-lucide="${safeText(items[0].icon)}" aria-hidden="true"></i>
                            </span>

                            <div>
                                <h3>${safeText(items[0].title)}</h3>
                                <p>${safeText(items[0].text)}</p>
                            </div>
                        </article>
                    </div>
                </div>
            </section>
        `;

        const image = qs('[data-quick-path-image]', mount);
        const detail = qs('[data-quick-path-detail]', mount);
        const buttons = qsa('[data-quick-path-index]', mount);

        buttons.forEach((button) => {
            button.addEventListener('click', () => {
                const index = Number(button.getAttribute('data-quick-path-index'));
                const item = items[index];

                if (!item || !image || !detail) return;

                buttons.forEach((currentButton) => {
                    currentButton.classList.remove('is-active');
                    currentButton.setAttribute('aria-selected', 'false');
                });

                button.classList.add('is-active');
                button.setAttribute('aria-selected', 'true');

                image.style.opacity = '0.18';
                detail.style.opacity = '0.18';
                detail.style.transform = 'translateY(6px)';

                window.setTimeout(() => {
                    image.src = safeText(item.image);
                    image.alt = safeText(item.title);

                    detail.innerHTML = `
                        <span class="home-quick-path__detail-icon">
                            <i data-lucide="${safeText(item.icon)}" aria-hidden="true"></i>
                        </span>

                        <div>
                            <h3>${safeText(item.title)}</h3>
                            <p>${safeText(item.text)}</p>
                        </div>
                    `;

                    refreshIcons();

                    image.style.opacity = '1';
                    detail.style.opacity = '1';
                    detail.style.transform = 'translateY(0)';
                }, 160);
            });
        });

        if (detail) {
            detail.style.transition = 'opacity 220ms ease, transform 220ms ease';
        }

        if (image) {
            image.style.transition = 'opacity 220ms ease';
        }

        refreshIcons();
    }

    function buildHomeIconMarquee() {
        const mount = qs('[data-home-icon-marquee]');
        if (!mount) return;

        const icons = [
            'refrigerator',
            'thermometer-snowflake',
            'plug-zap',
            'wrench',
            'droplets',
            'flame',
            'settings-2',
            'shield-check',
            'timer-reset',
            'circle-alert'
        ];

        const renderRow = () => icons.map((icon) => `
            <span class="icon-marquee__item" aria-hidden="true">
                <i data-lucide="${icon}"></i>
            </span>
        `).join('');

        mount.innerHTML = `
            <section class="icon-marquee section section--dark" aria-label="Appliance service icons marquee">
                <div class="icon-marquee__viewport">
                    <div class="icon-marquee__track">
                        <div class="icon-marquee__row">
                            ${renderRow()}
                        </div>

                        <div class="icon-marquee__row" aria-hidden="true">
                            ${renderRow()}
                        </div>
                    </div>
                </div>
            </section>
        `;

        refreshIcons();
    }

    function buildPopularCategories() {
        const mount = qs('[data-home-popular-categories]');
        if (!mount) return;

        const featuredNames = config.home?.featuredServices || [];
        const services = featuredNames
            .map((title) => findServiceByTitle(title))
            .filter(Boolean);

        if (!services.length) return;

        mount.innerHTML = `
            <section class="popular-categories section section--soft" id="services" aria-labelledby="popular-categories-title">
                <div class="container-wide">
                    <div class="popular-categories__head" data-reveal="up">
                        <p class="section-kicker">Popular appliance repair categories</p>
                        <h2 id="popular-categories-title">
                            Choose a clear service <span class="text-mark">path</span>.
                        </h2>
                    </div>

                    <div class="popular-categories__grid">
                        ${services.map((service, index) => `
                            <article class="popular-category-card card-3d shine-surface" data-reveal="up" style="--reveal-delay: ${Math.min(index * 55, 240)}ms">
                                <div class="popular-category-card__top">
                                    <span class="popular-category-card__number">0${index + 1}</span>
                                    <i class="card-icon" data-lucide="${safeText(service.icon)}" aria-hidden="true"></i>
                                </div>

                                <h3>${safeText(service.title)}</h3>
                                <p>${safeText(service.description)}</p>

                                <a class="btn btn--emerald btn--small" href="${safeText(service.file)}">
                                    View category
                                    <i data-lucide="arrow-up-right" aria-hidden="true"></i>
                                </a>
                            </article>
                        `).join('')}
                    </div>
                </div>
            </section>
        `;

        refreshIcons();
    }

    function buildMatchingWorks() {
        const mount = qs('[data-home-matching-works]');
        if (!mount) return;

        mount.innerHTML = `
            <section class="matching-photo-section" id="process" aria-labelledby="matching-works-title">
                <div class="matching-photo-section__bg" aria-hidden="true">
                    <img src="assets/images/hero-services.jpg" alt="" width="1600" height="900" loading="lazy">
                </div>

                <div class="container-wide">
                    <article class="matching-photo-section__card shine-surface" data-reveal="scale">
                        <p class="section-kicker section-kicker--light">How Servexa matching works</p>

                        <h2 id="matching-works-title">
                            Submit details, then compare available <span class="text-mark">options</span>.
                        </h2>

                        <p>
                            Servexa helps users start with organized appliance issue details, then review participating provider options where available. You choose whether to continue with a provider.
                        </p>

                        <div class="matching-photo-section__steps">
                            <div class="matching-photo-section__step">
                                <i data-lucide="clipboard-pen" aria-hidden="true"></i>
                                <span>Submit appliance type, symptoms, timing, and service area.</span>
                            </div>

                            <div class="matching-photo-section__step">
                                <i data-lucide="list-checks" aria-hidden="true"></i>
                                <span>Servexa keeps the request path clear and category-focused.</span>
                            </div>

                            <div class="matching-photo-section__step">
                                <i data-lucide="users" aria-hidden="true"></i>
                                <span>Review available participating provider options when possible.</span>
                            </div>

                            <div class="matching-photo-section__step">
                                <i data-lucide="mouse-pointer-click" aria-hidden="true"></i>
                                <span>Decide whether to continue based on provider terms.</span>
                            </div>
                        </div>

                        <div class="section-actions">
                            <a class="btn btn--primary" href="contact.html">
                                Start a request
                                <i data-lucide="arrow-up-right" aria-hidden="true"></i>
                            </a>

                            <a class="btn btn--outline-light" href="all-services.html">
                                View services
                            </a>
                        </div>
                    </article>
                </div>
            </section>
        `;

        refreshIcons();
    }

    function buildComparisonFactors() {
        const mount = qs('[data-home-comparison-factors]');
        if (!mount) return;

        const factors = config.home?.comparisonFactors || [];

        mount.innerHTML = `
            <section class="comparison-factors section section--dark" id="comparison" aria-labelledby="comparison-factors-title">
                <div class="container-wide">
                    <div class="comparison-factors__layout">
                        <div class="comparison-factors__content" data-reveal="left">
                            <p class="section-kicker section-kicker--light">Provider comparison factors</p>

                            <h2 id="comparison-factors-title">
                                Compare what matters before you <span class="text-mark">continue</span>.
                            </h2>

                            <p>
                                Provider details can vary by appliance category, service area, timing, availability, and provider-specific terms. Servexa keeps the request path clear so users can review options with better context.
                            </p>

                            <div class="comparison-factors__list">
                                ${factors.map((factor, index) => `
                                    <div class="comparison-factors__item" data-reveal="up" style="--reveal-delay: ${Math.min(index * 45, 220)}ms">
                                        <i data-lucide="check" aria-hidden="true"></i>
                                        <span>${safeText(factor)}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <div class="comparison-factors__photo-wrap" data-reveal="right">
                            <div class="comparison-factors__photo photo-cover shine-surface">
                                <img src="assets/images/service-4.jpg" alt="Modern appliance area prepared for repair provider comparison" width="760" height="760" loading="lazy">
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;

        refreshIcons();
    }

    function buildStatsStrip() {
        const mount = qs('[data-home-stats]');
        if (!mount) return;

        const stats = config.home?.stats || [];

        mount.innerHTML = `
            <section class="home-stats section section--dark" aria-label="Servexa process numbers">
                <div class="container-wide">
                    <div class="home-stats__inner" data-reveal="up">
                        ${stats.map((stat) => `
                            <article class="home-stat">
                                <div class="home-stat__value">
                                    <span data-count-to="${safeText(stat.value)}">0</span>
                                    <span>${safeText(stat.suffix)}</span>
                                </div>

                                <p class="home-stat__label">${safeText(stat.label)}</p>
                            </article>
                        `).join('')}
                    </div>
                </div>
            </section>
        `;

        setupCountUp();
    }

    function setupCountUp() {
        const counters = qsa('[data-count-to]');
        if (!counters.length) return;

        const animateCounter = (counter) => {
            const target = Number(counter.getAttribute('data-count-to')) || 0;
            const duration = 1250;
            const startTime = performance.now();

            const step = (time) => {
                const progress = Math.min((time - startTime) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                const value = Math.round(target * eased);

                counter.textContent = String(value);

                if (progress < 1) {
                    requestAnimationFrame(step);
                }
            };

            requestAnimationFrame(step);
        };

        if (!('IntersectionObserver' in window)) {
            counters.forEach(animateCounter);
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                const counter = entry.target;
                if (counter.dataset.counted === 'true') return;

                counter.dataset.counted = 'true';
                animateCounter(counter);
                observer.unobserve(counter);
            });
        }, {
            threshold: 0.45
        });

        counters.forEach((counter) => observer.observe(counter));
    }

    function buildPlatformTransparency() {
        const mount = qs('[data-home-platform-transparency]');
        if (!mount) return;

        mount.innerHTML = `
            <section class="platform-transparency section section--soft" aria-labelledby="platform-transparency-title">
                <div class="container">
                    <div class="platform-transparency__grid">
                        <div class="platform-transparency__photo photo-cover" data-reveal="scale">
                            <img src="assets/images/hero-card.jpg" alt="Modern home appliance area with premium interior details" width="720" height="720" loading="lazy">
                        </div>

                        <div class="platform-transparency__content" data-reveal="right">
                            <p class="section-kicker">Platform transparency</p>

                            <h2 id="platform-transparency-title">
                                Servexa is a matching platform, not a repair <span class="text-mark">company</span>.
                            </h2>

                            <p>
                                Servexa helps homeowners submit appliance issue details and compare available local provider options. Repair work, final pricing, scheduling, availability, warranty details, and service terms are provided by participating providers.
                            </p>

                            <div class="platform-transparency__notes">
                                <div class="platform-transparency__note">
                                    <i data-lucide="badge-check" aria-hidden="true"></i>
                                    <span>Independent appliance repair provider matching.</span>
                                </div>

                                <div class="platform-transparency__note">
                                    <i data-lucide="file-text" aria-hidden="true"></i>
                                    <span>Provider terms come from participating providers.</span>
                                </div>

                                <div class="platform-transparency__note">
                                    <i data-lucide="mouse-pointer-click" aria-hidden="true"></i>
                                    <span>Users choose whether to continue.</span>
                                </div>

                                <div class="platform-transparency__note">
                                    <i data-lucide="shield-check" aria-hidden="true"></i>
                                    <span>Homeowners should verify provider requirements where needed.</span>
                                </div>
                            </div>

                            <div class="section-actions">
                                <a class="btn btn--emerald" href="about.html">
                                    About Servexa
                                </a>

                                <a class="btn btn--soft" href="terms-of-service.html">
                                    Read terms
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;

        refreshIcons();
    }

    function buildHomeFAQ() {
        const mount = qs('[data-home-faq]');
        if (!mount) return;

        const faq = config.home?.faq || [];
        if (!faq.length) return;

        mount.innerHTML = `
            <section class="home-faq section section--white" id="faq" aria-labelledby="home-faq-title">
                <div class="container-wide">
                    <div class="home-faq__head" data-reveal="up">
                        <p class="section-kicker">FAQ</p>

                        <h2 id="home-faq-title">
                            Clear answers before you submit a <span class="text-mark">request</span>.
                        </h2>

                        <p>
                            A focused FAQ switcher with quick answers about how Servexa works as an independent provider-matching platform.
                        </p>
                    </div>

                    <div class="home-faq-switcher" data-home-faq-switcher>
                        <div class="home-faq-switcher__questions" role="tablist" aria-label="FAQ questions" data-reveal="left">
                            ${faq.map((item, index) => `
                                <button
                                    class="home-faq-switcher__question ${index === 0 ? 'is-active' : ''}"
                                    type="button"
                                    role="tab"
                                    aria-selected="${index === 0 ? 'true' : 'false'}"
                                    data-faq-index="${index}"
                                >
                                    <span class="home-faq-switcher__number">${String(index + 1).padStart(2, '0')}</span>
                                    <span class="home-faq-switcher__question-text">${safeText(item.question)}</span>
                                    <i data-lucide="arrow-up-right" aria-hidden="true"></i>
                                </button>
                            `).join('')}
                        </div>

                        <article class="home-faq-switcher__answer shine-surface" data-reveal="right" data-faq-answer>
    <div class="home-faq-switcher__answer-top">
        <span class="home-faq-switcher__answer-number">01</span>
        <i data-lucide="circle-help" aria-hidden="true"></i>
    </div>

    <h3>${safeText(faq[0].question)}</h3>

    <div class="home-faq-switcher__answer-text">
        <p>${safeText(faq[0].answer)}</p>
        <p>
            Servexa keeps the request path organized so users can review appliance provider options with clearer context before deciding whether to continue.
        </p>
    </div>

    <a class="btn btn--emerald btn--small" href="contact.html">
        Start a request
        <i data-lucide="arrow-up-right" aria-hidden="true"></i>
    </a>
</article>
                    </div>
                </div>
            </section>
        `;

        const buttons = qsa('[data-faq-index]', mount);
        const answer = qs('[data-faq-answer]', mount);

        buttons.forEach((button) => {
            button.addEventListener('click', () => {
                const index = Number(button.getAttribute('data-faq-index'));
                const item = faq[index];

                if (!item || !answer) return;

                buttons.forEach((currentButton) => {
                    currentButton.classList.remove('is-active');
                    currentButton.setAttribute('aria-selected', 'false');
                });

                button.classList.add('is-active');
                button.setAttribute('aria-selected', 'true');

                answer.style.opacity = '0.2';
                answer.style.transform = 'translateY(8px)';

                window.setTimeout(() => {
                    answer.innerHTML = `
                        <div class="home-faq-switcher__answer-top">
                            <span class="home-faq-switcher__answer-number">${String(index + 1).padStart(2, '0')}</span>
                            <i data-lucide="circle-help" aria-hidden="true"></i>
                        </div>

                       <h3>${safeText(item.question)}</h3>

                                        <div class="home-faq-switcher__answer-text">
                    <p>${safeText(item.answer)}</p>
                    <p>
                        Servexa keeps the request path organized so users can review appliance provider options with clearer context before deciding whether to continue.
                    </p>
                     </div>

                <a class="btn btn--emerald btn--small" href="contact.html">
                            Start a request
                            <i data-lucide="arrow-up-right" aria-hidden="true"></i>
                        </a>
                    `;

                    refreshIcons();

                    answer.style.opacity = '1';
                    answer.style.transform = 'translateY(0)';
                }, 160);
            });
        });

        if (answer) {
            answer.style.transition = 'opacity 220ms ease, transform 220ms ease';
        }

        injectFAQSchema(faq, 'home-faq-schema');
        refreshIcons();
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
        buildHomeIconMarquee();
        buildQuickPath();
        buildPopularCategories();
        buildMatchingWorks();
        buildComparisonFactors();
        buildStatsStrip();
        buildPlatformTransparency();
        buildHomeFAQ();

        refreshIcons();

        if (window.initScrollReveal) {
            window.initScrollReveal(document);
        }
    }

    document.addEventListener('DOMContentLoaded', init);
})();
