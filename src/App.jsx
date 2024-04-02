import './App.css';
import TextInput from './components/TextInput';
import not_found from '../public/not-found.png';
import { useWeather } from './customHooks/useWeather.jsx'; // Asegúrate de ajustar la ruta según tu estructura de archivos

const APIKEY = "c1b7a79e7381e224e8a6e76647de2e49";

function App() {
 const { temp, hum, image, descrip, wind, notFound, updateWeather } = useWeather();
 let city = "";

 const handleTextChange = (newText) => {
    city = newText;
 };

 const search = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKEY}`)
      .then(res => res.json())
      .then(updateWeather);
 };

 return (
    <main>
      <div className='container'>
        <TextInput onSearch={search} onChange={handleTextChange} />
        <section className='section-output'>
          <div>
            {notFound && <div className='not-found-container'>
              <img src={not_found} alt={"Ubicacion no encontrada"} height={100} width={100} />
              <p>Ubicacion no encontrada :´c</p>
            </div>}
          </div>

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
            {temp && <p className='humedad'>{hum}%</p>}
            {temp && <p className='wind-speed'>{wind}Km/h</p>}
          </div>
        </section>
      </div>
    </main>
 );
}

export default App;