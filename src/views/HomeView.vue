<script setup>
import { ref } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import axios from 'axios'

const city = ref('')
const weatherData = ref(
  {
    "coord": {},
    "weather": [0],
    "base": "",
    "main": {},
    "visibility": 0,
    "wind": {},
    "clouds": {},
    "dt": 0,
    "sys": {},
    "timezone": 0,
    "id": 0,
    "name": "",
    "cod": 0
}
)
const imgSrc = ref('')

async function onGetWeather(){
    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&appid=7f9c1fc3e9d106ace0936ebf6b4db4e2`)
        .then(response => response.json())
        .then( (data) => {
            weatherData.value = {...data} 
            console.log("data",  weatherData.value)
            if(weatherData.value.cod == '200'){
                switch (weatherData.value.weather[0].main) {
                    case 'Clear':
                        imgSrc.value = '/src/assets/img/clear.png';
                        break;

                    case 'Rain':
                        imgSrc.value = '/src/assets/img/rain.png';
                        break;

                    case 'Snow':
                        imgSrc.value = '/src/assets/img/snow.png';
                        break;

                    case 'Clouds':
                        imgSrc.value = '/src/assets/img/cloud.png';
                        break;

                    case 'Haze':
                        imgSrc.value = '/src/assets/img/mist.png';
                        break;

                    default:
                        imgSrc.value = '';
                }
            }
            console.log('imgSrc.value',imgSrc.value)
        })
   
}
</script>

<template>

    <div class="container" :class="weatherData.cod == '200' ? 'container-active' : weatherData.cod == '404' ?'container-404' : ''" >
        <div class="search-box">
            <i class="fa-solid fa-location-dot"></i>
            <InputText type="text" v-model="city" placeholder="Enter Your Location"  @keyup.enter="onGetWeather()"/>
            <Button class="fa-solid fa-magnifying-glass" @click="onGetWeather()" />
        </div>
        <template v-if="weatherData.cod == '404'">
            <div class="not-found" :class="(weatherData.cod != 0 && weatherData.cod == '404') ? 'not-found-404 fadeIn' :''">
                <img src="../assets/img/404.png">
                <p>Invalid Location</p>
            </div>
        </template>
        <template v-if="weatherData.cod == '200'">
          <div class="weather-box fadeIn" >
                <img :src="imgSrc">
                <p class="temperature">{{ weatherData.main.temp}}°C</p>
                <p class="description">{{ weatherData.weather[0].description }}</p>
            </div>

            <div class="weather-details w-100 d-flex justify-content-center fadeIn">
                <div class="humidity d-flex align-items-center">
                    <i class="fa-solid fa-water "></i>
                    <div class="text">
                        <span>{{ weatherData.main.humidity }}%</span>
                        <p class="mb-0 closer">Humidity</p>
                    </div>
                </div>

                <div class="wind d-flex align-items-center">
                    <i class="fa-solid fa-wind "></i>
                    <div class="text">
                        <span>{{ weatherData.wind.speed }}Km/h</span>
                        <p class="mb-0 closer">Wind Speed</p>
                    </div>
                </div>
            </div>
        </template>
    </div>

    
</template>

<style scoped>
.fa-magnifying-glass:before, .fa-search:before{
    margin-left: -2px !important;
}
.container{
  position: relative;
  width: 400px;
  height: 105px;
  background: #fff;
  padding: 28px 32px;
  overflow: hidden;
  border-radius: 18px;
  font-family: 'Roboto', sans-serif;
  transition: 0.6s ease-out;
}

.search-box{
  width: 100%;
  height: min-content;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.search-box input{
  color: #06283D;
  width: 80%;
  font-size: 24px;
  font-weight: 500;
  text-transform: uppercase;
  padding-left: 32px;
}

.search-box button:hover{
  color: #fff;
  background: #06283D;
}

.search-box input::placeholder{
  font-size: 20px;
  font-weight: 500;
  color: #06283D;
  text-transform: capitalize;
  border: none !important;
}

.search-box button{
  cursor: pointer;
  width: 50px;
  height: 50px;
  color: #06283D;
  background: #dff6ff;
  border-radius: 50%;
  font-size: 22px;
  transition: 0.4s ease;
  border: none !important;
}
.p-inputtext{
    border: none !important
}
.p-inputtext:enabled:focus {
    box-shadow: none !important;
    border: none !important;
}

.search-box i{
  position: absolute;
  color: #06283D;
  font-size: 28px;
}

.weather-box{
  text-align: center;
}

.weather-box img{
  width: 50%;
  margin-top: 30px;
}

.weather-box .temperature{
  position: relative;
  color: #06283D;
  font-size: 4rem;
  font-weight: 800;
  margin-top: 30px;
  font-size: 55px;
}

.weather-box .temperature span{
  position: absolute;
  margin-left: 4px;
  font-size: 1.5rem;
}

.weather-box .description{
  color: #06283D;
  font-size: 22px;
  font-weight: 500;
  text-transform: capitalize;
}

.weather-details{
  margin-top: 30px;
}

.weather-details .humidity, .weather-details .wind{
  width: 50%;
  height: 100px;
}

.weather-details .humidity{
  padding-left: 20px;
  justify-content: flex-start;
}

.weather-details .wind{
  padding-right: 20px;
  justify-content: flex-end;
}

.weather-details i{
  color: #06283D;
  font-size: 26px;
  margin-right: 10px;
  margin-top: 6px;
}

.weather-details span{
  color: #06283D;
  font-size: 22px;
  font-weight: 500;
}

.weather-details p{
  color: #06283D;
  font-size: 14px;
  font-weight: 500;
}

.not-found{
  width: 100%;
  text-align: center;
  margin-top: 50px;
  scale: 0; 
  opacity: 0;
  display: none;
}

.not-found img{
  width: 70%;
}

.not-found p{
  color: #06283D;
  font-size: 22px;
  font-weight: 500;
  margin-top: 12px;
}

.weather-box, .weather-details{
  scale: 0;
  opacity: 0;
}

.fadeIn{
  animation: 0.5s fadeIn forwards;
  animation-delay: 0.5s;
}

@keyframes fadeIn{
  to {
      scale: 1;
      opacity: 1;
  }
} 
.container-404{
    height: 400px !important;
}
.weather-box-404{
    display: none !important;
}
.weather-details-404{
    display: none !important;
}
.not-found-404{
    display: block !important;
}
.not-found-none{
    display: none !important;
}
.container-active{
    height: 590px !important;
}
.weather-details-active{
    display: none !important;
}
.closer{
  margin-top: -5px;
}
</style>
