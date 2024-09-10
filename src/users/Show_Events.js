import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const Show_Events = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [registeredEvents, setRegisteredEvents] = useState([]);

  const getData = async () => {
    setLoading(true);
    try {
      const eventsCollection = await firestore().collection('Events').get();
      const eventsData = eventsCollection.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(eventsData);
    } catch (error) {
      console.error('Error fetching Events: ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleRegisterPress = async event => {
    try {
      await AsyncStorage.setItem('selectedEventID', event.id);
      navigation.navigate('Apply_Events', {event});
    } catch (error) {
      console.error('Error handling register press: ', error);
    }
  };

  const renderItem = ({item}) => {
    const isRegistered = registeredEvents.includes(item.id);

    return (
      <View style={styles.itemContainer}>
        <Text style={styles.eventTitle}>{item.Event_Name}</Text>
        <Text>Event Description: {item.Event_Description}</Text>
        <Text>Event Day: {item.Event_Day}</Text>
        <Text>Location: {item.Event_Location}</Text>
        <TouchableOpacity
          style={[styles.registerButton, isRegistered && styles.disabledButton]}
          onPress={() => !isRegistered && handleRegisterPress(item)}
          disabled={isRegistered}>
          <Text style={styles.registerButtonText}>
            {isRegistered ? 'Registered' : 'Register'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Upcoming Events</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}

      <TouchableOpacity onPress={getData} style={styles.refreshButton}>
        <Text style={styles.buttonText}>Refresh Events</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Show_Events;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#eaf4ff',
  },
  headerText: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#0033cc',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'cursive',
  },
  itemContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0033cc',
    marginBottom: 10,
  },
  registerButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: '#aaa',
  },
  refreshButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
