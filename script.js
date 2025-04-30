const searchInput = document.querySelector(".searchInput");
const searchButton = document.querySelector(".search-button");
const weatherInfoSection = document.querySelector('.containerBody');
const searchCitySection = document.querySelector('.search-city');
const notFoundSection = document.querySelector('.not-found');
const city = document.querySelector('.city-name');
const currentDate = document.querySelector('.date-span');
const temperature = document.querySelector('.temperature');
const weatherCondition = document.querySelector('.weather-condition');
const humidityTxt = document.querySelector('.humidity-txt');
const speedTxt = document.querySelector('.speed-txt');
const directionTxt = document.querySelector('.direction-txt');
const pressureTxt = document.querySelector('.pressure-txt');
const weatherImg=document.querySelector('.weather-img');

searchButton.addEventListener('click',()=>{
    if(searchInput.value.trim() != '' ){
        fetchApi(searchInput.value);
        searchInput.value='';
    }
});
searchInput.addEventListener('keydown',(event)=>{
    if(event.key == 'Enter' && searchInput.value != ''){
        fetchApi(searchInput.value);
        searchInput.value='';
    }
});
const fetchApi=async (cityName) => {
    try {
        const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=55b10d28aef12526a17a7a9e412c9427&units=metric`);
        const resData= await response.json();
        return mainFunction(resData);
    } catch (error) {
        console.error(error);
        sectionDisplay(notFoundSection);
    }
}
const mainFunction=async(data)=>{
    
    if(data.cod == '404') return sectionDisplay(notFoundSection);

    const {name, main, weather, wind} = data;

    await new Promise((resolve)=>{
        weatherImg.onload=resolve;
        weatherImg.src=  `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
    });
    
    city.textContent=name;
    currentDate.textContent=getDate();
    temperature.textContent=`${Math.round(main.temp)} °C`;
    weatherCondition.textContent=weather[0].main;
    humidityTxt.textContent=`${main.humidity} %`;
    speedTxt.textContent=`${wind.speed} M/s`;
    directionTxt.textContent=`${getDirection(wind.deg)} (°${wind.deg})`;
    pressureTxt.textContent=`${main.pressure}hPa`;
    
    sectionDisplay(weatherInfoSection);
}
const sectionDisplay = (section) => {
    [weatherInfoSection, searchCitySection, notFoundSection].forEach((sec) => sec.style.display = 'none');
    section.style.display = 'block';
};
const getDate=()=>{
    const date= new Date();
    const options={
        weekday:"short",
        day:"2-digit",
        month:"short"
    }
    return date.toLocaleDateString('en-GB',options);
}

const getDirection=(deg)=>{
    const direc=['N','NE','E','SE','S','SW','W','NW'];
    return direc[Math.round(deg / 45) % 8];
}








