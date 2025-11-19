// shape9.js (図形9: T字型)

(function() {

    // --- アニメーション管理 ---
    let activeAnimationFrames = [];
    function stopShape9IconAnimations() {
        activeAnimationFrames.forEach(id => cancelAnimationFrame(id));
        activeAnimationFrames = [];
    }
    function getPingPongValue(time, duration = 2000) {
        const cycle = (time % duration) / duration;
        return cycle < 0.5 ? cycle * 2 : 1 - (cycle - 0.5) * 2;
    }

    // --- 問題データ ---
    const problemSetShape9 = {
        1: {
            options: [
                { id: 'l1', label: '上の幅(L1)', unit: '', values: [80, 100, 120] },
                { id: 'l2', label: '上の高さ(L2)', unit: '', fixed: 40 },
                { id: 'l3', label: '下の高さ(L3)', unit: '', values: [60, 80] },
                { id: 'l4', label: '下の幅(L4)', unit: '', fixed: 30 }
            ],
            initial: { l1: 80, l2: 40, l3: 60, l4: 30 },
            answer: { l1: 100, l2: 40, l3: 80, l4: 30 }
        },
        2: {
            options: [
                { id: 'l1', label: '上の幅(L1)', unit: '', fixed: 100 },
                { id: 'l2', label: '上の高さ(L2)', unit: '', values: [30, 50] },
                { id: 'l3', label: '下の高さ(L3)', unit: '', fixed: 60 },
                { id: 'l4', label: '下の幅(L4)', unit: '', values: [20, 40] }
            ],
            initial: { l1: 100, l2: 30, l3: 60, l4: 20 },
            answer: { l1: 100, l2: 50, l3: 60, l4: 40 }
        },
        3: {
            options: [
                { id: 'l1', label: '上の幅(L1)', unit: '', values: [100, 120] },
                { id: 'l2', label: '上の高さ(L2)', unit: '', values: [30, 40] },
                { id: 'l3', label: '下の高さ(L3)', unit: '', values: [70, 90] },
                { id: 'l4', label: '下の幅(L4)', unit: '', values: [20, 30] }
            ],
            initial: { l1: 120, l2: 30, l3: 90, l4: 20 },
            answer: { l1: 100, l2: 40, l3: 70, l4: 30 }
        }
    };

    // --- 描画関数 ---
    function drawShape9(canvas, params, highlights) {
        const ctx = canvas.getContext('2d');
        const { l1, l2, l3, l4 } = params;
        const { l1: hl_l1, l2: hl_l2, l3: hl_l3, l4: hl_l4 } = highlights;

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const fillStyle = '#854d0e'; // brown-700
        const strokeStyle = '#5f370e'; // brown-900

        // 全体の高さと開始Y座標 (中央揃え)
        const totalH = l2 + l3;
        const startY = centerY - totalH / 2;

        ctx.save();
        ctx.translate(centerX, startY);

        // --- 上の長方形 (l1, l2) ---
        const topX = -l1 / 2;
        const topY = 0;
        ctx.fillStyle = fillStyle;
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = 2;
        ctx.fillRect(topX, topY, l1, l2);
        ctx.strokeRect(topX, topY, l1, l2);

        // L1ハイライト (上の幅)
        if (hl_l1) {
            ctx.strokeStyle = HL_L1; // Red
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(topX, topY); // 左上
            ctx.lineTo(topX + l1, topY); // 右上
            ctx.stroke();
        }
        // L2ハイライト (上の高さ)
        if (hl_l2) {
            ctx.strokeStyle = HL_SIDE; // Green
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(topX, topY); // 左上
            ctx.lineTo(topX, topY + l2); // 左下
            ctx.stroke();
        }

        // --- 下の長方形 (l4, l3) ---
        const bottomX = -l4 / 2;
        const bottomY = l2; // 上の長方形の下
        ctx.fillStyle = fillStyle;
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = 2;
        ctx.fillRect(bottomX, bottomY, l4, l3);
        ctx.strokeRect(bottomX, bottomY, l4, l3);

        // L3ハイライト (下の高さ)
        if (hl_l3) {
            ctx.strokeStyle = HL_TRI_ROT; // Purple
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(bottomX, bottomY); // 左上
            ctx.lineTo(bottomX, bottomY + l3); // 左下
            ctx.stroke();
        }
        // L4ハイライト (下の幅)
        if (hl_l4) {
            ctx.strokeStyle = HL_COPY_ROT; // Orange
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(bottomX, bottomY + l3); // 左下
            ctx.lineTo(bottomX + l4, bottomY + l3); // 右下
            ctx.stroke();
        }

        ctx.restore();
    }

    // --- アイコンアニメーション ---
    
    // L1: 上の幅 (横伸縮)
    function animateS9L1Icon(canvasId) {
        const c = document.getElementById(canvasId); if (!c) return;
        const ctx = c.getContext('2d'); const [w, h] = [c.width, c.height];
        const cx = w / 2;
        
        const l2 = h * 0.25; // 固定高さ
        const l3 = h * 0.4;
        const l4 = w * 0.2;
        const topY = h * 0.15;

        const minW = w * 0.5; 
        const maxW = w * 0.6;

        function loop(time) {
            const t = getPingPongValue(time, 1500);
            const curL1 = minW + (maxW - minW) * t;
            
            ctx.clearRect(0, 0, w, h);
            
            // 上の長方形
            ctx.fillStyle = '#854d0e'; 
            ctx.fillRect(cx - curL1/2, topY, curL1, l2);
            
            // 下の長方形
            ctx.fillRect(cx - l4/2, topY + l2, l4, l3);
            
            // ハイライト (赤)
            ctx.strokeStyle = HL_L1; ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(cx - curL1/2, topY);
            ctx.lineTo(cx + curL1/2, topY);
            ctx.stroke();

            const animId = requestAnimationFrame(loop);
            activeAnimationFrames.push(animId);
        }
        loop(0);
    }

    // L2: 上の高さ (縦伸縮)
    function animateS9L2Icon(canvasId) {
        const c = document.getElementById(canvasId); if (!c) return;
        const ctx = c.getContext('2d'); const [w, h] = [c.width, c.height];
        const cx = w / 2;

        const l1 = w * 0.6;
        const l3 = h * 0.3;
        const l4 = w * 0.2;
        const bottomBaseY = h * 0.85; // 全体の下端基準

        const minH = h * 0.2; 
        const maxH = h * 0.3;

        function loop(time) {
            const t = getPingPongValue(time, 1500);
            const curL2 = minH + (maxH - minH) * t;
            
            // 下から積み上げる計算
            const midY = bottomBaseY - l3; // 下の長方形の上端
            const topY = midY - curL2;     // 上の長方形の上端

            ctx.clearRect(0, 0, w, h);
            
            // 下の長方形
            ctx.fillStyle = '#854d0e'; 
            ctx.fillRect(cx - l4/2, midY, l4, l3);
            
            // 上の長方形
            ctx.fillRect(cx - l1/2, topY, l1, curL2);
            
            // ハイライト (緑) - 左端
            ctx.strokeStyle = HL_SIDE; ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(cx - l1/2, topY);
            ctx.lineTo(cx - l1/2, midY);
            ctx.stroke();

            const animId = requestAnimationFrame(loop);
            activeAnimationFrames.push(animId);
        }
        loop(0);
    }

    // L3: 下の高さ (縦伸縮)
    function animateS9L3Icon(canvasId) {
        const c = document.getElementById(canvasId); if (!c) return;
        const ctx = c.getContext('2d'); const [w, h] = [c.width, c.height];
        const cx = w / 2;

        const l1 = w * 0.6;
        const l2 = h * 0.2;
        const l4 = w * 0.2;
        const topY = h * 0.15; // 上端基準

        const minH = h * 0.4; 
        const maxH = h * 0.5;

        function loop(time) {
            const t = getPingPongValue(time, 1500);
            const curL3 = minH + (maxH - minH) * t;
            
            ctx.clearRect(0, 0, w, h);
            
            // 上の長方形
            ctx.fillStyle = '#854d0e'; 
            ctx.fillRect(cx - l1/2, topY, l1, l2);
            
            // 下の長方形
            ctx.fillRect(cx - l4/2, topY + l2, l4, curL3);
            
            // ハイライト (紫) - 下の長方形の左端
            ctx.strokeStyle = HL_TRI_ROT; ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(cx - l4/2, topY + l2);
            ctx.lineTo(cx - l4/2, topY + l2 + curL3);
            ctx.stroke();

            const animId = requestAnimationFrame(loop);
            activeAnimationFrames.push(animId);
        }
        loop(0);
    }

    // L4: 下の幅 (横伸縮)
    function animateS9L4Icon(canvasId) {
        const c = document.getElementById(canvasId); if (!c) return;
        const ctx = c.getContext('2d'); const [w, h] = [c.width, c.height];
        const cx = w / 2;

        const l1 = w * 0.6;
        const l2 = h * 0.25;
        const l3 = h * 0.4;
        const topY = h * 0.15;

        const minW = w * 0.3; 
        const maxW = w * 0.4;

        function loop(time) {
            const t = getPingPongValue(time, 1500);
            const curL4 = minW + (maxW - minW) * t;
            
            ctx.clearRect(0, 0, w, h);
            
            // 上の長方形
            ctx.fillStyle = '#854d0e'; 
            ctx.fillRect(cx - l1/2, topY, l1, l2);
            
            // 下の長方形
            ctx.fillRect(cx - curL4/2, topY + l2, curL4, l3);
            
            // ハイライト (オレンジ) - 下端
            ctx.strokeStyle = HL_COPY_ROT; ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(cx - curL4/2, topY + l2 + l3);
            ctx.lineTo(cx + curL4/2, topY + l2 + l3);
            ctx.stroke();

            const animId = requestAnimationFrame(loop);
            activeAnimationFrames.push(animId);
        }
        loop(0);
    }

    // --- 登録 ---
    if (!window.shapeDefinitions) window.shapeDefinitions = {};
    
    window.shapeDefinitions.shape9 = {
        name: '図形9',
        params: ['l1', 'l2', 'l3', 'l4'],
        sliderContainerId: 'shape9Sliders',
        sliderIdMap: { l1: 's9_l1', l2: 's9_l2', l3: 's9_l3', l4: 's9_l4' },
        valueLabelIds: { l1: 's9_l1Value', l2: 's9_l2Value', l3: 's9_l3Value', l4: 's9_l4Value' },
        highlightCheckboxName: 's9_highlight',
        drawFn: drawShape9,
        drawIconFns: {
            l1: animateS9L1Icon,
            l2: animateS9L2Icon,
            l3: animateS9L3Icon,
            l4: animateS9L4Icon
        },
        problemSet: problemSetShape9,
        stopIconAnimations: stopShape9IconAnimations,
        iconCanvasIds: [
            's9_label_icon_l1', 's9_label_icon_l2', 's9_label_icon_l3', 's9_label_icon_l4', 
            's9_icon_l1', 's9_icon_l2', 's9_icon_l3', 's9_icon_l4'
        ]
    };
})();