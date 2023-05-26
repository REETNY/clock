let secondHand = document.querySelector(".secHand");
let minuteHand = document.querySelector(".minHand");
let  hourHand = document.querySelector(".hourHand")

const hourNumAnalog = document.querySelector(".hourNum");
const minNumAnalog = document.querySelector(".minNum");
const secNumAnalog = document.querySelector(".secNum");
const meridianAnalog = document.querySelector(".meridian");

function getTime(){
    let currTime = new Date().getTime()
    let melt = new Date().getTimezoneOffset()

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
    meridianAnalog.innerText = `${meridianTime}`
}

getTime()
setInterval(getTime, 1000)
