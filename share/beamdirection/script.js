// JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // --- ゲームデータ ---
    const levels = [
        {
            board: [
                ".,.,d,.,.,.",
                ".,.,.,.,.,.",
                ".,.,.,a,.,.",
                ".,.,.,.,.,.",
                ".,.,.,.,.,.",
                ".,.,.,.,.,a"
            ],
            panels: ['L1', 'L3']
        },
        {
            board: [
                ".,.,.,.,.,.",
                ".,a,.,.,.,a",
                ".,.,.,.,.,.",
                "r,.,.,.,.,.",
                ".,.,.,.,.,.",
                ".,.,.,a,.,."
            ],
            panels: ['T4', 'T1']
        },
        {
            board: [
".,.,.,.,.,.",
".,a,.,a,.,.",
".,.,.,.,.,.",
".,.,a,.,a,.",
".,.,.,.,.,.",
".,.,.,u,.,."
            ],
            panels: ['L2', 'L3', 'T1']
        },
         {
            board: [
"r,.,.,.,.,.",
".,a,.,.,.,.",
".,.,a,.,.,.",
".,.,.,.,a,.",
".,.,a,.,.,.",
".,.,.,.,.,u"
            ],
            panels: ['L1', 'L3', 'L3']
        },
         {
            board: [
".,.,.,d,d,d",
".,a,a,.,.,.",
"a,.,.,.,.,.",
"a,a,.,a,.,.",
".,.,a,a,a,.",
".,.,.,.,.,."
            ],
            panels: ['L1', 'L2', 'L2','L2']
        }
    ];

    const panelDefs = {
        'L1': { openings: ['up', 'right'], svg: '<svg viewBox="0 0 10 10"><path d="M5 0 V5 H10" stroke="white" stroke-width="2" fill="none"/></svg>' },
        'L2': { openings: ['up', 'left'], svg: '<svg viewBox="0 0 10 10"><path d="M5 0 V5 H0" stroke="white" stroke-width="2" fill="none"/></svg>' },
        'L3': { openings: ['down', 'left'], svg: '<svg viewBox="0 0 10 10"><path d="M0 5 H5 V10" stroke="white" stroke-width="2" fill="none"/></svg>' },
        'L4': { openings: ['down', 'right'], svg: '<svg viewBox="0 0 10 10"><path d="M10 5 H5 V10" stroke="white" stroke-width="2" fill="none"/></svg>' },
        'T1': { openings: ['left', 'down', 'right'], svg: '<svg viewBox="0 0 10 10"><path d="M0 5 H10 M5 5 V10" stroke="white" stroke-width="2" fill="none"/></svg>' },
        'T2': { openings: ['down', 'right', 'up'], svg: '<svg viewBox="0 0 10 10"><path d="M5 0 V10 M5 5 H10" stroke="white" stroke-width="2" fill="none"/></svg>' },
        'T3': { openings: ['right', 'up', 'left'], svg: '<svg viewBox="0 0 10 10"><path d="M0 5 H10 M5 5 V0" stroke="white" stroke-width="2" fill="none"/></svg>' },
        'T4': { openings: ['up', 'left', 'down'], svg: '<svg viewBox="0 0 10 10"><path d="M5 0 V10 M5 5 H0" stroke="white" stroke-width="2" fill="none"/></svg>' },
        'x':  { openings: ['up', 'down', 'left', 'right'], svg: '<svg viewBox="0 0 10 10"><path d="M0 5 H10 M5 0 V10" stroke="white" stroke-width="2" fill="none"/></svg>' }
    };

    const dirVectors = { 'up': [-1, 0], 'down': [1, 0], 'left': [0, -1], 'right': [0, 1] };
    const oppositeDir = { 'up': 'down', 'down': 'up', 'left': 'right', 'right': 'left' };

    // --- DOM要素 ---
    const gameBoard = document.getElementById('game-board');
    const panelArea = document.getElementById('panel-area');
    const levelSelect = document.getElementById('level-select');
    const resetButton = document.getElementById('reset-button');
    const rulesButton = document.getElementById('rules-button');
    const rulesModal = document.getElementById('rules-modal');
    const closeButton = rulesModal.querySelector('.modal-close');
    const messageArea = document.getElementById('message-area');

    // --- ゲームの状態 ---
    let currentLevelIndex = 0;
    let grid = [];
    let placedPanels = [];
    let availablePanels = {};
    let totalLights = 0;
    let rows, cols;
    let dragged = { element: null, type: null, from: null, row: -1, col: -1 };
    
    // --- タッチ操作用の状態 ---
    let touchDragging = false;
    let touchClone = null;

    // --- 初期化 ---
    function init() {
        levels.forEach((_, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = `問題 ${index + 1}`;
            levelSelect.appendChild(option);
        });
        
        levelSelect.addEventListener('change', () => loadLevel(parseInt(levelSelect.value)));
        resetButton.addEventListener('click', () => loadLevel(currentLevelIndex));
        rulesButton.addEventListener('click', () => rulesModal.classList.add('visible'));
        closeButton.addEventListener('click', () => rulesModal.classList.remove('visible'));
        rulesModal.addEventListener('click', (e) => {
            if (e.target === rulesModal) rulesModal.classList.remove('visible');
        });

        addDropListeners(panelArea);
        loadLevel(0);
    }

    // --- レベルの読み込み ---
    function loadLevel(levelIndex) {
        currentLevelIndex = levelIndex;
        levelSelect.value = levelIndex;
        const level = levels[levelIndex];
        
        grid = level.board.map(rowStr => rowStr.split(','));
        rows = grid.length;
        cols = grid[0].length;

        placedPanels = Array(rows).fill(null).map(() => Array(cols).fill(null));
        
        availablePanels = {};
        level.panels.forEach(p => { availablePanels[p] = (availablePanels[p] || 0) + 1; });
        
        totalLights = 0;
        grid.flat().forEach(cell => { if (cell === 'a') totalLights++; });

        messageArea.textContent = '';
        
        drawBoard();
        drawPanelArea();
        calculateBeams();
    }

    // --- 描画関連 (修正) ---
    function drawBoard() {
        gameBoard.innerHTML = '';
        gameBoard.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
        
        grid.forEach((row, r) => {
            row.forEach((cell, c) => {
                const cellEl = document.createElement('div');
                cellEl.classList.add('grid-cell');
                cellEl.dataset.row = r;
                cellEl.dataset.col = c;

                // ライトやエミッターを描画
                if (cell === 'a') {
                    const light = document.createElement('div');
                    light.classList.add('board-element', 'light');
                    cellEl.appendChild(light);
                } else if (['r', 'l', 'u', 'd'].includes(cell)) {
                    const emitter = document.createElement('div');
                    emitter.classList.add('board-element', 'emitter');
                    const arrow = document.createElement('span');
                    const arrowMap = {'r': '→', 'l': '←', 'u': '↑', 'd': '↓'};
                    arrow.textContent = arrowMap[cell];
                    arrow.style.cssText = 'color: white; font-size: 1.5em; display: flex; justify-content: center; align-items: center; height: 100%;';
                    emitter.appendChild(arrow);
                    cellEl.appendChild(emitter);
                }

                // ★★★ 修正点: placedPanels配列に基づいて配置済みのパネルを描画する ★★★
                if (placedPanels[r][c]) {
                    const panelType = placedPanels[r][c];
                    const panelEl = createPanelElement(panelType);
                    cellEl.appendChild(panelEl);
                }
                
                addDropListeners(cellEl);
                gameBoard.appendChild(cellEl);
            });
        });
    }

    function drawPanelArea() {
        panelArea.innerHTML = '';
        Object.keys(panelDefs).forEach(type => {
            if (availablePanels[type] && availablePanels[type] > 0) {
                for (let i = 0; i < availablePanels[type]; i++) {
                     const panelEl = createPanelElement(type);
                     panelArea.appendChild(panelEl);
                }
            }
        });
    }
    
    function createPanelElement(type) {
        const panelEl = document.createElement('div');
        panelEl.classList.add('panel');
        panelEl.dataset.type = type;
        panelEl.draggable = true;
        panelEl.innerHTML = panelDefs[type].svg;
        addDragAndTouchListeners(panelEl);
        return panelEl;
    }

    // --- イベントリスナー (マウス & タッチ) ---
    function addDragAndTouchListeners(element) {
        element.addEventListener('dragstart', handleDragStart);
        element.addEventListener('touchstart', handleTouchStart, { passive: false });
        element.addEventListener('touchmove', handleTouchMove, { passive: false });
        element.addEventListener('touchend', handleTouchEnd);
    }
    
    function addDropListeners(element) {
        element.addEventListener('dragover', handleDragOver);
        element.addEventListener('dragleave', handleDragLeave);
        element.addEventListener('drop', handleDrop);
    }

    // --- ドラッグ＆ドロップ (マウス) ---
    function handleDragStart(e) {
        dragged.element = e.target.closest('.panel');
        dragged.type = dragged.element.dataset.type;
        
        const parent = dragged.element.parentElement;
        if (parent.classList.contains('grid-cell')) {
            dragged.from = 'board';
            dragged.row = parseInt(parent.dataset.row);
            dragged.col = parseInt(parent.dataset.col);
        } else {
            dragged.from = 'area';
        }
        setTimeout(() => { dragged.element.classList.add('dragging'); }, 0);
    }

    function handleDragOver(e) {
        e.preventDefault();
        const targetCell = e.target.closest('.grid-cell, #panel-area');
        if (targetCell) targetCell.classList.add('dragging-over');
    }
    
    function handleDragLeave(e) {
        const targetCell = e.target.closest('.grid-cell, #panel-area');
        if (targetCell) targetCell.classList.remove('dragging-over');
    }

    function handleDrop(e) {
        e.preventDefault();
        document.querySelectorAll('.dragging-over').forEach(el => el.classList.remove('dragging-over'));
        const dropTarget = e.target.closest('.grid-cell, #panel-area');
        performDrop(dropTarget);
        if (dragged.element) dragged.element.classList.remove('dragging');
        dragged = { element: null, type: null, from: null, row: -1, col: -1 };
    }

    // --- ドラッグ＆ドロップ (タッチ) ---
    function handleTouchStart(e) {
        e.preventDefault();
        touchDragging = true;
        dragged.element = e.target.closest('.panel');
        dragged.type = dragged.element.dataset.type;

        const parent = dragged.element.parentElement;
        if (parent.classList.contains('grid-cell')) {
            dragged.from = 'board';
            dragged.row = parseInt(parent.dataset.row);
            dragged.col = parseInt(parent.dataset.col);
        } else {
            dragged.from = 'area';
        }

        touchClone = dragged.element.cloneNode(true);
        touchClone.style.position = 'absolute';
        touchClone.style.zIndex = '1000';
        touchClone.style.pointerEvents = 'none';
        touchClone.style.opacity = '0.7';
        document.body.appendChild(touchClone);
        
        const touch = e.touches[0];
        touchClone.style.left = `${touch.clientX - touchClone.offsetWidth / 2}px`;
        touchClone.style.top = `${touch.clientY - touchClone.offsetHeight / 2}px`;
        dragged.element.classList.add('dragging');
    }

    function handleTouchMove(e) {
        if (!touchDragging || !touchClone) return;
        e.preventDefault();
        const touch = e.touches[0];
        touchClone.style.left = `${touch.clientX - touchClone.offsetWidth / 2}px`;
        touchClone.style.top = `${touch.clientY - touchClone.offsetHeight / 2}px`;
    }

    function handleTouchEnd(e) {
        if (!touchDragging || !touchClone) return;
        touchDragging = false;
        
        const touch = e.changedTouches[0];
        touchClone.style.visibility = 'hidden';
        const dropTarget = document.elementFromPoint(touch.clientX, touch.clientY)?.closest('.grid-cell, #panel-area');
        
        performDrop(dropTarget);

        if (dragged.element) dragged.element.classList.remove('dragging');
        document.body.removeChild(touchClone);
        touchClone = null;
        dragged = { element: null, type: null, from: null, row: -1, col: -1 };
    }

    // --- 共通のドロップ処理 (修正) ---
    function performDrop(dropTarget) {
        if (!dropTarget || !dragged.element) return;
        
        // パネルエリアに戻す場合
        if (dropTarget.id === 'panel-area') {
            if (dragged.from === 'board') {
                placedPanels[dragged.row][dragged.col] = null;
                availablePanels[dragged.type]++;
            }
        } 
        // ボード上のセルに置く場合
        else if (dropTarget.classList.contains('grid-cell')) {
            const row = parseInt(dropTarget.dataset.row);
            const col = parseInt(dropTarget.dataset.col);
            
            // 空のセルにのみ配置可能
            if (grid[row][col] === '.' && !placedPanels[row][col]) {
                // 元の場所から移動する場合
                if (dragged.from === 'board') {
                    placedPanels[dragged.row][dragged.col] = null;
                } 
                // パネルエリアから持ってくる場合
                else {
                    availablePanels[dragged.type]--;
                }
                // 新しい場所にパネル情報を設定
                placedPanels[row][col] = dragged.type;
            }
        }

        // ★★★ 修正点: 状態の変更が完了した後に、UI全体を再描画する ★★★
        drawPanelArea();
        drawBoard();
        calculateBeams();
    }

    // --- ビーム計算ロジック ---
    function calculateBeams() {
        document.querySelectorAll('.beam').forEach(b => b.remove());
        document.querySelectorAll('.light').forEach(l => l.classList.remove('on'));

        const initialBeams = [];
        grid.forEach((row, r) => {
            row.forEach((cell, c) => {
                if (['r', 'l', 'u', 'd'].includes(cell)) {
                    const dirMap = {'r': 'right', 'l': 'left', 'u': 'up', 'd': 'down'};
                    initialBeams.push({ r, c, dir: dirMap[cell] });
                }
            });
        });

        let activeBeams = [...initialBeams];
        const visited = new Set();

        while (activeBeams.length > 0) {
            const beam = activeBeams.shift();
            const visitedKey = `${beam.r},${beam.c},${beam.dir}`;
            if (visited.has(visitedKey)) continue;
            visited.add(visitedKey);

            const [dr, dc] = dirVectors[beam.dir];
            let nextR = beam.r + dr;
            let nextC = beam.c + dc;
            
            while (nextR >= 0 && nextR < rows && nextC >= 0 && nextC < cols) {
                const panelType = placedPanels[nextR][nextC];
                if (panelType) {
                    const panelDef = panelDefs[panelType];
                    const incomeDir = oppositeDir[beam.dir];
                    if (panelDef.openings.includes(incomeDir)) {
                        panelDef.openings.forEach(opening => {
                            if (opening !== incomeDir) {
                                activeBeams.push({ r: nextR, c: nextC, dir: opening });
                            }
                        });
                    }
                    break;
                }
                
                const cellEl = gameBoard.querySelector(`[data-row='${nextR}'][data-col='${nextC}']`);
                const beamEl = document.createElement('div');
                beamEl.classList.add('beam');
                beamEl.classList.add((beam.dir === 'left' || beam.dir === 'right') ? 'beam-h' : 'beam-v');
                cellEl.appendChild(beamEl);
                
                if (grid[nextR][nextC] === 'a') {
                    const lightEl = cellEl.querySelector('.light');
                    if (lightEl) lightEl.classList.add('on');
                }
                nextR += dr;
                nextC += dc;
            }
        }
        checkWinCondition();
    }
    
    // --- クリア判定 ---
    function checkWinCondition() {
        const litLightsCount = document.querySelectorAll('.light.on').length;
        if (totalLights > 0 && litLightsCount === totalLights) {
            messageArea.textContent = 'クリア！🎉';
        } else {
            messageArea.textContent = '';
        }
    }

    init();
});
