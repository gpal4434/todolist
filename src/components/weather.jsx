import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [position, setPosition] = useState({ lat: 0, lon: 0 });
  const city = "seoul";
  const key = "83c486c22c22b4c09b987c46eba03f94";

  const getWeather = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${position.lat}&lon=${position.lon}&lang=kr&units=metric&APPID=${key}`
    );
    const result = await response.json();
    setWeatherData(result);
  };
  useEffect(() => {
    getWeather();
  }, [weatherData]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setPosition({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    });
  }, [position]);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {weatherData && (
        <Wrap>
          <Inner>
            <Icon>
              <img
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                alt={`${weatherData.weather.description} 아이콘`}
              />
              {/* <Desc key={weatherData.id}>
                {weatherData.weather[0].description}
              </Desc> */}
            </Icon>

            <Temp>{weatherData?.main.temp.toFixed(1)}℃</Temp>
          </Inner>
        </Wrap>
      )}
    </>
  );
};

export default Weather;

const Wrap = styled.div`
  padding: 10;
  position: fixed;
  top: 20px;
  right: 20px;
`;
const Inner = styled.div`
  display: flex;
  // gap: 5px;
  align-items: center;
  flex-direction: column;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(#4dbcc7, #ef86b2);
`;
const Icon = styled.div`
  // display: flex;
  // align-items: center;
  // justify-content: center;
  // flex-direction: column;
`;
const Temp = styled.h3`
  font-size: 18px;
  font-weight: bold;
  line-height: 1;
  color: #fff;
`;
