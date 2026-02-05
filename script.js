/**
 * CYBER SENTINEL OS v7.0 - Core Script
 * គ្រប់គ្រងលើ: ចលនា V2X, ប្រព័ន្ធសំឡេង AI, និងការតាមដានការវាយប្រហារ
 */

const map = document.getElementById('map');
const logFeed = document.getElementById('log-feed');
const vehicles = [];

// 1. ប្រព័ន្ធសំឡេង AI (AI Voice Synthesis)
function aiSpeak(msg) {
    const speech = new SpeechSynthesisUtterance(msg);
    speech.lang = 'km-KH';
    speech.rate = 1.1; // ល្បឿនលឿនបន្តិចបែបបច្ចេកវិទ្យា
    speech.pitch = 0.7; // សំឡេងធ្ងន់បែប Robot
    window.speechSynthesis.speak(speech);
}

// 2. ការបង្កើតរថយន្តស្វ័យប្រវត្តិ (V2X Vehicle Engine)
function createVehicle(isEV) {
    const v = document.createElement('div');
    v.className = isEV ? 'vehicle flicker' : 'vehicle';
    
    // បើជាឡានពេទ្យ ឱ្យវាមានពណ៌ស និងពន្លឺខ្លាំង
    if(isEV) {
        v.style.background = '#ffffff';
        v.style.boxShadow = '0 0 20px #ffffff, 0 0 10px #ff0000';
    }
    
    const data = {
        el: v,
        x: Math.random() * 800,
        y: isEV ? 250 : Math.random() * 500, // ឡានពេទ្យរត់គន្លងកណ្តាល
        speed: isEV ? 7 : (1.2 + Math.random() * 2),
        isEV: isEV
    };
    
    map.appendChild(v);
    vehicles.push(data);
}

// 3. ប្រព័ន្ធដំណើរការចលនា (Main System Loop)
function updateSystem() {
    // បច្ចុប្បន្នភាព Unix Timestamp
    document.getElementById('unix-clock').innerText = Math.floor(Date.now() / 1000);

    // គ្រប់គ្រងចលនារថយន្ត
    vehicles.forEach((v, index) => {
        v.x += v.speed;
        
        // នៅពេលឡានរត់ផុតអេក្រង់
        if(v.x > 900) {
            if(v.isEV) {
                v.el.remove();
                vehicles.splice(index, 1);
                addLog("EV_MISSION_COMPLETE", "var(--cyan)");
                return;
            }
            v.x = -30;
        }
        
        v.el.style.left = v.x + 'px';
        v.el.style.top = v.y + 'px';
    });

    requestAnimationFrame(updateSystem);
}
// 4. សកម្មភាពការពារ (Defense Actions)
function fireSolar() {
    aiSpeak("កំពុងបាញ់កាំភ្លើងព្រះអាទិត្យ។ កំពុងវាយគោលដៅអ័រប៊ីត។");
    map.classList.add('flicker');
    addLog("SOLAR_DEFENSE_EXECUTED", "var(--gold)");
    
    setTimeout(() => {
        map.classList.remove('flicker');
        aiSpeak("គ្រោះថ្នាក់ត្រូវបានបំបាត់។ ប្រព័ន្ធមានសុវត្ថិភាព។");
    }, 2000);
}

function spawnEV() {
    aiSpeak("បើកការបញ្ជាទិញអាទិភាព។ រថយន្តបន្ទាន់កំពុងធ្វើដំណើរ។");
    createVehicle(true);
    addLog("EMERGENCY_OVERRIDE_ACTIVE", "white");
}

// 5. ការក្លែងធ្វើការវាយប្រហារ (Threat Simulator)
function simulateIntrusion() {
    const ip = `${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.8.${Math.floor(Math.random()*255)}`;
    document.getElementById('attacker-ip').innerText = ip;
    
    const node = document.createElement('div');
    node.className = 'threat-node';
    node.style.left = Math.random() * 90 + '%';
    node.style.top = Math.random() * 90 + '%';
    map.appendChild(node);
    
    aiSpeak("ព្រមាន។ រកឃើញការលួចចូល។");
    addLog(`INTRUSION_DETECTED: ${ip}`, "var(--red)");
    
    // បំបាត់ចំណុចវាយប្រហារក្រោយ ៤ វិនាទី
    setTimeout(() => {
        node.remove();
        aiSpeak("ការលួចចូលត្រូវបានបំបាត់។");
    }, 4000);
}

// --- ចាប់ផ្តើមដំណើរការប្រព័ន្ធ (Boot sequence) ---
window.onload = () => {
    // បង្កើតឡានធម្មតា ១០ គ្រឿង
    for(let i=0; i<10; i++) createVehicle(false);
    
    updateSystem();
    
    // បង្កើតការវាយប្រហារសាកល្បងរៀងរាល់ ២៥ វិនាទី
    setInterval(simulateIntrusion, 25000);
    
    aiSpeak("Sentinel OS កំណែ ៧.០ បានចាប់ផ្តើម។ ប្រព័ន្ធទាំងអស់ដំណើរការទៀងទាត់។");
    addLog("SYSTEM_BOOT_SUCCESS", "var(--cyan)");
};
