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
    if (input) {  // Add check to ensure element exists
        input.addEventListener('input', calculateProbabilities);
        input.addEventListener('change', calculateProbabilities);
    }
});

function calculatePoints() {
    let points = 0;
    
    // Temperature points
    const temp = Number(inputs.temperature.value) || 32;
    if (temp <= 15) points += 10;
    else if (temp <= 25) points += 15;
    else if (temp <= 32) points += 10;
    else if (temp <= 34) points += 5;
    
    // Wind speed points
    const windSpeed = Number(inputs.windSpeed.value) || 0;
    if (windSpeed > 20) points += 10;
    else if (windSpeed > 15) points += 7;
    else if (windSpeed > 10) points += 5;
    
    // Wind gust points
    const windGust = Number(inputs.windGust.value) || 0;
    if (windGust > 35) points += 15;
    else if (windGust > 25) points += 10;
    else if (windGust > 15) points += 5;
    
    // Precipitation type points
    const precipType = inputs.precipType.value;
    switch(precipType) {
        case 'snow':
            points += 15;
            break;
        case 'wintrymix':
            points += 10;
            break;
        case 'lightsnow':
            points += 7;
            break;
        case 'rain':
            points += (temp <= 33 ? 7 : 3);
            break;
    }
    
    // Precipitation amount points
    const precipAmount = Number(inputs.precipAmount.value) || 0;
    if (precipAmount < 0.5) points += 3;
    else if (precipAmount < 1) points += 7;
    else if (precipAmount < 2) points += 10;
    else points += 15;
    
    // Precipitation ending time points
    const precipEnding = inputs.precipEnding.value;
    switch(precipEnding) {
        case 'before5am':
            points += 0;
            break;
        case '5am-7am':
            points += 3;
            break;
        case 'after7am':
            points += 10;
            break;
        case 'ongoing':
            points += 15;
            break;
    }
    
    // Early morning timing points
    if (inputs.timing.value === 'yes') points += 10;
    
    // Temperature trend points
    const trend = inputs.trend.value;
    if (trend === 'falling') points += 7;
    else if (trend === 'steady') points += 3;
    
    return points;
}

function calculateProbabilities() {
    const points = calculatePoints();
    console.log('Total points:', points); // Add this for debugging
    
    // Calculate probabilities using our calibrated formulas
    const delay = Math.min(100, Math.max(0, points - 20));
    const cancel = Math.min(100, Math.max(0, points >= 40 ? points - 40 : points - 20));
    
    // Update the display
    delayDisplay.textContent = Math.round(delay);
    cancelDisplay.textContent = Math.round(cancel);
}

// Initial calculation
calculateProbabilities();
