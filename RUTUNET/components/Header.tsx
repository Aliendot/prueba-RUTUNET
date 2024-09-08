import React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import supabase from '../supabase/supabase.service'

const Header: React.FC = () => {
    const [userName, setUserName] = useState<string | null>(null);
    const [userRol, setUserRol] = useState<string | null>('Rol');
    
    useEffect(() => {
        const fetchUserData = async () => {
            const userId = 'e9ddd8e0-fab5-461e-8100-0dd67b21fe8b'; /////

            const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('rol') 
                .eq('id', userId) ////
                .single();

            if (profileError) {
                console.error('Error fetching profile data:', profileError);
                return;
            }

            if (profileData) {
                const email = 'ariani.varela@gmail.com' || ''; ////
                const username = email.split('@')[0];
                setUserName(username);
                setUserRol(profileData.rol|| 'Rol');
            }
        };

        fetchUserData();
    }, []);

    return (
        <View style={styles.avatarContainer}>
            <Image source={require('../assets/icons/user.png')} style={styles.avatar} />
            <Text style={styles.userName}>{userName || 'User Name'}</Text>
            <Text style={styles.userRol}>{userRol}</Text>
        </View>
    );
};



const styles = StyleSheet.create({
    avatarContainer:{
        alignItems: 'center',
        marginBottom: 20,    
    },
    avatar:{
        width: 120,
        height: 120,
        borderRadius: 40,
        marginBottom: 10,
        marginTop:60
    },
    userName:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    userRol:{
        fontSize: 16,
        color: '#666',
    }
});

export default Header;


/*
import React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import supabase from '../supabase/supabase.service'

const Header: React.FC = () => {

    const [userName, setUserName] = useState<string|null>(null);
    const [userRol, setUserRol] = useState<string|null>('rol');

    // sql 
    useEffect(()=>{
        const fetchUserData = async()=>{
            const {data: userData, error: userError} = await supabase.auth.getUser();

            if(userError){
                console.error('Error fetching user: ', userError)
                return 
            }

            const user = userData?.user
            if(user){
                const email = user.email || ''
                const username = email.split('@')[0];
                setUserName(username);

                const{data: profileData, error: profileError} = await supabase
                    .from('profiles')
                    .select('rol')
                    .eq('id', user.id)
                    .single();
                
                if(profileError) console.error('Error fetching profile data: ',profileError)
                else setUserRol(profileData?.rol || 'Rol')
                
                
            }
        };
        fetchUserData();
    },[]);

    //end sql
    return (
        <View style={styles.avatarContainer}>
            <Image source={require('../assets/icons/user.png')} style={styles.avatar}/>
            <Text style = {styles.userName}>{userName || 'User Name'}</Text>
            <Text style = {styles.userRol}>{userRol}</Text>
        </View>
    );

    return (
        <View style={styles.avatarContainer}>
            <Image source={require('../assets/icons/user.png')} style={styles.avatar}/>
            <Text style = {styles.userName}>User Name</Text>
            <Text style = {styles.userRol}>Rol</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    avatarContainer:{
        alignItems: 'center',
        marginBottom: 20,    
    },
    avatar:{
        width: 120,
        height: 120,
        borderRadius: 40,
        marginBottom: 10,
        marginTop:60
    },
    userName:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    userRol:{
        fontSize: 16,
        color: '#666',
    }
});

export default Header;

*/