// components/nroEmergencia.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NroEmergencia = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Número de Emergencia</Text>
      {/* Puedes agregar más contenido aquí */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default NroEmergencia;
