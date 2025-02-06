function calculatePoints() {
    let points = 0;
    
    const temp = Number(inputs.temperature.value);
    if (temp <= 15) points += 10;
    else if (temp <= 25) points += 15;
    else if (temp <= 32) points += 10;
    else if (temp <= 34) points += 5;
    
    const windSpeed = Number(inputs.windSpeed.value);
    if (windSpeed > 20) points += 10;
    else if (windSpeed > 15) points += 8;
    else if (windSpeed > 10) points += 5;
    
    const windGust = Number(inputs.windGust.value);
    if (windGust > 35) points += 15;
    else if (windGust > 25) points += 10;
    else if (windGust > 15) points += 5;
    
    switch(inputs.precipType.value) {
        case 'snow':
            points += 15;
            break;
        case 'wintrymix':
            points += 10;
            break;
        case 'lightsnow':
            points += 8;
            break;
        case 'rain':
            points += (temp <= 33 ? 7 : 3);
            break;
    }
    
    const precipAmount = Number(inputs.precipAmount.value);
    if (precipAmount >= 4) points += 20;
    else if (precipAmount >= 2) points += 15;
    else if (precipAmount >= 1) points += 10;
    else points += 5;
    
    switch(inputs.precipEnding.value) {
        case 'before5am':
            points += 3;
            break;
        case '5am-7am':
            points += 8;
            break;
        case 'after7am':
            points += 12;
            break;
        case 'ongoing':
            points += 15;
            break;
    }
    
    if (inputs.timing.value === 'yes') points += 10;
    if (inputs.afternoon.value === 'yes') points += 15;
    
    if (inputs.trend.value === 'falling') points += 8;
    else if (inputs.trend.value === 'steady') points += 4;
    
    return points;
}

function calculateProbabilities() {
    const points = calculatePoints();
    const delay = Math.min(100, Math.max(0, points + 5));
    const cancel = Math.min(100, Math.max(0, points - 25));
    
    delayDisplay.textContent = Math.round(delay);
    cancelDisplay.textContent = Math.round(cancel);
}
