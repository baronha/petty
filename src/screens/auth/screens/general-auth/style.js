import { StyleSheet, Dimensions } from 'react-native'

const { width } = Dimensions.get('window')

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    image: {
        height: null,
        width: width - 48,
        alignSelf: 'center',
        resizeMode: 'contain'
        // backgroundColor: 'black'
    },
    titleMain: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonGroup: {
        paddingHorizontal: 24,
        flex: 1,
        justifyContent: 'center'
    },
    signUp: {
        marginTop: 24,
        backgroundColor: '#F5F5F5',
        color: 'red'
    },
    signUpText: {
        color: '#FDBF50'
    },
    textOr: {
        paddingVertical: 24,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16
    },
    facebookButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#475993',
        padding: 8,
        borderRadius: 4,
    },
    facebookText: {
        flex: 1,
        alignSelf: 'center',
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff',
        fontSize: 15
    },
    forgotPassword: {
        textAlign: 'center',
        alignSelf: 'center',
        bottom: 24,
        position: 'absolute',
    },
    forgotText: {
        fontSize: 16,
        color: '#979797'
    },
    subTitle:{
        textAlign: 'center',
        marginTop: 12,
        color: '#979797'
    }
})