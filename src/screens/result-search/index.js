import React from 'react'
import { Layout, Text } from '@ui-kitten/components'
import style from './style'

const ResultSearch = ({ route }) => {

    const { keyword } = route.params

    return (
        <Layout style={style.container}>
            <Text>{keyword}</Text>
        </Layout>
    )
}

export default ResultSearch
