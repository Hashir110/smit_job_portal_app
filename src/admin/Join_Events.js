import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Join_Events = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getJoinedEvents = async () => {
    setLoading(true);
    try {
      const userId = await AsyncStorage.getItem('userId');
      const eventsCollection = await firestore()
        .collection('Enroll Events Users')
        .where('userId', '==', userId)
        .get();

      const eventsData = eventsCollection.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(eventsData);
    } catch (error) {
      console.error('Error fetching joined events: ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getJoinedEvents();
  }, []);

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Text style={styles.eventTitle}>{item.eventName}</Text>
      <Text>Event Day: {item.eventDay}</Text>
      <Text>Location: {item.eventLocation}</Text>
      <Text>Email: {item.email}</Text>
      <Text>Phone: {item.phone}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Joined Events Persons</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

export default Join_Events;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#eaf2f8',
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#003366',
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
    borderColor: '#003366',
    borderWidth: 1,
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 10,
  },
});
