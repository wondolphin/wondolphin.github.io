// shape6.js (図形6: さくらんぼ)

(function() {

    // --- 問題データ (図形6) ---
    const problemSetShape6 = {
        1: {
            options: [
                { id: 'alpha', label: '角度(α)', unit: '°', values: [30, 45, 60] },
                { id: 'l1', label: '茎の長さ(L1)', unit: '', fixed: 100 },
                { id: 'l2', label: '実の半径(L2)', unit: '', values: [20, 30, 40] }
            ],
            initial: { alpha: 30, l1: 100, l2: 20 },
            answer: { alpha: 45, l1: 100, l2: 30 }
        },
        2: {
            options: [
                { id: 'alpha', label: '角度(α)', unit: '°', fixed: 60 },
                { id: 'l1', label: '茎の長さ(L1)', unit: '', values: [80, 100, 120] },
                { id: 'l2', label: '実の半径(L2)', unit: '', values: [25, 30] }
            ],
            initial: { alpha: 60, l1: 120, l2: 25 },
            answer: { alpha: 60, l1: 100, l2: 30 }
        },
        3: {
            options: [
                { id: 'alpha', label: '角度(α)', unit: '°', values: [40, 50] },
                { id: 'l1', label: '茎の長さ(L1)', unit: '', values: [90, 110] },
                { id: 'l2', label: '実の半径(L2)', unit: '', values: [30, 35] }
            ],
            initial: { alpha: 40, l1: 90, l2: 35 },
            answer: { alpha: 50, l1: 110, l2: 30 }
        }
    };

    // --- 描画関数 (図形6) ---
    function drawShape6(canvas, params, highlights) {
        const ctx = canvas.getContext('2d');
        const { alpha, l1, l2 } = params;
        const { alpha: hl_alpha, l1: hl_l1, l2: hl_l2 } = highlights;

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const stemStroke = '#16a34a'; // green-600
        const cherryFill = '#dc2626'; // red-600
        const cherryStroke = '#b91c1c'; // red-700
        const toRad = Math.PI / 180;
        
        // 角度αの半分 (ラジアン)
        const halfAlphaRad = (alpha / 2) * toRad;
        // 基準線 (真下) からの角度
        const angleLeft = (90 - alpha / 2) * toRad;
        const angleRight = (90 + alpha / 2) * toRad;

        ctx.save();
        ctx.translate(centerX, centerY); // 原点O

        // 中心点Oハイライト
        if (hl_alpha || hl_l1) {
             ctx.fillStyle = HL_POINT;
             ctx.beginPath();
             ctx.arc(0, 0, 5, 0, Math.PI * 2);
             ctx.fill();
        }

        // 角度αハイライト
        if (hl_alpha && l1 > 0) {
            ctx.strokeStyle = HL_L1; // Red
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(0, 0, Math.max(20, l1 * 0.4), angleLeft, angleRight);
            ctx.stroke();
        }

        // 茎 (左)
        const endXLeft = l1 * Math.cos(angleLeft);
        const endYLeft = l1 * Math.sin(angleLeft);
        ctx.strokeStyle = stemStroke;
        ctx.lineWidth = 3;
        if (hl_l1) {
            ctx.strokeStyle = HL_SIDE; // Green
            ctx.lineWidth = 4;
        }
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(endXLeft, endYLeft);
        ctx.stroke();

        // 茎 (右)
        const endXRight = l1 * Math.cos(angleRight);
        const endYRight = l1 * Math.sin(angleRight);
        ctx.strokeStyle = stemStroke;
        ctx.lineWidth = 3;
        // (ハイライトは左側だけで十分)
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(endXRight, endYRight);
        ctx.stroke();

        // 実 (左)
        ctx.fillStyle = cherryFill;
        ctx.strokeStyle = cherryStroke;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(endXLeft, endYLeft, l2, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // 実 (右)
        ctx.beginPath();
        ctx.arc(endXRight, endYRight, l2, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        
        // 実の半径ハイライト (左側のみ)
        if (hl_l2 && l2 > 0) {
            ctx.strokeStyle = HL_TRI_ROT; // Purple
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(endXLeft, endYLeft);
            ctx.lineTo(endXLeft + l2, endYLeft);
            ctx.stroke();
        }

        ctx.restore();
    }

    // --- アイコン描画関数 (図形6) ---

    // 角度(α)
    function drawS6AlphaIcon(canvasId) {
        const c = document.getElementById(canvasId); if (!c) return;
        const ctx = c.getContext('2d'); const [w, h] = [c.width, c.height];
        const [cx, cy] = [w / 2, h * 0.2]; const r = h * 0.7;
        const angle = Math.PI / 6; // 30度
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = HL_POINT;
        ctx.beginPath(); ctx.arc(cx, cy, 3, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = DEFAULT_STROKE_ICON; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(cx, cy); // 左下
        ctx.lineTo(cx + r * Math.cos(Math.PI/2 + angle), cy + r * Math.sin(Math.PI/2 + angle));
        ctx.stroke();
        ctx.beginPath(); ctx.moveTo(cx, cy); // 右下
        ctx.lineTo(cx + r * Math.cos(Math.PI/2 - angle), cy + r * Math.sin(Math.PI/2 - angle));
        ctx.stroke();
        ctx.strokeStyle = HL_L1; ctx.lineWidth = 2; // Red
        ctx.beginPath();
        ctx.arc(cx, cy, r * 0.5, Math.PI/2 - angle, Math.PI/2 + angle);
        ctx.stroke();
    }
    // 茎の長さ(L1)
    function drawS6L1Icon(canvasId) {
        const c = document.getElementById(canvasId); if (!c) return;
        const ctx = c.getContext('2d'); const [w, h] = [c.width, c.height];
        ctx.clearRect(0, 0, w, h); ctx.strokeStyle = HL_SIDE; ctx.lineWidth = 3; // Green
        ctx.beginPath(); ctx.moveTo(w / 2, h * 0.2); ctx.lineTo(w * 0.2, h * 0.8); ctx.stroke();
        ctx.fillStyle = HL_POINT; ctx.beginPath(); ctx.arc(w / 2, h * 0.2, 3, 0, Math.PI * 2); ctx.fill();
    }
    // 実の半径(L2)
    function drawS6L2Icon(canvasId) {
        const c = document.getElementById(canvasId); if (!c) return;
        const ctx = c.getContext('2d'); const [w, h] = [c.width, c.height];
        const [cx, cy] = [w/2, h/2]; const r = h * 0.35;
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = '#dc2626'; // red-600
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = HL_TRI_ROT; ctx.lineWidth = 3; // Purple
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + r, cy); ctx.stroke();
    }

    // --- メインスクリプトに図形定義を登録 ---
    if (!window.shapeDefinitions) {
        window.shapeDefinitions = {};
    }
    
    window.shapeDefinitions.shape6 = {
        name: '図形6',
        params: ['alpha', 'l1', 'l2'],
        
        sliderContainerId: 'shape6Sliders',
        sliderIdMap: { alpha: 's6_alpha', l1: 's6_l1', l2: 's6_l2' },
        valueLabelIds: {
            alpha: 's6_alphaValue',
            l1: 's6_l1Value',
            l2: 's6_l2Value'
        },
        highlightCheckboxName: 's6_highlight',
        
        drawFn: drawShape6,
        drawIconFns: {
            alpha: drawS6AlphaIcon,
            l1: drawS6L1Icon,
            l2: drawS6L2Icon
        },
        problemSet: problemSetShape6,
        
        iconCanvasIds: [
            's6_label_icon_alpha', 's6_label_icon_l1', 's6_label_icon_l2',
            's6_icon_alpha', 's6_icon_l1', 's6_icon_l2'
        ]
    };

})();