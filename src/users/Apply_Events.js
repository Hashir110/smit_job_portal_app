import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const Apply_Events = ({route, navigation}) => {
  const {event} = route.params;
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const checkIfRegistered = async () => {
    try {
      const querySnapshot = await firestore()
        .collection('Enroll Events Users')
        .where('eventId', '==', event.id)
        .where('email', '==', email)
        .where('phone', '==', phone)
        .get();

      return !querySnapshot.empty;
    } catch (error) {
      console.error('Error checking registration: ', error);
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!email || !phone) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Please fill out all fields',
        text2: 'Both email and phone number are required.',
      });
      return;
    }

    setLoading(true);

    try {
      const userId = await AsyncStorage.getItem('userId');

      if (await checkIfRegistered()) {
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Already Registered',
          text2:
            'You have already registered for this event with this email or phone number.',
        });
        setLoading(false);
        return;
      }

      await firestore().collection('Enroll Events Users').add({
        userId: userId,
        eventId: event.id,
        eventName: event.Event_Name,
        eventDay: event.Event_Day,
        eventLocation: event.Event_Location,
        email: email,
        phone: phone,
      });

      setEmail(''), setPhone('');

      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Registration Successful',
        text2: 'You have successfully registered for the event.',
      });
      navigation.goBack();
    } catch (error) {
      console.error('Error submitting application: ', error);
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Registration Error',
        text2: 'There was an error registering for the event.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Register for {event.Event_Name}</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.submitButtonText}>Submit</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Apply_Events;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#eaf4ff',
  },
  headerText: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#0033cc',
    marginBottom: 20,
    fontFamily: 'cursive',
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  submitButton: {
    padding: 15,
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});
