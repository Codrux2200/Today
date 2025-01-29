import React, { Component, createRef } from 'react';
import { View, Animated, StyleSheet, TextInput, TextInputProps, TouchableOpacity } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';

type FloatingTitleTextInputFieldProps = {
  attrName: string;
  title: string;
  value: string;
  updateMasterState: (attrName: string, updatedValue: string) => void;
  keyboardType?: TextInputProps['keyboardType'];
  isPassword?: boolean;
  titleActiveSize?: number;
  titleInActiveSize?: number;
  titleActiveColor?: string;
  titleInactiveColor?: string;
  textInputStyles?: object;
  border?: boolean,
  otherTextInputProps?: TextInputProps;
};

type FloatingTitleTextInputFieldState = {
  isFieldActive: boolean;
  isPasswordVisible: boolean;
};

export class FloatingTitleTextInputField extends Component<
  FloatingTitleTextInputFieldProps,
  FloatingTitleTextInputFieldState
> {
  static defaultProps = {
    keyboardType: 'default',
    isPassword: false,
    titleActiveSize: 11.5,
    titleInActiveSize: 15,
    titleActiveColor: 'black',
    titleInactiveColor: 'dimgrey',
    textInputStyles: {},
    otherTextInputProps: {},
    border: true
  };

  private position: Animated.Value;
  private textInputRef = createRef<TextInput>();

  constructor(props: FloatingTitleTextInputFieldProps) {
    super(props);
    this.position = new Animated.Value(props.value ? 1 : 0);
    this.state = {
      isFieldActive: false,
      isPasswordVisible: false,
    };
  }

  _handleFocus = () => {
    if (!this.state.isFieldActive) {
      this.setState({ isFieldActive: true });
      Animated.timing(this.position, {
        toValue: 1,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }
  };

  _handleBlur = () => {
    if (this.state.isFieldActive && !this.props.value) {
      this.setState({ isFieldActive: false });
      Animated.timing(this.position, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }
  };

  _onChangeText = (updatedValue: string) => {
    const { attrName, updateMasterState } = this.props;
    updateMasterState(attrName, updatedValue);
  };

  _togglePasswordVisibility = () => {
    this.setState((prevState) => ({
      isPasswordVisible: !prevState.isPasswordVisible,
    }));
  };

  _returnAnimatedTitleStyles = () => {
    const { isFieldActive } = this.state;
    const { titleActiveColor, titleInactiveColor, titleActiveSize, titleInActiveSize } = this.props;

    return {
      top: this.position.interpolate({
        inputRange: [0, 1],
        outputRange: [20, 0],
      }),
      fontSize: isFieldActive ? titleActiveSize : titleInActiveSize,
    };
  };

  focusInput = () => {
    this.textInputRef.current?.focus();
  };

  render() {
    const {
      title,
      value,
      textInputStyles,
      keyboardType,
      otherTextInputProps,
      isPassword,
      border
    } = this.props;
    const { isPasswordVisible } = this.state;

    return (
      <View style={[Styles.container, border ? {borderWidth : 0.5} : {borderWidth : 0}]}>
        <Animated.Text style={[Styles.titleStyles, this._returnAnimatedTitleStyles()]}>
          {title}
        </Animated.Text>
        <TouchableOpacity style={Styles.inputRow} onPress={this.focusInput}>
          <TextInput
            ref={this.textInputRef}
            value={value}
            style={[Styles.textInput]}
            underlineColorAndroid="transparent"
            onFocus={this._handleFocus}
            onBlur={this._handleBlur}
            onChangeText={this._onChangeText}
            keyboardType={keyboardType}
            secureTextEntry={isPassword && !isPasswordVisible}
            {...otherTextInputProps}
          />
          {isPassword && (
            <TouchableOpacity onPress={this._togglePasswordVisibility} style={Styles.passwordToggle}>
              {isPasswordVisible ? <EyeOff color={"rgb(110,110,110)"} size={20} /> : <Eye color={"rgb(110,110,110)"}  size={20} />}
            </TouchableOpacity>
          )}
        </TouchableOpacity>
        {/* <TouchableOpacity style={Styles.focusButton} onPress={this.focusInput}>
          <Animated.Text style={Styles.focusButtonText}>Focus Input</Animated.Text>
        </TouchableOpacity> */}
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  container: {
    width: '90%',
    borderRadius: 12,
    borderStyle: 'solid',
    borderWidth: 0.5,
    height: 56,
    marginVertical: 4,
    borderColor: 'rgb(228,228,228)',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    marginLeft: 10,
    fontFamily: 'FigTree',
    color: 'rgb(110,110,110)',
  },

  titleStyles: {
    position: 'absolute',
    fontFamily: 'FigTree',
    left: 5,
    top: 2,
    color: 'rgb(110,110,110)',
  },
  passwordToggle: {
    marginRight: 10,
    zIndex: 99,
  },
  focusButton: {
    marginTop: 10,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  focusButtonText: {
    fontSize: 14,
    color: 'rgb(70,70,70)',
  },
});
