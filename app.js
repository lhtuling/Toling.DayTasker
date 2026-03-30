(function () {
    'use strict';

    let db = null;
    let todayQueue = [];
    let currentIndex = 0;
    let todayStr = '';

    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => document.querySelectorAll(sel);

    function getToday() {
        const d = new Date();
        return d.getFullYear() + '-' +
            String(d.getMonth() + 1).padStart(2, '0') + '-' +
            String(d.getDate()).padStart(2, '0');
    }

    function getChineseDate() {
        const d = new Date();
        const weekNames = ['日', '一', '二', '三', '四', '五', '六'];
        return d.getFullYear() + '年' + (d.getMonth() + 1) + '月' + d.getDate() + '日 星期' + weekNames[d.getDay()];
    }

    function addDays(dateStr, days) {
        const d = new Date(dateStr);
        d.setDate(d.getDate() + days);
        return d.getFullYear() + '-' +
            String(d.getMonth() + 1).padStart(2, '0') + '-' +
            String(d.getDate()).padStart(2, '0');
    }

    function showToast(msg) {
        const toast = $('#toast');
        toast.textContent = msg;
        toast.classList.remove('hidden');
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.classList.add('hidden'), 300);
        }, 2000);
    }

    function showModal(title, msg) {
        return new Promise((resolve) => {
            $('#modal-title').textContent = title;
            $('#modal-msg').textContent = msg;
            $('#modal-overlay').classList.remove('hidden');
            const onConfirm = () => {
                $('#modal-overlay').classList.add('hidden');
                cleanup();
                resolve(true);
            };
            const onCancel = () => {
                $('#modal-overlay').classList.add('hidden');
                cleanup();
                resolve(false);
            };
            const cleanup = () => {
                $('#modal-confirm').removeEventListener('click', onConfirm);
                $('#modal-cancel').removeEventListener('click', onCancel);
            };
            $('#modal-confirm').addEventListener('click', onConfirm);
            $('#modal-cancel').addEventListener('click', onCancel);
        });
    }

    function navigateTo(pageId) {
        $$('.page').forEach(p => p.classList.remove('active'));
        const target = $(`#${pageId}`);
        if (target) {
            target.classList.add('active');
            target.style.animation = 'none';
            target.offsetHeight;
            target.style.animation = '';
        }
    }

    async function initDB() {
        const SQL = await initSqlJs({
            locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/${file}`
        });

        const saved = localStorage.getItem('poetry_db');
        if (saved) {
            const buf = Uint8Array.from(atob(saved), c => c.charCodeAt(0));
            db = new SQL.Database(buf);
        } else {
            db = new SQL.Database();
        }

        db.run(`CREATE TABLE IF NOT EXISTS poems (
            id INTEGER PRIMARY KEY,
            title TEXT NOT NULL,
            author TEXT NOT NULL,
            content TEXT NOT NULL,
            pinyin TEXT NOT NULL,
            keywords TEXT NOT NULL,
            analysis TEXT NOT NULL
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS learning (
            poem_id INTEGER PRIMARY KEY,
            memory_level INTEGER DEFAULT 0,
            next_review TEXT DEFAULT '',
            today_remaining INTEGER DEFAULT 0,
            status TEXT DEFAULT 'new',
            mastered INTEGER DEFAULT 0,
            last_action TEXT DEFAULT '',
            last_review_date TEXT DEFAULT ''
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS daily_log (
            date TEXT PRIMARY KEY,
            new_poem_id INTEGER DEFAULT 0
        )`);

        const countResult = db.exec("SELECT COUNT(*) FROM poems");
        const poemCount = countResult[0] ? countResult[0].values[0][0] : 0;

        if (poemCount === 0) {
            POEMS_DATA.forEach(p => {
                db.run(
                    "INSERT OR IGNORE INTO poems VALUES (?, ?, ?, ?, ?, ?, ?)",
                    [p.id, p.title, p.author, JSON.stringify(p.content), JSON.stringify(p.pinyin), JSON.stringify(p.keywords), p.analysis]
                );
            });
        }

        saveDB();
    }

    function saveDB() {
        const data = db.export();
        const b64 = btoa(String.fromCharCode(...data));
        localStorage.setItem('poetry_db', b64);
    }

    function getIntervalDays(level) {
        const intervals = [1, 2, 4, 8, 16, 32, 64, 128];
        if (level <= 0) return 1;
        if (level <= intervals.length) return intervals[level - 1];
        return 200 + Math.floor(Math.random() * 166);
    }

    function handleKnow(poemId) {
        const rows = db.exec("SELECT memory_level, status FROM learning WHERE poem_id = ?", [poemId]);
        let level = 0;
        if (rows.length > 0 && rows[0].values.length > 0) {
            level = rows[0].values[0][0];
        }
        level += 1;
        const interval = getIntervalDays(level);
        const nextReview = addDays(todayStr, interval);

        db.run(
            `INSERT INTO learning (poem_id, memory_level, next_review, today_remaining, status, mastered, last_action, last_review_date)
             VALUES (?, ?, ?, 0, 'reviewing', 0, 'know', ?)
             ON CONFLICT(poem_id) DO UPDATE SET
             memory_level = ?, next_review = ?, today_remaining = 0, status = 'reviewing', last_action = 'know', last_review_date = ?`,
            [poemId, level, nextReview, todayStr, level, nextReview, todayStr]
        );
        saveDB();
    }

    function handleFuzzy(poemId) {
        const rows = db.exec("SELECT memory_level, today_remaining, next_review FROM learning WHERE poem_id = ?", [poemId]);
        let level = 1, remaining = 0;
        let currentInterval = 2;

        if (rows.length > 0 && rows[0].values.length > 0) {
            level = rows[0].values[0][0];
            remaining = rows[0].values[0][1];
        }

        level = Math.max(1, level - 1);
        const newInterval = Math.max(1, Math.floor(getIntervalDays(level) / 2));
        const nextReview = addDays(todayStr, newInterval);

        let todayRemaining = remaining;
        if (todayRemaining <= 0) {
            todayRemaining = 1 + Math.floor(Math.random() * 2);
        }

        db.run(
            `INSERT INTO learning (poem_id, memory_level, next_review, today_remaining, status, mastered, last_action, last_review_date)
             VALUES (?, ?, ?, ?, 'reviewing', 0, 'fuzzy', ?)
             ON CONFLICT(poem_id) DO UPDATE SET
             memory_level = ?, next_review = ?, today_remaining = ?, status = 'reviewing', last_action = 'fuzzy', last_review_date = ?`,
            [poemId, level, nextReview, todayRemaining, todayStr, level, nextReview, todayRemaining, todayStr]
        );
        saveDB();
    }

    function handleForget(poemId) {
        const rows = db.exec("SELECT today_remaining FROM learning WHERE poem_id = ?", [poemId]);
        let remaining = 0;
        if (rows.length > 0 && rows[0].values.length > 0) {
            remaining = rows[0].values[0][0];
        }

        let todayRemaining = remaining;
        if (todayRemaining <= 0) {
            todayRemaining = 2 + Math.floor(Math.random() * 2);
        }

        const nextReview = addDays(todayStr, 1);

        db.run(
            `INSERT INTO learning (poem_id, memory_level, next_review, today_remaining, status, mastered, last_action, last_review_date)
             VALUES (?, 0, ?, ?, 'reviewing', 0, 'forget', ?)
             ON CONFLICT(poem_id) DO UPDATE SET
             memory_level = 0, next_review = ?, today_remaining = ?, status = 'reviewing', last_action = 'forget', last_review_date = ?`,
            [poemId, nextReview, todayRemaining, todayStr, nextReview, todayRemaining, todayStr]
        );
        saveDB();
    }

    function handleMastered(poemId) {
        db.run(
            `INSERT INTO learning (poem_id, memory_level, next_review, today_remaining, status, mastered, last_action, last_review_date)
             VALUES (?, 99, '', 0, 'mastered', 1, 'mastered', ?)
             ON CONFLICT(poem_id) DO UPDATE SET
             mastered = 1, status = 'mastered', today_remaining = 0, last_action = 'mastered', last_review_date = ?`,
            [poemId, todayStr, todayStr]
        );
        saveDB();
    }

    function buildTodayQueue() {
        todayQueue = [];

        const logRows = db.exec("SELECT new_poem_id FROM daily_log WHERE date = ?", [todayStr]);
        let todayNewPoemId = 0;
        if (logRows.length > 0 && logRows[0].values.length > 0) {
            todayNewPoemId = logRows[0].values[0][0];
        }

        if (todayNewPoemId === 0) {
            const unlearnedRows = db.exec(
                `SELECT p.id FROM poems p
                 LEFT JOIN learning l ON p.id = l.poem_id
                 WHERE l.poem_id IS NULL
                 ORDER BY p.id ASC LIMIT 1`
            );
            if (unlearnedRows.length > 0 && unlearnedRows[0].values.length > 0) {
                todayNewPoemId = unlearnedRows[0].values[0][0];
                db.run("INSERT OR REPLACE INTO daily_log (date, new_poem_id) VALUES (?, ?)", [todayStr, todayNewPoemId]);

                db.run(
                    `INSERT OR IGNORE INTO learning (poem_id, memory_level, next_review, today_remaining, status, mastered, last_action, last_review_date)
                     VALUES (?, 0, ?, 0, 'new', 0, '', ?)`,
                    [todayNewPoemId, todayStr, todayStr]
                );
                saveDB();
            }
        }

        if (todayNewPoemId > 0) {
            const newStatus = db.exec("SELECT last_action FROM learning WHERE poem_id = ?", [todayNewPoemId]);
            let lastAction = '';
            if (newStatus.length > 0 && newStatus[0].values.length > 0) {
                lastAction = newStatus[0].values[0][0] || '';
            }
            if (lastAction === '' || lastAction === 'fuzzy' || lastAction === 'forget') {
                const remaining = db.exec("SELECT today_remaining FROM learning WHERE poem_id = ?", [todayNewPoemId]);
                let rem = 0;
                if (remaining.length > 0 && remaining[0].values.length > 0) {
                    rem = remaining[0].values[0][0];
                }
                if (lastAction === '' || rem > 0) {
                    todayQueue.push({ poemId: todayNewPoemId, type: 'new' });
                }
            }
        }

        const reviewRows = db.exec(
            `SELECT poem_id, today_remaining, last_action FROM learning
             WHERE mastered = 0 AND next_review <= ? AND poem_id != ?
             ORDER BY next_review ASC`,
            [todayStr, todayNewPoemId]
        );

        if (reviewRows.length > 0) {
            reviewRows[0].values.forEach(row => {
                todayQueue.push({ poemId: row[0], type: 'review' });
            });
        }

        const fuzzyForgetRows = db.exec(
            `SELECT poem_id, today_remaining, last_action FROM learning
             WHERE mastered = 0 AND today_remaining > 0 AND last_review_date = ? AND poem_id != ?`,
            [todayStr, todayNewPoemId]
        );

        if (fuzzyForgetRows.length > 0) {
            fuzzyForgetRows[0].values.forEach(row => {
                const pid = row[0];
                const exists = todayQueue.some(q => q.poemId === pid);
                if (!exists) {
                    todayQueue.push({ poemId: pid, type: 'review' });
                }
            });
        }

        currentIndex = 0;
    }

    function getPoemData(poemId) {
        const rows = db.exec("SELECT * FROM poems WHERE id = ?", [poemId]);
        if (rows.length === 0 || rows[0].values.length === 0) return null;
        const r = rows[0].values[0];
        return {
            id: r[0],
            title: r[1],
            author: r[2],
            content: JSON.parse(r[3]),
            pinyin: JSON.parse(r[4]),
            keywords: JSON.parse(r[5]),
            analysis: r[6]
        };
    }

    function parsePinyinSyllables(pinyinLine) {
        return pinyinLine.replace(/[，。！？、；：""''（）\s]+/g, ' ').trim().split(/\s+/);
    }

    function buildRubyLine(textLine, pinyinLine) {
        const chars = [];
        for (const ch of textLine) {
            chars.push(ch);
        }
        const syllables = parsePinyinSyllables(pinyinLine);
        let html = '';
        let si = 0;
        for (const ch of chars) {
            if (/[\u4e00-\u9fff]/.test(ch)) {
                const py = si < syllables.length ? syllables[si] : '';
                html += `<ruby>${ch}<rt>${py}</rt></ruby>`;
                si++;
            } else {
                html += ch;
            }
        }
        return html;
    }

    function renderPoem(queueItem) {
        const poem = getPoemData(queueItem.poemId);
        if (!poem) return;

        const badge = $('#poem-badge');
        badge.textContent = queueItem.type === 'new' ? '新学' : '复习';
        badge.className = 'poem-badge' + (queueItem.type === 'review' ? ' review' : '');

        $('#poem-title').textContent = poem.title;
        $('#poem-author').textContent = poem.author;

        let contentHtml = '';
        poem.content.forEach((line, i) => {
            const pinyinLine = poem.pinyin[i] || '';
            let rubyLine = buildRubyLine(line, pinyinLine);

            poem.keywords.forEach((kw, ki) => {
                const numChar = '①②③④⑤⑥⑦⑧⑨⑩'.charAt(ki);
                let kwRubyPattern = '';
                for (const ch of kw.word) {
                    kwRubyPattern += `<ruby>${ch}<rt>[^<]*</rt></ruby>`;
                }
                const regex = new RegExp(kwRubyPattern);
                const match = rubyLine.match(regex);
                if (match) {
                    rubyLine = rubyLine.replace(
                        match[0],
                        `<span class="keyword">${match[0]}<sup class="keyword-num">${numChar}</sup></span>`
                    );
                }
            });

            contentHtml += `<span class="line">${rubyLine}</span>`;
        });
        $('#poem-content').innerHTML = contentHtml;

        let notesHtml = '';
        poem.keywords.forEach((kw, i) => {
            const numChar = '①②③④⑤⑥⑦⑧⑨⑩'.charAt(i);
            notesHtml += `<div class="note-item"><span class="note-key">${numChar} ${kw.word}：</span>${kw.note}</div>`;
        });
        $('#poem-notes').innerHTML = notesHtml;

        $('#poem-analysis').innerHTML = `<p>${poem.analysis}</p>`;

        const card = $('#poem-card');
        card.style.animation = 'none';
        card.offsetHeight;
        card.style.animation = 'cardSlideIn 0.5s ease-out';

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function processAction(action) {
        if (currentIndex >= todayQueue.length) return;

        const item = todayQueue[currentIndex];
        const poemId = item.poemId;

        switch (action) {
            case 'know':
                handleKnow(poemId);
                showToast('✅ 认识！继续加油');
                break;
            case 'fuzzy':
                handleFuzzy(poemId);
                showToast('🤔 模糊，稍后再复习');
                break;
            case 'forget':
                handleForget(poemId);
                showToast('😵 忘记了，多复习几次');
                break;
            case 'mastered':
                handleMastered(poemId);
                showToast('🏆 已标记为熟知');
                break;
        }

        if (action === 'fuzzy' || action === 'forget') {
            const remaining = db.exec("SELECT today_remaining FROM learning WHERE poem_id = ?", [poemId]);
            let rem = 0;
            if (remaining.length > 0 && remaining[0].values.length > 0) {
                rem = remaining[0].values[0][0];
            }
            if (rem > 0) {
                db.run("UPDATE learning SET today_remaining = ? WHERE poem_id = ?", [rem - 1, poemId]);
                saveDB();
                if (rem - 1 > 0) {
                    todayQueue.push({ poemId: poemId, type: 'review' });
                }
            }
        }

        currentIndex++;
        updateProgress();

        if (currentIndex < todayQueue.length) {
            renderPoem(todayQueue[currentIndex]);
        } else {
            navigateTo('page-home');
            updateHomePage();
        }
    }

    function updateProgress() {
        const total = todayQueue.length;
        const done = Math.min(currentIndex, total);
        const pct = total > 0 ? (done / total * 100) : 0;
        const fill = $('#daily-progress .progress-fill');
        if (fill) fill.style.width = pct + '%';
        const text = $('#progress-text');
        if (text) text.textContent = `今日进度 ${done}/${total}`;
    }

    function updateHomePage() {
        $('.date-display').textContent = getChineseDate();

        buildTodayQueue();
        updateProgress();

        const totalPoems = db.exec("SELECT COUNT(*) FROM poems");
        const total = totalPoems[0] ? totalPoems[0].values[0][0] : 0;

        const masteredCount = db.exec("SELECT COUNT(*) FROM learning WHERE mastered = 1");
        const mastered = masteredCount[0] ? masteredCount[0].values[0][0] : 0;

        const reviewCount = todayQueue.filter(q => q.type === 'review').length;
        const newCount = todayQueue.filter(q => q.type === 'new').length;

        $('#stat-new').textContent = newCount;
        $('#stat-review').textContent = reviewCount;
        $('#stat-mastered').textContent = mastered;
        $('#stat-total').textContent = total;

        const btnStart = $('#btn-start-learn');
        const homeDone = $('#home-done');

        if (todayQueue.length === 0 || currentIndex >= todayQueue.length) {
            btnStart.classList.add('hidden');
            homeDone.classList.remove('hidden');
        } else {
            btnStart.classList.remove('hidden');
            homeDone.classList.add('hidden');
        }
    }

    function updateStatsPage() {
        const totalPoems = db.exec("SELECT COUNT(*) FROM poems")[0].values[0][0];
        const learnedCount = db.exec("SELECT COUNT(*) FROM learning WHERE status != 'new' OR last_action != ''")[0]?.values[0][0] || 0;
        const masteredCount = db.exec("SELECT COUNT(*) FROM learning WHERE mastered = 1")[0]?.values[0][0] || 0;
        const reviewingCount = db.exec("SELECT COUNT(*) FROM learning WHERE mastered = 0 AND status = 'reviewing'")[0]?.values[0][0] || 0;
        const remaining = totalPoems - learnedCount;

        $('#stats-learned').textContent = learnedCount;
        $('#stats-reviewing').textContent = reviewingCount;
        $('#stats-mastered').textContent = masteredCount;
        $('#stats-remaining').textContent = Math.max(0, remaining);

        const levelData = [];
        const colors = ['#E8C9A0', '#C9A96E', '#A0522D', '#8B4513', '#6B3410', '#4E2A0A', '#7E57C2', '#4CAF50'];
        const labels = ['等级0', '等级1', '等级2', '等级3', '等级4', '等级5', '等级6', '等级7+'];

        for (let i = 0; i <= 7; i++) {
            let count;
            if (i < 7) {
                const r = db.exec("SELECT COUNT(*) FROM learning WHERE memory_level = ? AND mastered = 0", [i]);
                count = r[0] ? r[0].values[0][0] : 0;
            } else {
                const r = db.exec("SELECT COUNT(*) FROM learning WHERE memory_level >= 7 AND mastered = 0");
                count = r[0] ? r[0].values[0][0] : 0;
            }
            levelData.push(count);
        }

        const maxCount = Math.max(...levelData, 1);
        let chartHtml = '';
        labels.forEach((label, i) => {
            const pct = (levelData[i] / maxCount * 100).toFixed(1);
            chartHtml += `
                <div class="chart-row">
                    <span class="chart-label">${label}</span>
                    <div class="chart-bar-bg">
                        <div class="chart-bar-fill" style="width:${pct}%;background:${colors[i]}"></div>
                    </div>
                    <span class="chart-count">${levelData[i]}</span>
                </div>`;
        });
        $('#chart-bars').innerHTML = chartHtml;

        updatePoemList('all');
    }

    function updatePoemList(filter) {
        let rows;
        if (filter === 'mastered') {
            rows = db.exec(
                `SELECT p.id, p.title, p.author, COALESCE(l.mastered, 0) as m, COALESCE(l.status, 'none') as s
                 FROM poems p LEFT JOIN learning l ON p.id = l.poem_id
                 WHERE l.mastered = 1 ORDER BY p.id`
            );
        } else if (filter === 'learning') {
            rows = db.exec(
                `SELECT p.id, p.title, p.author, COALESCE(l.mastered, 0) as m, COALESCE(l.status, 'none') as s
                 FROM poems p LEFT JOIN learning l ON p.id = l.poem_id
                 WHERE l.mastered = 0 AND l.poem_id IS NOT NULL ORDER BY p.id`
            );
        } else if (filter === 'unlearned') {
            rows = db.exec(
                `SELECT p.id, p.title, p.author, 0 as m, 'none' as s
                 FROM poems p LEFT JOIN learning l ON p.id = l.poem_id
                 WHERE l.poem_id IS NULL ORDER BY p.id`
            );
        } else {
            rows = db.exec(
                `SELECT p.id, p.title, p.author, COALESCE(l.mastered, 0) as m, COALESCE(l.status, 'none') as s
                 FROM poems p LEFT JOIN learning l ON p.id = l.poem_id ORDER BY p.id`
            );
        }

        let html = '';
        if (rows.length > 0 && rows[0].values.length > 0) {
            rows[0].values.forEach(r => {
                const mastered = r[3];
                const status = r[4];
                let statusText, statusClass;
                if (mastered === 1) {
                    statusText = '已熟知';
                    statusClass = 'status-mastered';
                } else if (status === 'none' || status === 'new') {
                    statusText = '未学习';
                    statusClass = 'status-unlearned';
                } else {
                    statusText = '学习中';
                    statusClass = 'status-learning';
                }
                html += `
                    <div class="poem-list-item">
                        <div class="poem-list-info">
                            <div class="poem-list-title">${r[1]}</div>
                            <div class="poem-list-author">${r[2]}</div>
                        </div>
                        <span class="poem-list-status ${statusClass}">${statusText}</span>
                    </div>`;
            });
        } else {
            html = '<div style="text-align:center;padding:20px;color:#8D6E63;font-size:0.9rem;">暂无数据</div>';
        }
        $('#poem-list').innerHTML = html;
    }

    function exportDB() {
        const data = db.export();
        const blob = new Blob([data], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `poetry_backup_${todayStr}.db`;
        a.click();
        URL.revokeObjectURL(url);
        showToast('📤 数据库已导出');
    }

    async function importDB(file) {
        const confirmed = await showModal('导入数据', '导入将覆盖当前所有数据，确定继续吗？');
        if (!confirmed) return;

        const reader = new FileReader();
        reader.onload = async function (e) {
            try {
                const SQL = await initSqlJs({
                    locateFile: f => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/${f}`
                });
                const buf = new Uint8Array(e.target.result);
                const newDb = new SQL.Database(buf);

                newDb.exec("SELECT COUNT(*) FROM poems");
                newDb.exec("SELECT COUNT(*) FROM learning");

                db.close();
                db = newDb;
                saveDB();
                showToast('📥 数据导入成功');
                updateHomePage();
            } catch (err) {
                showToast('❌ 导入失败：文件格式不正确');
            }
        };
        reader.readAsArrayBuffer(file);
    }

    async function resetData() {
        const confirmed = await showModal('重置数据', '将清除所有学习记录，诗词库保留。确定继续吗？');
        if (!confirmed) return;

        db.run("DELETE FROM learning");
        db.run("DELETE FROM daily_log");
        saveDB();
        showToast('🗑️ 学习记录已重置');
        updateHomePage();
    }

    function bindEvents() {
        $('#btn-start-learn').addEventListener('click', () => {
            if (todayQueue.length === 0) {
                showToast('今日没有需要学习的诗词');
                return;
            }
            currentIndex = 0;
            navigateTo('page-learn');
            renderPoem(todayQueue[0]);
        });

        $$('.btn-action, .btn-mastered').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.action;
                if (action) processAction(action);
            });
        });

        $('#btn-stats').addEventListener('click', () => {
            updateStatsPage();
            navigateTo('page-stats');
        });

        $('#btn-data').addEventListener('click', () => {
            navigateTo('page-data');
        });

        $('#btn-back-stats').addEventListener('click', () => {
            navigateTo('page-home');
            updateHomePage();
        });

        $('#btn-back-data').addEventListener('click', () => {
            navigateTo('page-home');
            updateHomePage();
        });

        $('#btn-export').addEventListener('click', exportDB);

        $('#btn-import').addEventListener('click', () => {
            $('#file-import').click();
        });

        $('#file-import').addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                importDB(e.target.files[0]);
                e.target.value = '';
            }
        });

        $('#btn-reset').addEventListener('click', resetData);

        $$('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                $$('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                updatePoemList(btn.dataset.filter);
            });
        });
    }

    async function init() {
        const loading = document.createElement('div');
        loading.className = 'loading-screen';
        loading.innerHTML = '<div class="loading-icon">📜</div><div class="loading-text">正在加载诗词库...</div>';
        document.body.appendChild(loading);

        try {
            todayStr = getToday();
            await initDB();
            bindEvents();
            updateHomePage();

            setTimeout(() => {
                loading.classList.add('fade-out');
                setTimeout(() => loading.remove(), 500);
            }, 600);
        } catch (err) {
            loading.innerHTML = `<div class="loading-icon">❌</div><div class="loading-text">加载失败：${err.message}</div>`;
            console.error(err);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
