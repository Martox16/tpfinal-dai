// AcercaDe.js
import React, { useState } from 'react';
import { View, Text, Button, Modal, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg'; // Necesitas instalar esta librería
import { BarCodeScanner } from 'expo-barcode-scanner'; // Necesitas instalar esta librería también

export default function AcercaDe() {
  const [modalVisible, setModalVisible] = useState(false);
  const [scannedData, setScannedData] = useState('');
  const [hasPermission, setHasPermission] = useState(null);

  // Información para el QR
  const integrantes = "Martin Cygiel, nacido 16/02/2007; Yannick Lerner, nacido 15/02/2007";

  // Solicitar permiso para usar la cámara
  const requestCameraPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  const handleBarCodeScanned = ({ data }) => {
    setScannedData(data);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Acerca de la Aplicación</Text>

      {/* Código QR */}
      <Text style={styles.text}>Escanea este código QR para ver los integrantes:</Text>
      <QRCode value={integrantes} size={150} />

      {/* Botón para escanear */}
      <Button title="Escanear QR de otra aplicación" onPress={requestCameraPermission} />

      {/* Escáner de código de barras */}
      {hasPermission && (
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      )}

      {/* Modal para mostrar datos escaneados */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.text}>Integrantes de la aplicación escaneada:</Text>
            <Text style={styles.scannedData}>{scannedData}</Text>
            <Button title="Cerrar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginVertical: 10,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  scannedData: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});
