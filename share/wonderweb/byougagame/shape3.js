// shape3.js (図形3: ツリー型)

(function() {

    // --- この図形のアニメーションIDを管理する配列 ---
    let activeAnimationFrames = [];

    // --- アニメーション停止関数 ---
    function stopShape3IconAnimations() {
        activeAnimationFrames.forEach(id => cancelAnimationFrame(id));
        activeAnimationFrames = [];
    }
    
    // --- アニメーションヘルパー (0 -> 1 -> 0 の繰り返し) ---
    function getPingPongValue(time, duration = 2000) {
        const cycle = (time % duration) / duration; // 0 -> 1
        return cycle < 0.5 ? cycle * 2 : 1 - (cycle - 0.5) * 2; // 0 -> 1 -> 0
    }

    // --- 問題データ (図形3) ---
    // (変更なし)
    const problemSetShape3 = {
        1: {
            options: [
                { id: 'a', label: '底辺(A)', unit: '', fixed: 80 },
                { id: 'b', label: '高さ(B)', unit: '', values: [50, 60, 70] },
                { id: 'c', label: 'ずれ(C)', unit: '', values: [20, 30, 40] },
                { id: 'd', label: '幹幅(D)', unit: '', values: [20, 30, 40] }
            ],
            initial: { a: 80, b: 50, c: 40, d: 20 },
            answer: { a: 80, b: 60, c: 30, d: 30 } 
        },
        2: {
            options: [
                { id: 'a', label: '底辺(A)', unit: '', values: [80, 100, 120] },
                { id: 'b', label: '高さ(B)', unit: '', fixed: 50 },
                { id: 'c', label: 'ずれ(C)', unit: '', values: [30, 40] },
                { id: 'd', label: '幹幅(D)', unit: '', fixed: 40 }
            ],
            initial: { a: 120, b: 50, c: 40, d: 40 },
            answer: { a: 100, b: 50, c: 30, d: 40 }
        },
        3: {
            options: [
                { id: 'a', label: '底辺(A)', unit: '', values: [60, 80] },
                { id: 'b', label: '高さ(B)', unit: '', values: [60, 80] },
                { id: 'c', label: 'ずれ(C)', unit: '', values: [20, 30] },
                { id: 'd', label: '幹幅(D)', unit: '', values: [20, 30] }
            ],
            initial: { a: 60, b: 60, c: 20, d: 20 },
            answer: { a: 80, b: 80, c: 30, d: 30 }
        }
    };

    // --- 描画関数 (図形3) ---
    // (変更なし)
    function drawShape3(canvas, params, highlights) {
        const ctx = canvas.getContext('2d');
        const { a, b, c, d } = params;
        const { a: hl_a, b: hl_b, c: hl_c, d: hl_d } = highlights;

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const trunkFill = '#854d0e'; // brown-700
        const leafFill = '#16a34a'; // green-600
        const leafStroke = '#15803d'; // green-700
        
        ctx.save();
        // 描画原点を図形全体の底辺中心に移動
        ctx.translate(centerX, centerY + (c * 3 + b) / 2);

        // 幹 (D, C)
        const trunkX = -d / 2;
        const trunkY = -c;
        ctx.fillStyle = trunkFill;
        ctx.strokeStyle = '#5f370e'; // brown-900
        ctx.lineWidth = 1;
        ctx.fillRect(trunkX, trunkY, d, c);
        ctx.strokeRect(trunkX, trunkY, d, c);
        
        if (hl_d) {
            ctx.strokeStyle = HL_COPY_ROT; // Orange
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(trunkX, trunkY + c); // 下側の辺
            ctx.lineTo(trunkX + d, trunkY + c); // 下側の辺
            ctx.stroke();
        }
        if (hl_c) {
            ctx.strokeStyle = HL_TRI_ROT; // Purple
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(trunkX, trunkY);
            ctx.lineTo(trunkX, trunkY + c);
            ctx.stroke();
        }

        // 葉 (三角形3つ) (A, B, C)
        // 下 (i=0) から描画して、上 (i=2) が手前になるようにする
        for (let i = 0; i < 3; i++) {
            ctx.save();
            const leafCenterY = -(c + i * c + b / 2);
            ctx.translate(0, leafCenterY);
            
            const p1 = { x: 0, y: -b / 2 };
            const p2 = { x: a / 2, y: b / 2 };
            const p3 = { x: -a / 2, y: b / 2 };
            
            ctx.fillStyle = leafFill;
            ctx.strokeStyle = leafStroke;
            ctx.lineWidth = 2;

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.lineTo(p3.x, p3.y);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // ハイライト (一番下の葉 i=0 のみ)
            if (i === 0) {
                if (hl_a) {
                    ctx.strokeStyle = HL_L1; // Red
                    ctx.lineWidth = 3;
                    ctx.beginPath();
                    ctx.moveTo(p3.x, p3.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
                if (hl_b) {
                    ctx.strokeStyle = HL_SIDE; // Green
                    ctx.lineWidth = 3;
                    ctx.setLineDash([3, 3]);
                    ctx.beginPath();
                    ctx.moveTo(0, p1.y);
                    ctx.lineTo(0, p2.y);
                    ctx.stroke();
                    ctx.setLineDash([]);
                }
            }
            ctx.restore();
        }
        ctx.restore();
    }

    // --- ★ アイコンアニメーション関数 (図形3) ---
    
    // A (底辺) - 横伸縮
    function animateS3AIcon(canvasId) {
        const c = document.getElementById(canvasId); if (!c) return;
        const ctx = c.getContext('2d'); const [w, h] = [c.width, c.height];
        const [cx, cy] = [w / 2, h / 2];
        
        // 振れ幅 (w*0.1 (最も広い) ～ w*0.2 (最も狭い))
        const minX = w * 0.2; // 狭い (t=1)
        const maxX = w * 0.1; // 広い (t=0)
        
        // 三角形の静的な頂点 (領域いっぱいに)
        const pTop = { x: w/2, y: h * 0.1 };
        const pBottom = h * 0.9;
        
        function loop(time) {
            const t = getPingPongValue(time, 1500); // 0 -> 1 -> 0
            const currentX = minX + (maxX - minX) * t; // w*0.2 -> w*0.1 -> w*0.2
            const leftX = currentX;
            const rightX = w - currentX;

            ctx.clearRect(0, 0, w, h);
            
            // 背景の三角形
            ctx.fillStyle = '#16a34a'; // green-600
            ctx.beginPath();
            ctx.moveTo(pTop.x, pTop.y); 
            ctx.lineTo(rightX, pBottom); 
            ctx.lineTo(leftX, pBottom);
            ctx.closePath(); 
            ctx.fill();
            
            // アニメーションする底辺ハイライト
            ctx.strokeStyle = HL_L1; ctx.lineWidth = 4; // 太く
            ctx.beginPath(); 
            ctx.moveTo(leftX, pBottom); // 左 (伸縮)
            ctx.lineTo(rightX, pBottom); // 右 (伸縮)
            ctx.stroke();
            
            const animId = requestAnimationFrame(loop);
            activeAnimationFrames.push(animId);
        }
        loop(0);
    }
    
    // B (高さ) - 縦伸縮
    function animateS3BIcon(canvasId) {
        const c = document.getElementById(canvasId); if (!c) return;
        const ctx = c.getContext('2d'); const [w, h] = [c.width, c.height];

        // 振れ幅 (h*0.1 (最も高い) ～ h*0.2 (最も低い))
        const minY = h * 0.2; // 低い (t=1)
        const maxY = h * 0.1; // 高い (t=0)

        // 三角形の静的な頂点 (領域いっぱいに)
        const pBottomLeft = { x: w * 0.1, y: h * 0.9 };
        const pBottomRight = { x: w * 0.9, y: h * 0.9 };
        const cx = w / 2;
        
        function loop(time) {
            const t = getPingPongValue(time, 1500); // 0 -> 1 -> 0
            const currentY = minY + (maxY - minY) * t; // h*0.2 -> h*0.1 -> h*0.2

            ctx.clearRect(0, 0, w, h);
            
            // 背景の三角形
            ctx.fillStyle = '#16a34a'; // green-600
            ctx.beginPath();
            ctx.moveTo(cx, currentY); // 上 (伸縮)
            ctx.lineTo(pBottomRight.x, pBottomRight.y); 
            ctx.lineTo(pBottomLeft.x, pBottomLeft.y);
            ctx.closePath(); 
            ctx.fill();

            // アニメーションする高さハイライト
            ctx.strokeStyle = HL_SIDE; ctx.lineWidth = 3;
            ctx.setLineDash([3, 3]);
            ctx.beginPath(); 
            ctx.moveTo(cx, currentY); // 上 (伸縮)
            ctx.lineTo(cx, pBottomLeft.y); // 下
            ctx.stroke();
            ctx.setLineDash([]);
            
            const animId = requestAnimationFrame(loop);
            activeAnimationFrames.push(animId);
        }
        loop(0);
    }

    // C (ずれ/幹高さ) - 縦伸縮
    function animateS3CIcon(canvasId) {
        const c = document.getElementById(canvasId); if (!c) return;
        const ctx = c.getContext('2d'); const [w, h] = [c.width, c.height];
        
        // 振れ幅 (h*0.1 (最も高い) ～ h*0.2 (最も低い))
        const minY = h * 0.2; // 低い (t=1)
        const maxY = h * 0.1; // 高い (t=0)
        
        // 幹の静的な情報
        const trunkBottom = h * 0.9;
        const trunkX = w * 0.4;
        const trunkWidth = w * 0.2;
        
        function loop(time) {
            const t = getPingPongValue(time, 1500); // 0 -> 1 -> 0
            const currentY = minY + (maxY - minY) * t; // h*0.2 -> h*0.1 -> h*0.2

            ctx.clearRect(0, 0, w, h);
            
            // 背景の幹
            ctx.fillStyle = '#854d0e'; // brown-700
            ctx.fillRect(trunkX, currentY, trunkWidth, trunkBottom - currentY);

            // アニメーションする高さハイライト (幹の左側)
            ctx.strokeStyle = HL_TRI_ROT; ctx.lineWidth = 4; // 太く
            ctx.beginPath(); 
            ctx.moveTo(trunkX, currentY); // 上 (伸縮)
            ctx.lineTo(trunkX, trunkBottom); // 下
            ctx.stroke();
            
            const animId = requestAnimationFrame(loop);
            activeAnimationFrames.push(animId);
        }
        loop(0);
    }
    
    // D (幹幅) - 横伸縮
    function animateS3DIcon(canvasId) {
        const c = document.getElementById(canvasId); if (!c) return;
        const ctx = c.getContext('2d'); const [w, h] = [c.width, c.height];
        const cy = h / 2;

        // 振れ幅 (w*0.1 (最も広い) ～ w*0.2 (最も狭い))
        const minX = w * 0.2; // 狭い (t=1)
        const maxX = w * 0.1; // 広い (t=0)
        
        // 幹の静的な情報
        const trunkTop = h * 0.1;
        const trunkBottom = h * 0.9;
        
        function loop(time) {
            const t = getPingPongValue(time, 1500); // 0 -> 1 -> 0
            const currentX = minX + (maxX - minX) * t; // w*0.2 -> w*0.1 -> w*0.2
            const leftX = currentX;
            const rightX = w - currentX;
            
            ctx.clearRect(0, 0, w, h);
            
            // 背景の幹
            ctx.fillStyle = '#854d0e'; // brown-700
            ctx.fillRect(leftX, trunkTop, rightX - leftX, trunkBottom - trunkTop);

            // アニメーションする幅ハイライト (幹の下側)
            ctx.strokeStyle = HL_COPY_ROT; ctx.lineWidth = 4; // 太く
            ctx.beginPath(); 
            ctx.moveTo(leftX, trunkBottom); // 左 (伸縮)
            ctx.lineTo(rightX, trunkBottom); // 右 (伸縮)
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
    
    window.shapeDefinitions.shape3 = {
        name: '図形3',
        params: ['a', 'b', 'c', 'd'],
        
        // DOM要素のID (文字列)
        sliderContainerId: 'shape3Sliders',
        sliderIdMap: { a: 's3_a', b: 's3_b', c: 's3_c', d: 's3_d' },
        valueLabelIds: {
            a: 's3_aValue',
            b: 's3_bValue',
            c: 's3_cValue',
            d: 's3_dValue'
        },
        highlightCheckboxName: 's3_highlight',
        
        // 関数とデータ
        drawFn: drawShape3,
        // ★ アニメーション関数に変更
        drawIconFns: {
            a: animateS3AIcon,
            b: animateS3BIcon,
            c: animateS3CIcon,
            d: animateS3DIcon
        },
        problemSet: problemSetShape3,
        
        // ★ アニメーション停止関数を登録
        stopIconAnimations: stopShape3IconAnimations,
        
        iconCanvasIds: ['s3_label_icon_a', 's3_label_icon_b', 's3_label_icon_c', 's3_label_icon_d', 's3_icon_a', 's3_icon_b', 's3_icon_c', 's3_icon_d']
    };

})();