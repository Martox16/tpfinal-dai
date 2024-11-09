import { useState, useEffect } from 'react';
import { DeviceMotion } from 'expo-sensors';
import { Linking, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';  // Asegúrate de tener AsyncStorage

const useShake = () => {
  const [motionData, setMotionData] = useState(null);

  // Función para manejar la sacudida y enviar el mensaje de WhatsApp
  const handleShake = async () => {
    try {
      // Intentar obtener el número de emergencia desde AsyncStorage
      const storedNumber = await AsyncStorage.getItem('numeroEmergencia');
      
      // Verificar si el número de emergencia está disponible
      if (!storedNumber) {
        // Si no hay número guardado, mostrar un mensaje de alerta
        Alert.alert('Error', 'No se ha configurado un número de emergencia.');
        return;
      }

      const message = '¡Necesito ayuda urgente!';  // Mensaje predefinido
      const url = `https://wa.me/${storedNumber}?text=${encodeURIComponent(message)}`;

      // Abrir el enlace de WhatsApp
      Linking.openURL(url).catch((err) => console.error('No se pudo abrir WhatsApp', err));
    } catch (error) {
      console.error('Error al acceder al almacenamiento', error);
      Alert.alert('Error', 'Hubo un problema al acceder al número de emergencia.');
    }
  };

  // Detectar la sacudida del teléfono
  useEffect(() => {
    const subscription = DeviceMotion.addListener((motion) => {
      setMotionData(motion);
      const { acceleration } = motion;

      // Aumentar el umbral de aceleración para que se necesite un movimiento más fuerte
      const threshold = 20;  // Aumentamos el umbral a 5 (ajusta este valor según sea necesario)

      // Configurar el umbral de sacudida (más brusco)
      if (
        Math.abs(acceleration.x) > threshold || 
        Math.abs(acceleration.y) > threshold || 
        Math.abs(acceleration.z) > threshold
      ) {
        handleShake();  // Llamar a la función para enviar el mensaje
      }
    });

    // Configurar la actualización del sensor
    DeviceMotion.setUpdateInterval(100);  // Intervalo en milisegundos

    return () => {
      subscription.remove();
    };
  }, []);

  return motionData;
};

export default useShake;
