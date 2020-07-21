import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    container:{
        marginHorizontal: 24,
        padding: 24,
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 8,
    },
    contain:{
        flex: 1,
        marginLeft: 24
    },
    avatar:{
        height: 48,
        width: 48,
        borderRadius: 24,
        backgroundColor: '#F5F7FB',
    },
    row:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    name:{
        fontWeight: 'bold'
    },
    date:{
        fontWeight: '300',
        fontSize: 13,
        // textTransform: ''
    },
    message:{
        flex: 1,
        fontSize: 13
    },
    dotSeen:{
        width: 10,
        height: 10,
        backgroundColor: '#FDBF50',
        borderRadius: 5,
        marginLeft: 24
    }
})