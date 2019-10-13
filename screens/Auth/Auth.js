import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ImageBackground, Dimensions } from 'react-native';

import DefaultInput from '../../src/components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../src/components/UI/HeadingText/HeadingText';
import MainText from '../../src/components/UI/MainText/MainText';
import backgroundImage from '../../src/assets/background1.jpg';
import ButtonWithBackground from '../../src/components/UI/ButtonWithBackground/ButtonWithBackground';
import validate from '../../src/utility/validation';
import {tryAuth} from '../../store/actions/index'
import {connect} from 'react-redux';
class AuthScreen extends Component {

    state ={
        respStyles:{
            pwContainerDirection: "column",
            pwContainerJustifyContent: "flex-start",
            pwWrapperWidth: "100%",

        },
        authMode: "login",
        controls:{
            email:{
                value: "",
                valid: false,
                validationRules:{
                    isEmail:true
                },
                touched:false
            },
            password:{
                value: "",
                valid: false,
                validationRules:{
                    minLength: 6
                },
                touched:false
            },
            confirmPassword:{
                value: "",
                valid: false,
                validationRules:{
                    equalTo:'password'
                },
                touched:false
            }
        }

    };
    constructor(props){
        super(props);
        Dimensions.addEventListener("change", this.updateStyles);
    }

    componentWillUnmount(){
        Dimensions.removeEventListener("change",this.updateStyles);
    }
    switchAuthModeHandler = () =>{
        this.setState(prevState=>{
            return{
                authMode: prevState.authMode ==="login" ? "signup" : "login" 
            };
        });
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

    updateInputState= (key,value)=>{
        let connectedValue={};
        if(this.state.controls[key].validationRules.equalTo){
            const equalControl= this.state.controls[key].validationRules.equalTo;
            const equalValue= this.state.controls[equalControl].value;
            connectedValue= {
                ...connectedValue,
                equalTo: equalValue
            };
        }
        if(key==='password'){
            connectedValue= {
                ...connectedValue,
                equalTo: value
            };
        }
        this.setState(prevState => {
            return{
                controls:{
                    ...prevState.controls,
                    confirmPassword:{
                        ...prevState.controls.confirmPassword,
                        valid: key=== 'password' ? validate(prevState.controls.confirmPassword.value,prevState.controls.confirmPassword.validationRules,connectedValue): prevState.controls.confirmPassword.valid
                    },
                    [key]: {
                        ...prevState.controls[key],
                        value:value,
                        valid: validate(value,prevState.controls[key].validationRules,connectedValue),
                        touched:true
                    }

                }
            };
        });
    }

    loginHandler = () =>{
        const authData ={
            email: this.state.controls.email.value,
            password: this.state.controls.password.value
        };
        this.props.onLogin(authData);
        this.props.navigation.navigate('Home');
    }

    render() {
        let headingTxt=null;
        let confirmPasswordControl = null;
        if(Dimensions.get('window').height>500){
            headingTxt=(
            <MainText>
                <HeadingText>Please Log In</HeadingText>
            </MainText>
            );
        
        }
        if(this.state.authMode==="signup"){
            confirmPasswordControl =(
            <View style={{width: this.state.respStyles.pwWrapperWidth}}>
                                
                <DefaultInput placeholder='Confirm Password' 
                
                value={this.state.controls.confirmPassword.value}
                onChangeText={val => this.updateInputState('confirmPassword',val)}
                valid={this.state.controls.confirmPassword.valid}
                touched={this.state.controls.confirmPassword.touched}/>
            </View>
                  
            );
        }
        return (

            <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
                <View style={styles.container}>
                    {headingTxt}
                    <ButtonWithBackground color='#29aaf4' onPress={this.switchAuthModeHandler}>
                        Switch to {this.state.authMode==='login' ? "Sign up": "Login"}</ButtonWithBackground>
                    <View style={styles.inputContainer}>
                        <DefaultInput placeholder='Your E-Mail Address' 
                        
                        value={this.state.controls.email.value}
                        onChangeText={(val)=>this.updateInputState('email',val)}
                        valid={this.state.controls.email.valid}
                        touched={this.state.controls.email.touched}/>
                        <View style={{flexDirection: this.state.respStyles.pwContainerDirection,
                        justifyContent: this.state.respStyles.pwContainerJustifyContent}}>
                            <View style={{width: this.state.respStyles.pwWrapperWidth}}>
                                <DefaultInput placeholder='Password'
                               
                                 value={this.state.controls.password.value}
                                 onChangeText={val => this.updateInputState('password',val)}
                                 valid={this.state.controls.password.valid}
                                 touched={this.state.controls.password.touched}/>
                            </View>

                        </View>
                        {confirmPasswordControl}


                    </View>

                    <ButtonWithBackground onPress={this.loginHandler} color='#29aaf4'
                    disabled={!this.state.controls.confirmPassword.valid && this.state.authMode==="signup" || !this.state.controls.email.valid || !this.state.controls.password.valid}>Submit</ButtonWithBackground>
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

const mapDispatchToProps= dispatch => {
    return{
        onLogin: (authData) => dispatch(tryAuth(authData))
    };
};

export default connect(null,mapDispatchToProps)(AuthScreen);