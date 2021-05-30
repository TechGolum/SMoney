import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

    // <Expense color = "#99ffc2" sum = "200" category = "Food"/>

export default function ExpensesNumbers(props)
{

    const renderItem = ({item}) => (
        <Expense color = {item.color} sum = {item.sum} category = {item.category}/>
    )

    return(
        <View
        style = {styles.sview}>
            <FlatList
                data = {props.expenses}
                renderItem = {renderItem}
                keyExtractor = {item => item.id}
                showsVerticalScrollIndicator = {false}
            />
        </View>
    )
}

function Expense(props)
{
    return (
        <View style = {styles.expview}>
            <View style = {{flexDirection : 'row', alignItems : 'center', justifyContent : 'space-between'}}>
                <View style = {{width : 30, height : 30, borderRadius : 20, backgroundColor : props.color}}/>
                <Text style = {{fontSize : 28, textAlign : 'left'}}>   {props.category}</Text>
            </View>
            <Text style = {{fontSize : 28, fontWeight : '400'}}>{props.sum} $</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    sview : {
        marginTop : 30,
        height : '40%',
        borderRadius : 10
    },
    expview : {
        flexDirection : 'row',
        width : '100%',
        justifyContent : 'space-between',
        alignItems : 'center'
    }

})