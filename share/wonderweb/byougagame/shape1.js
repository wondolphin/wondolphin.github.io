// shape1.js (図形1: 三角と回転コピー)

(function() {
    
    // --- この図形のアニメーションIDを管理する配列 ---
    let activeAnimationFrames = [];

    // --- アニメーション停止関数 ---
    // (game.html が新しい問題を描画する直前に呼び出す)
    function stopShape1IconAnimations() {
        activeAnimationFrames.forEach(id => cancelAnimationFrame(id));
        activeAnimationFrames = [];
    }

    // --- 問題データ (図形1) ---
    // (変更なし)
    const problemSetShape1 = {
        1: {
            options: [
                { id: 'l1', label: 'L1長さ', unit: '', fixed: 100 },
                { id: 'side', label: '1辺の長さ', unit: '', values: [90, 120, 150] },
                { id: 'rot', label: '回転角', unit: '°', values: [45, 50, 60] },
                { id: 'copy', label: 'コピー角度', unit: '°', values: [20, 30, 45, 60] }
            ],
            initial: { l1: 100, side: 140, rot: 90, copy: 90 },
            answer: { l1: 100, side: 120, rot: 60, copy: 30 }
        },
        2: {
            options: [
                { id: 'l1', label: 'L1長さ', unit: '', values: [50, 100, 150] },
                { id: 'side', label: '1辺の長さ', unit: '', fixed: 80 },
                { id: 'rot', label: '回転角', unit: '°', values: [0, 90, 180] },
                { id: 'copy', label: 'コピー角度', unit: '°', values: [45, 60, 90] }
            ],
            initial: { l1: 50, side: 80, rot: 0, copy: 90 },
            answer: { l1: 100, side: 80, rot: 90, copy: 45 }
        },
        3: {
            options: [
                { id: 'l1', label: 'L1長さ', unit: '', values: [80, 120] },
                { id: 'side', label: '1辺の長さ', unit: '', values: [40, 60, 80] },
                { id: 'rot', label: '回転角', unit: '°', fixed: 0 },
                { id: 'copy', label: 'コピー角度', unit: '°', values: [15, 30, 60] }
            ],
            initial: { l1: 80, side: 40, rot: 0, copy: 15 },
            answer: { l1: 120, side: 60, rot: 0, copy: 30 }
        }
    };

    // --- 描画関数 (図形1) ---
    // (変更なし)
    function drawShape1(canvas, params, highlights) {
        const ctx = canvas.getContext('2d');
        const { l1, side, rot, copy } = params;
        const { l1: hl_l1, side: hl_side, rot: hl_rot, copy: hl_copy } = highlights;

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const defaultStroke = '#2563eb';
        const defaultFill = 'rgba(59, 130, 246, 0.1)';
        const toRad = Math.PI / 180;

        if (copy <= 0) return;
        const numCopies = Math.floor(360 / copy);

        // コピー角度ハイライト
        if (hl_copy && numCopies > 1 && l1 > 0) {
            ctx.save();
            ctx.translate(centerX, centerY);
            const rad0 = -Math.PI / 2;
            const rad1 = (copy * toRad) - (Math.PI / 2);
            ctx.strokeStyle = HL_COPY_ROT;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(0, 0, Math.max(20, l1 / 2), rad0, rad1);
            ctx.stroke();
            ctx.fillStyle = HL_POINT;
            ctx.beginPath();
            ctx.arc(0, 0, 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        // 中心点Oハイライト
        if (hl_l1 || hl_rot) {
             ctx.save();
             ctx.translate(centerX, centerY);
             ctx.fillStyle = (hl_l1) ? HL_POINT : '#cccccc';
             ctx.beginPath();
             ctx.arc(0, 0, 5, 0, Math.PI * 2);
             ctx.fill();
             ctx.restore();
        }

        for (let i = 0; i < numCopies; i++) {
            const totalRotationRad = (i * copy) * toRad;
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(totalRotationRad);

            // L1
            const isHighlightL1 = (i === 0 && hl_l1);
            ctx.strokeStyle = isHighlightL1 ? HL_L1 : defaultStroke;
            ctx.lineWidth = isHighlightL1 ? 3 : 2;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, -l1);
            ctx.stroke();

            // 三角形
            ctx.save();
            ctx.translate(0, -l1);
            const triangleRotationRad = rot * toRad;
            
            const h = side * Math.sqrt(3) / 2;
            const r_top = h * 2 / 3;
            const r_bottom = h / 3;

            // 回転角ハイライト (回転前)
            if (i === 0 && hl_rot && side > 0) {
                ctx.fillStyle = HL_POINT;
                ctx.beginPath();
                ctx.arc(0, 0, 4, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = HL_TRI_ROT;
                ctx.lineWidth = 2;
                ctx.setLineDash([3, 3]);
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(0, -r_top);
                ctx.stroke();
                ctx.setLineDash([]);
                ctx.beginPath();
                ctx.arc(0, 0, Math.max(10, r_top * 0.5), -Math.PI / 2, triangleRotationRad - (Math.PI / 2));
                ctx.stroke();
            }

            ctx.rotate(triangleRotationRad);

            const p1 = { x: 0, y: -r_top };
            const p2 = { x: side / 2, y: r_bottom };
            const p3 = { x: -side / 2, y: r_bottom };

            const isHighlightSide = (i === 0 && hl_side);
            ctx.strokeStyle = isHighlightSide ? HL_SIDE : defaultStroke;
            ctx.fillStyle = defaultFill;
            ctx.lineWidth = isHighlightSide ? 3 : 2;

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.lineTo(p3.x, p3.y);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // 回転角ハイライト (回転後)
            if (i === 0 && hl_rot && side > 0) {
                ctx.strokeStyle = HL_TRI_ROT;
                ctx.lineWidth = 2;
                ctx.setLineDash([3, 3]);
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(p1.x, p1.y); 
                ctx.stroke();
                ctx.setLineDash([]);
                
                ctx.fillStyle = HL_POINT;
                ctx.beginPath();
                ctx.arc(0, 0, 4, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
            ctx.restore();
        }
    }

    // --- ★ アイコンアニメーション関数 (図形1) ---
    
    // アニメーションヘルパー (0 -> 1 -> 0 の繰り返し)
    function getPingPongValue(time, duration = 2000) {
        const cycle = (time % duration) / duration; // 0 -> 1
        return cycle < 0.5 ? cycle * 2 : 1 - (cycle - 0.5) * 2; // 0 -> 1 -> 0
    }

    // L1長さ (伸縮アニメーション)
    function animateS1L1Icon(canvasId) {
        const c = document.getElementById(canvasId); if (!c) return;
        const ctx = c.getContext('2d'); const [w, h] = [c.width, c.height];
        const [cx, cy] = [w / 2, h * 0.8]; // 基準点(下)
        
        // ★ 振れ幅を h*0.2 から h*0.1 に変更
        const minY = h * 0.2; // 変更 (0.5 -> 0.2)
        const maxY = h * 0.1; // 変更なし (0.1)

        function loop(time) {
            const t = getPingPongValue(time, 1500); // 0 -> 1 -> 0 (1.5秒サイクル)
            
            // ★ 計算式を lerp (線形補間) に変更
            // const currentY = cy - (cy - minY) - (maxY - minY) * t; 
            const currentY = minY + (maxY - minY) * t; // h*0.2 -> h*0.1 -> h*0.2

            ctx.clearRect(0, 0, w, h); 
            ctx.strokeStyle = HL_L1; ctx.lineWidth = 3;
            ctx.beginPath(); 
            ctx.moveTo(cx, cy); // 下
            ctx.lineTo(cx, currentY); // 上 (伸縮)
            ctx.stroke();
            
            ctx.fillStyle = HL_POINT; 
            ctx.beginPath(); ctx.arc(cx, currentY, 3, 0, Math.PI * 2); ctx.fill(); // 先端の点
            ctx.beginPath(); ctx.arc(cx, cy, 3, 0, Math.PI * 2); ctx.fill(); // 付け根の点
            
            const animId = requestAnimationFrame(loop);
            activeAnimationFrames.push(animId);
        }
        loop(0);
    }
    
    // 1辺の長さ (伸縮アニメーション)
    function animateS1SideIcon(canvasId) {
        const c = document.getElementById(canvasId); if (!c) return;
        const ctx = c.getContext('2d'); const [w, h] = [c.width, c.height];
        const [cx, cy] = [w / 2, h / 2];
        
        // ★ 振れ幅を w*0.2 から w*0.1 に変更
        const minX = w * 0.2; // 変更 (0.4 -> 0.2)
        const maxX = w * 0.1; // 変更なし (0.1)
        
        function loop(time) {
            const t = getPingPongValue(time, 1500); // 0 -> 1 -> 0
            
            // ★ 計算式を lerp (線形補間) に変更
            // const currentX = cx - (cx - minX) - (maxX - minX) * t; 
            const currentX = minX + (maxX - minX) * t; // w*0.2 -> w*0.1 -> w*0.2

            ctx.clearRect(0, 0, w, h); 
            ctx.strokeStyle = HL_SIDE; ctx.lineWidth = 3;
            ctx.beginPath(); 
            ctx.moveTo(currentX, cy); // 左 (伸縮)
            ctx.lineTo(w - currentX, cy); // 右 (伸縮)
            ctx.stroke();
            
            const animId = requestAnimationFrame(loop);
            activeAnimationFrames.push(animId);
        }
        loop(0);
    }
    
    // 回転角 (回転アニメーション)
    function animateS1TriRotIcon(canvasId) {
        const c = document.getElementById(canvasId); if (!c) return;
        const ctx = c.getContext('2d'); const [w, h] = [c.width, c.height];
        const [cx, cy] = [w / 2, h * 0.7]; 
        const r = h * 0.5;
        
        // ★ 振れ幅を 30度 から 45度 に変更
        const angle1 = 30 * (Math.PI / 180); // 30度
        const angle2 = 45 * (Math.PI / 180); // 45度

        function loop(time) {
            const t = getPingPongValue(time, 2000); // 0 -> 1 -> 0
            
            // ★ 0度からではなく、angle1 から angle2 の間で振動
            // const currentAngle = maxAngle * t;
            const currentAngle = angle1 + (angle2 - angle1) * t; // 30 -> 45 -> 30

            ctx.clearRect(0, 0, w, h); 
            ctx.fillStyle = HL_POINT;
            ctx.beginPath(); ctx.arc(cx, cy, 3, 0, Math.PI * 2); ctx.fill();
            
            // 基準線 (★ 真上 (-90度) に固定)
            ctx.strokeStyle = HL_TRI_ROT; ctx.lineWidth = 2; ctx.setLineDash([2, 2]);
            ctx.beginPath(); ctx.moveTo(cx, cy); 
            ctx.lineTo(cx, cy - r); // 真上
            ctx.stroke();
            ctx.setLineDash([]);
            
            // 回転する線 (currentAngle で振動)
            ctx.beginPath(); ctx.moveTo(cx, cy);
            ctx.lineTo(cx + r * Math.cos(currentAngle - Math.PI/2), cy + r * Math.sin(currentAngle - Math.PI/2));
            ctx.stroke();
            
            // 円弧 (★ 真上 (-90度) から currentAngle まで)
            ctx.beginPath(); 
            ctx.arc(cx, cy, r * 0.5, -Math.PI / 2, currentAngle - Math.PI / 2);
            ctx.stroke();
            
            const animId = requestAnimationFrame(loop);
            activeAnimationFrames.push(animId);
        }
        loop(0);
    }
    
    // コピー角度 (回転アニメーション)
    function animateS1CopyRotIcon(canvasId) {
        const c = document.getElementById(canvasId); if (!c) return;
        const ctx = c.getContext('2d'); const [w, h] = [c.width, c.height];
        
        // ★ 中心点を下にずらし (h/2 -> h*0.6)、線を長く (r=h*0.4 -> r=h*0.5)
        const [cx, cy] = [w / 2, h * 0.6]; // 変更
        const r = h * 0.5; // 変更
        
        // ★ 振れ幅を 30度 から 45度 に変更
        const angle1 = 30 * (Math.PI / 180); // 30度
        const angle2 = 45 * (Math.PI / 180); // 45度

        function loop(time) {
            const t = getPingPongValue(time, 2000); // 0 -> 1 -> 0
            
            // ★ 0度からではなく、angle1 から angle2 の間で振動
            // const currentAngle = maxAngle * t;
            const currentAngle = angle1 + (angle2 - angle1) * t; // 30 -> 45 -> 30

            ctx.clearRect(0, 0, w, h); 
            ctx.fillStyle = HL_POINT;
            ctx.beginPath(); ctx.arc(cx, cy, 3, 0, Math.PI * 2); ctx.fill();

            // 基準線 (★ 真上 (-90度) に固定)
            ctx.strokeStyle = DEFAULT_STROKE_ICON; ctx.lineWidth = 2;
            ctx.beginPath(); ctx.moveTo(cx, cy); 
            ctx.lineTo(cx, cy - r); // 真上
            ctx.stroke();
            
            // 回転する線 (currentAngle で振動)
            // 回転する線
            ctx.beginPath(); ctx.moveTo(cx, cy);
            ctx.lineTo(cx + r * Math.cos(currentAngle - Math.PI/2), cy + r * Math.sin(currentAngle - Math.PI/2));
            ctx.stroke(); 
            
            // 円弧 (★ 真上 (-90度) から currentAngle まで)
            ctx.strokeStyle = HL_COPY_ROT; ctx.lineWidth = 2;
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
    
    window.shapeDefinitions.shape1 = {
        name: '図形1',
        params: ['l1', 'side', 'rot', 'copy'],
        
        // DOM要素のID (文字列)
        sliderContainerId: 'shape1Sliders',
        sliderIdMap: { l1: 's1_l1Length', side: 's1_sideLength', rot: 's1_triangleRotation', copy: 's1_copyAngle' },
        valueLabelIds: {
            l1: 's1_l1LengthValue',
            side: 's1_sideLengthValue',
            rot: 's1_triangleRotationValue',
            copy: 's1_copyAngleValue'
        },
        highlightCheckboxName: 's1_highlight',
        
        // 関数とデータ
        drawFn: drawShape1,
        // ★ 呼び出す関数を静的な描画関数からアニメーション関数に変更
        drawIconFns: {
            l1: animateS1L1Icon,
            side: animateS1SideIcon,
            rot: animateS1TriRotIcon,
            copy: animateS1CopyRotIcon
        },
        problemSet: problemSetShape1,
        
        // ★ アニメーション停止関数を登録
        stopIconAnimations: stopShape1IconAnimations,
        
        iconCanvasIds: ['s1_label_icon_l1', 's1_label_icon_side', 's1_label_icon_rot', 's1_label_icon_copy', 's1_icon_l1', 's1_icon_side', 's1_icon_rot', 's1_icon_copy']
    };

})();