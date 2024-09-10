import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const See_Apply_Jobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);

  const fetchAppliedJobs = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const appliedJobsSnapshot = await firestore()
        .collection('Applied Jobs')
        .where('userId', '==', userId)
        .get();

      const jobsList = appliedJobsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setAppliedJobs(jobsList);
    } catch (error) {
      console.error('Error fetching applied jobs: ', error);
    }
  };

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  const renderJobItem = ({item}) => (
    <View style={styles.jobItem}>
      <Text style={styles.jobCategory}>{item.Job_Category}</Text>
      <Text>Job Description: {item.Job_Description}</Text>
      <Text>Experience: {item.Job_Experience}</Text>
      <Text>Salary: {item.Job_Salery}</Text>
      <Text>City: {item.City}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Jobs You've Applied For</Text>
      {appliedJobs.length === 0 ? (
        <Text style={styles.noJobs}>You haven't applied for any jobs yet.</Text>
      ) : (
        <FlatList
          data={appliedJobs}
          renderItem={renderJobItem}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

export default See_Apply_Jobs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#eaf4ff',
  },
  heading: {
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#0033cc',
    fontFamily: 'cursive',
  },
  noJobs: {
    textAlign: 'center',
    fontSize: 16,
    color: '#0066cc',
  },
  jobItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#b3d9ff',
  },
  jobCategory: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0033cc',
  },
});
