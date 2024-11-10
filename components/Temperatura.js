import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';

const Clima = () => {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [currentTime, setCurrentTime] = useState('');

  // api key con el mail de eli9deles@gmail.com
  const API_KEY = '42769c04a48690b26a43e00383e6e896'; 

  useEffect(() => {
    const getWeather = async () => {
      try {
        // Primero solicitamos permisos para acceder a la ubicación
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permiso de ubicación denegado');
          return;
        }

        // Ahora obtenemos la ubicación actual del dispositivo
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location.coords);

        // Llamada a la API con las coordenadas obtenidas y lang=es para español
        const { latitude, longitude } = location.coords;
        const weatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=es`
        );

            // https://home.openweathermap.org/api_keys aca esta la clave de a api

        // Verificamos si la respuesta es exitosa
        if (weatherResponse.status === 200) {
          setWeather(weatherResponse.data);
        } else {
          throw new Error('Respuesta de la API no válida');
        }
      } catch (error) {
        // Manejo de errores si algo falla con la API o la ubicación
        console.error('Error obteniendo el clima:', error.response ? error.response.data : error.message);
        setErrorMsg(error.response ? error.response.data.message : 'No se pudo obtener el clima. Intenta nuevamente.');
      }
    };

    getWeather();

    // Actualizar la hora cada segundo
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
          <Text style={styles.temp}>Temperatura: {weather.main.temp} °C</Text>
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

export default Clima;
