/**
 * ភារកិច្ច៖ បង្កើតផែនទីកាលប្បវត្តិសកល បែបហូឡូក្រាម
 * បញ្ជាក់៖ បង្ហាញពីការតភ្ជាប់រវាង Y2K, Y2K19 និង Y2K38
 */

function initHologramMap() {
    const mapStage = document.getElementById('map');
    mapStage.innerHTML = `
        <div class="hologram-viewport">
            <div class="grid-overlay"></div>
            <div class="scanline"></div>
            <canvas id="map-canvas"></canvas>
            <div id="threat-layer"></div>
        </div>
    `;

    const canvas = document.getElementById('map-canvas');
    const ctx = canvas.getContext('2d');
    
    // កំណត់ទំហំ Canvas តាមទំហំអេក្រង់ជាក់ស្តែង
    function resize() {
        canvas.width = mapStage.offsetWidth;
        canvas.height = mapStage.offsetHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    // បង្កើតចំណុចបណ្តាញ (Network Nodes)
    const nodes = [];
    for(let i = 0; i < 40; i++) {
        nodes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5
        });
    }

    function drawMap() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "rgba(212, 175, 55, 0.3)";
        ctx.lineWidth = 1;

        nodes.forEach((node, i) => {
            node.x += node.vx;
            node.y += node.vy;

            // រក្សាឱ្យនៅក្នុងព្រំដែន
            if(node.x < 0 || node.x > canvas.width) node.vx *= -1;
            if(node.y < 0 || node.y > canvas.height) node.vy *= -1;

            // គូរខ្សែតភ្ជាប់បណ្តាញ
            nodes.slice(i + 1).forEach(target => {
                const dist = Math.hypot(node.x - target.x, node.y - target.y);
                if(dist < 150) {
                    ctx.beginPath();
                    ctx.moveTo(node.x, node.y);
                    ctx.lineTo(target.x, target.y);
                    ctx.stroke();
                }
            });

            // គូរចំណុចថាមពល
            ctx.fillStyle = "rgba(212, 175, 55, 0.8)";
            ctx.beginPath();
            ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
            ctx.fill();
        });

        requestAnimationFrame(drawMap);
    }

    drawMap();
}

// ហៅអនុគមន៍ឱ្យដំណើរការក្នុង Boot Sequence
window.addEventListener('DOMContentLoaded', () => {
    initHologramMap();
});
