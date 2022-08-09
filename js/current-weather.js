//import weather from '../data/current-weather.js'
import {formatDate, formatTemp} from './utils/format-data.js'
import { weatherConditionsCodes } from './constants.js'
import {getLatLon } from './geolocation.js'
import {getCurrentWeather} from './services/weather.js'

/* import {getCurrentPosition } from './geolocation.js' */

// weatherConditionsCodes['3'] //?
//typeof(weather.weather[0].id) //?
/* Buscamos el elemento que van permite hacer mach 
con nuestro diccionario -> weatherConditionsCodes
*/
//String(weather.weather[0].id).charAt(0) //?
//weatherConditionsCodes[String(weather.weather[0].id).charAt(0)] //?

// Status de mi background
function solarStatus(sunriseTime,sunsetTime) {

  const currentHours = new Date().getHours()
  const sunriseHours = sunriseTime.getHours()
  const sunsetHours = sunsetTime.getHours()
  /* debugger */
  if(currentHours > sunsetHours || currentHours < sunriseHours){
    return 'night'
  }
  return 'morning'
  /* return 'night'
  return 'morning' */
}


// Function para manipular el background con js
function setBackground($el, conditionCode, solarStatus) {
  /* Resolución de la imagen: Nos permite cargar el tamaño que requiero según la resolución que tenemos */
  /* Operador alternario =    true ? ' ' : ' ' */
  const size = window.matchMedia('(-webkit-min-device-pixel-ratio: 2)').matches ? '@2x' : ''
  const weatherType = weatherConditionsCodes[conditionCode]
  $el.style.backgroundImage = `url(./images/${solarStatus}-${weatherType}${size}.jpg)`


}


// Funcion Propia para configurar la ciudad
/*  $currentWeatherCity.textContent = weather.name */
function setCurrentCity($el, city) {
  $el.textContent = city
}

// configurar la temperatura

function setCurrentTemp($el, temp) {
  $el.textContent = formatTemp(temp)
}


// set -> Es una convension (Poner)
function setCurrentDate($el) {
  // Los objets GLOBALES de JS se puede instanciar con el operador NEW
  // Se crea un nuevo objeto que va se asignado a la variable.
  // El objeto va tener propiedades y métodos que va ser utilizado según que nos conviene. 
  const date = new Date()
  const formattedDate = formatDate(date)
  /* debugger */
  /* $el.textContent = date */
  $el.textContent = formattedDate
}

/* const config = {
  day: 'numeric',
  weekday: 'long',
  month: 'long'
} */

function showCurrentWeather($app,$loading ) {
  $app.hidden = false
  $loading.hidden = true

}


function configCurrentWeather(weather) {
  const $app = document.querySelector('#app');
  const $loading = document.querySelector('#loading');

  //loader
  showCurrentWeather($app, $loading)
  //date

  const $currentWeatherDate= document.querySelector("#current-weather-date");
  setCurrentDate($currentWeatherDate);
  //city
  const $currentWeatherCity = document.querySelector("#current-weather-city");
  const city = weather.name
  setCurrentCity($currentWeatherCity, city)

  /* debugger
 */
  //temp
  const $currentWeatherTemp = document.querySelector('#current-weather-temp');
  const temp = weather.main.temp
  setCurrentTemp($currentWeatherTemp, temp)

   // background
  const sunriseTime = new Date(weather.sys.sunrise * 1000)
  const sunsetTime = new Date(weather.sys.sunset * 1000)
  /* debugger */
  
  const conditionCode = String(weather.weather[0].id).charAt(0) 
  setBackground($app, conditionCode, solarStatus(sunriseTime,sunsetTime))

}


export default async function currentWeather(){
  
  // GEO // API - weather  // config
  //console.log('esto pasa ANTES de getCurrentPosition')
  const { lat, lon, isError}  = await getLatLon()
  if(isError) return console.log('Ah ocurrido un error ubicandote')
  //console.log(lat, lon)


 const {isError: currentWeatherError, data:weather} = await getCurrentWeather(lat, lon)
    if(currentWeatherError) return console.log('Oh! a ocurrido un error trayendo lo datos del clima')
  configCurrentWeather(weather)
}


// console.log(weather)
//console.log(err)
//const latlon = getCurrentPosition()

//Promise
//getCurrentPosition()
  /* .then((data) => {
    console.log('Hemos triunfado', data)
  })
  .catch((message) => console.log(message)) */

//console.log('esto pasa DESPUES de getCurrentPosition')

