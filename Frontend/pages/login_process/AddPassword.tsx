import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { CustomText } from "../../utils/text/text";
import { FloatingTitleTextInputField } from "../../utils/floating-input/floatinginput";
import { CustomButton } from "../../utils/button/TodayButton";
import CheckSvg from "../../assets/check.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const Check: React.FC<{ label: string; checked: boolean; onChange: (checked: boolean) => void }> = ({ label, checked, onChange }) => {
  return (
    <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 10 }}>
      <View
        style={[
          { borderColor: "rgb(228,228,228)", width: 20, height: 20, borderRadius: 4 },
          !checked ? { borderWidth: 1 } : { backgroundColor: "rgb(69,151,247)", alignItems: "center", justifyContent: "center" },
        ]}
        onTouchStart={() => onChange(!checked)} // Toggle the state on press
      > <CheckSvg></CheckSvg> </View>
      <CustomText style = {[!checked ? {color : "rgb(110,110,110)"} : {color : "black"}]}>{label}</CustomText>
    </View>
  );
};

export const PasswordGestionPage = () => {
  const navigation = useNavigation();
  const [password, setPassword] = useState("");
  const [validatingPassword, setValidatingPassword] = useState("");
  const [checks, setChecks] = useState({
    characters: false,
    uppercase: false,
    number: false,
    special: false,
    match: false,
  });

  const handlepassword = async () => {
    await AsyncStorage.setItem("password", password);
    navigation.navigate("LogHome" as never);
  };

  useEffect(() => {
    setChecks({
      characters: password.length >= 8,
      uppercase: /[A-Z]/.test(password) && /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      match: password === validatingPassword && validatingPassword.length >= 1,
    });
  }, [password, validatingPassword]);



  const allChecksPassed = Object.values(checks).every(Boolean);

  return (
    <View style={styles.container}>
      <View style={{ width: "100%", marginTop: 30, marginLeft: 20 }}>
        <CustomText style={{ fontWeight: "bold", fontSize: 32 }}>Add password</CustomText>
        <CustomText style={{ color: "rgb(110 110 110)", paddingTop: 10, width: "80%" }}>
          Please enter a new password that is unique to this app.
        </CustomText>
        <View style={{ height: 20 }} />
        <FloatingTitleTextInputField
          isPassword={true}
          attrName="Password"
          title="Password"
          value={password}
          updateMasterState={(attr, value) => setPassword(value)}
        />
        <View style={{ height: 10 }} />
        <FloatingTitleTextInputField
          isPassword={true}
          attrName="Password"
          title="Confirm Password"
          value={validatingPassword}
          updateMasterState={(attr, value) => setValidatingPassword(value)}
        />
        <View style={{ height: 10 }} />
        <CustomText style={{ fontWeight: "bold" }}>Password must include:</CustomText>
        <View style={{ height: 10 }} />
        <Check label="At least 8 characters" checked={checks.characters} onChange={() => {}} />
        <View style={{ height: 10 }} />
        <Check label="Upper and lowercase letters" checked={checks.uppercase} onChange={() => {}} />
        <View style={{ height: 10 }} />
        <Check label="A number" checked={checks.number} onChange={() => {}} />
        <View style={{ height: 10 }} />
        <Check label="A special character" checked={checks.special} onChange={() => {}} />
        <View style={{ height: 10 }} />
        <Check label="Passwords match" checked={checks.match} onChange={() => {}} />
      </View>
      <View
        style={[
          { width: "100%", alignItems: "center" },
          !allChecksPassed && { opacity: 0.5 },
        ]}
      >
        <CustomButton
          border={12}
          textcolor="white"
          title="Continue"
          color="#4f9dff"
          width={"90%"}
          height={54}
          disabled={!allChecksPassed}
          onPress={handlepassword}
        />
        <View style={{ height: "10%" }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "space-between",
    backgroundColor: "white",
  },
});
