/**
 * SENTINEL OS - SOLAR GRID ENGINE
 * Target: Year 2038 32-bit Overflow (T-Zero)
 */

function calculateSolarLoad() {
    const display = document.getElementById('solar-load-val');
    
    // T-Zero: Tue, 19 Jan 2038 03:14:07 GMT
    const T_ZERO = 2147483647; 
    
    // Let's assume the "System Start" or 0% was Jan 1st, 2020
    const START_DATE = 1577836800; 
    
    const NOW = Math.floor(Date.now() / 1000);
    
    // 3 Months in seconds (approx 90 days)
    const THREE_MONTHS = 90 * 24 * 60 * 60;
    const END_CRITICAL = T_ZERO + THREE_MONTHS;

    let percentage;

    if (NOW < T_ZERO) {
        // Calculation leading up to T-Zero
        const totalDuration = T_ZERO - START_DATE;
        const elapsed = NOW - START_DATE;
        percentage = (elapsed / totalDuration) * 100;
    } else if (NOW >= T_ZERO && NOW <= END_CRITICAL) {
        // Post T-Zero (The 3 Month Overload Phase)
        // This simulates the grid exceeding 100% or entering "Critical Overflow"
        const overflowElapsed = NOW - T_ZERO;
        const overflowPercentage = (overflowElapsed / THREE_MONTHS) * 20; // Adds up to 20% extra
        percentage = 100 + overflowPercentage;
    } else {
        // System Reset/Shutdown after the 3-month window
        percentage = 0; 
    }

    // Update the UI
    if (display) {
        display.innerHTML = `${percentage.toFixed(2)}%`;
        
        // Visual warning if approaching T-Zero
        if (percentage > 95) {
            display.style.color = "#ff3131"; // Red Alert
            display.classList.add("blink-fast");
        }
    }
}

// Update every second
setInterval(calculateSolarLoad, 1000);
