import React, {useState, useEffect} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
} from 'react-native';
import Task from './src/components/Task';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState(false);
  const [search, setSearch] = useState('');
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    let itemsCopy = [...taskItems, {title, description, completed}];
    setTaskItems(itemsCopy);
    setTitle(null);
    setDescription(null);
    storeData(itemsCopy);

    // const res = getData();
    // console.log(res);
    // console.log(title);
    // setTitle(null);
    // setDescription(null);
  };
  useEffect(() => {
    getData();
  }, []);
  const storeData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('Task List', jsonValue);
    } catch (e) {
      console.log(e);
    }
  };
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('Task List');
      console.log(jsonValue);
      return jsonValue != null ? setTaskItems([JSON.parse(jsonValue)]) : "";
    } catch (e) {
      // error reading value
    }
  };
  const removeData = async () =>{
    try{
      await AsyncStorage.removeItem('Task List');
    }catch(e){
      console.log(e);
    }
  }

  const completeTask = index => {
    let itemsCopy = [...taskItems];
    itemsCopy[index].completed = true;
    setTaskItems(itemsCopy);
    removeData();
    storeData(itemsCopy);
  };
  const deleteTask = index => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
    removeData();
    storeData(itemsCopy);
  };

  return (
    <View style={styles.container}>
      {/* Added this scroll view to enable scrolling when list gets longer than the page */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled">
        {/* Today's Tasks */}
        <View style={styles.tasksWrapper}>
          <Text style={styles.Title}>Todos</Text>
          <Text style={styles.sectionTitle}>Today's tasks</Text>
          <TextInput
            style={styles.input1}
            placeholder={'Search task by title'}
            value={search}
            onChangeText={text => setSearch(text)}
          />
          <View style={styles.items}>
            {/* This is where the tasks will go! */}
            {taskItems.map((item, index) => {
              if (search == '' && item !="") {
                storeData(item);
                return (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      // justifyContent: 'space-between',
                      // width:400,
                    }}>
                    <Task
                      description={item.description}
                      Title={item.title}
                      status={item.completed}
                    />
                    <View
                      style={{
                        position: 'absolute',
                        left: 285,
                        bottom: 5,
                      }}>
                      <TouchableOpacity
                        onPress={() => deleteTask(index)}
                        style={{
                          marginVertical: 0,
                          backgroundColor: '#FFF',
                          padding: 3,
                          borderRadius: 10,
                          width: 100,
                          marginBottom: 3,
                        }}>
                        <Text style={{color: 'black', textAlign: 'center'}}>
                          Delete
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => completeTask(index)}
                        style={{
                          marginBottom: 14,
                          backgroundColor: '#FFF',
                          padding: 3,
                          borderRadius: 10,
                          width: 100,
                        }}>
                        <Text style={{color: 'black', textAlign: 'center'}}>
                          Mark
                        </Text>
                        <Text style={{color: 'black', textAlign: 'center'}}>
                          completed
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              } else if (item.title == search) {
                return (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      // justifyContent: 'space-between',
                      // width:400,
                    }}>
                    <Task
                      description={item.description}
                      Title={item.title}
                      status={item.completed}
                    />
                    <View
                      style={{
                        position: 'absolute',
                        left: 300,
                        padding: 10,
                        borderRadius: 10,
                        backgroundColor: '#FFF',
                      }}>
                      <TouchableOpacity onPress={() => deleteTask(index)}>
                        <Text style={{color: 'black'}}>Delete</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => completeTask(index)}>
                        <Text style={{color: 'black'}}>Mark as completed</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }
            })}
          </View>
        </View>
      </ScrollView>

      {/* Write a task */}
      {/* Uses a keyboard avoiding view which ensures the keyboard does not cover the items on screen */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}>
        <View>
          <TextInput
            style={styles.input}
            placeholder={'Title'}
            value={title}
            onChangeText={text => setTitle(text)}
          />
          <TextInput
            style={styles.input2}
            placeholder={'Description'}
            value={description}
            onChangeText={text => setDescription(text)}
          />
        </View>
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>Add</Text>
            <Text style={styles.addText}>Task</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#312330',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  Title: {
    fontSize: 44,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color:"white"
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderColor: '#000',
    borderWidth: 1,
    width: 250,
  },
  input2: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderColor: '#000',
    borderWidth: 1,
    width: 250,
  },
  input1: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 0,
    borderColor: '#000',
    borderWidth: 1,
    width: 370,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#000',
    borderWidth: 1,
  },
  addText: {
    fontWeight:"bold",
    color:"black"
  },
});
