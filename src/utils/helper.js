export const getTodoItemType = (timestamp) => {
    // let timestamp = "2021-08-19T18:47";
    const objectTimestamp = new Date(timestamp);
    const currentTimestamp = new Date();
    let UTCTimestamp = currentTimestamp.getTime() + (currentTimestamp.getTimezoneOffset() * 60000);
    let convertedTimestamp = new Date(UTCTimestamp + (3600000*+5.5));
    if(objectTimestamp < convertedTimestamp){
        return false;
    }
    else{
        return true;
    }
}


export const getCurrentTimeStamp = () => {
    let currentTimeStamp = "";
    const timeStamp = new Date();
    let day = timeStamp.getDate();
    let month = timeStamp.getMonth()+1;
    const year = timeStamp.getFullYear();
    let hours = timeStamp.getHours();
    let minutes = timeStamp.getMinutes();

    if(hours < 10){
        hours = '0' + hours;
    }

    if(minutes < 10){
        minutes = '0' + minutes;
    }

    if(month < 10){
        month = '0' + month;
    }

    if(day < 10){
        day = '0' + day;
    }

    const minDate = year + '-' + month + '-' + day;
    const minTime = hours + ':' + minutes;
    currentTimeStamp = minDate + 'T' + minTime;
    return currentTimeStamp;
}

const getPrioritiesInNumeric = (priority) => {
    switch(priority){
        case "High": return 3;
        case "Medium": return 2;
        case "Low": return 1; 
        default: return 0;
    }
}

export const sortAscending = (item1,item2,filterObject) => {
    let term1,term2;
    if(filterObject.filterWay === "priority"){
        term1 = getPrioritiesInNumeric(item1.priority);
        term2 = getPrioritiesInNumeric(item2.priority);                   
    }
    else{
        term1 = item1[filterObject.filterWay];
        term2 = item2[filterObject.filterWay];
    }

    if(term1 < term2){
        return -1;
    }
    else if(term1 > term2){
        return 1;
    }
    else{
        return 0;
    }
}

export const sortDescending = (item1,item2,filterObject) => {
    let term1,term2;
    if(filterObject.filterWay === "priority"){
        term1 = getPrioritiesInNumeric(item1.priority);
        term2 = getPrioritiesInNumeric(item2.priority);                   
    }
    else{
        term1 = item1[filterObject.filterWay];
        term2 = item2[filterObject.filterWay];
    }   
    if(term1 < term2){
        return 1;
    }
    else if(term1 > term2){
        return -1;
    }
    else{
        return 0;
    }
}