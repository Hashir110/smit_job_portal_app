import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Admin_Page from '../admin/Admin_Page';
import Add_Jobs from '../admin/Add_Jobs';

import Add_Events from '../admin/Add_Events';

import Join_Events from '../admin/Join_Events';
import Show_Jobs from '../admin/Show_Jobs';
import Join_Jobs from '../admin/Join_Jobs';

const Drawer = createDrawerNavigator();

const Drawer_nav = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#f5f5f5',
          width: 240,
        },
        drawerActiveTintColor: '#6200ee',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: 'bold',
        },
        headerStyle: {
          backgroundColor: '#6200ee',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Drawer.Screen
        name="Admin_Page"
        component={Admin_Page}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="home" size={22} color={color} />
          ),
          title: 'Admin Dashboard',
        }}
      />
      <Drawer.Screen
        name="Add_Jobs"
        component={Add_Jobs}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="add-circle" size={22} color={color} />
          ),
          title: 'Add Job',
        }}
      />
      <Drawer.Screen
        name="Show_Jobs"
        component={Show_Jobs}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="list" size={22} color={color} />
          ),
          title: 'Show Jobs',
        }}
      />
      <Drawer.Screen
        name="Join_Jobs"
        component={Join_Jobs}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="people" size={22} color={color} />
          ),
          title: 'Applied People Jobs',
        }}
      />
      <Drawer.Screen
        name="Add_Events"
        component={Add_Events}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="calendar" size={22} color={color} />
          ),
          title: 'Add Events',
        }}
      />
      <Drawer.Screen
        name="Join_Events"
        component={Join_Events}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="person-add" size={22} color={color} />
          ),
          title: 'Join Events Persons',
        }}
      />
    </Drawer.Navigator>
  );
};

export default Drawer_nav;
