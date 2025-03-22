import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SubscriptionPlan = () => {
  const [selectedPlan, setSelectedPlan] = useState("mois");
  const [selectedPayment, setSelectedPayment] = useState("apple");

  const plans = {
    mois: "    9,99€/mois",
    année: "    99,99€/an"
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choisissez votre abonnement</Text>
      
      <View style={styles.planSelection}>
        <Text style={styles.subtitle}>Mois ou année?</Text>

        <View style={styles.planOptions}>
          <TouchableOpacity
            style={[styles.planOption, selectedPlan === "mois" && styles.selected]}
            onPress={() => setSelectedPlan("mois")}
          >
            <Text style={styles.optionText}>Mois</Text>
            <Text style={[styles.priceText, styles.pricePosition]}>{plans.mois}</Text>
            <Ionicons name={selectedPlan === "mois" ? "checkbox" : "square-outline"} size={24} color="black" style={styles.checkbox} />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.planOption, selectedPlan === "année" && styles.selected]}
            onPress={() => setSelectedPlan("année")}
          >
            <Text style={styles.optionText}>Année</Text>
            <Text style={[styles.priceText, styles.pricePosition]}>{plans.année}</Text>
            <Ionicons name={selectedPlan === "année" ? "checkbox" : "square-outline"} size={24} color="black" style={styles.checkbox} />
          </TouchableOpacity>
        </View>
      </View>
      
      <Text style={styles.subtitle}>Méthode de paiement</Text>
      <View style={styles.paymentSelection}>
        <TouchableOpacity
          style={styles.paymentOption}
          onPress={() => setSelectedPayment("carte")}
        >
          <Text style={styles.optionText}>Carte Bancaire</Text>
          <Ionicons name={selectedPayment === "carte" ? "checkbox" : "square-outline"} size={24} color="black" style={styles.checkbox} />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.paymentOption}
          onPress={() => setSelectedPayment("apple")}
        >
          <Text style={styles.optionText}>Apple</Text>
          <Ionicons name={selectedPayment === "apple" ? "checkbox" : "square-outline"} size={24} color="black" style={styles.checkbox} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.payButtonContainer}>
        <TouchableOpacity style={styles.payButton}>
          <Text style={styles.payButtonText}>Payer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    padding: 20, 
    backgroundColor: "#fff", 
    flex: 1, 
    justifyContent: "flex-start" 
  },
  title: { 
    fontSize: 22, 
    fontWeight: "bold", 
    marginBottom: 10, 
    textAlign: "center" 
  },
  subtitle: { 
    fontSize: 18, 
    marginBottom: 10, 
    textAlign: "left" 
  },
  planSelection: { 
    flexDirection: "column", 
    alignItems: "flex-start", 
    marginBottom: 20
  },
  planOptions: {
    flexDirection: "column",
    alignItems: "stretch", 
    marginTop: 10
  },
  planOption: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    width: "100%", 
    paddingVertical: 25, 
    paddingHorizontal: 15, 
    borderWidth: 1, 
    borderColor: "#ddd", 
    marginVertical: 5, 
    alignItems: "center", 
    borderRadius: 10,
    position: "relative", 
  },
  selected: {
    backgroundColor: "#f0f0f0", 
  },
  optionText: { 
    fontSize: 16, 
    fontWeight: "bold", 
    color: "#000" 
  },
  priceText: { 
    fontSize: 14, 
    color: "#555", 
  },
  pricePosition: {
    position: "absolute", 
    bottom: 10, 
  },
  checkbox: { 
    marginLeft: "auto" 
  },
  paymentSelection: { 
    flexDirection: "column", 
    alignItems: "stretch", 
    marginBottom: 20 
  },
  paymentOption: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    padding: 15, 
    borderWidth: 1, 
    borderColor: "#ddd", 
    borderRadius: 10, 
    minWidth: "100%", 
    marginVertical: 5, 
    alignItems: "center" 
  },
  payButtonContainer: { 
    flex: 1, 
    justifyContent: "flex-end" 
  },
  payButton: { 
    backgroundColor: "#ff6f61", 
    padding: 15, 
    borderRadius: 25, 
    alignItems: "center", 
    alignSelf: "center", 
    width: "100%" 
  },
  payButtonText: { 
    color: "#fff", 
    fontSize: 18, 
    fontWeight: "bold" 
  },
});

export default SubscriptionPlan;
