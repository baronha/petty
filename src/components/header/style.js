import { StyleSheet, Dimensions } from 'react-native'

const {width} = Dimensions.get('window')

export default StyleSheet.create({
    container:{
        paddingTop: 24,
        flexDirection: 'row',
    },
    backButton:{
        paddingLeft: 24
    },
    titleView:{
        width: width - 96,
    },
    title:{
        fontWeight: 'bold',
        textAlign: 'center',

    }
})