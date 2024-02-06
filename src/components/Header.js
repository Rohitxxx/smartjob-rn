import { StyleSheet, Text, View, StatusBar, Pressable, Image, Linking } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors'
import { IconButton } from 'react-native-paper'
const Header = ({ component, navigation }) => {

    const msg = '✔ smartjob app to apply for unlimited jobs for 💲 free , AppLink 👉 :https://play.google.com/store/apps/details?id=info.smartjob';
    const favJobHandler = () => {
        navigation.navigate('favJobs');
    }
    const notificationHandler = () => {
        navigation.navigate('notifications');
    }
    return (
        <>
            <View style={styles.container}>
                <View style={{ flex: 1 }}>
                    {component}
                </View>
                <View style={styles.shareContainer}>
                    <View style={styles.whasp}>
                        <Pressable
                            android_ripple={{ color: '#ccc', }}
                            style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, }}
                            onPress={() => Linking.openURL('whatsapp://send?text=' + msg)}>
                            <Image source={require('../assets/whatsapp.png')} style={{ height: 22, width: 22 }} />
                            <Text style={{ fontSize: 16, margin: 3, color: 'white' }}>Invite</Text>
                        </Pressable>
                    </View>
                    <View style={styles.iconStyle}>
                        <IconButton
                            icon={'heart'}
                            iconColor='white'
                            size={20}
                            onPress={favJobHandler}
                        />
                    </View>
                    <View style={styles.iconStyle}>
                        <IconButton
                            icon={'bell'}
                            iconColor='white'
                            size={20}
                            onPress={notificationHandler}
                        />
                    </View>
                </View>
            </View>
        </>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        // paddingVertical: 8,
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: StatusBar.currentHeight,
        backgroundColor: Colors.primary700,
        elevation: 8
    },
    shareContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignContent: 'center'
    },
    whasp: {
        flex: 1,
        marginHorizontal: 7,
        marginVertical: 9,
        backgroundColor: Colors.primary600,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
    },
    // iconStyle: { alignItems: 'center', margin: 4, justifyContent: 'center' }
})