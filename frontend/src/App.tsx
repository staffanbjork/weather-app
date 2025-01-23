import "../sass/main.scss";
import { useState, useEffect, useRef } from "react";
import CLOUDS from "vanta/dist/vanta.clouds.min";
import * as THREE from "three";
import { Outlet } from "react-router";
import { ContextType } from "./types/types";
import useGetWeather from "./hooks/useGetWeather";
import Rain from "./components/Rain/Rain";
import Navbar from "react-bootstrap/Navbar";
import Menu from "./components/Menu/Menu";
import DesktopMenu from "./components/DesktopMenu/DesktopMenu";
import isTwilight from "./utils/isTwilight";
import { VANTA_SETTINGS } from "./assets/vanta";
import { CloudsInstance } from "./types/vanta/types";



const intervalMinutes = (numberOfMin: number) => {
  const sec = 1000;
  const min = 60;
  return numberOfMin * min * sec;
}


function App() {
  const [showMenu, setShowMenu] = useState(false)
  const myRef = useRef(null);
  const [vantaClouds, setVantaClouds] = useState<CloudsInstance | null>(null);
  const { data, error, isFetching, changeLocation } = useGetWeather({ refetchInterval: intervalMinutes(10) })

  useEffect(() => {
    let SETTINGS = "CLEAR";
    if (data) {
      const ts = data.weatherData.timeSeries[0];
      const timeOfDay = isTwilight(
        true,
        ts.validHour,
        ts.validDate,
        ts.sunrise,
        ts.sunset
      );
      if (timeOfDay === "night") {
        SETTINGS = "NIGHT";
      } else if (timeOfDay === "twilight") {
        SETTINGS = "TWILIGHT";
      } else if (timeOfDay === "day") {
        if (ts.cloudiness < 3) {
          SETTINGS = "CLEAR";
        } else if (ts.cloudiness >= 3 && ts.cloudiness <= 6) {
          SETTINGS = "PARTLY_CLOUDY";
        } else if (ts.cloudiness >= 7) {
          SETTINGS = "CLOUDY";
        }
      }
      if (vantaClouds) {
        setVantaClouds(() => 
          (vantaClouds.setOptions({
            backgroundColor: VANTA_SETTINGS[SETTINGS].backgroundColor,
            skyColor: VANTA_SETTINGS[SETTINGS].skyColor,
            cloudColor: VANTA_SETTINGS[SETTINGS].cloudColor,
            cloudShadowColor: VANTA_SETTINGS[SETTINGS].cloudShadowColor,
            sunColor: VANTA_SETTINGS[SETTINGS].sunColor,
            sunGlareColor: VANTA_SETTINGS[SETTINGS].sunGlareColor,
            sunlightColor: VANTA_SETTINGS[SETTINGS].sunlightColor,
            speed: VANTA_SETTINGS[SETTINGS].speed,
          }))
        );
      }
    }
  }, [data, vantaClouds])  
  
  useEffect(() => {
    const SETTINGS = "CLEAR";
    if (!vantaClouds && !data) {
      setVantaClouds(
        CLOUDS({
          el: myRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          backgroundColor: VANTA_SETTINGS[SETTINGS].backgroundColor,
          skyColor: VANTA_SETTINGS[SETTINGS].skyColor,
          cloudColor: VANTA_SETTINGS[SETTINGS].cloudColor,
          cloudShadowColor: VANTA_SETTINGS[SETTINGS].cloudShadowColor,
          sunColor: VANTA_SETTINGS[SETTINGS].sunColor,
          sunGlareColor: VANTA_SETTINGS[SETTINGS].sunGlareColor,
          sunlightColor: VANTA_SETTINGS[SETTINGS].sunlightColor,
          speed: VANTA_SETTINGS[SETTINGS].speed,
        })
      );
    }
    return () => {
      if (vantaClouds) {
        vantaClouds.destroy();
      }
    }
  }, [])
  return (
    <div className="div-body" ref={myRef}>
      <section className="app-section">
        <main>
          <DesktopMenu changeLocation={changeLocation} />
          <Menu
            showMenu={showMenu}
            setShowMenu={setShowMenu}
            changeLocation={changeLocation}
          />

          {error && (
            <div>
              <h3>Ooops</h3>
              <p>Något gick fel</p>
            </div>
          )}
          {isFetching && <p>Laddar...</p>}
          {data && <Outlet context={{ data } satisfies ContextType} />}
        </main>
        <Navbar
          className="d-flex flex-row bg-primary w-100 d-md-none navbar-bottom"
          fixed="bottom"
        >
          <i
            className="bi bi-three-dots fs-1 justify-self-end ms-auto me-3"
            onClick={() => setShowMenu(true)}
          ></i>
        </Navbar>
      </section>
      {data && <Rain ws={data.weatherData.timeSeries[0].weatherSymbol} />}
    </div>
  );
}
export default App

