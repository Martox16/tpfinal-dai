import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';

const WeatherDisplay = () => {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [currentTime, setCurrentTime] = useState('');

  const API_KEY = 'TU_API_KEY'; // Reemplaza con tu API key de OpenWeather

  useEffect(() => {
    const getLocationAndWeather = async () => {
      // Obtener permisos de ubicación
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permiso de ubicación denegado');
        return;
      }

      // Obtener la ubicación actual
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);

      // Llamar a la API de OpenWeather
      const { latitude, longitude } = location.coords;
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,daily&appid=${API_KEY}&units=metric`
      );
      setWeather(weatherResponse.data.current);
    };

    getLocationAndWeather();

    // Actualizar la hora actual cada segundo
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (errorMsg) {
    return <Text>{errorMsg}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.time}>Hora actual: {currentTime}</Text>
      {weather ? (
        <>
          <Text style={styles.temp}>Temperatura: {weather.temp} °C</Text>
          <Text style={styles.condition}>Condición: {weather.weather[0].description}</Text>
        </>
      ) : (
        <Text>Cargando clima...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  time: {
    fontSize: 24,
    marginBottom: 10,
  },
  temp: {
    fontSize: 24,
    marginBottom: 5,
  },
  condition: {
    fontSize: 18,
    color: '#555',
  },
});

export default WeatherDisplay;
