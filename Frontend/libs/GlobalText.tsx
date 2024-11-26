import React from "react";
import { Text, TextProps } from "react-native";

// Surcharge globale
export const GlobalText = (props: TextProps) => {
  return (
    <Text
      {...props}
      style={[
        { fontFamily: "HelveticaNeueMedium", color: "black" }, // Styles par défaut
        props.style, // Permet de surcharger avec des styles spécifiques
      ]}
    />
  );
};

export default GlobalText;