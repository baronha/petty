import {StyleSheet, Dimensions} from 'react-native'

const {width} = Dimensions.get('window')

const WIDTH_IMAGE = width-48

export default StyleSheet.create({
    conatiner:{
        paddingHorizontal: 24,
        paddingBottom: 24
    },
    image:{
        width: WIDTH_IMAGE,
        height: WIDTH_IMAGE * 5 / 12,
        borderRadius: 8,
        resizeMode: 'center'
    }
})