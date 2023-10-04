import { StatusBar } from 'expo-status-bar';
import { Keyboard, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Task from './components/Task';
import { KeyboardAvoidingView } from 'react-native';
import React, {useState} from 'react';

export default function App() {

  const [task,setTask] = useState();
  const [taskItems,setTaskItems] = useState([]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems,task]);
    setTask('');
  }

  const completeTask = (index) =>{
    let itemCopy =[...taskItems];
    itemCopy.splice(index,1);
    setTaskItems(itemCopy);  
  }

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Todays Task's</Text>
      </View>

      <View styles={styles.items}>
        
        {
          taskItems.map((item,index) => {
            return(<TouchableOpacity key={index}  onPress={() => completeTask(index)}>
            <Task text={item} /> 
          </TouchableOpacity>
          )})
        }
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput style={styles.input} placeholder='Write Task' onChangeText={text => setTask(text)} value={task}></TextInput>
        <TouchableOpacity onPress={() => handleAddTask() }> 
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper:{
    paddingTop:80,
    paddingHorizontal:20,


  },
  sectionTitle:{
    fontSize:24,
    fontWeight:'bold'

  },
  items:{
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText:{
    fontWeight:'bold',
    fontSize: 20,
  },
});
