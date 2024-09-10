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
import {Button} from 'react-native-paper';

const Join_Jobs = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const coursesCollection = await firestore()
        .collection('Enroll Users')
        .get();
      const coursesData = coursesCollection.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(coursesData);
    } catch (error) {
      console.error('Error fetching data: ', error);
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

  const deleteStudent = async id => {
    try {
      await firestore().collection('Enroll Users').doc(id).delete();

      setData(prevData => prevData.filter(student => student.id !== id));
    } catch (error) {
      console.error('Error deleting student: ', error);
    }
  };

  // Function to render each item in the FlatList
  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>Full Name: {item.Full_Name}</Text>

      <Text style={styles.itemText}>Email: {item.Email}</Text>
      <Text style={styles.itemText}>Job Category: {item.Job_Category}</Text>
      <Text style={styles.itemText}>Gender: {item.Gender}</Text>
      <Text style={styles.itemText}>Phone No: {item.Phone_No}</Text>
      <Text style={styles.itemText}>City: {item.City}</Text>
      <TouchableOpacity onPress={() => deleteStudent(item.id)}>
        <Text style={styles.dltBtn}>Delete This Person</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Applied Jobs Person</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#003366" />
      ) : data.length > 0 ? (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      ) : (
        <Text style={styles.noDataText}>No Jobs Persons enrolled yet.</Text>
      )}

      {data.length > 0 && (
        <TouchableOpacity onPress={() => hideData()} style={styles.button}>
          <Text style={styles.buttonText}>Hide</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

export default Join_Jobs;

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
    marginVertical: 20,
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
  dltBtn: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#003366',
    borderRadius: 8,
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  logoutBtn: {
    elevation: 8,
    backgroundColor: '#003366',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 20,
    alignSelf: 'center',
  },
});
