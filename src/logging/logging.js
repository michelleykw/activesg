// ------------------------ IMPORT ------------------------ //
// Copy this:
// import { sendNetworkLog } from '../logging/logging.js';
// Modify the path accordingly.

// ------------------------ PARAMETERS ------------------------ //
// eventname: The trigger (e.g. 'Click on Search Bar')
// target: The button that was clicked (e.g. 'Bishan Sports Hall Card')
// info: anything
// log_version: versionId (1-4)

// ------------------------ EXMAPLE USAGE ------------------------ //
// sendNetworkLog('Clicked on: ' + loc, loc + ' card', '', versionId);
// where loc = venue name

// Note: UUID and timestamp are automatically generated/ retrieved.


function getUUID() {
    return window.localStorage.getItem('MTurkID');
}

function getCurrentTimeStamp() {
    const oldDate = new Date(2022, 3, 1, 0, 0, 0, 0);
    var secondBetweenTwoDate = Math.abs((new Date().getTime() - oldDate.getTime()) / 1000);
    return secondBetweenTwoDate;
}

// Logging submission function
// submits to the google form at this URL:
// docs.google.com/forms/d/e/1FAIpQLSfa2rk1aLNQ9UnV9uWh5vWwitK1z3ukAn6gg-w_UOdHvebgww/viewform?usp=sf_link
export function sendNetworkLog(eventname, target, info, log_version) {
    console.log('Sending to form...');
    var formid = "e/1FAIpQLSfa2rk1aLNQ9UnV9uWh5vWwitK1z3ukAn6gg-w_UOdHvebgww";
    var data = {
        "entry.1493906674": getUUID(),
        "entry.1999783829": getCurrentTimeStamp(),
        "entry.115923075": eventname,
        "entry.631695359": target,
        "entry.206432095": info,
        "entry.389866351": log_version
    };
    var params = [];
    for (const key in data) {
        params.push(key + "=" + encodeURIComponent(data[key]));
    }
    // Submit the form using an image to avoid CORS warnings; warning may still happen, but log will be sent. Go check result in Google Form
    (new Image).src = "https://docs.google.com/forms/d/" + formid +
        "/formResponse?" + params.join("&");
}