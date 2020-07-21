import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        paddingHorizontal: 24,
        paddingVertical: 24,
        zIndex: 2
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title:{
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
        flex: 1
    },
})