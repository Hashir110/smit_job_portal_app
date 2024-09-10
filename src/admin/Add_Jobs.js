import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Button} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import {TextInput} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import {Picker} from '@react-native-picker/picker';

const errorShow = (type, text) => {
  Toast.show({
    position: 'bottom',
    type: type,
    text1: text,
  });
};

const Add_Jobs = () => {
  let [exp, setExp] = useState('');
  let [cat, setCat] = useState('');
  let [salery, setSalery] = useState('');
  let [description, setDescription] = useState('');

  const addData = async () => {
    if (
      exp == '' ||
      isNaN(exp) ||
      cat == '' ||
      salery == '' ||
      description == ''
    ) {
      exp == ''
        ? errorShow('error', 'Experience Must Be Required')
        : isNaN(exp)
        ? errorShow('error', 'Experience Must Be a Number')
        : cat == ''
        ? errorShow('error', 'Job Category Must Be Required')
        : salery == ''
        ? errorShow('error', 'Job Salary Must Be Required')
        : description == ''
        ? errorShow('error', 'Job Description Must Be Required')
        : '';
    } else {
      const usersCollection = await firestore().collection('Jobs').add({
        Job_Experience: exp,
        Job_Category: cat,
        Job_Salery: salery,
        Job_Description: description,
      });

      setExp('');
      setCat('');
      setSalery('');
      setDescription('');

      console.log(usersCollection.docs[0].data());
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Jobs</Text>

      <TextInput
        keyboardType="numeric"
        label="Experience (in years)"
        value={exp}
        onChangeText={exp => setExp(exp)}
        style={styles.input}
      />

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={cat}
          onValueChange={(itemValue, itemIndex) => setCat(itemValue)}
          style={styles.picker}>
          <Picker.Item label="Select Job Category" value="" />
          <Picker.Item label="Internship" value="Internship" />
          <Picker.Item label="Frontend" value="Frontend" />
          <Picker.Item label="Backend" value="Backend" />
          <Picker.Item label="MERN Stack" value="MERN Stack" />
          <Picker.Item label="Full Stack" value="Full Stack" />
        </Picker>
      </View>

      <TextInput
        label="Salary ($)"
        value={salery}
        onChangeText={salery => setSalery(salery)}
        style={styles.input}
      />

      <TextInput
        label="Job Description"
        value={description}
        onChangeText={description => setDescription(description)}
        multiline
        numberOfLines={4}
        style={[styles.input, styles.descriptionInput]}
      />

      <Button mode="contained" onPress={() => addData()} style={styles.addBtn}>
        Add Job
      </Button>
    </View>
  );
};

export default Add_Jobs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#eaf2f8',
  },
  header: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'cursive',
  },
  input: {
    marginVertical: 10,
    backgroundColor: '#fff',
    borderColor: '#003366',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    fontFamily: 'cursive',
  },
  pickerContainer: {
    marginVertical: 10,
    borderColor: '#003366',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  addBtn: {
    elevation: 8,
    backgroundColor: '#003366',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderColor: '#003366',
    borderWidth: 1,
    alignSelf: 'center',
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
});
