import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
    container: {
        flex: 1
    },
    emptySearch: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 24
    },
    lottie: {
        width: width,
    },
    emptyTitle: {
        textAlign: 'center'
    },
    overlay: {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.8)',
        position: 'absolute'
    },
    filter: {
        position: 'absolute',
        right: 0,
        left: 0,
        backgroundColor: 'white',
        paddingTop: 12
    },
    textButonClose: {
        color: '#000',
        fontWeight: 'bold'
    },
    buttonView: {
        flexWrap: 'wrap',
        backgroundColor: 'white',
    },
    buttonClose: {
        margin: 8,
        width: 100,
        alignSelf: 'flex-end',
        right: 0,
        position: 'absolute'
    },
    filterText:{
        fontWeight: 'bold',
        paddingHorizontal: 24
    }
})