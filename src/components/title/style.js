import { StyleSheet, Dimensions } from 'react-native'

const {width}  = Dimensions.get('window')

export default StyleSheet.create({
    container: {
        // paddingLeft: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: width - 48,
        alignSelf: 'center'
    },
    titleView: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    title: {
        fontWeight: 'bold',
        flex: 1
    },
    buttonTitle:{
        opacity: 0.7,
        fontWeight: '500',
    },
    buttonStyle:{
        // alignItems: 'flex-end',
    }
})