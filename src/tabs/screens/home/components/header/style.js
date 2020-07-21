import { StyleSheet } from 'react-native'
import { StyleService } from '@ui-kitten/components'

export default StyleSheet.create({
    container: {
        paddingHorizontal : 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // marginTop: 12,
        // backgroundColor: 'red',
        alignItems: 'center'
    },
    rightView:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    titleView:{
        marginRight: 24,
        alignItems: 'flex-end'
    },
    name:{
        fontWeight: 'bold'
    },
    welcomeText:{
        fontWeight: '400',
    },
    avatar:{
        height: 42,
        width: 42,
        borderRadius: 21,
    },
    avatarView:{
        height: 48,
        width: 48,
        borderRadius: 24,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        shadowOpacity: 0.1,
        shadowRadius: 12
    }
})