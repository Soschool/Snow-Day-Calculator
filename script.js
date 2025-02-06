const inputs = {
    temperature: document.getElementById('temperature'),
    windSpeed: document.getElementById('windSpeed'),
    windGust: document.getElementById('windGust'),
    precipAmount: document.getElementById('precipAmount'),
    precipType: document.getElementById('precipType'),
    precipEnding: document.getElementById('precipEnding'),
    timing: document.getElementById('timing'),
    afternoon: document.getElementById('afternoon'),
    trend: document.getElementById('trend')
};

const delayDisplay = document.querySelector('#delayResult span');
const cancelDisplay = document.querySelector('#cancelResult span');

Object.values(inputs).forEach(input => {
    input.addEventListener('change', calculateProbabilities);
});

function calculatePoints() {
    let points = 0;
    
    const temp = Number(inputs.temperature.value);
    if (temp <= 15) points += 15;
    else if (temp <= 25) points += 20;
    else if (temp <= 32) points += 15;
    else if (temp <= 34) points += 10;
    
    const windSpeed = Number(inputs.windSpeed.value);
    if (windSpeed > 20) points += 15;
    else if (windSpeed > 15) points += 10;
    else if (windSpeed > 10) points += 8;
    
    const windGust = Number(inputs.windGust.value);
    if (windGust > 35) points += 20;
    else if (windGust > 25) points += 15;
    else if (windGust > 15) points += 10;
    
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
    
    const precipAmount = Number(inputs.precipAmount.value);
    if (precipAmount >= 4) points += 25;
    else if (precipAmount >= 2) points += 20;
    else if (precipAmount >= 1) points += 15;
    else points += 5;
    
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
    
    if (inputs.timing.value === 'yes') points += 15;
    if (inputs.afternoon.value === 'yes') points += 25;
    
    if (inputs.trend.value === 'falling') points += 10;
    else if (inputs.trend.value === 'steady') points += 5;
    
    return points;
}

function calculateProbabilities() {
    const points = calculatePoints();
    const delay = Math.min(100, Math.max(0, points - 40));
    const cancel = Math.min(100, Math.max(0, points >= 80 ? points - 60 : points - 70));
    
    delayDisplay.textContent = Math.round(delay);
    cancelDisplay.textContent = Math.round(cancel);
}

calculateProbabilities();
