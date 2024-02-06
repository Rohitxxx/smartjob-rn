import { Image, StyleSheet, Text, View, } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors'


const JobDetailComponent = ({ title, source, description }) => {
    return (
        <View style={{ marginVertical: 4, paddingBottom: 8, flex: 1, borderColor: 'transparent', borderBottomColor: '#cfd1d0', borderWidth: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={source} resizeMode={'contain'} style={{ height: 25, width: 25, marginRight: 8 }} />
                <Text style={{ fontWeight: 'bold', fontSize: 17, color: Colors.primary400 }}>{title}</Text>
            </View>
            <Text style={{ fontSize: 14, marginLeft: 12 }}>{description}</Text>
        </View>
    )
}

export default JobDetailComponent

const styles = StyleSheet.create({})