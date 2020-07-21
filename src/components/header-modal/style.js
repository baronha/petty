import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    container:{
        paddingTop: 24,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 24,
        justifyContent: 'space-between',
        paddingBottom: 12,
        shadowRadius: 24,
        borderBottomWidth: 0.5
    },
    title:{
        fontSize: 18,
        fontWeight: 'bold'
    },
    buttonClose:{
        padding: 6,
        borderRadius: 24
    }
})