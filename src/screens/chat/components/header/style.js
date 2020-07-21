import { StyleSheet, Dimensions } from 'react-native'

const { width } = Dimensions.get('window')

export default StyleSheet.create({
    container: {
        paddingHorizontal: 24,
        flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'center',
        height: 72,
    },
    backButton: {
    },
    userView: {
        width: width - 104,
        alignItems: 'center',
        paddingLeft: 8,
        // backgroundColor: 'red'
    },
    userName: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
    time:{
        fontSize: 12,
        // marginTop: 4,
        textAlign: 'center',
        color: '#FD5E5A'
    },
    avatarView: {
        height: 32,
        width: 32,
        borderRadius: 24,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 24,

    },
    avatar: {
        height: 30,
        width: 30,
        borderRadius: 21
    }
})