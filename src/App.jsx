import './App.css';
import TextInput from './components/TextInput';
import not_found from '../public/not-found.png';
import { useWeather } from './customHooks/useWeather.jsx';
import { motion, AnimatePresence } from 'framer-motion';

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
      <motion.div layout className='container'>
        <TextInput onSearch={search} onChange={handleTextChange} />
        <motion.section layout className='section-output'>
          <AnimatePresence>
          <div>
            {notFound && <div className='not-found-container'>
              <motion.img initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} src={not_found} alt={"Ubicacion no encontrada"} height={100} width={100} />
              <motion.p initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>Ubicacion no encontrada :´c</motion.p>
            </div>
            }
          </div>
          </AnimatePresence>

          <div className='img-weather'>
            {temp && <motion.img initial={{opacity: 0}} animate={{opacity: 1}} src={image} height={150} alt="imagen que representa un clima" />}
          </div>
          <div className='constainer-temp'>
            {temp && <motion.p initial={{opacity: 0}} animate={{opacity: 1}} className='temp'>{temp}</motion.p>}
          </div>
          <div className='constainer-descript'>
            {temp && <motion.p initial={{opacity: 0}} animate={{opacity: 1}} className='description'>{descrip}</motion.p>}
          </div>
          <div className='container-magnitud'>
            {temp && <motion.p initial={{opacity: 0}} animate={{opacity: 1}} className='humedad'>{hum}%</motion.p>}
            {temp && <motion.p initial={{opacity: 0}} animate={{opacity: 1}} className='wind-speed'>{wind}Km/h</motion.p>}
          </div>
        </motion.section>
      </motion.div>
    </main>
 );
}

export default App;