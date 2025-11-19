// shape1.js (図形1: 三角と回転コピー)

(function() {
    // --- グローバル変数 (このファイル内) ---
    // (ハイライト色などはメインの 'byougagame.html' 側で定義)

    // --- 問題データ (図形1) ---
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

    // --- アイコン描画関数 (図形1) ---
    
    // L1長さ
    function drawS1L1Icon(canvasId) {
        const c = document.getElementById(canvasId); if (!c) return;
        const ctx = c.getContext('2d'); const [w, h] = [c.width, c.height];
        ctx.clearRect(0, 0, w, h); ctx.strokeStyle = HL_L1; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(w / 2, h * 0.8); ctx.lineTo(w / 2, h * 0.2); ctx.stroke();
        ctx.fillStyle = HL_POINT; ctx.beginPath(); ctx.arc(w / 2, h * 0.2, 3, 0, Math.PI * 2); ctx.fill();
    }
    // 1辺の長さ
    function drawS1SideIcon(canvasId) {
        const c = document.getElementById(canvasId); if (!c) return;
        const ctx = c.getContext('2d'); const [w, h] = [c.width, c.height];
        ctx.clearRect(0, 0, w, h); ctx.strokeStyle = HL_SIDE; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(w * 0.2, h * 0.5); ctx.lineTo(w * 0.8, h * 0.5); ctx.stroke();
    }
    // 回転角
    function drawS1TriRotIcon(canvasId) {
        const c = document.getElementById(canvasId); if (!c) return;
        const ctx = c.getContext('2d'); const [w, h] = [c.width, c.height];
        const [cx, cy] = [w / 2, h * 0.7]; const r = h * 0.5; const angle = Math.PI / 4;
        ctx.clearRect(0, 0, w, h); ctx.fillStyle = HL_POINT;
        ctx.beginPath(); ctx.arc(cx, cy, 3, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = HL_TRI_ROT; ctx.lineWidth = 2; ctx.setLineDash([2, 2]);
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx, cy - r); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(cx, cy);
        ctx.lineTo(cx + r * Math.cos(angle - Math.PI/2), cy + r * Math.sin(angle - Math.PI/2));
        ctx.stroke(); ctx.setLineDash([]);
        ctx.beginPath(); ctx.arc(cx, cy, r * 0.5, -Math.PI / 2, angle - Math.PI / 2); ctx.stroke();
    }
    // コピー角度
    function drawS1CopyRotIcon(canvasId) {
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
        drawIconFns: {
            l1: drawS1L1Icon,
            side: drawS1SideIcon,
            rot: drawS1TriRotIcon,
            copy: drawS1CopyRotIcon
        },
        problemSet: problemSetShape1,
        
        iconCanvasIds: ['s1_label_icon_l1', 's1_label_icon_side', 's1_label_icon_rot', 's1_label_icon_copy', 's1_icon_l1', 's1_icon_side', 's1_icon_rot', 's1_icon_copy']
    };

})();