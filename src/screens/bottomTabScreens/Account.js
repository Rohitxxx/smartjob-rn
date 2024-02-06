import { Pressable, StyleSheet, Text, View, ScrollView, Linking, } from 'react-native'
import React, { useContext } from 'react'
import Header from '../../components/Header'
import Ionicon from 'react-native-vector-icons/Ionicons'
import Colors from '../../constants/Colors'
import { UserContext } from '../../Context/Contex'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Account = ({ navigation }) => {
    const { removeUser, setUser } = useContext(UserContext)
    const SettingOption = ({ icon, title, label, onPress }) => {
        return (
            <Pressable onPress={onPress} android_ripple={{ color: '#ccc' }} style={{ flexDirection: 'row', padding: 12, alignItems: 'center', }}>
                <View style={{ flexDirection: 'row', flex: 1, alignSelf: 'center' }}>
                    <Ionicon name={icon} size={20} />
                    <Text style={{ fontSize: 18, marginLeft: 8 }}>{title}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    {label != undefined ? <Text style={{ backgroundColor: Colors.primary700, paddingHorizontal: 3, color: 'white', borderRadius: 10 }}>{label}</Text> : null}
                    <Ionicon name='chevron-forward-outline' size={20} />
                </View>
            </Pressable>
        )
    }

    const getVersion = () => {
        const pkg = require('../../../package.json');
        return pkg.version;
    }

    const removeUserFromLocal = async () => {
        try {
            await AsyncStorage.removeItem('user');
            setUser(null);
            navigation.replace('splashScreen')
        } catch (e) {
            console.log('error while logouting', e)
        }
    }
    return (
        <>
            <Header navigation={navigation} component={<Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>My Account</Text>} />
            <ScrollView style={{ flex: 1, marginHorizontal: 15 }} showsVerticalScrollIndicator={false}>
                <View style={styles.listContainer}>
                    <Text style={{ fontSize: 18, color: 'blue', }}>Profile Info</Text>
                    <View >
                        <SettingOption title={'My Profile'} icon='person' label={'new'} onPress={() => { navigation.navigate('resume') }} />
                        <SettingOption title={'My Resume'} icon='document-text' onPress={() => { navigation.navigate('resume') }} />
                    </View>
                </View>
                <View style={styles.listContainer}>
                    <Text style={{ fontSize: 18, color: 'blue', }}>Job Box</Text>
                    <View >
                        <SettingOption title={'My Favourite Jobs'} icon='briefcase' label={'new'} onPress={() => { navigation.navigate('favJobs') }} />
                    </View>
                </View>
                <View style={styles.listContainer}>
                    <Text style={{ fontSize: 18, color: 'blue', }}>Tips & Support</Text>
                    <View >
                        <SettingOption title={'Help and Support'} icon='information-circle' onPress={() => Linking.openURL('mailto:info@smartjob.info')} />
                        <SettingOption title={'Privacy Policy'} icon='briefcase' onPress={() => Linking.openURL('https://smartjob.info/app/privacy_policy')} />
                        <SettingOption title={'Terms & Conditions'} icon='lock-closed' onPress={() => Linking.openURL('https://smartjob.info/app/term_and_condition')} />
                    </View>
                </View>
                <View style={styles.listContainer}>
                    <Text style={{ fontSize: 18, color: 'blue', }}>Training</Text>
                    <View >
                        <SettingOption title={'Training '} icon='book' label={'new'} onPress={() => { Linking.openURL('https://accoet.com') }} />
                    </View>
                </View>
                <View style={styles.listContainer}>
                    <Text style={{ fontSize: 18, color: 'blue', }}>Logout</Text>
                    <View >
                        <SettingOption title={'Logout'} icon='log-out' onPress={removeUserFromLocal} />
                    </View>
                </View>
                <Text style={{ textAlign: 'center', margin: 15, fontSize: 22 }}>{getVersion()}</Text>
            </ScrollView>
        </>
    )
}

export default Account

const styles = StyleSheet.create({
    listContainer: {
        marginVertical: 5,
        padding: 12,
        elevation: 2,
        borderRadius: 4,
        backgroundColor: 'white'
    }
})