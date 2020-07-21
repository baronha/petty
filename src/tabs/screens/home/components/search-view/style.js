import { StyleSheet } from 'react-native'


export default StyleSheet.create({
    conatiner: {
        paddingHorizontal: 24,
        paddingBottom: 24
    },
    title:{
        fontSize: 16,
        fontWeight: 'bold'
    },
    searchView:{
        flexDirection: 'row',
        paddingVertical: 8,
        borderRadius: 4,
        marginTop: 12,
        alignItems: 'center',
        paddingHorizontal: 8
    },
    searchPlaceholder:{
        fontWeight: '400',
        marginLeft: 12,
        opacity: 0.5
    }
})