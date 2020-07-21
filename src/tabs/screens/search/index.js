import React, { useState, useEffect } from 'react'
import {
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
    Animated,
    Easing,
    ActivityIndicator,
    RefreshControl
} from 'react-native'
import {SafeAreaLayout} from '../../../components/safe-area-layout';
import { Layout, Text, Button } from '@ui-kitten/components'
import style from './style'
import { Header } from './components'
import LottieView from 'lottie-react-native';
import { IconFilter } from '../home/components'


const SearchScreen = () => {

    const [isShowFilter, setShowFilter] = useState(false)
    const [valueFilter, setValueFilter] = useState(null)
    const [slideAnim] = useState(new Animated.Value(-136))
    const [isRefresh, setRefresh] = useState(false)

    useEffect(() => {
        Animated.spring(slideAnim, {
            toValue: isShowFilter ? 0 : -136,
            duration: 500,
            easing: Easing.bezier(0.75, -0.25, 0.25, 1.25),
            delay: 0,
        }).start();
    }, [isShowFilter])

    const overlayOpacity = slideAnim.interpolate({
        inputRange: [-136, 0],
        outputRange: [0, 1]
    })

    useEffect(() => {
        setShowFilter(false)
    }, [valueFilter])

    const onFilter = () => {
        setShowFilter(!isShowFilter)
    }

    const onRefresh = () => {

    }


    const renderEmptySearch = () => {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Layout style={style.emptySearch}>
                    <LottieView
                        autoPlay
                        loop
                        source={require('../../../assets/lotties/search.json')}
                        style={style.lottie}
                    />
                    <Text style={style.emptyTitle} category='s1'>Hãy tìm kiếm những người bạn cho đời mình !</Text>
                </Layout>
            </TouchableWithoutFeedback>
        )
    }
    return (
        <SafeAreaLayout
            insets={'top'}
            style={style.container}
        >
            <Header openFilter={onFilter} valueFilter={valueFilter} />
            <Layout level={'2'} style={{ flex: 1 }}>
                {
                    renderEmptySearch()
                }
                <ScrollView
                    refreshControl={<RefreshControl refreshing={isRefresh} />}
                    style={{ flex: 1 }}
                    onRefresh={onRefresh}
                >


                </ScrollView>
            </Layout>
            {
                isShowFilter &&
                <TouchableWithoutFeedback onPress={onFilter}>
                    <Layout style={[style.overlay, {
                        backgroundColor: 'transparent'
                    }]} />
                </TouchableWithoutFeedback>
            }
            <Animated.View
                pointerEvents="none"
                style={[style.overlay, {
                    opacity: overlayOpacity
                }]} />
            <Animated.View
                style={[style.filter, {
                    transform: [{ translateY: slideAnim }]
                }]}>
                <SafeAreaLayout style={{backgroundColor: 'white'}} insets={'top'} />
                <IconFilter
                    getValue={value => setValueFilter(value)}
                    isSearch
                />
                {
                    isShowFilter &&
                    <Layout style={style.buttonView}>
                        <Button onPress={onFilter} size={'small'} style={style.buttonClose}>
                            {"Đóng"}
                        </Button>
                    </Layout>
                }
            </Animated.View>
        </SafeAreaLayout>
    )
}

export default SearchScreen
