import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import HomeScreen from './src/screens/HomeScreen';
import ReliefScreen from './src/screens/ReliefScreen';
import WellnessScreen from './src/screens/WellnessScreen';
import ConsultScreen from './src/screens/ConsultScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import TherapyHistoryScreen from './src/screens/TherapyHistoryScreen';
import SelectSymptomScreen from './src/screens/SelectSymptomScreen';
import FaceGlowScreen from './src/screens/FaceGlowScreen';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

const TAB_ICONS: Record<string, string> = {
  Home:     '🏠',
  Relief:   '❤️',
  Wellness: '✦',
  Consult:  '📅',
  Profile:  '👤',
};

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeMain"       component={HomeScreen}         />
      <HomeStack.Screen name="SelectSymptom"  component={SelectSymptomScreen}/>
      <HomeStack.Screen name="FaceGlow"       component={FaceGlowScreen}     />
    </HomeStack.Navigator>
  );
}

function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="ProfileMain"    component={ProfileScreen}        />
      <ProfileStack.Screen name="TherapyHistory" component={TherapyHistoryScreen} />
    </ProfileStack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.5 }}>
              {TAB_ICONS[route.name]}
            </Text>
          ),
          tabBarActiveTintColor: '#1FA77A',
          tabBarInactiveTintColor: '#9ca3af',
          tabBarStyle: {
            backgroundColor: '#fff',
            borderTopWidth: 1,
            borderTopColor: '#f0f0f0',
            height: 60,
            paddingBottom: 8,
            paddingTop: 6,
            elevation: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.06,
            shadowRadius: 6,
          },
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: '600',
          },
        })}
      >
        <Tab.Screen name="Home"     component={HomeStackNavigator}   />
        <Tab.Screen name="Relief"   component={ReliefScreen}         />
        <Tab.Screen name="Wellness" component={WellnessScreen}       />
        <Tab.Screen name="Consult"  component={ConsultScreen}        />
        <Tab.Screen name="Profile"  component={ProfileStackNavigator}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}