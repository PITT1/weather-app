import { useState } from 'react';
import './App.css';
import TextInput from './components/TextInput';
import clear from "../public/clear.png";
import cloud from "../public/cloud.png";
import mist from "../public/mist.png";
import snow from "../public/snow.png";
import rain from "../public/rain.png";

let city = "";

function App() {
  const [temp, setTemp] = useState(null);
  const [hum, setHum] = useState(null);
  const [image, setImage] = useState("");
  const [descrip, setDescrip] = useState("");
  const [wind, setWind] = useState("");

  const handleTextChange = (newText) => {
    city = newText;
  }

  const search = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=c1b7a79e7381e224e8a6e76647de2e49`)
    .then(res => res.json())
    .then(res => {
      setTemp(Math.trunc(res.main.temp));
      setHum(res.main.humidity);
      setDescrip(res.weather[0].description);
      setWind(res.wind.speed);

      switch(res.weather[0].main){
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
      console.log(res);
    }) 
  }

  return (
    <main>
      <div className='container'>
        <TextInput onSearch={() => search()} onChange={handleTextChange}/>
        <section className='section-output'>
          <div className='img-weather'>
            {temp && <img src={image} height={150} alt="imagen que representa un clima" />}
          </div>
          <div className='constainer-temp'>
          {temp && <p className='temp'>{temp}</p>}
          </div>
          <div className='constainer-descript'>
            {temp && <p className='description'>{descrip}</p>}
          </div>
          <div className='container-magnitud'>
            {hum && <p className='humedad'>{hum}%</p>}
            {hum && <p className='wind-speed'>{wind}Km/h</p>}
          </div>
        </section>
      </div>
      
    </main>
  )
}

export default App
