import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Card = ({ children }) => {
    return (
        <View style={{ marginHorizontal: 15 }}>
            <View style={styles.listContainer}>
                {children}
            </View>
        </View>
    )
}

export default Card

const styles = StyleSheet.create({
    listContainer: {
        marginVertical: 5,
        padding: 12,
        elevation: 2,
        borderRadius: 4,
        backgroundColor: 'white'
    }
})