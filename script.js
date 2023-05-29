// chooser
const clockType = document.querySelector("#clockType");
const digital = document.querySelector(".digital");
const analogue1 = document.querySelector(".type1");
const analogue2 = document.querySelector(".type2");

// analog clock hands type 1
let secondHand = document.querySelector(".secHand");
let minuteHand = document.querySelector(".minHand");
let  hourHand = document.querySelector(".hourHand");

// analog clock hands type 2
let secondHand2 = document.querySelector(".secHandII");
let minuteHand2 = document.querySelector(".minHandII");
let  hourHand2 = document.querySelector(".hourHandII");


const mainTimePolesBox = document.getElementsByClassName("mainTimePoles")[0];
const poles = document.querySelectorAll(".pole");

// analogue settings and controller

const analogueMenu = document.querySelector(".analogueMenu");
const formAnalogueMenuCont = document.querySelector("#analogueMenuCont");
const saveAnalog = document.querySelector("#saveBtn");
const closeAnlMenu = document.querySelector(".closeAnlMenu");
const openAnelMenu = document.querySelectorAll(".openAnelMenu");
const clockImgBtn = [...document.querySelectorAll(".imgBtn")];

// digital clock display
const hourNumDigital = document.querySelector(".hourNum");
const minNumDigital = document.querySelector(".minNum");
const secNumDigital = document.querySelector(".secNum");
const meridianDigital = document.querySelector(".meridian");

const nowMon = document.querySelector(".nowMon");
const nowDate = document.querySelector(".nowDate");
const nowDay = document.querySelector(".nowDay");

const meridian = document.querySelector(".meridian");

const tmpEl = document.querySelector(".tempEl");

// for color change
const digitalCont = document.querySelector(".digitalCont");
const otherInfoCont = document.querySelector(".otherInfo");

// digital settings and controller
const digitalSettings = document.querySelector(".settings");
const digitalMenu = document.querySelector(".digitalMenu");
const closeMenuBtn = document.querySelector(".closeMenu");
const saveSet = document.querySelector("#save");
const formMenuCont = document.querySelector("#menuCont");

const stateInput = document.querySelector("#state");
const colorsInput = document.querySelector(".colors");
const formatRadio = document.querySelectorAll(".Format");


// color codes for clock
const colorCodes = ["#CD1818", "#068DA9", "#F79327", "#F266AB", "#1B9C85", "#8B1874", "#212A3E", "#9A208C", "#C07F00", "#FFE15D", "#263A29", "#D3756B"];
const handColors = ["#068DA9", "#F266AB", "#9A208C", "#D3756B"];


// just to get current hour when loaded
let melt = new Date().getTime();
let oldHour = Math.floor((melt / 1000 / 3600 % 24) + 1);

// function that returns a random number
function rn(arr){
    return Math.floor(Math.random() * arr.length)
}


// too get style of analogue clock
let analogClockType;
let analogue;

// on load event listener to change colors
window.onload = () => {

    let ranNum = Math.floor(Math.random() * colorCodes.length);

    poles.forEach(pole => {
        pole.style.background = `${colorCodes[ranNum]}`
    })

    mainTimePolesBox.style.setProperty("--bgColor", colorCodes[rn(colorCodes)])
}


// analog timer function
function analogTime(){
    let currTime = new Date().getTime()

    let currHour = Math.floor((currTime / 1000 / 3600 % 24) + 1);

    let hour = Math.floor((currTime / 1000 / 3600 % 24) + 1);
    let minute = Math.floor(currTime / 1000 / 60 % 60);
    let sec = Math.floor(currTime / 1000 % 60);

    let hoursHand = ((currTime / 1000 / 3600 % 24) + 1);
    let minutesHand = (currTime / 1000 / 60 % 60);
    let secondsHand = Math.floor(currTime / 1000 % 60);

    let secondDeg = Math.floor(((secondsHand) * 360) / 60)
    let minuteDeg = parseFloat((minutesHand * 360 / 60).toFixed(2))
    let hourDeg = hoursHand < 12 ? parseFloat(((hoursHand * 360 * 5) / 60).toFixed(2)) : parseFloat((((hoursHand - 12) * 360 * 5) / 60).toFixed(2))

    secondHand.style.transform = `rotate(${secondDeg}deg)`;
    minuteHand.style.transform = `rotate(${minuteDeg}deg)`;
    hourHand.style.transform = `rotate(${hourDeg}deg)`;

    secondHand2.style.transform = `rotate(${secondDeg}deg)`;
    minuteHand2.style.transform = `rotate(${minuteDeg}deg)`;
    hourHand2.style.transform = `rotate(${hourDeg}deg)`;

    if(currHour > oldHour){
        oldHour++;
        let ranNum = Math.floor(Math.random() * colorCodes.length)
        poles.forEach(pole => {
            pole.style.background = `${colorCodes[ranNum]}`
        })
        mainTimePolesBox.style.setProperty("--bgColor", colorCodes[rn(colorCodes)]);
    }

    if(secondDeg === 0){
        secondHand.style.background = `${handColors[rn(handColors)]}`;
        secondHand2.style.background = `${handColors[rn(handColors)]}`
    }

    if(hourDeg === 0){
        hourHand.style.background = `${handColors[rn(handColors)]}`;
        hourHand2.style.background = `${handColors[rn(handColors)]}`
    }

    if(minuteDeg === 0){
        minuteHand.style.background = `${handColors[rn(handColors)]}`;
        minuteHand2.style.background = `${handColors[rn(handColors)]}`
    }

}

analogTime()
let analogueTimer = setInterval(analogTime, 1000)


// digital time function and logic

let userSettings;

// on window loading

let APIURL = `https://api.weatherapi.com/v1/current.json?key=`; // updated
let APIKEY = `aaa5eb12cbca42e6b9385412223012`;

async function weatherDetails(location){
    try{
        let serverResponse = await fetch(`${APIURL}+${APIKEY}&q=${location}`);
        let resp = await serverResponse.json();
        return resp;
    }catch(err){
        console.log(err)
    }
}


let lattitude;
let longitude;

let GEOCODINGKEY = `64336cfdc95e4fb58d5e897eacc762bd`;

let myUserColor;

window.onload = () => {

    // getCoOrdinate();

    //
    let imgsDiv = document.querySelectorAll(".imageType");
    imgsDiv.forEach((cont) => {
        cont.classList.remove("active");
    })

    // chosen analogue type
    analogClockType = localStorage.getItem("analogueSet") || "type1";

    if(analogClockType === "type1"){
        analogue = analogue1;
        analogue2.style.display = "none";
        clockImgBtn[0].parentElement.classList.add("active")
    }else{
        analogue = analogue2;
        analogue1.style.display = "none";
        clockImgBtn[1].parentElement.classList.add("active");
    }

    // gettings the colours list
    const colours = [...document.querySelectorAll(".color")]

    // get usersettings from local storage if any
    userSettings = JSON.parse(localStorage.getItem("userSet")) || {state: "", colour: "#dd2727e7", format: "12hours"};

    // get the new color when chosen
    myUserColor = userSettings.colour == "" ? "" : userSettings.colour;

    stateInput.value = userSettings.state == "" ? "" : userSettings.state;
    colours.forEach((color) => {
        if(color.id == userSettings.colour){
            color.classList.add("active")
        }else{
            color.classList.remove("active")
        }
    })


    let loadedType = localStorage.getItem("clockType") || "Analogue";
    clockType.value = loadedType;

    if(userSettings.colour == ""){
        digitalCont.style.color = `#dd2727e7`;
        otherInfoCont.style.color = `#dd2727e7`;
    }else{
        digitalCont.style.color = `${userSettings.colour}`;
        otherInfoCont.style.color = `${userSettings.colour}`;
    }
    

    if(loadedType == "Digital"){

        digital.style.display = 'grid';
        analogue.style.display = "none";
    }else{
        digital.style.display = 'none';
        analogue.style.display = "block";
    }

    if(loadedType == "Digital"){
        digitalTime()
        digitalTimer = setInterval(digitalTime, 1000)
        clearInterval(analogueTimer);
        digital.style.display = 'grid';
        analogue.style.display = "none";
    }else{
        analogTime()
        analogueTimer = setInterval(analogTime, 1000);
        clearInterval(digitalTimer);
        digital.style.display = 'none';
        analogue.style.display = "block";
    }

    otherInfo(userSettings);

    if(userSettings.state === "" || userSettings.state == null)return;
    weatherDetails(userSettings.state).then( ({location, current}) => {
        let currTemp = current.temp_c;
        tmpEl.textContent = `${(currTemp)}`;
    })

}

// function getCoOrdinate(){
//     navigator.geolocation.getCurrentPosition((position) => {
//         lattitude = position.coords.latitude;
//         longitude = position.coords.longitude;

//         if(lattitude !== "" || lattitude !== undefined){
//             getLocation(lattitude, longitude)
//         }else{
//             return
//         }
        
//     })
// }

// async function getLocation(lattitude, longitude){
//     let serverResponse = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lattitude}+${longitude}&key=${GEOCODINGKEY}`);
//     let resp = await serverResponse.json();
//     let response = resp.results[0];
//     let {name} = response.annotations.timezone;
//     let stateArr = name.split("/");
//     let myState = stateArr[1];
//     localStorage.setItem("userState", myState);
//     userState = myState;

//     weatherDetails(userState).then( ({location, current}) => {
//         let currTemp = current.temp_c;
//         tmpEl.textContent = `${(currTemp)}`;
//     })
// }

function getCurrDay(num){
    if(num == 0){
        return 'SUN'
    }else if(num == 1){
        return 'MON'
    }else if(num == 2){
        return 'TUE'
    }else if(num == 3){
        return 'WED'
    }else if(num == 4){
        return 'THUR'
    }else if(num == 5){
        return 'FRI'
    }else{
        return 'SAT'
    }
}

function otherInfo(userSettings){
    let dateFunc = new Date();
    let currMonth = (dateFunc.getMonth() + 1);
    let currDate = (dateFunc.getDate());
    let currDay = getCurrDay(dateFunc.getDay());

    let currHour = Math.floor((dateFunc.getTime() / 1000 / 3600 % 24) + 1);
    let currMin = Math.floor((dateFunc.getTime()) / 1000 / 60 % 60);
    let currSec = Math.floor(dateFunc.getTime() / 1000 % 60);

    let meridians = [...meridian.children];

    if(currHour >= 12 && currHour < 24){
        meridians[1].style.color = `gray`;
        meridians[3].style.color = `${userSettings.colour ? userSettings.colour : `rgba(221, 39, 39, 0.904)`}`
    }else if(currHour == 24 || currHour < 12){
        meridians[1].style.color = `${userSettings.colour ? userSettings.colour : `rgba(221, 39, 39, 0.904)`}`
        meridians[3].style.color = `gray`
    }

    nowMon.textContent = `${currMonth > 9 ? currMonth : `0${currMonth}`}`;
    nowDate.textContent = `${currDate > 9 ? currDate : `0${currDate}`}`
    nowDay.textContent = `${currDay}`
}

let pastHour = Math.floor((new Date().getTime()) / 1000 / 3600 % 24 + 1);


function digitalTime(){
    
    let timeOffset;

    if(userSettings.format == "24hours"){
        timeOffset = 0;
    }else{
        timeOffset = 12;
    }

    let currTime = new Date().getTime();

    let hour = Math.floor((currTime / 1000 / 3600 % 24) + 1);
    let minute = Math.floor(currTime / 1000 / 60 % 60);
    let sec = Math.floor(currTime / 1000 % 60);

    let analogHr = hour > 12 ? hour - timeOffset : hour
    hourNumDigital.textContent = `${analogHr > 9 ? analogHr : `0${analogHr}`}`;
    minNumDigital.textContent = `${(minute > 9 ? minute : `0${minute}`)}`;
    secNumDigital.textContent = `${sec > 9 ? sec : `0${sec}`}`;

    const currHr = Math.floor((new Date().getTime()) / 1000 / 3600 % 24 + 1);

    if(currHr > pastHour){
        console.log(pastHour, currHr)
        otherInfo(userSettings);
        weatherDetails(userState).then( ({location, current}) => {
            let currTemp = current.temp_c;
            tmpEl.textContent = `${(currTemp)}`;
        })
        setTimeout(
            () => {
                pastHour = currHr;
            }, 5000
        )
    }

}


// choose type of clock type

clockType.addEventListener("change", (e) => {
    let userType = (e.target.value);
    userSettings = JSON.parse(localStorage.getItem("userSet")) || {state: "", colour: "", format: "12hours"};
    localStorage.setItem("clockType", userType);
    if(userType == "Digital"){
        clearInterval(analogueTimer);
        digitalTime()
        digitalTimer = setInterval(digitalTime, 1000);
        otherInfo(userSettings)
        digital.style.display = 'grid';
        analogue.style.display = "none";
    }else{
        clearInterval(digitalTimer);
        analogTime();
        analogueTimer = setInterval(analogTime, 1000);
        digital.style.display = 'none';
        analogue.style.display = "block";
    }
})

let stopColorChange = setInterval(digitalColor, 3000)

const colorChanger = document.querySelector(".colorChanger");
function digitalColor(){
    if(colorChanger.classList.contains("close"))return;
    colorChanger.style.backgroundColor = `${colorCodes[rn(colorCodes)]}`
}

colorChanger.addEventListener("click", () => {
    if(colorChanger.classList.contains("open")){
        colorChanger.classList.remove("open");
        colorChanger.classList.add("close");
        clearInterval(stopColorChange);
    }else{
        colorChanger.classList.add("open");
        colorChanger.classList.remove("close");
        stopColorChange = setInterval(digitalColor, 3000);
    }
})


// digital clock settings
// digitalSettings.addEventListener("click", () => {
//     let userEntry = prompt("your state ?: ");
//     if(userEntry === "" || userEntry == null)return;
//     userEntry = userEntry.trim();
//     userState = userEntry;
//     localStorage.setItem("userState", userState);
//     weatherDetails(userState).then( ({location, current}) => {
//         if(current.temp_c === "" || current.temp_c == null || current.temp_c == undefined)return;
//         let currTemp = current.temp_c;
//         tmpEl.textContent = `${(currTemp)}`;
//     })
// })

closeMenuBtn.addEventListener("click", () => {

    if(digitalMenu.classList.contains("open")){
        digitalMenu.classList.remove("open");
        digitalMenu.classList.add("close");
    }

})

// digital settings and menu function

digitalSettings.addEventListener("click", () => {

    if(digitalMenu.classList.contains("close")){
        digitalMenu.classList.add("open");
        digitalMenu.classList.remove("close");
    }else{
        digitalMenu.classList.add("close");
        digitalMenu.classList.remove("open");
    }

})

formMenuCont.addEventListener("submit", (e) => {
    e.preventDefault()
})

colorsInput.addEventListener("click", (e) => {
    const colours = [...document.querySelectorAll(".color")];
    if(!(e.target.classList.contains("color")))return
    colours.forEach((cl) => {
        cl.classList.remove("active");
    })
    e.target.classList.add("active");
    myUserColor = e.target.id;
})


// get hours format when chosem
let myUserFormat = "12hours";
formatRadio.forEach((rad) => {
    rad.addEventListener("click", (e) => {
        myUserFormat = e.target.value
    })

})

saveSet.addEventListener("click", () => {
    let entryState = stateInput.value;
    let entryColor = myUserColor;
    let entryFormat = myUserFormat;

    if(entryColor == "" || entryState === "" || entryFormat == "")return;

    userSettings = {
        state: entryState,
        colour: entryColor,
        format: entryFormat,
    }

    if(userSettings.colour == ""){
        digitalCont.style.color = `#dd2727e7`;
        otherInfoCont.style.color = `#dd2727e7`;
    }else{
        digitalCont.style.color = `${userSettings.colour}`;
        otherInfoCont.style.color = `${userSettings.colour}`;
    }
    
    otherInfo(userSettings);

    weatherDetails(userSettings.state).then( ({location, current}) => {
        let currTemp = current.temp_c;
        tmpEl.textContent = `${(currTemp)}`;
    })

    localStorage.setItem("userSet", JSON.stringify(userSettings));
    digitalMenu.classList.add("close");
    digitalMenu.classList.remove("open");
})


// analogue settings and function
openAnelMenu.forEach((btn) => {
    btn.addEventListener("click", () => {
        analogueMenu.classList.add("open");
        analogueMenu.classList.remove("close")
    })    
})

closeAnlMenu.addEventListener("click", () => {
    analogueMenu.classList.remove("open");
    analogueMenu.classList.add("close")
})

formAnalogueMenuCont.addEventListener("submit", (e) => {
    e.preventDefault();
})

clockImgBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
        let imgsDiv = document.querySelectorAll(".imageType");
        imgsDiv.forEach((cont) => {
            cont.classList.remove("active");
        })
        let parentDiv = btn.parentElement;
        parentDiv.classList.add("active");
        analogClockType = btn.alt;
    })
})

saveAnalog.addEventListener("click", () => {
    if(analogClockType === "" || analogClockType === null || analogClockType == undefined){
        localStorage.setItem("analogueSet", "type1")
    }else{
        localStorage.setItem("analogueSet", analogClockType)
    }

    if(analogClockType === "type1"){
        analogue = analogue1;
        analogue2.style.display = "none";
    }else{
        analogue = analogue2;
        analogue1.style.display = "none";
    }

    analogue.style.display = "block";

    analogueMenu.classList.remove("open");
    analogueMenu.classList.add("close")
})