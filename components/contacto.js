import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import * as Contacts from 'expo-contacts';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const getContacts = async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Name],
        });
        if (data.length > 0) {
          setContacts(data);
        }
      } else {
        console.log("Permisos de contacto no concedidos.");
      }
    };
    getContacts();
  }, []);

  return (
    <FlatList
      data={contacts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.contactItem}>
          <Text>{item.name}</Text>
          {item.phoneNumbers && item.phoneNumbers.length > 0 && (
            <Text>{item.phoneNumbers[0].number}</Text>
          )}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  contactItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default ContactList;
