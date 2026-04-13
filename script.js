/**
 * Design Portfolio - Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    ThemeToggle.init();
    CursorGlow.init();
    ScrollReveal.init();
    SmoothScroll.init();
    ProjectModal.init();
    Lightbox.init();
});

/**
 * Theme Toggle
 * Handles light/dark mode switching with localStorage persistence
 */
const ThemeToggle = {
    init() {
        this.toggle = document.querySelector('.theme-toggle');
        if (!this.toggle) return;
        
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.setTheme(savedTheme);
        
        // Toggle theme on click
        this.toggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            this.setTheme(newTheme);
        });
    },
    
    setTheme(theme) {
        if (theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
        localStorage.setItem('theme', theme);
    }
};

/**
 * Cursor Glow Effect
 * Creates a subtle ambient glow that follows the cursor
 */
const CursorGlow = {
    init() {
        this.cursor = document.querySelector('.cursor-glow');
        if (!this.cursor || window.matchMedia('(max-width: 768px)').matches) return;
        
        this.mouseX = 0;
        this.mouseY = 0;
        this.cursorX = 0;
        this.cursorY = 0;
        
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
        
        this.animate();
    },
    
    animate() {
        // Smooth interpolation for fluid movement
        const ease = 0.08;
        this.cursorX += (this.mouseX - this.cursorX) * ease;
        this.cursorY += (this.mouseY - this.cursorY) * ease;
        
        this.cursor.style.left = `${this.cursorX}px`;
        this.cursor.style.top = `${this.cursorY}px`;
        
        requestAnimationFrame(() => this.animate());
    }
};

/**
 * Scroll Reveal Animation
 * Reveals elements as they enter the viewport
 */
const ScrollReveal = {
    init() {
        // Add reveal class to elements that should animate
        this.addRevealClass();
        
        // Create intersection observer
        const options = {
            root: null,
            rootMargin: '0px 0px -100px 0px',
            threshold: 0.1
        };
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Optional: stop observing after reveal
                    // this.observer.unobserve(entry.target);
                }
            });
        }, options);
        
        // Observe all reveal elements
        document.querySelectorAll('.reveal').forEach(el => {
            this.observer.observe(el);
        });
    },
    
    addRevealClass() {
        // Add reveal class to project cards with staggered delay
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            card.classList.add('reveal');
            card.style.transitionDelay = `${index * 0.1}s`;
        });
        
        // Add reveal class to about content
        const aboutElements = document.querySelectorAll('.about-lead, .about-text, .detail-block');
        aboutElements.forEach((el, index) => {
            el.classList.add('reveal');
            el.style.transitionDelay = `${index * 0.1}s`;
        });
        
        // Add reveal class to contact content
        const contactElements = document.querySelectorAll('.contact-cta, .contact-block');
        contactElements.forEach((el, index) => {
            el.classList.add('reveal');
            el.style.transitionDelay = `${index * 0.15}s`;
        });
    }
};

/**
 * Smooth Scroll
 * Handles smooth scrolling for anchor links
 */
const SmoothScroll = {
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 100;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
};

/**
 * Project Modal
 * Handles opening project case studies in a modal overlay
 */
const ProjectModal = {
    // Project data - populated with actual content
    projects: {
        1: {
            category: 'UX Design',
            title: 'Headspace Privacy Redesign',
            year: '2024',
            overview: 'A comprehensive redesign of how users navigate and understand data permissions during onboarding for Headspace, a mental wellness app. The project aligns the app\'s privacy experience with its core values of mindfulness, user autonomy, and clarity.',
            client: 'Headspace (Concept)',
            role: 'UX Designer',
            timeline: 'Academic Project',
            challenge: 'Headspace is a mental wellness app that collects sensitive user information including mood logs, sleep habits, and emotional check-ins. While this data supports personalized experiences, it introduces significant concerns around privacy, informed consent, and data transparency. Users needed a clearer, more respectful way to understand and control their data permissions during the critical onboarding phase.',
            solution: 'I redesigned the data permission flow to prioritize transparency and user control. The new design presents privacy options in digestible cards that explain what data is collected and why, using language that aligns with Headspace\'s calming, mindful tone. Users can granularly control permissions rather than accepting blanket terms, with clear visual feedback on their choices.',
            results: 'The redesigned onboarding flow provides users with meaningful control over their personal data while maintaining a seamless, anxiety-free experience. The design demonstrates how privacy-first thinking can enhance rather than hinder user trust and engagement in sensitive digital health contexts.',
            // Mobile app project - use special headspace layout
            projectType: 'headspace',
            // All three screens for the showcase
            screens: {
                start: { src: 'images/headspace/hs_Start_Page.png', label: 'Start Page' },
                options: { src: 'images/headspace/hs_Options.png', label: 'Privacy Options' },
                cards: { src: 'images/headspace/hs_Cards.png', label: 'Permission Cards Flow' }
            }
        },
        2: {
            category: 'UX / UI Design',
            title: 'Room & Rest Travel App',
            year: '2025',
            overview: 'A full UX/UI design for Room & Rest, a travel accommodation platform that helps users discover and book properties with confidence. The project focused on creating an intuitive search and filtering experience that surfaces the right listings quickly, paired with detail-rich property screens that give travelers all the information they need at a glance.',
            client: 'Room & Rest (Concept)',
            role: 'UX/UI Designer',
            timeline: 'Academic Project',
            challenge: 'Travelers searching for accommodations are often overwhelmed by cluttered listing pages, vague filter options, and inconsistent property details. Users needed a streamlined way to narrow down options by specific criteria such as location, price, and amenities, and then confidently evaluate individual properties without jumping between multiple screens or tabs.',
            solution: 'I designed a clean, card-based search interface with a powerful yet approachable filter modal that lets users customize results by price range, property type, amenities, and more. The filtered results page surfaces key details upfront, while the property detail screen organizes photos, descriptions, pricing, and reviews into a scannable, visually rich layout. Every screen was crafted to reduce cognitive load and guide users toward booking.',
            results: 'The design delivers a cohesive end-to-end search and booking flow that balances visual appeal with functional clarity. The filter system reduces friction in the discovery phase, while the property detail screen builds user trust through transparent, well-organized information, demonstrating how thoughtful UX can elevate the travel booking experience.',
            projectType: 'roomrest',
            screens: {
                newScreen: { src: 'images/realtor_app/New_Screen.png', label: 'Home Screen' },
                filterModal: { src: 'images/realtor_app/Filter_Modal_-_Customization_Screen.png', label: 'Filter Modal' },
                filteredSearch: { src: 'images/realtor_app/Filtered_Search_Results_Page.png', label: 'Filtered Results' },
                propertyDetail: { src: 'images/realtor_app/Property_Detail_Screen.png', label: 'Property Detail' }
            },
            artifacts: {
                ontology: { src: 'images/realtor_app/ontology.png', label: 'Domain Ontology' },
                userflow: { src: 'images/realtor_app/useflow_with_legend.png', label: 'User Flow' }
            }
        },
        3: {
            category: 'Data Visualization',
            title: 'Creative Process Data Visualization',
            year: '2025',
            overview: 'An expressive streamgraph visualization that maps how emotions such as curiosity, confusion, confidence, motivation, and frustration can shift and overlap across six stages of a creative process, from Research through Submission.',
            client: 'Self-Initiated',
            role: 'Designer & Researcher',
            timeline: 'Academic Project',
            challenge: 'The creative process is deeply emotional, yet it\'s rarely discussed in visual or quantitative terms. Designers often experience overlapping and contradictory feelings from excitement mixed with self-doubt to frustration giving way to breakthroughs. There was no clear way to communicate this internal experience to others. The challenge was to find a visual form that could represent these fluid, overlapping emotional states without oversimplifying them.',
            solution: 'I chose a streamgraph format to reflect the flowing, non-linear nature of creative emotions. Each emotion is represented as a colored stream whose width corresponds to its intensity at a given phase. The visualization progresses through Research, Ideation, Early Design, Refinement, Finalization, and Submission showing how curiosity dominates early on, confusion peaks during ideation, and confidence gradually builds toward the end. A soft, pastel palette keeps the tone approachable while the layered streams convey complexity.',
            results: 'The visualization offers designers and non-designers alike an intuitive way to understand the emotional rhythm of creative work. It reframes frustration and confusion as natural, expected parts of the process rather than signs of failure, making it both an informational graphic and a tool for creative empathy.',
            projectType: 'creative-viz',
            heroImage: 'images/creative_process/creativeVisualization.png'
        },
        4: {
            category: 'Graphic Design',
            title: 'Freecycle Ad Campaign',
            year: '2025',
            overview: 'An pathos advertisement concept for Freecycle.org that reframes the act of giving away used creative tools as an investment in someone else\'s creative future with the tagline "Give Creativity a Second Life."',
            client: 'Freecycle.org (Concept)',
            role: 'Graphic Designer',
            timeline: 'Academic Project',
            challenge: 'Freecycle.org is a grassroots recycling network, but its messaging often focuses on the environmental benefits of reuse rather than the human stories behind it. The brief called for an ad that could emotionally connect with potential donors of creative supplies (paints, markers, tape, and tools) by showing the impact their contributions could have on someone just starting their creative journey.',
            solution: 'I designed an illustrated print ad centered around a warm, inviting box of art supplies with the line "For someone\'s first collection." The soft green palette and hand-drawn style evoke a sense of generosity and approachability. The copy builds on this with "You\'re not just giving away tools. You\'re building someone\'s future by sharing." shifting the framing from disposal to empowerment. The call to action, "Join Freecycle, Share What Lasts," ties the emotional message to the platform.',
            results: 'The ad concept demonstrates how community-driven platforms like Freecycle can use emotionally resonant storytelling and illustration to drive engagement beyond environmental messaging, tapping into the deeper human motivation of creative generosity.',
            projectType: 'freecycle',
            heroImage: 'images/freecycle/freecycle.png'
        },
        5: {
            category: 'UX / UI Design',
            title: 'Emerald Rejuvenation',
            year: '2025',
            overview: 'A comprehensive redesign of the Migraine Buddy mobile app, reimagining its core screens with improved navigation, an accessible customization system, and a polished dark-theme visual identity supported by a complete UI style guide and user journey mapping.',
            client: 'Migraine Buddy (Concept)',
            role: 'UX/UI Designer',
            timeline: 'Academic Project',
            challenge: 'Migraine Buddy helps users track and manage migraine episodes, but its existing interface suffered from inconsistent navigation, limited accessibility options, and a visual language that didn\'t reflect the app\'s focus on user well-being. The redesign needed to simplify the recording workflow, improve discoverability of features, and introduce customization for users with sensory sensitivities, all while maintaining the data-rich functionality that existing users rely on.',
            solution: 'I redesigned five core screens, Homepage, Discover, Tracking, Records, and Features, with a cohesive dark-theme aesthetic that reduces visual strain. A dedicated Customization screen lets users adjust font style, size, color, and display presets (Indoor, Ambient, Outdoor) to suit their environment. The full design system was documented in a UI style guide covering colors, typography, grid, iconography, and button/link components.',
            results: 'The redesign delivers a more intuitive and visually cohesive experience that respects the sensory needs of migraine sufferers. The customization system empowers users to tailor the interface to their environment, while the comprehensive style guide ensures design consistency as the app evolves.',
            projectType: 'emerald',
            screens: {
                homepage: { src: 'images/emerald_rejuvenation/Homepage.jpg', label: 'Homepage' },
                discover: { src: 'images/emerald_rejuvenation/Discover_Page.jpg', label: 'Discover Page' },
                tracking: { src: 'images/emerald_rejuvenation/Recording_Page.jpg', label: 'Tracking Page' },
                records: { src: 'images/emerald_rejuvenation/Records_Page.jpg', label: 'Records Page' },
                features: { src: 'images/emerald_rejuvenation/Features_Page.jpg', label: 'Features Page' }
            },
            artifacts: {
                customization: { src: 'images/emerald_rejuvenation/Customization.jpg', label: 'Customization Screen' },
                userJourney: { src: 'images/emerald_rejuvenation/User_Journey_Map_Full.png', label: 'User Journey Map' },
                styleGuide: [
                    { src: 'images/emerald_rejuvenation/ui_style_guide/Colors.jpg', label: 'Colors' },
                    { src: 'images/emerald_rejuvenation/ui_style_guide/Typography.jpg', label: 'Typography' },
                    { src: 'images/emerald_rejuvenation/ui_style_guide/Button__Link.jpg', label: 'Buttons & Links' },
                    { src: 'images/emerald_rejuvenation/ui_style_guide/Grid.jpg', label: 'Grid' },
                    { src: 'images/emerald_rejuvenation/ui_style_guide/Iconography_and_Pictures.jpg', label: 'Iconography & Pictures' }
                ]
            }
        },
        6: {
            category: 'Web Development',
            title: 'Workout Log',
            year: '2025',
            overview: 'A full-stack web application for logging workouts, tracking mood changes, filtering exercise history, and exploring new exercises, complete with MongoDB backend integration and real-time data snapshots.',
            client: 'Self-Initiated',
            role: 'Designer & Developer',
            timeline: 'Academic Project',
            challenge: 'Most workout tracking tools are either oversimplified or overwhelmingly complex. Users needed a single-screen experience that could handle logging a session, reviewing history, filtering past workouts, and discovering new exercises, all without navigating between multiple pages or losing context.',
            solution: 'I designed and built a dashboard-style web app with a dark, focused interface. The layout organizes four core functions into distinct panels: a quick-log form, a filterable workout history feed, a snapshot summary with averages, and an exercise explorer with keyword search. Each workout captures duration, sets, reps, mood before and after, intensity, and notes. The MongoDB integration ensures data persists and updates in real time.',
            results: 'The app delivers a cohesive single-page experience that makes workout tracking fast and frictionless. The mood tracking feature adds a unique dimension, helping users correlate exercise habits with emotional well-being over time.',
            projectType: 'workout',
            heroImage: 'images/workout/overall.png'
        }
    },
    
    init() {
        this.modal = document.getElementById('projectModal');
        this.closeBtn = this.modal.querySelector('.modal-close');
        this.projectCards = document.querySelectorAll('.project-card[data-project]');
        
        if (!this.modal) return;
        
        // Bind click events to project cards
        this.projectCards.forEach(card => {
            card.addEventListener('click', () => {
                const projectId = card.getAttribute('data-project');
                this.openModal(projectId);
            });
        });
        
        // Close modal on button click
        this.closeBtn.addEventListener('click', () => this.closeModal());
        
        // Close modal on overlay click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });
        
        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });
    },
    
    openModal(projectId) {
        const project = this.projects[projectId];
        if (!project) return;
        
        // Clean up any injected sections from previous project
        const existingStyleGuide = this.modal.querySelector('.emerald-styleguide-section');
        if (existingStyleGuide) existingStyleGuide.remove();
        
        // Populate modal content
        this.modal.querySelector('.modal-category').textContent = project.category;
        this.modal.querySelector('.modal-title').textContent = project.title;
        this.modal.querySelector('.modal-year').textContent = project.year;
        this.modal.querySelector('.modal-overview').textContent = project.overview;
        
        // Populate details
        const details = this.modal.querySelectorAll('.modal-detail');
        if (details[0]) details[0].querySelector('p').textContent = project.client;
        if (details[1]) details[1].querySelector('p').textContent = project.role;
        if (details[2]) details[2].querySelector('p').textContent = project.timeline;
        
        // Populate text sections
        this.modal.querySelector('.modal-challenge').textContent = project.challenge;
        this.modal.querySelector('.modal-solution').textContent = project.solution;
        this.modal.querySelector('.modal-results').textContent = project.results;
        
        const heroContainer = this.modal.querySelector('#modalHero');
        const gallery1 = this.modal.querySelector('#modalGallery1');
        const gallery2 = this.modal.querySelector('#modalGallery2');
        
        // Check if this is the Headspace project with custom layout
        if (project.projectType === 'headspace') {
            // Render all three screens with the special layout
            heroContainer.innerHTML = `
                <div class="headspace-modal-showcase">
                    <div class="headspace-screen-group">
                        <div class="headspace-screen">
                            <span class="headspace-screen-label">${project.screens.start.label}</span>
                            <div class="headspace-screen-frame">
                                <img src="${project.screens.start.src}" alt="${project.screens.start.label}">
                            </div>
                        </div>
                        <div class="headspace-screen">
                            <span class="headspace-screen-label">${project.screens.options.label}</span>
                            <div class="headspace-screen-frame">
                                <img src="${project.screens.options.src}" alt="${project.screens.options.label}">
                            </div>
                        </div>
                    </div>
                    <div class="headspace-scroll-screen">
                        <span class="headspace-screen-label">${project.screens.cards.label}</span>
                        <div class="headspace-scroll-frame">
                            <div class="headspace-scroll-container">
                                <img src="${project.screens.cards.src}" alt="${project.screens.cards.label}">
                            </div>
                        </div>
                        <div class="headspace-scroll-hint">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 5v14M19 12l-7 7-7-7"/>
                            </svg>
                            <span>Scroll to see more</span>
                        </div>
                    </div>
                </div>
            `;
            
            // Hide galleries for headspace project - all content is in hero
            gallery1.style.display = 'none';
            gallery2.style.display = 'none';
            
        } else if (project.projectType === 'roomrest') {
            heroContainer.innerHTML = `
                <div class="roomrest-modal-showcase">
                    <div class="roomrest-screen">
                        <span class="roomrest-screen-label">${project.screens.newScreen.label}</span>
                        <div class="roomrest-screen-frame">
                            <img src="${project.screens.newScreen.src}" alt="${project.screens.newScreen.label}">
                        </div>
                    </div>
                    <div class="roomrest-screen">
                        <span class="roomrest-screen-label">${project.screens.filterModal.label}</span>
                        <div class="roomrest-screen-frame">
                            <img src="${project.screens.filterModal.src}" alt="${project.screens.filterModal.label}">
                        </div>
                    </div>
                    <div class="roomrest-screen">
                        <span class="roomrest-screen-label">${project.screens.filteredSearch.label}</span>
                        <div class="roomrest-screen-frame">
                            <img src="${project.screens.filteredSearch.src}" alt="${project.screens.filteredSearch.label}">
                        </div>
                    </div>
                    <div class="roomrest-screen">
                        <span class="roomrest-screen-label">${project.screens.propertyDetail.label}</span>
                        <div class="roomrest-screen-frame">
                            <img src="${project.screens.propertyDetail.src}" alt="${project.screens.propertyDetail.label}">
                        </div>
                    </div>
                </div>
            `;
            
            gallery1.innerHTML = `
                <div class="artifact-display">
                    <span class="artifact-label">${project.artifacts.ontology.label}</span>
                    <img src="${project.artifacts.ontology.src}" alt="${project.artifacts.ontology.label}" class="artifact-img lightbox-trigger" data-full-src="${project.artifacts.ontology.src}">
                    <span class="click-to-expand-hint">Click diagram to enlarge</span>
                </div>
            `;
            gallery1.classList.add('full-width');
            gallery1.style.display = 'flex';
            
            gallery2.innerHTML = `
                <div class="artifact-display">
                    <span class="artifact-label">${project.artifacts.userflow.label}</span>
                    <img src="${project.artifacts.userflow.src}" alt="${project.artifacts.userflow.label}" class="artifact-img lightbox-trigger" data-full-src="${project.artifacts.userflow.src}">
                    <span class="click-to-expand-hint">Click diagram to enlarge</span>
                </div>
            `;
            gallery2.classList.remove('single');
            gallery2.style.display = 'flex';
            
        } else if (project.projectType === 'creative-viz') {
            heroContainer.innerHTML = `
                <div class="creative-modal-showcase">
                    <img src="${project.heroImage}" alt="${project.title}" class="creative-modal-img lightbox-trigger" data-full-src="${project.heroImage}">
                    <span class="click-to-expand-hint">Click image to enlarge</span>
                </div>
            `;
            
            gallery1.style.display = 'none';
            gallery2.style.display = 'none';
            
        } else if (project.projectType === 'emerald') {
            const screenKeys = ['homepage', 'discover', 'tracking', 'records', 'features'];
            heroContainer.innerHTML = `
                <div class="emerald-modal-showcase">
                    ${screenKeys.map(key => `
                        <div class="emerald-screen">
                            <span class="emerald-screen-label">${project.screens[key].label}</span>
                            <div class="emerald-screen-frame">
                                <img src="${project.screens[key].src}" alt="${project.screens[key].label}">
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
            
            // Gallery 1 (between Challenge & Solution): User Journey + Style Guide
            gallery1.innerHTML = `
                <div class="artifact-display" style="margin-bottom: var(--space-lg);">
                    <span class="artifact-label">${project.artifacts.userJourney.label}</span>
                    <img src="${project.artifacts.userJourney.src}" alt="${project.artifacts.userJourney.label}" class="artifact-img lightbox-trigger" data-full-src="${project.artifacts.userJourney.src}">
                    <span class="click-to-expand-hint">Click image to enlarge</span>
                </div>
                <div class="artifact-display">
                    <span class="artifact-label">UI Style Guide</span>
                    <div class="styleguide-grid">
                        ${project.artifacts.styleGuide.map(item => `
                            <div class="styleguide-item">
                                <img src="${item.src}" alt="${item.label}" class="lightbox-trigger" data-full-src="${item.src}">
                                <span class="styleguide-item-label">${item.label}</span>
                            </div>
                        `).join('')}
                    </div>
                    <span class="click-to-expand-hint">Click any image to enlarge</span>
                </div>
            `;
            gallery1.classList.add('full-width');
            gallery1.style.display = 'flex';
            
            // Gallery 2 (between Solution & Results): Customization Screen
            gallery2.innerHTML = `
                <div class="artifact-display">
                    <span class="artifact-label">${project.artifacts.customization.label}</span>
                    <div class="emerald-single-screen-frame">
                        <img src="${project.artifacts.customization.src}" alt="${project.artifacts.customization.label}">
                    </div>
                </div>
            `;
            gallery2.classList.remove('single');
            gallery2.style.display = 'flex';
            
        } else if (project.projectType === 'workout') {
            heroContainer.innerHTML = `
                <div class="workout-modal-showcase">
                    <img src="${project.heroImage}" alt="${project.title}" class="workout-modal-img">
                </div>
            `;
            
            gallery1.style.display = 'none';
            gallery2.style.display = 'none';
            
        } else if (project.projectType === 'freecycle') {
            heroContainer.innerHTML = `
                <div class="freecycle-modal-showcase">
                    <img src="${project.heroImage}" alt="${project.title}" class="freecycle-modal-img">
                </div>
            `;
            
            gallery1.style.display = 'none';
            gallery2.style.display = 'none';
            
        } else if (project.projectType === 'mobile-app') {
            // Render device screens in phone frames
            if (project.deviceScreens && project.deviceScreens.length > 0) {
                heroContainer.innerHTML = `
                    <div class="device-showcase">
                        ${project.deviceScreens.map(screen => `
                            <div class="device-frame">
                                <div class="device-notch"></div>
                                <img src="${screen.src}" alt="${screen.label}">
                                <span class="device-label">${screen.label}</span>
                            </div>
                        `).join('')}
                    </div>
                `;
            }
            
            // Render scroll screen in scrollable container
            if (project.scrollScreen) {
                gallery1.innerHTML = `
                    <div class="scroll-showcase">
                        <div class="scroll-label">
                            <span>${project.scrollScreen.label}</span>
                            <span class="scroll-hint">↓ Scroll to explore</span>
                        </div>
                        <div class="scroll-container">
                            <img src="${project.scrollScreen.src}" alt="${project.scrollScreen.label}">
                        </div>
                    </div>
                `;
                gallery1.classList.add('full-width');
                gallery1.style.display = 'flex';
            } else {
                gallery1.classList.remove('full-width');
            }
            
            // Hide second gallery for mobile app projects
            gallery2.style.display = 'none';
            
        } else {
            // Standard project - use regular image display
            gallery1.classList.remove('full-width');
            gallery1.style.display = 'flex';
            
            // Populate hero image
            if (project.heroImage) {
                heroContainer.innerHTML = `<img src="${project.heroImage}" alt="${project.title}" class="modal-hero-img">`;
            } else {
                heroContainer.innerHTML = `<div class="modal-placeholder"><span>Hero Image</span></div>`;
            }
            
            // Populate gallery images
            if (project.galleryImages && project.galleryImages.length >= 2) {
                gallery1.innerHTML = `
                    <img src="${project.galleryImages[0]}" alt="${project.title} - Detail 1" class="gallery-item">
                    <img src="${project.galleryImages[1]}" alt="${project.title} - Detail 2" class="gallery-item">
                `;
                if (project.galleryImages.length > 2) {
                    gallery2.innerHTML = `<img src="${project.galleryImages[2]}" alt="${project.title} - Detail 3" class="gallery-item">`;
                    gallery2.style.display = 'flex';
                } else {
                    gallery2.style.display = 'none';
                }
            } else {
                gallery1.innerHTML = `
                    <div class="modal-placeholder gallery-item"><span>Image 1</span></div>
                    <div class="modal-placeholder gallery-item"><span>Image 2</span></div>
                `;
                gallery2.innerHTML = `<div class="modal-placeholder gallery-item"><span>Image 3</span></div>`;
                gallery2.style.display = 'flex';
            }
        }
        
        // Show modal
        this.modal.classList.add('active');
        document.body.classList.add('modal-open');
        
        // Scroll modal to top
        this.modal.scrollTop = 0;
    },
    
    closeModal() {
        this.modal.classList.remove('active');
        document.body.classList.remove('modal-open');
    }
};

/**
 * Parallax Effect for Hero (Optional Enhancement)
 * Uncomment to enable subtle parallax on scroll
 */
/*
const Parallax = {
    init() {
        this.hero = document.querySelector('.hero-content');
        if (!this.hero) return;
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            this.hero.style.transform = `translateY(${rate}px)`;
        });
    }
};
*/

/**
 * Image Lazy Loading (For when real images are added)
 * Uncomment and configure when adding actual project images
 */
/*
const LazyLoad = {
    init() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
};
*/

/**
 * Lightbox
 * Opens images in a fullscreen overlay for better visibility
 */
const Lightbox = {
    init() {
        this.overlay = document.getElementById('imageLightbox');
        if (!this.overlay) return;
        
        this.img = this.overlay.querySelector('.lightbox-img');
        this.closeBtn = this.overlay.querySelector('.lightbox-close');
        
        this.closeBtn.addEventListener('click', () => this.close());
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) this.close();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.overlay.classList.contains('active')) {
                this.close();
            }
        });
        
        document.addEventListener('click', (e) => {
            const trigger = e.target.closest('.lightbox-trigger');
            if (trigger) {
                const src = trigger.dataset.fullSrc || trigger.src;
                const alt = trigger.alt || '';
                this.open(src, alt);
            }
        });
    },
    
    open(src, alt) {
        this.img.src = src;
        this.img.alt = alt;
        this.overlay.classList.add('active');
    },
    
    close() {
        this.overlay.classList.remove('active');
        this.img.src = '';
    }
};

