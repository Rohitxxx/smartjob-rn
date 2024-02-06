import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import RadioGroup from 'react-native-radio-buttons-group';


const SortList = ({ getSelectedRadio }) => {

    const radioButtonsData = [{
        id: '1', // acts as primary key, should be unique and non-empty string
        label: 'Recommended',
        value: 'created_at DESC',
        selected: true

    }, {
        id: '2',
        label: 'Salary- High to Low',
        value: 'package DESC',

    }, {
        id: '3',
        label: 'Newest First',
        value: 'created_at DESC'
    }
    ]
    const [radioButtons, setRadioButtons] = useState(radioButtonsData)

    function onPressRadioButton(radioButtonsArray) {
        setRadioButtons(radioButtonsArray);
        getSelectedRadio(radioButtons.find(item => item.selected == true))
        filterSelected();
    }
    const filterSelected = () => {
        let b = radioButtons.find(item => item.selected == true)
        console.log('b', b)
    }
    return (
        <ScrollView >
            <View>
                <Text style={{ fontWeight: 'bold' }}>Monthly Salary</Text>
                {console.log('radio', radioButtons)}
                <RadioGroup

                    radioButtons={radioButtons}
                    onPress={onPressRadioButton}
                    layout='column'
                    containerStyle={{ alignItems: 'flex-start' }}
                />
            </View>
        </ScrollView>
    )
}

export default SortList

const styles = StyleSheet.create({})