import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { patchWebProps } from 'react-native-elements/dist/helpers';

import Columns from './Modules/Columns'
import NewExpense from './Modules/NewExpense'
import NewBalance from './Modules/NewBalance'
import ChangeColumn from './Modules/ChangeColumn';
import Settings from './Modules/Settings'
import SetUp from './Modules/Setup'
import Months from './Modules/Months'

import AsyncStorage from '@react-native-async-storage/async-storage';
import {Icon} from 'react-native-elements'
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

export default function App() 
{
  const [settingsVisible, setSettingsVisible] = useState(false)
  const [load, setLoad] = useState(false)
  const fetchFonts = () => {
    return Font.loadAsync({
      'sf-black': require('./assets/SFCompactRounded-Black.otf'),
      'sf-medium': require('./assets/SFCompactRounded-Medium.otf'),
      'sf-bold': require('./assets/SFCompactRounded-Bold.otf'),
    })
    }

    if(!load)
    {
      return(
        <AppLoading
          startAsync = {fetchFonts}
          onFinish = {() => setLoad(true)}
          onError = {() => {}}
        />
      );
    }

  return (
    <View style={styles.container}>
      <View style = {{justifyContent : 'space-between', flexDirection : 'row', alignItems :'center', marginTop : 50}}>
        <Text style = {[styles.header]}>SMoney</Text>
        <Icon onTouchEnd = {() => {setSettingsVisible(true)}} name = 'settings' style = {{marginRight : 20}} size = {25}/>
      </View>
        <Expenses/>

        <Settings
          modalVisible = {settingsVisible}
          setModalVisible = {setSettingsVisible}
        />
    </View>
  );
}

function Expenses(props)
{
  let date = new Date()
  let month = date.getMonth()

  const [expenseVisible, setExpenseVisible] = useState(false)
  const [balanceVisible, setBalanceVisible] = useState(false)
  const [changeVisible, setChangeVisible] = useState(false)
  const [startVisible, setStartVisible] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedMonth, setSelectedMonth] = useState(month)
  const [spentSelMonth, setSpentSelMonth] = useState(0)

  const [update, setUpdate] = useState(true)
  const [balance, setBalance] = useState(0)
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
  const [months, setMonths] = useState([
    {id: 0, category: 'J', sum: 0, color : '#99dfff'},
    {id: 1, category: 'F', sum: 0, color : '#99dfff'},
    {id: 2, category: 'M', sum: 0, color : '#99dfff'},
    {id: 3, category: 'A', sum: 0, color : '#99dfff'},
    {id: 4, category: 'M', sum: 0, color : '#99dfff'},
    {id: 5, category: 'J', sum: 0, color : '#99dfff'},
    {id: 6, category: 'J', sum: 0, color : '#99dfff'},
    {id: 7, category: 'A', sum: 0, color : '#99dfff'},
    {id: 8, category: 'S', sum: 0, color : '#99dfff'},
    {id: 9, category: 'O', sum: 0, color : '#99dfff'},
    {id: 10, category: 'N', sum: 0, color : '#99dfff'},
    {id: 11, category: 'D', sum: 0, color : '#99dfff'},
  ])

  function getMonthName(n)
  {
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    return month[n]
  }

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
        setSpentSelMonth(total() - balance)
      }
      else {}
    }
    catch(e) {
    }
  }

  const storeMonthData = async () => {
    try 
    {
      await AsyncStorage.setItem(getMonthName(month), (total() - balance).toString())
    } 
    catch (e) {
      alert(e)
    }
  }

  const getMonthData = async (id) => {
    try {
      const value = await AsyncStorage.getItem(getMonthName(id))
      if(value !== null) {
        months.forEach(element => {
          if(element.id == id)
          {
            element.sum = 0
            element.sum += parseInt(value)
          }
        })
      }
      else {
      }
    }
    catch(e) {
    }
  }

  function setMonthData(id)
  {
    months.forEach(element => {
      if(element.id == id)
      {
        element.sum = 0
        element.sum += (total() - balance)
      }
    })
  }

  function getYearSpendings()
  {
    months.forEach(elem => {
      getMonthData(elem.id)
    })
    let total = 0
    months.forEach(element => {
      total += parseInt(element.sum)
    })
    
    return total
  }

  const storeData = async (_category, _sum) => {
    try 
    {
      await AsyncStorage.setItem(_category, _sum)
    } catch (e) {
      alert(e)
    }
  }

  const setSetup = async () => {
    try 
    {
      await AsyncStorage.setItem('setup', 'true')
    } catch (e) {
      alert(e)
    }
  }

  const getSetup = async () => {
    try {
      const value = await AsyncStorage.getItem('setup')
      if(value == null) {
        setStartVisible(true)
        setSetup()
      }
      else {}
    }
    catch(e) {
    }
  }

  
  useEffect(() => {
    getSetup()
    data.forEach(element => {
      getData(element)
    })
    getBalance()
    months.forEach(element => {
      getMonthData(element.id)
    })

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

  function changeCategory(_category, _sum, _option)
  {
    data.forEach(element => {
      if(element.category == _category)
      {
        if(_option == 'Set')
        {
          storeData('balance', (parseInt(balance) + parseInt(element.sum) - parseInt(_sum)).toString())
          setBalance(parseInt(balance) + parseInt(element.sum) - parseInt(_sum))
          element.sum = 0
          element.sum += parseInt(_sum)
        }
        if(_option == 'Plus')
        {
          storeData('balance', (parseInt(balance) - parseInt(_sum)).toString())
          setBalance(parseInt(balance) - parseInt(_sum))
          element.sum += parseInt(_sum)
        }
        if(_option == 'Minus')
        {
          storeData('balance', (parseInt(balance) + parseInt(_sum)).toString())
          setBalance(parseInt(balance) + parseInt(_sum))
          element.sum -= parseInt(_sum)
        }
        storeData(_category, (element.sum).toString())
        storeMonthData()
        setMonthData(month)
      }
    });

  }

  function getSpent(_category)
  {
    let spent = 0
    data.forEach(element => {
      if(element.category == _category)
      {
        spent = element.sum
      }
    });
    return spent
  }

  function setSelectedSpent(i)
  {
    months.forEach(elem => {
      if(elem.id == i)
      {
        setSpentSelMonth(elem.sum)
        return;
      }
    })
  }

  return(
    <View style = {styles.expView}>
      <View onTouchEnd = {() => {setBalanceVisible(true)}}
       style = {{
         flexDirection : 'row', 
         justifyContent : 'space-between', 
         width : '110%',
         backgroundColor : 'white',
         elevation: 5,
         marginBottom: 10,
         alignItems: 'center',
         borderRadius: 13
         }}>
        <Text style = {[styles.balance, {}]}>Balance:</Text>
        <Text style = {styles.balance}>{balance}</Text>
      </View>

      <Months
        expenses = {months} 
        balance = {getYearSpendings()} 
        changeColumn = {(x) => {setSelectedCategory(x); setChangeVisible(true)}}
        width = {25}
        month = {getMonthName(selectedMonth)}
        spent = {spentSelMonth}
        selectedMonth = {selectedMonth}
        onPress = {(id) => {setSelectedMonth(id); setSelectedSpent(id)}}
        />
        
      <Columns 
        expenses = {data.filter(elem => elem.sum > 0)} 
        balance = {total() - balance} 
        changeColumn = {(x) => {setSelectedCategory(x); setChangeVisible(true)}}
        width = {75}
        />

      <TouchableOpacity style = {styles.button} onPress = {() => {setExpenseVisible(true)}}>
        <Text style = {{fontSize : 20, color : 'white', fontFamily: 'sf-medium'}}> Add new expense</Text>
      </TouchableOpacity>

      <NewExpense 
        modalVisible = {expenseVisible} 
        setModalVisible = {setExpenseVisible} 
        balance = {balance} 
        storeData = {(x, y) => {storeData('balance', (balance - parseInt(y)).toString()); changeBalance(x, y); storeMonthData(); setMonthData(month)}}/>
      
      <NewBalance 
        modalVisible = {balanceVisible} 
        setModalVisible = {setBalanceVisible} balance = {balance} 
        changeBalance = {(x) => {if (parseInt(balance) + parseInt(x) >= 0){ storeData('balance', (balance + parseInt(x)).toString()); setBalance(parseInt(balance) + parseInt(x))}}}
        />

        <ChangeColumn
          modalVisible = {changeVisible}
          setModalVisible = {setChangeVisible}
          category = {selectedCategory}
          spent = {getSpent(selectedCategory)}
          balance = {balance}
          setCategory = {(x, y) => {changeCategory(selectedCategory, x, y)}}
        />

        <SetUp
          modalVisible = {startVisible}
          setModalVisible = {setStartVisible}
          setBalance = {(x)=>{setBalance(x); storeData('balance', x.toString())}}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width : '100%',
    maxWidth: 400,
    height : '100%'
  },
  header:{
    //marginTop : 50,
    marginLeft: 30,
    fontSize: 40, 
    // fontWeight : 'bold',
    fontFamily: 'sf-bold'
  },
  balance : {
    fontSize : 35,
    marginLeft : 10,
    marginRight : 10,
    fontFamily: 'sf-medium'
    },
  expView : {
    marginTop : 30,
    width : '80%',
    height : '100%',
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
