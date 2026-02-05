/**
 * HOLOGRAM ENGINE v7.0
 * គ្រប់គ្រងលើការបង្ហាញរូបភាព 3D និងចលនាឌីជីថល
 */

const map = document.getElementById('map');
const vehicles = [];
const logFeed = document.getElementById('log-feed');

// 1. ប្រព័ន្ធបញ្ចេញសំឡេង AI (AI Voice Synthesis)
function aiSpeak(msg) {
    const speech = new SpeechSynthesisUtterance(msg);
    speech.lang = 'km-KH'; // កំណត់ទៅភាសាខ្មែរ
    speech.rate = 1.0;     // ល្បឿននិយាយ
    speech.pitch = 0.6;    // សំឡេងធ្ងន់បែប Robot
    window.speechSynthesis.speak(speech);
}

// 2. ការបង្កើតគ្រាប់ពន្លឺហូឡូក្រាម (Hologram Grid Particles)
function createGridParticles() {
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = 'var(--cyan)';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.opacity = Math.random();
        particle.style.boxShadow = '0 0 5px var(--cyan)';
        map.appendChild(particle);
    }
}

// 3. ម៉ាស៊ីនបញ្ជាយានយន្ត V2X (V2X Vehicle Engine)
function createVehicle(isEmergency = false) {
    const v = document.createElement('div');
    v.className = isEmergency ? 'vehicle flicker' : 'vehicle';
    
    if (isEmergency) {
        v.style.background = '#ffffff';
        v.style.boxShadow = '0 0 20px #fff, 0 0 10px var(--red)';
        v.style.zIndex = '100';
    }

    const data = {
        el: v,
        x: -20,
        y: isEmergency ? 250 : Math.random() * 450,
        speed: isEmergency ? 6 : (1 + Math.random() * 2),
        isEV: isEmergency
    };

    map.appendChild(v);
    vehicles.push(data);
}

// 4. បញ្ជាការពារប្រព័ន្ធ (Defense Commands)
function fireSolar() {
    aiSpeak("ស្នូលថាមពលព្រះអាទិត្យត្រូវបានដំណើរការ។ គោលដៅត្រូវបានចាក់សោ។");
    map.classList.add('flicker');
    addLog("ការវាយបកសូឡា: កំពុងប្រតិបត្តិ", "var(--gold)");
    
    setTimeout(() => {
        map.classList.remove('flicker');
        aiSpeak("ការគំរាមកំហែងត្រូវបានកម្ចាត់ចោល។");
    }, 2000);
}

function spawnEV() {
    aiSpeak("បើកដំណើរការអាទិភាពបន្ទាន់។ កំពុងជម្រះផ្លូវសម្រាប់យានសង្គ្រោះ។");
    createVehicle(true);
    addLog("យានសង្គ្រោះ V2X: កំពុងចេញដំណើរ", "#fff");
}

// 5. ការត្រួតពិនិត្យការគំរាមកំហែង (Threat Monitoring)
function simulateThreat() {
    const ip = `${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.1.${Math.floor(Math.random()*255)}`;
    const attackerEl = document.getElementById('attacker-ip');
    if(attackerEl) attackerEl.innerText = ip;

    const node = document.createElement('div');
    node.className = 'threat-node';
    node.style.left = (20 + Math.random() * 60) + '%';
    node.style.top = (20 + Math.random() * 60) + '%';
    map.appendChild(node);

    aiSpeak("ប្រកាសអាសន្ន! រកឃើញការជ្រៀតចូលពីអាសយដ្ឋាន " + ip);
    addLog(`រកឃើញការវាយប្រហារ: ${ip}`, "var(--red)");

    setTimeout(() => {
        node.remove();
        aiSpeak("ការជ្រៀតចូលត្រូវបានទប់ស្កាត់ដោយជោគជ័យ។");
        addLog("ស្ថានភាព: សុវត្ថិភាព", "var(--cyan)");
    }, 4000);
}

// មុខងារជំនួយសម្រាប់បន្ថែម Log
function addLog(msg, color) {
    const div = document.createElement('div');
    div.style.color = color;
    div.innerText = `> ${msg}`;
    logFeed.prepend(div);
}
