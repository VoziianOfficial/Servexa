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

    function buildRequestIntro() {
        const mount = qs('[data-contact-request-intro]');
        if (!mount) return;

        const cards = config.contactPage?.requestIntroCards || [];

        mount.innerHTML = `
            <section class="request-intro section section--white" id="overview" aria-labelledby="request-intro-title">
                <div class="container-wide">
                    <div class="request-intro__head" data-reveal="up">
                        <p class="section-kicker">Request intro</p>

                        <h2 id="request-intro-title">
                            Share the details that make an appliance request <span class="text-mark">clearer</span>.
                        </h2>
                    </div>

                    <div class="request-intro__grid">
                        ${cards.map((card, index) => `
                            <article class="request-intro-card shine-surface" data-reveal="up" style="--reveal-delay: ${Math.min(index * 55, 240)}ms">
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

    function buildContactForm() {
        const mount = qs('[data-contact-form-section]');
        if (!mount) return;

        const services = config.services || [];

        mount.innerHTML = `
            <section class="contact-request section" id="request-form" aria-labelledby="request-form-title">
                <div class="contact-request__bg" aria-hidden="true">
                    <img src="assets/images/hero-contact.jpg" alt="" width="1600" height="900" loading="lazy">
                </div>

                <div class="container-wide">
                    <div class="contact-request__grid">
                        <aside class="contact-request__panel shine-surface" data-reveal="left">
                            <p class="section-kicker section-kicker--light">Main request form</p>

                            <h2 id="request-form-title">
                                Send appliance issue details through <span class="text-mark">Servexa</span>.
                            </h2>

                            <p>
                                Servexa helps organize appliance repair requests so users can review available participating provider options. Servexa does not repair appliances directly.
                            </p>

                            <div class="contact-request__list">
                                <div class="contact-request__list-item">
                                    <i data-lucide="refrigerator" aria-hidden="true"></i>
                                    <span>Include appliance type and closest service category.</span>
                                </div>

                                <div class="contact-request__list-item">
                                    <i data-lucide="clipboard-list" aria-hidden="true"></i>
                                    <span>Describe symptoms, timing, urgency, and visible error codes.</span>
                                </div>

                                <div class="contact-request__list-item">
                                    <i data-lucide="map-pin" aria-hidden="true"></i>
                                    <span>Add service area and preferred contact information.</span>
                                </div>

                                <div class="contact-request__list-item">
                                    <i data-lucide="file-text" aria-hidden="true"></i>
                                    <span>Final pricing, scheduling, warranties, and terms come from participating providers.</span>
                                </div>
                            </div>
                        </aside>

                        <form class="contact-request__form form-card" action="${safeText(config.contact?.formEndpoint || 'contact.php')}" method="POST" data-contact-form data-reveal="right" novalidate>
                            <h3>Start a request</h3>
                            <p>Fields marked with * are required. The form requires PHP-enabled hosting to send email.</p>

                            <div class="form-grid">
                                <div class="form-field">
                                    <label for="fullName">Full name *</label>
                                    <input id="fullName" name="fullName" type="text" autocomplete="name" required>
                                </div>

                                <div class="form-field">
                                    <label for="email">Email *</label>
                                    <input id="email" name="email" type="email" autocomplete="email" required>
                                </div>

                                <div class="form-field">
                                    <label for="phone">Phone *</label>
                                    <input id="phone" name="phone" type="tel" autocomplete="tel" required>
                                </div>

                                <div class="form-field">
                                    <label for="service">Service category *</label>
                                    <select id="service" name="service" required>
                                        <option value="">Choose a service</option>
                                        ${services.map((service) => `
                                            <option value="${safeText(service.title)}">${safeText(service.title)}</option>
                                        `).join('')}
                                    </select>
                                </div>

                                <div class="form-field form-field--full">
                                    <label for="message">Appliance issue details *</label>
                                    <textarea id="message" name="message" required placeholder="Example: refrigerator not cooling, freezer still works, issue started yesterday, located in..."></textarea>
                                </div>

                                <div class="honeypot" aria-hidden="true">
                                    <label for="website">Website</label>
                                    <input id="website" name="website" type="text" tabindex="-1" autocomplete="off">
                                </div>

                                <input type="hidden" name="sourcePage" value="contact.html">
                                <input type="hidden" name="formStartedAt" data-form-started-at>

                                <div class="form-field form-field--full">
                                    <label class="checkbox-field" for="privacyConsent">
                                        <input id="privacyConsent" name="privacyConsent" type="checkbox" value="yes" required>
                                        <span>I agree that Servexa may use my submitted information to respond to this request and help connect me with participating provider options. *</span>
                                    </label>
                                </div>

                                <div class="form-field form-field--full">
                                    <p class="form-disclaimer">
                                        Servexa is an independent provider-matching platform. Servexa does not perform appliance repairs directly. Final pricing, scheduling, availability, warranties, and service terms are provided by participating providers.
                                    </p>
                                </div>

                                <div class="form-field form-field--full">
                                    <button class="btn btn--primary" type="submit">
                                        Submit details
                                        <i data-lucide="send" aria-hidden="true"></i>
                                    </button>
                                </div>

                                <div class="form-field form-field--full">
                                    <div class="form-status" data-form-status role="status" aria-live="polite"></div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        `;

        refreshIcons();
        setupContactForm();
    }

    function setupContactForm() {
        const form = qs('[data-contact-form]');
        if (!form) return;

        const status = qs('[data-form-status]', form);
        const startedAt = qs('[data-form-started-at]', form);

        if (startedAt) {
            startedAt.value = String(Date.now());
        }

        const setStatus = (type, message) => {
            if (!status) return;

            status.className = `form-status is-visible is-${type}`;
            status.textContent = message;
        };

        const clearStatus = () => {
            if (!status) return;

            status.className = 'form-status';
            status.textContent = '';
        };

        const setSubmitting = (isSubmitting) => {
            const button = qs('button[type="submit"]', form);
            if (!button) return;

            button.disabled = isSubmitting;
            button.style.opacity = isSubmitting ? '0.72' : '';
            button.style.pointerEvents = isSubmitting ? 'none' : '';
            button.innerHTML = isSubmitting
                ? 'Sending...'
                : 'Submit details <i data-lucide="send" aria-hidden="true"></i>';

            refreshIcons();
        };

        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            clearStatus();

            const formData = new FormData(form);
            const fullName = safeText(formData.get('fullName')).trim();
            const email = safeText(formData.get('email')).trim();
            const phone = safeText(formData.get('phone')).trim();
            const service = safeText(formData.get('service')).trim();
            const message = safeText(formData.get('message')).trim();
            const privacyConsent = formData.get('privacyConsent');

            if (!fullName || !email || !phone || !service || !message || !privacyConsent) {
                setStatus('error', 'Please complete all required fields and accept the consent checkbox.');
                return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {
                setStatus('error', 'Please enter a valid email address.');
                return;
            }

            setSubmitting(true);

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                const data = await response.json().catch(() => ({
                    success: false,
                    message: 'The request could not be processed. Please try again.'
                }));

                if (!response.ok || !data.success) {
                    setStatus('error', data.message || 'Please check the required fields and try again.');
                    return;
                }

                form.reset();

                if (startedAt) {
                    startedAt.value = String(Date.now());
                }

                setStatus('success', data.message || 'Thank you. Your request has been received.');
            } catch (error) {
                setStatus('error', 'The form could not be sent right now. Please try again or contact Servexa by email.');
            } finally {
                setSubmitting(false);
            }
        });
    }

    function buildContactDetails() {
        const mount = qs('[data-contact-details]');
        if (!mount) return;

        const details = [
            {
                icon: 'phone',
                title: 'Phone',
                content: `<a href="tel:${safeText(config.contact?.phoneRaw)}">${safeText(config.contact?.phoneDisplay)}</a>`
            },
            {
                icon: 'mail',
                title: 'Email',
                content: `<a href="mailto:${safeText(config.contact?.email)}">${safeText(config.contact?.email)}</a>`
            },
            {
                icon: 'map-pin',
                title: 'Address',
                content: `<span>${safeText(config.company?.address)}</span>`
            },
            {
                icon: 'building-2',
                title: 'Company',
                content: `<span>${safeText(config.company?.legalName)}</span>`
            },
            {
                icon: 'badge-check',
                title: 'Company ID',
                content: `<span>${safeText(config.company?.companyId)}</span>`
            },
            {
                icon: 'map',
                title: 'Service area',
                content: `<span>${safeText(config.company?.serviceArea)}</span>`
            }
        ];

        mount.innerHTML = `
            <section class="contact-details section section--soft" id="contact" aria-labelledby="contact-details-title">
                <div class="container-wide">
                    <div class="contact-details__grid">
                        <div class="contact-details__photo image-frame" data-reveal="left">
                            <img src="assets/images/card-contact.jpg" alt="Modern appliance area in a premium home" width="760" height="720" loading="lazy">
                        </div>

                        <div class="contact-details__content" data-reveal="right">
                            <p class="section-kicker">Contact details</p>

                            <h2 id="contact-details-title">
                                Servexa company and request <span class="text-mark">information</span>.
                            </h2>

                            <p>
                                Use these details to contact Servexa about the provider-matching request path. Service pricing, scheduling, and repair terms are provided by participating providers.
                            </p>

                            <div class="contact-details__cards">
                                ${details.map((item) => `
                                    <article class="contact-detail-card">
                                        <i data-lucide="${safeText(item.icon)}" aria-hidden="true"></i>
                                        <div>
                                            <strong>${safeText(item.title)}</strong>
                                            ${item.content}
                                        </div>
                                    </article>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;

        refreshIcons();
    }

    function buildSubmissionSteps() {
        const mount = qs('[data-submission-steps]');
        if (!mount) return;

        const cards = config.contactPage?.afterSubmission || [];

        mount.innerHTML = `
            <section class="submission-steps section section--white" id="process" aria-labelledby="submission-steps-title">
                <div class="container">
                    <div class="submission-steps__head" data-reveal="up">
                        <div>
                            <p class="section-kicker">What happens after submission</p>

                            <h2 id="submission-steps-title">
                                A clear next-step path after your <span class="text-mark">request</span>.
                            </h2>

                            <p>
                                Servexa keeps the process transparent so users understand what the platform does and what participating providers handle.
                            </p>
                        </div>

                        <div class="slider-controls">
                            <button class="slider-btn submission-steps-prev" type="button" aria-label="Previous submission step">
                                <i data-lucide="arrow-left" aria-hidden="true"></i>
                            </button>

                            <button class="slider-btn submission-steps-next" type="button" aria-label="Next submission step">
                                <i data-lucide="arrow-right" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>

                    <div class="swiper submission-steps__swiper" data-reveal="up">
                        <div class="swiper-wrapper">
                            ${cards.map((card) => `
                                <div class="swiper-slide">
                                    <article class="submission-step-card shine-surface">
                                        <div>
                                            <h3>${safeText(card.title)}</h3>
                                            <p>${safeText(card.text)}</p>
                                        </div>

                                        <span class="submission-step-card__icon">
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
            new Swiper('.submission-steps__swiper', {
                slidesPerView: 2,
                spaceBetween: 12,
                loop: true,
                speed: 620,
                grabCursor: true,
                watchOverflow: true,
                navigation: {
                    nextEl: '.submission-steps-next',
                    prevEl: '.submission-steps-prev'
                },
                breakpoints: {
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 12
                    },
                    680: {
                        slidesPerView: 2,
                        spaceBetween: 12
                    },
                    1180: {
                        slidesPerView: 2,
                        spaceBetween: 12
                    }
                }
            });
        }
    }

    function buildContactFAQ() {
        const mount = qs('[data-contact-faq]');
        if (!mount) return;

        const faq = config.contactPage?.faq || [];
        if (!faq.length) return;

        mount.innerHTML = `
            <section class="contact-faq section section--soft" id="faq" aria-labelledby="contact-faq-title">
                <div class="container">
                    <div class="contact-faq__grid">
                        <div class="contact-faq__cards" role="tablist" aria-label="Contact questions" data-reveal="left">
                            ${faq.map((item, index) => `
                                <button
                                    class="contact-faq__question ${index === 0 ? 'is-active' : ''}"
                                    type="button"
                                    role="tab"
                                    aria-selected="${index === 0 ? 'true' : 'false'}"
                                    data-contact-faq-index="${index}"
                                >
                                    <i data-lucide="circle-help" aria-hidden="true"></i>
                                    <span>${safeText(item.question)}</span>
                                </button>
                            `).join('')}
                        </div>

                        <article class="contact-faq__answer shine-surface" data-contact-faq-answer data-reveal="right">
                            <span class="contact-faq__answer-icon">
                                <i data-lucide="message-circle-question" aria-hidden="true"></i>
                            </span>

                            <h3>${safeText(faq[0].question)}</h3>
                            <p>${safeText(faq[0].answer)}</p>
                        </article>
                    </div>
                </div>
            </section>
        `;

        const answer = qs('[data-contact-faq-answer]', mount);
        const buttons = qsa('[data-contact-faq-index]', mount);

        buttons.forEach((button) => {
            button.addEventListener('click', () => {
                const index = Number(button.getAttribute('data-contact-faq-index'));
                const item = faq[index];

                if (!item || !answer) return;

                buttons.forEach((currentButton) => {
                    currentButton.classList.remove('is-active');
                    currentButton.setAttribute('aria-selected', 'false');
                });

                button.classList.add('is-active');
                button.setAttribute('aria-selected', 'true');

                answer.style.opacity = '0.18';
                answer.style.transform = 'translateY(6px)';

                window.setTimeout(() => {
                    answer.innerHTML = `
                        <span class="contact-faq__answer-icon">
                            <i data-lucide="message-circle-question" aria-hidden="true"></i>
                        </span>

                        <h3>${safeText(item.question)}</h3>
                        <p>${safeText(item.answer)}</p>
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

        injectFAQSchema(faq, 'contact-faq-schema');
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
        buildRequestIntro();
        buildContactForm();
        buildContactDetails();
        buildSubmissionSteps();
        buildContactFAQ();

        refreshIcons();

        if (window.initScrollReveal) {
            window.initScrollReveal(document);
        }
    }

    document.addEventListener('DOMContentLoaded', init);
})();
