// chooser
const clockType = document.querySelector("#clockType")
const digital = document.querySelector(".digital");
const analogue = document.querySelector(".analogue");
// analog clock hands
let secondHand = document.querySelector(".secHand");
let minuteHand = document.querySelector(".minHand");
let  hourHand = document.querySelector(".hourHand");

const mainTimePolesBox = document.getElementsByClassName("mainTimePoles")[0];
const poles = document.querySelectorAll(".pole");

// digital clock display
const hourNumDigital = document.querySelector(".hourNum");
const minNumDigital = document.querySelector(".minNum");
const secNumDigital = document.querySelector(".secNum");
const meridianDigital = document.querySelector(".meridian");

const digitalSettings = document.querySelector(".settings");

const nowMon = document.querySelector(".nowMon");
const nowDate = document.querySelector(".nowDate");
const nowDay = document.querySelector(".nowDay");

const meridian = document.querySelector(".meridian");

const tmpEl = document.querySelector(".tempEl");


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
    minuteHand.style.transform = `rotate(${minuteDeg}deg)`
    hourHand.style.transform = `rotate(${hourDeg}deg)`

    if(currHour > oldHour){
        oldHour++;
        let ranNum = Math.floor(Math.random() * colorCodes.length)
        poles.forEach(pole => {
            pole.style.background = `${colorCodes[ranNum]}`
        })
        mainTimePolesBox.style.setProperty("--bgColor", colorCodes[analogHr]);
    }

    if(secondDeg === 0){
        secondHand.style.background = `${handColors[rn(handColors)]}`
    }

    if(hourDeg === 0){
        hourHand.style.background = `${handColors[rn(handColors)]}`
    }

    if(minuteDeg === 0){
        minuteDeg.style.background = `${handColors[rn(handColors)]}`
    }

}

analogTime()
let analogueTimer = setInterval(analogTime, 1000)


// digital time function and logic

let userState = "";

// digital clock settings
digitalSettings.addEventListener("click", () => {
    let userEntry = prompt("your state ?: ");
    if(userEntry === "" || userEntry == null)return;
    userEntry = userEntry.trim();
    userState = userEntry;
    localStorage.setItem("userState", userState);
    weatherDetails(userState).then( ({location, current}) => {
        if(current.temp_c === "" || current.temp_c == null || current.temp_c == undefined)return;
        let currTemp = current.temp_c;
        tmpEl.textContent = `${(currTemp)}`;
    })
})

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

window.onload = () => {

    // getCoOrdinate();
    userState = localStorage.getItem("userState") || "";
    weatherDetails(userState).then( ({location, current}) => {
        let currTemp = current.temp_c;
        tmpEl.textContent = `${(currTemp)}`;
    })
    otherInfo();


    
    let loadedType = localStorage.getItem("clockType") || "Analogue";
    clockType.value = loadedType;

    if(loadedType == "Digital"){
        digital.style.display = 'grid';
        analogue.style.display = "none";
    }else{
        digital.style.display = 'none';
        analogue.style.display = "block";
    }

    if(loadedType == "Digital"){
        clearInterval(analogueTimer);
        digitalTimer = setInterval(digitalTime, 1000)
        digital.style.display = 'grid';
        analogue.style.display = "none";
    }else{
        clearInterval(digitalTimer);
        analogueTimer = setInterval(analogTime, 1000);
        digital.style.display = 'none';
        analogue.style.display = "block";
    }

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

function otherInfo(){
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
        meridians[3].style.color = `rgba(221, 39, 39, 0.904)`
    }else if(currHour == 24 || currHour < 12){
        meridians[1].style.color = `rgba(221, 39, 39, 0.904)`;
        meridians[3].style.color = `gray`
    }

    nowMon.textContent = `${currMonth > 9 ? currMonth : `0${currMonth}`}`;
    nowDate.textContent = `${currDate > 9 ? currDate : `0${currDate}`}`
    nowDay.textContent = `${currDay}`
}

let pastHour = Math.floor((new Date().getTime()) / 1000 / 3600 % 24 + 1);


function digitalTime(){
    let currTime = new Date().getTime();

    let hour = Math.floor((currTime / 1000 / 3600 % 24) + 1);
    let minute = Math.floor(currTime / 1000 / 60 % 60);
    let sec = Math.floor(currTime / 1000 % 60);

    let analogHr = hour > 12 ? hour - 12 : hour
    hourNumDigital.textContent = `${analogHr > 9 ? analogHr : `0${analogHr}`}`;
    minNumDigital.textContent = `${(minute > 9 ? minute : `0${minute}`)}`;
    secNumDigital.textContent = `${sec > 9 ? sec : `0${sec}`}`;

    const currHr = Math.floor((new Date().getTime()) / 1000 / 3600 % 24 + 1);

    if(currHr > pastHour){
        console.log(pastHour, currHr)
        otherInfo();
        weatherDetails(userState).then( ({location, current}) => {
            let currTemp = current.temp_c;
            tmpEl.textContent = `${(currTemp)}`;
        })
        setTimeout(
            () => {
                pastHour++;
            }, 5000
        )
    }

    console.log(pastHour)
}


// choose type of clock type

clockType.addEventListener("change", (e) => {
    console.log(e.target.value);
    let userType = (e.target.value);
    localStorage.setItem("clockType", userType);
    if(userType == "Digital"){
        clearInterval(analogueTimer);
        digitalTimer = setInterval(digitalTime, 1000)
        digital.style.display = 'grid';
        analogue.style.display = "none";
    }else{
        clearInterval(digitalTimer);
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
