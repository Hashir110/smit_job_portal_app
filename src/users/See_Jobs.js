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

const See_Jobs = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    try {
      const jobsCollection = await firestore().collection('Jobs').get();

      const jobsData = jobsCollection.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(jobsData);
    } catch (error) {
      console.error('Error fetching Jobs: ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleApplyPress = async job => {
    try {
      await AsyncStorage.setItem('selectedJobID', job.id);

      navigation.navigate('Apply_Jobs', {course: job});
    } catch (error) {
      console.error('Error saving job ID: ', error);
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Text style={styles.jobTitle}>{item.Job_Category}</Text>
      <Text>Job Description: {item.Job_Description}</Text>
      <Text>Experience Required: {item.Job_Experience}</Text>
      <Text>Salary: {item.Job_Salery}</Text>
      <TouchableOpacity
        style={styles.applyButton}
        onPress={() => handleApplyPress(item)}>
        <Text style={styles.applyButtonText}>Apply</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Active Jobs</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0033cc" />
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}

      <TouchableOpacity onPress={getData} style={styles.refreshButton}>
        <Text style={styles.buttonText}>Refresh Jobs</Text>
      </TouchableOpacity>
    </View>
  );
};

export default See_Jobs;

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
  jobTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0033cc',
    marginBottom: 10,
  },
  applyButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#0033cc',
    borderRadius: 5,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  refreshButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#0044cc',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
