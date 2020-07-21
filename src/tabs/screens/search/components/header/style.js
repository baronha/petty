import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 12
    },
    searchView: {
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 4,
        flex: 1
    },
    searchBar: {
        flex: 1,
        marginHorizontal: 8,
        fontWeight: '500'
    },
    buttonFill:{
        marginLeft: 24
    },
    badge:{
        height: 8,
        width: 8,
        backgroundColor: 'red',
        borderRadius: 4,
        position: 'absolute',
        right: 0
    }
})