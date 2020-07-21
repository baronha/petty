import React from 'react'
import { Layout, Input, useTheme, Select } from '@ui-kitten/components'
import style from './style'
import { ageTypeArray } from '../../../../../utils/data'

const Age = ({
    age,
    setAge,
    ageType,
    setAgeType
}) => {

    const theme = useTheme()

    return (
        <Layout level={'2'} style={style.row}>
            <Input
                placeholder={'VD: 12'}
                textStyle={style.inputText}
                autoCorrect={false}
                keyboardType={'number-pad'}
                style={[style.input, {
                    backgroundColor: theme['background-basic-color-1'],
                }]}
                value={age}
                onChangeText={setAge}
                maxLength={2}
            />
            <Select
                data={ageTypeArray}
                selectedOption={ageType}
                onSelect={(value) => setAgeType(value)}
                placeholder={'Tháng tuổi'}
                controlStyle={{
                    backgroundColor: theme['background-basic-color-1'],
                    borderWidth: 0,
                    marginLeft: 12
                }}
                style={style.combobox}
            />
        </Layout>
    )
}

export default Age
