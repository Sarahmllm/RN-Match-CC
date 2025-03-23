import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const MatchTopBar = () => {
  const navigation = useNavigation();

  const handleNavigation = () => {
    navigation.navigate("SubscriptionPlan");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.navTitle}>Match</Text>
      <TouchableOpacity onPress={handleNavigation}>
        <Ionicons name="star" size={30} color="gold" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    height: 60,
    backgroundColor: "#181818",
    borderBottomWidth: 1,
    borderBottomColor: "#181818",
    width: "100%",
  },
  navTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color:'#fff',
    flex: 1,  
  },
});

export default MatchTopBar;
