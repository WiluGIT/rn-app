import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ImageBackground } from 'react-native';

import DefaultInput from '../../src/components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../src/components/UI/HeadingText/HeadingText';
import MainText from '../../src/components/UI/MainText/MainText';
import backgroundImage from '../../src/assets/background1.jpg';
import ButtonWithBackground from '../../src/components/UI/ButtonWithBackground/ButtonWithBackground';
class AuthScreen extends Component {
    render() {
        return (

            <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
                <View style={styles.container}>
                    <MainText>
                        <HeadingText>Please Log In</HeadingText>
                    </MainText>
                    <ButtonWithBackground color='#29aaf4'>Switch to Login</ButtonWithBackground>
                    <View style={styles.inputContainer}>
                        <DefaultInput placeholder='Your E-Mail Address' />
                        <DefaultInput placeholder='Password' />
                        <DefaultInput placeholder='Confirm Password' />
                    </View>

                    <ButtonWithBackground onPress={() => this.props.navigation.navigate('Home')} color='#29aaf4'>Submit</ButtonWithBackground>
                </View>
            </ImageBackground>


        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    inputContainer: {
        width: '80%'
    },
    textHeading: {
        fontSize: 28,
        fontWeight: 'bold'
    },
    backgroundImage: {
        width: '100%',
        flex:1
    }
});

export default AuthScreen;