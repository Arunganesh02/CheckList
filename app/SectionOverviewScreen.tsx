import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Ensure correct path

const sections = [
    { id: '1', title: 'Safety Rules (Nacelle)' },
    { id: '2', title: 'General Rules at Service Check (Nacelle)' },
    { id: '3', title: 'Documents Used at Service Check (Nacelle)' },
    { id: '4', title: 'Fall Protection System (Nacelle)' },
    { id: '5', title: 'Anchor Points (Nacelle)' },
    { id: '6', title: 'Nose Cone (Nacelle)' },
    { id: '7', title: 'Blades (Nacelle)' },
    { id: '8', title: 'Hub and Blade Bearing (Nacelle)' },
    { id: '9', title: 'Main Bearing Housing (Nacelle)' },
    { id: '10', title: 'Soft Braking (Nacelle)' }
];

const SectionOverviewScreen = ({ navigation }) => {

  // Function to upload data to Firestore
  const uploadDataToFirestore = async () => {
    try {
      for (let section of sections) {
        const savedData = await AsyncStorage.getItem(section.title);
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          await addDoc(collection(db, 'checklistData'), {
            section: section.title,
            items: parsedData,
          });
        }
      }
      Alert.alert('Success', 'All data uploaded to Firestore!');
    } catch (error) {
      console.error('Error uploading data to Firestore:', error);
      Alert.alert('Error', 'Failed to upload data to Firestore.');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={sections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.sectionItem}
            onPress={() => navigation.navigate('ChecklistScreen', { section: item.title })}
          >
            <Text style={styles.sectionTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
      <Button
        title="Upload All Data to Firestore"
        onPress={uploadDataToFirestore}
        color="#841584" // You can customize the color of the button
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  sectionItem: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
  },
});

export default SectionOverviewScreen;
