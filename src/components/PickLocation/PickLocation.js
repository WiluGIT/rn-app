import React, {Component} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';


class PickLocation extends Component{
    render(){
        return(
            <View style={styles.container}>
                    <View style={styles.placeholder}>
                        <Text>Map</Text>
                    </View>
                    <View style={styles.button}>
                        <Button title='Locate Me' onPress={()=>alert('Pick Location')} />
                    </View>
            </View>

        );

    }
}


const styles = StyleSheet.create({
    container:{
        width:'100%',
        alignItems: 'center'
    },
    placeholder: {
        backgroundColor: '#eee',
        borderWidth: 1,
        borderColor: 'black',
        width: '80%',
        height: 150
    },
    button: {
        margin: 8
    },
});

export default PickLocation;