// import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
// import './App.css'
import { weatherThemes } from './constants/weatherThemes'
import { getWeatherType } from './utils/getWeatherType'
import { isDayTime } from './utils/isDay'

import { useEffect, useState } from "react";
import { getWeather } from "./services/weatherService";

// function App() {
//   const weather = {
//     weather: [{ main: 'Rain', description: 'heavy rain' }],
//     sys: { sunrise: 1712550000, sunset: 1712600000 },
//     dt: 1712570000
//   }

//   const type = getWeatherType(
//     weather.weather[0].main,
//     weather.weather[0].description
//   )

//   const isDay = isDayTime(
//     weather.dt,
//     weather.sys.sunrise,
//     weather.sys.sunset
//   )

//   const theme = weatherThemes[type][isDay ? 'day' : 'night']

//   return (
//     <div
//       style={{
//         backgroundImage: `url(${theme.background})`,
//         color: theme.textColor
//       }}
//     >
//       Weather App
//     </div>
//   )
// }

function App() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(URL);
        const data = await res.json();

        console.log(data); // 🔥 дивишся що приходить
        setWeatherData(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchWeather();
  }, []);

  return <div>Weather App</div>;
}
// function App() {
//   const [data, setData] = useState(null)

//   console.log(import.meta.env.VITE_WEATHER_API_KEY);
//   useEffect(() => {
//     const fetchData = async () => {
//       const result = await getWeather("Kyiv");
//       setData(result);
//     };

//     fetchData();
//   }, []);
//   return (
//     <div>
//       {data ? <h1>{data.location.name}</h1> : <p>Loading...</p>}
//     </div>
//   );


  // return (
  //   <>
  //     <div className="app">

  //     {/* Ліва частина */}
  //     <div className="left">
  //       <div>
  //         <p>21 April 2026</p>
  //         <p>11:00</p>
  //       </div>
  //       <h1>Heavy Rain</h1>
  //       <div>
  //         <div className='card'>
  //           <p>09:00</p>
  //           <img src="assets/icons/weather/cloudy.svg" alt="cloudy" />
  //           <h3>9°C</h3>
  //         </div>
  //         <div className='card active'>
  //           <p>10:00</p>
  //           <img src="" alt="" />
  //           <h3>10°C</h3>
  //         </div>
  //       </div>
  //     </div>

  //     {/* Права частина */}
  //     <div className="right">
  //       <div>
  //         <img src="" alt="" />
  //         <p>Tbilisi, Georgia</p>
  //         <img src="" alt="" />
  //       </div>
  //       <div>
  //         <h2>11°C</h2>
  //         <div>
  //           <img src="" alt="" />
  //           <p>Nortwest, 38.9 km/h</p>
  //         </div>
  //       </div>
  //       <div>
  //         <h3>The NextDaysForecast</h3>
  //         <div className='tabs-block-wrapper'>
  //           <div id="tabs">
  //             <div className="tab-btn active" data-btn="1">
  //               5 days
  //             </div>
  //             <div className="tab-btn" data-btn="2">
  //               14 days
  //             </div>
  //             <div className="tab-btn" data-btn="3">
  //               30 days
  //             </div>
  //           </div>
  //           <div id="contents">
  //             <div className="content active" data-content="1">
  //               <img src="" alt="" />
  //               <div>
  //                 <p>Friday, April 21</p>
  //                 <p>Heavy Rain</p>
  //               </div>
  //               <div>
  //                 <p>9°</p>
  //                 <p>16°</p>
  //               </div>
  //             </div>
  //             <div className="content" data-content="2">
  //               <img src="" alt="" />
  //               <div>
  //                 <p>Saturday, April 22</p>
  //                 <p>Partly Cloudy</p>
  //               </div>
  //               <div>
  //                 <p>9°</p>
  //                 <p>16°</p>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
    
  //     {/* <section id="center">
  //       <div className="hero">
  //         <img src={heroImg} className="base" width="170" height="179" alt="" />
  //         <img src={reactLogo} className="framework" alt="React logo" />
  //         <img src={viteLogo} className="vite" alt="Vite logo" />
  //       </div>
  //       <div>
  //         <h1>Get started</h1>
  //         <p>
  //           Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
  //         </p>
  //       </div>
  //       <button
  //         className="counter"
  //         onClick={() => setCount((count) => count + 1)}
  //       >
  //         Count is {count}
  //       </button>
  //     </section>

  //     <div className="ticks"></div>

  //     <section id="next-steps">
  //       <div id="docs">
  //         <svg className="icon" role="presentation" aria-hidden="true">
  //           <use href="/icons.svg#documentation-icon"></use>
  //         </svg>
  //         <h2>Documentation</h2>
  //         <p>Your questions, answered</p>
  //         <ul>
  //           <li>
  //             <a href="https://vite.dev/" target="_blank">
  //               <img className="logo" src={viteLogo} alt="" />
  //               Explore Vite
  //             </a>
  //           </li>
  //           <li>
  //             <a href="https://react.dev/" target="_blank">
  //               <img className="button-icon" src={reactLogo} alt="" />
  //               Learn more
  //             </a>
  //           </li>
  //         </ul>
  //       </div>
  //       <div id="social">
  //         <svg className="icon" role="presentation" aria-hidden="true">
  //           <use href="/icons.svg#social-icon"></use>
  //         </svg>
  //         <h2>Connect with us</h2>
  //         <p>Join the Vite community</p>
  //         <ul>
  //           <li>
  //             <a href="https://github.com/vitejs/vite" target="_blank">
  //               <svg
  //                 className="button-icon"
  //                 role="presentation"
  //                 aria-hidden="true"
  //               >
  //                 <use href="/icons.svg#github-icon"></use>
  //               </svg>
  //               GitHub
  //             </a>
  //           </li>
  //           <li>
  //             <a href="https://chat.vite.dev/" target="_blank">
  //               <svg
  //                 className="button-icon"
  //                 role="presentation"
  //                 aria-hidden="true"
  //               >
  //                 <use href="/icons.svg#discord-icon"></use>
  //               </svg>
  //               Discord
  //             </a>
  //           </li>
  //           <li>
  //             <a href="https://x.com/vite_js" target="_blank">
  //               <svg
  //                 className="button-icon"
  //                 role="presentation"
  //                 aria-hidden="true"
  //               >
  //                 <use href="/icons.svg#x-icon"></use>
  //               </svg>
  //               X.com
  //             </a>
  //           </li>
  //           <li>
  //             <a href="https://bsky.app/profile/vite.dev" target="_blank">
  //               <svg
  //                 className="button-icon"
  //                 role="presentation"
  //                 aria-hidden="true"
  //               >
  //                 <use href="/icons.svg#bluesky-icon"></use>
  //               </svg>
  //               Bluesky
  //             </a>
  //           </li>
  //         </ul>
  //       </div>
  //     </section>

  //     <div className="ticks"></div>
  //     <section id="spacer"></section> */}
  //   </>
  // )
// }

export default App

