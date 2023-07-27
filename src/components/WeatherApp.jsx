import { useEffect, useState } from "react"
import WeatherForm from "./WeatherForm";
import WheaterMainInfo from "./WeatherMainInfo";
import Loading from "./Loading";

import styles from "./weatherApp.module.css";


export default function WeatherApp() {
    const [weather, setWeather] = useState(null);
    
    useEffect(() => {
        loadInfo();
    }, []);

    useEffect(() => {
        document.title = `Weather | ${weather?.location.name ?? ''}`;
    }, [weather])

    async function loadInfo(city = 'Guatemala') {
        try{
            const request = await fetch(
                `${import.meta.env.VITE_APP_URL}&key=${import.meta.env.VITE_APP_KEY}&q=${city}`
                );
            
            const json = await request.json();
            
            setTimeout(() => {
                setWeather(json);
            }, 1000);

        }catch(error) {

        }

    };

    function handleChangeCity(city) {
        setWeather(null);
        
        loadInfo(city);
    };

    return (
        <div className={styles.weatherContainer} >
            <WeatherForm onChangeCity={handleChangeCity}/>
            {weather ? <WheaterMainInfo weather={ weather } /> : <Loading />}
        </div>
    );

};