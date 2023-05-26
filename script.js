let secondHand = document.querySelector(".secHand");
let minuteHand = document.querySelector(".minHand");
let  hourHand = document.querySelector(".hourHand")

const hourNumAnalog = document.querySelector(".hourNum");
const minNumAnalog = document.querySelector(".minNum");
const secNumAnalog = document.querySelector(".secNum");
const meridianAnalog = document.querySelector(".meridian");


const mainTimePolesBox = document.getElementsByClassName("mainTimePoles")[0];
const poles = document.querySelectorAll(".pole");

const colorCodes = ["#CD1818", "#068DA9", "#F79327", "#F266AB", "#1B9C85", "#8B1874", "#212A3E", "#9A208C", "#C07F00", "#FFE15D", "#263A29", "#D3756B"];

const handColors = ["#068DA9", "#F266AB", "#9A208C", "#D3756B"]

let melt = new Date().getTime();
let oldHour = Math.floor((melt / 1000 / 3600 % 24) + 1);
console.log(oldHour)

function rn(arr){
    return Math.floor(Math.random() * arr.length)
}

window.onload = () => {
    let ranNum = Math.floor(Math.random() * colorCodes.length);

    poles.forEach(pole => {
        pole.style.background = `${colorCodes[ranNum]}`
    })

    mainTimePolesBox.style.setProperty("--bgColor", colorCodes[rn(colorCodes)])
}

function getTime(){
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

    let analogHr = hour > 12 ? hour - 12 : hour
    hourNumAnalog.textContent = `${analogHr > 9 ? analogHr : `0${analogHr}`}`;
    minNumAnalog.textContent = `${(minute > 9 ? minute : `0${minute}`)}`;
    secNumAnalog.textContent = `${sec > 9 ? sec : `0${sec}`}`;

    let meridianTime = hoursHand > 12 ? "PM" : "AM";
    meridianAnalog.innerText = `${meridianTime}`;

    if(currHour > oldHour){
        oldHour = currHour;
        let ranNum = Math.floor(Math.random() * colorCodes.length)
        poles.forEach(pole => {
            pole.style.background = `${colorCodes[ranNum]}`
        })
        mainTimePolesBox.style.setProperty("--bgColor", colorCodes[analogHr]);
    }

    console.log(secondDeg)

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

getTime()
setInterval(getTime, 1000)

