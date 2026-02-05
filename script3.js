/* --- Vehicle Data Tag Styling --- */
.vehicle-tag {
    position: absolute;
    top: -45px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 242, 255, 0.15);
    color: var(--cyan);
    padding: 4px 8px;
    font-size: 0.65rem;
    border: 1px solid var(--cyan);
    border-radius: 4px;
    backdrop-filter: blur(5px);
    pointer-events: none;
    white-space: nowrap;
    box-shadow: 0 0 15px rgba(0, 242, 255, 0.4), 
                inset 0 0 5px rgba(0, 242, 255, 0.2);
    text-shadow: 0 0 5px var(--cyan);
    z-index: 1000;
    transition: opacity 0.3s ease;
}

/* បន្ថែមបន្ទាត់តភ្ជាប់ពី Tag មកឡាន (Indicator Line) */
.vehicle-tag::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    width: 1px;
    height: 10px;
    background: var(--cyan);
    box-shadow: 0 0 5px var(--cyan);
}

// បង្កើនភាពរស់រវើកឱ្យកាមេរ៉ា
function updateCCTV() {
    const feeds = document.querySelectorAll('.cam-feed');
    feeds.forEach(f => {
        // បង្កើតលេខកូដស្កេនឌីជីថលរត់លើកាមេរ៉ា
        if(Math.random() > 0.8) {
            f.style.opacity = Math.random() * 0.5 + 0.5; // Flicker effect
        }
    });
}
setInterval(updateCCTV, 100);

// បន្ថែមអថេរសម្រាប់គ្រប់គ្រងស្ថានភាពបង្វិល
let isHovered = false;
let rotationAngle = -10; // មុំចាប់ផ្តើម (RotateZ)

// ចាប់យក Event នៅពេល Mouse ចូល និង ចេញពីលើ Map
map.addEventListener('mouseenter', () => {
    isHovered = true;
});

map.addEventListener('mouseleave', () => {
    isHovered = false;
    // កំណត់ឱ្យវារត់មកមុំដើមវិញ
    map.style.transition = "transform 1s ease-out";
    map.style.transform = `rotateX(40deg) rotateZ(-10deg)`;
});

const map = document.querySelector('.hologram-map');

map.addEventListener('mousemove', (e) => {
    const { offsetWidth: width, offsetHeight: height } = map;
    const { offsetX: x, offsetY: y } = e;
    
    // គណនាមុំងាក (រ៉េ) តាមទីតាំង Mouse
    const xRotation = ((y / height) - 0.5) * 20; // ងាកឡើងចុះ 20deg
    const yRotation = ((x / width) - 0.5) * -20; // ងាកឆ្វេងស្តាំ 20deg
    
    map.style.transform = `rotateX(${45 + xRotation}deg) rotateZ(${-10 + yRotation}deg)`;
});

map.addEventListener('mouseleave', () => {
    // ត្រឡប់មកមុំដើមវិញដោយស្វ័យប្រវត្តិ
    map.style.transform = `rotateX(40deg) rotateZ(-10deg)`;
});

// កែសម្រួល Function animate() ដើម្បីបន្ថែមការបង្វិល
function animate() {
    // ... កូដចាស់របស់អ្នក (Unix clock, vehicle movement) ...

    if (isHovered) {
        rotationAngle += 0.5; // ល្បឿននៃការបង្វិល (អាចដំឡើង ឬបន្ថយបាន)
        map.style.transition = "none"; // ដក transition ចេញដើម្បីឱ្យវាបង្វិលរលូន
        map.style.transform = `rotateX(45deg) rotateZ(${rotationAngle}deg)`;
    }

    requestAnimationFrame(animate);
}
