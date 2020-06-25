import {Dimensions} from 'react-native'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const ScreenDimensions = {
    SCREEN_HEIGHT, SCREEN_WIDTH,
}

export {ScreenDimensions}