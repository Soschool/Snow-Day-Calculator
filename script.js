// Get all input elements
const inputs = {
    temperature: document.getElementById('temperature'),
    windSpeed: document.getElementById('windSpeed'),
    windGust: document.getElementById('windGust'),
    precipAmount: document.getElementById('precipAmount'),
    precipType: document.getElementById('precipType'),
    precipEnding: document.getElementById('precipEnding'),
    timing: document.getElementById('timing'),
    trend: document.getElementById('trend')
};

// Get result display elements
const delayDisplay = document.querySelector('#delayResult span');
const cancelDisplay = document.querySelector('#cancelResult span');

// Add event listeners to all inputs
Object.values(inputs).forEach(input => {
    input.addEventListener('change', calculateProbabilities);
});

function calculatePoints() {
    let points = 0;
    
    // Temperature points
    const temp = Number(inputs.temperature.value);
    if (temp <= 15) points += 15;
    else if (temp <= 25) points += 20;
    else if (temp <= 32) points += 15;
    else if (temp <= 34) points += 10;
    
    // Wind speed points
    const windSpeed = Number(inputs.windSpeed.value);
    if (windSpeed > 20) points += 15;
    else if (windSpeed > 15) points += 10;
    else if (windSpeed > 10) points += 8;
    
    // Wind gust points
    const windGust = Number(inputs.windGust.value);
    if (windGust > 35) points += 20;
    else if (windGust > 25) points += 15;
    else if (windGust > 15) points += 10;
    
    // Precipitation type points
    switch(inputs.precipType.value) {
        case 'snow':
            points += 20;
            break;
        case 'wintrymix':
            points += 15;
            break;
        case 'lightsnow':
            points += 12;
            break;
        case 'rain':
            points += (temp <= 33 ? 10 : 5);
            break;
    }
    
    // Precipitation amount points
    const precipAmount = Number(inputs.precipAmount.value);
    if (precipAmount < 0.5) points += 5;
    else if (precipAmount < 1) points += 10;
    else if (precipAmount < 2) points += 15;
    else points += 20;
    
    // Precipitation ending time points
    switch(inputs.precipEnding.value) {
        case 'before5am':
            points += 5;
            break;
        case '5am-7am':
            points += 10;
            break;
        case 'after7am':
            points += 15;
            break;
        case 'ongoing':
            points += 20;
            break;
    }
    
    // Early morning timing points
    if (inputs.timing.value === 'yes') points += 15;
    
    // Temperature trend points
    if (inputs.trend.value === 'falling') points += 10;
    else if (inputs.trend.value === 'steady') points += 5;
    
    return points;
}

function calculateProbabilities() {
    const points = calculatePoints();
    
    // Calculate probabilities using our calibrated formulas
    let delay = points + 20;
    let cancel = points;
    
    // Cap at 100%
    delay = Math.min(100, Math.max(0, delay));
    cancel = Math.min(100, Math.max(0, cancel));
    
    // Update the display
    delayDisplay.textContent = Math.round(delay);
    cancelDisplay.textContent = Math.round(cancel);
}

// Initial calculation
calculateProbabilities();
