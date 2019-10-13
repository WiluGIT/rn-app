import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { connect } from 'react-redux';

import PlaceList from '../../src/components/PlaceList/PlaceList';


class FindPlaceScreen extends Component {
    itemSelectedHandler = key => {
        const selPlace = this.props.places.find(place => {
            return place.key === key;
        });
        let dataSend = selPlace;
        this.props.navigation.navigate('Place', dataSend);
    };
    state = {
        placeLoaded: false,
        removeAnim: new Animated.Value(1),
        placesAnim: new Animated.Value(0)

    }

    placesSearchHandler = () => {
        Animated.timing(this.state.removeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
        }).start(() => {
            this.setState({
                placeLoaded: true
            });
            this.placesLoadedHandler();
        });
    };

    placesLoadedHandler = () => {
        Animated.timing(this.state.placesAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start();
    }
    render() {
        let content = (
            <Animated.View style={{
                opacity: this.state.removeAnim,
                transform: [
                    {
                        scale: this.state.removeAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [12, 1]
                        })
                    }

                ]
            }}>
                <TouchableOpacity onPress={this.placesSearchHandler}>
                    <View style={styles.searchButton}>
                        <Text styles={styles.searchButtonText}>Find Places</Text>
                    </View>
                </TouchableOpacity>
            </Animated.View>

        );
        if (this.state.placeLoaded) {
            content = (
                <Animated.View style={{
                    opacity: this.state.placesAnim
                }}>
                    <PlaceList places={this.props.places} onItemSelected={this.itemSelectedHandler} />

                </Animated.View>
            );
        }
        return (
            <View style={this.state.placeLoaded ? null : styles.buttonContainer}>
                {content}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    searchButton: {
        borderColor: "orange",
        borderWidth: 3,
        borderRadius: 50,
        padding: 20
    },
    searchButtonText: {
        color: "orange",
        fontWeight: "bold",
        fontSize: 26
    }
});
const mapStateToProps = state => {
    return {
        places: state.places.places
    };
};

export default connect(mapStateToProps)(FindPlaceScreen);