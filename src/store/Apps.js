import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { Provider } from 'react-redux'
import Counter from './Counter'
import { store } from './store'
const Apps = () => {
    return (
        <View>
            <Provider store={store}>
                <Counter />
            </Provider>
        </View>
    )
}

export default Apps

const styles = StyleSheet.create({})