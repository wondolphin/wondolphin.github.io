// shape5.js (図形5: 家)

(function() {

    // --- 問題データ (図形5) ---
    // (ダミーデータ。必要に応じて調整してください)
    const problemSetShape5 = {
        1: {
            options: [
                { id: 'l1', label: '屋根高さ(L1)', unit: '', values: [40, 50, 60] },
                { id: 'l2', label: '屋根幅(L2)', unit: '', fixed: 100 },
                { id: 'l3', label: '本体高さ(L3)', unit: '', values: [70, 80] },
                { id: 'l4', label: '本体幅(L4)', unit: '', fixed: 80 }
            ],
            initial: { l1: 40, l2: 100, l3: 70, l4: 80 },
            answer: { l1: 50, l2: 100, l3: 80, l4: 80 }
        },
        2: {
            options: [
                { id: 'l1', label: '屋根高さ(L1)', unit: '', fixed: 50 },
                { id: 'l2', label: '屋根幅(L2)', unit: '', values: [80, 100, 120] },
                { id: 'l3', label: '本体高さ(L3)', unit: '', fixed: 60 },
                { id: 'l4', label: '本体幅(L4)', unit: '', values: [60, 80, 100] }
            ],
            initial: { l1: 50, l2: 80, l3: 60, l4: 100 },
            answer: { l1: 50, l2: 120, l3: 60, l4: 80 }
        },
        3: {
            options: [
                { id: 'l1', label: '屋根高さ(L1)', unit: '', values: [30, 50] },
                { id: 'l2', label: '屋根幅(L2)', unit: '', values: [100, 120] },
                { id: 'l3', label: '本体高さ(L3)', unit: '', values: [50, 70] },
                { id: 'l4', label: '本体幅(L4)', unit: '', values: [70, 90] }
            ],
            initial: { l1: 30, l2: 100, l3: 50, l4: 70 },
            answer: { l1: 50, l2: 120, l3: 70, l4: 90 }
        }
    };

    // --- 描画関数 (図形5) ---
    function drawShape5(canvas, params, highlights) {
        const ctx = canvas.getContext('2d');
        const { l1, l2, l3, l4 } = params;
        const { l1: hl_l1, l2: hl_l2, l3: hl_l3, l4: hl_l4 } = highlights;

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const bodyFill = '#854d0e'; // brown-700
        const bodyStroke = '#5f370e'; // brown-900
        const roofFill = '#dc2626'; // red-600
        const roofStroke = '#b91c1c'; // red-700
        
        ctx.save();
        // 描画原点を図形全体の底辺中心に移動
        ctx.translate(centerX, centerY + (l1 + l3) / 2);

        // 本体 (長方形 L3, L4)
        const bodyX = -l4 / 2;
        const bodyY = -l3;
        ctx.fillStyle = bodyFill;
        ctx.strokeStyle = bodyStroke;
        ctx.lineWidth = 2;
        ctx.fillRect(bodyX, bodyY, l4, l3);
        ctx.strokeRect(bodyX, bodyY, l4, l3);
        
        // 本体ハイライト
        if (hl_l4) { // 本体幅 (L4)
            ctx.strokeStyle = HL_COPY_ROT; // Orange
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(bodyX, 0); // 左下
            ctx.lineTo(bodyX + l4, 0); // 右下
            ctx.stroke();
        }
        if (hl_l3) { // 本体高さ (L3)
            ctx.strokeStyle = HL_TRI_ROT; // Purple
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(bodyX, bodyY); // 左上
            ctx.lineTo(bodyX, 0); // 左下
            ctx.stroke();
        }

        // 屋根 (二等辺三角形 L1, L2)
        const roofTop = { x: 0, y: -l3 - l1 };
        const roofLeft = { x: -l2 / 2, y: -l3 };
        const roofRight = { x: l2 / 2, y: -l3 };
        
        ctx.fillStyle = roofFill;
        ctx.strokeStyle = roofStroke;
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.moveTo(roofTop.x, roofTop.y);
        ctx.lineTo(roofRight.x, roofRight.y);
        ctx.lineTo(roofLeft.x, roofLeft.y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // 屋根ハイライト
        if (hl_l1) { // 屋根高さ (L1)
            ctx.strokeStyle = HL_L1; // Red
            ctx.lineWidth = 3;
            ctx.setLineDash([3, 3]);
            ctx.beginPath();
            ctx.moveTo(roofTop.x, roofTop.y);
            ctx.lineTo(roofTop.x, roofLeft.y); // (roofLeft.y は -l3 と同じ)
            ctx.stroke();
            ctx.setLineDash([]);
        }
        if (hl_l2) { // 屋根幅 (L2)
            ctx.strokeStyle = HL_SIDE; // Green
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(roofLeft.x, roofLeft.y);
            ctx.lineTo(roofRight.x, roofRight.y);
            ctx.stroke();
        }
        ctx.restore();
    }

    // --- アイコン描画関数 (図形5) ---
    
    // L1 (屋根高さ)
    function drawS5L1Icon(canvasId) {
        const c = document.getElementById(canvasId); if (!c) return;
        const ctx = c.getContext('2d'); const [w, h] = [c.width, c.height];
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = '#dc2626'; // red-600
        ctx.beginPath();
        ctx.moveTo(w/2, h*0.2); ctx.lineTo(w*0.8, h*0.8); ctx.lineTo(w*0.2, h*0.8);
        ctx.closePath(); ctx.fill();
        ctx.strokeStyle = HL_L1; ctx.lineWidth = 2; ctx.setLineDash([2, 2]);
        ctx.beginPath(); ctx.moveTo(w/2, h*0.2); ctx.lineTo(w/2, h*0.8); ctx.stroke();
        ctx.setLineDash([]);
    }
    // L2 (屋根幅)
    function drawS5L2Icon(canvasId) {
        const c = document.getElementById(canvasId); if (!c) return;
        const ctx = c.getContext('2d'); const [w, h] = [c.width, c.height];
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = '#dc2626'; // red-600
        ctx.beginPath();
        ctx.moveTo(w/2, h*0.2); ctx.lineTo(w*0.8, h*0.8); ctx.lineTo(w*0.2, h*0.8);
        ctx.closePath(); ctx.fill();
        ctx.strokeStyle = HL_SIDE; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(w*0.2, h*0.8); ctx.lineTo(w*0.8, h*0.8); ctx.stroke();
    }
    // L3 (本体高さ)
    function drawS5L3Icon(canvasId) {
        const c = document.getElementById(canvasId); if (!c) return;
        const ctx = c.getContext('2d'); const [w, h] = [c.width, c.height];
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = '#854d0e'; // brown-700
        ctx.fillRect(w*0.3, h*0.2, w*0.4, h*0.7);
        ctx.strokeStyle = HL_TRI_ROT; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(w*0.3, h*0.2); ctx.lineTo(w*0.3, h*0.9); ctx.stroke();
    }
    // L4 (本体幅)
    function drawS5L4Icon(canvasId) {
        const c = document.getElementById(canvasId); if (!c) return;
        const ctx = c.getContext('2d'); const [w, h] = [c.width, c.height];
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = '#854d0e'; // brown-700
        ctx.fillRect(w*0.2, h*0.3, w*0.6, h*0.4);
        ctx.strokeStyle = HL_COPY_ROT; ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(w*0.2, h*0.7); // 下側の辺
        ctx.lineTo(w*0.8, h*0.7); // 下側の辺
        ctx.stroke();
    }


    // --- メインスクリプトに図形定義を登録 ---
    if (!window.shapeDefinitions) {
        window.shapeDefinitions = {};
    }
    
    window.shapeDefinitions.shape5 = {
        name: '図形5',
        params: ['l1', 'l2', 'l3', 'l4'],
        
        // DOM要素のID (文字列) - byougagame.html側でこれに対応するHTMLを追加してください
        sliderContainerId: 'shape5Sliders',
        sliderIdMap: { l1: 's5_l1', l2: 's5_l2', l3: 's5_l3', l4: 's5_l4' },
        valueLabelIds: {
            l1: 's5_l1Value',
            l2: 's5_l2Value',
            l3: 's5_l3Value',
            l4: 's5_l4Value'
        },
        highlightCheckboxName: 's5_highlight',
        
        // 関数とデータ
        drawFn: drawShape5,
        drawIconFns: {
            l1: drawS5L1Icon,
            l2: drawS5L2Icon,
            l3: drawS5L3Icon,
            l4: drawS5L4Icon
        },
        problemSet: problemSetShape5,
        
        iconCanvasIds: [
            's5_label_icon_l1', 's5_label_icon_l2', 's5_label_icon_l3', 's5_label_icon_l4', 
            's5_icon_l1', 's5_icon_l2', 's5_icon_l3', 's5_icon_l4'
        ]
    };

})();