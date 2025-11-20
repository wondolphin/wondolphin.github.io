// shape2.js (図形2: 線と分岐)

(function() {

    // --- この図形のアニメーションIDを管理する配列 ---
    let activeAnimationFrames = [];

    // --- アニメーション停止関数 ---
    function stopShape2IconAnimations() {
        activeAnimationFrames.forEach(id => cancelAnimationFrame(id));
        activeAnimationFrames = [];
    }
    
    // --- アニメーションヘルパー (0 -> 1 -> 0 の繰り返し) ---
    function getPingPongValue(time, duration = 2000) {
        const cycle = (time % duration) / duration; // 0 -> 1
        return cycle < 0.5 ? cycle * 2 : 1 - (cycle - 0.5) * 2; // 0 -> 1 -> 0
    }


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

        // ★ [修正] 中心点Oハイライトはループの *後* に移動

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
            
            // L2角度 (α) ハイライト (M点)
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

        // ★ [修正] 中心点Oハイライトを最後に描画 (隠れないように)
        if (hl_x || hl_alpha) {
             ctx.save();
             ctx.translate(centerX, centerY);
             ctx.fillStyle = HL_POINT; // ★ 修正: どちらかがtrueなら必ず黄色
             ctx.beginPath();
             ctx.arc(0, 0, 5, 0, Math.PI * 2);
             ctx.fill();
             ctx.restore();
        }
    }

    // --- ★ アイコンアニメーション関数 (図形2) ---

    // L1長さ (X) - 伸縮 (shape1/animateS1L1Icon と同じ)
    function animateS2XIcon(canvasId) {
        const c = document.getElementById(canvasId); if (!c) return;
        const ctx = c.getContext('2d'); const [w, h] = [c.width, c.height];
        const [cx, cy] = [w / 2, h * 0.8]; // 基準点(下)
        const minY = h * 0.2; // 振れ幅 Min
        const maxY = h * 0.1; // 振れ幅 Max

        function loop(time) {
            const t = getPingPongValue(time, 1500); // 0 -> 1 -> 0
            const currentY = minY + (maxY - minY) * t; // h*0.2 -> h*0.1 -> h*0.2

            ctx.clearRect(0, 0, w, h); 
            ctx.strokeStyle = HL_L1; ctx.lineWidth = 3;
            ctx.beginPath(); 
            ctx.moveTo(cx, cy); // 下
            ctx.lineTo(cx, currentY); // 上 (伸縮)
            ctx.stroke();
            
            ctx.fillStyle = HL_POINT; 
            ctx.beginPath(); ctx.arc(cx, currentY, 3, 0, Math.PI * 2); ctx.fill(); 
            ctx.beginPath(); ctx.arc(cx, cy, 3, 0, Math.PI * 2); ctx.fill(); 
            
            const animId = requestAnimationFrame(loop);
            activeAnimationFrames.push(animId);
        }
        loop(0);
    }
    
    // L2長さ (Y) - 伸縮 (★ 縦に変更)
    function animateS2YIcon(canvasId) {
        const c = document.getElementById(canvasId); if (!c) return;
        const ctx = c.getContext('2d'); const [w, h] = [c.width, c.height];
        
        // ★ S1L1Icon (赤) と同じロジックで、色を HL_SIDE (緑) に変更
        const [cx, cy] = [w / 2, h * 0.8]; // 基準点(下)
        const minY = h * 0.2; // 振れ幅 Min
        const maxY = h * 0.1; // 振れ幅 Max

        function loop(time) {
            const t = getPingPongValue(time, 1500); // 0 -> 1 -> 0
            const currentY = minY + (maxY - minY) * t; // h*0.2 -> h*0.1 -> h*0.2

            ctx.clearRect(0, 0, w, h); 
            ctx.strokeStyle = HL_SIDE; // ★ 緑色に変更
            ctx.lineWidth = 3;
            ctx.beginPath(); 
            ctx.moveTo(cx, cy); // 下
            ctx.lineTo(cx, currentY); // 上 (伸縮)
            ctx.stroke();
            
            // ★ 点も緑色に変更
            ctx.fillStyle = HL_SIDE; 
            ctx.beginPath(); ctx.arc(cx, currentY, 3, 0, Math.PI * 2); ctx.fill(); 
            ctx.beginPath(); ctx.arc(cx, cy, 3, 0, Math.PI * 2); ctx.fill(); 
            
            const animId = requestAnimationFrame(loop);
            activeAnimationFrames.push(animId);
        }
        loop(0);
    }

    // L2角度 (α) - 回転 (30-45度, ★ 鏡像, 色変更, 円弧修正)
    function animateS2AlphaIcon(canvasId) {
        const c = document.getElementById(canvasId); if (!c) return;
        const ctx = c.getContext('2d'); const [w, h] = [c.width, c.height];
        const [cx, cy] = [w / 2, h * 0.8]; 
        const r = h * 0.7; // 少し長めに
        
        const angle1 = 30 * (Math.PI / 180); // 30度
        const angle2 = 45 * (Math.PI / 180); // 45度
        
        function loop(time) {
            const t = getPingPongValue(time, 2000); // 0 -> 1 -> 0
            const currentAngle = angle1 + (angle2 - angle1) * t; // 30 -> 45 -> 30

            ctx.clearRect(0, 0, w, h); 
            ctx.fillStyle = HL_POINT;
            ctx.beginPath(); ctx.arc(cx, cy, 3, 0, Math.PI * 2); ctx.fill(); // 中心点
            
            // ★ [修正] 基準線の後ろに緑の線を追加
            ctx.strokeStyle = HL_SIDE; // ★ 緑
            ctx.lineWidth = 2;
            ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx, cy - r); ctx.stroke();

            // 基準線 (真ん中・上)
            ctx.strokeStyle = HL_TRI_ROT; // 紫
            ctx.lineWidth = 2; 
            ctx.setLineDash([2, 2]);
            ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx, cy - r); ctx.stroke();
            ctx.setLineDash([]);
            
            // ★ [修正] 左側アニメーション線 (緑)
            ctx.strokeStyle = HL_SIDE; // ★ 緑に変更
            ctx.lineWidth = 2;
            ctx.beginPath(); ctx.moveTo(cx, cy);
            // ★ -currentAngle を使用して鏡像に
            ctx.lineTo(cx + r * Math.cos(-currentAngle - Math.PI/2), cy + r * Math.sin(-currentAngle - Math.PI/2));
            ctx.stroke();

            // ★ [修正] 右側アニメーション線 (緑)
            ctx.strokeStyle = HL_SIDE; // ★ 緑に変更
            ctx.lineWidth = 2;
            ctx.beginPath(); ctx.moveTo(cx, cy);
            ctx.lineTo(cx + r * Math.cos(currentAngle - Math.PI/2), cy + r * Math.sin(currentAngle - Math.PI/2));
            ctx.stroke();
            
            // ★ [修正] 円弧 (右側のみ)
            ctx.strokeStyle = HL_TRI_ROT; // 円弧は紫
            ctx.beginPath();
            ctx.arc(cx, cy, r * 0.5, -Math.PI / 2, currentAngle - Math.PI / 2);
            ctx.stroke();
            
            // ★ [修正] 左側円弧は描画しない
            
            const animId = requestAnimationFrame(loop);
            activeAnimationFrames.push(animId);
        }
        loop(0);
    }
    
    // コピー角度 (β) - 回転 (30-45度, ★ 基準線の色変更)
    function animateS2BetaIcon(canvasId) {
        const c = document.getElementById(canvasId); if (!c) return;
        const ctx = c.getContext('2d'); const [w, h] = [c.width, c.height];
        
        // ★ 中心点をさらに下げ (h*0.6 -> h*0.7)、線を長く (r=h*0.5 -> r=h*0.6)
        const [cx, cy] = [w / 2, h * 0.7]; // 変更
        const r = h * 0.6; // 変更
        
        const angle1 = 30 * (Math.PI / 180); // 30度
        const angle2 = 45 * (Math.PI / 180); // 45度

        function loop(time) {
            const t = getPingPongValue(time, 2000); // 0 -> 1 -> 0
            const currentAngle = angle1 + (angle2 - angle1) * t; // 30 -> 45 -> 30

            ctx.clearRect(0, 0, w, h); 
            ctx.fillStyle = HL_POINT;
            ctx.beginPath(); ctx.arc(cx, cy, 3, 0, Math.PI * 2); ctx.fill();

            // ★ [修正] 基準線 (真上) の色を赤に変更
            ctx.strokeStyle = HL_L1; // ★ 赤に変更
            ctx.lineWidth = 2;
            ctx.beginPath(); ctx.moveTo(cx, cy); 
            ctx.lineTo(cx, cy - r); // 真上
            ctx.stroke();
            
            // 回転する線 (★ 色は DEFAULT_STROKE_ICON (青) に戻す)
            ctx.strokeStyle = DEFAULT_STROKE_ICON;
            ctx.beginPath(); ctx.moveTo(cx, cy);
            ctx.lineTo(cx + r * Math.cos(currentAngle - Math.PI/2), cy + r * Math.sin(currentAngle - Math.PI/2));
            ctx.stroke(); 
            
            // 円弧
            ctx.strokeStyle = HL_COPY_ROT; // オレンジ
            ctx.lineWidth = 2;
            ctx.beginPath(); 
            ctx.arc(cx, cy, r * 0.7, -Math.PI / 2, currentAngle - Math.PI / 2);
            ctx.stroke();
            
            const animId = requestAnimationFrame(loop);
            activeAnimationFrames.push(animId);
        }
        loop(0);
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
        // ★ アニメーション関数に変更
        drawIconFns: {
            x: animateS2XIcon,
            y: animateS2YIcon,
            alpha: animateS2AlphaIcon,
            beta: animateS2BetaIcon
        },
        problemSet: problemSetShape2,
        
        // ★ アニメーション停止関数を登録
        stopIconAnimations: stopShape2IconAnimations,
        
        iconCanvasIds: ['s2_label_icon_x', 's2_label_icon_y', 's2_label_icon_alpha', 's2_label_icon_beta', 's2_icon_x', 's2_icon_y', 's2_icon_alpha', 's2_icon_beta']
    };

})();