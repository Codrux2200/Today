import React, {useEffect, useRef} from 'react';
import {
  Animated,
  LayoutChangeEvent,
  PanResponder,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  Image
} from 'react-native';

const SLIDER_WIDTH = 130;
const SLIDER_MARGIN = 12;

const Chevron = ({
  style,
  animated,
  inputRange,
  outputRange,
}: {
  style: ViewStyle;
  animated: Animated.Value;
  inputRange: number[];
  outputRange: string[];
}) => {
  const chevronColor = animated.interpolate({
    inputRange,
    outputRange,
  });

  return (
    <View style={style}>
      <Animated.View
        style={[styles.upperChevron, {backgroundColor: chevronColor}]}
      />
      <Animated.View
        style={[styles.lowerChevron, {backgroundColor: chevronColor}]}
      />
    </View>
  );
};

type Props = {
  onStart: () => void;
};


const SwipeToStart = ({onStart}: Props) => {
  const distance = useRef(0);


 

  const onLayout = (event: LayoutChangeEvent) => {
    const {width} = event.nativeEvent.layout;
    distance.current = width - SLIDER_WIDTH - SLIDER_MARGIN * 2;
  };

  const chevronColorAnim = useRef(new Animated.Value(0)).current;

  const shimmer = () => {
    Animated.timing(chevronColorAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start(() => {
      chevronColorAnim.setValue(0);
      shimmer();
    });
  };

  useEffect(() => {
    shimmer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const translationX = useRef(new Animated.Value(0)).current;


  const chevronOpacity = translationX.interpolate({
    inputRange: [-distance.current, 0],
    outputRange: [0, 1], // Devenir invisible quand le slider passe
    extrapolate: 'clamp',
  });

  const release = () => {
    Animated.spring(translationX, {
      toValue: 0,
      useNativeDriver: false,
    }).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx > 0) {
          translationX.setValue(0);
        } else if (gestureState.dx < -distance.current) {
          translationX.setValue(-distance.current);
        } else {
          translationX.setValue(gestureState.dx);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -distance.current) {
          onStart();
        }

        release();
      },
    }),
  ).current;

  return (
    <View style={styles.container} onLayout={onLayout}>
     <Animated.Image style={[styles.chevronimage, { opacity: chevronOpacity }]} source={require("../assets/chevron.png")}></Animated.Image>
      <Animated.View
        style={[styles.slider, {transform: [{translateX: translationX}]}]}
        {...panResponder.panHandlers}>
       <Text style={[styles.text]}>Let's go</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 44,
    height: 88,
    width : "100%",
    justifyContent: 'center',
    position: 'relative',
  },
  chevronimage:{
    left : 25
  },
  text: {
    color: 'white',
    fontSize: 22,
    fontWeight: '600',
  },
  slider: {
    backgroundColor: '#C9D8E2',
    borderRadius: 20,
    height: 64,
    display : 'flex',
    alignItems : 'center',
    justifyContent: "center",
    position: 'absolute',
    width: SLIDER_WIDTH,
    top: SLIDER_MARGIN,
    right: SLIDER_MARGIN,
  },
  upperChevron: {
    backgroundColor: '#000',
    height: 14,
    width: 3,
    borderRadius: 1,
    position: 'absolute',
    top: 20,
    transform: [{rotate: '35deg'}],
  },
  lowerChevron: {
    backgroundColor: '#000',
    height: 14,
    width: 3,
    borderRadius: 1,
    position: 'absolute',
    top: 30,
    transform: [{rotate: '-35deg'}],
  },
  chevron1: {left: 25},
  chevron2: {left: 43},
  chevron3: {left: 61},
});

export default SwipeToStart;