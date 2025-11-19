// shape2.js (図形2: 線と分岐)

(function() {

    // --- 問題データ (図形2) ---
    const problemSetShape2 = {
        1: {
            options: [
                { id: 'x', label: 'L1長さ(X)', unit: '', fixed: 100 },
                { id: 'y', label: 'L2長さ(Y)', unit: '', values: [40, 60, 80] },
                { id: 'alpha', label: 'L2角度(α)', unit: '°', values: [20, 30, 45] },
                { id: 'beta', label: 'コピー角度(β)', unit: '°', values: [30, 45, 60] }
            ],
            initial: { x: 100, y: 40, alpha: 20, beta: 30 },
            answer: { x: 100, y: 60, alpha: 30, beta: 45 }
        },
        2: {
            options: [
                { id: 'x', label: 'L1長さ(X)', unit: '', values: [60, 90, 120] },
                { id: 'y', label: 'L2長さ(Y)', unit: '', fixed: 50 },
                { id: 'alpha', label: 'L2角度(α)', unit: '°', values: [45, 60, 90] },
                { id: 'beta', label: 'コピー角度(β)', unit: '°', values: [15, 20, 30] }
            ],
            initial: { x: 70, y: 50, alpha: 30, beta: 60 },
            answer: { x: 90, y: 50, alpha: 60, beta: 20 }
        },
        3: {
            options: [
                { id: 'x', label: 'L1長さ(X)', unit: '', values: [70, 100] },
                { id: 'y', label: 'L2長さ(Y)', unit: '', values: [30, 50, 70] },
                { id: 'alpha', label: 'L2角度(α)', unit: '°', fixed: 90 },
                { id: 'beta', label: 'コピー角度(β)', unit: '°', values: [45, 90] }
            ],
            initial: { x: 70, y: 30, alpha: 90, beta: 45 },
            answer: { x: 100, y: 70, alpha: 90, beta: 90 }
        }
    };

    // --- 描画関数 (図形2) ---
    function drawShape2(canvas, params, highlights) {
        const ctx = canvas.getContext('2d');
        const { x, y, alpha, beta } = params;
        const { x: hl_x, y: hl_y, alpha: hl_alpha, beta: hl_beta } = highlights;

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const defaultStroke = '#2563eb';
        const toRad = Math.PI / 180;

        if (beta <= 0) return;
        const numCopies = Math.floor(360 / beta);
        const alphaRad = alpha * toRad;

        // コピー角度 (β) ハイライト
        if (hl_beta && numCopies > 1 && x > 0) {
            ctx.save();
            ctx.translate(centerX, centerY);
            const rad0 = -Math.PI / 2;
            const rad1 = (beta * toRad) - (Math.PI / 2);
            ctx.strokeStyle = HL_COPY_ROT;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(0, 0, Math.max(20, x / 2), rad0, rad1);
            ctx.stroke();
            ctx.fillStyle = HL_POINT;
            ctx.beginPath();
            ctx.arc(0, 0, 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        // 中心点Oハイライト
        if (hl_x || hl_alpha) {
             ctx.save();
             ctx.translate(centerX, centerY);
             ctx.fillStyle = (hl_x) ? HL_POINT : '#cccccc';
             ctx.beginPath();
             ctx.arc(0, 0, 5, 0, Math.PI * 2);
             ctx.fill();
             ctx.restore();
        }

        for (let i = 0; i < numCopies; i++) {
            const totalRotationRad = (i * beta) * toRad;
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(totalRotationRad);

            // L1 (長さ X)
            const isHighlightX = (i === 0 && hl_x);
            ctx.strokeStyle = isHighlightX ? HL_L1 : defaultStroke;
            ctx.lineWidth = isHighlightX ? 3 : 2;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, -x);
            ctx.stroke();

            // L2 (3本, 長さ Y)
            ctx.translate(0, -x); // 端点Mへ
            
            const isHighlightY = (i === 0 && hl_y);
            const isHighlightAlpha = (i === 0 && hl_alpha);
            
            // L2 - 真ん中
            ctx.strokeStyle = (isHighlightY) ? HL_SIDE : defaultStroke;
            ctx.lineWidth = (isHighlightY) ? 3 : 2;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, -y);
            ctx.stroke();

            // L2 - 右 (+α)
            ctx.strokeStyle = (isHighlightY) ? HL_SIDE : defaultStroke;
            ctx.lineWidth = (isHighlightY) ? 3 : 2;
            ctx.save();
            ctx.rotate(alphaRad);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, -y);
            ctx.stroke();
            ctx.restore();

            // L2 - 左 (-α)
            ctx.strokeStyle = (isHighlightY) ? HL_SIDE : defaultStroke;
            ctx.lineWidth = (isHighlightY) ? 3 : 2;
            ctx.save();
            ctx.rotate(-alphaRad);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, -y);
            ctx.stroke();
            ctx.restore();
            
            // L2角度 (α) ハイライト
            if (isHighlightAlpha && y > 0) {
                ctx.fillStyle = HL_POINT;
                ctx.beginPath();
                ctx.arc(0, 0, 4, 0, Math.PI * 2); // M点
                ctx.fill();
                
                ctx.strokeStyle = HL_TRI_ROT; // 紫
                ctx.lineWidth = 2;
                // 基準線 (真ん中)
                ctx.setLineDash([3, 3]);
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(0, -y);
                ctx.stroke();
                ctx.setLineDash([]);
                
                // 円弧 (★ 右のみ)
                ctx.beginPath();
                ctx.arc(0, 0, Math.max(10, y * 0.5), -Math.PI / 2, alphaRad - (Math.PI / 2));
                ctx.stroke();
            }
            ctx.restore(); // (i * beta) * toRad の回転を戻す
        }
    }

    // --- アイコン描画関数 (図形2) ---

    // L1長さ (X)
    function drawS2XIcon(canvasId) {
        // 図形1のL1アイコンと同じロジック
        const c = document.getElementById(canvasId); if (!c) return;
        const ctx = c.getContext('2d'); const [w, h] = [c.width, c.height];
        ctx.clearRect(0, 0, w, h); ctx.strokeStyle = HL_L1; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(w / 2, h * 0.8); ctx.lineTo(w / 2, h * 0.2); ctx.stroke();
        ctx.fillStyle = HL_POINT; ctx.beginPath(); ctx.arc(w / 2, h * 0.2, 3, 0, Math.PI * 2); ctx.fill();
    }
    // L2長さ (Y)
    function drawS2YIcon(canvasId) {
        // 図形1の辺アイコンと同じロジック
        const c = document.getElementById(canvasId); if (!c) return;
        const ctx = c.getContext('2d'); const [w, h] = [c.width, c.height];
        ctx.clearRect(0, 0, w, h); ctx.strokeStyle = HL_SIDE; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(w * 0.2, h * 0.5); ctx.lineTo(w * 0.8, h * 0.5); ctx.stroke();
    }
    // L2角度 (α)
    function drawS2AlphaIcon(canvasId) {
        const c = document.getElementById(canvasId); if (!c) return;
        const ctx = c.getContext('2d'); const [w, h] = [c.width, c.height];
        const [cx, cy] = [w / 2, h * 0.8]; const r = h * 0.6; const angle = Math.PI / 5; // 36度
        ctx.clearRect(0, 0, w, h); ctx.fillStyle = HL_POINT;
        ctx.beginPath(); ctx.arc(cx, cy, 3, 0, Math.PI * 2); ctx.fill(); // 中心点
        ctx.strokeStyle = HL_TRI_ROT; ctx.lineWidth = 2;
        
        // 基準線 (上)
        ctx.setLineDash([2, 2]);
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx, cy - r); ctx.stroke();
        // 右の線
        ctx.beginPath(); ctx.moveTo(cx, cy);
        ctx.lineTo(cx + r * Math.cos(angle - Math.PI/2), cy + r * Math.sin(angle - Math.PI/2));
        ctx.stroke();
        
        // 左の線 (描画はするが、ハイライト対象ではない)
        ctx.strokeStyle = DEFAULT_STROKE_ICON; // 色を変える
        ctx.beginPath(); ctx.moveTo(cx, cy);
        ctx.lineTo(cx + r * Math.cos(-angle - Math.PI/2), cy + r * Math.sin(-angle - Math.PI/2));
        ctx.stroke();
        ctx.setLineDash([]);
        
        // 円弧 (★ 右のみ)
        ctx.strokeStyle = HL_TRI_ROT; // 色を戻す
        ctx.beginPath();
        ctx.arc(cx, cy, r * 0.5, -Math.PI / 2, angle - Math.PI / 2);
        ctx.stroke();
    }
    // コピー角度 (β)
    function drawS2BetaIcon(canvasId) {
        // 図形1のコピー角度アイコンと同じロジック
        const c = document.getElementById(canvasId); if (!c) return;
        const ctx = c.getContext('2d'); const [w, h] = [c.width, c.height];
        const [cx, cy] = [w / 2, h / 2]; const r = h * 0.4; const angle = Math.PI / 3;
        ctx.clearRect(0, 0, w, h); ctx.fillStyle = HL_POINT;
        ctx.beginPath(); ctx.arc(cx, cy, 3, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = DEFAULT_STROKE_ICON; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx, cy - r); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(cx, cy);
        ctx.lineTo(cx + r * Math.cos(angle - Math.PI/2), cy + r * Math.sin(angle - Math.PI/2));
        ctx.stroke(); ctx.strokeStyle = HL_COPY_ROT; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(cx, cy, r * 0.7, -Math.PI / 2, angle - Math.PI / 2); ctx.stroke();
    }

    // --- メインスクリプトに図形定義を登録 ---
    if (!window.shapeDefinitions) {
        window.shapeDefinitions = {};
    }
    
    window.shapeDefinitions.shape2 = {
        name: '図形2',
        params: ['x', 'y', 'alpha', 'beta'],
        
        // DOM要素のID (文字列)
        sliderContainerId: 'shape2Sliders',
        sliderIdMap: { x: 's2_x', y: 's2_y', alpha: 's2_alpha', beta: 's2_beta' },
        valueLabelIds: {
            x: 's2_xValue',
            y: 's2_yValue',
            alpha: 's2_alphaValue',
            beta: 's2_betaValue'
        },
        highlightCheckboxName: 's2_highlight',
        
        // 関数とデータ
        drawFn: drawShape2,
        drawIconFns: {
            x: drawS2XIcon,
            y: drawS2YIcon,
            alpha: drawS2AlphaIcon,
            beta: drawS2BetaIcon
        },
        problemSet: problemSetShape2,
        
        iconCanvasIds: ['s2_label_icon_x', 's2_label_icon_y', 's2_label_icon_alpha', 's2_label_icon_beta', 's2_icon_x', 's2_icon_y', 's2_icon_alpha', 's2_icon_beta']
    };

})();