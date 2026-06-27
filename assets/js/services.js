'use strict';

(function () {
    const config = window.SERVEXA_SITE_CONFIG || window.SiteConfig || {};
    const utils = window.ServexaUtils || {};

    const qs = utils.qs || ((selector, scope = document) => scope.querySelector(selector));
    const qsa = utils.qsa || ((selector, scope = document) => Array.from(scope.querySelectorAll(selector)));
    const safeText = utils.safeText || ((value) => value === null || value === undefined ? '' : String(value));

    const serviceContent = {
        'refrigerator-repair': {
            title: 'Refrigerator Repair',
            heroTitle: 'Refrigerator Repair',
            heroImage: 'assets/images/hero-refrigerator.jpg',
            kicker: 'Refrigerator provider matching',
            intro: 'Submit refrigerator issue details and compare available local provider options for cooling, freezer, leaking, ice maker, and noise concerns.',
            overviewTitle: 'Compare refrigerator provider options with clearer issue details.',
            overviewText: 'Refrigerator issues can affect cooling, food storage, freezer performance, water flow, or ice production. Servexa helps users organize symptoms before reviewing available provider paths.',
            tabs: [
                {
                    title: 'Cooling concerns',
                    icon: 'thermometer-snowflake',
                    image: 'assets/images/hero-refrigerator.jpg',
                    sideImage: 'assets/images/service-1.jpg',
                    text: 'Share whether the refrigerator is warm, cooling unevenly, cycling often, or showing temperature changes. These details help create a clearer request path.'
                },
                {
                    title: 'Freezer issues',
                    icon: 'snowflake',
                    image: 'assets/images/service-1.jpg',
                    sideImage: 'assets/images/hero-refrigerator.jpg',
                    text: 'Explain frost buildup, soft frozen food, unusual freezer temperature, or airflow changes so provider options can be reviewed with better context.'
                },
                {
                    title: 'Leaks or water',
                    icon: 'droplets',
                    image: 'assets/images/hero-dishwasher.jpg',
                    sideImage: 'assets/images/service-4.jpg',
                    text: 'Include where water appears, whether the leak happens near the dispenser or bottom area, and whether the appliance has an ice maker or water line.'
                },
                {
                    title: 'Ice maker concerns',
                    icon: 'blocks',
                    image: 'assets/images/service-6.jpg',
                    sideImage: 'assets/images/service-1.jpg',
                    text: 'Describe slow ice production, no ice, dispenser issues, unusual taste, or visible water concerns. Final evaluation comes from participating providers.'
                }
            ],
            issues: [
                'Not cooling',
                'Freezer issues',
                'Water leaks',
                'Ice maker concerns',
                'Unusual noise',
                'Temperature changes',
                'Frost buildup',
                'Dispenser issues'
            ],
            faq: [
                {
                    question: 'Does Servexa repair refrigerators directly?',
                    answer: 'No. Servexa is an independent provider-matching platform. Participating providers handle refrigerator repair work, pricing, scheduling, and terms.'
                },
                {
                    question: 'What refrigerator details should I submit?',
                    answer: 'Include cooling symptoms, freezer behavior, leaking, ice maker concerns, unusual sounds, appliance age or model if available, service area, and timing.'
                },
                {
                    question: 'Can I compare refrigerator provider options?',
                    answer: 'Servexa helps users review available provider options where coverage exists. Provider availability varies by area, timing, and appliance concern.'
                },
                {
                    question: 'Who provides final refrigerator repair pricing?',
                    answer: 'Final pricing, parts, labor, warranty details, and scheduling are provided by participating providers, not Servexa.'
                }
            ]
        },

        'washer-repair': {
            title: 'Washer Repair',
            heroTitle: 'Washer Repair',
            heroImage: 'assets/images/hero-washer.jpg',
            kicker: 'Washer provider matching',
            intro: 'Submit washer issue details and review provider options for draining, spinning, leaking, vibration, and cycle concerns.',
            overviewTitle: 'Start a washer request with symptoms that are easy to review.',
            overviewText: 'Washer problems can involve water, motion, cycles, error codes, or noise. Servexa helps users organize washer issue details before comparing participating provider options.',
            tabs: [
                {
                    title: 'Not draining',
                    icon: 'waves',
                    image: 'assets/images/hero-washer.jpg',
                    sideImage: 'assets/images/service-2.jpg',
                    text: 'Share whether water remains after a cycle, whether draining stopped suddenly, and whether error codes or unusual sounds appear.'
                },
                {
                    title: 'Not spinning',
                    icon: 'rotate-cw',
                    image: 'assets/images/service-2.jpg',
                    sideImage: 'assets/images/hero-washer.jpg',
                    text: 'Describe whether the drum moves, stops mid-cycle, shakes heavily, or leaves clothes soaked. These details may help users review more relevant provider options.'
                },
                {
                    title: 'Leaks',
                    icon: 'droplets',
                    image: 'assets/images/service-4.jpg',
                    sideImage: 'assets/images/service-2.jpg',
                    text: 'Include where water appears, when the leak happens, and whether it is near hoses, the door, or underneath the appliance.'
                },
                {
                    title: 'Error codes',
                    icon: 'badge-alert',
                    image: 'assets/images/service-6.jpg',
                    sideImage: 'assets/images/hero-washer.jpg',
                    text: 'If the washer displays a code, include it in the request. Servexa does not diagnose directly, but the detail can make the provider request clearer.'
                }
            ],
            issues: [
                'Not draining',
                'Not spinning',
                'Leaks',
                'Heavy vibration',
                'Error codes',
                'Cycle failures',
                'Door lock concerns',
                'Unusual noise'
            ],
            faq: [
                {
                    question: 'Does Servexa repair washers directly?',
                    answer: 'No. Servexa does not perform washer repair work. Servexa helps users submit request details and compare available provider options.'
                },
                {
                    question: 'What washer symptoms should I include?',
                    answer: 'Include draining issues, spinning behavior, leaking location, vibration, error codes, cycle problems, appliance type, and timing.'
                },
                {
                    question: 'Can washer provider availability vary?',
                    answer: 'Yes. Provider availability can vary by service area, appliance type, timing, and participating provider coverage.'
                },
                {
                    question: 'Does submitting a washer request create an agreement?',
                    answer: 'No. Submitting a request through Servexa does not create a service agreement. Users choose whether to continue with a provider.'
                }
            ]
        },

        'dryer-repair': {
            title: 'Dryer Repair',
            heroTitle: 'Dryer Repair',
            heroImage: 'assets/images/hero-dryer.jpg',
            kicker: 'Dryer provider matching',
            intro: 'Compare provider options for dryer heating problems, slow drying, unusual noise, overheating concerns, and drum issues.',
            overviewTitle: 'Organize dryer symptoms before reviewing provider paths.',
            overviewText: 'Dryer issues may involve heat, airflow, drum movement, electrical behavior, or noise. Servexa helps users describe the concern clearly before comparing available provider options.',
            tabs: [
                {
                    title: 'No heat',
                    icon: 'flame',
                    image: 'assets/images/hero-dryer.jpg',
                    sideImage: 'assets/images/service-3.jpg',
                    text: 'Share whether the dryer tumbles without heat, heats briefly, or never warms. Mention whether clothes remain damp after a full cycle.'
                },
                {
                    title: 'Slow drying',
                    icon: 'timer',
                    image: 'assets/images/service-3.jpg',
                    sideImage: 'assets/images/hero-dryer.jpg',
                    text: 'Describe cycle length, load size, heat level, and any airflow concerns. Final evaluation and recommendations come from participating providers.'
                },
                {
                    title: 'Drum concerns',
                    icon: 'rotate-cw-square',
                    image: 'assets/images/service-2.jpg',
                    sideImage: 'assets/images/service-3.jpg',
                    text: 'Include whether the drum does not move, stops mid-cycle, squeaks, scrapes, or makes repeated sounds.'
                },
                {
                    title: 'Overheating concerns',
                    icon: 'triangle-alert',
                    image: 'assets/images/service-6.jpg',
                    sideImage: 'assets/images/hero-dryer.jpg',
                    text: 'If the dryer feels unusually hot or shuts off, describe timing and visible signs. Provider terms and safety guidance come from participating providers.'
                }
            ],
            issues: [
                'No heat',
                'Slow drying',
                'Unusual noise',
                'Drum problems',
                'Overheating concerns',
                'Start issues',
                'Cycle stopping',
                'Airflow concerns'
            ],
            faq: [
                {
                    question: 'Does Servexa repair dryers directly?',
                    answer: 'No. Servexa is not a dryer repair company. Participating providers handle repair-related work and service terms.'
                },
                {
                    question: 'What dryer details are useful?',
                    answer: 'Include whether the dryer heats, how long drying takes, drum behavior, unusual noises, overheating concerns, and any start or cycle issues.'
                },
                {
                    question: 'Can I compare dryer provider options?',
                    answer: 'Servexa helps users review available provider options where participating coverage exists. Availability and terms vary by provider.'
                },
                {
                    question: 'Who handles dryer repair warranties?',
                    answer: 'Any warranty or service guarantee details are provided by the participating provider, not Servexa.'
                }
            ]
        },

        'dishwasher-repair': {
            title: 'Dishwasher Repair',
            heroTitle: 'Dishwasher Repair',
            heroImage: 'assets/images/hero-dishwasher.jpg',
            kicker: 'Dishwasher provider matching',
            intro: 'Find provider options for dishwasher leaks, drainage problems, poor cleaning, cycle concerns, and door latch issues.',
            overviewTitle: 'Submit dishwasher details without guessing the cause.',
            overviewText: 'Dishwasher concerns can involve water, drainage, cleaning performance, cycle behavior, or door sealing. Servexa helps users turn symptoms into a clearer provider request.',
            tabs: [
                {
                    title: 'Poor cleaning',
                    icon: 'sparkles',
                    image: 'assets/images/hero-dishwasher.jpg',
                    sideImage: 'assets/images/service-4.jpg',
                    text: 'Share whether dishes remain cloudy, greasy, gritty, or wet after cycles. Mention cycle type, detergent changes, and visible residue if helpful.'
                },
                {
                    title: 'Leaking',
                    icon: 'droplets',
                    image: 'assets/images/service-4.jpg',
                    sideImage: 'assets/images/hero-dishwasher.jpg',
                    text: 'Include whether water appears near the door, underneath the appliance, or after specific cycle stages.'
                },
                {
                    title: 'Drainage issues',
                    icon: 'waves',
                    image: 'assets/images/service-2.jpg',
                    sideImage: 'assets/images/service-4.jpg',
                    text: 'Describe standing water, slow draining, odors, or cycle stops. Servexa helps organize the request but does not diagnose directly.'
                },
                {
                    title: 'Door latch problems',
                    icon: 'door-closed',
                    image: 'assets/images/service-6.jpg',
                    sideImage: 'assets/images/hero-dishwasher.jpg',
                    text: 'Mention whether the dishwasher will not start, will not close, or stops because the door does not latch correctly.'
                }
            ],
            issues: [
                'Poor cleaning',
                'Leaking',
                'Drainage issues',
                'Door latch problems',
                'Standing water',
                'Cycle concerns',
                'Odors',
                'Unusual noise'
            ],
            faq: [
                {
                    question: 'Does Servexa repair dishwashers directly?',
                    answer: 'No. Servexa does not perform dishwasher repair work. Servexa helps users submit details and compare participating provider options.'
                },
                {
                    question: 'What dishwasher symptoms should I submit?',
                    answer: 'Include cleaning performance, leaks, standing water, drainage behavior, door latch concerns, cycle issues, location, and timing.'
                },
                {
                    question: 'Who decides final dishwasher repair pricing?',
                    answer: 'Participating providers provide final pricing, scheduling, warranty details, and service terms.'
                },
                {
                    question: 'Can availability vary by area?',
                    answer: 'Yes. Provider availability depends on location, timing, appliance category, and participating provider coverage.'
                }
            ]
        },

        'oven-range-repair': {
            title: 'Oven & Range Repair',
            heroTitle: 'Oven Repair',
            heroImage: 'assets/images/hero-oven-range.jpg',
            kicker: 'Oven and range provider matching',
            intro: 'Compare local provider options for oven, range, cooktop, burner, heating, ignition, and control concerns.',
            overviewTitle: 'Start an oven or range request with the right issue details.',
            overviewText: 'Oven and range concerns may involve heating, burners, ignition, temperature control, or cooktop performance. Servexa helps users organize those details before provider comparison.',
            tabs: [
                {
                    title: 'Uneven heating',
                    icon: 'thermometer',
                    image: 'assets/images/hero-oven-range.jpg',
                    sideImage: 'assets/images/service-5.jpg',
                    text: 'Share whether the oven runs too hot, too cool, takes too long, or cooks unevenly. Mention temperature changes or visible error codes if available.'
                },
                {
                    title: 'Burner issues',
                    icon: 'flame',
                    image: 'assets/images/service-5.jpg',
                    sideImage: 'assets/images/hero-oven-range.jpg',
                    text: 'Describe whether burners fail to heat, heat unevenly, click repeatedly, or respond slowly to controls.'
                },
                {
                    title: 'Ignition concerns',
                    icon: 'sparkles',
                    image: 'assets/images/service-6.jpg',
                    sideImage: 'assets/images/service-5.jpg',
                    text: 'Include ignition behavior, clicking, delayed lighting, or power concerns. Participating providers handle final evaluation and repair terms.'
                },
                {
                    title: 'Control problems',
                    icon: 'sliders-horizontal',
                    image: 'assets/images/hero-contact.jpg',
                    sideImage: 'assets/images/hero-oven-range.jpg',
                    text: 'Mention control panel issues, unresponsive buttons, display errors, or settings that do not hold during cooking.'
                }
            ],
            issues: [
                'Uneven heating',
                'Burner issues',
                'Ignition concerns',
                'Control problems',
                'Cooktop concerns',
                'Temperature changes',
                'Display errors',
                'Slow preheating'
            ],
            faq: [
                {
                    question: 'Does Servexa repair ovens or ranges directly?',
                    answer: 'No. Servexa is an independent provider-matching platform and does not perform oven or range repair work.'
                },
                {
                    question: 'What oven or range details should I include?',
                    answer: 'Include heating behavior, burner concerns, ignition issues, control problems, appliance type, visible error codes, and service area.'
                },
                {
                    question: 'Who provides final pricing?',
                    answer: 'Final pricing, scheduling, parts, warranties, and service terms come from participating providers.'
                },
                {
                    question: 'Can I use this category for cooktops?',
                    answer: 'Yes. Oven & Range Repair can be used for oven, range, cooktop, burner, heating, ignition, and control concerns.'
                }
            ]
        },

        'appliance-diagnostics': {
            title: 'Appliance Diagnostics',
            heroTitle: 'Appliance Check',
            heroImage: 'assets/images/hero-diagnostics.jpg',
            kicker: 'Unknown appliance issue matching',
            intro: 'Submit appliance symptoms when the problem is unclear and review provider options that may help evaluate the issue.',
            overviewTitle: 'Use diagnostics when the appliance problem is not obvious.',
            overviewText: 'Sometimes the symptom is clear but the category is not. Appliance Diagnostics gives users a starting path to describe unknown appliance behavior before reviewing provider options.',
            tabs: [
                {
                    title: 'Unknown symptoms',
                    icon: 'search-check',
                    image: 'assets/images/hero-diagnostics.jpg',
                    sideImage: 'assets/images/service-6.jpg',
                    text: 'Describe what changed, how often it happens, and whether the appliance still powers on or completes cycles.'
                },
                {
                    title: 'Strange noises',
                    icon: 'volume-2',
                    image: 'assets/images/service-3.jpg',
                    sideImage: 'assets/images/hero-diagnostics.jpg',
                    text: 'Include whether the sound is scraping, buzzing, clicking, humming, vibrating, or happening during a specific stage.'
                },
                {
                    title: 'Power issues',
                    icon: 'plug-zap',
                    image: 'assets/images/hero-contact.jpg',
                    sideImage: 'assets/images/service-6.jpg',
                    text: 'Mention whether the appliance turns on, shuts off, trips power, shows display issues, or loses power during use.'
                },
                {
                    title: 'Performance changes',
                    icon: 'activity',
                    image: 'assets/images/hero-services.jpg',
                    sideImage: 'assets/images/hero-diagnostics.jpg',
                    text: 'Share when performance changed, what still works, and what no longer works as expected. Provider options may vary by appliance type.'
                }
            ],
            issues: [
                'Unknown symptoms',
                'Strange noises',
                'Power issues',
                'Performance changes',
                'Multiple appliance concerns',
                'Display changes',
                'Cycle interruption',
                'Unclear appliance failure'
            ],
            faq: [
                {
                    question: 'Does Servexa diagnose appliances directly?',
                    answer: 'No. Servexa does not diagnose or repair appliances directly. Appliance Diagnostics is a request category for users who are unsure where to start.'
                },
                {
                    question: 'When should I choose Appliance Diagnostics?',
                    answer: 'Choose Appliance Diagnostics when the symptom is unclear, the appliance behavior changed suddenly, or you are not sure which service category fits best.'
                },
                {
                    question: 'Who evaluates the appliance issue?',
                    answer: 'Participating providers may evaluate the issue according to their own availability, pricing, scheduling, and service terms.'
                },
                {
                    question: 'Does submitting a diagnostics request create an agreement?',
                    answer: 'No. Submitting a request through Servexa does not create a service agreement. Users choose whether to continue with a provider.'
                }
            ]
        }
    };

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

    function getCurrentServiceKey() {
        const pageRoot = qs('[data-service-page]');
        if (pageRoot) {
            return pageRoot.getAttribute('data-service-page');
        }

        return window.location.pathname.split('/').pop().replace('.html', '');
    }

    function getCurrentService() {
        const key = getCurrentServiceKey();
        return serviceContent[key] || serviceContent['refrigerator-repair'];
    }

    function getCurrentServiceFromConfig() {
        const currentKey = getCurrentServiceKey();
        const file = `${currentKey}.html`;

        return (config.services || []).find((service) => service.file === file) || config.services?.[0] || {};
    }

    function buildServiceHero() {
        const mount = qs('[data-service-hero]');
        if (!mount) return;

        const service = getCurrentService();

        mount.innerHTML = `
            <section class="shared-hero" aria-labelledby="service-hero-title">
                <div class="shared-hero__image" aria-hidden="true">
                    <img src="${safeText(service.heroImage)}" alt="" width="1600" height="860">
                </div>

                <div class="container shared-hero__content">
                    <div class="shared-hero__inner" data-aos="fade-up">
                        <p class="section-kicker section-kicker--light">${safeText(service.kicker)}</p>

                        <h1 id="service-hero-title">
                            ${safeText(service.heroTitle).replace('Repair', '<span class="text-mark">Repair</span>').replace('Check', '<span class="text-mark">Check</span>')}
                        </h1>

                        <p>${safeText(service.intro)}</p>

                        <div class="shared-hero__actions">
                            <a class="btn btn--primary btn--large" href="contact.html">
                                Start a request
                                <i data-lucide="arrow-up-right" aria-hidden="true"></i>
                            </a>

                            <a class="btn btn--ghost-dark btn--large" href="all-services.html">
                                View services
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        `;

        refreshIcons();
    }

    function buildServiceOverview() {
        const mount = qs('[data-service-overview]');
        if (!mount) return;

        const service = getCurrentService();
        const tabs = service.tabs || [];
        const firstTab = tabs[0];

        mount.innerHTML = `
            <section class="service-overview section section--white" id="overview" aria-labelledby="service-overview-title">
                <div class="container-wide">
                    <div class="service-overview__head">
                        <div data-aos="fade-right">
                            <p class="section-kicker">Service-specific overview</p>

                            <h2 id="service-overview-title">
                                ${safeText(service.overviewTitle).replace('options', '<span class="text-mark">options</span>').replace('details', '<span class="text-mark">details</span>')}
                            </h2>
                        </div>

                        <p data-aos="fade-left">${safeText(service.overviewText)}</p>
                    </div>

                    <div class="service-overview__tabs" role="tablist" aria-label="${safeText(service.title)} issue options" data-aos="fade-up">
                        ${tabs.map((tab, index) => `
                            <button
                                class="service-overview__tab ${index === 0 ? 'is-active' : ''}"
                                type="button"
                                role="tab"
                                aria-selected="${index === 0 ? 'true' : 'false'}"
                                data-service-tab-index="${index}"
                            >
                                <strong>${safeText(tab.title)}</strong>
                                <i data-lucide="${safeText(tab.icon)}" aria-hidden="true"></i>
                            </button>
                        `).join('')}
                    </div>

                    <div class="service-overview__media" data-service-overview-media>
                        <div class="service-overview__photo-main image-frame" data-aos="fade-right">
                            <img src="${safeText(firstTab.image)}" alt="${safeText(firstTab.title)}" width="860" height="620" data-service-main-image>
                        </div>

                        <div class="service-overview__side" data-aos="fade-left">
                            <div class="service-overview__photo-side image-frame">
                                <img src="${safeText(firstTab.sideImage)}" alt="${safeText(firstTab.title)} details" width="620" height="340" data-service-side-image>
                            </div>

                            <article class="service-overview__text" data-service-tab-text>
                                <h3>${safeText(firstTab.title)}</h3>
                                <p>${safeText(firstTab.text)}</p>
                            </article>
                        </div>
                    </div>
                </div>
            </section>
        `;

        const buttons = qsa('[data-service-tab-index]', mount);
        const mainImage = qs('[data-service-main-image]', mount);
        const sideImage = qs('[data-service-side-image]', mount);
        const textBox = qs('[data-service-tab-text]', mount);

        buttons.forEach((button) => {
            button.addEventListener('click', () => {
                const index = Number(button.getAttribute('data-service-tab-index'));
                const tab = tabs[index];

                if (!tab || !mainImage || !sideImage || !textBox) return;

                buttons.forEach((currentButton) => {
                    currentButton.classList.remove('is-active');
                    currentButton.setAttribute('aria-selected', 'false');
                });

                button.classList.add('is-active');
                button.setAttribute('aria-selected', 'true');

                mainImage.style.opacity = '0.18';
                sideImage.style.opacity = '0.18';
                textBox.style.opacity = '0.18';
                textBox.style.transform = 'translateY(6px)';

                window.setTimeout(() => {
                    mainImage.src = safeText(tab.image);
                    mainImage.alt = safeText(tab.title);
                    sideImage.src = safeText(tab.sideImage);
                    sideImage.alt = `${safeText(tab.title)} details`;

                    textBox.innerHTML = `
                        <h3>${safeText(tab.title)}</h3>
                        <p>${safeText(tab.text)}</p>
                    `;

                    mainImage.style.opacity = '1';
                    sideImage.style.opacity = '1';
                    textBox.style.opacity = '1';
                    textBox.style.transform = 'translateY(0)';
                }, 160);
            });
        });

        [mainImage, sideImage].forEach((image) => {
            if (image) image.style.transition = 'opacity 220ms ease';
        });

        if (textBox) {
            textBox.style.transition = 'opacity 220ms ease, transform 220ms ease';
        }

        refreshIcons();
    }

    function buildServiceSteps() {
        const mount = qs('[data-service-steps]');
        if (!mount) return;

        const service = getCurrentService();
        const steps = config.servicePageDefaults?.steps || [];

        mount.innerHTML = `
            <section class="service-steps section section--dark" id="process" aria-labelledby="service-steps-title">
                <div class="container-wide">
                    <div class="service-steps__head" data-aos="fade-up">
                        <p class="section-kicker section-kicker--light">How matching works for this service</p>

                        <h2 id="service-steps-title">
                            A focused path for ${safeText(service.title).toLowerCase()} <span class="text-mark">requests</span>.
                        </h2>

                        <p>
                            Servexa helps structure the request process while participating providers handle final repair-related terms.
                        </p>
                    </div>

                    <div class="service-steps__grid">
                        ${steps.map((step, index) => `
                            <article class="service-step-circle" data-aos="zoom-in" data-aos-delay="${index * 80}">
                                <div>
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

    function buildCommonIssues() {
        const mount = qs('[data-common-issues]');
        if (!mount) return;

        const service = getCurrentService();
        const issues = service.issues || [];

        const midpoint = Math.ceil(issues.length / 2);
        const firstColumn = issues.slice(0, midpoint);
        const secondColumn = issues.slice(midpoint);

        const issueList = (items) => items.map((item) => `
            <div class="common-issues__item">
                <i data-lucide="check" aria-hidden="true"></i>
                <span>${safeText(item)}</span>
            </div>
        `).join('');

        mount.innerHTML = `
            <section class="common-issues section section--soft" aria-labelledby="common-issues-title">
                <div class="container-wide">
                    <div class="common-issues__photo" data-aos="fade-up">
                        <img src="${safeText(service.heroImage)}" alt="" width="1440" height="620" loading="lazy">

                        <div class="common-issues__photo-content">
                            <p class="section-kicker section-kicker--light">Common issue types</p>

                            <h2 id="common-issues-title">
                                Symptoms users often include in a ${safeText(service.title).toLowerCase()} <span class="text-mark">request</span>.
                            </h2>

                            <p>
                                These examples help users describe the concern. Servexa does not diagnose or repair appliances directly.
                            </p>
                        </div>
                    </div>

                    <div class="common-issues__cards">
                        <article class="common-issues__card" data-aos="fade-right">
                            <h3>Primary symptoms</h3>
                            <div class="common-issues__list">
                                ${issueList(firstColumn)}
                            </div>
                        </article>

                        <article class="common-issues__card" data-aos="fade-left">
                            <h3>Helpful request details</h3>
                            <div class="common-issues__list">
                                ${issueList(secondColumn)}
                            </div>
                        </article>
                    </div>
                </div>
            </section>
        `;

        refreshIcons();
    }

    function buildChoiceFactors() {
        const mount = qs('[data-choice-factors]');
        if (!mount) return;

        const service = getCurrentService();
        const factors = config.servicePageDefaults?.choiceFactors || [];
        const clarification = config.servicePageDefaults?.clarification || '';

        mount.innerHTML = `
            <section class="choice-factors section section--white" id="comparison" aria-labelledby="choice-factors-title">
                <div class="container">
                    <div class="choice-factors__grid">
                        <div class="choice-factors__photo photo-cover" data-aos="zoom-in">
                            <img src="${safeText(service.heroImage)}" alt="${safeText(service.title)} provider choice factors" width="760" height="760" loading="lazy">
                        </div>

                        <div class="choice-factors__content" data-aos="fade-left">
                            <p class="section-kicker">Provider choice factors</p>

                            <h2 id="choice-factors-title">
                                Compare provider details before you <span class="text-mark">continue</span>.
                            </h2>

                            <p>
                                Users may review provider-related details before deciding whether to continue. Availability and final terms can vary by location, timing, appliance type, and provider.
                            </p>

                            <div class="choice-factors__lines">
                                ${factors.map((factor) => `
                                    <div class="choice-factors__line">
                                        <i data-lucide="check" aria-hidden="true"></i>
                                        <span>${safeText(factor)}</span>
                                    </div>
                                `).join('')}
                            </div>

                            <div class="choice-factors__clarification">
                                <p>${safeText(clarification)}</p>
                            </div>

                            <div class="section-actions">
                                <a class="btn btn--emerald" href="contact.html">
                                    Start a request
                                    <i data-lucide="arrow-up-right" aria-hidden="true"></i>
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

    function buildRelatedServices() {
        const mount = qs('[data-related-services]');
        if (!mount) return;

        const currentConfigService = getCurrentServiceFromConfig();
        const related = (config.services || [])
            .filter((service) => service.title !== currentConfigService.title)
            .slice(0, 3);

        mount.innerHTML = `
            <section class="related-services section section--soft" id="services" aria-labelledby="related-services-title">
                <div class="container-wide">
                    <div class="related-services__head" data-aos="fade-up">
                        <p class="section-kicker">Related service categories</p>

                        <h2 id="related-services-title">
                            Other appliance provider-matching <span class="text-mark">paths</span>.
                        </h2>
                    </div>

                    <div class="related-services__grid">
                        ${related.map((service, index) => `
                            <article class="related-service-card card-3d shine-surface" data-aos="fade-up" data-aos-delay="${index * 80}">
                                <span class="related-service-card__icon">
                                    <i data-lucide="${safeText(service.icon)}" aria-hidden="true"></i>
                                </span>

                                <div>
                                    <h3>${safeText(service.title)}</h3>
                                    <p>${safeText(service.description)}</p>

                                    <a class="btn btn--emerald btn--small" href="${safeText(service.file)}">
                                        View category
                                        <i data-lucide="arrow-up-right" aria-hidden="true"></i>
                                    </a>
                                </div>
                            </article>
                        `).join('')}
                    </div>
                </div>
            </section>
        `;

        refreshIcons();
    }

    function buildServiceFAQ() {
        const mount = qs('[data-service-faq]');
        if (!mount) return;

        const service = getCurrentService();
        const faq = service.faq || [];

        mount.innerHTML = `
            <section class="service-faq section section--white" id="faq" aria-labelledby="service-faq-title">
                <div class="container">
                    <div class="service-faq__grid">
                        <aside class="service-faq__intro shine-surface" data-aos="fade-right">
                            <p class="section-kicker section-kicker--light">Service FAQ</p>

                            <h2 id="service-faq-title">
                                ${safeText(service.title)} questions before you <span class="text-mark">submit</span>.
                            </h2>

                            <p>
                                These answers explain the Servexa request path and keep the provider-matching model clear.
                            </p>
                        </aside>

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

        injectFAQSchema(faq, `${getCurrentServiceKey()}-faq-schema`);
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
        buildServiceHero();
        buildServiceOverview();
        buildServiceSteps();
        buildCommonIssues();
        buildChoiceFactors();
        buildRelatedServices();
        buildServiceFAQ();

        refreshIcons();

        if (window.AOS && typeof window.AOS.refreshHard === 'function') {
            window.AOS.refreshHard();
        }
    }

    document.addEventListener('DOMContentLoaded', init);
})();