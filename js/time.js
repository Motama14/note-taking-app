const showTime = document.getElementById("showTime")

function updateTime() {
    var now = new Date();
    const time = now.toLocaleTimeString("es-ES"); // Change to your local time

    splitTime = time.split(":"),
    
    showTime.innerHTML = `${splitTime[0]}:${splitTime[1]}:<span>${splitTime[2]}</span>`;
}

setInterval(updateTime, 1000)