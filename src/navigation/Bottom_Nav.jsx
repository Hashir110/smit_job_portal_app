import {StyleSheet, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import See_Jobs from '../users/See_Jobs';
import Apply_Jobs from '../users/Apply_Jobs';
import See_Apply_Jobs from '../users/See_Apply_Jobs';
import Show_Events from '../users/Show_Events';
import Apply_Events from '../users/Apply_Events';

const Bottom = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'See_Jobs') {
            iconName = focused ? 'briefcase' : 'briefcase-outline';
          } else if (route.name === 'Apply_Jobs') {
            iconName = focused ? 'send' : 'send-outline';
          } else if (route.name === 'See_Apply_Jobs') {
            iconName = focused
              ? 'checkmark-circle'
              : 'checkmark-circle-outline';
          } else if (route.name === 'Show_Events') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Apply_Events') {
            iconName = focused ? 'list' : 'list-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="See_Jobs"
        component={See_Jobs}
        options={{
          headerShown: false,
          tabBarLabel: 'See Jobs',
        }}
      />
      <Tab.Screen
        name="Apply_Jobs"
        component={Apply_Jobs}
        options={{
          headerShown: false,
          tabBarLabel: 'Apply Jobs',
        }}
      />
      <Tab.Screen
        name="See_Apply_Jobs"
        component={See_Apply_Jobs}
        options={{
          headerShown: false,
          tabBarLabel: 'Applied Jobs',
        }}
      />
      <Tab.Screen
        name="Show_Events"
        component={Show_Events}
        options={{
          headerShown: false,
          tabBarLabel: 'Events',
        }}
      />
      <Tab.Screen
        name="Apply_Events"
        component={Apply_Events}
        options={{
          headerShown: false,
          tabBarLabel: 'Apply Events',
        }}
      />
    </Tab.Navigator>
  );
};

export default Bottom;

const styles = StyleSheet.create({
  txt: {
    fontSize: 50,
    fontFamily: 'cursive',
    textAlign: 'center',
    color: 'orange',
  },
});
