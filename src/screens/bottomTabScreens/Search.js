import { FlatList, KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Searchbar, TextInput } from 'react-native-paper'
import Header from '../../components/Header'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AxiosObj from '../../AxiosObj/AxiosObj'

const Search = ({ navigation }) => {
    const jobList = [
        {
            job_id: 1,
            title: 'go'
        },
        {
            job_id: 2,
            title: 'php'
        },
        {
            job_id: 3,
            title: 'lava'
        },
        {
            job_id: 4,
            title: 'c'
        },
        {
            job_id: 5,
            title: 'c++'
        },
        {
            job_id: 6,
            title: 'react'
        },
    ]
    // const [isSuggestionVisible, setIsSuggestionVisible] = useState(true);

    const [error, setError] = useState(false)
    const [suggestions, setSuggestions] = useState(jobList);
    const [searchInput, setSearchInput] = useState();
    const filterJobList = (value) => {
        setSuggestions(jobList.filter((item) => item.name.toLowerCase().includes(value.toLowerCase())));
        setSearchInput(value);
    }
    const onSearchComfirm = (name) => {
        console.log('suggestion name', name)
        navigation.navigate('searchedJob', { 'name': name })
        console.log('after navigate')
        setSearchInput(name)
    }
    const flatListData = (itemData) => {
        // filters the data list ontextchange 
        return (
            <Pressable onPress={onSearchComfirm.bind(this, itemData.item.title)} android_ripple={{ color: '#ccc' }} style={styles.searchList}>
                <Text style={{ fontSize: 18, }}>{itemData.item.title}</Text>
                <FontAwesome5 name='undo' size={16} />
            </Pressable>
        )
    }
    const searchFromServer = async (value) => {
        setSearchInput(value);
        try {
            const response = await AxiosObj.get("recommended_job_list.php", { params: { "name": searchInput } })
            if (response.data.error) {
                setError(true)
            } else {
                setError(false)
                setSuggestions(response.data.data);
            }
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <Header navigation={navigation} component={<Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>Search Job</Text>} />
            <Searchbar autoFocus={true} value={searchInput} style={styles.searchBar} onChangeText={searchFromServer} />
            {!error ? <FlatList data={((searchInput != null) || (searchInput != '')) ? suggestions : jobList} renderItem={flatListData} keyExtractor={(item) => item.job_id} />
                : <Text style={{ flex: 1, textAlign: 'center' }}>Please try different keyword</Text>}
        </KeyboardAvoidingView >
    )
}

export default Search

const styles = StyleSheet.create({
    searchList: {
        padding: 10,
        margin: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        elevation: 4
    },
    searchBar: {
        borderRadius: 32,
        marginHorizontal: 7,
        marginTop: 5,
        backgroundColor: 'white'
    }
})