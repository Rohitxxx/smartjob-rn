import { StyleSheet, Text, View, Pressable } from 'react-native'
import Ionicon from 'react-native-vector-icons/Ionicons'
import React from 'react'
import Colors from '../constants/Colors'

const FilterBox = ({ searchClick, filterClick, sortClick }) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginHorizontal: 6 }}>
            <View style={{ flex: 1 }} >
                <Pressable style={[styles.blueContainer, { flex: 1 }]} onPress={searchClick}>
                    <Ionicon name='search' size={22} color={Colors.primary700} />
                    <Text>Search...</Text>
                </Pressable>
            </View>
            <View >
                <Pressable style={[styles.blueContainer,]} onPress={filterClick}>
                    <Ionicon name='funnel-outline' size={22} color={Colors.primary700} />
                    <Text style={{ color: Colors.primary700 }}>Filter</Text>
                </Pressable>
            </View>
            <View >
                <Pressable style={[styles.blueContainer,]} onPress={sortClick}>
                    <Ionicon name='filter' size={22} color={Colors.primary700} />
                    <Text style={{ color: Colors.primary700 }}>Sort</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default FilterBox

const styles = StyleSheet.create({
    blueContainer: {
        flexDirection: 'row',
        borderColor: Colors.primary700,
        borderWidth: 1,
        alignItems: 'center',
        margin: 4,
        padding: 5,
        paddingHorizontal: 7,
        borderRadius: 5,
        backgroundColor: '#fff'
    }
})