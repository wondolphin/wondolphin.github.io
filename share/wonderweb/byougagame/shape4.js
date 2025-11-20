// shape4.js (図形4: 円と楕円)

(function() {

    // --- この図形のアニメーションIDを管理する配列 ---
    let activeAnimationFrames = [];

    // --- アニメーション停止関数 ---
    function stopShape4IconAnimations() {
        activeAnimationFrames.forEach(id => cancelAnimationFrame(id));
        activeAnimationFrames = [];
    }
    
    // --- アニメーションヘルパー (0 -> 1 -> 0 の繰り返し) ---
    function getPingPongValue(time, duration = 2000) {
        const cycle = (time % duration) / duration; // 0 -> 1
        return cycle < 0.5 ? cycle * 2 : 1 - (cycle - 0.5) * 2; // 0 -> 1 -> 0
    }

    // --- 問題データ (図形4) ---
    // (変更なし)
    const problemSetShape4 = {
        1: {
            options: [
                { id: 'r', label: '円半径(R)', unit: '', values: [80, 100, 120] },
                { id: 'sa', label: '楕円短半径(SA)', unit: '', fixed: 75 },
                { id: 'la', label: '楕円長半径(LA)', unit: '', values: [100, 125] }
            ],
            initial: { r: 80, sa: 75, la: 100 },
            answer: { r: 100, sa: 75, la: 125 }
        },
        2: {
            options: [
                { id: 'r', label: '円半径(R)', unit: '', fixed: 100 },
                { id: 'sa', label: '楕円短半径(SA)', unit: '', values: [50, 75, 100] },
                { id: 'la', label: '楕円長半径(LA)', unit: '', values: [50, 75, 100] }
            ],
            initial: { r: 100, sa: 100, la: 50 },
            answer: { r: 100, sa: 75, la: 75 } // 短半径=長半径 -> 円
        },
        3: {
            options: [
                { id: 'r', label: '円半径(R)', unit: '', values: [50, 70] },
                { id: 'sa', label: '楕円短半径(SA)', unit: '', values: [50, 60] },
                { id: 'la', label: '楕円長半径(LA)', unit: '', values: [75, 90] }
            ],
            initial: { r: 50, sa: 50, la: 75 },
            answer: { r: 70, sa: 60, la: 90 }
        }
    };

    // --- 描画関数 (図形4) ---
    function drawShape4(canvas, params, highlights) {
        const ctx = canvas.getContext('2d');
        const { r, sa, la } = params; // sa, la は半径
        const { r: hl_r, sa: hl_sa, la: hl_la } = highlights;

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const defaultStroke = '#2563eb';
        const defaultFill = 'rgba(59, 130, 246, 0.1)';
        
        // ★ [修正] 円のスタイルを黄色に変更
        const circleFill = 'rgba(234, 179, 8, 0.2)'; // Yellow (HL_POINT) + alpha
        const circleStroke = '#ca8a04'; // yellow-600

        // 楕円 (青)
        ctx.strokeStyle = defaultStroke;
        ctx.fillStyle = defaultFill;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, la, sa, 0, 0, 2 * Math.PI); // 半径
        ctx.fill();
        ctx.stroke();

        // 円 (★ 黄色に変更)
        ctx.fillStyle = circleFill;
        ctx.strokeStyle = circleStroke;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        
        // ハイライト
        if (hl_r) {
            ctx.strokeStyle = HL_L1; // Red
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(centerX + r, centerY);
            ctx.stroke();
        }
        if (hl_sa) {
            ctx.strokeStyle = HL_SIDE; // Green
            ctx.lineWidth = 3;
            ctx.setLineDash([3, 3]);
            ctx.beginPath();
            ctx.moveTo(centerX, centerY - sa); // 半径
            ctx.lineTo(centerX, centerY + sa); // 半径
            ctx.stroke();
            ctx.setLineDash([]);
        }
        if (hl_la) {
            ctx.strokeStyle = HL_TRI_ROT; // Purple
            ctx.lineWidth = 3;
            ctx.setLineDash([3, 3]);
            ctx.beginPath();
            ctx.moveTo(centerX - la, centerY); // 半径
            ctx.lineTo(centerX + la, centerY); // 半径
            ctx.stroke();
            ctx.setLineDash([]);
        }
    }

    // --- ★ アイコンアニメーション関数 (図形4) ---

    // R (円半径) - 伸縮
    function animateS4RIcon(canvasId) {
        const c = document.getElementById(canvasId); if (!c) return;
        const ctx = c.getContext('2d'); const [w, h] = [c.width, c.height];
        const [cx, cy] = [w/2, h/2];
        
        const minR = h * 0.3; // 振れ幅 Min
        const maxR = h * 0.4; // 振れ幅 Max
        
        // ★ 円のスタイルを黄色に変更
        const circleFill = 'rgba(234, 179, 8, 0.2)';
        const circleStroke = '#ca8a04';

        function loop(time) {
            const t = getPingPongValue(time, 1500); // 0 -> 1 -> 0
            const currentR = minR + (maxR - minR) * t; // h*0.2 -> h*0.45 -> h*0.2

            ctx.clearRect(0, 0, w, h);
            
            // 背景の円 (黄色)
            ctx.fillStyle = circleFill;
            ctx.strokeStyle = circleStroke;
            ctx.lineWidth = 2;
            ctx.beginPath(); 
            ctx.arc(cx, cy, currentR, 0, Math.PI * 2); 
            ctx.fill();
            ctx.stroke();
            
            // アニメーションする半径ハイライト (赤)
            ctx.strokeStyle = HL_L1; ctx.lineWidth = 3;
            ctx.beginPath(); 
            ctx.moveTo(cx, cy); 
            ctx.lineTo(cx + currentR, cy); // 右 (伸縮)
            ctx.stroke();
            
            const animId = requestAnimationFrame(loop);
            activeAnimationFrames.push(animId);
        }
        loop(0);
    }
    
    // SA (楕円短半径) - 縦伸縮
    function animateS4SAIcon(canvasId) {
        const c = document.getElementById(canvasId); if (!c) return;
        const ctx = c.getContext('2d'); const [w, h] = [c.width, c.height];
        const [cx, cy] = [w/2, h/2];
        
        const rx = w * 0.3; // 横半径は固定
        const minRY = h * 0.3; // 振れ幅 Min
        const maxRY = h * 0.4;  // 振れ幅 Max

        function loop(time) {
            const t = getPingPongValue(time, 1500); // 0 -> 1 -> 0
            const currentRY = minRY + (maxRY - minRY) * t; // h*0.15 -> h*0.4 -> h*0.15

            ctx.clearRect(0, 0, w, h);
            
            // 背景の楕円 (青)
            ctx.strokeStyle = DEFAULT_STROKE_ICON; ctx.lineWidth = 2;
            ctx.beginPath(); 
            ctx.ellipse(cx, cy, rx, currentRY, 0, 0, Math.PI * 2);
            ctx.stroke();
            
            // アニメーションする短半径ハイライト (緑)
            ctx.strokeStyle = HL_SIDE; ctx.lineWidth = 3;
            ctx.setLineDash([2, 2]);
            ctx.beginPath(); 
            ctx.moveTo(cx, cy - currentRY); // 上 (伸縮)
            ctx.lineTo(cx, cy + currentRY); // 下 (伸縮)
            ctx.stroke();
            ctx.setLineDash([]);
            
            const animId = requestAnimationFrame(loop);
            activeAnimationFrames.push(animId);
        }
        loop(0);
    }

    // LA (楕円長半径) - 横伸縮
    function animateS4LAIcon(canvasId) {
        const c = document.getElementById(canvasId); if (!c) return;
        const ctx = c.getContext('2d'); const [w, h] = [c.width, c.height];
        const [cx, cy] = [w/2, h/2];
        
        const ry = h * 0.3; // 縦半径は固定
        const minRX = w * 0.3; // 振れ幅 Min
        const maxRX = w * 0.4; // 振れ幅 Max

        function loop(time) {
            const t = getPingPongValue(time, 1500); // 0 -> 1 -> 0
            const currentRX = minRX + (maxRX - minRX) * t; // w*0.2 -> w*0.45 -> w*0.2

            ctx.clearRect(0, 0, w, h);
            
            // 背景の楕円 (青)
            ctx.strokeStyle = DEFAULT_STROKE_ICON; ctx.lineWidth = 2;
            ctx.beginPath(); 
            ctx.ellipse(cx, cy, currentRX, ry, 0, 0, Math.PI * 2);
            ctx.stroke();
            
            // アニメーションする長半径ハイライト (紫)
            ctx.strokeStyle = HL_TRI_ROT; ctx.lineWidth = 3;
            ctx.setLineDash([2, 2]);
            ctx.beginPath(); 
            ctx.moveTo(cx - currentRX, cy); // 左 (伸縮)
            ctx.lineTo(cx + currentRX, cy); // 右 (伸縮)
            ctx.stroke();
            ctx.setLineDash([]);
            
            const animId = requestAnimationFrame(loop);
            activeAnimationFrames.push(animId);
        }
        loop(0);
    }

    // --- メインスクリプトに図形定義を登録 ---
    if (!window.shapeDefinitions) {
        window.shapeDefinitions = {};
    }
    
    window.shapeDefinitions.shape4 = {
        name: '図形4',
        params: ['r', 'sa', 'la'],
        
        // DOM要素のID (文字列)
        sliderContainerId: 'shape4Sliders',
        sliderIdMap: { r: 's4_r', sa: 's4_sa', la: 's4_la' },
        valueLabelIds: {
            r: 's4_rValue',
            sa: 's4_saValue',
            la: 's4_laValue'
        },
        highlightCheckboxName: 's4_highlight',
        
        // 関数とデータ
        drawFn: drawShape4,
        // ★ アニメーション関数に変更
        drawIconFns: {
            r: animateS4RIcon,
            sa: animateS4SAIcon,
            la: animateS4LAIcon
        },
        problemSet: problemSetShape4,
        
        // ★ アニメーション停止関数を登録
        stopIconAnimations: stopShape4IconAnimations,
        
        iconCanvasIds: ['s4_label_icon_r', 's4_label_icon_sa', 's4_label_icon_la', 's4_icon_r', 's4_icon_sa', 's4_icon_la']
    };

})();