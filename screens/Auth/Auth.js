import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ImageBackground, Dimensions } from 'react-native';

import DefaultInput from '../../src/components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../src/components/UI/HeadingText/HeadingText';
import MainText from '../../src/components/UI/MainText/MainText';
import backgroundImage from '../../src/assets/background1.jpg';
import ButtonWithBackground from '../../src/components/UI/ButtonWithBackground/ButtonWithBackground';
class AuthScreen extends Component {

    state ={
        respStyles:{
            pwContainerDirection: "column",
            pwContainerJustifyContent: "flex-start",
            pwWrapperWidth: "100%"
        }

    }
    constructor(props){
        super(props);
        Dimensions.addEventListener("change", this.updateStyles);
    }

    componentWillUnmount(){
        Dimensions.removeEventListener("change",this.updateStyles);
    }

    updateStyles= (dims) =>{
        this.setState({
            respStyles:{
                pwContainerDirection: Dimensions.get('window').height>500 ? "column" : "row",
                pwContainerJustifyContent: Dimensions.get('window').height>500 ? "flex-start": "space-between",
                pwWrapperWidth: Dimensions.get('window').height>500 ? "100%" : "45%"
            }
        });
    }

    render() {
        let headingTxt=null;

        if(Dimensions.get('window').height>500){
            headingTxt=(
            <MainText>
                <HeadingText>Please Log In</HeadingText>
            </MainText>
            );
        
        }
        return (

            <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
                <View style={styles.container}>
                    {headingTxt}
                    <ButtonWithBackground color='#29aaf4'>Switch to Login</ButtonWithBackground>
                    <View style={styles.inputContainer}>
                        <DefaultInput placeholder='Your E-Mail Address' />
                        <View style={{flexDirection: this.state.respStyles.pwContainerDirection,
                        justifyContent: this.state.respStyles.pwContainerJustifyContent}}>
                            <View style={{width: this.state.respStyles.pwWrapperWidth}}>
                                <DefaultInput placeholder='Password' />
                            </View>
                            <View style={{width: this.state.respStyles.pwWrapperWidth}}>
                                
                                <DefaultInput placeholder='Confirm Password' />
                            </View>
                            
                           
                        </View>

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
    },
    passwordContainer:{
        flexDirection:Dimensions.get('window').height>500?"column":"row",
        justifyContent: "space-between"
    },
    passwordWrapper:{
        width: Dimensions.get('window').height>500 ? "100%" : "45%"
    }
});

export default AuthScreen;