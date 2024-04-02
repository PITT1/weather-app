import { useState } from 'react';
import clear from "../../public/clear.png";
import cloud from "../../public/cloud.png";
import mist from "../../public/mist.png";
import snow from "../../public/snow.png";
import rain from "../../public/rain.png";

export const useWeather = () => {
    const [temp, setTemp] = useState(null);
    const [hum, setHum] = useState(null);
    const [image, setImage] = useState("");
    const [descrip, setDescrip] = useState("");
    const [wind, setWind] = useState("");
    const [notFound, setNotFound] = useState(false);
   
    const updateWeather = (weatherData) => {
        console.log(weatherData);
       if (weatherData.cod === '404') {
         setTemp(null);
         setHum(null);
         setImage("");
         setDescrip("");
         setWind("");
         setNotFound(true);
       } else if (weatherData.cod === 200) {
         setNotFound(false);
         setTemp(Math.trunc(weatherData.main.temp));
         setHum(weatherData.main.humidity);
         setDescrip(weatherData.weather[0].description);
         setWind(weatherData.wind.speed);
   
         switch (weatherData.weather[0].main) {
           case "Clear":
             setImage(clear);
             break;
           case "Snow":
             setImage(snow);
             break;
           case "Rain":
             setImage(rain);
             break;
           case "Clouds":
             setImage(cloud);
             break;
           case "Haze":
             setImage(mist);
             break;
         }
       }
    };
   
    return { temp, hum, image, descrip, wind, notFound, updateWeather };
   };