// shape3.js (図形3: ツリー型)

(function() {

    // --- 問題データ (図形3) ---
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

    // --- アイコン描画関数 (図形3) ---
    
    // A (底辺)
    function drawS3AIcon(canvasId) {
        const c = document.getElementById(canvasId); if (!c) return;
        const ctx = c.getContext('2d'); const [w, h] = [c.width, c.height];
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = '#16a34a'; // green-600
        ctx.beginPath();
        ctx.moveTo(w/2, h*0.2); ctx.lineTo(w*0.8, h*0.8); ctx.lineTo(w*0.2, h*0.8);
        ctx.closePath(); ctx.fill();
        ctx.strokeStyle = HL_L1; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(w*0.2, h*0.8); ctx.lineTo(w*0.8, h*0.8); ctx.stroke();
    }
    // B (高さ)
    function drawS3BIcon(canvasId) {
        const c = document.getElementById(canvasId); if (!c) return;
        const ctx = c.getContext('2d'); const [w, h] = [c.width, c.height];
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = '#16a34a'; // green-600
        ctx.beginPath();
        ctx.moveTo(w/2, h*0.2); ctx.lineTo(w*0.8, h*0.8); ctx.lineTo(w*0.2, h*0.8);
        ctx.closePath(); ctx.fill();
        ctx.strokeStyle = HL_SIDE; ctx.lineWidth = 2; ctx.setLineDash([2, 2]);
        ctx.beginPath(); ctx.moveTo(w/2, h*0.2); ctx.lineTo(w/2, h*0.8); ctx.stroke();
        ctx.setLineDash([]);
    }
    // C (ずれ/幹高さ)
    function drawS3CIcon(canvasId) {
        const c = document.getElementById(canvasId); if (!c) return;
        const ctx = c.getContext('2d'); const [w, h] = [c.width, c.height];
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = '#854d0e'; // brown-700
        ctx.fillRect(w*0.4, h*0.5, w*0.2, h*0.4);
        ctx.strokeStyle = HL_TRI_ROT; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(w*0.4, h*0.5); ctx.lineTo(w*0.4, h*0.9); ctx.stroke();
    }
    // D (幹幅)
    function drawS3DIcon(canvasId) {
        const c = document.getElementById(canvasId); if (!c) return;
        const ctx = c.getContext('2d'); const [w, h] = [c.width, c.height];
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = '#854d0e'; // brown-700
        ctx.fillRect(w*0.3, h*0.3, w*0.4, h*0.4);
        ctx.strokeStyle = HL_COPY_ROT; ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(w*0.3, h*0.7); // 下側の辺
        ctx.lineTo(w*0.7, h*0.7); // 下側の辺
        ctx.stroke();
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
        drawIconFns: {
            a: drawS3AIcon,
            b: drawS3BIcon,
            c: drawS3CIcon,
            d: drawS3DIcon
        },
        problemSet: problemSetShape3,
        
        iconCanvasIds: ['s3_label_icon_a', 's3_label_icon_b', 's3_label_icon_c', 's3_label_icon_d', 's3_icon_a', 's3_icon_b', 's3_icon_c', 's3_icon_d']
    };

})();