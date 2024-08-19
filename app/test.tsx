import React, { useEffect } from "react";
import { Text } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
const Test = () => {
    useEffect(() => {
        const uploadData = async () => {
            try {
                const docRef = await addDoc(collection(db, "users"), {
                  name: "Arun G",
                  email: "arun@example.com",
                  age: 25
                });
                console.log("Document written with ID: ", docRef.id);
              } catch (e) {
                console.error("Error adding document: ", e);
              }}

        uploadData();
    }, []);

    return (
        <SafeAreaView>
            <Text>arun ganesh is a good boy</Text>
        </SafeAreaView>
    );
};

export default Test;
