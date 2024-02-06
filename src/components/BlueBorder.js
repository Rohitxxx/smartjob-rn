import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'
import Ionicon from 'react-native-vector-icons/Ionicons'

const BlueBorder = () => {
    return (
        <View>
            <Pressable>
                <Ionicon name='search' />
                <Text>Search...</Text>
            </Pressable>
        </View>
    )
}

export default BlueBorder

const styles = StyleSheet.create({})