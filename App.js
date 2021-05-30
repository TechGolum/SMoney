import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { patchWebProps } from 'react-native-elements/dist/helpers';
import Columns from './Modules/Columns'
import ExpensesNumbers from './Modules/ExpensesNumbers'
import NewExpense from './Modules/NewExpense'
import NewBalance from './Modules/NewBalance'
import AsyncStorage from '@react-native-async-storage/async-storage';


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
  const [expenseVisible, setExpenseVisible] = useState(false)
  const [balanseVisible, setBalanseVisible] = useState(false)
  const [update, setUpdate] = useState(true)
  const [balance, setBalance] = useState(-1)
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

  const getData = async (element) => {
    try {
      const value = await AsyncStorage.getItem(element.category)
      if(value !== null) {
        element.sum = parseInt(value)
      }
      else {}
    } catch(e) {
    }
  }

  const getBalance = async () => {
    try {
      const value = await AsyncStorage.getItem('balance')
      if(value !== null) {
        setBalance(parseInt(value))
      }
      else {}
    }
    catch(e) {
    }
  }


  const storeData = async (_category, _sum) => {
    try 
    {
      await AsyncStorage.setItem(_category, _sum)
    } catch (e) {
      alert(e)
    }
  }

  useEffect(() => {
      data.forEach(element => {
    getData(element)
  })

  getBalance()
  }, [])



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
        storeData(_category, (element.sum).toString())
      }
    });

  }

  return(
    <View style = {styles.expView}>
      <View onTouchEnd = {() => {setBalanseVisible(true)}}
       style = {{flexDirection : 'row', justifyContent : 'space-between', width : '100%'}}>
        <Text style = {[styles.balance, {}]}>Balance:</Text>
        <Text style = {styles.balance}>{balance}$</Text>
      </View>

      <Columns expenses = {data.filter(elem => elem.sum > 0)} balance = {total()}/>

      <Text style = {styles.expText}>My expences</Text>

      <ExpensesNumbers expenses = {data.filter(elem => elem.sum > 0)}/>

      <TouchableOpacity style = {styles.button} onPress = {() => {setExpenseVisible(true)}}>
        <Text style = {{fontSize : 20, color : 'white', fontWeight : '500'}}> Add new expense</Text>
      </TouchableOpacity>

      <NewExpense 
        modalVisible = {expenseVisible} 
        setModalVisible = {setExpenseVisible} 
        balance = {balance} 
        storeData = {(x, y) => {storeData('balance', (balance - parseInt(y)).toString()); changeBalance(x, y) }}/>
      <NewBalance 
        modalVisible = {balanseVisible} 
        setModalVisible = {setBalanseVisible} balance = {balance} 
        changeBalance = {(x) => {if (parseInt(balance) + parseInt(x) >= 0){ storeData('balance', (balance + parseInt(x)).toString()); setBalance(parseInt(balance) + parseInt(x))}}}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
