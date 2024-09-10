import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const errorShow = (type, text) => {
    Toast.show({
      position: 'bottom',
      type: type,
      text1: text,
    });
  };

  const SignInUser = async () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !password) {
      !email && errorShow('error', 'Email Must Be Required');
      !password && errorShow('error', 'Password Must Be Required');
      return;
    } else if (!regex.test(email)) {
      errorShow('error', 'Please Enter Valid Email');
      return;
    } else {
      try {
        const userCredential = await auth().signInWithEmailAndPassword(
          email,
          password,
        );
        const {uid} = userCredential.user;

        await AsyncStorage.setItem('userUID', uid);

        errorShow('success', 'User signed in!');
        setEmail('');
        setPassword('');
        cheak_adminORuser();
      } catch (error) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            errorShow('error', 'That email address is already in use!');
            break;
          case 'auth/invalid-email':
            errorShow('error', 'That email address is invalid!');
            break;
          default:
            errorShow('error', 'Error signing in');
        }
        console.error(error);
      }
    }
  };

  const cheak_adminORuser = () => {
    if (email === 'admin@gmail.com' && password === 'admin123') {
      navigation.navigate('Drawer_nav');
    } else {
      navigation.navigate('Bottom_Nav');
    }
  };

  const signUpPage = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.Txt}>Sign In</Text>

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
          onPress={SignInUser}
          style={[
            styles.signinBtn,
            {backgroundColor: '#007bff', borderColor: '#007bff'},
          ]}>
          Sign In
        </Button>
        <Button
          mode="outlined"
          onPress={signUpPage}
          style={[
            styles.signinBtn,
            {borderColor: '#007bff', color: '#007bff'},
          ]}>
          Sign Up
        </Button>
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eaf4ff',
    padding: 20,
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
