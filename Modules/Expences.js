import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

export default function ExpensesNumbers()
{
    return(
        <ScrollView style = {styles.sview}>
            <Expense color = "#99dfff" sum = "250" category = "Sport"/>
            <View style = {{height : 12, width : 10}}/>
            <Expense color = "#ffb699" sum = "100" category = "Shoping"/>
            <View style = {{height : 12, width : 10}}/>
            <Expense color = "#99ffc2" sum = "200" category = "Food"/>
        </ScrollView>
    )
}

function Expense(props)
{
    return (
        <View style = {styles.expview}>
            <View style = {{width : 30, height : 30, borderRadius : 20, backgroundColor : props.color}}/>
            <Text style = {{fontSize : 28}}>{props.category}</Text>
            <Text style = {{fontSize : 28, fontWeight : '400'}}>{props.sum} $</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    sview : {
        marginTop : 30,
    },
    expview : {
        flexDirection : 'row',
        width : 250,
        justifyContent : 'space-between',
        alignItems : 'center'
    }

})