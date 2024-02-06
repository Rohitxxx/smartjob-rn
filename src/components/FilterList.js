import { StyleSheet, Text, View, ScrollView, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import RadioGroup from 'react-native-radio-buttons-group';
import { Dropdown } from 'react-native-element-dropdown';
import Ionicon from 'react-native-vector-icons/Ionicons'
import AxiosObj from '../AxiosObj/AxiosObj';

const FilterList = ({ title, getCheck, getSelectedfilter }) => {

    const [stateData, setStateData] = useState([])
    const [cityData, setCityData] = useState([])
    const [selectedState, setSelectedState] = useState(null)
    const [selectedCity, setSelectedCity] = useState(null)
    let filteredData = { // initial filter
        'location': { "label": '', "value": '' },
        'salary': { "label": '', 'value': '', 'id': '', 'selected': null }
    }
    const radioButtonsData = [{
        id: '1', // acts as primary key, should be unique and non-empty string
        label: 'Upto 5,000',
        value: ' && package<5000',

    }, {
        id: '2',
        label: '5,000 - 10,000',
        value: ' && package>5000 && package<10000'
    }, {
        id: '3',
        label: '10,000 - 20,000',
        value: ' && package>10000 && package<20000'
    }, {
        id: '4',
        label: '20,000 - 30,000',
        value: ' && package>20000 && package<30000'
    }, {
        id: '5',
        label: '30,000 - 50,000',
        value: ' && package>30000 && package<50000'
    }, {
        id: '6',
        label: '50,000 - 70,000',
        value: ' && package>50000 && package<70000'
    },
    {
        id: '7',
        label: '70,000 - 1,00,000',
        value: ' && package>5000 && package<10000'
    },
    {
        id: '8',
        label: 'more than 1,00,000',
        value: ' && package>100000',
    }
    ]

    const [radioButtons, setRadioButtons] = useState(radioButtonsData)

    function onPressRadioButton(radioButtonsArray) {
        setRadioButtons(radioButtonsArray);
        filteredData.salary = radioButtons.find(item => item.selected == true)
        getSelectedfilter(filteredData)
    }
    const getStates = async () => {
        try {
            const resposne = await AxiosObj.get('get-all-states.php', { params: { 'name': selectedState?.name } })
            if (resposne.data.error)
                ToastAndroid.show('something went wrong', ToastAndroid.SHORT);
            else {
                if (resposne.data.data.length > 0) {
                    setStateData(resposne.data.data.map(item => { return ({ "label": item.name, "value": item.id }) }))
                }
            }

        } catch (e) {
            console.log(e)
        }
    }
    const getCities = async () => {
        try {
            const resposne = await AxiosObj.get('get-all-cities-statewise.php', { params: { 'id': selectedState.value, 'name': selectedCity?.name } })
            if (resposne.data.error)
                ToastAndroid.show('something went wrong', ToastAndroid.SHORT);
            else {
                if (resposne.data.data.length > 0) {
                    setCityData(resposne.data.data.map(item => { return ({ "label": item.city_name, "value": item.id }) }))
                }
            }
            console.log(resposne.data)

        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        (async () => {
            getStates();
        })()
    }, [])
    useEffect(() => {
        (async () => {
            getCities();
        })()
    },
        [selectedState])
    const prepareDataTosend = (val) => {
        if (radioButtons.find(item => item.selected == true) == undefined) {
            console.log('1')
            getSelectedfilter(" && location LIKE '%" + val + "%'")
        } else if (selectedCity == null) {

            console.log('2')
            getSelectedfilter(radioButtons.find(item => item.selected == true).value)
        }
        else {
            console.log('3')
            getSelectedfilter(radioButtons.find(item => item.selected == true).value + " && loction LIKE '%" + selectedCity.name + "%'")
        }

    }

    return (
        <ScrollView >
            <View>
                <Text style={{ fontWeight: 'bold' }}>Monthly Salary</Text>
                <RadioGroup
                    radioButtons={radioButtons}
                    onPress={onPressRadioButton}
                    layout='column'
                    containerStyle={{ alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: 10 }}

                />
            </View>
            <View>
                <Text style={{ fontWeight: 'bold' }}>Location</Text>
                <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={stateData}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Select state"
                    searchPlaceholder="Search..."
                    onChangeText={getStates}
                    value={selectedState}
                    onChange={item => {
                        setSelectedState(item);
                    }}
                    renderLeftIcon={() => (
                        <Ionicon style={styles.icon} color="black" name="location" size={20} />
                    )}
                />

                <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={cityData}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Select city"
                    searchPlaceholder="Search..."
                    onChangeText={getCities}
                    value={selectedCity}
                    onChange={item => {
                        setSelectedCity(item);
                        filteredData.location.label = " && location LIKE '%" + item.label + "%'";
                        filteredData.location.value = item.value;
                        getSelectedfilter(filteredData)
                    }}
                    renderLeftIcon={() => (
                        <Ionicon style={styles.icon} color="black" name="navigate" size={20} />
                    )}
                />
            </View>

        </ScrollView>
    )
}

export default FilterList

const styles = StyleSheet.create({
    dropdown: {
        marginTop: 10,
        padding: 5,
        marginBottom: 10,
        height: 55,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 10
    },
})