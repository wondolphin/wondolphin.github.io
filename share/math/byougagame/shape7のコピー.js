// shape7.js (図形7: 正方形と4つの円)

(function() {

    // --- 問題データ (図形7) ---
    const problemSetShape7 = {
        1: {
            options: [
                { id: 'l1', label: '正方形の辺(L1)', unit: '', values: [80, 100, 120] },
                { id: 'l2', label: '円の半径(L2)', unit: '', fixed: 50 }
            ],
            initial: { l1: 80, l2: 50 },
            answer: { l1: 100, l2: 50 }
        },
        2: {
            options: [
                { id: 'l1', label: '正方形の辺(L1)', unit: '', fixed: 100 },
                { id: 'l2', label: '円の半径(L2)', unit: '', values: [50, 60, 70.7, 80] }
            ],
            initial: { l1: 100, l2: 50 },
            // 正方形の中心から頂点までの距離は 100 * sqrt(2) / 2 = 70.71...
            answer: { l1: 100, l2: 70.7 } 
        },
        3: {
            options: [
                { id: 'l1', label: '正方形の辺(L1)', unit: '', values: [90, 100] },
                { id: 'l2', label: '円の半径(L2)', unit: '', values: [40, 45, 50] }
            ],
            initial: { l1: 90, l2: 40 },
            answer: { l1: 100, l2: 45 }
        }
    };

    // --- 描画関数 (図形7) ---
    function drawShape7(canvas, params, highlights) {
        const ctx = canvas.getContext('2d');
        const { l1, l2 } = params;
        const { l1: hl_l1, l2: hl_l2 } = highlights;

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const defaultStroke = '#2563eb';
        const defaultFill = 'rgba(59, 130, 246, 0.1)';
        const l1_half = l1 / 2;

        ctx.save();
        ctx.translate(centerX, centerY);

        // 正方形
        ctx.strokeStyle = (hl_l1) ? HL_L1 : defaultStroke; // Red
        ctx.lineWidth = (hl_l1) ? 3 : 2;
        ctx.strokeRect(-l1_half, -l1_half, l1, l1);

        // 4つの頂点
        const corners = [
            { x: -l1_half, y: -l1_half }, // 左上
            { x:  l1_half, y: -l1_half }, // 右上
            { x:  l1_half, y:  l1_half }, // 右下
            { x: -l1_half, y:  l1_half }  // 左下
        ];

        // 4つの円
        ctx.strokeStyle = defaultStroke;
        ctx.fillStyle = defaultFill;
        ctx.lineWidth = 2;
        
        corners.forEach((corner, index) => {
            ctx.beginPath();
            ctx.arc(corner.x, corner.y, l2, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            // 半径ハイライト (右上のみ)
            if (index === 1 && hl_l2 && l2 > 0) {
                ctx.strokeStyle = HL_SIDE; // Green
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(corner.x, corner.y);
                ctx.lineTo(corner.x + l2, corner.y);
                ctx.stroke();
                // リセット
                ctx.strokeStyle = defaultStroke;
                ctx.lineWidth = 2;
            }
        });

        ctx.restore();
    }

    // --- アイコン描画関数 (図形7) ---

    // 正方形の辺(L1)
    function drawS7L1Icon(canvasId) {
        const c = document.getElementById(canvasId); if (!c) return;
        const ctx = c.getContext('2d'); const [w, h] = [c.width, c.height];
        ctx.clearRect(0, 0, w, h);
        ctx.strokeStyle = HL_L1; ctx.lineWidth = 3; // Red
        ctx.strokeRect(w*0.2, h*0.2, w*0.6, h*0.6);
    }
    // 円の半径(L2)
    function drawS7L2Icon(canvasId) {
        const c = document.getElementById(canvasId); if (!c) return;
        const ctx = c.getContext('2d'); const [w, h] = [c.width, c.height];
        const [cx, cy] = [w*0.3, h*0.3]; const r = h * 0.3;
        ctx.clearRect(0, 0, w, h);
        ctx.strokeStyle = DEFAULT_STROKE_ICON; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
        ctx.strokeStyle = HL_SIDE; ctx.lineWidth = 3; // Green
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + r, cy); ctx.stroke();
    }

    // --- メインスクリプトに図形定義を登録 ---
    if (!window.shapeDefinitions) {
        window.shapeDefinitions = {};
    }
    
    window.shapeDefinitions.shape7 = {
        name: '図形7',
        params: ['l1', 'l2'],
        
        sliderContainerId: 'shape7Sliders',
        sliderIdMap: { l1: 's7_l1', l2: 's7_l2' },
        valueLabelIds: {
            l1: 's7_l1Value',
            l2: 's7_l2Value'
        },
        highlightCheckboxName: 's7_highlight',
        
        drawFn: drawShape7,
        drawIconFns: {
            l1: drawS7L1Icon,
            l2: drawS7L2Icon
        },
        problemSet: problemSetShape7,
        
        iconCanvasIds: [
            's7_label_icon_l1', 's7_label_icon_l2',
            's7_icon_l1', 's7_icon_l2'
        ]
    };

})();