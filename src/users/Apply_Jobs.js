import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const errorShow = (type, text) => {
  Toast.show({
    position: 'bottom',
    type: type,
    text1: text,
  });
};

const Apply_Jobs = ({route, navigation}) => {
  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneno, setPhoneNo] = useState('');
  const [gender, setGender] = useState('');
  const [city, setCity] = useState('');
  const [alreadyApplied, setAlreadyApplied] = useState(false);

  const {course} = route.params;

  const checkIfAlreadyApplied = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const appliedJobsSnapshot = await firestore()
        .collection('Applied Jobs')
        .where('userId', '==', userId)
        .where('jobId', '==', course.id)
        .get();

      if (!appliedJobsSnapshot.empty) {
        setAlreadyApplied(true);
      }
    } catch (error) {
      console.error('Error checking applied jobs: ', error);
    }
  };

  useEffect(() => {
    checkIfAlreadyApplied();
  }, []);

  const applyForJob = async () => {
    if (
      fullname === '' ||
      email === '' ||
      phoneno === '' ||
      gender === '' ||
      city === ''
    ) {
      fullname === ''
        ? errorShow('error', 'Full Name Must Be Required')
        : email === ''
        ? errorShow('error', 'Email Must Be Required')
        : phoneno === ''
        ? errorShow('error', 'Phone No Must Be Required')
        : gender === ''
        ? errorShow('error', 'Gender Must Be Required')
        : city === ''
        ? errorShow('error', 'City Must Be Required')
        : '';
    } else {
      try {
        const userId = await AsyncStorage.getItem('userId');

        await firestore().collection('Applied Jobs').add({
          userId: userId,
          jobId: course.id,
          Full_Name: fullname,
          Email: email,
          Phone_No: phoneno,
          Gender: gender,
          City: city,
          Job_Category: course.Job_Category,
          Job_Description: course.Job_Description,
          Job_Experience: course.Job_Experience,
          Job_Salery: course.Job_Salery,
        });

        setFullName('');
        setEmail('');
        setPhoneNo('');
        setGender('');
        setCity('');

        errorShow('success', 'You have successfully applied for this job!');
      } catch (error) {
        errorShow('error', 'Error applying for the job');
        console.error('Error applying for job: ', error);
      }
    }
  };

  const logout = () => {
    navigation.navigate('SignUp');
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>{course.Job_Category}</Text>
        <Text style={styles.data}>
          Job Description: {course.Job_Description}
        </Text>
        <Text style={styles.data}>Job Experience: {course.Job_Experience}</Text>
        <Text style={styles.data}>Job Salery: {course.Job_Salery}</Text>
      </View>

      {alreadyApplied ? (
        <View>
          <Text style={styles.appliedMessage}>
            You have already applied for this job.
          </Text>
        </View>
      ) : (
        <>
          <View>
            <Text style={styles.heading}>Apply For This Job</Text>
          </View>
          <View>
            <TextInput
              label="Full Name"
              value={fullname}
              onChangeText={setFullName}
              style={styles.inp}
            />

            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.inp}
            />
            <TextInput
              label="Phone No"
              value={phoneno}
              onChangeText={setPhoneNo}
              style={styles.inp}
            />
            <TextInput
              label="Gender"
              value={gender}
              onChangeText={setGender}
              style={styles.inp}
            />
            <TextInput
              label="City"
              value={city}
              onChangeText={setCity}
              style={styles.inp}
            />

            <Button
              mode="contained"
              style={styles.submitBtn}
              onPress={applyForJob}>
              Submit
            </Button>

            <Button mode="outlined" style={styles.logoutBtn} onPress={logout}>
              Logout
            </Button>
          </View>
        </>
      )}
    </>
  );
};

export default Apply_Jobs;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#eaf4ff',
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
    color: '#0033cc',
    fontFamily: 'cursive',
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    color: '#0033cc',
  },
  data: {
    textAlign: 'center',
    color: '#0033cc',
  },
  inp: {
    margin: 10,
    backgroundColor: 'white',
    color: 'black',
    borderColor: '#0033cc',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  submitBtn: {
    marginTop: 10,
    elevation: 8,
    backgroundColor: '#0033cc',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 7,
    marginVertical: 5,
    width: 120,
    height: 50,
    alignSelf: 'center',
  },
  logoutBtn: {
    marginTop: 10,
    elevation: 8,
    borderColor: '#0033cc',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 7,
    marginVertical: 5,
    width: 120,
    height: 50,
    alignSelf: 'center',
  },
  appliedMessage: {
    textAlign: 'center',
    fontSize: 18,
    color: '#ff0000',
    marginTop: 20,
  },
});
