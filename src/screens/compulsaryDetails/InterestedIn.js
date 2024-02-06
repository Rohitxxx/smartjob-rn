import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, Modal, ToastAndroid, } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Domain from '../../Models/Domain'
import Colors from '../../constants/Colors'
import CustomButton from '../../components/CustomButtom';
import AxiosObj from '../../AxiosObj/AxiosObj';
import { UserContext } from '../../Context/Contex';

const InterestedIn = ({ navigation, route }) => {
    const [selectedDomain, setSelectedDomain] = useState(0)
    const { user } = useContext(UserContext);
    const saveDataToServer = async () => {
        try {
            let formdata = new FormData()

            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                }
            };
            formdata.append('user_id', user.user_id)
            formdata.append('name', route.params.Name)
            formdata.append('designation', route.params.Designation)
            formdata.append('current_company', route.params.CurrentCompany)
            formdata.append('gender', route.params.gender)
            formdata.append('dob', route.params.selectedDate)
            formdata.append('domain', selectedDomain)
            console.log(formdata);
            // console.log('data from page ', route.params.selectedDate)
            const response = await AxiosObj.post("set_necessary_details2.php", formdata, config)
            if (response.data.error) {
                ToastAndroid.show(('something went wrong'), ToastAndroid.CENTER);
                console.log(response.data)
            } else {
                console.log('data saved');

                navigation.reset({
                    index: 0,
                    routes: [{ name: 'homeNavigation' }]
                });
                navigation.replace('homeNavigation');
                // ToastAndroid.show(('data set'), ToastAndroid.CENTER);
            }
        } catch (e) {
            ToastAndroid.show(('something went wrong  ' + e), ToastAndroid.CENTER);
        }
    }
    // useEffect(() => { saveDataToServer(), [] })
    return (
        <View style={{ flex: 1 }}>
            <FlatList data={Domain}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                renderItem={(itemdata) => {
                    return (
                        <>
                            <TouchableOpacity style={[style.domainContainer, selectedDomain == itemdata.item.id ? style.selectedDomainStyle : style.unselectedDomainStyle]} onPress={() => setSelectedDomain(itemdata.item.id)} >
                                <View ><Image source={itemdata.item.bigImg} style={{ width: 100, height: 100, alignSelf: 'center' }} /></View>
                                <View><Text style={{ textAlign: 'center', fontSize: 20 }}>{itemdata.item.domain}</Text></View>
                                <View><Text style={{ textAlign: 'center', }}>{itemdata.item.description}</Text></View>
                            </TouchableOpacity>
                        </>
                    )
                }}
                keyExtractor={(item) => item.id}
            />
            {selectedDomain > 0 ? <View style={{ margin: 10 }}><CustomButton title={'Submit'} color='white' bgColor={Colors.primary700} onPress={saveDataToServer} /></View> : null}
        </View>
    )
}

export default InterestedIn

const style = StyleSheet.create({
    domainContainer: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        elevation: 6,
        margin: 4,
        backgroundColor: 'white',
        marginHorizontal: 5,
        paddingVertical: 4,
        borderRadius: 12,
        padding: 5,
        borderWidth: 2,
    },
    selectedDomainStyle: {
        borderColor: 'red'
    },
    unselectedDomainStyle: {
        borderColor: 'white'
    }
})

