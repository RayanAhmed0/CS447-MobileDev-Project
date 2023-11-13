import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../screens/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import DetailsScreen from '../screens/DetailsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator()

function StackNavigation(){
  return(
    <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="explore." component={ExploreScreen}/>
        <Stack.Screen options={{ headerShown: false }} name='details' component={DetailsScreen}/>
    </Stack.Navigator>
  )
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor:'#ddd',
          tabBarStyle: { backgroundColor:'rgba(155, 175, 217, 1)', padding:6},
          headerStyle: {
              height: 80, 
            },
      }}
      >
        <Tab.Screen name="Home" component={HomeScreen}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={30} />
            ),
            headerStyle: {
              backgroundColor: 'rgba(16, 55, 131, 1)',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
        }}
        />
      <Tab.Screen name='Explore'  component={StackNavigation}
        options={{
          tabBarLabel: '',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="compass-outline" color={color} size={30} />
            ),
          headerStyle: {
            backgroundColor: 'rgba(16, 55, 131, 1)',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
