import React from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import { TopNavigationAction } from '@ui-kitten/components'
import style from './style';
import { BackIcon } from '../../../../utils/icon'
import NavigationService from '../../../../navigators/NavigationService'
// import SafeAreaView from '../../../../components/safe-area-layout';

const Header = ({ onPress }) => {

    const goBack = () => {
        if (onPress) {
            onPress()
        } else {
            NavigationService.goBack()
        }
    }

    return (
        <View >
            <SafeAreaView />
            <View
                style={style.container}
            >
                <TopNavigationAction
                    onPress={goBack}
                    icon={() => <BackIcon />}
                    style={style.goBack}
                />
            </View>
        </View>
    )
}

export default Header
