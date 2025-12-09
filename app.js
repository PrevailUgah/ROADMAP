// --- DATA SOURCE ---
        const ROADMAP = [
            {
                id: "phase-1", title: "Phase 1: Foundations", duration: 3, 
                desc: "Master the basics. Python is the language of finance.",
                sections: [
                    { kind: "learning", title: "Core Concepts", items: [
                        { id: "p1-l-1", text: "Python: Variables, Loops, Functions", video: "https://www.youtube.com/results?search_query=python+basics+finance" },
                        { id: "p1-l-2", text: "Algorithmic Thinking & Problem Solving", video: "" },
                        { id: "p1-l-3", text: "Git & GitHub: Version Control", video: "" }
                    ]},
                    { kind: "projects", title: "Build & Verify", items: [
                        { id: "p1-p-1", text: "Loan Interest Calculator (CLI)", video: "" },
                        { id: "p1-p-2", text: "Personal Expense Tracker (CSV based)", video: "" },
                        { id: "p1-p-3", text: "Portfolio Website on GitHub Pages", video: "" }
                    ]},
                    { kind: "gigs", title: "Earn (White Hat)", items: [
                        { id: "p1-g-1", text: "Automate Excel sheets for local SMEs using Python", video: "" }
                    ]}
                ]
            },
            {
                id: "phase-2", title: "Phase 2: Web Dev Basics", duration: 3,
                desc: "Build the interface. Users need to see their money.",
                sections: [
                    { kind: "learning", title: "Frontend & Backend", items: [
                        { id: "p2-l-1", text: "HTML5, CSS3, JavaScript (ES6+)", video: "" },
                        { id: "p2-l-2", text: "React.js: Components & State", video: "" },
                        { id: "p2-l-3", text: "Node.js or Django Basics", video: "" }
                    ]},
                    { kind: "projects", title: "Build & Verify", items: [
                        { id: "p2-p-1", text: "Fintech Landing Page (Responsive)", video: "" },
                        { id: "p2-p-2", text: "Transaction Dashboard UI", video: "" },
                        { id: "p2-p-3", text: "Simple REST API for Account Balances", video: "" }
                    ]},
                    { kind: "gigs", title: "Earn (White Hat)", items: [
                        { id: "p2-g-1", text: "Build landing pages for local startups", video: "" },
                        { id: "p2-g-2", text: "Convert design files (Figma) to HTML", video: "" }
                    ]}
                ]
            },
            {
                id: "phase-3", title: "Phase 3: Security & Compliance", duration: 3,
                desc: "The Guardian Phase. Security is not optional.",
                sections: [
                    { kind: "learning", title: "Security Fundamentals", items: [
                        { id: "p3-l-1", text: "Encryption (AES, RSA) & Hashing (SHA-256)", video: "" },
                        { id: "p3-l-2", text: "JWT Auth & OAuth 2.0 Flow", video: "" },
                        { id: "p3-l-3", text: "KYC/AML Laws in Nigeria (NDPR)", video: "" }
                    ]},
                    { kind: "projects", title: "Build & Verify", items: [
                        { id: "p3-p-1", text: "Secure Login System with 2FA", video: "" },
                        { id: "p3-p-2", text: "KYC Upload Form with Verification Logic", video: "" }
                    ]},
                    { kind: "gigs", title: "Earn (White Hat)", items: [
                        { id: "p3-g-1", text: "Implement SSL & Security Headers for clients", video: "" }
                    ]}
                ]
            },
            {
                id: "phase-4", title: "Phase 4: Data & AI", duration: 3,
                desc: "Data is the new oil. Learn to refine it.",
                sections: [
                    { kind: "learning", title: "Data Analysis", items: [
                        { id: "p4-l-1", text: "SQL Mastery (PostgreSQL)", video: "" },
                        { id: "p4-l-2", text: "Pandas & NumPy for Financial Data", video: "" },
                        { id: "p4-l-3", text: "Basics of Fraud Detection Models", video: "" }
                    ]},
                    { kind: "projects", title: "Build & Verify", items: [
                        { id: "p4-p-1", text: "Fraud Detection Script (Rule-based)", video: "" },
                        { id: "p4-p-2", text: "Visual Dashboard for Spending Trends", video: "" }
                    ]}
                ]
            },
             {
                id: "phase-5", title: "Phase 5: Deployment & Scale", duration: 3,
                desc: "Go live. Learn Cloud and DevOps.",
                sections: [
                    { kind: "learning", title: "Cloud Ops", items: [
                        { id: "p5-l-1", text: "AWS/GCP Basics (EC2, S3, RDS)", video: "" },
                        { id: "p5-l-2", text: "Docker & CI/CD Pipelines", video: "" }
                    ]},
                    { kind: "projects", title: "Build & Verify", items: [
                        { id: "p5-p-1", text: "Deploy Full Stack App to Cloud", video: "" },
                        { id: "p5-p-2", text: "Automated Testing Pipeline", video: "" }
                    ]}
                ]
            },
            {
                id: "phase-6", title: "Phase 6: Leadership", duration: 3,
                desc: "Lead the industry. Build your own startup.",
                sections: [
                    { kind: "learning", title: "Business Logic", items: [
                        { id: "p6-l-1", text: "Agile Management & Scrum", video: "" },
                        { id: "p6-l-2", text: "Product Design (MVP Strategy)", video: "" }
                    ]},
                    { kind: "projects", title: "Build & Verify", items: [
                        { id: "p6-p-1", text: "Launch MVP of a Fintech Product", video: "" },
                        { id: "p6-p-2", text: "Open Source Contribution", video: "" }
                    ]}
                ]
            }
        ];

        // --- STATE MANAGEMENT ---
        const APP_STATE = {
            checks: new Set(),
            expanded: new Set(),
            settings: {
                startDate: new Date().toISOString().split('T')[0],
                hoursPerDay: 2,
                daysOff: 1
            }
        };

        const STORAGE_KEY = "naija_fintech_v3";

        // --- INITIALIZATION ---
        function init() {
            loadState();
            renderRoadmap();
            updateCalculations();
            initCharts();
            updateDashboard();
            
            // Set input values
            document.getElementById('start-date').value = APP_STATE.settings.startDate;
            document.getElementById('hours-per-day').value = APP_STATE.settings.hoursPerDay;
            document.getElementById('days-off').value = APP_STATE.settings.daysOff;
        }

        function loadState() {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                APP_STATE.checks = new Set(parsed.checks || []);
                APP_STATE.expanded = new Set(parsed.expanded || []);
                APP_STATE.settings = { ...APP_STATE.settings, ...parsed.settings };
            }
        }

        function saveState() {
            const data = {
                checks: Array.from(APP_STATE.checks),
                expanded: Array.from(APP_STATE.expanded),
                settings: APP_STATE.settings
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            updateDashboard(); // Refresh stats whenever state is saved
        }

        // --- NAVIGATION ---
        window.switchView = function(viewId) {
            // Hide all sections
            document.querySelectorAll('section').forEach(el => el.classList.add('hidden'));
            // Show selected
            document.getElementById(`view-${viewId}`).classList.remove('hidden');
            
            // Update Nav UI
            document.querySelectorAll('.nav-item').forEach(el => {
                el.classList.remove('active', 'bg-slate-50', 'text-sky-600', 'border-r-4', 'border-sky-500');
                el.classList.add('text-slate-600');
                
                // Reset icon color style to default if needed or handle via CSS class
            });
            
            const activeBtn = document.getElementById(`nav-${viewId}`);
            activeBtn.classList.add('active');

            // Scroll to top
            document.getElementById('main-scroll').scrollTop = 0;

            // Close sidebar on phones & tablets after navigation
            if (window.innerWidth < 1024) {
                document.body.classList.add('sidebar-hidden');
            }

            // Trigger chart resize if dashboard or planner
            if(viewId === 'dashboard' && skillsChartInstance) skillsChartInstance.resize();
            if(viewId === 'dashboard' && typeChartInstance) typeChartInstance.resize();
            if(viewId === 'planner' && timelineChartInstance) {
                updateCalculations(); 
                timelineChartInstance.resize();
            }
        };

        // --- RENDER ROADMAP ---
        function renderRoadmap() {
            const container = document.getElementById('roadmap-container');
            container.innerHTML = '';

            ROADMAP.forEach((phase, index) => {
                const isExpanded = APP_STATE.expanded.has(phase.id);
                
                // Phase Card
                const card = document.createElement('div');
                card.className = "bg-white rounded-xl border border-slate-200 phase-card overflow-hidden";
                
                // Header
                const header = document.createElement('div');
                header.className = "p-4 cursor-pointer bg-slate-50 border-b border-slate-100 flex justify-between items-center hover:bg-slate-100 transition-colors";
                header.onclick = () => togglePhase(phase.id);
                
                header.innerHTML = `
                    <div class="flex items-center gap-3">
                        <div class="bg-white border border-slate-200 rounded-lg w-10 h-10 flex items-center justify-center font-bold text-slate-700 shadow-sm">${index + 1}</div>
                        <div>
                            <h3 class="font-bold text-slate-800">${phase.title}</h3>
                            <p class="text-xs text-slate-500">${phase.desc}</p>
                        </div>
                    </div>
                    <div class="text-slate-400 transform transition-transform ${isExpanded ? 'rotate-180' : ''}">▼</div>
                `;

                // Body
                const body = document.createElement('div');
                body.className = isExpanded ? 'block' : 'hidden';
                
                const grid = document.createElement('div');
                grid.className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6";

                phase.sections.forEach(section => {
                    const sectionEl = document.createElement('div');
                    
                    let icon = '📄';
                    let colorClass = 'text-slate-600';
                    if (section.kind === 'learning') { icon = '📚'; colorClass = 'text-sky-600'; }
                    if (section.kind === 'projects') { icon = '🛠️'; colorClass = 'text-emerald-600'; }
                    if (section.kind === 'gigs') { icon = '💰'; colorClass = 'text-amber-600'; }

                    let itemsHtml = '';
                    section.items.forEach(item => {
                        const isChecked = APP_STATE.checks.has(item.id);
                        itemsHtml += `
                            <li class="flex items-start gap-3 py-2 border-b border-slate-50 last:border-0" data-kind="${section.kind}">
                                <input type="checkbox" class="custom-checkbox mt-1 shrink-0" 
                                    ${isChecked ? 'checked' : ''} 
                                    onchange="toggleTask('${item.id}')">
                                <div>
                                    <span class="text-sm text-slate-700 ${isChecked ? 'line-through text-slate-400' : ''}">${item.text}</span>
                                    ${item.video ? `<a href="${item.video}" target="_blank" class="block text-xs text-sky-500 hover:underline mt-1">📺 Watch Tutorial</a>` : ''}
                                </div>
                            </li>
                        `;
                    });

                    sectionEl.innerHTML = `
                        <h4 class="font-bold text-sm ${colorClass} mb-3 flex items-center gap-2 uppercase tracking-wide opacity-80">
                            ${icon} ${section.title}
                        </h4>
                        <ul class="space-y-1">
                            ${itemsHtml}
                        </ul>
                    `;
                    grid.appendChild(sectionEl);
                });

                body.appendChild(grid);
                card.appendChild(header);
                card.appendChild(body);
                container.appendChild(card);
            });
        }

        // --- LOGIC ---
        window.togglePhase = function(id) {
            if (APP_STATE.expanded.has(id)) {
                APP_STATE.expanded.delete(id);
            } else {
                APP_STATE.expanded.add(id);
            }
            saveState();
            renderRoadmap();
        };

        window.toggleTask = function(id) {
            if (APP_STATE.checks.has(id)) {
                APP_STATE.checks.delete(id);
            } else {
                APP_STATE.checks.add(id);
            }
            saveState();
            // Re-render specific text or whole roadmap? 
            // Whole roadmap is safer for style updates (line-through)
            renderRoadmap();
        };

        window.toggleAll = function(expand) {
            if (expand) {
                ROADMAP.forEach(p => APP_STATE.expanded.add(p.id));
            } else {
                APP_STATE.expanded.clear();
            }
            saveState();
            renderRoadmap();
        };

        window.resetData = function() {
            if(confirm("Reset all progress? This cannot be undone.")) {
                APP_STATE.checks.clear();
                saveState();
                renderRoadmap();
            }
        };

        // --- FILTER LOGIC ---
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // UI update
                filterBtns.forEach(b => {
                    b.classList.remove('bg-slate-800', 'text-white', 'active');
                    b.classList.add('bg-white', 'text-slate-600');
                });
                e.target.classList.remove('bg-white', 'text-slate-600');
                e.target.classList.add('bg-slate-800', 'text-white', 'active');

                const filter = e.target.dataset.filter;
                applyFilter(filter);
            });
        });

        function applyFilter(kind) {
            const phases = document.querySelectorAll('.phase-card');
            phases.forEach(phase => {
                const lists = phase.querySelectorAll('li');
                let visibleCount = 0;
                lists.forEach(li => {
                    if (kind === 'all' || li.dataset.kind === kind) {
                        li.style.display = 'flex';
                        visibleCount++;
                    } else {
                        li.style.display = 'none';
                    }
                });
                // Optional: Hide empty phases if no items match
                // phase.style.display = visibleCount > 0 ? 'block' : 'none';
            });
        }

        // --- CALCULATIONS & SCHEDULER ---
        const inputs = ['start-date', 'hours-per-day', 'days-off'];
        inputs.forEach(id => {
            document.getElementById(id).addEventListener('change', (e) => {
                const val = e.target.value;
                if(id === 'start-date') APP_STATE.settings.startDate = val;
                if(id === 'hours-per-day') APP_STATE.settings.hoursPerDay = parseFloat(val);
                if(id === 'days-off') APP_STATE.settings.daysOff = parseInt(val);
                saveState();
                updateCalculations();
            });
        });

        function updateCalculations() {
            const start = new Date(APP_STATE.settings.startDate);
            const hoursPerDay = APP_STATE.settings.hoursPerDay;
            const daysOff = APP_STATE.settings.daysOff;
            
            // Assumption: Each phase roughly takes 100 hours of focused work (Learning + Projects)
            // This is a heuristic.
            const hoursPerPhase = 120; 
            const workDaysPerWeek = 7 - daysOff;
            const hoursPerWeek = workDaysPerWeek * hoursPerDay;

            let currentDate = new Date(start);
            const timelineData = [];

            ROADMAP.forEach(phase => {
                const weeksNeeded = hoursPerPhase / hoursPerWeek;
                const daysNeeded = weeksNeeded * 7;
                
                const phaseStart = new Date(currentDate);
                currentDate.setDate(currentDate.getDate() + daysNeeded);
                const phaseEnd = new Date(currentDate);

                timelineData.push({
                    phase: phase.title,
                    start: phaseStart,
                    end: phaseEnd
                });
            });

            // Update UI Text
            const finalDate = timelineData[timelineData.length-1].end;
            const totalDays = Math.ceil((finalDate - start) / (1000 * 60 * 60 * 24));
            
            document.getElementById('calc-end-date').innerText = finalDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
            document.getElementById('calc-duration').innerText = `~${totalDays} days total duration`;
            document.getElementById('dash-finish-date').innerText = finalDate.toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
            document.getElementById('dash-hours').innerText = hoursPerDay;

            // Update Timeline Chart
            updateTimelineChart(timelineData);
        }

        // --- DASHBOARD & CHARTS ---
        let skillsChartInstance = null;
        let typeChartInstance = null;
        let timelineChartInstance = null;

        function updateDashboard() {
            // Calculate Stats
            let totalTasks = 0;
            let completedTasks = 0;
            const phaseCounts = [];
            const typeCounts = { learning: 0, projects: 0, gigs: 0 };
            
            let currentPhaseIndex = 0;
            let foundIncomplete = false;

            ROADMAP.forEach((phase, idx) => {
                let pTotal = 0;
                let pDone = 0;
                
                phase.sections.forEach(sec => {
                    sec.items.forEach(item => {
                        totalTasks++;
                        pTotal++;
                        if (APP_STATE.checks.has(item.id)) {
                            completedTasks++;
                            pDone++;
                            typeCounts[sec.kind]++;
                        }
                    });
                });
                
                phaseCounts.push({ total: pTotal, done: pDone, label: `Phase ${idx+1}` });

                // Determine Current Phase logic
                if (!foundIncomplete && pDone < pTotal) {
                    currentPhaseIndex = idx;
                    foundIncomplete = true;
                }
            });

            // UI Updates
            document.getElementById('dash-completed').innerText = completedTasks;
            document.getElementById('dash-total').innerText = totalTasks;
            document.getElementById('dash-current-phase').innerText = ROADMAP[currentPhaseIndex].title;
            
            const totalPct = totalTasks === 0 ? 0 : Math.round((completedTasks/totalTasks) * 100);
            document.getElementById('sidebar-progress').style.width = `${totalPct}%`;
            document.getElementById('sidebar-pct').innerText = `${totalPct}%`;

            // Chart Updates
            updateSkillsChart(phaseCounts);
            updateTypeChart(typeCounts);
        }

        function initCharts() {
            Chart.defaults.font.family = "'Inter', sans-serif";
            Chart.defaults.color = '#64748b';
        }

        function updateSkillsChart(data) {
            const ctx = document.getElementById('skillsChart').getContext('2d');
            if (skillsChartInstance) skillsChartInstance.destroy();

            skillsChartInstance = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: data.map(d => d.label),
                    datasets: [
                        {
                            label: 'Completed',
                            data: data.map(d => d.done),
                            backgroundColor: '#10b981',
                            borderRadius: 4
                        },
                        {
                            label: 'Remaining',
                            data: data.map(d => d.total - d.done),
                            backgroundColor: '#e2e8f0',
                            borderRadius: 4
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'bottom' }
                    },
                    scales: {
                        x: { stacked: true, grid: { display: false } },
                        y: { stacked: true, beginAtZero: true, grid: { borderDash: [2, 4] } }
                    }
                }
            });
        }

        function updateTypeChart(counts) {
            const ctx = document.getElementById('typeChart').getContext('2d');
            if (typeChartInstance) typeChartInstance.destroy();

            typeChartInstance = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Learning', 'Projects', 'Gigs'],
                    datasets: [{
                        data: [counts.learning, counts.projects, counts.gigs],
                        backgroundColor: ['#0ea5e9', '#10b981', '#f59e0b'],
                        borderWidth: 0,
                        hoverOffset: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '70%',
                    plugins: {
                        legend: { position: 'bottom' }
                    }
                }
            });
        }

        function updateTimelineChart(timelineData) {
            const ctx = document.getElementById('timelineChart').getContext('2d');
            if (timelineChartInstance) timelineChartInstance.destroy();
            
            // Format data for floating bars: [start, end]
            // Note: Chart.js bar chart with date axis needs parsing
            // We'll use a simple workaround: numbered days from start
            const labels = timelineData.map(t => t.phase);
            const startEpoch = new Date(APP_STATE.settings.startDate).getTime();
            
            const dataPoints = timelineData.map(t => {
                return [
                    (t.start.getTime() - startEpoch) / (1000*60*60*24),
                    (t.end.getTime() - startEpoch) / (1000*60*60*24)
                ];
            });

            timelineChartInstance = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Duration (Days from Start)',
                        data: dataPoints,
                        backgroundColor: '#0ea5e9',
                        borderRadius: 4,
                        barPercentage: 0.5
                    }]
                },
                options: {
                    indexAxis: 'y',
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const raw = context.raw;
                                    return `Days ${Math.round(raw[0])} to ${Math.round(raw[1])}`;
                                }
                            }
                        }
                    },
                    scales: {
                        x: { beginAtZero: true, title: { display: true, text: 'Days from Start' } }
                    }
                }
            });
        }

        // --- BOOT ---
        window.addEventListener('DOMContentLoaded', init);

        // Add near the top, after APP_STATE definition:

        window.toggleSidebar = function() {
            document.body.classList.toggle('sidebar-visible');
        };
