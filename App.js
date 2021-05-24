import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, DrawerLayoutAndroidBase } from 'react-native';
import { patchWebProps } from 'react-native-elements/dist/helpers';
import Columns from './Modules/Columns'
import ExpensesNumbers from './Modules/Expences'
import NewExpense from './Modules/NewExpense'

export default function App() 
{
  return (
    <View style={styles.container}>
      <Text style = {styles.header}>SMoney</Text>
      <Expenses/>
    </View>
  );
}

function Expenses(props)
{
  const [modalVisible, setModalVisible] = useState(false)
  const [balance, setBalance] = useState(500)
  const [data, setData] = useState([
    {category : 'Study', sum : 0, color : '#99dfff'}, //blue
    {category : 'Shop', sum : 0, color : '#ffb699'}, // red
    {category : 'Bills', sum : 0, color : '#99ffc2'}, //green
    {category : 'Fun', sum : 0, color : '#5cffd4'}, //aquamarine
    {category : 'Food', sum : 0, color : '#5c7dff'}, //violet
    {category : 'Transport', sum : 0, color : '#dc5cff'}, //purple
    {category : 'Health', sum : 0, color : '#ff5c87'}, //pink
    {category : 'Gifts', sum : 0, color : '#ffb05c'}, //orange
  ])


  function total()
  {
    let sum = balance
    data.forEach(element => {
      sum += element.sum
    })
    return sum
  }

  function changeBalance(_category, _sum)
  {
    data.forEach(element => {
      if(element.category == _category)
      {
        element.sum += parseInt(_sum)
        setBalance(balance - parseInt(_sum))
      }
    });
  }

  return(
    <View style = {styles.expView}>
      <View style = {{flexDirection : 'row', justifyContent : 'space-between', width : '100%'}}>
        <Text style = {[styles.balance, {}]}>Balance:</Text>
        <Text style = {styles.balance}>{balance}$</Text>
      </View>

      <Columns expenses = {data} balance = {total()}/>

      <Text style = {styles.expText}>My expences</Text>

      <ExpensesNumbers expenses = {data}/>

      <TouchableOpacity style = {styles.button} onPress = {() => {setModalVisible(true)}}>
        <Text style = {{fontSize : 20, color : 'white', fontWeight : '500'}}> Add new expense</Text>
      </TouchableOpacity>

      <NewExpense modalVisible = {modalVisible} setModalVisible = {setModalVisible} balance = {balance} storeData = {(x, y) => { changeBalance(x, y) }}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width : '100%',
    maxWidth: 400
  },
  header:{
    marginTop : 50,
    marginLeft: 30,
    fontSize: 40, 
    fontWeight : 'bold'
  },
  balance : {
    fontSize : 30,
    marginBottom : 20
    },
  expView : {
    marginTop : 30,
    width : '80%',
    alignSelf : 'center',
    alignItems : 'center'
  },
  expText:{
    fontSize : 30,
    marginTop : 20
  },
  button : {
    backgroundColor : '#2fa1ee',
    marginTop : 20,
    width : 250,
    height : 50,
    justifyContent : 'center',
    alignItems : 'center', 
    borderRadius : 10,
  }
});
