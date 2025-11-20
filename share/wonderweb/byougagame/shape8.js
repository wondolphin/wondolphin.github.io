// shape8.js (図形8: くまで)

(function() {

    // --- この図形のアニメーションIDを管理する配列 ---
    let activeAnimationFrames = [];

    // --- アニメーション停止関数 ---
    function stopShape8IconAnimations() {
        activeAnimationFrames.forEach(id => cancelAnimationFrame(id));
        activeAnimationFrames = [];
    }
    
    // --- アニメーションヘルパー (0 -> 1 -> 0 の繰り返し) ---
    function getPingPongValue(time, duration = 2000) {
        const cycle = (time % duration) / duration; // 0 -> 1
        return cycle < 0.5 ? cycle * 2 : 1 - (cycle - 0.5) * 2; // 0 -> 1 -> 0
    }

    // --- 問題データ (図形8) ---
    // (変更なし)
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

        // ★ [修正] 中心点Oハイライトを削除 (ループの後で描画するため)

        
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

        // ★ [修正] 中心点Oハイライトを最前面 (最後) に描画
        if (hl_l1 || hl_l2 || hl_alpha) {
             ctx.fillStyle = HL_POINT;
             ctx.beginPath();
             ctx.arc(0, 0, 5, 0, Math.PI * 2);
             ctx.fill();
        }

        ctx.restore();
    }

    // --- ★ アイコンアニメーション関数 (図形8) ---

    // 柄の長さ(L1) - 縦伸縮 (下向き)
    function animateS8L1Icon(canvasId) {
        const c = document.getElementById(canvasId); if (!c) return;
        const ctx = c.getContext('2d'); const [w, h] = [c.width, c.height];
        const [cx, cy] = [w / 2, h * 0.2]; // 基準点(上)

        // ★ [修正] 振れ幅を狭く (h*0.4 -> h*0.2)
        const minLen = h * 0.5; // 変更 (0.2 -> 0.3)
        const maxLen = h * 0.6; // 変更 (0.6 -> 0.5)

        function loop(time) {
            const t = getPingPongValue(time, 1500); // 0 -> 1 -> 0
            const currentLen = minLen + (maxLen - minLen) * t;

            ctx.clearRect(0, 0, w, h);
            
            // 線 (赤)
            ctx.strokeStyle = HL_L1; ctx.lineWidth = 3;
            ctx.beginPath(); 
            ctx.moveTo(cx, cy); 
            ctx.lineTo(cx, cy + currentLen); // 下へ伸縮
            ctx.stroke();
            
            // 点
            ctx.fillStyle = HL_POINT; 
            ctx.beginPath(); ctx.arc(cx, cy, 3, 0, Math.PI * 2); ctx.fill(); // 基準点 (上) のみ描画
            // ★ [修正] 移動点 (下) の描画を削除
            
            const animId = requestAnimationFrame(loop);
            activeAnimationFrames.push(animId);
        }
        loop(0);
    }
    
    // 歯の長さ(L2) - 縦伸縮 (上向き)
    function animateS8L2Icon(canvasId) {
        const c = document.getElementById(canvasId); if (!c) return;
        const ctx = c.getContext('2d'); const [w, h] = [c.width, c.height];
        const [cx, cy] = [w / 2, h * 0.8]; // 基準点(下)

        // ★ [修正] 振れ幅を狭く (h*0.4 -> h*0.2)
        const minLen = h * 0.5; // 変更 (0.2 -> 0.3)
        const maxLen = h * 0.6; // 変更 (0.6 -> 0.5)

        function loop(time) {
            const t = getPingPongValue(time, 1500); // 0 -> 1 -> 0
            const currentLen = minLen + (maxLen - minLen) * t;

            ctx.clearRect(0, 0, w, h);
            
            // 線 (緑)
            ctx.strokeStyle = HL_SIDE; ctx.lineWidth = 3;
            ctx.beginPath(); 
            ctx.moveTo(cx, cy); 
            ctx.lineTo(cx, cy - currentLen); // 上へ伸縮
            ctx.stroke();
            
            // 点
            ctx.fillStyle = HL_POINT; 
            ctx.beginPath(); ctx.arc(cx, cy, 3, 0, Math.PI * 2); ctx.fill(); // 基準点 (下) のみ描画
            // ★ [修正] 移動点 (上) の描画を削除
            
            const animId = requestAnimationFrame(loop);
            activeAnimationFrames.push(animId);
        }
        loop(0);
    }
    
    // 歯の角度(α) - 回転アニメーション
    function animateS8AlphaIcon(canvasId) {
        const c = document.getElementById(canvasId); if (!c) return;
        const ctx = c.getContext('2d'); const [w, h] = [c.width, c.height];
        const [cx, cy] = [w / 2, h * 0.8]; 
        const r = h * 0.6;
        
        // ★ [修正] 振れ幅を狭く (10-25度 -> 10-15度)
        const minAngle = 30 * (Math.PI / 180);
        const maxAngle = 40 * (Math.PI / 180); // 変更 (25 -> 20)

        function loop(time) {
            const t = getPingPongValue(time, 2000); // 0 -> 1 -> 0
            const currentAlpha = minAngle + (maxAngle - minAngle) * t;

            ctx.clearRect(0, 0, w, h); 
            
            // 中心点
            ctx.fillStyle = HL_POINT;
            ctx.beginPath(); ctx.arc(cx, cy, 3, 0, Math.PI * 2); ctx.fill();

            // 基準線 (真ん中) (緑)
            ctx.strokeStyle = HL_SIDE; 
            ctx.lineWidth = 2;
            ctx.beginPath(); ctx.moveTo(cx, cy); 
            ctx.lineTo(cx + r * Math.cos(-Math.PI/2), cy + r * Math.sin(-Math.PI/2));
            ctx.stroke();
            
            // 右の線 (回転)
            ctx.strokeStyle = DEFAULT_STROKE_ICON; // Blue
            ctx.beginPath(); ctx.moveTo(cx, cy); 
            ctx.lineTo(cx + r * Math.cos(-Math.PI/2 + currentAlpha), cy + r * Math.sin(-Math.PI/2 + currentAlpha));
            ctx.stroke();
            
            // 角度ハイライト (紫)
            ctx.strokeStyle = HL_TRI_ROT; ctx.lineWidth = 2; 
            ctx.beginPath();
            ctx.arc(cx, cy, r * 0.5, -Math.PI/2, -Math.PI/2 + currentAlpha);
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
    
    window.shapeDefinitions.shape8 = {
        name: '図形8',
        params: ['l1', 'l2', 'alpha'],
        
        // DOM要素のID (文字列)
        sliderContainerId: 'shape8Sliders',
        sliderIdMap: { l1: 's8_l1', l2: 's8_l2', alpha: 's8_alpha' },
        valueLabelIds: {
            l1: 's8_l1Value',
            l2: 's8_l2Value',
            alpha: 's8_alphaValue'
        },
        highlightCheckboxName: 's8_highlight',
        
        // 関数とデータ
        drawFn: drawShape8,
        // ★ アニメーション関数に変更
        drawIconFns: {
            l1: animateS8L1Icon,
            l2: animateS8L2Icon,
            alpha: animateS8AlphaIcon
        },
        problemSet: problemSetShape8,
        
        // ★ アニメーション停止関数を登録
        stopIconAnimations: stopShape8IconAnimations,
        
        iconCanvasIds: [
            's8_label_icon_l1', 's8_label_icon_l2', 's8_label_icon_alpha',
            's8_icon_l1', 's8_icon_l2', 's8_icon_alpha'
        ]
    };

})();