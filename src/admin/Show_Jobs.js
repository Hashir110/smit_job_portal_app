import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';

const Show_Jobs = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const coursesCollection = await firestore().collection('Jobs').get();

      const coursesData = coursesCollection.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setData(coursesData);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const hideData = () => {
    setData([]);
  };

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>Job Title: {item.Job_Category}</Text>
      <Text style={styles.itemText}>
        Job Description: {item.Job_Description}
      </Text>
      <Text style={styles.itemText}>
        Job Experience: {item.Job_Experience} years
      </Text>
      <Text style={styles.itemText}>Job Salary: ${item.Job_Salery}</Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Available Jobs</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#003366" />
      ) : data.length > 0 ? (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      ) : (
        <Text style={styles.noDataText}>No Jobs available.</Text>
      )}

      <TouchableOpacity onPress={getData} style={styles.button}>
        <Text style={styles.buttonText}>Refresh Jobs</Text>
      </TouchableOpacity>

      {data.length > 0 && (
        <TouchableOpacity onPress={() => hideData()} style={styles.button}>
          <Text style={styles.buttonText}>Hide</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

export default Show_Jobs;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#eaf2f8',
  },
  title: {
    fontSize: 36,
    fontFamily: 'cursive',
    color: '#003366',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'cursive',
  },
  itemContainer: {
    padding: 20,
    borderWidth: 1,
    borderColor: '#003366',
    borderRadius: 8,
    marginVertical: 10,
    backgroundColor: '#fff',
  },
  itemText: {
    fontSize: 16,
    color: '#003366',
    marginBottom: 5,
  },
  noDataText: {
    fontSize: 18,
    color: '#003366',
    textAlign: 'center',
    marginVertical: 20,
  },
  button: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#003366',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
