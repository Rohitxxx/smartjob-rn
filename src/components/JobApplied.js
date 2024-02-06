import { StyleSheet, Text, View, Image, Pressable, Share } from 'react-native'
import React from 'react'
import { Button, IconButton } from 'react-native-paper'
import Ionicon from 'react-native-vector-icons/Ionicons'
import CustomButtom from './CustomButtom'
import Colors from '../constants/Colors'
import Domain from '../Models/Domain'

const JobApplied = ({ navigation, data }) => {
    const goToDetailPage = () => navigation.navigate('jobDetails', { "job_id": data.job_id });
    const sendMsg = async () => await Share.share({
        title: 'App link',
        message: 'Download the app to apply for this job , AppLink :https://play.google.com/store/apps/details?id=info.smartjob',
        url: 'https://play.google.com/store/apps/details?id=info.smartjob'
    });

    return (
        <Pressable android_ripple={{ color: "#ccc" }} onPress={goToDetailPage} >
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '100%' }}>
                    <View style={{ flex: 2 }}><Image source={Domain.find((x) => x.id == data.domain).bigImg} resizeMode='contain' style={{ margin: 5, width: 60, height: 60 }} /></View>
                    <View style={{ flex: 6 }}>
                        <Text style={{ fontSize: 20, }}>{data.package}</Text>
                        <Text style={{ fontSize: 17, color: 'black', fontWeight: 'bold' }}>{data.title}</Text>
                        <Text>SHSPL</Text>
                    </View>
                    <View style={{ flex: 2 }}><IconButton
                        icon='chevron-right'
                        size={25}
                        iconColor='blue'
                        onPress={goToDetailPage}
                        style={{ borderRadius: 25, borderWidth: 2 }}
                    /></View>
                </View>

                <View style={{ flexDirection: 'row', width: '100%', }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', flex: 1 }}>
                        <View style={{ flex: 1 }}><Ionicon name='location' size={20} /></View>
                        <View style={{ flex: 6 }}><Text style={{ fontSize: 14 }}>{data.location}</Text></View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', flex: 1 }}>
                        <View style={{ flex: 1 }}><Ionicon name='business' size={20} /></View>
                        <View style={{ flex: 6 }}><Text style={{ fontSize: 14 }}>{data.name}</Text></View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 7 }}>
                    {/* <CustomButtom title={'Apply'} bgColor='green' /> */}
                    <Button onPress={goToDetailPage} style={{ backgroundColor: Colors.green, flex: 1, marginHorizontal: 4, }} labelStyle={{ fontSize: 16, }} textColor='white'>Details</Button>
                    <Button onPress={sendMsg} style={{ backgroundColor: 'skyblue', borderWidth: 2, flex: 1, marginHorizontal: 4 }} labelStyle={{ fontSize: 16 }} textColor='black'>Share</Button>
                </View>
            </View>
        </Pressable>
    )
}

export default JobApplied

const styles = StyleSheet.create({
    container: {
        // height: 180,
        // elevation: 2,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        marginVertical: 4,
        borderColor: '#ccc',
        borderWidth: 2,
        borderRadius: 5,
        backgroundColor: '#fff'
    }
})