import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, SafeAreaView } from 'react-native';
import Month from './Month'
import { LinearGradient } from 'expo-linear-gradient';

export default function Months(props)
{
    const renderItem = ({item}) => (
        <Month
            color = {item.color} 
            height = {item.sum / props.balance * 100 + '%'} 
            category = {item.category} 
            sum = {item.sum}
            onTouchEnd = {() => {props.onPress(item.id)}}
            width = {props.width}
            selected = {item.id == props.selectedMonth}
            />
    )

    return(
        <View
            style = {styles.sview}>
                <Text style = {styles.header}>{props.month}</Text>
                <Text style = {styles.sum}>{props.spent}</Text>
                <SafeAreaView style = {{width : '95%', borderRadius : 20}}>
                    <FlatList
                        renderItem = {renderItem}
                        data = {props.expenses}
                        keyExtractor = {item => item.id}
                        horizontal = {true}
                        showsHorizontalScrollIndicator = {false}
                    />
                </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    sview : {
        width : '110%',
        height : '30%',
        backgroundColor : 'white',
        borderRadius : 20,
        alignItems : 'center',
        shadowColor : 'grey',
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation : 5,
    },
    header: {
        alignSelf:'flex-start',
        marginLeft: 20,
        fontSize: 30,
        fontFamily: 'sf-bold'
    },
    sum: {
        alignSelf:'flex-start',
        marginLeft: 20,
        fontSize: 20,
        fontFamily: 'sf-medium'
    }
})