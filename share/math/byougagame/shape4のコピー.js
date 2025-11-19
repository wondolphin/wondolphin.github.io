// shape4.js (図形4: 円と楕円)

(function() {

    // --- 問題データ (図形4) ---
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

        // 楕円
        ctx.strokeStyle = defaultStroke;
        ctx.fillStyle = defaultFill;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, la, sa, 0, 0, 2 * Math.PI); // 半径
        ctx.fill();
        ctx.stroke();

        // 円
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

    // --- アイコン描画関数 (図形4) ---

    // R (円半径)
    function drawS4RIcon(canvasId) {
        const c = document.getElementById(canvasId); if (!c) return;
        const ctx = c.getContext('2d'); const [w, h] = [c.width, c.height];
        const [cx, cy] = [w/2, h/2]; const r = h * 0.35;
        ctx.clearRect(0, 0, w, h);
        ctx.strokeStyle = DEFAULT_STROKE_ICON; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
        ctx.strokeStyle = HL_L1; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + r, cy); ctx.stroke();
    }
    // SA (楕円短半径)
    function drawS4SAIcon(canvasId) {
        const c = document.getElementById(canvasId); if (!c) return;
        const ctx = c.getContext('2d'); const [w, h] = [c.width, c.height];
        const [cx, cy] = [w/2, h/2]; const [rx, ry] = [w*0.4, h*0.3];
        ctx.clearRect(0, 0, w, h);
        ctx.strokeStyle = DEFAULT_STROKE_ICON; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2); ctx.stroke();
        ctx.strokeStyle = HL_SIDE; ctx.lineWidth = 2; ctx.setLineDash([2, 2]);
        ctx.beginPath(); ctx.moveTo(cx, cy-ry); ctx.lineTo(cx, cy+ry); ctx.stroke();
        ctx.setLineDash([]);
    }
    // LA (楕円長半径)
    function drawS4LAIcon(canvasId) {
        const c = document.getElementById(canvasId); if (!c) return;
        const ctx = c.getContext('2d'); const [w, h] = [c.width, c.height];
        const [cx, cy] = [w/2, h/2]; const [rx, ry] = [w*0.4, h*0.3];
        ctx.clearRect(0, 0, w, h);
        ctx.strokeStyle = DEFAULT_STROKE_ICON; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2); ctx.stroke();
        ctx.strokeStyle = HL_TRI_ROT; ctx.lineWidth = 2; ctx.setLineDash([2, 2]);
        ctx.beginPath(); ctx.moveTo(cx-rx, cy); ctx.lineTo(cx+rx, cy); ctx.stroke();
        ctx.setLineDash([]);
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
        drawIconFns: {
            r: drawS4RIcon,
            sa: drawS4SAIcon,
            la: drawS4LAIcon
        },
        problemSet: problemSetShape4,
        
        iconCanvasIds: ['s4_label_icon_r', 's4_label_icon_sa', 's4_label_icon_la', 's4_icon_r', 's4_icon_sa', 's4_icon_la']
    };

})();