const crypto = document.getElementById("crypto");
const cryptoHead = document.getElementById("crypto-head")
const weather = document.getElementById("weather");
const timeContainer = document.getElementById("timeContainer");
const author = document.getElementById("authorInfo");
const quotesContainer = document.getElementById("quotes")
console.log(crypto)

fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then(res => res.json())
    .then(data => {
        document.body.style.backgroundImage = `url('${data.urls.full}')`
        author.textContent = data.user.name
    })
    .catch(err => {
        document.body.style.backgroundImage = `url("https://images.unsplash.com/photo-1462400362591-9ca55235346a?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NDQ0ODU4NzI&ixlib=rb-1.2.1&q=85")`
        author.textContent = "Christian Joudrey"
    })

fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
    .then(res => res.json())
    .then(data => {
        console.log(data)
        cryptoHead.innerHTML = `
            <img src=${data.image.small} />
            <p>${data.name}</p>
        `
        crypto.innerHTML += `
            <p>Current: ${data.market_data.current_price.inr}</p>
            <p>High: ${data.market_data.high_24h.inr}</p>
            <p>Low: ${data.market_data.low_24h.inr}</p>

        `
    })

function showTime() {
    const date = new Date()
    const time = date.toLocaleTimeString("hi-IN",{timeStyle: "short"})
    timeContainer.textContent = time
}
fetch("https://stoicquotesapi.com/v1/api/quotes/random")
    .then(res => res.json())
    .then(data => {
        quotesContainer.innerHTML = `
            <p>${data.body}</p>
        `
    })

setInterval(showTime,1000)
navigator.geolocation.getCurrentPosition((position) => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
        .then(res => res.json())
        .then(data => {
            weather.innerHTML = `
                <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/>
                <p class="temp">${Math.floor(data.main.temp)}°</p>
                <p class="city">${data.name}</p>
            `
        })
        
  });