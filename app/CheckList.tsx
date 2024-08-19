// screens/ChecklistScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Button, Image, TouchableOpacity } from 'react-native';
import Taskbar from '../components/Taskbar';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CheckList = ({ route }) => {
  const { section } = route.params;

  const [photos, setPhotos] = useState([]);
  const [remarks, setRemarks] = useState('');
  const [checkedItems, setCheckedItems] = useState({});

  // Example checklist items for each section
  const checklistItems = {
    'Section 1': [
      { id: 1, text: 'Check the turbine blades' },
      { id: 2, text: 'Inspect the generator' },
    ],
    'Section 2': [
      { id: 1, text: 'Verify oil levels' },
      { id: 2, text: 'Test the brake system' },
    ],
    // Add more sections and items as needed
  };

  // Load checklist state from AsyncStorage
  useEffect(() => {
    const loadChecklistState = async () => {
      try {
        const savedState = await AsyncStorage.getItem(`checklist_${section}`);
        if (savedState) {
          const parsedState = JSON.parse(savedState);
          setCheckedItems(parsedState.checkedItems || {});
          setRemarks(parsedState.remarks || '');
          setPhotos(parsedState.photos || []);
        }
      } catch (error) {
        console.error('Failed to load checklist state:', error);
      }
    };

    loadChecklistState();
  }, [section]);

  // Save checklist state to AsyncStorage
  useEffect(() => {
    const saveChecklistState = async () => {
      try {
        await AsyncStorage.setItem(`checklist_${section}`, JSON.stringify({
          checkedItems,
          remarks,
          photos,
        }));
      } catch (error) {
        console.error('Failed to save checklist state:', error);
      }
    };

    saveChecklistState();
  }, [checkedItems, remarks, photos, section]);

  const handleCheckboxChange = (itemId) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const handleAddPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // if (!result.canceled) {
    //   setPhotos([...photos, result.uri]);
    // }
  };

  return (
    <View style={styles.container}>
      <Taskbar />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.heading}>{section} Checklist</Text>
        {checklistItems[section]?.map((item) => (
          <View key={item.id} style={styles.itemContainer}>
            <View style={styles.checkboxContainer}>
              <TouchableOpacity onPress={() => handleCheckboxChange(item.id)}>
                <View style={[styles.checkbox, checkedItems[item.id] && styles.checked]} />
              </TouchableOpacity>
              <Text style={styles.itemText}>{item.text}</Text>
            </View>
          </View>
        ))}
        <TextInput
          style={styles.remarksInput}
          placeholder="Enter general remarks..."
          value={remarks}
          onChangeText={setRemarks}
        />
        <View style={styles.photoSection}>
          <Button title="Add Photo" onPress={handleAddPhoto} />
          <View style={styles.photosContainer}>
            {photos.map((uri, index) => (
              <Image key={index} source={{ uri }} style={styles.photo} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemContainer: {
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#000',
    marginRight: 10,
  },
  checked: {
    backgroundColor: '#00f', // Blue color when checked
  },
  itemText: {
    fontSize: 18,
  },
  remarksInput: {
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  photoSection: {
    marginTop: 20,
  },
  photosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  photo: {
    width: 100,
    height: 100,
    marginRight: 10,
    marginBottom: 10,
  },
});

export default CheckList;
