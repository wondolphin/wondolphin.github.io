// shape10.js (図形10: 矢印型)

(function() {

    // --- アニメーション管理 ---
    let activeAnimationFrames = [];
    function stopShape10IconAnimations() {
        activeAnimationFrames.forEach(id => cancelAnimationFrame(id));
        activeAnimationFrames = [];
    }
    function getPingPongValue(time, duration = 2000) {
        const cycle = (time % duration) / duration;
        return cycle < 0.5 ? cycle * 2 : 1 - (cycle - 0.5) * 2;
    }

    // --- 問題データ ---
    const problemSetShape10 = {
        1: {
            options: [
                { id: 'l1', label: '軸の長さ(L1)', unit: '', fixed: 100 },
                { id: 'l2', label: '矢の長さ(L2)', unit: '', values: [40, 50, 60] },
                { id: 'alpha', label: '矢の角度(α)', unit: '°', values: [30, 45, 60] }
            ],
            initial: { l1: 100, l2: 40, alpha: 30 },
            answer: { l1: 100, l2: 50, alpha: 45 }
        },
        2: {
            options: [
                { id: 'l1', label: '軸の長さ(L1)', unit: '', values: [80, 100, 120] },
                { id: 'l2', label: '矢の長さ(L2)', unit: '', fixed: 40 },
                { id: 'alpha', label: '矢の角度(α)', unit: '°', values: [40, 50] }
            ],
            initial: { l1: 120, l2: 40, alpha: 50 },
            answer: { l1: 100, l2: 40, alpha: 40 }
        },
        3: {
            options: [
                { id: 'l1', label: '軸の長さ(L1)', unit: '', values: [90, 110] },
                { id: 'l2', label: '矢の長さ(L2)', unit: '', values: [30, 40] },
                { id: 'alpha', label: '矢の角度(α)', unit: '°', values: [20, 30] }
            ],
            initial: { l1: 90, l2: 30, alpha: 20 },
            answer: { l1: 110, l2: 40, alpha: 30 }
        }
    };

    // --- 描画関数 ---
    function drawShape10(canvas, params, highlights) {
        const ctx = canvas.getContext('2d');
        const { l1, l2, alpha } = params;
        const { l1: hl_l1, l2: hl_l2, alpha: hl_alpha } = highlights;

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 定数が未定義の場合のフォールバック
        const C_HL_L1 = (typeof HL_L1 !== 'undefined') ? HL_L1 : '#ef4444';
        const C_HL_SIDE = (typeof HL_SIDE !== 'undefined') ? HL_SIDE : '#22c55e';
        const C_HL_TRI_ROT = (typeof HL_TRI_ROT !== 'undefined') ? HL_TRI_ROT : '#a855f7';
        const C_HL_POINT = (typeof HL_POINT !== 'undefined') ? HL_POINT : '#eab308';
        const defaultStroke = '#2563eb'; // blue
        
        const toRad = Math.PI / 180;

        // 中心を基準に配置 (L1の中点をキャンバス中心に)
        const topY = centerY - l1 / 2;
        const bottomY = centerY + l1 / 2;
        const tipX = centerX;
        const tipY = topY;

        ctx.save();

        // --- 軸 (L1) ---
        ctx.strokeStyle = hl_l1 ? C_HL_L1 : defaultStroke;
        ctx.lineWidth = hl_l1 ? 3 : 2;
        ctx.beginPath();
        ctx.moveTo(tipX, topY);
        ctx.lineTo(tipX, bottomY);
        ctx.stroke();

        // --- 矢 (L2) ---
        const rightRad = (90 + alpha) * toRad;
        const leftRad = (90 - alpha) * toRad;

        const rightTipX = tipX + l2 * Math.cos(rightRad);
        const rightTipY = tipY + l2 * Math.sin(rightRad);
        const leftTipX = tipX + l2 * Math.cos(leftRad);
        const leftTipY = tipY + l2 * Math.sin(leftRad);

        ctx.strokeStyle = hl_l2 ? C_HL_SIDE : defaultStroke;
        ctx.lineWidth = hl_l2 ? 3 : 2;
        
        // 右
        ctx.beginPath();
        ctx.moveTo(tipX, tipY);
        ctx.lineTo(rightTipX, rightTipY);
        ctx.stroke();
        
        // 左
        ctx.beginPath();
        ctx.moveTo(tipX, tipY);
        ctx.lineTo(leftTipX, leftTipY);
        ctx.stroke();

        // --- 角度 α ハイライト ---
        if (hl_alpha && l2 > 0) {
            ctx.strokeStyle = C_HL_TRI_ROT;
            ctx.lineWidth = 2;
            const arcR = Math.min(30, l2 * 0.5);
            ctx.beginPath();
            ctx.arc(tipX, tipY, arcR, 90 * toRad, rightRad);
            ctx.stroke();
        }

        // 中心点 (頂点)
        if (hl_l1 || hl_l2 || hl_alpha) {
            ctx.fillStyle = C_HL_POINT;
            ctx.beginPath();
            ctx.arc(tipX, tipY, 5, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();
    }

    // --- アイコンアニメーション ---

    // L1: 軸の長さ (縦伸縮)
    function animateS10L1Icon(canvasId) {
        const c = document.getElementById(canvasId); if (!c) return;
        const ctx = c.getContext('2d'); const [w, h] = [c.width, c.height];
        const cx = w / 2;
        const topY = h * 0.2;
        
        const C_HL_L1 = (typeof HL_L1 !== 'undefined') ? HL_L1 : '#ef4444';
        const C_HL_POINT = (typeof HL_POINT !== 'undefined') ? HL_POINT : '#eab308';

        const minLen = h * 0.5;
        const maxLen = h * 0.6;

        function loop(time) {
            const t = getPingPongValue(time, 1500);
            const curL1 = minLen + (maxLen - minLen) * t;

            ctx.clearRect(0, 0, w, h);
            
            // 軸 (赤)
            ctx.strokeStyle = C_HL_L1; ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(cx, topY);
            ctx.lineTo(cx, topY + curL1);
            ctx.stroke();
            
            // 頂点
            ctx.fillStyle = C_HL_POINT;
            ctx.beginPath(); ctx.arc(cx, topY, 3, 0, Math.PI * 2); ctx.fill();

            const animId = requestAnimationFrame(loop);
            activeAnimationFrames.push(animId);
        }
        loop(0);
    }

    // L2: 矢の長さ (伸縮)
    function animateS10L2Icon(canvasId) {
        const c = document.getElementById(canvasId); if (!c) return;
        const ctx = c.getContext('2d'); const [w, h] = [c.width, c.height];
        const cx = w / 2;
        const topY = h * 0.2;
        
        const C_HL_SIDE = (typeof HL_SIDE !== 'undefined') ? HL_SIDE : '#22c55e';
        const C_HL_POINT = (typeof HL_POINT !== 'undefined') ? HL_POINT : '#eab308';
        
        const minLen = h * 0.4;
        const maxLen = h * 0.5;

        function loop(time) {
            const t = getPingPongValue(time, 1500);
            const curL2 = minLen + (maxLen - minLen) * t;
            const rad = (90 + 45) * Math.PI / 180; // 右下45度

            ctx.clearRect(0, 0, w, h);

            // 矢 (緑)
            ctx.strokeStyle = C_HL_SIDE; ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(cx, topY);
            ctx.lineTo(cx + curL2 * Math.cos(rad), topY + curL2 * Math.sin(rad));
            ctx.stroke();
            
            // 頂点
            ctx.fillStyle = C_HL_POINT;
            ctx.beginPath(); ctx.arc(cx, topY, 3, 0, Math.PI * 2); ctx.fill();

            const animId = requestAnimationFrame(loop);
            activeAnimationFrames.push(animId);
        }
        loop(0);
    }

    // Alpha: 角度 (回転)
    function animateS10AlphaIcon(canvasId) {
        const c = document.getElementById(canvasId); if (!c) return;
        const ctx = c.getContext('2d'); const [w, h] = [c.width, c.height];
        const cx = w / 2;
        const topY = h * 0.2;
        const l2 = h * 0.5;

        // 色定数の取得（未定義時のフォールバック付き）
        const C_HL_L1 = (typeof HL_L1 !== 'undefined') ? HL_L1 : '#ef4444';
        const C_HL_SIDE = (typeof HL_SIDE !== 'undefined') ? HL_SIDE : '#22c55e';
        const C_HL_TRI_ROT = (typeof HL_TRI_ROT !== 'undefined') ? HL_TRI_ROT : '#a855f7';
        const C_HL_POINT = (typeof HL_POINT !== 'undefined') ? HL_POINT : '#eab308';
        
        const minAng = 40;
        const maxAng = 50;

        function loop(time) {
            const t = getPingPongValue(time, 2000);
            const curAng = minAng + (maxAng - minAng) * t;
            const rad = (90 + curAng) * Math.PI / 180;

            ctx.clearRect(0, 0, w, h);
            
            // 軸 (赤) - 基準線
            // ★ここを変更: デフォルト色(青)からL1と同じ色(赤)に変更
            ctx.strokeStyle = C_HL_L1; ctx.lineWidth = 2;
            ctx.beginPath(); ctx.moveTo(cx, topY); ctx.lineTo(cx, topY + h*0.6); ctx.stroke();

            // 矢 (緑)
            ctx.strokeStyle = C_HL_SIDE; ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(cx, topY);
            ctx.lineTo(cx + l2 * Math.cos(rad), topY + l2 * Math.sin(rad));
            ctx.stroke();
            
            // 角度 (紫)
            ctx.strokeStyle = C_HL_TRI_ROT; ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(cx, topY, l2 * 0.5, 90 * Math.PI/180, rad);
            ctx.stroke();

            // 頂点
            ctx.fillStyle = C_HL_POINT;
            ctx.beginPath(); ctx.arc(cx, topY, 3, 0, Math.PI * 2); ctx.fill();

            const animId = requestAnimationFrame(loop);
            activeAnimationFrames.push(animId);
        }
        loop(0);
    }

    // --- 登録 ---
    if (!window.shapeDefinitions) window.shapeDefinitions = {};
    
    window.shapeDefinitions.shape10 = {
        name: '図形10',
        params: ['l1', 'l2', 'alpha'],
        sliderContainerId: 'shape10Sliders',
        sliderIdMap: { l1: 's10_l1', l2: 's10_l2', alpha: 's10_alpha' },
        valueLabelIds: { l1: 's10_l1Value', l2: 's10_l2Value', alpha: 's10_alphaValue' },
        highlightCheckboxName: 's10_highlight',
        drawFn: drawShape10,
        drawIconFns: {
            l1: animateS10L1Icon,
            l2: animateS10L2Icon,
            alpha: animateS10AlphaIcon
        },
        problemSet: problemSetShape10,
        stopIconAnimations: stopShape10IconAnimations,
        iconCanvasIds: [
            's10_label_icon_l1', 's10_label_icon_l2', 's10_label_icon_alpha',
            's10_icon_l1', 's10_icon_l2', 's10_icon_alpha'
        ]
    };
})();