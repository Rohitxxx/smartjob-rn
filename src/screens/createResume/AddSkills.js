import { FlatList, Image, Pressable, StatusBar, StyleSheet, Text, TouchableOpacity, View, Modal, } from 'react-native'
import React, { useEffect, useState } from 'react'
import AxiosObj from '../../AxiosObj/AxiosObj'
import Domain from '../../Models/Domain'
import Colors from '../../constants/Colors'
import Ionicon from 'react-native-vector-icons/Ionicons';
import { ActivityIndicator, Button, Chip } from 'react-native-paper'

// this is just a dummy... fetching has been done ... only external library have to include for multiple select to add skills
const AddSkills = ({ navigation }) => {
    // const [modalVisible, setModalVisible] = useState(false)
    const [selectedDomain, setSelectedDomain] = useState()
    const fetchSubDomains = async (id) => {
        let formdata = new FormData()
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Accept: "application/json",
            }
        };
        formdata.append('id', id)
        try {
            const result = await AxiosObj.post('sub_domains_by_domain.php', formdata, config)
            if (result.data.error == false) {
                console.log('new', result.data.data);
                setAllSubDomains(result.data.data)
            } else {
                console.log('new', result.data)
            }
            console.log('server response', result.data);
        } catch (e) {
            console.log(e)
        }
    }


    const showModal = (item) => {
        setModalVisible(true)
        setSelectedDomain(item)
        fetchSubDomains(item.id);
        console.log('show modal', item.id);
        console.log('show modal', item);
    }


    return (
        <View style={{ flex: 1 }}>
            <FlatList data={Domain}
                showsVerticalScrollIndicator={false}
                renderItem={(itemdata) => {
                    return (
                        <>
                            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', elevation: 6, margin: 4, backgroundColor: 'white', marginHorizontal: 5, paddingVertical: 4 }} onPress={showModal.bind(this, itemdata.item)} >
                                <View style={{ flex: 1 }}><Image source={itemdata.item.smallImg} style={{ width: 30, height: 30, tintColor: Colors.primary700, alignSelf: 'center' }} /></View>
                                <View style={{ flex: 9 }}>
                                    <Text style={{ fontSize: 20, color: Colors.primary700 }}>{itemdata.item.domain}</Text>
                                    <Text style={{ color: Colors.primary700 }}>{itemdata.item.description}</Text>
                                </View>
                                <View style={{ flex: 1 }}><Ionicon name='chevron-forward-circle-outline' size={22} color={Colors.primary700} /></View>
                            </TouchableOpacity>
                            {modalVisible ? <Modal style={{ justifyContent: 'center', alignItems: 'center', }} visible={modalVisible} animationType="slide" transparent={true} >
                                <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', backgroundColor: 'yellow' }}>
                                    <Text>Years of experience in {selectedDomain.domain}</Text>
                                    {allSubDomains != null ? <FlatList
                                        data={allSubDomains}
                                        renderItem={(itemdata) => {
                                            return (
                                                <Chip style={selectedChips.has(itemdata.item) ? styles.selectedChipStyle : styles.unselectedChipStyle} selectedColor={'white'} selected={selectedChips.has(itemdata.item.name)} onPress={chipSelectionHandler.bind(this, itemdata.item)}>{itemdata.item.name}</Chip>
                                            )
                                        }} keyExtractor={(item) => item.sub_domain_id} /> : <ActivityIndicator />}
                                    <Button onPress={() => { setModalVisible(false); setAllSubDomains(null) }}>submit</Button>
                                </View>
                            </Modal> : null}
                        </>
                    )
                }}
                keyExtractor={(item) => item.id}
            />
        </View>
    )
}

export default AddSkills

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 22,
        fontWeight: 'bold'
    },
    selectedChipStyle: {
        backgroundColor: Colors.primary700
    },
    unselectedChipStyle: {
        backgroundColor: 'skyblue'
    }

});
