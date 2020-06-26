import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Text, ActivityIndicator} from "react-native";
import { ScreenDimensions } from '../../utils/index'
import {styles} from './styles'

const VERTICAL_POSITION = (ScreenDimensions.SCREEN_HEIGHT / 2) - 130;
const HORIZONTAL_POSITION = (ScreenDimensions.SCREEN_WIDTH / 2) - 130;

export default class Loader extends React.Component {


    constructor(props) {
        super(props);
    }

    render() {

        const { isVisible } = this.props;

        if (!isVisible) {
            return null;
        }

        return (
            <View {...this.props} style={styles.parentContainer}>
                <View style={styles.childContainer}>
                    <ActivityIndicator color="#fff" size={50} animating={true} style={{ elevation: 10 }} ></ActivityIndicator>
                    <Text style={styles.textStyle}>Loading...</Text>
                </View>
            </View>
        );
    }
}

Loader.propTypes = {
    isVisible: PropTypes.bool,
};

Loader.defaultProps = {
    isVisible: false,
};

