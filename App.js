import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Columns from './Modules/Columns'
import ExpensesNumbers from './Modules/Expences'
import NewExpense from './Modules/NewExpense'

export default function App() {
  return (
    <View style={styles.container}>
      <Text style = {styles.header}>SMoney</Text>
      <Expenses/>
    </View>
  );
}

function Expenses()
{
  const [modalVisible, setModalVisible] = useState(false)
  return(
    <View style = {styles.expView}>

      <Columns/>

      <Text style = {styles.expText}>My expences</Text>

      <ExpensesNumbers/>

      <TouchableOpacity style = {styles.button} onPress = {() => {setModalVisible(true)}}>
        <Text style = {{fontSize : 20, color : 'white', fontWeight : '500'}}> Add new expense</Text>
      </TouchableOpacity>

      <NewExpense modalVisible = {modalVisible} setModalVisible = {setModalVisible}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width : '100%'
  },
  header:{
    marginTop : 50,
    marginLeft: 30,
    fontSize: 40, 
    fontWeight : 'bold'
  },
  expView : {
    marginTop : 30,
    width : '80%',
    alignSelf : 'center'
  },
  expText:{
    fontSize : 30,
    fontWeight : "500",
    marginTop : 20
  },
  button : {
    backgroundColor : '#2fa1ee',
    marginTop : 100,
    width : 250,
    height : 50,
    justifyContent : 'center',
    alignItems : 'center', 
    borderRadius : 10,
    alignSelf : 'center'
  }
});
