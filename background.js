
import fetchLocation from "./fetchlocation.js"
const ALARM_NAME = "DROP_ALARM"
chrome.runtime.onInstalled.addListener((details) => {
    console.log("oninstalled reason" , details.reason)
    fetchLocation();
})
chrome.runtime.onMessage.addListener(data=>{
    const {event , prefs} = data;
    switch (event) {
        case "onStop":
            handleOnStop();
            break;
        case "onStart":
            handleOnStart(prefs);
            break;
        default: 
            break;          
    }
})
const handleOnStop = ()=>{
    console.log("onstop in background")
    setRunningStatus(false);
    stopAlarm();
}
const handleOnStart=(prefs)=>{   
    console.log("onstart on background")
    // console.log("prefs recevied" , prefs)
    chrome.storage.local.set(prefs)
    setRunningStatus(true);
    creatAlarm();
}
const setRunningStatus = (isRunning)=>{
    chrome.storage.local.set({isRunning})
}
const creatAlarm = ()=>{
    chrome.alarms.get(ALARM_NAME, existingAlarm =>{
        if(!existingAlarm){
            chrome.alarms.create(
                ALARM_NAME,
                {periodInMinutes : 1.0}
            )
        }
    })
}

chrome.alarms.onAlarm.addListener(()=>{
    console.log("onAlarm schedule code is running ")
})

const stopAlarm = ()=>{
    chrome.alarms.clearAll();
}