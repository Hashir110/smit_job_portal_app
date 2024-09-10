import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Button, TextInput} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';

const SignUp = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const errorShow = (type, text) => {
    Toast.show({
      position: 'bottom',
      type: type,
      text1: text,
    });
  };

  const SignupUser = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (name === '' || email === '' || password === '') {
      name === ''
        ? errorShow('error', 'Name Must Be Required')
        : email === ''
        ? errorShow('error', 'Email Must Be Required')
        : password === ''
        ? errorShow('error', 'Password Must Be Required')
        : '';
    } else if (!regex.test(email)) {
      errorShow('error', 'Please Enter Valid Email');
    } else {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async userCredentials => {
          console.log('User account created & signed in!');
          errorShow('success', 'User account created & signed in!');
          setName('');
          setEmail('');
          setPassword('');
          navigation.navigate('SignIn');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            errorShow('error', 'That email address is already in use!');
          }
          if (error.code === 'auth/invalid-email') {
            errorShow('error', 'That email address is invalid!');
          }
          console.error(error);
        });
    }
  };

  const signInuser = () => {
    navigation.navigate('SignIn');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.Txt}>Sign Up</Text>

      <TextInput
        label="Name"
        value={name}
        onChangeText={text => setName(text)}
        style={styles.inp}
      />

      <TextInput
        label="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        style={styles.inp}
      />

      <TextInput
        label="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        style={styles.inp}
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={SignupUser}
          style={[
            styles.signinBtn,
            {backgroundColor: '#007bff', borderColor: '#007bff'},
          ]}>
          Sign Up
        </Button>
        <Button
          mode="outlined"
          onPress={signInuser}
          style={[
            styles.signinBtn,
            {borderColor: '#007bff', color: '#007bff'},
          ]}>
          Sign In
        </Button>
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eaf4ff',
    padding: 20,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderColor: '#007bff',
    borderWidth: 2,
    borderRadius: 75,
  },
  Txt: {
    fontSize: 40,
    fontFamily: 'cursive',
    marginBottom: 20,
    color: '#007bff',
    textAlign: 'center',
  },
  inp: {
    width: '100%',
    marginVertical: 10,
    backgroundColor: 'white',
    color: 'black',
    borderColor: '#007bff',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  signinBtn: {
    elevation: 8,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 7,
    marginVertical: 5,
    width: '80%',
    height: 50,
  },
});
