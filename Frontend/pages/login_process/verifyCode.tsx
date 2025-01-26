import React, { useEffect, useRef, useState } from "react";
import { View, TextInput, StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Keyboard, ActivityIndicator } from "react-native";
import { useHeaderHeight } from '@react-navigation/elements'
import { CustomText } from "../../utils/text/text";
import Lettersvg from "../../assets/letter.svg";
import { useNavigation } from "@react-navigation/native";


const VerificationCodeInput: React.FC = () => {
    const [code, setCode] = useState<string[]>(["", "", "", ""]);
    const [loading, setLoading] = useState(false);
    const inputs = useRef<Array<TextInput | null>>([]);
    const navigation = useNavigation();
    const handleChange = (text: string, index: number) => {
      if (text.length > 1) return; // Prevent multiple characters
      const newCode = [...code];
      newCode[index] = text;
      setCode(newCode);
  
      if (text && index < 3) {
        inputs.current[index + 1]?.focus();
      }
  
      if (newCode.every((char) => char !== "")) {
        handleSubmit();
      }
    };
  
    const handleKeyPress = (e: any, index: number) => {
      if (e.nativeEvent.key === "Backspace" && !code[index] && index > 0) {
        inputs.current[index - 1]?.focus();
      }
    };
  
    const handleSubmit = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigation.navigate("SignInVerifyPassword" as never);
      }, 3000);
    };
  
    return (
      <View style={[styles.container, loading && styles.disabledContainer]}>
        <View style={[styles.inputContainer, loading && styles.disabledContainer]}>
          {code.map((value, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputs.current[index] = ref)}
              style={[styles.input, loading && styles.disabledInput]}
              keyboardType="numeric"
              maxLength={1}
              value={value}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              editable={!loading}
            />
          ))}
        </View>
        {loading && <ActivityIndicator size="large" color="#007BFF" style={styles.loader} />}
      </View>
    );
  };

export const VerifyCodePage = () => {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    if (seconds === 0) return;
    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds]);
  const height = useHeaderHeight();

  return (
    <KeyboardAvoidingView
      style={styles.pageContainer}
      keyboardVerticalOffset={height + 47}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableOpacity activeOpacity={1} onPress={dismissKeyboard} style = {styles.innerContainer}>
        <View>
        <View style = {{width : 40, height : 40, borderRadius : 12, backgroundColor : "rgb(247,247,247)", justifyContent : "center", alignItems : "center", marginBottom : 10}}>
            <Lettersvg width={20} height={20}></Lettersvg>
        </View>
        <CustomText style={{fontWeight : "bold", fontSize : 32}}>Enter the email code</CustomText>
        <View style={{height : 10}}></View>
        <CustomText style = {{color : "rgba(110,110,110,1)"}}>An email has been send to</CustomText>
        <CustomText style={{fontWeight : "bold"}}>contact@company.com</CustomText>
        <VerificationCodeInput />
        </View>
        <TouchableOpacity  disabled={seconds > 0} onPress={() => {setSeconds(30)}} style={[styles.confirmButton, seconds > 0 && styles.disabledButton]}>
          <Text disabled={seconds > 0} style={styles.buttonText}>{seconds > 0 ? "Resend in " + seconds + " secondes" : "Resend a code"}</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
    disabledButton: {
        backgroundColor: "#007BFF",
        opacity: 0.5,
      },
  pageContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  innerContainer: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
    width: "100%",
  },
  container: {
    justifyContent: "center",
    width: "100%",
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  input: {
    width: 50,
    height: 60,
    borderWidth: 1,
    borderColor: "#ccc",
    textAlign: "center",
    fontSize: 24,
    borderRadius: 10,
  },
  confirmButton: {
    alignSelf: "center",
    backgroundColor: "#007BFF",
    padding: 15,
    width: "100%",
    height : 56,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  disabledInput: {
    opacity: 0.5,
  },
  loader: {
    marginTop: 20,
  },
  disabledContainer: {
    opacity: 0.5,
  },
});

export default VerificationCodeInput;
