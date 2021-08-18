import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, SafeAreaView } from 'react-native';
import Column from './Column'
import { LinearGradient } from 'expo-linear-gradient';


// height should be from 0.3 to 1
export default function Columns(props)
{
    const renderItem = ({item}) => (
        <Column 
            color = {item.color} 
            height = {item.sum / props.balance * 100 + '%'} 
            category = {item.category} 
            sum = {item.sum}
            onTouchEnd = {() => {props.changeColumn(item.category)}}
            width = {props.width}
            />
    )

    return(
        <View
            style = {styles.sview}>
            <SafeAreaView style = {{width : '95%', height : '100%', borderRadius : 20}}>
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
        height : '20%',
        backgroundColor : 'white',
        borderRadius : 20,
        alignItems : 'center',
        shadowColor : 'grey',
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation : 5,
        marginTop: 10
    }
})