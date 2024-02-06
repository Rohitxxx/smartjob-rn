import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AxiosObj from "../AxiosObj/AxiosObj";
export const UserContext = createContext();

export const DataContext = ({ children }) => {
    const [user, setUser] = useState(null)
    // const user = { name: 'rohit' }
    const getUser = async () => {
        try {
            const jsonString = await AsyncStorage.getItem('user');
            console.log('inside getitem', jsonString)
            console.log('inside getitem 2', typeof (jsonString))
            if (jsonString != null)
                setUser(JSON.parse(jsonString));
            else
                setUser(null)
            // return jsonString != null ? JSON.parse(jsonString) : null;
        } catch (e) {
            console.log(e);
            return null;
        } finally {
            console.log('user inside geuser', user);
        }
    }
    const removeUser = async () => {
        try {
            await AsyncStorage.removeItem('user');
            console.log('inside removeItem')

            return true;
        } catch (e) {
            console.log(e)
        }
    }
    const editUser = async (user) => {
        try {
            const jsonString = JSON.stringify(user);
            await AsyncStorage.setItem('user', jsonString)
            console.log('inside getitem', jsonString)
            setUser(user);
            console.log('editUser running', user)
        } catch (e) {
            console.log(e)
        }
    }
    const isLoggedIn = () => {
        console.log('inside isloggedin', user)
        if (user != null) {
            if (user.name.trim().length > 0) {
                return true;
            }
        } else {
            return false;
        }
    }
    const getUserFromServer = async () => {
        try {
            const response = await AxiosObj.get('get_candidate_detail.php', { params: { 'user_id': user.user_id } })
            if (response.data.error) {
                console.log('failed to fetch user from server')
            } else {
                console.log('getuserFromServer');
                editUser(response.data.data)
            }
        } catch (e) {
            console.log(e);
        }
    }
    const getUserId = () => {
        return user.user_id;
    }
    const setUserToServer = async (user) => {
        try {
            let formData = new FormData();
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                }
            };

            formData.append('user_id', user.user_id);
            formData.append('name', user.name);
            formData.append('gender', user.gender);
            formData.append('father_name', user.father_name);
            formData.append('contact_no', user.contact_no);
            formData.append('dob', user.dob);
            formData.append('martial_status', user.martial_status);
            formData.append('address', user.address);
            formData.append('address2', user.address2);
            formData.append('city', user.city);
            formData.append('state', user.state);
            formData.append('zip', user.zip);
            formData.append('high_school_name', user.high_school_name);
            formData.append('high_school_board', user.high_school_board);
            formData.append('high_school_percentage', user.high_school_percentage);
            formData.append('high_school_yr_of_pass', user.high_school_yr_of_pass);
            formData.append('intermediate_institution', user.intermediate_institution);
            formData.append('intermediate_board', user.intermediate_board);
            formData.append('intermediate_percentage', user.intermediate_percentage);
            formData.append('intermediate_yr_of_pass', user.intermediate_yr_of_pass);
            formData.append('diploma_clg_name', user.diploma_clg_name);
            formData.append('diploma_course', user.diploma_course);
            formData.append('diploma_percentage', user.diploma_percentage);
            formData.append('diploma_yr_of_pass', user.diploma_yr_of_pass);
            formData.append('ug_clg_name', user.ug_clg_name);
            formData.append('ug_course', user.ug_course);
            formData.append('ug_percentage', user.ug_percentage);
            formData.append('ug_yr_of_pass', user.ug_yr_of_pass);
            formData.append('pg_clg_name', user.pg_clg_name);
            formData.append('pg_course', user.pg_course);
            formData.append('pg_percentage', user.pg_percentage);
            formData.append('pg_yr_of_pass', user.pg_yr_of_pass);
            formData.append('current_company', user.current_company);
            formData.append('current_salary', user.current_salary);
            formData.append('experiance', user.experiance);
            formData.append('designation', user.designation);
            const response = await AxiosObj.post('set_user_data.php', formData, config)
            if (response.data.error) {
                console.log('failed to save user to server', response.data)
            } else {
                console.log('setuserFromServer', response.data);
            }

        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => { console.log('useEffect running in context'); getUser() }, []);
    // useEffect(() => { setUserToServer(); editUser(user) }, [user])
    return (
        <UserContext.Provider value={{ user, setUser, getUser, editUser, removeUser, isLoggedIn, getUserFromServer, setUserToServer, getUserId }}>
            {children}
        </UserContext.Provider>
    )
}