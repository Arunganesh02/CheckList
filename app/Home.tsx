// screens/HomeScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet, Image, ScrollView } from 'react-native';
import Taskbar from '../components/Taskbar';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
const upload = async () => {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      name: "Arun G",
      email: "arun@example.com",
      age: 25
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }};


const Home = ({ navigation }) => {

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.sectionContainer}>
        <Button
          title="General Rules at Service Check"
          onPress={() => navigation.navigate('CheckList', { section: 'Section 1' })}
        />
        <Button
          title="Safety Rules"
          onPress={() => navigation.navigate('CheckList', { section: 'Section 2' })}
        />
        <Button
          title="sub"
          onPress={upload}
        />
        {/* Add more sections as needed */}
      </View>
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 600,
    height: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  sectionContainer: {
    width: '100%',
    padding: 10,
  },
});

export default Home;
