import React from 'react'
import { Layout, Text } from '@ui-kitten/components'
import style from './style'
import Slider  from 'react-native-slider'

const Health = ({
    health,
    setHealth
}) => {
    return (
        <Layout level={'2'}>
            <Layout level={'2'} style={[style.row, {
                marginTop: -12,
            }]}>
                <Slider
                    minimumValue={1}
                    maximumValue={100}
                    thumbStyle={style.thumb}
                    trackStyle={{ height: 6, borderRadius: 6 }}
                    // customMinimumTrack={()=>{
                    //     return <LinearGradient
                    //     start={{ x: .74, y: .26 }}
                    //     end={{ x: 0, y: .77 }}
                    //     colors={['#FD5E5A', '#FDBF50']}
                    //     style={{
                    //         width: 100,
                    //         height: 6,
                    //     }}
                    // />
                    // }}
                    minimumTrackTintColor={'#FDBF50'}
                    maximumTrackTintColor="rgba(157, 163, 180, 0.10)"
                    value={health}
                    step={1}
                    onValueChange={(value) => setHealth(value)}
                    style={{ flex: 1 }}
                />
                <Text style={style.healthStatus}>
                    {health} %
                    </Text>
            </Layout>
        </Layout>
    )
}

export default Health
