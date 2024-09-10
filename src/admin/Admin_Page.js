import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

const Admin_Page = ({navigation}) => {
  const handlePress = destination => {
    navigation.navigate(destination);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handlePress('Add_Jobs')}>
          <Text style={styles.buttonText}>Add Jobs</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handlePress('Show_Jobs')}>
          <Text style={styles.buttonText}>Show Jobs</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handlePress('Join_Jobs')}>
          <Text style={styles.buttonText}>Join Jobs</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handlePress('Add_Events')}>
          <Text style={styles.buttonText}>Add Events</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handlePress('Join_Events')}>
          <Text style={styles.buttonText}>Join Events Persons</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Admin_Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaf4ff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 40,
    textAlign: 'center',
    fontFamily: 'cursive',
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'cursive',
  },
});
