import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Función para formatear el número al formato internacional de Argentina
const formatearNumero = (numero) => {
  // Aseguramos que el número sea sólo dígitos y tenga al menos 10 dígitos
  const numeroLimpio = numero.replace(/\D/g, '');
  if (numeroLimpio.length < 10) return null;

  // Formateamos al formato +54 9 11 5930-9984 (siendo 11 el código de área en Buenos Aires)
  const codigoPais = '+54';
  const codigoArea = '11'; // Código de área de Buenos Aires
  const prefijo = '9'; // Prefijo para líneas móviles en Argentina

  // Creamos el número en el formato adecuado
  const numeroFormateado = `${codigoPais} ${prefijo} ${codigoArea} ${numeroLimpio.substring(2, 6)}-${numeroLimpio.substring(6)}`;
  return numeroFormateado;
};

const NroEmergencia = () => {
  // Estado para el número de teléfono
  const [numero, setNumero] = useState('');

  // Función para guardar el número
  const guardarNumero = async () => {
    // Validación: verificar si el número tiene solo dígitos y longitud adecuada
    if (!/^\d+$/.test(numero) || numero.length < 10) {
      Alert.alert('Error', 'Por favor, ingresa un número de teléfono válido de al menos 10 dígitos.');
      return;
    }

    // Formatear el número antes de guardarlo
    const numeroFormateado = formatearNumero(numero);
    if (!numeroFormateado) {
      Alert.alert('Error', 'El número no tiene un formato válido.');
      return;
    }

    try {
      // Guardar el número formateado en AsyncStorage
      await AsyncStorage.setItem('numeroEmergencia', numeroFormateado);
      Alert.alert('Guardado', 'Número de emergencia guardado exitosamente.');
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al guardar el número.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Número de Emergencia</Text>
      {/* Input para el número de teléfono */}
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Ingresa el número de emergencia"
        value={numero}
        onChangeText={setNumero}
      />
      <Button title="Guardar" onPress={guardarNumero} />
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
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
});

export default NroEmergencia;
