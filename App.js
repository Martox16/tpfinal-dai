import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NroEmergencia from './components/nroEmergencia'; // Ajusta la ruta según tu estructura
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Zocial from '@expo/vector-icons/Zocial';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import Contacto from './components/contacto'; // Asegúrate de que esto sea correcto
import Temperatura from './components/Temperatura'; // Asegúrate de que esto sea correcto
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation

const Stack = createNativeStackNavigator();

const HomeScreen = () => (
  <View style={styles.container}>
    <Text>Bienvenido a TEHK</Text>
    <Text>La página más útil de todo Ort</Text>
  </View>
);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="NroEmergencia" component={NroEmergencia} options={{ title: 'Emergencia' }} />
        <Stack.Screen name="Contacto" component={Contacto} options={{ title: 'Contactos' }} />
        <Stack.Screen name="Temperatura" component={Temperatura} options={{ title: 'Temperatura' }} />
      </Stack.Navigator>
      <Footer />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const Footer = () => {
  const navigation = useNavigation(); // Usa el hook aquí
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Home')}>
        <Ionicons name="home-sharp" size={24} color="black" />
        <Text>Inicio</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('NroEmergencia')}>
        <Zocial name="call" size={24} color="black" />
        <Text>Emergencia</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Contacto')}>
        <MaterialCommunityIcons name="contacts" size={24} color="black" />
        <Text>Contactos</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Temperatura')}>
        <MaterialCommunityIcons name="weather-cloudy-clock" size={24} color="black" />
        <Text>Clima/Hora</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    position: 'absolute',
    bottom: 0,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navButton: {
    alignItems: 'center',
  },
});
