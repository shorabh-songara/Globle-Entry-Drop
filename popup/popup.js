//ELements
const locationidElement = document.getElementById("locationid")
const startDateElement = document.getElementById("startdate")
const endDateElement = document.getElementById("enddate")

//buttons 
const startButtonELement = document.getElementById("startbtn")
const stopButtonElement = document.getElementById("stopbtn")

//stopped and running span
const runningstatus = document.getElementById("isRunningSpan")
const stoppedstatus = document.getElementById("isStoppedSpan")

const hideElement = (elem) =>{
    elem.style.display = "none";
}
const showElement = (elem) =>{
    elem.style.display = "";
}

const disableElement = (elem)=>{
    elem.disabled = true;
}

const enableElement = (elem)=>{
    elem.disabled = false;
}

const handleOnStartState = ()=>{

    //for status
    showElement(runningstatus)
    hideElement(stoppedstatus)
    //buttons
    disableElement(startButtonELement)
    enableElement(stopButtonElement)
}

const handleOnStopState = ()=>{
    //status
    showElement(stoppedstatus);
    hideElement(runningstatus);
    //button
    disableElement(stopButtonElement)
    enableElement(startButtonELement)
}
startButtonELement.onclick =()=>{
    handleOnStartState();
    const prefs = {
        locationid : locationidElement.value,
        startDate : startDateElement.value,
        endDate : endDateElement.value,
        tzData : locationidElement.options[locationidElement.selectedIndex].getAttribute('data-tz')

    }
    chrome.runtime.sendMessage({
        event : "onStart",
        prefs
    })
}
stopButtonElement.onclick =() => {
    handleOnStopState();
    chrome.runtime.sendMessage({
        event : "onStop"
    })
}

chrome.storage.local.get(["locationid", "startDate", "endDate" , "locations" , "isRunning"], (result) =>{
    const {locationid , startDate , endDate , locations ,isRunning} = result;

    console.log("get locations ", locations)
    setlocations(locations)
    
    if(locationid){
        locationidElement.value = locationid
    }
    if(startDate){
        startDateElement.value = startDate;
    }
    if(endDate){
        endDateElement.value = endDate;
    } 

    if(isRunning){
        handleOnStartState();
    }else{
        handleOnStopState();
    }
})

function setlocations(locations){
    locations.forEach(loc =>{
        const optionElement = document.createElement("option")
        optionElement.value = loc.id,
        optionElement.textContent = loc.name,
        optionElement.setAttribute('data-tz' , loc.tzData)
        locationidElement.appendChild(optionElement)
    })
}