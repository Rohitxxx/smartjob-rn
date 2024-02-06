import { ADDITION, GET_LOCAL_USER, SET_LOCAL_USER, SUBSTRACTION, } from "./action"
import AsyncStorage from '@react-native-async-storage/async-storage';
import AxiosObj from "../AxiosObj/AxiosObj";



const initialState = {
    counter: 0,
    user: null
}

const getUser = async () => {
    try {
        const jsonString = await AsyncStorage.getItem('user');
        console.log('inside getitem', jsonString)
        console.log('inside getitem 2', typeof (jsonString))
        alert(jsonString)
        if (jsonString != null)
            return JSON.parse(jsonString);
        else
            return null
        // return jsonString != null ? JSON.parse(jsonString) : null;
    } catch (e) {
        console.log(e);
        return null;
    } finally {
        console.log('user inside geuser', user);
    }
}
const editUser = async () => {
    try {
        const jsonString = JSON.stringify({ id: 446, name: 'rohit', domain: 1 });
        await AsyncStorage.setItem('user', jsonString)
        console.log('inside getitem', jsonString)
        alert('data saved to local')
        // console.log('editUser running', user)
    } catch (e) {
        console.log(e)
    }
}
export const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADDITION:
            return ({ ...state, counter: state.counter + 1 })
        case SUBSTRACTION:
            return ({ ...state, counter: state.counter - 1 })
        case GET_LOCAL_USER:
            return ({ ...state, user: getUser() });
        case SET_LOCAL_USER:
            return ({ ...state, user: editUser() });
        default: return state
    }
}