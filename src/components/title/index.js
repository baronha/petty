import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Layout, Text, TopNavigationAction } from '@ui-kitten/components'
import style from './style'

const Title = ({
    title,
    icon,
    buttonTitle,
    buttonStyle,
    titleStyle,
    containerStyle,
    onPress
}) => {

    return (
        <Layout style={[style.container, containerStyle]}>
            <Layout style={style.titleView}>
                {
                    icon && <TopNavigationAction
                        icon={icon}
                    />
                }
                <Text numberOfLines={1} style={[style.title, titleStyle, {
                    marginHorizontal: icon ? 12 : 0
                }]} >{title}</Text>
            </Layout>
            <TouchableOpacity style={[style.buttonStyle, buttonStyle]} onPress={onPress} >
                <Text style={style.buttonTitle}>
                    {buttonTitle}
                </Text>
            </TouchableOpacity>
        </Layout>
    )
}

export default Title
