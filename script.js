document.addEventListener('DOMContentLoaded', () => {
    let lenis = null;
    // 1. Boot Screen Sequence
    const bootScreen = document.getElementById('boot-screen');
    const bootText = document.getElementById('boot-text');
    
    if (!sessionStorage.getItem('booted_v2')) {
        document.body.classList.add('booting');
        const bootLines = [
            "Initializing kernel...",
            "Loading drivers... [OK]",
            "Mounting file systems... [OK]",
            "Starting system logger... [OK]",
            "Starting network manager... [OK]",
            "Connecting to database... [CONNECTED]",
            "Starting server on port 8080... [OK]",
            "Welcome to Hugo Januário's Server."
        ];
        
        let lineIdx = 0;
        const typeBootLine = () => {
            if (lineIdx < bootLines.length) {
                const line = document.createElement('div');
                line.className = 'boot-line';
                line.textContent = bootLines[lineIdx];
                bootText.appendChild(line);
                lineIdx++;
                setTimeout(typeBootLine, Math.random() * 100 + 100);
            } else {
                setTimeout(() => {
                    bootScreen.classList.add('hidden');
                    document.body.classList.remove('booting');
                    sessionStorage.setItem('booted_v2', 'true');
                }, 800);
            }
        };
        setTimeout(typeBootLine, 300);
    } else {
        if (bootScreen) {
            bootScreen.classList.add('hidden');
        }
    }

    // Header scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // --- Scroll Lock Helper ---
    const toggleBodyScroll = (lock) => {
        if (lock) {
            document.body.style.overflow = 'hidden';
            if (lenis) lenis.stop();
        } else {
            document.body.style.overflow = '';
            if (lenis) lenis.start();
        }
    };

    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            const isActive = navLinks.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            toggleBodyScroll(isActive);
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenu.classList.remove('active');
                toggleBodyScroll(false);
            });
        });
    }

    // Reveal on Scroll
    const revealElements = document.querySelectorAll('section');
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.8;
        revealElements.forEach(el => {
            const top = el.getBoundingClientRect().top;
            if (top < triggerBottom) {
                el.classList.add('reveal');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // Hero Name Typing Animation
    const heroNameEl = document.getElementById('hero-name');
    if (heroNameEl) {
        const nameText = heroNameEl.innerText;
        heroNameEl.innerText = '';
        
        let typeIndex = 0;
        function typeHeroName() {
            if (typeIndex < nameText.length) {
                heroNameEl.innerHTML += nameText.charAt(typeIndex);
                typeIndex++;
                // Randomize slightly for a realistic human typing feel
                const typingSpeed = Math.random() * 50 + 150; 
                setTimeout(typeHeroName, typingSpeed);
            }
        }
        setTimeout(typeHeroName, 800);
    }

    // Interactive Terminal Logic
    const terminalInput = document.getElementById('terminal-input');
    const terminalHistory = document.getElementById('terminal-history');
    
    if (terminalInput && terminalHistory) {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const fullInput = terminalInput.value.trim();
                if (!fullInput) return;

                const args = fullInput.split(' ');
                const cmd = args[0].toLowerCase();
                const fullCmd = fullInput.toLowerCase();

                const historyLine = document.createElement('p');
                historyLine.innerHTML = `<span class="prompt">guest@hugo-systems:~$</span> <span class="cmd-text">${fullInput}</span>`;
                terminalHistory.appendChild(historyLine);

                const responseLine = document.createElement('p');
                responseLine.className = 'terminal-output';
                
                if (cmd === 'help') {
                    responseLine.innerHTML = `<p>Comandos: <span class="highlight">about, skills, clear, contact, setup, mascote, sudo, neofetch, docker, go, matrix, ls, get resume</span></p>`;
                } else if (cmd === 'docker' && args[1] === 'ps') {
                    responseLine.innerHTML = `
                    <div style="font-family: monospace; white-space: pre; overflow-x: auto; font-size: 0.85em; margin: 10px 0; color: #a5d6ff;">
CONTAINER ID   IMAGE                 COMMAND                  CREATED        STATUS        PORTS                    NAMES
a1b2c3d4e5f6   sentinel-core:latest  "./main"                 2 hours ago    Up 2 hours    0.0.0.0:8080->8080/tcp   sentinel-api
b8c7d6e5f4g3   postgres:14           "docker-entrypoint.s…"   5 days ago     Up 2 days     0.0.0.0:5432->5432/tcp   db-master
f9e8d7c6b5a4   redis:alpine          "docker-entrypoint.s…"   5 days ago     Up 2 days     0.0.0.0:6379->6379/tcp   cache-layer
                    </div>`;
                } else if (cmd === 'go' && args[1] === 'test') {
                    responseLine.innerHTML = `
                    <p style="color: #4ade80;">ok      github.com/hugaojanuario/sentinel/api        0.124s</p>
                    <p style="color: #4ade80;">ok      github.com/hugaojanuario/sentinel/engine     0.450s</p>
                    <p style="color: #4ade80;">ok      github.com/hugaojanuario/sentinel/database   0.098s</p>
                    <p class="green">PASS</p>
                    `;
                } else if (cmd === 'docker' || cmd === 'go') {
                    responseLine.innerHTML = `<p>Usage: docker ps | go test</p>`;
                } else if (cmd === 'about') {
                    responseLine.innerHTML = `<p>Desenvolvedor Backend com expertise em Java e Go, focado em alta performance.</p>`;
                } else if (cmd === 'skills') {
                    responseLine.innerHTML = `<p>Java, Go, Spring Boot, Docker, Kubernetes, AWS, SQL/NoSQL.</p>`;
                } else if (cmd === 'clear') {
                    terminalHistory.innerHTML = '';
                    terminalInput.value = '';
                    return;
                } else if (cmd === 'contact') {
                    responseLine.innerHTML = `<p>hugojanuarioneto@gmail.com | (66) 99632-4753</p>`;
                } else if (cmd === 'ls') {
                    responseLine.innerHTML = `<p>Files/ <span class="highlight">Curriculo-Hugo-Januario.pdf</span>  projects/  README.md</p>`;
                } else if (cmd === 'sudo') {
                    responseLine.innerHTML = `<p class="red">Permission denied. You are not root ou sudoer.</p>`;
                } else if (cmd === 'get' || cmd === 'curl') {
                    const target = args[1] ? args[1].toLowerCase() : '';
                    const isResume = target === 'resume' || target === 'resume.pdf' || fullCmd.includes('resume');
                    
                    if (isResume && (cmd === 'get' || fullCmd.includes('-o') || fullCmd.includes('-O'))) {
                        responseLine.innerHTML = `<p class="highlight">Iniciando download do currículo... [OK]</p>`;
                        setTimeout(() => {
                            window.open('Files/Curriculo-Hugo-Januario.pdf', '_blank');
                        }, 500);
                    } else if (!target) {
                        responseLine.innerHTML = `<p>Usage: ${cmd} [file]. Try <span class="highlight">${cmd} resume</span> or <span class="highlight">curl -O resume.pdf</span></p>`;
                    } else {
                        responseLine.innerHTML = `<p>bash: ${cmd}: ${args[1]}: No such file or directory</p>`;
                    }
                } else if (cmd === 'neofetch') {
                    responseLine.innerHTML = `
                        <div class="neofetch">
                            <span class="highlight">hugo@systems</span><br>
                            ----------------<br>
                            <span class="highlight">OS:</span> Linux / Go Kernel<br>
                            <span class="highlight">Host:</span> hugo-januario-portfolio<br>
                            <span class="highlight">Kernel:</span> 5.15.0-backend<br>
                            <span class="highlight">Uptime:</span> 365 days<br>
                            <span class="highlight">Shell:</span> portfolio-sh<br>
                            <span class="highlight">CPU:</span> Go Routines (8) @ 3.5GHz<br>
                            <span class="highlight">Memory:</span> 16GB / 32GB<br>
                        </div>`;
                } else if (cmd === 'matrix') {
                    responseLine.innerHTML = `<p class="green">Wake up, Hugo... The Matrix has you...</p>`;
                    if (window.startMatrix) window.startMatrix();
                } else if (cmd === 'setup' || cmd === 'mascote') {
                    responseLine.innerHTML = `<p class="highlight">Abrindo visualização do setup... [OK]</p>`;
                    setTimeout(() => {
                        const modal = document.getElementById('setup-modal');
                        const video = document.getElementById('mascot-video');
                        if (modal) {
                            modal.style.display = 'flex';
                            toggleBodyScroll(true);
                        }
                        if (video) {
                            video.play().catch(console.error);
                        }
                    }, 500);
                } else {
                    responseLine.innerHTML = `<p>bash: ${cmd}: command not found</p>`;
                }
                
                terminalHistory.appendChild(responseLine);
                
                const interactiveTerminal = document.getElementById('interactive-terminal');
                interactiveTerminal.scrollTop = interactiveTerminal.scrollHeight;
                terminalInput.value = '';
            }
        });
        
        const terminalBody = document.getElementById('interactive-terminal');
        if (terminalBody) {
            terminalBody.addEventListener('click', () => terminalInput.focus());
        }
    }

    // Staggered Skills Delay
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        tag.style.setProperty('--delay', `${index * 0.1}s`);
    });

    // Gopher Eye Tracking
    const pupils = document.querySelectorAll('.pupil');
    document.addEventListener('mousemove', (e) => {
        pupils.forEach(pupil => {
            const rect = pupil.getBoundingClientRect();
            const eyePosX = rect.left + rect.width / 2;
            const eyePosY = rect.top + rect.height / 2;
            
            const angle = Math.atan2(e.clientY - eyePosY, e.clientX - eyePosX);
            const distance = Math.min(6, Math.hypot(e.clientX - eyePosX, e.clientY - eyePosY) / 30);
            
            const moveX = Math.cos(angle) * distance;
            const moveY = Math.sin(angle) * distance;
            
            pupil.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });

    const gopher = document.querySelector('.gopher');
    const gopherWrapper = document.querySelector('.gopher-wrapper');
    if (gopher && gopherWrapper) {
        gopherWrapper.addEventListener('click', () => {
            gopher.classList.add('bounce', 'wink');
            setTimeout(() => {
                gopher.classList.remove('bounce', 'wink');
            }, 1000);
        });
    }

    // Infrastructure Status Simulation
    const uptimeEl = document.getElementById('uptime-value');
    if (uptimeEl) {
        let uptime = 99.985;
        setInterval(() => {
            uptime += (Math.random() - 0.5) * 0.001;
            uptimeEl.innerText = uptime.toFixed(3) + '%';
        }, 3000);
    }

    // Language Switcher Logic
    const translations = {
        pt: {
            nav_about: "Sobre",
            nav_experience: "Experiência",
            nav_projects: "Projetos",
            nav_skills: "Habilidades",
            nav_resume: "Currículo",
            nav_contact: "Contato",
            hero_badge: "Disponível para novos desafios",
            hero_role: "Desenvolvedor Backend <span class=\"highlight\">&</span> Entusiasta de Infraestrutura",
            hero_desc: "Especialista em Go e Java, conectando código de alta performance com arquiteturas de produção resilientes.",
            hero_btn_projects: "Ver Projetos",
            hero_btn_contact: "Contato",
            about_title: "Sobre Mim",
            about_p1: "Olá! Meu nome é Hugo e sou apaixonado por construir sistemas eficientes que rodam de forma estável \"de ponta a ponta\". Minha jornada na tecnologia começou na infraestrutura de TI, onde aprendi a fundo sobre redes, servidores Linux e o modelo OSI.",
            about_p2: "Hoje, estou cursando Sistemas de Informação e focando minha carreira no <strong>Desenvolvimento Backend</strong>. Acredito que meu diferencial é entender não apenas como o código funciona, mas como ele se comporta dentro de um container, em uma rede complexa ou sob carga em produção.",
            about_p3: "Atualmente trabalho na <strong>Siplan</strong> como Técnico de Implantação de Software, onde aplico meus conhecimentos em automação e suporte a ambientes de produção.",
            exp_title: "Experiência Profissional",
            exp_role1: "Técnico de Implantação de Software",
            exp_date1: "Siplan | Ago 2025 - Presente",
            exp_desc1_1: "Implantação de sistemas em ambientes de produção.",
            exp_desc1_2: "Suporte técnico especializado e automação de processos.",
            exp_role2: "Técnico de Helpdesk Júnior",
            exp_date2: "ISP | Ago 2024 - Jul 2025",
            exp_desc2_1: "Gestão de infraestrutura de TI e administração de servidores Linux.",
            exp_desc2_2: "Troubleshooting avançado de redes (TCP/IP, DNS, DHCP).",
            exp_role3: "Estagiário de Helpdesk TI",
            exp_date3: "TI Helpdesk | Abr 2023 - Ago 2024",
            exp_desc3_1: "Suporte técnico de nível 1 e 2 para usuários internos.",
            exp_desc3_2: "Manutenção preventiva e corretiva de hardware e software.",
            proj_title: "Projetos em Destaque",
            proj_desc1: "\"Guardião dos seus containers\". Uma ferramenta robusta para monitoramento e gerenciamento de containers Docker escrita em Go.",
            proj_desc2: "API REST para gerenciamento de tarefas desenvolvida em Go, focada em performance e organização de código.",
            proj_desc3: "Sistema para gerenciar implantações de software, originalmente em Java e reescrito em Go para maior eficiência.",
            skills_title: "Habilidades Técnicas",
            skills_cat1: "Backend",
            skills_api: "REST APIs",
            skills_cat2: "Infra & DevOps",
            skills_net: "Redes (TCP/IP)",
            skills_cat3: "Banco de Dados",
            contact_title: "Me mande um \"Hello World\"",
            contact_desc: "Estou sempre aberto a novas oportunidades ou simplesmente para conversar sobre tecnologia e sistemas.",
            contact_btn_email: "Enviar Email",
            contact_form_name: "Nome",
            contact_form_email: "Email",
            contact_form_msg: "Mensagem",
            contact_form_btn: "Enviar Mensagem",
            contact_form_success: "Mensagem enviada com sucesso! Falamos em breve.",
            contact_form_error: "Erro ao enviar. Tente novamente ou use o email direto.",
            setup_title: "Meu Setup de Desenvolvimento",
            setup_caption: "Bastidores: Onde a mágica do backend acontece (com supervisão do Gopher).",
            setup_badge: "Engenharia Gopher",
            nav_education: "Educação",
            nav_metrics: "Métricas",
            edu_title: "Educação & Certificações",
            edu_deg: "Sistemas de Informação",
            edu_uni: "Bacharelado | 2022 - Atual",
            edu_desc: "Foco em engenharia de software, arquitetura de computadores e desenvolvimento de sistemas escaláveis.",
            certs_title: "Principais Credenciais",
            cert_aws: "AWS Cloud Practitioner",
            cert_go: "Go Foundation",
            cert_java: "Java Developer",
            cert_docker: "Docker Expert",
            metrics_title: "Métricas de Código",
            metrics_gh_title: "Atividade no GitHub",
            metrics_langs_title: "Top Linguagens"
        },
        en: {
            nav_about: "About",
            nav_experience: "Experience",
            nav_projects: "Projects",
            nav_skills: "Skills",
            nav_resume: "Resume",
            nav_contact: "Contact",
            hero_badge: "Available for new challenges",
            hero_role: "Backend Developer <span class=\"highlight\">&</span> Infrastructure Enthusiast",
            hero_desc: "Expert in Go and Java, connecting high-performance code with resilient production architectures.",
            hero_btn_projects: "View Projects",
            hero_btn_contact: "Contact",
            about_title: "About Me",
            about_p1: "Hello! My name is Hugo and I am passionate about building efficient systems that run stably \"end-to-end\". My journey in technology began in IT infrastructure, where I deeply learned about networks, Linux servers, and the OSI model.",
            about_p2: "Today, I am studying Information Systems and focusing my career on <strong>Backend Development</strong>. I believe my differentiator is understanding not only how the code works, but how it behaves inside a container, in a complex network, or under load in production.",
            about_p3: "Currently I work at <strong>Siplan</strong> as a Software Deployment Technician, where I apply my knowledge in automation and support for production environments.",
            exp_title: "Professional Experience",
            exp_role1: "Software Deployment Technician",
            exp_date1: "Siplan | Aug 2025 - Present",
            exp_desc1_1: "Deployment of systems in production environments.",
            exp_desc1_2: "Specialized technical support and process automation.",
            exp_role2: "Junior Helpdesk Technician",
            exp_date2: "ISP | Aug 2024 - Jul 2025",
            exp_desc2_1: "IT infrastructure management and Linux server administration.",
            exp_desc2_2: "Advanced network troubleshooting (TCP/IP, DNS, DHCP).",
            exp_role3: "IT Helpdesk Intern",
            exp_date3: "TI Helpdesk | Apr 2023 - Aug 2024",
            exp_desc3_1: "Level 1 and 2 technical support for internal users.",
            exp_desc3_2: "Preventive and corrective hardware and software maintenance.",
            proj_title: "Featured Projects",
            proj_desc1: "\"Guardian of your containers\". A robust tool for monitoring and managing Docker containers written in Go.",
            proj_desc2: "REST API for task management developed in Go, focused on performance and code organization.",
            proj_desc3: "System to manage software deployments, originally in Java and rewritten in Go for greater efficiency.",
            skills_title: "Technical Skills",
            skills_cat1: "Backend",
            skills_api: "REST APIs",
            skills_cat2: "Infra & DevOps",
            skills_net: "Networks (TCP/IP)",
            skills_cat3: "Database",
            contact_title: "Send me a \"Hello World\"",
            contact_desc: "I am always open to new opportunities or simply to talk about technology and systems.",
            contact_btn_email: "Send Email",
            contact_form_name: "Name",
            contact_form_email: "Email",
            contact_form_msg: "Message",
            contact_form_btn: "Send Message",
            contact_form_success: "Message sent successfully! Talk soon.",
            contact_form_error: "Error sending. Try again or use direct email.",
            setup_title: "My Development Setup",
            setup_caption: "Behind the scenes: Where the backend magic happens (under Gopher supervision).",
            setup_badge: "Gopher Engineering",
            nav_education: "Education",
            nav_metrics: "Metrics",
            edu_title: "Education & Certifications",
            edu_deg: "Information Systems",
            edu_uni: "Bachelor's Degree | 2022 - Present",
            edu_desc: "Focus on software engineering, computer architecture, and scalable systems development.",
            certs_title: "Top Credentials",
            cert_aws: "AWS Cloud Practitioner",
            cert_go: "Go Foundation",
            cert_java: "Java Developer",
            cert_docker: "Docker Expert",
            metrics_title: "Code Metrics",
            metrics_gh_title: "GitHub Activity",
            metrics_langs_title: "Top Languages"
        }
    };

    const langBtns = document.querySelectorAll('.lang-btn');
    const updateLanguage = (lang, animate = true) => {
        document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
        
        langBtns.forEach(btn => btn.classList.remove('active'));
        const activeBtn = document.getElementById(`lang-${lang}`);
        if(activeBtn) activeBtn.classList.add('active');
        localStorage.setItem('lang', lang);

        const applyTranslations = () => {
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (translations[lang][key]) {
                    el.innerHTML = translations[lang][key];
                }
            });
        };

        if (animate) {
            document.body.classList.add('lang-transitioning');
            setTimeout(() => {
                applyTranslations();
                document.body.classList.remove('lang-transitioning');
            }, 300);
        } else {
            applyTranslations();
        }
    };

    const savedLang = localStorage.getItem('lang') || 'pt';
    updateLanguage(savedLang, false);

    langBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const lang = e.target.id.split('-')[1];
            updateLanguage(lang, true);
        });
    });

    // Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = `
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
    `;
    const moonIcon = `
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
    `;

    const updateTheme = (theme) => {
        const isLight = theme === 'light';
        document.body.classList.toggle('light-theme', isLight);
        document.body.classList.toggle('dark-theme', !isLight);
        
        const themeIconContainer = document.getElementById('theme-icon-container');
        if (themeIconContainer) {
            themeIconContainer.innerHTML = isLight ? moonIcon : sunIcon;
        }

        const streakImg = document.getElementById('gh-streak-img');
        if (streakImg) {
            if (isLight) {
                streakImg.src = "https://streak-stats.demolab.com/?user=hugaojanuario&theme=default&hide_border=true&background=ffffff00&ring=2563eb&fire=2563eb&currStreakLabel=2563eb";
            } else {
                streakImg.src = "https://streak-stats.demolab.com/?user=hugaojanuario&theme=dark&hide_border=true&background=00000000";
            }
        }

        localStorage.setItem('theme', theme);
    };

    const currentTheme = localStorage.getItem('theme') || 'dark';
    updateTheme(currentTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = document.body.classList.contains('dark-theme');
            updateTheme(isDark ? 'light' : 'dark');
        });
    }

    // Custom Cursor - REPLACED BY CSS CURSOR (Low Latency)
    // Removed JS logic to eliminate lag reported by user

    // GitHub API Integration - Favorite Projects
    const githubReposContainer = document.getElementById('github-repos');
    if (githubReposContainer) {
        // Fallback HTML with 6 projects (as requested)
        const fallbackHTML = `
            <div class="project-card">
                <div class="card-glare"></div>
                <div class="project-content">
                    <div class="project-top"><div class="project-folder">📁</div><div class="project-links"><a href="https://github.com/hugaojanuario/sentinel" target="_blank">↗</a></div></div>
                    <h3 class="project-title">Sentinel</h3>
                    <p class="project-description">"Guardião dos seus containers". Monitoramento robusto de containers Docker escrito em Go.</p>
                    <ul class="project-tech-list"><li>Go</li><li>Docker API</li></ul>
                    <button class="btn-details" onclick="openProjectModal('hugaojanuario/sentinel', 'Sentinel')">
                        <i class="fas fa-info-circle"></i> Mais detalhes
                    </button>
                </div>
            </div>
            <div class="project-card">
                <div class="card-glare"></div>
                <div class="project-content">
                    <div class="project-top"><div class="project-folder">📁</div><div class="project-links"><a href="https://github.com/hugaojanuario/task.manager" target="_blank">↗</a></div></div>
                    <h3 class="project-title">Task Manager</h3>
                    <p class="project-description">API REST para gerenciamento de tarefas focada em performance e organização de código.</p>
                    <ul class="project-tech-list"><li>Go</li><li>PostgreSQL</li></ul>
                    <button class="btn-details" onclick="openProjectModal('hugaojanuario/task.manager', 'Task Manager')">
                        <i class="fas fa-info-circle"></i> Mais detalhes
                    </button>
                </div>
            </div>
            <div class="project-card">
                <div class="card-glare"></div>
                <div class="project-content">
                    <div class="project-top"><div class="project-folder">📁</div><div class="project-links"><a href="https://github.com/hugaojanuario/deploy-manager" target="_blank">↗</a></div></div>
                    <h3 class="project-title">Deploy Manager</h3>
                    <p class="project-description">Uma API para gerenciar implantações de software em clientes.</p>
                    <ul class="project-tech-list"><li>Java</li><li>Spring Boot</li></ul>
                    <button class="btn-details" onclick="openProjectModal('hugaojanuario/deploy-manager', 'Deploy Manager')">
                        <i class="fas fa-info-circle"></i> Mais detalhes
                    </button>
                </div>
            </div>
            <div class="project-card">
                <div class="card-glare"></div>
                <div class="project-content">
                    <div class="project-top"><div class="project-folder">📁</div><div class="project-links"><a href="https://github.com/hugaojanuario/deploy_manager_go" target="_blank">↗</a></div></div>
                    <h3 class="project-title">Deploy Manager Go</h3>
                    <p class="project-description">Sistema para gerenciar implantações de software, reescrito em Go.</p>
                    <ul class="project-tech-list"><li>Go</li><li>Infrastructure</li></ul>
                    <button class="btn-details" onclick="openProjectModal('hugaojanuario/deploy_manager_go', 'Deploy Manager Go')">
                        <i class="fas fa-info-circle"></i> Mais detalhes
                    </button>
                </div>
            </div>
            <div class="project-card">
                <div class="card-glare"></div>
                <div class="project-content">
                    <div class="project-top"><div class="project-folder">📁</div><div class="project-links"><a href="https://github.com/hugaojanuario/ambientes-linux" target="_blank">↗</a></div></div>
                    <h3 class="project-title">Ambientes Linux</h3>
                    <p class="project-description">Scripts e automações para configuração de servidores Linux.</p>
                    <ul class="project-tech-list"><li>Shell</li><li>Linux</li></ul>
                    <button class="btn-details" onclick="openProjectModal('hugaojanuario/ambientes-linux', 'Ambientes Linux')">
                        <i class="fas fa-info-circle"></i> Mais detalhes
                    </button>
                </div>
            </div>
            <div class="project-card">
                <div class="card-glare"></div>
                <div class="project-content">
                    <div class="project-top"><div class="project-folder">📁</div><div class="project-links"><a href="https://github.com/hugaojanuario/network-tools" target="_blank">↗</a></div></div>
                    <h3 class="project-title">Network Tools</h3>
                    <p class="project-description">Utilitários para troubleshooting e análise de redes TCP/IP.</p>
                    <ul class="project-tech-list"><li>Go</li><li>TCP/IP</li></ul>
                    <button class="btn-details" onclick="openProjectModal('hugaojanuario/network-tools', 'Network Tools')">
                        <i class="fas fa-info-circle"></i> Mais detalhes
                    </button>
                </div>
            </div>
        `;

        const pinnedRepos = [
            'IBM/event-notifications-go-admin-sdk',
            'ViitoJooj/door',
            'hugaojanuario/sentinel',
            'hugaojanuario/finia'
        ];

        Promise.all(pinnedRepos.map(repo => 
            fetch(`https://api.github.com/repos/${repo}`).then(res => {
                if (!res.ok) throw new Error(`Failed to load ${repo}`);
                return res.json();
            })
        ))
        .then(repos => {
            
            let loadedCount = 0;
            let tempHTML = '';
            
            repos.forEach(repo => {
                if (repo.name) {
                    loadedCount++;
                    const techTag = repo.language ? `<li>${repo.language}</li>` : '';
                    
                    let desc = repo.description;
                    if (!desc) {
                        if (repo.name === 'sentinel') desc = '"Guardião dos seus containers". Ferramenta robusta para monitoramento Dockerd em Go.';
                        else if (repo.name === 'task.manager') desc = 'API REST para gerenciamento de tarefas focada em performance e organização de código.';
                        else if (repo.name === 'deploy-manager') desc = 'Uma API para gerenciar implantações de software em clientes.';
                        else if (repo.name === 'deploy_manager_go') desc = 'Sistema para gerenciar implantações de software, reescrito em Go para maior eficiência.';
                    }

                    tempHTML += `
                        <div class="project-card">
                            <div class="card-glare"></div>
                            <div class="project-content">
                                <div class="project-top">
                                    <div class="project-folder">📁</div>
                                    <div class="project-links">
                                        <a href="${repo.html_url}" target="_blank">↗</a>
                                    </div>
                                </div>
                                <h3 class="project-title">${repo.name.replace(/-/g, ' ')}</h3>
                                <p class="project-description">${desc}</p>
                                <ul class="project-tech-list">
                                    ${techTag}
                                    <li>★ ${repo.stargazers_count || 0}</li>
                                    <li>Forks: ${repo.forks_count || 0}</li>
                                </ul>
                                <button class="btn-details" onclick="openProjectModal('${repo.full_name}', '${repo.name}')">
                                    <i class="fas fa-info-circle"></i> Mais detalhes
                                </button>
                            </div>
                        </div>
                    `;
                }
            });

            if (loadedCount > 0) {
                githubReposContainer.innerHTML = tempHTML;
            } else {
                githubReposContainer.innerHTML = fallbackHTML;
            }
            // Initialize carousel after content is injected
            initProjectCarousel();
        })
        .catch(err => {
            githubReposContainer.innerHTML = fallbackHTML;
            initProjectCarousel();
        });

        // GitHub Live Stats Logic
        fetch('https://api.github.com/users/hugaojanuario')
            .then(res => res.json())
            .then(data => {
                const reposEl = document.getElementById('gh-live-repos');
                const followersEl = document.getElementById('gh-live-followers');
                const followingEl = document.getElementById('gh-live-following');
                if (reposEl) reposEl.textContent = data.public_repos ?? '--';
                if (followersEl) followersEl.textContent = data.followers ?? '--';
                if (followingEl) followingEl.textContent = data.following ?? '--';
            })
            .catch(console.error);

        fetch('https://api.github.com/search/commits?q=author:hugaojanuario', {
            headers: { 'Accept': 'application/vnd.github.cloak-preview' }
        })
            .then(res => res.json())
            .then(data => {
                const commitsEl = document.getElementById('gh-live-commits');
                if(commitsEl) commitsEl.textContent = data.total_count || '---';
            })
            .catch(console.error);

        // Custom Top Languages Chart from GitHub API
        const langColors = {
            'Go': '#00ADD8', 'Java': '#b07219', 'JavaScript': '#f1e05a',
            'TypeScript': '#3178c6', 'Python': '#3572A5', 'Shell': '#89e051',
            'Dockerfile': '#384d54', 'HTML': '#e34c26', 'CSS': '#563d7c',
            'Kotlin': '#A97BFF', 'Rust': '#dea584', 'C': '#555555',
            'C++': '#f34b7d', 'Ruby': '#701516', 'Swift': '#F05138'
        };

        const topLangsChart = document.getElementById('top-langs-chart');
        if (topLangsChart) {
            // Render the chart from given data
            const renderLangsChart = (data) => {
                const total = data.reduce((s, [, v]) => s + v, 0);
                const barHTML = data.map(([lang, val]) => {
                    const pct = ((val / total) * 100).toFixed(1);
                    const color = langColors[lang] || '#8b949e';
                    return `<div class="lang-bar-seg" style="width:${pct}%;background:${color}" title="${lang}: ${pct}%"></div>`;
                }).join('');
                const legendHTML = data.map(([lang, val]) => {
                    const pct = ((val / total) * 100).toFixed(1);
                    const color = langColors[lang] || '#8b949e';
                    return `<div class="lang-legend-item">
                        <span class="lang-dot" style="background:${color}"></span>
                        <span class="lang-name">${lang}</span>
                        <span class="lang-pct">${pct}%</span>
                    </div>`;
                }).join('');
                topLangsChart.innerHTML = `
                    <div class="lang-bar">${barHTML}</div>
                    <div class="lang-legend">${legendHTML}</div>
                `;
            };

            // Hardcoded realistic fallback (always shows instantly)
            const fallbackLangs = [
                ['Go', 62], ['Java', 22], ['Shell', 8]
            ];
            renderLangsChart(fallbackLangs);

            // Try to update from API in background (no loading spinner needed)
            const allowedLangs = new Set(['Go','Java','JavaScript','TypeScript','Shell','Kotlin','Rust','Dockerfile','HTML','CSS','Makefile','HCL']);
            fetch('https://api.github.com/users/hugaojanuario/repos?per_page=100')
                .then(res => res.json())
                .then(repos => {
                    if (!Array.isArray(repos)) return; // rate-limited or error object
                    const totals = {};
                    repos.filter(r => !r.fork && r.language && allowedLangs.has(r.language)).forEach(r => {
                        totals[r.language] = (totals[r.language] || 0) + 1; // count repos, not size
                    });
                    const sorted = Object.entries(totals).sort((a, b) => b[1] - a[1]).slice(0, 3);
                    if (sorted.length > 0) renderLangsChart(sorted);
                })
                .catch(() => {}); // silently keep fallback if API fails
        }

        function initProjectCarousel() {
            const track = document.getElementById('github-repos');
            const prevBtn = document.getElementById('prev-project');
            const nextBtn = document.getElementById('next-project');
            const dotsContainer = document.getElementById('carousel-dots');
            
            if (!track || !prevBtn || !nextBtn) return;

            const cards = track.querySelectorAll('.project-card');
            if (cards.length === 0) return;

            let currentIndex = 0;
            
            // Create dots
            dotsContainer.innerHTML = '';
            cards.forEach((_, i) => {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(i));
                dotsContainer.appendChild(dot);
            });

            const dots = dotsContainer.querySelectorAll('.dot');

            function getVisibleItems() {
                if (window.innerWidth <= 768) return 1;
                if (window.innerWidth <= 1024) return 2;
                return 3;
            }

            function updateCarousel() {
                const visibleItems = getVisibleItems();
                const maxIndex = Math.max(0, cards.length - visibleItems);
                
                // Cap currentIndex if window resized
                if (currentIndex > maxIndex) currentIndex = maxIndex;

                const cardWidth = track.querySelector('.project-card').offsetWidth;
                const gap = 32; // matching CSS gap (2rem)
                
                const scrollAmount = currentIndex * (cardWidth + gap);
                track.style.transform = `translateX(-${scrollAmount}px)`;
                
                dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
                // Hide dots that would scroll past the end
                dot.style.display = i > maxIndex ? 'none' : 'block';
                });
                
                prevBtn.style.opacity = currentIndex === 0 ? '0.3' : '1';
                prevBtn.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';
                
                nextBtn.style.opacity = currentIndex >= maxIndex ? '0.3' : '1';
                nextBtn.style.pointerEvents = currentIndex >= maxIndex ? 'none' : 'auto';
            }

            function goToSlide(index) {
                const maxIndex = Math.max(0, cards.length - getVisibleItems());
                currentIndex = Math.max(0, Math.min(index, maxIndex));
                updateCarousel();
            }

            prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
            nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

            // Small delay to ensure layout is ready
            setTimeout(updateCarousel, 100);
            
            window.addEventListener('resize', updateCarousel);
        }
    }

    // --- Project Modal Logic ---
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const readmeContent = document.getElementById('readme-content');
    const filesContent = document.getElementById('files-content');
    const githubLink = document.getElementById('modal-github-link');
    const downloadLink = document.getElementById('modal-download-link');
    const closeBtn = document.getElementById('close-modal');
    const overlay = document.getElementById('modal-overlay');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    window.openProjectModal = async (repoFullname, repoName) => {
        toggleBodyScroll(true);
        modalTitle.textContent = repoName.replace(/-/g, ' ');
        githubLink.href = `https://github.com/${repoFullname}`;
        downloadLink.href = `https://github.com/${repoFullname}/archive/refs/heads/main.zip`;
        // Fallback for older repos that use master
        downloadLink.onerror = () => {
            downloadLink.href = `https://github.com/${repoFullname}/archive/refs/heads/master.zip`;
        };
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scroll

        // Reset tabs and path
        switchTab('readme');
        let currentRepo = repoFullname;

        // Initial Loaders
        readmeContent.innerHTML = '<div class="loader-container"><div class="loader"></div><p>Buscando README...</p></div>';
        filesContent.innerHTML = '<div class="loader-container"><div class="loader"></div><p>Mapeando arquivos...</p></div>';

        // Load Files (Root)
        window.loadFolder(repoFullname, '');
        try {
            const readmeRes = await fetch(`https://api.github.com/repos/${repoFullname}/readme`);
            if (readmeRes.ok) {
                const readmeData = await readmeRes.json();
                
                // Robust Base64 to UTF-8 decoding
                const binaryString = window.atob(readmeData.content.replace(/\s/g, ''));
                const bytes = new Uint8Array(binaryString.length);
                for (let i = 0; i < binaryString.length; i++) {
                    bytes[i] = binaryString.charCodeAt(i);
                }
                const decodedContent = new TextDecoder('utf-8').decode(bytes);
                
                // Clear loader and render
                const html = typeof marked.parse === 'function' 
                    ? marked.parse(decodedContent) 
                    : (typeof marked === 'function' ? marked(decodedContent) : decodedContent);
                
                readmeContent.innerHTML = html;

                // If project is one of the favorites, inject architecture diagram
                if (repoName.toLowerCase() === 'sentinel' || repoName.toLowerCase() === 'task.manager') {
                    const diagDiv = document.createElement('div');
                    diagDiv.className = 'mermaid-architecture';
                    diagDiv.style.marginTop = '2rem';
                    diagDiv.style.padding = '1.5rem';
                    diagDiv.style.background = 'rgba(255, 255, 255, 0.03)';
                    diagDiv.style.borderRadius = '8px';
                    diagDiv.style.border = '1px solid rgba(88, 166, 255, 0.2)';

                    const diagTitle = document.createElement('h3');
                    diagTitle.style.marginBottom = '1rem';
                    diagTitle.style.fontSize = '1.1rem';
                    diagTitle.innerText = "System Architecture Design";
                    diagDiv.appendChild(diagTitle);

                    const mermaidPre = document.createElement('pre');
                    mermaidPre.className = 'mermaid';
                    
                    if (repoName.toLowerCase() === 'sentinel') {
                        mermaidPre.textContent = `
graph TD
    A[Docker Engine] -->|Stats API| B(Sentinel Service)
    B --> C{Rules Engine}
    C -->|Alert| D[Terminal UI]
    C -->|Log| E[(Database)]
    B -->|Health Check| F[Status Widget]
                        `;
                    } else {
                        mermaidPre.textContent = `
graph LR
    A[Client] -->|REST| B(API Gateway)
    B --> C[Auth Middleware]
    C --> D[Task Service]
    D --> E[(PostgreSQL)]
    D --> F[(Redis Cache)]
                        `;
                    }
                    diagDiv.appendChild(mermaidPre);
                    readmeContent.appendChild(diagDiv);
                    
                    if (window.mermaid) {
                        window.mermaid.init(undefined, '.mermaid');
                    }
                }
            } else {
                readmeContent.innerHTML = '<p style="text-align:center; padding: 2rem;">Este projeto não possui um README.md público ou o limite de requisições do GitHub foi atingido.</p>';
            }
        } catch (err) {
            console.error('README Error:', err);
            readmeContent.innerHTML = `<p>Erro ao carregar README: ${err.message}</p>`;
        }
    };

    window.loadFolder = async (repoFullname, path = '') => {
        filesContent.innerHTML = '<div class="loader-container"><div class="loader"></div><p>Lendo pasta...</p></div>';
        
        try {
            const url = `https://api.github.com/repos/${repoFullname}/contents/${path}`;
            const res = await fetch(url);
            if (res.ok) {
                const data = await res.json();
                renderFileList(data, repoFullname, path);
            } else {
                filesContent.innerHTML = '<p>Erro ao acessar esta pasta.</p>';
            }
        } catch (err) {
            filesContent.innerHTML = `<p>Erro de conexão: ${err.message}</p>`;
        }
    };

    function renderFileList(files, repoFullname, currentPath) {
        // Sort: folders first
        files.sort((a, b) => (b.type === 'dir' ? 1 : -1) - (a.type === 'dir' ? 1 : -1));
        
        let html = '';

        // Add "Back" button if not at root
        if (currentPath !== '') {
            const parentPath = currentPath.split('/').slice(0, -1).join('/');
            html += `
                <div class="file-item clickable back-btn" onclick="loadFolder('${repoFullname}', '${parentPath}')">
                    <i class="fas fa-level-up-alt"></i>
                    <span>.. (Voltar)</span>
                </div>
            `;
        }

        files.forEach(file => {
            const isDir = file.type === 'dir';
            const icon = isDir ? 'fa-folder' : 'fa-file';
            const clickAction = isDir ? `onclick="loadFolder('${repoFullname}', '${file.path}')"` : '';
            const clickableClass = isDir ? 'clickable' : '';
            
            html += `
                <div class="file-item ${clickableClass}" ${clickAction}>
                    <i class="fas ${icon}"></i>
                    <span>${file.name}</span>
                </div>
            `;
        });
        filesContent.innerHTML = html;
    }

    function switchTab(tabId) {
        tabBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.tab === tabId));
        tabContents.forEach(content => content.classList.toggle('active', content.id === `${tabId}-tab`));
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });

    const closeModal = () => {
        modal.classList.remove('active');
        toggleBodyScroll(false);
    };

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    window.addEventListener('keydown', (e) => { if(e.key === 'Escape') closeModal(); });


    // VCard Generation
    const vcardBtn = document.getElementById('download-vcard');
    if (vcardBtn) {
        vcardBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const vcard = `BEGIN:VCARD
VERSION:3.0
FN:Hugo Januário
TITLE:Desenvolvedor Backend & Infraestrutura
EMAIL:hugojanuarioneto@gmail.com
TEL:+5566996324753
URL:https://github.com/hugaojanuario
URL:https://www.linkedin.com/in/hugo-januário/
END:VCARD`;
            const blob = new Blob([vcard], { type: 'text/vcard' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Hugo_Januario.vcf';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
    }

    // Initialize Lenis Smooth Scroll
    if (typeof Lenis !== 'undefined') {
        lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
    }

    // Back to Top Button Logic
    const backToTopBtn = document.getElementById('back-to-top');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            if (lenis) {
                lenis.scrollTo(0);
            } else {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Interactive Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    
    // Configuração do Web3Forms (Peça sua chave em https://web3forms.com/)
    const WEB3FORMS_ACCESS_KEY = "1418d683-9d3a-4476-ab3e-e11378cc2a11"; 

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const btnText = btn.querySelector('span');
            const originalText = btnText.innerText;
            
            btn.disabled = true;
            btnText.innerText = 'Enviando...';

            const lang = localStorage.getItem('lang') || 'pt';
            const formData = new FormData(contactForm);
            
            // Adicionar a chave de acesso e o assunto
            formData.append("access_key", WEB3FORMS_ACCESS_KEY);
            formData.append("subject", `Novo contato de ${formData.get('name')} | Portfólio`);
            formData.append("from_name", "Portfólio Hugo Januário");

            fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            })
            .then(async (response) => {
                const json = await response.json();
                if (response.status === 200) {
                    formStatus.innerText = translations[lang].contact_form_success;
                    formStatus.className = 'form-status success';
                    contactForm.reset();
                } else {
                    console.log(response);
                    formStatus.innerText = json.message || translations[lang].contact_form_error;
                    formStatus.className = 'form-status error';
                }
            })
            .catch(error => {
                console.log(error);
                formStatus.innerText = translations[lang].contact_form_error;
                formStatus.className = 'form-status error';
            })
            .finally(() => {
                btn.disabled = false;
                btnText.innerText = originalText;
                setTimeout(() => {
                    formStatus.innerText = '';
                    formStatus.className = 'form-status';
                }, 5000);
            });
        });
    }

    // Reading Progress Bar Logic
    const progressBar = document.getElementById('reading-progress');
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (progressBar) {
            progressBar.style.width = scrolled + "%";
        }
    });


    // --- Mascot Video lifecycle ---
    const mascotVideo = document.getElementById('mascot-video');
    const setupModal = document.getElementById('setup-modal');
    const setupBtn = document.getElementById('show-setup');
    const setupTemp = document.getElementById('setup-temp');

    if (setupBtn && setupModal && mascotVideo) {
        setupBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            setupModal.style.display = 'flex';
            toggleBodyScroll(true);
            mascotVideo.play().catch(console.error);
            
            // Randomize setup temperature just for fun
            if (setupTemp) {
                setupTemp.innerText = (22 + Math.floor(Math.random() * 6)) + '°C';
            }
        });

        // Setup modal close logic
        const closeSetupBtn = setupModal.querySelector('.modal-close');
        const setupOverlay = setupModal.querySelector('.modal-overlay');
        
        const closeSetup = () => {
            setupModal.style.display = 'none';
            toggleBodyScroll(false);
            mascotVideo.pause();
        };

        if (closeSetupBtn) closeSetupBtn.addEventListener('click', closeSetup);
        if (setupOverlay) setupOverlay.addEventListener('click', closeSetup);
    }

    // --- Infrastructure Telemetry Dashboard ---
    const infraStatus = document.getElementById('infra-status');
    const telemetryDashboard = document.getElementById('telemetry-dashboard');
    const closeTelemetry = document.getElementById('close-telemetry');
    const telemetryLogs = document.getElementById('telemetry-logs');

    if (infraStatus && telemetryDashboard) {
        infraStatus.addEventListener('click', () => {
            telemetryDashboard.style.display = 'flex';
            toggleBodyScroll(true);
            updateTelemetryData();
        });

        if (closeTelemetry) {
            closeTelemetry.addEventListener('click', () => {
                telemetryDashboard.style.display = 'none';
                toggleBodyScroll(false);
            });
        }
    }

    const updateTelemetryData = () => {
        const cpuBar = document.getElementById('cpu-bar');
        const cpuVal = document.getElementById('cpu-value');
        const memBar = document.getElementById('mem-bar');
        const memVal = document.getElementById('mem-value');
        const netBar = document.getElementById('net-bar');
        const netVal = document.getElementById('net-value');

        setInterval(() => {
            if (telemetryDashboard.style.display === 'flex') {
                const cpu = Math.floor(Math.random() * 40) + 20;
                const mem = (8 + Math.random() * 4).toFixed(1);
                const memPercent = (mem / 16) * 100;
                const net = (Math.random() * 2).toFixed(1);
                const netPercent = (net / 10) * 100;

                if (cpuBar) cpuBar.style.width = cpu + '%';
                if (cpuVal) cpuVal.innerText = cpu + '%';
                if (memBar) memBar.style.width = memPercent + '%';
                if (memVal) memVal.innerText = mem + ' GB';
                if (netBar) netBar.style.width = netPercent + '%';
                if (netVal) netVal.innerText = net + ' Gbps';

                // Add random log
                const logs = [
                    "> Cache invalidated [OK]",
                    "> Peer connection reset [WARN]",
                    "> DB Buffer flush [AUTO]",
                    "> Load balancing re-route",
                    "> Monitoring probe [SUCCESS]"
                ];
                if (Math.random() > 0.7 && telemetryLogs) {
                    const log = document.createElement('div');
                    log.className = 'log-line';
                    log.innerText = logs[Math.floor(Math.random() * logs.length)];
                    telemetryLogs.prepend(log);
                    if (telemetryLogs.childNodes.length > 8) telemetryLogs.lastChild.remove();
                }
            }
        }, 2000);
    };

    // --- Matrix Rain Effect ---
    const canvas = document.getElementById('matrix-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height, columns;
        const fontSize = 16;
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";
        let drops = [];

        const initMatrix = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            columns = Math.floor(width / fontSize);
            drops = Array(columns).fill(1);
        };

        const drawMatrix = () => {
            ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
            ctx.fillRect(0, 0, width, height);
            ctx.fillStyle = "#0F0";
            ctx.font = fontSize + "px monospace";

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                if (drops[i] * fontSize > height && Math.random() > 0.975) drops[i] = 0;
                drops[i]++;
            }
        };

        let matrixInterval = null;
        window.startMatrix = () => {
            initMatrix();
            canvas.classList.add('active');
            if (!matrixInterval) matrixInterval = setInterval(drawMatrix, 33);
            setTimeout(() => {
                canvas.classList.remove('active');
                clearInterval(matrixInterval);
                matrixInterval = null;
            }, 6000);
        };
        window.addEventListener('resize', initMatrix);
    }

    // --- GSAP Animations ---
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Hero Parallax / Entrance
        const heroTl = gsap.timeline({ delay: 0.5 });
        
        heroTl.fromTo('.hero-text > *', 
            { y: 30, opacity: 0 },
            { 
                y: 0, 
                opacity: 1, 
                duration: 0.8, 
                stagger: 0.1, 
                ease: "power2.out"
            }
        ).fromTo('.hero-visual',
            { x: 50, opacity: 0 },
            { 
                x: 0, 
                opacity: 1, 
                duration: 1.2, 
                ease: "power3.out"
            }, "-=0.4"
        );

        // Section Reveal with ScrollTrigger
        const sections = document.querySelectorAll('section:not(#hero)');
        sections.forEach(section => {
            const header = section.querySelector('.section-header');
            const content = section.querySelector('.container > *:not(.section-header)');

            if (header) {
                gsap.from(header, {
                    scrollTrigger: {
                        trigger: header,
                        start: "top 85%",
                    },
                    x: -50,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power2.out"
                });
            }

            if (content) {
                gsap.from(content, {
                    scrollTrigger: {
                        trigger: content,
                        start: "top 85%",
                    },
                    y: 40,
                    opacity: 0,
                    duration: 1,
                    delay: 0.2,
                    ease: "power2.out"
                });
            }
        });

        // Special animation for projects
        gsap.from('.project-card', {
            scrollTrigger: {
                trigger: '.projects',
                start: "top 70%",
            },
            scale: 0.9,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "back.out(1.7)"
        });
    }

    // --- Auto-scroll GitHub chart to latest commits (right side) ---
    const ghChartImg = document.querySelector('.gh-chart-img');
    const ghCalendarContainer = document.querySelector('.gh-calendar-container');
    if (ghChartImg && ghCalendarContainer) {
        const scrollToEnd = () => {
            ghCalendarContainer.scrollLeft = ghCalendarContainer.scrollWidth;
        };
        ghChartImg.addEventListener('load', scrollToEnd);
        if (ghChartImg.complete) scrollToEnd();
    }

    // --- 3D Tilt Effect Logic (Apple Style) ---
    function init3DTilt() {
        // Elements to apply the effect
        const tiltTargets = document.querySelectorAll('.metric-card, .project-card');
        
        // Configuration
        const tiltIntensity = 10; // Degrees of max rotation
        
        tiltTargets.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left; // x position within the element
                const y = e.clientY - rect.top;  // y position within the element
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                // Calculate rotation based on cursor position relative to center
                const rotateX = ((y - centerY) / centerY) * -tiltIntensity;
                const rotateY = ((x - centerX) / centerX) * tiltIntensity;
                
                // Update CSS variables for the glare effect
                card.style.setProperty('--mouseX', `${x}px`);
                card.style.setProperty('--mouseY', `${y}px`);
                
                // Apply 3D rotation
                card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });
            
            card.addEventListener('mouseleave', () => {
                // Reset to original position
                card.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            });
        });
    }

    // Call init3DTilt for static elements and re-call after dynamic injection
    init3DTilt();
    
    // Observer to re-call init3DTilt for dynamic GitHub projects
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
                init3DTilt();
            }
        });
    });
    
    const projectGrid = document.getElementById('github-repos');
    if (projectGrid) {
        observer.observe(projectGrid, { childList: true });
    }

});
