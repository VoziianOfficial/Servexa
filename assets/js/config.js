'use strict';

window.SERVEXA_SITE_CONFIG = {
    brand: {
        name: 'Servexa',
        tagline: 'Independent Appliance Repair Provider Matching',
        shortTagline: 'Appliance provider matching',
        logo: 'assets/images/logo.svg',
        logoAlt: 'Servexa logo'
    },

    company: {
        name: 'Servexa',
        legalName: 'Servexa Provider Matching Platform',
        companyId: 'SX-APPLIANCE-2048',
        address: 'USA Service Area',
        serviceArea: 'Independent appliance repair provider matching across selected service areas'
    },

    contact: {
        phoneRaw: '+18885550163',
        phoneDisplay: '(888) 555-0163',
        phoneButtonText: 'Start Request',
        email: 'hello@servexa.com',
        supportHours: 'Mon–Fri, 8:00 AM–7:00 PM',
        formRecipient: 'hello@servexa.com',
        formEndpoint: 'contact.php'
    },

    navigation: [
        {
            label: 'Home',
            url: 'index.html'
        },
        {
            label: 'About',
            url: 'about.html'
        },
        {
            label: 'Services',
            url: 'all-services.html'
        },
        {
            label: 'Contact',
            url: 'contact.html'
        }
    ],

    legalLinks: [
        {
            label: 'Privacy Policy',
            url: 'privacy-policy.html'
        },
        {
            label: 'Terms of Service',
            url: 'terms-of-service.html'
        },
        {
            label: 'Cookie Policy',
            url: 'cookie-policy.html'
        }
    ],

    services: [
        {
            title: 'Refrigerator Repair',
            shortTitle: 'Refrigerators',
            file: 'refrigerator-repair.html',
            icon: 'refrigerator',
            image: 'assets/images/service-1.jpg',
            heroImage: 'assets/images/hero-refrigerator.jpg',
            description: 'Compare local provider options for refrigerator cooling, leaks, noise, freezer, and ice maker concerns.',
            symptoms: [
                'Not cooling',
                'Freezer concerns',
                'Water leaks',
                'Ice maker issues',
                'Unusual noise'
            ]
        },
        {
            title: 'Washer Repair',
            shortTitle: 'Washers',
            file: 'washer-repair.html',
            icon: 'washing-machine',
            image: 'assets/images/service-2.jpg',
            heroImage: 'assets/images/hero-washer.jpg',
            description: 'Submit washer issue details and review provider options for leaks, spin problems, draining issues, and cycle failures.',
            symptoms: [
                'Not draining',
                'Not spinning',
                'Leaks',
                'Heavy vibration',
                'Error codes'
            ]
        },
        {
            title: 'Dryer Repair',
            shortTitle: 'Dryers',
            file: 'dryer-repair.html',
            icon: 'rotate-cw-square',
            image: 'assets/images/service-3.jpg',
            heroImage: 'assets/images/hero-dryer.jpg',
            description: 'Compare available provider options for dryer heating problems, slow drying, unusual noise, and start issues.',
            symptoms: [
                'No heat',
                'Slow drying',
                'Drum concerns',
                'Unusual noise',
                'Overheating concerns'
            ]
        },
        {
            title: 'Dishwasher Repair',
            shortTitle: 'Dishwashers',
            file: 'dishwasher-repair.html',
            icon: 'square-stack',
            image: 'assets/images/service-4.jpg',
            heroImage: 'assets/images/hero-dishwasher.jpg',
            description: 'Find provider options for dishwasher leaks, drainage problems, poor cleaning, and cycle concerns.',
            symptoms: [
                'Poor cleaning',
                'Leaking',
                'Drainage issues',
                'Door latch concerns',
                'Cycle problems'
            ]
        },
        {
            title: 'Oven & Range Repair',
            shortTitle: 'Ovens & Ranges',
            file: 'oven-range-repair.html',
            icon: 'cooking-pot',
            image: 'assets/images/service-5.jpg',
            heroImage: 'assets/images/hero-oven-range.jpg',
            description: 'Compare local provider options for oven, range, cooktop, burner, heating, and ignition concerns.',
            symptoms: [
                'Uneven heating',
                'Burner issues',
                'Ignition concerns',
                'Control problems',
                'Temperature concerns'
            ]
        },
        {
            title: 'Appliance Diagnostics',
            shortTitle: 'Diagnostics',
            file: 'appliance-diagnostics.html',
            icon: 'search-check',
            image: 'assets/images/service-6.jpg',
            heroImage: 'assets/images/hero-diagnostics.jpg',
            description: 'Submit appliance symptoms and connect with participating providers who may evaluate the issue.',
            symptoms: [
                'Unknown symptoms',
                'Strange noises',
                'Power issues',
                'Performance changes',
                'Multiple appliance concerns'
            ]
        }
    ],

    hero: {
        home: {
            image: 'assets/images/hero-home.jpg',
            kicker: 'Independent Appliance Repair Provider Matching',
            title: 'Compare Options',
            markedWord: 'Options',
            text: 'Start an appliance issue request through Servexa and review available provider options in your area.',
            primaryButton: {
                label: 'Start a request',
                url: 'contact.html'
            },
            secondaryButton: {
                label: 'View services',
                url: 'all-services.html'
            }
        },
        about: {
            image: 'assets/images/hero-about.jpg',
            kicker: 'About Servexa',
            title: 'Appliance Help',
            markedWord: 'Help',
            text: 'Servexa helps homeowners describe appliance concerns clearly and compare participating local provider options.',
            primaryButton: {
                label: 'Compare options',
                url: 'all-services.html'
            },
            secondaryButton: {
                label: 'Contact Servexa',
                url: 'contact.html'
            }
        },
        services: {
            image: 'assets/images/hero-services.jpg',
            kicker: 'Service Categories',
            title: 'Repair Categories',
            markedWord: 'Categories',
            text: 'Choose an appliance category or use diagnostics when the issue is unclear.',
            primaryButton: {
                label: 'Start a request',
                url: 'contact.html'
            },
            secondaryButton: {
                label: 'Compare services',
                url: '#services'
            }
        },
        contact: {
            image: 'assets/images/hero-contact.jpg',
            kicker: 'Contact Servexa',
            title: 'Submit Details',
            markedWord: 'Details',
            text: 'Send appliance issue information and take the next step toward reviewing provider options.',
            primaryButton: {
                label: 'Start a request',
                url: '#request-form'
            },
            secondaryButton: {
                label: 'View services',
                url: 'all-services.html'
            }
        }
    },

    postHeroNav: {
        defaultLinks: [
            {
                label: 'Overview',
                icon: 'layout-list',
                target: '#overview'
            },
            {
                label: 'Services',
                icon: 'wrench',
                target: '#services'
            },
            {
                label: 'Process',
                icon: 'route',
                target: '#process'
            },
            {
                label: 'FAQ',
                icon: 'circle-help',
                target: '#faq'
            },
            {
                label: 'Contact',
                icon: 'send',
                target: '#contact'
            }
        ],
        searchPlaceholder: 'Search appliance issue'
    },

    home: {
        quickPathItems: [
            {
                title: 'Refrigerator not cooling',
                icon: 'thermometer-snowflake',
                image: 'assets/images/service-1.jpg',
                text: 'Describe cooling changes, freezer behavior, leaks, unusual sounds, and model details if available. Servexa helps organize the request so participating providers can understand the concern more clearly.'
            },
            {
                title: 'Washer not draining',
                icon: 'waves',
                image: 'assets/images/service-2.jpg',
                text: 'Share whether water remains in the drum, the cycle stops early, the appliance vibrates, or an error code appears. These details may help users review more relevant provider options.'
            },
            {
                title: 'Dryer not heating',
                icon: 'flame',
                image: 'assets/images/service-3.jpg',
                text: 'Add details about drying time, heat level, drum movement, lint buildup concerns, or unusual noise. Servexa does not repair dryers directly, but helps users start a clearer provider request.'
            },
            {
                title: 'Dishwasher leaking',
                icon: 'droplets',
                image: 'assets/images/service-4.jpg',
                text: 'Include where water appears, when the leak happens, drainage behavior, door latch concerns, and cleaning performance so provider options can be reviewed with better context.'
            },
            {
                title: 'Oven not warming evenly',
                icon: 'cooking-pot',
                image: 'assets/images/service-5.jpg',
                text: 'Explain heating inconsistencies, burner behavior, ignition issues, temperature changes, or control concerns. Final evaluation and service terms come from participating providers.'
            },
            {
                title: 'Unknown appliance symptoms',
                icon: 'search-check',
                image: 'assets/images/service-6.jpg',
                text: 'When the issue is unclear, Appliance Diagnostics can be used as a starting category. Users can describe symptoms and decide whether to continue with a participating provider.'
            }
        ],

        featuredServices: [
            'Refrigerator Repair',
            'Washer Repair',
            'Dryer Repair',
            'Oven & Range Repair'
        ],

        comparisonFactors: [
            'Availability',
            'Service area',
            'Appliance type experience',
            'Quote clarity',
            'Timing',
            'Provider communication',
            'Warranty or terms if offered',
            'User choice before continuing'
        ],

        stats: [
            {
                value: 6,
                suffix: '',
                label: 'service categories'
            },
            {
                value: 24,
                suffix: '',
                label: 'request details users can clarify'
            },
            {
                value: 3,
                suffix: '',
                label: 'comparison steps'
            },
            {
                value: 100,
                suffix: '%',
                label: 'user choice'
            }
        ],

        faq: [
            {
                question: 'Does Servexa repair appliances directly?',
                answer: 'No. Servexa is an independent provider-matching platform. Appliance repair work, pricing, scheduling, warranties, and service terms are handled by participating providers.'
            },
            {
                question: 'What happens after I submit a request?',
                answer: 'Your appliance issue details may be organized so you can review available provider options. You choose whether to continue with any provider.'
            },
            {
                question: 'Can I compare provider options?',
                answer: 'Yes. Servexa is designed to help users compare available provider paths based on factors such as appliance type, availability, location, timing, and provider communication.'
            },
            {
                question: 'What affects appliance repair pricing?',
                answer: 'Pricing may depend on appliance type, symptoms, parts, labor, location, timing, provider policies, and final inspection or evaluation by the provider.'
            },
            {
                question: 'Is provider availability the same everywhere?',
                answer: 'No. Provider availability can vary by service area, appliance category, timing, and local participating provider coverage.'
            }
        ]
    },

    about: {
        transparencyCards: [
            {
                title: 'Independent platform',
                icon: 'badge-check',
                text: 'Servexa is not a direct appliance repair company and does not present itself as a repair crew.'
            },
            {
                title: 'Availability may vary',
                icon: 'map-pin',
                text: 'Provider availability depends on location, appliance category, timing, and participating provider coverage.'
            },
            {
                title: 'Provider pricing',
                icon: 'receipt-text',
                text: 'Final pricing, service terms, scheduling, and warranty details come from participating providers.'
            },
            {
                title: 'User choice',
                icon: 'mouse-pointer-click',
                text: 'Users decide whether to continue with a provider after reviewing available options.'
            },
            {
                title: 'Verify requirements',
                icon: 'shield-check',
                text: 'Where required, homeowners should verify license, insurance, and provider qualifications before hiring.'
            },
            {
                title: 'No service agreement by request',
                icon: 'file-check-2',
                text: 'Submitting a request through Servexa does not create a repair contract or service agreement.'
            }
        ],

        faq: [
            {
                question: 'Why does Servexa exist?',
                answer: 'Servexa helps homeowners start appliance repair requests more clearly and review available provider options without claiming to perform repairs directly.'
            },
            {
                question: 'Is Servexa a repair company?',
                answer: 'No. Servexa is an independent provider-matching platform, not a contractor, technician team, manufacturer, retailer, or official appliance service company.'
            },
            {
                question: 'Who provides pricing and service terms?',
                answer: 'Participating providers provide final pricing, availability, scheduling, warranties, and service terms.'
            },
            {
                question: 'Do I have to continue with a provider?',
                answer: 'No. Users choose whether to continue after reviewing available provider options.'
            }
        ]
    },

    contactPage: {
        requestIntroCards: [
            {
                title: 'Appliance type',
                icon: 'refrigerator',
                text: 'Choose the closest appliance category so your request starts in the right direction.'
            },
            {
                title: 'Symptoms',
                icon: 'clipboard-list',
                text: 'Describe what changed, when the issue appears, and any visible error codes or sounds.'
            },
            {
                title: 'Timing and area',
                icon: 'map-pin-check',
                text: 'Include service area and preferred timing so provider availability can be considered.'
            }
        ],

        afterSubmission: [
            {
                title: 'Request received',
                icon: 'inbox',
                text: 'Your submitted appliance issue details are received through the Servexa request form.'
            },
            {
                title: 'Details organized',
                icon: 'list-checks',
                text: 'The request details may be organized around appliance type, symptoms, location, and contact information.'
            },
            {
                title: 'Provider options',
                icon: 'users',
                text: 'You may be connected with participating local providers depending on availability and service area.'
            },
            {
                title: 'Provider terms',
                icon: 'file-text',
                text: 'Final pricing, scheduling, warranties, and service terms are provided by participating providers.'
            },
            {
                title: 'User decision',
                icon: 'mouse-pointer-click',
                text: 'You choose whether to continue with any provider after reviewing available options.'
            }
        ],

        faq: [
            {
                question: 'What should I include in the message?',
                answer: 'Include the appliance type, symptoms, when the issue started, urgency, service area, and contact details.'
            },
            {
                question: 'Will Servexa repair the appliance?',
                answer: 'No. Servexa does not perform appliance repair work. Participating providers handle repair-related work and terms.'
            },
            {
                question: 'Does submitting a request create an agreement?',
                answer: 'No. Submitting a request does not create a service agreement. Users decide whether to continue with a provider.'
            },
            {
                question: 'How is my information used?',
                answer: 'Submitted information may be used to respond to your request and help connect you with participating provider options.'
            }
        ]
    },

    servicePageDefaults: {
        steps: [
            {
                title: 'Submit symptoms',
                icon: 'clipboard-pen',
                text: 'Describe what is happening with the appliance and when the issue appears.'
            },
            {
                title: 'Add details',
                icon: 'badge-info',
                text: 'Include appliance type, model details if available, location, and preferred timing.'
            },
            {
                title: 'Review options',
                icon: 'list-checks',
                text: 'Compare available participating provider options when available in your area.'
            },
            {
                title: 'Choose next step',
                icon: 'mouse-pointer-click',
                text: 'Decide whether to continue directly with a provider based on their terms.'
            }
        ],

        choiceFactors: [
            'Availability',
            'Service area',
            'Timing',
            'Appliance type experience',
            'Quote clarity',
            'Communication',
            'Provider terms'
        ],

        clarification: 'Servexa is an independent appliance repair provider-matching platform. Servexa does not perform appliance repair work directly. Final pricing, availability, scheduling, warranties, and service terms come from participating providers. Users decide whether to continue with a provider.'
    },

    legal: {
        disclaimer: 'Disclaimer: This site is a free service to assist homeowners in connecting with local service providers. All contractors/providers are independent and this site does not warrant or guarantee any work performed. It is the responsibility of the homeowner to verify that the hired contractor furnishes the necessary license and insurance required for the work being performed. All persons depicted in a photo or video are actors or models and not contractors listed on this site.',
        privacySummary: 'Submitted request information may be used to respond to users, organize appliance issue details, and help connect users with participating provider options.',
        termsSummary: 'Servexa is an independent provider-matching platform and does not guarantee provider availability, pricing, licensing, insurance, warranties, workmanship, or outcomes.',
        cookieSummary: 'Servexa may use essential localStorage or cookie-style browser storage for cookie consent, basic preferences, and optional site performance features.'
    },

    footer: {
        description: 'Servexa helps homeowners submit appliance issue details and compare available local provider options. Servexa is not a direct appliance repair company.',
        copyright: '© 2026 Servexa. All rights reserved.',
        miniStatement: 'Independent Appliance Repair Provider Matching'
    },

    cta: {
        home: {
            title: 'Ready to compare appliance provider options?',
            text: 'Start with clear appliance issue details and review available provider paths.',
            primaryLabel: 'Start a request',
            primaryUrl: 'contact.html',
            secondaryLabel: 'View services',
            secondaryUrl: 'all-services.html'
        },
        about: {
            title: 'A clearer way to start an appliance request.',
            text: 'Understand the platform model before choosing your next step.',
            primaryLabel: 'Compare options',
            primaryUrl: 'all-services.html',
            secondaryLabel: 'Contact Servexa',
            secondaryUrl: 'contact.html'
        },
        services: {
            title: 'Choose a category and review available provider paths.',
            text: 'Select the appliance type that best matches your issue.',
            primaryLabel: 'Start a request',
            primaryUrl: 'contact.html',
            secondaryLabel: 'View categories',
            secondaryUrl: 'all-services.html'
        },
        contact: {
            title: 'Send the details and take the next step.',
            text: 'Your request can help organize appliance symptoms before reviewing provider options.',
            primaryLabel: 'Start a request',
            primaryUrl: '#request-form',
            secondaryLabel: 'View services',
            secondaryUrl: 'all-services.html'
        },
        service: {
            title: 'Compare provider options for this appliance issue.',
            text: 'Submit symptoms, review available provider paths, and choose whether to continue.',
            primaryLabel: 'Start a request',
            primaryUrl: 'contact.html',
            secondaryLabel: 'All services',
            secondaryUrl: 'all-services.html'
        },
        legal: {
            title: 'Return to Servexa service categories.',
            text: 'Review appliance provider-matching paths and start with the right category.',
            primaryLabel: 'View services',
            primaryUrl: 'all-services.html',
            secondaryLabel: 'Contact Servexa',
            secondaryUrl: 'contact.html'
        }
    }
};

window.SiteConfig = window.SERVEXA_SITE_CONFIG;
