import { StyleSheet, Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './Screens/HomeScreen';
import DiceScreen from './Screens/DiceScreen';
import NoteScreen from './Screens/NoteScreen';
import { FontAwesome5, Foundation } from '@expo/vector-icons';

SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 2000);

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Notes') {
              iconName = 'clipboard-list';

            } else if (route.name === 'Dice Roller') {
              iconName = 'dice-six';
            }
            if (route.name === 'Add Note'){
              iconName = 'plus-square'
            }

            return <FontAwesome5 name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Notes" component={HomeScreen} />
        <Tab.Screen name="Dice Roller" component={DiceScreen} />
        <Tab.Screen name="Add Note" component={NoteScreen}/>
      </Tab.Navigator>
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
