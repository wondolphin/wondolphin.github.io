// shape8.js (図形8: くまで)

(function() {

    // --- 問題データ (図形8) ---
    const problemSetShape8 = {
        1: {
            options: [
                { id: 'l1', label: '柄の長さ(L1)', unit: '', values: [80, 100, 120] },
                { id: 'l2', label: '歯の長さ(L2)', unit: '', fixed: 100 },
                { id: 'alpha', label: '歯の角度(α)', unit: '°', values: [10, 15, 20] }
            ],
            initial: { l1: 80, l2: 100, alpha: 10 },
            answer: { l1: 100, l2: 100, alpha: 15 }
        },
        2: {
            options: [
                { id: 'l1', label: '柄の長さ(L1)', unit: '', fixed: 100 },
                { id: 'l2', label: '歯の長さ(L2)', unit: '', values: [80, 100] },
                { id: 'alpha', label: '歯の角度(α)', unit: '°', values: [15, 25] }
            ],
            initial: { l1: 100, l2: 80, alpha: 25 },
            answer: { l1: 100, l2: 100, alpha: 15 }
        },
        3: {
            options: [
                { id: 'l1', label: '柄の長さ(L1)', unit: '', values: [110, 130] },
                { id: 'l2', label: '歯の長さ(L2)', unit: '', values: [90, 110] },
                { id: 'alpha', label: '歯の角度(α)', unit: '°', values: [10, 20] }
            ],
            initial: { l1: 110, l2: 90, alpha: 10 },
            answer: { l1: 130, l2: 110, alpha: 20 }
        }
    };

    // --- 描画関数 (図形8) ---
    function drawShape8(canvas, params, highlights) {
        const ctx = canvas.getContext('2d');
        const { l1, l2, alpha } = params;
        const { l1: hl_l1, l2: hl_l2, alpha: hl_alpha } = highlights;

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const defaultStroke = '#2563eb';
        const toRad = Math.PI / 180;
        
        ctx.save();
        ctx.translate(centerX, centerY); // 原点O

        // 中心点Oハイライト
        if (hl_l1 || hl_l2 || hl_alpha) {
             ctx.fillStyle = HL_POINT;
             ctx.beginPath();
             ctx.arc(0, 0, 5, 0, Math.PI * 2);
             ctx.fill();
        }
        
        // 柄 (L1) - 下方向
        ctx.strokeStyle = (hl_l1) ? HL_L1 : defaultStroke; // Red
        ctx.lineWidth = (hl_l1) ? 4 : 3;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, l1); // +Y方向
        ctx.stroke();

        // 歯 (L2) - 7本
        const angles = [-3 * alpha, -2 * alpha, -alpha, 0, alpha, 2 * alpha, 3 * alpha];
        
        // 角度αハイライト (0度とα度の間)
        if (hl_alpha && l2 > 0) {
            ctx.strokeStyle = HL_TRI_ROT; // Purple
            ctx.lineWidth = 2;
            const rad0 = -90 * toRad; // 真上
            const rad1 = (alpha - 90) * toRad;
            ctx.beginPath();
            ctx.arc(0, 0, Math.max(15, l2 * 0.4), rad0, rad1);
            ctx.stroke();
        }

        angles.forEach((angleDeg, index) => {
            const angleRad = (angleDeg - 90) * toRad; // 真上(-90度)を基準に回転
            const endX = l2 * Math.cos(angleRad);
            const endY = l2 * Math.sin(angleRad);

            // 真ん中(index=3) かつ L2ハイライト がONの場合
            const isHighlightL2 = (index === 3 && hl_l2);
            ctx.strokeStyle = (isHighlightL2) ? HL_SIDE : defaultStroke; // Green
            ctx.lineWidth = (isHighlightL2) ? 4 : 3;

            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(endX, endY);
            ctx.stroke();
        });

        ctx.restore();
    }

    // --- アイコン描画関数 (図形8) ---

    // 柄の長さ(L1)
    function drawS8L1Icon(canvasId) {
        const c = document.getElementById(canvasId); if (!c) return;
        const ctx = c.getContext('2d'); const [w, h] = [c.width, c.height];
        ctx.clearRect(0, 0, w, h); ctx.strokeStyle = HL_L1; ctx.lineWidth = 3; // Red
        ctx.beginPath(); ctx.moveTo(w / 2, h * 0.2); ctx.lineTo(w / 2, h * 0.8); ctx.stroke();
        ctx.fillStyle = HL_POINT; ctx.beginPath(); ctx.arc(w / 2, h * 0.2, 3, 0, Math.PI * 2); ctx.fill();
    }
    // 歯の長さ(L2)
    function drawS8L2Icon(canvasId) {
        const c = document.getElementById(canvasId); if (!c) return;
        const ctx = c.getContext('2d'); const [w, h] = [c.width, c.height];
        ctx.clearRect(0, 0, w, h); ctx.strokeStyle = HL_SIDE; ctx.lineWidth = 3; // Green
        ctx.beginPath(); ctx.moveTo(w / 2, h * 0.8); ctx.lineTo(w * 0.2, h * 0.2); ctx.stroke();
        ctx.fillStyle = HL_POINT; ctx.beginPath(); ctx.arc(w / 2, h * 0.8, 3, 0, Math.PI * 2); ctx.fill();
    }
    // 歯の角度(α)
    function drawS8AlphaIcon(canvasId) {
        const c = document.getElementById(canvasId); if (!c) return;
        const ctx = c.getContext('2d'); const [w, h] = [c.width, c.height];
        const [cx, cy] = [w / 2, h * 0.8]; const r = h * 0.6;
        const angle = Math.PI / 8; // 22.5度
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = HL_POINT;
        ctx.beginPath(); ctx.arc(cx, cy, 3, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = DEFAULT_STROKE_ICON; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(cx, cy); // 真ん中
        ctx.lineTo(cx + r * Math.cos(-Math.PI/2), cy + r * Math.sin(-Math.PI/2));
        ctx.stroke();
        ctx.beginPath(); ctx.moveTo(cx, cy); // 右
        ctx.lineTo(cx + r * Math.cos(-Math.PI/2 + angle), cy + r * Math.sin(-Math.PI/2 + angle));
        ctx.stroke();
        ctx.strokeStyle = HL_TRI_ROT; ctx.lineWidth = 2; // Purple
        ctx.beginPath();
        ctx.arc(cx, cy, r * 0.5, -Math.PI/2, -Math.PI/2 + angle);
        ctx.stroke();
    }


    // --- メインスクリプトに図形定義を登録 ---
    if (!window.shapeDefinitions) {
        window.shapeDefinitions = {};
    }
    
    window.shapeDefinitions.shape8 = {
        name: '図形8',
        params: ['l1', 'l2', 'alpha'],
        
        sliderContainerId: 'shape8Sliders',
        sliderIdMap: { l1: 's8_l1', l2: 's8_l2', alpha: 's8_alpha' },
        valueLabelIds: {
            l1: 's8_l1Value',
            l2: 's8_l2Value',
            alpha: 's8_alphaValue'
        },
        highlightCheckboxName: 's8_highlight',
        
        drawFn: drawShape8,
        drawIconFns: {
            l1: drawS8L1Icon,
            l2: drawS8L2Icon,
            alpha: drawS8AlphaIcon
        },
        problemSet: problemSetShape8,
        
        iconCanvasIds: [
            's8_label_icon_l1', 's8_label_icon_l2', 's8_label_icon_alpha',
            's8_icon_l1', 's8_icon_l2', 's8_icon_alpha'
        ]
    };

})();