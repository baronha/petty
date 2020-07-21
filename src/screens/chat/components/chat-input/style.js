import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        paddingHorizontal: 24,
        flexDirection: 'row',
        alignSelf: 'center',
        paddingTop: 12,
        paddingBottom: 20,
    },
    inputView: {
        flex: 1,
        borderRadius: 4,
        flexDirection: 'row',
    },
    textInput: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        fontWeight: '600',
        flex: 1,
    },
    buttonSend: {
        alignSelf: 'center'
    },
    textSend: {
        paddingLeft: 24,
        fontWeight: 'bold',
    },
    imageView:{
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 6
    }
})