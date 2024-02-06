import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addition, getLocalUser, setLocalUser, substraction } from './action'

const Counter = () => {
    const data = useSelector((state) => state.counter)
    const userData = useSelector((state) => state.user)
    const dispatch = useDispatch();

    return (
        <View>
            <Button title='addition' onPress={() => dispatch(addition())} />
            <Text>{data}</Text>
            <Text>{JSON.stringify(userData)}</Text>
            <Button title='substraction' onPress={() => dispatch(substraction())} />
            <Button title='update' onPress={() => dispatch(setLocalUser())} />
            <Button title='get' onPress={() => dispatch(getLocalUser())} />

        </View>
    )
}

export default Counter

const styles = StyleSheet.create({})