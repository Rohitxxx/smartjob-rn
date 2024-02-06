import { Image, StyleSheet, Text, View, Pressable, ScrollView, Button, ToastAndroid } from 'react-native'
import React, { useState, useRef, useEffect, useContext } from 'react'
import Ionicon from 'react-native-vector-icons/Ionicons'
import Header from '../../components/Header'
import Card from '../../components/Card'
import ImagePicker, { openPicker } from 'react-native-image-crop-picker';
import RBSheet from "react-native-raw-bottom-sheet";
import DocumentPicker, {
    DirectoryPickerResponse,
    DocumentPickerResponse,
    isInProgress,
    types,
} from 'react-native-document-picker'
import Colors from '../../constants/Colors'
import { UserContext } from '../../Context/Contex'
import AxiosObj from '../../AxiosObj/AxiosObj'

const Resume = ({ navigation }) => {
    const [resumeResult, setResumeResult] = useState()
    const [image, setImage] = useState('');
    const refRBSheet = useRef();
    const { user } = useContext(UserContext);
    const [freshUser, setFreshUser] = useState(user); // this data will be fetch from server
    useEffect(() => {
        console.log('resume result', JSON.stringify(resumeResult, null, 2))
    }, [resumeResult])
    const getUserFromServer = async () => {
        try {
            const response = await AxiosObj.get('get_candidate_detail.php', { params: { 'user_id': user.user_id } })
            if (response.data.error) {
                console.log('failed to fetch user from server')
            } else {
                console.log('getuserFromServer', response.data.data);
                console.log('image url', 'https://smartjob.info/uploaded/' + freshUser.user_id + '/' + freshUser.image)
                setFreshUser(response.data.data)
            }
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => { getUserFromServer() }, [])
    const uploadResumeToServer = async (path) => {
        try {

            let formdata = new FormData();
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                }
            };
            formdata.append('resume', {
                uri: path.uri,
                name: path.name,
                type: path.type
            });
            formdata.append('user_id', user.user_id);
            const response = await AxiosObj.post('update_resume.php', formdata, config);
            if (response.data.error) {
                console.log('error from server', response.data);
                ToastAndroid.show('Something went wrong', ToastAndroid.LONG);
            } else {
                ToastAndroid.show('Resume Updated successfully', ToastAndroid.LONG);
            }
        } catch (e) {
            ToastAndroid.show('Something went wrong' + e, ToastAndroid.LONG);
        }
    }
    const uploadImgToServer = async (path) => {
        try {
            let formdata = new FormData();
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                }
            };
            formdata.append('img', {
                uri: path,
                name: user.user_id + '.jpg',
                type: 'image/jpeg'
            });
            formdata.append('user_id', user.user_id);

            console.log(user.user_id)
            console.log(image)
            console.log(formdata)
            const response = await AxiosObj.post('update_profile_img.php', formdata, config);
            if (response.data.error) {
                console.log('error from server', response.data);
                ToastAndroid.show('Something went wrong', ToastAndroid.CENTER);
            } else {
                ToastAndroid.show('Image Updated successfully', ToastAndroid.CENTER);
            }
        } catch (e) {
            ToastAndroid.show('Something went wrong', ToastAndroid.CENTER);
        }
    }
    const selectResume = async () => {
        try {
            const pickerResult = await DocumentPicker.pickSingle({
                presentationStyle: 'fullScreen',
                copyTo: 'cachesDirectory',
                type: [types.pdf, types.doc, types.docx]
            })
            setResumeResult([pickerResult])
            uploadResumeToServer(pickerResult);
        } catch (e) {
            handleError(e)
        }
    }
    const handleError = (err) => {
        if (DocumentPicker.isCancel(err)) {
            console.warn('cancelled')
            // User cancelled the picker, exit any dialogs or menus and move on
        } else if (isInProgress(err)) {
            console.warn('multiple pickers were opened, only the last will be considered')
        } else {
            throw err
        }
    }

    async function imagePicker() {
        try {
            const result = await ImagePicker.openPicker({ mediaType: 'photo', cropping: true })
            const path = result.path
            setImage(path)
            uploadImgToServer(path)
            console.log(path)
        } catch (e) {
            console.log(e)
        }
    }
    async function openCamera() {
        try {
            const result = await ImagePicker.openCamera({ mediaType: 'photo', cropping: true })
            const path = result.path
            setImage(path)
            uploadImgToServer(path)
            console.log(path)
        } catch (e) {
            console.log(e)
        }

    }
    let fakeurl = require('../../assets/user.png');

    const ResumeElementCard = ({ children, title, onPress }) => {
        return (
            <Card>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 18, color: 'blue' }}>{title}</Text>
                    <Pressable style={{ flexDirection: 'row' }} android_ripple={{ color: '#ccc' }} onPress={onPress}>
                        <Ionicon name='create-outline' color='blue' size={20} />
                        <Text style={{ color: 'blue' }}>Edit</Text>
                    </Pressable>
                </View>
                {children}
            </Card>
        )
    }
    return (
        <>
            <Header navigation={navigation} component={<Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>My Resume</Text>} />
            <ScrollView style={styles.nameContainer}>
                <View style={styles.resumeHeader}>
                    <Pressable style={{ flexDirection: 'row', justifyContent: 'flex-end' }} onPress={() => refRBSheet.current.open()}>
                        <Image source=
                            {image ? { uri: image } :
                                (freshUser.image == '' ? fakeurl :
                                    { uri: 'https://smartjob.info/uploaded/' + freshUser.user_id + '/' + freshUser.image })}
                            resizeMode='contain' style={{ height: 100, width: 100, borderRadius: 60 }} />
                        <Ionicon name='create-outline' color='blue' size={25} style={styles.editResumeButton} />
                    </Pressable>
                    <View style={styles.nameContainer}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>{freshUser.name}</Text>
                        <Text>{freshUser.address}</Text>
                        <Text>{freshUser.contact_no}</Text>
                        <Text>{freshUser.email}</Text>
                    </View>
                    <Pressable style={{ flexDirection: 'row' }} android_ripple={{ color: '#ccc' }} onPress={() => {
                        navigation.navigate('createResume', { 'freshUser': freshUser, "step": 1 })
                    }}>
                        <Ionicon name='create-outline' color='blue' size={20} />
                        <Text style={{ color: 'blue' }}>Edit</Text>
                    </Pressable>
                </View>
                <Card>
                    <View>
                        <Text style={{ fontSize: 18, color: 'blue' }}>Upload Resume</Text>
                    </View>
                    <Pressable android_ripple={{ color: '#ccc' }} style={styles.resumeCreate} onPress={selectResume}>
                        <Ionicon name='add-circle' size={50} />
                        <Text>Re-upload your resume</Text>
                    </Pressable>
                </Card>
                <Text style={{ textAlign: 'center' }}>Or</Text>
                <Card>
                    <View>
                        <Text style={{ fontSize: 18, color: 'blue' }}>Create Resume</Text>
                    </View>
                    <Pressable android_ripple={{ color: '#ccc' }} style={styles.resumeCreate} onPress={() => navigation.navigate('createResume', { 'freshUser': freshUser, 'step': 1 })}>
                        <Ionicon name='document-text-outline' size={40} />
                        <Text>Create your resume</Text>
                    </Pressable>
                </Card>
                <ResumeElementCard title={'Work Experience'} onPress={() => navigation.navigate('createResume', { 'freshUser': freshUser, 'step': 2 })}>
                    <Text>{freshUser.current_company}</Text>
                    <Text>{freshUser.current_salary}</Text>
                </ResumeElementCard>
                <ResumeElementCard title={'Education'} onPress={() => navigation.navigate('createResume', { 'freshUser': freshUser, 'step': 3 })}>
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text>{freshUser.ug_clg_name == '' ? 'not set' : freshUser.ug_clg_name}</Text>
                            <Text></Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text>college</Text>
                            <Text>{freshUser.ug_course == '' ? 'not set' : freshUser.ug_course}</Text>
                        </View>
                        <Text>Score: {freshUser.ug_percentage == '' ? 'not set' : freshUser.ug_percentage}</Text>
                    </View>
                </ResumeElementCard>
                <ResumeElementCard title={'Skills'} onPress={() => navigation.navigate('createResume', { 'freshUser': freshUser, 'step': 1 })}>
                    <Text>
                        Not set
                        {/* Java, Android, React, {'\n'}
                        React Native */}
                    </Text>
                </ResumeElementCard>
                {/* <ResumeElementCard title={'Achievements'}>
                    <Text style={{ opacity: 0.5 }}>Eg. Awarded Best Employee of the year 2022 at TCS
                    </Text>
                    <Text></Text>
                </ResumeElementCard> */}
                <RBSheet
                    ref={refRBSheet}
                    closeOnDragDown={true}
                    closeOnPressMask={true}
                    customStyles={{
                        wrapper: {
                            backgroundColor: "transparent",
                        },
                        draggableIcon: {
                            backgroundColor: "#fff"
                        },
                        container: {
                            backgroundColor: Colors.primary700
                        }
                    }}
                >
                    <View style={{ margin: 25 }}>
                        <Pressable style={{ flexDirection: 'row', marginBottom: 13 }} onPress={openCamera} >
                            <Ionicon name='camera' size={23} color='#fff' />
                            <Text style={{ fontSize: 20, color: 'white', marginLeft: 15 }} >Take Photo</Text>
                        </Pressable>
                        <Pressable style={{ flexDirection: 'row' }} onPress={imagePicker} >
                            <Ionicon name='folder' size={23} color='#fff' />
                            <Text style={{ fontSize: 20, color: 'white', marginLeft: 15 }}>Choose Image</Text>
                        </Pressable>
                    </View>
                </RBSheet>
            </ScrollView>
        </>
    )
}

export default Resume

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        margin: 5
    },

    resumeHeader: {
        marginVertical: 5,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-evenly'
    },
    resumeCreate: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    editResumeButton: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 3
    }
})