(function () {
    'use strict';

    let db = null;
    let todayQueue = [];
    let currentIndex = 0;
    let todayStr = '';
    let viewerScale = 1;
    let viewerTranslateX = 0;
    let viewerTranslateY = 0;
    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let dragLastX = 0;
    let dragLastY = 0;
    let browseMode = false;
    let browseFromPage = '';

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

    // 覆盖确认模态框（带取消/确认）
    function showOverwriteModal(existingPoem, callback) {
        $('#modal-title').textContent = '⚠️ 诗词 ID 已存在';
        $('#modal-msg').innerHTML = `id <strong>${existingPoem.id}</strong> 已存在：<br><em>${existingPoem.title}</em><br>确认覆盖吗？`;
        $('#modal-overlay').classList.remove('hidden');

        const cleanup = () => {
            $('#modal-confirm').removeEventListener('click', onConfirm);
            $('#modal-cancel').removeEventListener('click', onCancel);
        };
        const onConfirm = () => {
            cleanup();
            $('#modal-overlay').classList.add('hidden');
            callback(true);
        };
        const onCancel = () => {
            cleanup();
            $('#modal-overlay').classList.add('hidden');
            callback(false);
        };
        $('#modal-confirm').addEventListener('click', onConfirm);
        $('#modal-cancel').addEventListener('click', onCancel);
    }

    // 批量覆盖确认（多首有冲突时）
    function showOverwriteBatchModal(conflictCount, newCount, conflictList, callback) {
        $('#modal-title').textContent = '⚠️ 检测到 ID 冲突';
        $('#modal-msg').innerHTML = `
            共 <strong>${conflictCount}</strong> 首存在 ID 冲突，将被覆盖：<br>
            <pre class="conflict-pre">${conflictList}</pre>
            新增 <strong>${newCount}</strong> 首，确认全部保存？
        `;
        $('#modal-overlay').classList.remove('hidden');
        const cleanup = () => {
            $('#modal-confirm').removeEventListener('click', onConfirm);
            $('#modal-cancel').removeEventListener('click', onCancel);
        };
        const onConfirm = () => {
            cleanup();
            $('#modal-overlay').classList.add('hidden');
            callback(true);
        };
        const onCancel = () => {
            cleanup();
            $('#modal-overlay').classList.add('hidden');
            callback(false);
        };
        $('#modal-confirm').addEventListener('click', onConfirm);
        $('#modal-cancel').addEventListener('click', onCancel);
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

    // ── Admin 页面 ──────────────────────────────────────────────
    function initAdminPage() {
        refreshAdminPoemList();

        // 点击"新增诗词"→ 清空表单
        $('#btn-admin-add').addEventListener('click', () => {
            $('#admin-form-wrap').classList.remove('hidden');
            $('#admin-form-title').textContent = '新增诗词';
            $('#admin-poems-json').value = '[\n  {\n    "id": 1,\n    "title": "",\n    "author": "",\n    "content": [""],\n    "pinyin": [""],\n    "keywords": [],\n    "analysis": ""\n  }\n]';
            $('#admin-poems-json').scrollIntoView({ behavior: 'smooth', block: 'start' });
        });

        // 点击"取消"→ 隐藏表单
        $('#btn-admin-cancel').addEventListener('click', () => {
            $('#admin-form-wrap').classList.add('hidden');
        });

        // 提交表单
        $('#admin-form').addEventListener('submit', (e) => {
            e.preventDefault();
            submitAdminForm();
        });
    }

    function refreshAdminPoemList() {
        const rows = db.exec('SELECT * FROM poems ORDER BY id ASC');
        let html = '';
        if (rows.length === 0 || rows[0].values.length === 0) {
            html = '<div style="text-align:center;padding:20px;color:#8D6E63;font-size:0.9rem;">暂无诗词数据</div>';
        } else {
            rows[0].values.forEach(r => {
                const poem = {
                    id: r[0],
                    title: r[1],
                    author: r[2],
                    content: JSON.parse(r[3]),
                    pinyin: JSON.parse(r[4]),
                    keywords: JSON.parse(r[5]),
                    analysis: r[6]
                };
                const poemJson = JSON.stringify(poem).replace(/"/g, '&quot;');
                html += `
                    <div class="admin-poem-item" data-id="${poem.id}" data-poem='${poemJson}'>
                        <div class="admin-poem-info">
                            <span class="admin-poem-id">${poem.id}</span>
                            <span class="admin-poem-title">${poem.title}</span>
                            <span class="admin-poem-author">${poem.author}</span>
                        </div>
                        <div class="admin-poem-actions">
                            <button class="admin-poem-edit" type="button">✏️</button>
                            <button class="admin-poem-del" type="button">🗑️</button>
                        </div>
                    </div>`;
            });
        }
        $('#admin-poem-list').innerHTML = html;

        // 行内事件
        $$('.admin-poem-item').forEach(item => {
            // 点整行 → 详情
            item.querySelector('.admin-poem-info').addEventListener('click', () => {
                const poem = JSON.parse(item.dataset.poem.replace(/&quot;/g, '"'));
                showPoemDetailModal(poem);
            });
            // 编辑/删除按钮 → 阻止冒泡到详情
            item.querySelector('.admin-poem-edit').addEventListener('click', e => {
                e.stopPropagation();
                openAdminEdit(parseInt(item.dataset.id));
            });
            item.querySelector('.admin-poem-del').addEventListener('click', e => {
                e.stopPropagation();
                deletePoemById(parseInt(item.dataset.id));
            });
        });
    }

    // 诗词详情弹窗（复用 modal-overlay + #modal）
    function showPoemDetailModal(poem) {
        const contentHtml = poem.content.map((line, i) =>
            `<div class="detail-line">
                <span class="detail-text">${line}</span>
                <span class="detail-pinyin">${poem.pinyin[i] || ''}</span>
            </div>`
        ).join('');
        const keywordsHtml = poem.keywords.map(k =>
            `<span class="detail-kw"><strong>${k.word}</strong>${k.note ? '：' + k.note : ''}</span>`
        ).join('');

        // analysis 兼容：旧数据是字符串，新格式是对象 { lineNotes, overall }
        let analysisHtml = '';
        if (typeof poem.analysis === 'string') {
            // 旧格式：直接显示
            analysisHtml = `<div class="detail-analysis"><div class="detail-section-title">通俗解析</div>${poem.analysis}</div>`;
        } else {
            const lineNotesHtml = Array.isArray(poem.analysis.lineNotes) ?
                poem.analysis.lineNotes.map(ln =>
                    `<div class="detail-line-note">
                        <span class="detail-line-note-text">${ln.line}</span>
                        <span class="detail-line-note-note">${ln.note}</span>
                    </div>`
                ).join('') :
                '';
            const overallHtml = poem.analysis.overall ?
                `<div class="detail-overall">${poem.analysis.overall}</div>` :
                '';
            analysisHtml = `
                <div class="detail-analysis">
                    ${poem.analysis.lineNotes ? `<div class="detail-section-title">逐句释义</div>${lineNotesHtml}` : ''}
                    ${poem.analysis.overall ? `<div class="detail-section-title">整首释义</div>${overallHtml}` : ''}
                </div>`;
        }

        $('#modal-title').textContent = poem.title;
        $('#modal-msg').innerHTML = `
            <div class="detail-author">${poem.author}</div>
            <div class="detail-content">${contentHtml}</div>
            <div class="detail-keywords">${keywordsHtml}</div>
            ${analysisHtml}
        `;
        $('#modal-actions').classList.add('hidden');
        $('#modal-overlay').classList.remove('hidden');
        $('#modal-confirm').style.display = 'none';
        $('#modal-cancel').textContent = '关闭';
        $('#modal-cancel').style.display = '';
        // 关闭时恢复原状
        $('#modal-cancel').onclick = () => {
            $('#modal-overlay').classList.add('hidden');
            $('#modal-confirm').style.display = '';
            $('#modal-cancel').textContent = '取消';
            $('#modal-actions').classList.remove('hidden');
        };
    }

    function openAdminEdit(id) {
        // 编辑时加载全部诗词到 textarea，可整体修改
        const rows = db.exec('SELECT id, title, author, content, pinyin, keywords, analysis FROM poems ORDER BY id ASC');
        if (rows.length === 0 || rows[0].values.length === 0) {
            showToast('❌ 无诗词数据');
            return;
        }
        const all = rows[0].values.map(r => ({
            id: r[0],
            title: r[1],
            author: r[2],
            content: JSON.parse(r[3]),
            pinyin: JSON.parse(r[4]),
            keywords: JSON.parse(r[5]),
            analysis: r[6]
        }));
        $('#admin-form-wrap').classList.remove('hidden');
        $('#admin-form-title').textContent = '编辑诗词（全部）';
        $('#admin-poems-json').value = JSON.stringify(all, null, 2);
        $('#admin-poems-json').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function submitAdminForm() {
        const jsonText = $('#admin-poems-json').value.trim();
        if (!jsonText) { showToast('❌ 请填写 JSON 数据'); return; }

        let poems;
        try {
            const parsed = JSON.parse(jsonText);
            // 支持直接一个对象或包在数组里
            poems = Array.isArray(parsed) ? parsed : [parsed];
        } catch (e) {
            showToast('❌ JSON 格式错误，请检查');
            return;
        }

        // 先把所有 id 找出来，过滤掉无效项
        const validPoems = poems.filter(p => {
            if (!p.id || !p.title || !p.author) return false;
            if (!Array.isArray(p.content)) return false;
            return true;
        });

        if (validPoems.length === 0) {
            showToast('❌ 未找到有效诗词（需 id、title、author、content）');
            return;
        }

        // 检查哪些 id 已存在
        const idsToSave = validPoems.map(p => p.id);
        const placeholders = idsToSave.map(() => '?').join(',');
        const existRows = db.exec(`SELECT id, title FROM poems WHERE id IN (${placeholders})`, idsToSave);
        const existMap = {};
        if (existRows.length > 0) {
            existRows[0].values.forEach(r => { existMap[r[0]] = r[1]; });
        }

        const conflictPoems = validPoems.filter(p => existMap[p.id]);
        const newPoems = validPoems.filter(p => !existMap[p.id]);

        if (conflictPoems.length === 0) {
            // 无冲突，直接全部保存
            batchSave(validPoems);
        } else {
            // 有冲突，弹确认框
            const conflictList = conflictPoems.map(p =>
                `  id=${p.id}  "${existMap[p.id]}" → "${p.title}"`
            ).join('\n');
            showOverwriteBatchModal(conflictPoems.length, newPoems.length, conflictList, (confirmed) => {
                if (confirmed) batchSave(validPoems);
            });
        }

        function batchSave(list) {
            list.forEach(p => {
                db.run(
                    'INSERT OR REPLACE INTO poems (id, title, author, content, pinyin, keywords, analysis) VALUES (?, ?, ?, ?, ?, ?, ?)',
                    [
                        p.id,
                        p.title,
                        p.author,
                        JSON.stringify(p.content || []),
                        JSON.stringify(p.pinyin || []),
                        JSON.stringify(p.keywords || []),
                        p.analysis || ''
                    ]
                );
            });
            saveDB();
            showToast(`✅ 已保存 ${list.length} 首诗词`);
            $('#admin-form-wrap').classList.add('hidden');
            refreshAdminPoemList();
        }
    }

    async function deletePoemById(id) {
        const confirmed = await showModal('删除诗词', `确定删除 id=${id} 的诗词吗？此操作不可恢复。`);
        if (!confirmed) return;
        db.run('DELETE FROM poems WHERE id = ?', [id]);
        db.run('DELETE FROM learning WHERE poem_id = ?', [id]);
        saveDB();
        showToast('🗑️ 已删除');
        refreshAdminPoemList();
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



        // 滚动到顶部，0.3秒动画
        const startPosition = window.pageYOffset;
        const startTime = performance.now();
        const duration = 300; // 0.3秒

        function animateScroll(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3); // 缓动函数

            window.scrollTo(0, startPosition * (1 - easeProgress));

            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            }
        }

        requestAnimationFrame(animateScroll);
    }

    async function initDB() {
        const SQL = await initSqlJs({
            locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/${file}`
        });

        const saved = localStorage.getItem('poetry_db');
        if (saved) {
            const buf = Uint8Array.from(atob(saved), c => c.charCodeAt(0));
            db = new SQL.Database(buf);
            // 迁移旧数据：analysis 从字符串升级为对象 { lineNotes: [], overall: "..." }
            const rows = db.exec('SELECT id, analysis FROM poems');
            if (rows.length > 0) {
                rows[0].values.forEach(([id, raw]) => {
                    try {
                        const v = JSON.parse(raw);
                        if (typeof v === 'string') {
                            db.run('UPDATE poems SET analysis = ? WHERE id = ?',
                                [JSON.stringify({ lineNotes: [], overall: v }), id]);
                        }
                    } catch (_) { }
                });
                saveDB();
            }
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
            // 首次初始化：插入所有诗词
            POEMS_DATA.forEach(p => {
                db.run(
                    "INSERT OR IGNORE INTO poems VALUES (?, ?, ?, ?, ?, ?, ?)", [p.id, p.title, p.author, JSON.stringify(p.content), JSON.stringify(p.pinyin), JSON.stringify(p.keywords), p.analysis]
                );
            });
        } else {
            // 非首次：同步 poems-data.js 的最新内容（覆盖已有诗词，新增新诗词）
            POEMS_DATA.forEach(p => {
                db.run(
                    "INSERT OR REPLACE INTO poems VALUES (?, ?, ?, ?, ?, ?, ?)", [p.id, p.title, p.author, JSON.stringify(p.content), JSON.stringify(p.pinyin), JSON.stringify(p.keywords), p.analysis]
                );
            });
            // 删除 POEMS_DATA 中已不存在的诗词（被删除的旧数据）
            const dataIds = POEMS_DATA.map(p => p.id);
            if (dataIds.length > 0) {
                const existingRows = db.exec("SELECT id FROM poems");
                if (existingRows.length > 0) {
                    existingRows[0].values.forEach(([id]) => {
                        if (!dataIds.includes(id)) {
                            db.run("DELETE FROM poems WHERE id = ?", [id]);
                            db.run("DELETE FROM learning WHERE poem_id = ?", [id]);
                        }
                    });
                }
            }
        }

        saveDB();
    }

    function saveDB() {
        const data = db.export();
        const b64 = btoa(String.fromCharCode(...data));
        localStorage.setItem('poetry_db', b64);
    }

    // 艾宾浩斯遗忘曲线间隔（天），适合小学生一天背一首
    // 前期密集复习，后期逐渐拉长
    function getIntervalDays(level) {
        const intervals = [1, 2, 4, 7, 15, 30, 60, 120];
        if (level <= 0) return 1;
        if (level <= intervals.length) return intervals[level - 1];
        return 180 + Math.floor(Math.random() * 60);
    }

    function handleKnow(poemId) {
        const rows = db.exec("SELECT memory_level, status, last_review_date FROM learning WHERE poem_id = ?", [poemId]);
        let level = 0;
        let lastReviewDate = '';
        if (rows.length > 0 && rows[0].values.length > 0) {
            level = rows[0].values[0][0];
            lastReviewDate = rows[0].values[0][2] || '';
        }

        level += 1;
        const interval = getIntervalDays(level);
        const nextReview = addDays(todayStr, interval);

        db.run(
            `INSERT INTO learning (poem_id, memory_level, next_review, today_remaining, status, mastered, last_action, last_review_date)
             VALUES (?, ?, ?, 0, 'reviewing', 0, 'know', ?)
             ON CONFLICT(poem_id) DO UPDATE SET
             memory_level = ?, next_review = ?, today_remaining = 0, status = 'reviewing', last_action = 'know', last_review_date = ?`, [poemId, level, nextReview, todayStr, level, nextReview, todayStr]
        );
        saveDB();
    }

    function handleFuzzy(poemId) {
        const rows = db.exec("SELECT memory_level, last_review_date FROM learning WHERE poem_id = ?", [poemId]);
        let level = 1;

        if (rows.length > 0 && rows[0].values.length > 0) {
            level = rows[0].values[0][0];
        }

        // 模糊：不降级，保持当前等级，但缩短间隔（取当前等级间隔的一半）
        // 这样小学生不会因为"有点模糊"就严重倒退，复习压力不会太大
        const currentInterval = getIntervalDays(level);
        const newInterval = Math.max(1, Math.floor(currentInterval * 0.6));
        const nextReview = addDays(todayStr, newInterval);

        db.run(
            `INSERT INTO learning (poem_id, memory_level, next_review, today_remaining, status, mastered, last_action, last_review_date)
             VALUES (?, ?, ?, 0, 'reviewing', 0, 'fuzzy', ?)
             ON CONFLICT(poem_id) DO UPDATE SET
             memory_level = ?, next_review = ?, today_remaining = 0, status = 'reviewing', last_action = 'fuzzy', last_review_date = ?`, [poemId, level, nextReview, todayStr, level, nextReview, todayStr]
        );
        saveDB();
    }

    function handleForget(poemId) {
        const rows = db.exec("SELECT memory_level FROM learning WHERE poem_id = ?", [poemId]);
        let level = 0;
        if (rows.length > 0 && rows[0].values.length > 0) {
            level = rows[0].values[0][0];
        }

        // 忘记：降到前一个等级（而非直接归零），间隔1天后再复习
        // 小学生完全忘记比较常见，不用太严厉，降到上一级即可
        const newLevel = Math.max(0, level - 2);
        const nextReview = addDays(todayStr, 1);

        db.run(
            `INSERT INTO learning (poem_id, memory_level, next_review, today_remaining, status, mastered, last_action, last_review_date)
             VALUES (?, ?, ?, 0, 'reviewing', 0, 'forget', ?)
             ON CONFLICT(poem_id) DO UPDATE SET
             memory_level = ?, next_review = ?, today_remaining = 0, status = 'reviewing', last_action = 'forget', last_review_date = ?`, [poemId, newLevel, nextReview, todayStr, newLevel, nextReview, todayStr]
        );
        saveDB();
    }

    function handleMastered(poemId) {
        db.run(
            `INSERT INTO learning (poem_id, memory_level, next_review, today_remaining, status, mastered, last_action, last_review_date)
             VALUES (?, 99, '', 0, 'mastered', 1, 'mastered', ?)
             ON CONFLICT(poem_id) DO UPDATE SET
             mastered = 1, status = 'mastered', today_remaining = 0, last_action = 'mastered', last_review_date = ?`, [poemId, todayStr, todayStr]
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
                     VALUES (?, 0, ?, 0, 'new', 0, '', ?)`, [todayNewPoemId, todayStr, todayStr]
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
            if (lastAction === '') {
                todayQueue.push({ poemId: todayNewPoemId, type: 'new' });
            }
        }

        // 复习队列：今天需要复习的诗
        // 条件：未掌握 + 到了复习时间 + 今天的"认识/模糊"不重复出现 + 今天的"忘记"可以再复习
        const reviewRows = db.exec(
            `SELECT poem_id FROM learning
             WHERE mastered = 0 AND next_review <= ? AND poem_id != ?
             AND (last_review_date != ? OR last_action = 'forget')
             ORDER BY next_review ASC`, [todayStr, todayNewPoemId, todayStr]
        );

        if (reviewRows.length > 0) {
            reviewRows[0].values.forEach(row => {
                todayQueue.push({ poemId: row[0], type: 'review' });
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

        var analysisHtml = '';
        var analysisParts = poem.analysis.split('\n').filter(function (s) { return s.trim(); });
        analysisParts.forEach(function (part) {
            var match = part.match(/^([\u4e00-\u9fa5]+(?:释义|赏析|解读|翻译|大意)[:：])([\s\S]*)$/);
            if (match) {
                analysisHtml += '<div class="analysis-section"><span class="analysis-label">' + match[1] + '</span>' + match[2] + '</div>';
            } else {
                analysisHtml += '<div class="analysis-section">' + part + '</div>';
            }
        });
        $('#poem-analysis').innerHTML = analysisHtml;

        var imgWrap = $('#poem-image-wrap');
        var poemImg = $('#poem-image');
        var poemDetail = $('#poem-detail');
        var btnShowPoem = $('#btn-show-poem');

        imgWrap.classList.add('no-image');
        poemImg.removeAttribute('src');

        poemDetail.classList.remove('collapsed', 'expanding');
        btnShowPoem.classList.add('hidden');

        var imgExts = ['png', 'jpg', 'jpeg'];
        var tryLoad = function (extIdx) {
            if (extIdx >= imgExts.length) {
                imgWrap.classList.add('no-image');
                poemImg.removeAttribute('src');
                return;
            }
            var imgSrc = 'img/' + poem.id + '.' + imgExts[extIdx];
            var testImg = new Image();
            testImg.onload = function () {
                poemImg.src = imgSrc;
                imgWrap.classList.remove('no-image');
            };
            testImg.onerror = function () {
                tryLoad(extIdx + 1);
            };
            testImg.src = imgSrc;
        };
        tryLoad(0);

        if (queueItem.type === 'review') {
            poemDetail.classList.add('collapsed');
            btnShowPoem.classList.remove('hidden');
        }

        var card = $('#poem-card');
        card.style.animation = 'none';
        card.offsetHeight;
        card.style.animation = 'cardSlideIn 0.5s ease-out';

        // 滚动到顶部，0.3秒动画
        const startPosition = window.pageYOffset;
        const startTime = performance.now();
        const duration = 300; // 0.3秒

        function animateScroll(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3); // 缓动函数

            window.scrollTo(0, startPosition * (1 - easeProgress));

            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            }
        }

        requestAnimationFrame(animateScroll);
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

        if (browseMode) {
            browseMode = false;
            var backPage = browseFromPage || 'page-stats';
            browseFromPage = '';
            navigateTo(backPage);
            if (backPage === 'page-stats') {
                updateStatsPage();
            } else {
                updateHomePage();
            }
            return;
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
        const btnContinue = $('#btn-continue-learn');
        const btnAdvanceReview = $('#btn-advance-review');

        if (todayQueue.length === 0 || currentIndex >= todayQueue.length) {
            btnStart.classList.add('hidden');
            homeDone.classList.remove('hidden');

            const tomorrowStr = addDays(todayStr, 1);
            const tomorrowReviewRows = db.exec(
                `SELECT COUNT(*) FROM learning
                 WHERE mastered = 0 AND next_review = ?`, [tomorrowStr]
            );
            const tomorrowCount = (tomorrowReviewRows[0] && tomorrowReviewRows[0].values[0]) ? tomorrowReviewRows[0].values[0][0] : 0;
            if (tomorrowCount > 0) {
                btnAdvanceReview.classList.remove('hidden');
            } else {
                btnAdvanceReview.classList.add('hidden');
            }

            const unlearnedRows = db.exec(
                `SELECT p.id FROM poems p
                 LEFT JOIN learning l ON p.id = l.poem_id
                 WHERE l.poem_id IS NULL`
            );
            if (unlearnedRows.length > 0 && unlearnedRows[0].values.length > 0) {
                btnContinue.classList.remove('hidden');
            } else {
                btnContinue.classList.add('hidden');
            }
        } else {
            btnStart.classList.remove('hidden');
            homeDone.classList.add('hidden');
            btnContinue.classList.add('hidden');
            btnAdvanceReview.classList.add('hidden');
        }
    }

    function updateStatsPage() {
        const totalPoems = db.exec("SELECT COUNT(*) FROM poems")[0].values[0][0];
        const learnedResult = db.exec("SELECT COUNT(*) FROM learning WHERE status != 'new' OR last_action != ''");
        const learnedCount = (learnedResult[0] && learnedResult[0].values && learnedResult[0].values[0]) ? learnedResult[0].values[0][0] : 0;
        const masteredResult = db.exec("SELECT COUNT(*) FROM learning WHERE mastered = 1");
        const masteredCount = (masteredResult[0] && masteredResult[0].values && masteredResult[0].values[0]) ? masteredResult[0].values[0][0] : 0;
        const reviewingResult = db.exec("SELECT COUNT(*) FROM learning WHERE mastered = 0 AND status = 'reviewing'");
        const reviewingCount = (reviewingResult[0] && reviewingResult[0].values && reviewingResult[0].values[0]) ? reviewingResult[0].values[0][0] : 0;
        const remaining = totalPoems - learnedCount;

        $('#stats-learned').textContent = learnedCount;
        $('#stats-reviewing').textContent = reviewingCount;
        $('#stats-mastered').textContent = masteredCount;
        $('#stats-remaining').textContent = Math.max(0, remaining);

        const levelData = [];
        const colors = ['#EF5350', '#FF9800', '#FFC107', '#8BC34A', '#4CAF50', '#009688', '#2196F3', '#9C27B0'];
        const labels = ['🌱 刚学', '📋 入门', '📖 熟悉', '✅ 掌握', '💪 牢固', '🎯 深知', '⭐ 精通', '🏆 通达'];
        const intervalDescs = ['1天后', '2天后', '4天后', '7天后', '15天后', '30天后', '60天后', '120天+'];

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
                    <span class="chart-label" title="复习间隔：${intervalDescs[i]}">${label}</span>
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
                    <div class="poem-list-item" data-poem-id="${r[0]}">
                        <span class="poem-list-id">${r[0]}</span>
                        <div class="poem-list-info">
                            <div class="poem-list-title">${r[1]}</div>
                            <div class="poem-list-author">${r[2]}</div>
                        </div>
                        <div class="poem-list-right">
                            <span class="poem-list-status ${statusClass}">${statusText}</span>
                            <span class="poem-list-arrow">›</span>
                        </div>
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
        const confirmed = await showModal('重置数据', '将彻底清空所有数据（包括缓存），并从诗词库重新初始化。确定继续吗？');
        if (!confirmed) return;

        localStorage.removeItem('poetry_db');

        db.run("DROP TABLE IF EXISTS poems");
        db.run("DROP TABLE IF EXISTS learning");
        db.run("DROP TABLE IF EXISTS daily_log");

        db.run(`CREATE TABLE poems (
            id INTEGER PRIMARY KEY,
            title TEXT NOT NULL,
            author TEXT NOT NULL,
            content TEXT NOT NULL,
            pinyin TEXT NOT NULL,
            keywords TEXT NOT NULL,
            analysis TEXT NOT NULL
        )`);

        db.run(`CREATE TABLE learning (
            poem_id INTEGER PRIMARY KEY,
            memory_level INTEGER DEFAULT 0,
            next_review TEXT DEFAULT '',
            today_remaining INTEGER DEFAULT 0,
            status TEXT DEFAULT 'new',
            mastered INTEGER DEFAULT 0,
            last_action TEXT DEFAULT '',
            last_review_date TEXT DEFAULT ''
        )`);

        db.run(`CREATE TABLE daily_log (
            date TEXT PRIMARY KEY,
            new_poem_id INTEGER DEFAULT 0
        )`);

        POEMS_DATA.forEach(p => {
            db.run(
                "INSERT INTO poems VALUES (?, ?, ?, ?, ?, ?, ?)", [p.id, p.title, p.author, JSON.stringify(p.content), JSON.stringify(p.pinyin), JSON.stringify(p.keywords), p.analysis]
            );
        });

        saveDB();
        showToast('🗑️ 数据已彻底重置');
        updateHomePage();
    }

    function advanceReview() {
        const tomorrowStr = addDays(todayStr, 1);
        const advanceRows = db.exec(
            `SELECT poem_id FROM learning
             WHERE mastered = 0 AND next_review = ?
             ORDER BY memory_level ASC`, [tomorrowStr]
        );

        if (advanceRows.length === 0 || advanceRows[0].values.length === 0) {
            showToast('明天没有需要复习的内容');
            return;
        }

        todayQueue = [];
        advanceRows[0].values.forEach(row => {
            todayQueue.push({ poemId: row[0], type: 'review' });
        });

        currentIndex = 0;
        navigateTo('page-learn');
        renderPoem(todayQueue[0]);
        showToast('⏩ 开始提前复习明天的 ' + todayQueue.length + ' 首诗词');
    }

    function continueLearn() {
        const unlearnedRows = db.exec(
            `SELECT p.id FROM poems p
             LEFT JOIN learning l ON p.id = l.poem_id
             WHERE l.poem_id IS NULL
             ORDER BY p.id ASC LIMIT 1`
        );

        if (unlearnedRows.length === 0 || unlearnedRows[0].values.length === 0) {
            showToast('所有诗词已学习完毕！');
            return;
        }

        const newPoemId = unlearnedRows[0].values[0][0];

        db.run(
            `INSERT OR IGNORE INTO learning (poem_id, memory_level, next_review, today_remaining, status, mastered, last_action, last_review_date)
             VALUES (?, 0, ?, 0, 'new', 0, '', ?)`, [newPoemId, todayStr, todayStr]
        );

        db.run("INSERT OR REPLACE INTO daily_log (date, new_poem_id) VALUES (?, ?)", [todayStr, newPoemId]);

        saveDB();
        updateHomePage();

        todayQueue = [{ poemId: newPoemId, type: 'new' }];
        currentIndex = 0;
        navigateTo('page-learn');
        renderPoem(todayQueue[0]);
        showToast('📖 开始学习新诗词');
    }

    function openImageViewer(src) {
        var viewer = $('#image-viewer');
        var viewerImg = $('#viewer-image');
        viewerScale = 1;
        viewerTranslateX = 0;
        viewerTranslateY = 0;
        viewerImg.src = src;
        updateViewerTransform();
        viewer.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function closeImageViewer() {
        var viewer = $('#image-viewer');
        viewer.classList.add('hidden');
        document.body.style.overflow = '';
        isDragging = false;
    }

    function updateViewerTransform() {
        var viewerImg = $('#viewer-image');
        viewerImg.style.transform = 'scale(' + viewerScale + ') translate(' + viewerTranslateX + 'px, ' + viewerTranslateY + 'px)';
    }

    function zoomIn() {
        viewerScale = Math.min(viewerScale + 0.3, 5);
        updateViewerTransform();
    }

    function zoomOut() {
        viewerScale = Math.max(viewerScale - 0.3, 0.5);
        if (viewerScale <= 1) {
            viewerTranslateX = 0;
            viewerTranslateY = 0;
        }
        updateViewerTransform();
    }

    function showPoemDetail() {
        var poemDetail = $('#poem-detail');
        var btnShowPoem = $('#btn-show-poem');
        poemDetail.classList.remove('collapsed');
        poemDetail.classList.add('expanding');
        btnShowPoem.classList.add('hidden');

        // 滚动到顶部，0.3秒动画
        const startPosition = window.pageYOffset;
        const startTime = performance.now();
        const duration = 300; // 0.3秒

        function animateScroll(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3); // 缓动函数

            window.scrollTo(0, startPosition * (1 - easeProgress));

            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            }
        }

        requestAnimationFrame(animateScroll);
    }

    function bindEvents() {
        $('#btn-home').addEventListener('click', () => {
            browseMode = false;
            browseFromPage = '';
            navigateTo('page-home');
            updateHomePage();
        });

        $('#btn-start-learn').addEventListener('click', () => {
            if (todayQueue.length === 0) {
                showToast('今日没有需要学习的诗词');
                return;
            }
            browseMode = false;
            browseFromPage = '';
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

        $('#btn-admin').addEventListener('click', () => {
            navigateTo('page-admin');
            initAdminPage();
        });

        $('#btn-back-stats').addEventListener('click', () => {
            navigateTo('page-home');
            updateHomePage();
        });

        $('#btn-back-data').addEventListener('click', () => {
            navigateTo('page-home');
            updateHomePage();
        });

        $('#btn-back-admin').addEventListener('click', () => {
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

        $('#btn-continue-learn').addEventListener('click', continueLearn);

        $('#btn-advance-review').addEventListener('click', advanceReview);

        $$('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                $$('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                updatePoemList(btn.dataset.filter);
            });
        });

        $('#poem-list').addEventListener('click', function (e) {
            var item = e.target.closest('.poem-list-item');
            if (!item) return;
            var poemId = parseInt(item.dataset.poemId);
            if (!poemId) return;
            browseMode = true;
            browseFromPage = 'page-stats';
            var learnRow = db.exec("SELECT poem_id FROM learning WHERE poem_id = ?", [poemId]);
            var type = (learnRow.length > 0 && learnRow[0].values.length > 0) ? 'review' : 'new';
            todayQueue = [{ poemId: poemId, type: type }];
            currentIndex = 0;
            navigateTo('page-learn');
            renderPoem(todayQueue[0]);
        });

        $('#poem-image-wrap').addEventListener('click', function () {
            var src = $('#poem-image').getAttribute('src');
            if (src) {
                openImageViewer(src);
            }
        });

        $('#btn-show-poem').addEventListener('click', showPoemDetail);

        $('#viewer-zoom-in').addEventListener('click', zoomIn);
        $('#viewer-zoom-out').addEventListener('click', zoomOut);
        $('#viewer-close').addEventListener('click', closeImageViewer);
        $('#viewer-backdrop').addEventListener('click', closeImageViewer);

        var viewerImg = $('#viewer-image');
        viewerImg.addEventListener('mousedown', function (e) {
            if (viewerScale > 1) {
                isDragging = true;
                dragStartX = e.clientX;
                dragStartY = e.clientY;
                dragLastX = viewerTranslateX;
                dragLastY = viewerTranslateY;
                e.preventDefault();
            }
        });

        document.addEventListener('mousemove', function (e) {
            if (!isDragging) return;
            var dx = (e.clientX - dragStartX) / viewerScale;
            var dy = (e.clientY - dragStartY) / viewerScale;
            viewerTranslateX = dragLastX + dx;
            viewerTranslateY = dragLastY + dy;
            updateViewerTransform();
        });

        document.addEventListener('mouseup', function () {
            isDragging = false;
        });

        viewerImg.addEventListener('touchstart', function (e) {
            if (viewerScale > 1 && e.touches.length === 1) {
                isDragging = true;
                dragStartX = e.touches[0].clientX;
                dragStartY = e.touches[0].clientY;
                dragLastX = viewerTranslateX;
                dragLastY = viewerTranslateY;
                e.preventDefault();
            }
        }, { passive: false });

        document.addEventListener('touchmove', function (e) {
            if (!isDragging) return;
            var dx = (e.touches[0].clientX - dragStartX) / viewerScale;
            var dy = (e.touches[0].clientY - dragStartY) / viewerScale;
            viewerTranslateX = dragLastX + dx;
            viewerTranslateY = dragLastY + dy;
            updateViewerTransform();
        }, { passive: false });

        document.addEventListener('touchend', function () {
            isDragging = false;
        });

        $('#image-viewer').addEventListener('wheel', function (e) {
            e.preventDefault();
            if (e.deltaY < 0) {
                zoomIn();
            } else {
                zoomOut();
            }
        }, { passive: false });

        document.addEventListener('keydown', function (e) {
            var viewer = $('#image-viewer');
            if (viewer.classList.contains('hidden')) return;
            if (e.key === 'Escape') {
                closeImageViewer();
            } else if (e.key === '+' || e.key === '=') {
                zoomIn();
            } else if (e.key === '-') {
                zoomOut();
            }
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