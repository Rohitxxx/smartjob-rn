import { StyleSheet, Text, View, Pressable, Button } from 'react-native'
import React from 'react'

const CustomButtom = ({ title, color, bgColor, onPress }) => {
    return (
        <View style={{ borderRadius: 25, overflow: 'hidden' }}>
            <Pressable android_ripple={{ color: '#ccc' }} style={{ backgroundColor: bgColor, padding: 9, }} onPress={onPress}>
                <Text style={{ color: color, textAlign: 'center', fontSize: 20 }}>{title}</Text>
            </Pressable>
        </View>
    )
}

export default CustomButtom

const styles = StyleSheet.create({})