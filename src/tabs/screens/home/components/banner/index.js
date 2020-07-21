import React from 'react'
import { View, Image } from 'react-native'
import style from './style'

const Banner = () => {
    return (
        <View style={style.conatiner}>
            <Image 
                style={style.image}
                source={require('../../../../../assets/images/background-home/background-home.png')}
                resizeMode={'cover'}
            />
        </View>
    )
}

export default Banner
