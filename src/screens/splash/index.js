import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import style from './style'
import NavigationService from '../../navigators/NavigationService'

const SplashScreen = () => {
    return (
        <View style={style.container}>
            <TouchableOpacity onPress={() => NavigationService.navigate('AddPetScreen')} >
                <Text>Go to add</Text>
            </TouchableOpacity>
            <Text>
                SplashScreen
            </Text>
        </View>
    )
}

export default SplashScreen
