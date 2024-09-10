import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Button, TextInput} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';
import {Picker} from '@react-native-picker/picker';

const errorShow = (type, text) => {
  Toast.show({
    position: 'bottom',
    type: type,
    text1: text,
  });
};

const Add_Events = () => {
  let [eventName, setEventName] = useState('');
  let [eventDescription, setEventDescription] = useState('');
  let [eventDay, setEventDay] = useState('');
  let [eventLocation, setEventLocation] = useState('');

  const addData = async () => {
    if (
      eventName == '' ||
      eventDescription == '' ||
      eventDay == '' ||
      eventLocation == ''
    ) {
      eventName == ''
        ? errorShow('error', 'Event Name Must Be Required')
        : eventDescription == ''
        ? errorShow('error', 'Event Description Must Be Required')
        : eventDay == ''
        ? errorShow('error', 'Event Day Must Be Selected')
        : eventLocation == ''
        ? errorShow('error', 'Event Location Must Be Required')
        : '';
    } else {
      await firestore().collection('Events').add({
        Event_Name: eventName,
        Event_Description: eventDescription,
        Event_Day: eventDay,
        Event_Location: eventLocation,
      });

      setEventName('');
      setEventDescription('');
      setEventDay('');
      setEventLocation('');

      errorShow('success', 'Event Added Successfully!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Event</Text>

      <TextInput
        label="Event Name"
        value={eventName}
        onChangeText={setEventName}
        style={styles.input}
      />

      <TextInput
        label="Event Description"
        value={eventDescription}
        onChangeText={setEventDescription}
        multiline
        numberOfLines={4}
        style={[styles.input, styles.descriptionInput]}
      />

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={eventDay}
          onValueChange={(itemValue, itemIndex) => setEventDay(itemValue)}
          style={styles.picker}>
          <Picker.Item label="Select Event Day" value="" />
          <Picker.Item label="Monday" value="Monday" />
          <Picker.Item label="Tuesday" value="Tuesday" />
          <Picker.Item label="Wednesday" value="Wednesday" />
          <Picker.Item label="Thursday" value="Thursday" />
          <Picker.Item label="Friday" value="Friday" />
          <Picker.Item label="Saturday" value="Saturday" />
          <Picker.Item label="Sunday" value="Sunday" />
        </Picker>
      </View>

      <TextInput
        label="Event Location"
        value={eventLocation}
        onChangeText={setEventLocation}
        style={styles.input}
      />

      <Button mode="contained" onPress={addData} style={styles.addBtn}>
        Add Event
      </Button>
    </View>
  );
};

export default Add_Events;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#eaf2f8',
  },
  title: {
    fontSize: 40,
    fontFamily: 'cursive',
    marginVertical: 20,
    color: '#003366',
    textAlign: 'center',
    fontFamily: 'cursive',
  },
  input: {
    marginVertical: 10,
    backgroundColor: 'white',
    borderColor: '#003366',
    borderWidth: 1,
    borderRadius: 8,
  },
  pickerContainer: {
    marginVertical: 10,
    borderColor: '#003366',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  addBtn: {
    elevation: 8,
    backgroundColor: '#003366',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 20,
    alignSelf: 'center',
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
});
