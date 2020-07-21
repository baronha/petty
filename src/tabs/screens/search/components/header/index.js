import React, { useState, useRef } from 'react'
import { TextInput, Alert } from 'react-native'
import { Layout, TopNavigationAction, useTheme } from '@ui-kitten/components'
import style from './style'
import { SearchIcon, OptionsIcon, CloseIcon } from '../../../../../utils/icon'
import NavigationService from '../../../../../navigators/NavigationService'


const Header = ({ openFilter, valueFilter }) => {

    const theme = useTheme()

    const [keyword, setKeyword] = useState('')

    let searchRef = useRef()

    const onChangeText = (value) => {
        setKeyword(value)
    }

    const deleteKeyword = () => {
        setKeyword('')
    }

    const onSearch = () => {
        if(keyword !== ""){
            NavigationService.navigate('ResultSearchScreen', { keyword })
        }else{
            Alert.alert('Bạn chưa nhập từ khoá')
        }
    }

    return (
        <Layout level={'1'} style={style.container}>
            {/* <TopNavigationAction
                icon={MenuIcon}
            /> */}
            <Layout level={'3'} style={style.searchView} >
                <TopNavigationAction
                    icon={SearchIcon}
                />
                <TextInput
                    ref={ref => { searchRef = ref }}
                    value={keyword}
                    onChangeText={onChangeText}
                    placeholder='Tìm kiếm'
                    placeholderTextColor={theme['text-hint-color']}
                    style={[style.searchBar, {
                        color: theme['text-basic-color']
                    }]}
                    autoFocus={true}
                    returnKeyType={'search'}
                    autoCorrect={false}
                    onSubmitEditing={onSearch}
                />
                {
                    keyword !== "" &&
                    <TopNavigationAction
                        icon={() => <CloseIcon width={24} height={24} fill={theme['text-hint-color']} />}
                        onPress={deleteKeyword}
                    />
                }
            </Layout>
            <Layout>
                <TopNavigationAction
                    icon={OptionsIcon}
                    onPress={openFilter}
                    style={style.buttonFill}
                />
                {
                    valueFilter !== null &&
                    <Layout style={[style.badge, {
                        backgroundColor: theme['color-danger-500']
                    }]} />
                }
            </Layout>
        </Layout>
    )
}

export default Header
