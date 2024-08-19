import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CheckList from './app/CheckList'
import Home from './app/Home'
import Test from './app/test';
import SectionOverviewScreen from './app/SectionOverviewScreen';
import ChecklistScreen from './app/ChecklistScreen';
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>

    <NavigationContainer>
    <Stack.Navigator>
    {/* <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="CheckList"
        component={CheckList}
      /> */}
        <Stack.Screen name="SectionOverview" component={SectionOverviewScreen} />
        <Stack.Screen name="ChecklistScreen" component={ChecklistScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

