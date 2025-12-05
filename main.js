// Assyl DataHub - Main JavaScript File
// Handles all interactive functionality, user profiles, and data management

class AssylDataHub {
    constructor() {
        this.currentLanguage = 'en';
        this.currentUser = null;
        this.selectedUniversities = [];
        this.userData = {};
        this.universities = this.initializeUniversities();
        this.translations = this.initializeTranslations();
        this.init();
    }

    init() {
        this.loadUserData();
        this.setupEventListeners();
        this.initializeAnimations();
        this.setupLanguageSwitcher();
        this.updateUI();
    }

    // University Data Initialization
    initializeUniversities() {
        return {
            kaznu: {
                name: {
                    en: "Al-Farabi Kazakh National University",
                    ru: "Казахский Национальный Университет имени аль-Фараби",
                    kz: "Әл-Фараби атындағы Қазақ Ұлттық Университеті"
                },
                location: "Almaty, Kazakhstan",
                founded: 1934,
                students: 20000,
                internationalStudents: 3000,
                ranking: { world: 166, asia: 38, centralAsia: 1 },
                image: "https://kimi-web-img.moonshot.cn/img/argroupofeducation.com/511392b3adf8cd1d6e79bc2a39df307261dd6482.jpg",
                about: {
                    mission: {
                        en: "To be a leading research university that contributes to the sustainable development of Kazakhstan and global society through innovation, education, and research excellence.",
                        ru: "Быть ведущим исследовательским университетом, способствующим устойчивому развитию Казахстана и мирового сообщества через инновации, образование и исследовательское превосходство.",
                        kz: "Қазақстанның және жаһандық қоғамның тұрақты дамуына инновациялар, білім және зерттеу жетістіктері арқылы үлес қосатын жетекші зерттеу университеті болу."
                    },
                    history: {
                        en: "Founded in 1934, KazNU is the oldest and largest university in Kazakhstan. It has trained over 100,000 professionals and is recognized as the flagship institution of higher education in Central Asia.",
                        ru: "Основанный в 1934 году, КазНУ является старейшим и крупнейшим университетом в Казахстане. Он подготовил более 100 000 специалистов и признан флагманом высшего образования в Центральной Азии.",
                        kz: "1934 жылы құрылған ҚазҰУ - Қазақстандағы ең ескі және ірі университет. Ол 100 000-нан астам маман дайындап, Орталық Азиядағы жоғары білімнің флагманы ретінде танылған."
                    }
                },
                programs: [
                    { name: { en: "Computer Science", ru: "Информатика", kz: "Компьютерлік ғылым" }, degree: "Bachelor", duration: "4 years", language: "English/Russian" },
                    { name: { en: "Medicine", ru: "Медицина", kz: "Медицина" }, degree: "MD", duration: "6 years", language: "English/Russian" },
                    { name: { en: "Engineering", ru: "Инженерия", kz: "Инженерия" }, degree: "Master", duration: "2 years", language: "English" },
                    { name: { en: "Business Administration", ru: "Бизнес-администрирование", kz: "Бизнес әкімшілігі" }, degree: "MBA", duration: "2 years", language: "English" }
                ],
                admission: {
                    requirements: {
                        en: "High school diploma, entrance exam, language proficiency",
                        ru: "Аттестат о среднем образовании, вступительный экзамен, владение языком",
                        kz: "Орта білім туралы аттестат, емтихан, тіл білімі"
                    },
                    deadline: "August 15, 2025",
                    fees: { tuition: 4500, accommodation: 800, total: 5300 }
                }
            },
            nazarbayev: {
                name: {
                    en: "Nazarbayev University",
                    ru: "Назарбаев Университет",
                    kz: "Назарбаев Университеті"
                },
                location: "Astana, Kazakhstan",
                founded: 2010,
                students: 9000,
                internationalStudents: 1200,
                ranking: { world: 400, asia: 100, centralAsia: 2 },
                image: "https://kimi-web-img.moonshot.cn/img/airial.travel/b413baf6646e349f9c926b4b782a8a5a1b8a5870",
                about: {
                    mission: {
                        en: "To develop as a world-class research university that contributes to the sustainable development of Kazakhstan through innovation, research, and education.",
                        ru: "Развиваться как исследовательский университет мирового класса, способствующий устойчивому развитию Казахстана через инновации, исследования и образование.",
                        kz: "Қазақстанның тұрақты дамуына инновациялар, зерттеулер және білім арқылы үлес қосатын әлемдік деңгейдегі зерттеу университеті ретінде даму."
                    }
                },
                programs: [
                    { name: { en: "Engineering", ru: "Инженерия", kz: "Инженерия" }, degree: "Bachelor", duration: "4 years", language: "English" },
                    { name: { en: "Public Policy", ru: "Государственная политика", kz: "Мемлекеттік саясат" }, degree: "Master", duration: "2 years", language: "English" }
                ],
                admission: {
                    fees: { tuition: 8000, accommodation: 1200, total: 9200 }
                }
            },
            kaznmu: {
                name: {
                    en: "Asfendiyarov Kazakh National Medical University",
                    ru: "Казахский Национальный Медицинский Университет имени Асфендиярова",
                    kz: "С.Д. Асфендияров атындағы Қазақ Ұлттық Медицина Университеті"
                },
                location: "Almaty, Kazakhstan",
                founded: 1930,
                students: 10378,
                internationalStudents: 1773,
                ranking: { world: 1000, asia: 200, centralAsia: 3 },
                image: "https://kimi-web-img.moonshot.cn/img/nissanstudyservices.com/721e2876de3ed1da40552a05041125f80fe6aacb.webp",
                about: {
                    mission: {
                        en: "To train competitive healthcare professionals based on the integration of advanced educational and scientific medical technologies.",
                        ru: "Подготовка конкурентоспособных специалистов здравоохранения на основе интеграции передовых образовательных и научных медицинских технологий.",
                        kz: "Білікті денсаулық сақтау мамандарын оқытудың алдыңғы қатарлы білім беру және ғылыми медициналық технологияларды интеграциялау негізінде дайындау."
                    }
                },
                programs: [
                    { name: { en: "General Medicine", ru: "Общая медицина", kz: "Жалпы медицина" }, degree: "MD", duration: "6 years", language: "English/Russian" },
                    { name: { en: "Dentistry", ru: "Стоматология", kz: "Тіс емі" }, degree: "Bachelor", duration: "5 years", language: "English/Russian" }
                ],
                admission: {
                    fees: { tuition: 5700, accommodation: 800, total: 6500 }
                }
            }
        };
    }

    // Translation System
    initializeTranslations() {
        return {
            en: {
                followDreams: "FOLLOW YOUR DREAMS",
                studyKazakhstan: "STUDY IN KAZAKHSTAN",
                studyAbroad: "STUDY ABROAD",
                pricing: "PRICING",
                contact: "CONTACT",
                profile: "PROFILE",
                login: "LOGIN",
                logout: "LOGOUT",
                compare: "COMPARE UNIVERSITIES",
                search: "Search universities...",
                about: "About the University",
                programs: "Academic Programs",
                admission: "Admission",
                tour: "3D Tour",
                cooperation: "International Cooperation",
                selectUniversity: "Select University",
                compareSelected: "Compare Selected",
                clearSelection: "Clear Selection",
                tuitionFees: "Tuition Fees",
                accommodation: "Accommodation",
                totalCost: "Total Annual Cost",
                students: "Students",
                international: "International Students",
                founded: "Founded",
                ranking: "Ranking",
                world: "World",
                asia: "Asia",
                centralAsia: "Central Asia"
            },
            ru: {
                followDreams: "СЛЕДУЙ ЗА СВОИМИ МЕЧТАМИ",
                studyKazakhstan: "УЧЕБА В КАЗАХСТАНЕ",
                studyAbroad: "УЧЕБА ЗА РУБЕЖОМ",
                pricing: "ЦЕНЫ",
                contact: "КОНТАКТЫ",
                profile: "ПРОФИЛЬ",
                login: "ВОЙТИ",
                logout: "ВЫЙТИ",
                compare: "СРАВНИТЬ УНИВЕРСИТЕТЫ",
                search: "Поиск университетов...",
                about: "О Университете",
                programs: "Академические Программы",
                admission: "Поступление",
                tour: "3D Тур",
                cooperation: "Международное Сотрудничество",
                selectUniversity: "Выберите Университет",
                compareSelected: "Сравнить Выбранные",
                clearSelection: "Очистить Выбор",
                tuitionFees: "Стоимость Обучения",
                accommodation: "Проживание",
                totalCost: "Общая Годовая Стоимость",
                students: "Студенты",
                international: "Иностранные Студенты",
                founded: "Основан",
                ranking: "Рейтинг",
                world: "Мир",
                asia: "Азия",
                centralAsia: "Центральная Азия"
            },
            kz: {
                followDreams: "АРМАНЫҢНЫҚ АРТЫНАН ЖҮР",
                studyKazakhstan: "ҚАЗАҚСТАНДА ОҚУ",
                studyAbroad: "ШЕТЕЛДЕ ОҚУ",
                pricing: "БАҒАЛАР",
                contact: "БАЙЛАНЫС",
                profile: "ПРОФИЛЬ",
                login: "КІРУ",
                logout: "ШЫҒУ",
                compare: "УНИВЕРСИТЕТТЕРДІ САЛЫСТЫРУ",
                search: "Университеттерді іздеу...",
                about: "Университет Туралы",
                programs: "Академиялық Бағдарламалар",
                admission: "Қабылдау",
                tour: "3D Тур",
                cooperation: "Халықаралық Ынтымақтастық",
                selectUniversity: "Университетті Таңдаңыз",
                compareSelected: "Таңдалғанды Салыстыру",
                clearSelection: "Таңдауды Тазарту",
                tuitionFees: "Оқу Ақысы",
                accommodation: "Тұру",
                totalCost: "Жалпы Жылдық Құны",
                students: "Студенттер",
                international: "Халықаралық Студенттер",
                founded: "Құрылған",
                ranking: "Рейтинг",
                world: "Әлем",
                asia: "Азия",
                centralAsia: "Орталық Азия"
            }
        };
    }

    // Language Management
    setupLanguageSwitcher() {
        const langButtons = document.querySelectorAll('.lang-btn[data-lang]');
        langButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = btn.dataset.lang;
                
                // Update active state on all language buttons
                document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                this.switchLanguage(lang);
            });
        });
        
        // Load saved language preference
        const savedLang = localStorage.getItem('assylLanguage');
        if (savedLang) {
            this.currentLanguage = savedLang;
            document.querySelectorAll('.lang-btn').forEach(b => {
                b.classList.toggle('active', b.dataset.lang === savedLang);
            });
            this.updateUI();
        }
    }

    switchLanguage(lang) {
        this.currentLanguage = lang;
        localStorage.setItem('assylLanguage', lang);
        this.updateUI();
        this.saveUserPreference('language', lang);
    }

    t(key) {
        return this.translations[this.currentLanguage][key] || key;
    }

    // User Profile System
    loadUserData() {
        const userData = localStorage.getItem('assylUserData');
        if (userData) {
            this.userData = JSON.parse(userData);
            this.currentUser = this.userData.currentUser || null;
        }
    }

    saveUserData() {
        localStorage.setItem('assylUserData', JSON.stringify(this.userData));
    }

    login(emailOrPhone, password) {
        // Simulate login process
        const userId = this.generateUserId(emailOrPhone);
        this.currentUser = {
            id: userId,
            email: emailOrPhone.includes('@') ? emailOrPhone : null,
            phone: !emailOrPhone.includes('@') ? emailOrPhone : null,
            preferences: {
                language: this.currentLanguage,
                savedUniversities: [],
                comparisons: []
            }
        };
        
        this.userData[userId] = this.currentUser;
        this.userData.currentUser = this.currentUser;
        this.saveUserData();
        this.updateProfileUI();
        
        // Hide login modal after successful login
        hideLoginModal();
        showNotification('Welcome! You are now logged in.', 'success');
        
        return true;
    }

    logout() {
        this.currentUser = null;
        this.userData.currentUser = null;
        this.saveUserData();
        this.updateProfileUI();
    }

    generateUserId(emailOrPhone) {
        return 'user_' + btoa(emailOrPhone).replace(/[^a-zA-Z0-9]/g, '').substring(0, 10);
    }

    saveUserPreference(key, value) {
        if (this.currentUser) {
            this.currentUser.preferences[key] = value;
            this.userData[this.currentUser.id] = this.currentUser;
            this.userData.currentUser = this.currentUser;
            this.saveUserData();
        }
    }

    // University Comparison System
    toggleUniversitySelection(universityId) {
        const index = this.selectedUniversities.indexOf(universityId);
        if (index > -1) {
            this.selectedUniversities.splice(index, 1);
        } else {
            if (this.selectedUniversities.length < 3) {
                this.selectedUniversities.push(universityId);
            } else {
                alert(this.t('maxCompare'));
            }
        }
        this.updateComparisonUI();
    }

    updateComparisonUI() {
        const compareBtn = document.getElementById('compareBtn');
        const selectedCount = document.getElementById('selectedCount');
        
        if (compareBtn && selectedCount) {
            selectedCount.textContent = this.selectedUniversities.length;
            compareBtn.style.display = this.selectedUniversities.length > 0 ? 'block' : 'none';
        }
    }

    showComparison() {
        if (this.selectedUniversities.length === 0) return;
        
        const modal = document.getElementById('comparisonModal');
        const content = document.getElementById('comparisonContent');
        
        if (modal && content) {
            content.innerHTML = this.generateComparisonTable();
            modal.style.display = 'block';
        }
    }

    generateComparisonTable() {
        let html = '<div class="comparison-table">';
        
        // Headers
        html += '<div class="comparison-row header">';
        html += '<div class="comparison-cell">Criteria</div>';
        this.selectedUniversities.forEach(id => {
            const uni = this.universities[id];
            html += `<div class="comparison-cell">${uni.name[this.currentLanguage]}</div>`;
        });
        html += '</div>';
        
        // Comparison rows
        const criteria = [
            { key: 'location', label: 'Location' },
            { key: 'founded', label: 'Founded' },
            { key: 'students', label: 'Total Students' },
            { key: 'international', label: 'International Students' },
            { key: 'ranking', label: 'World Ranking', subkey: 'world' },
            { key: 'fees', label: 'Annual Fees', subkey: 'total' }
        ];
        
        criteria.forEach(criterion => {
            html += '<div class="comparison-row">';
            html += `<div class="comparison-cell">${criterion.label}</div>`;
            this.selectedUniversities.forEach(id => {
                const uni = this.universities[id];
                let value = '';
                
                if (criterion.key === 'ranking') {
                    value = `#${uni.ranking[criterion.subkey]}`;
                } else if (criterion.key === 'fees') {
                    value = `$${uni.admission.fees[criterion.subkey].toLocaleString()}`;
                } else {
                    value = uni[criterion.key];
                }
                
                html += `<div class="comparison-cell">${value}</div>`;
            });
            html += '</div>';
        });
        
        html += '</div>';
        return html;
    }

    // 3D Tour System
    init3DTour(universityId) {
        const container = document.getElementById('tourContainer');
        if (!container) return;

        // Initialize Three.js scene
        this.setup3DScene(container, universityId);
    }

    setup3DScene(container, universityId) {
        // Basic Three.js setup for 3D tour
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setClearColor(0x0a0a0a);
        container.appendChild(renderer.domElement);

        // Add basic 3D elements (simplified for demo)
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshBasicMaterial({ color: 0x00d4ff });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        camera.position.z = 5;

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
        };
        animate();

        // Handle window resize
        window.addEventListener('resize', () => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        });
    }

    // UI Updates
    updateUI() {
        // Update all translatable elements with data-translate attribute
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.dataset.translate;
            element.textContent = this.t(key);
        });

        // Update navigation links
        const navTranslations = {
            en: { home: 'Home', studyKz: 'Study in Kazakhstan', studyAbroad: 'Study Abroad', pricing: 'Pricing', contact: 'Contact', profile: 'Profile', login: 'Login', logout: 'Logout' },
            ru: { home: 'Главная', studyKz: 'Учеба в Казахстане', studyAbroad: 'Учеба за рубежом', pricing: 'Цены', contact: 'Контакты', profile: 'Профиль', login: 'Войти', logout: 'Выйти' },
            kz: { home: 'Басты бет', studyKz: 'Қазақстанда оқу', studyAbroad: 'Шетелде оқу', pricing: 'Бағалар', contact: 'Байланыс', profile: 'Профиль', login: 'Кіру', logout: 'Шығу' }
        };

        const nav = navTranslations[this.currentLanguage];
        if (nav) {
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                const href = link.getAttribute('href') || '';
                if (href.includes('index.html') || (href === 'index.html')) link.textContent = nav.home;
                else if (href.includes('study-in-kazakhstan')) link.textContent = nav.studyKz;
                else if (href.includes('study-abroad')) link.textContent = nav.studyAbroad;
                else if (href.includes('pricing')) link.textContent = nav.pricing;
                else if (href.includes('contact')) link.textContent = nav.contact;
                else if (link.id === 'profileBtn') link.textContent = nav.profile;
                else if (link.id === 'loginBtn') link.textContent = nav.login;
                else if (link.id === 'logoutBtn') link.textContent = nav.logout;
            });
        }

        // Update hero section if on index page
        this.translateHeroSection();

        this.updateProfileUI();
    }

    translateHeroSection() {
        const heroTranslations = {
            en: {
                badge: 'Your Future Starts Here',
                title: 'Find Your Perfect',
                titleHighlight: 'University',
                titleEnd: 'Path',
                description: 'We help students and families navigate the journey to higher education. Compare universities, explore programs, and make informed decisions about your academic future in Kazakhstan and abroad.',
                exploreBtn: 'Explore Universities',
                consultBtn: 'Get Free Consultation',
                stat1: 'Universities',
                stat2: 'Countries',
                stat3: 'Students Helped'
            },
            ru: {
                badge: 'Ваше будущее начинается здесь',
                title: 'Найдите свой идеальный',
                titleHighlight: 'Университет',
                titleEnd: 'Путь',
                description: 'Мы помогаем студентам и семьям ориентироваться на пути к высшему образованию. Сравнивайте университеты, изучайте программы и принимайте обоснованные решения о вашем академическом будущем в Казахстане и за рубежом.',
                exploreBtn: 'Исследовать университеты',
                consultBtn: 'Бесплатная консультация',
                stat1: 'Университетов',
                stat2: 'Стран',
                stat3: 'Помогли студентам'
            },
            kz: {
                badge: 'Сіздің болашағыңыз осы жерден басталады',
                title: 'Өзіңіздің керемет',
                titleHighlight: 'Университет',
                titleEnd: 'Жолыңызды табыңыз',
                description: 'Біз студенттер мен отбасыларға жоғары білімге бару жолында көмектесеміз. Университеттерді салыстырыңыз, бағдарламаларды зерттеңіз және Қазақстанда және шетелде академиялық болашағыңыз туралы шешім қабылдаңыз.',
                exploreBtn: 'Университеттерді қарау',
                consultBtn: 'Тегін кеңес алу',
                stat1: 'Университеттер',
                stat2: 'Елдер',
                stat3: 'Студенттерге көмектестік'
            }
        };

        const t = heroTranslations[this.currentLanguage];
        if (!t) return;

        // Update hero badge
        const badge = document.querySelector('.hero-badge');
        if (badge) {
            badge.innerHTML = '<i class="fas fa-graduation-cap"></i> &nbsp;' + t.badge;
        }

        // Update hero title
        const title = document.querySelector('.hero-title');
        if (title) {
            title.innerHTML = t.title + ' <span class="highlight">' + t.titleHighlight + '</span> ' + t.titleEnd;
        }

        // Update hero description
        const desc = document.querySelector('.hero-description');
        if (desc) {
            desc.textContent = t.description;
        }

        // Update hero buttons
        const buttons = document.querySelectorAll('.hero-buttons .btn');
        if (buttons.length >= 2) {
            buttons[0].innerHTML = '<i class="fas fa-search"></i> ' + t.exploreBtn;
            buttons[1].innerHTML = '<i class="fas fa-comments"></i> ' + t.consultBtn;
        }

        // Update stat labels
        const statLabels = document.querySelectorAll('.hero-stat-label');
        if (statLabels.length >= 3) {
            statLabels[0].textContent = t.stat1;
            statLabels[1].textContent = t.stat2;
            statLabels[2].textContent = t.stat3;
        }

        // Update floating cards
        const cardTranslations = {
            en: { trusted: 'Trusted Guidance', expert: 'Expert counselors', success: '98% Success Rate', admission: 'Admission results' },
            ru: { trusted: 'Надежное руководство', expert: 'Опытные консультанты', success: '98% Успешность', admission: 'Результаты поступления' },
            kz: { trusted: 'Сенімді нұсқаулық', expert: 'Тәжірибелі кеңесшілер', success: '98% Сәттілік', admission: 'Түсу нәтижелері' }
        };

        const cards = cardTranslations[this.currentLanguage];
        if (cards) {
            document.querySelectorAll('[data-translate-card]').forEach(el => {
                const key = el.dataset.translateCard;
                if (cards[key]) el.textContent = cards[key];
            });
        }

        // Translate section titles
        this.translateSections();
    }

    translateSections() {
        const sectionTranslations = {
            en: {
                whyChoose: 'Why Choose Assyl DataHub?',
                whyChooseDesc: 'We make the university search and application process simple, transparent, and stress-free for students and families.',
                featuredUni: 'Featured Universities',
                featuredUniDesc: 'Explore top-rated institutions that have helped thousands of students achieve their dreams.',
                testimonials: 'What Families Say',
                testimonialsDesc: 'Hear from students and parents who found their perfect university match with our help.',
                ctaTitle: 'Ready to Start Your Journey?',
                ctaDesc: 'Get personalized university recommendations and expert guidance. Book a free consultation with our education counselors today.',
                ctaBtn1: 'Book Free Consultation',
                ctaBtn2: 'View Our Services',
                viewAll: 'View All Universities'
            },
            ru: {
                whyChoose: 'Почему выбирают Assyl DataHub?',
                whyChooseDesc: 'Мы делаем процесс поиска и поступления в университет простым, прозрачным и без стресса для студентов и семей.',
                featuredUni: 'Рекомендуемые университеты',
                featuredUniDesc: 'Изучите лучшие учебные заведения, которые помогли тысячам студентов осуществить свои мечты.',
                testimonials: 'Отзывы семей',
                testimonialsDesc: 'Узнайте от студентов и родителей, которые нашли идеальный университет с нашей помощью.',
                ctaTitle: 'Готовы начать свой путь?',
                ctaDesc: 'Получите персональные рекомендации по университетам и экспертное руководство. Запишитесь на бесплатную консультацию сегодня.',
                ctaBtn1: 'Записаться на консультацию',
                ctaBtn2: 'Наши услуги',
                viewAll: 'Все университеты'
            },
            kz: {
                whyChoose: 'Неге Assyl DataHub таңдайсыз?',
                whyChooseDesc: 'Біз университетті іздеу және түсу процесін студенттер мен отбасылар үшін қарапайым, ашық және стресссіз етеміз.',
                featuredUni: 'Ұсынылған университеттер',
                featuredUniDesc: 'Мыңдаған студенттердің армандарын жүзеге асыруға көмектескен үздік оқу орындарын зерттеңіз.',
                testimonials: 'Отбасылар не дейді',
                testimonialsDesc: 'Біздің көмегімізбен тамаша университет тапқан студенттер мен ата-аналардан естіңіз.',
                ctaTitle: 'Сапарыңызды бастауға дайынсыз ба?',
                ctaDesc: 'Жеке университет ұсыныстары мен сарапшылық нұсқаулықтарын алыңыз. Бүгін тегін кеңесті брондаңыз.',
                ctaBtn1: 'Тегін кеңес алу',
                ctaBtn2: 'Біздің қызметтер',
                viewAll: 'Барлық университеттер'
            }
        };

        const t = sectionTranslations[this.currentLanguage];
        if (!t) return;

        // Update section titles
        const sectionTitles = document.querySelectorAll('.section-title');
        sectionTitles.forEach((section, index) => {
            const h2 = section.querySelector('h2');
            const p = section.querySelector('p');
            
            if (index === 0 && h2) { // Features section
                h2.textContent = t.whyChoose;
                if (p) p.textContent = t.whyChooseDesc;
            } else if (index === 1 && h2) { // Universities section
                h2.textContent = t.featuredUni;
                if (p) p.textContent = t.featuredUniDesc;
            } else if (index === 2 && h2) { // Testimonials section
                h2.textContent = t.testimonials;
                if (p) p.textContent = t.testimonialsDesc;
            }
        });

        // Update CTA section
        const ctaSection = document.querySelector('.cta-section');
        if (ctaSection) {
            const h2 = ctaSection.querySelector('h2');
            const p = ctaSection.querySelector('p');
            if (h2) h2.textContent = t.ctaTitle;
            if (p) p.textContent = t.ctaDesc;

            const buttons = ctaSection.querySelectorAll('.btn');
            if (buttons.length >= 2) {
                buttons[0].innerHTML = '<i class="fas fa-calendar-alt"></i> ' + t.ctaBtn1;
                buttons[1].textContent = t.ctaBtn2;
            }
        }

        // Update "View All Universities" button
        const viewAllBtn = document.querySelector('.universities-section .text-center .btn');
        if (viewAllBtn) {
            viewAllBtn.innerHTML = t.viewAll + ' <i class="fas fa-arrow-right"></i>';
        }

        // Translate login modal
        this.translateLoginModal();
    }

    translateLoginModal() {
        const modalTranslations = {
            en: {
                title: 'Welcome Back',
                subtitle: 'Sign in to access your account',
                emailLabel: 'Email or Phone',
                emailPlaceholder: 'Enter your email or phone',
                passwordLabel: 'Password',
                passwordPlaceholder: 'Enter your password',
                loginBtn: 'Login',
                noAccount: "Don't have an account?",
                signUp: 'Sign up'
            },
            ru: {
                title: 'С возвращением',
                subtitle: 'Войдите в свой аккаунт',
                emailLabel: 'Email или телефон',
                emailPlaceholder: 'Введите email или телефон',
                passwordLabel: 'Пароль',
                passwordPlaceholder: 'Введите пароль',
                loginBtn: 'Войти',
                noAccount: 'Нет аккаунта?',
                signUp: 'Регистрация'
            },
            kz: {
                title: 'Қайта оралуыңызбен',
                subtitle: 'Тіркелгіңізге кіріңіз',
                emailLabel: 'Email немесе телефон',
                emailPlaceholder: 'Email немесе телефонды енгізіңіз',
                passwordLabel: 'Құпия сөз',
                passwordPlaceholder: 'Құпия сөзді енгізіңіз',
                loginBtn: 'Кіру',
                noAccount: 'Тіркелгіңіз жоқ па?',
                signUp: 'Тіркелу'
            }
        };

        const t = modalTranslations[this.currentLanguage];
        if (!t) return;

        const modal = document.getElementById('loginModal');
        if (!modal) return;

        const title = modal.querySelector('.modal-header h2');
        const subtitle = modal.querySelector('.modal-header p');
        const labels = modal.querySelectorAll('.form-label');
        const inputs = modal.querySelectorAll('.form-input');
        const loginBtn = modal.querySelector('.btn-primary');
        const footer = modal.querySelector('.modal-footer');

        if (title) title.textContent = t.title;
        if (subtitle) subtitle.textContent = t.subtitle;
        if (labels[0]) labels[0].textContent = t.emailLabel;
        if (labels[1]) labels[1].textContent = t.passwordLabel;
        if (inputs[0]) inputs[0].placeholder = t.emailPlaceholder;
        if (inputs[1]) inputs[1].placeholder = t.passwordPlaceholder;
        if (loginBtn) loginBtn.textContent = t.loginBtn;
        if (footer) footer.innerHTML = t.noAccount + ' <a href="#">' + t.signUp + '</a>';
    }

    updateProfileUI() {
        const profileBtn = document.getElementById('profileBtn');
        const loginBtn = document.getElementById('loginBtn');
        const logoutBtn = document.getElementById('logoutBtn');

        if (this.currentUser) {
            if (profileBtn) profileBtn.style.display = 'block';
            if (loginBtn) loginBtn.style.display = 'none';
            if (logoutBtn) logoutBtn.style.display = 'block';
        } else {
            if (profileBtn) profileBtn.style.display = 'none';
            if (loginBtn) loginBtn.style.display = 'block';
            if (logoutBtn) logoutBtn.style.display = 'none';
        }
    }

    // Event Listeners
    setupEventListeners() {
        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const emailOrPhone = document.getElementById('emailOrPhone').value;
                const password = document.getElementById('password').value;
                this.login(emailOrPhone, password);
            });
        }

        // Logout button
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.logout();
            });
        }

        // Compare button
        const compareBtn = document.getElementById('compareBtn');
        if (compareBtn) {
            compareBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showComparison();
            });
        }

        // Modal close
        const closeModal = document.querySelector('.close-modal');
        if (closeModal) {
            closeModal.addEventListener('click', () => {
                document.getElementById('comparisonModal').style.display = 'none';
            });
        }

        // University selection checkboxes
        document.querySelectorAll('.university-select').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                this.toggleUniversitySelection(e.target.dataset.universityId);
            });
        });
    }

    // Animation Initialization
    initializeAnimations() {
        // Initialize Anime.js animations
        if (typeof anime !== 'undefined') {
            // Hero text animation
            anime({
                targets: '.hero-title',
                opacity: [0, 1],
                translateY: [50, 0],
                duration: 1000,
                easing: 'easeOutExpo'
            });

            // Cards animation
            anime({
                targets: '.university-card',
                opacity: [0, 1],
                translateY: [30, 0],
                duration: 800,
                delay: anime.stagger(100),
                easing: 'easeOutExpo'
            });
        }

        // Initialize Typed.js for hero text
        if (typeof Typed !== 'undefined') {
            new Typed('#typed-text', {
                strings: [
                    'Find Your Perfect University',
                    'Discover World-Class Education',
                    'Build Your Future Today'
                ],
                typeSpeed: 50,
                backSpeed: 30,
                backDelay: 2000,
                loop: true
            });
        }
    }

    // Search Functionality
    searchUniversities(query) {
        const results = Object.entries(this.universities).filter(([id, uni]) => {
            return uni.name[this.currentLanguage].toLowerCase().includes(query.toLowerCase()) ||
                   uni.location.toLowerCase().includes(query.toLowerCase());
        });
        
        this.displaySearchResults(results);
    }

    displaySearchResults(results) {
        const container = document.getElementById('searchResults');
        if (!container) return;

        if (results.length === 0) {
            container.innerHTML = '<p class="no-results">No universities found</p>';
            return;
        }

        let html = '';
        results.forEach(([id, uni]) => {
            html += `
                <div class="search-result-item" data-university="${id}">
                    <img src="${uni.image}" alt="${uni.name[this.currentLanguage]}" class="result-image">
                    <div class="result-info">
                        <h3>${uni.name[this.currentLanguage]}</h3>
                        <p>${uni.location}</p>
                        <span class="ranking">#${uni.ranking.world} World Ranking</span>
                    </div>
                </div>
            `;
        });
        
        container.innerHTML = html;
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.assylDataHub = new AssylDataHub();
});

// Utility functions for UI interactions
function showLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

function hideLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}