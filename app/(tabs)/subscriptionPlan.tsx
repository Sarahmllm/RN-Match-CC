import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SubscriptionPlan: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<"mois" | "année">("mois");
  const [selectedPayment, setSelectedPayment] = useState<"carte" | "apple">("apple");
  const [showCardForm, setShowCardForm] = useState<boolean>(false);
  const [cardNumber, setCardNumber] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [cvv, setCvv] = useState<string>("");

  const plans = {
    mois: "    9,99€ /mois",
    année: "   99,99€ /an"
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choisissez votre abonnement</Text>

      {/* Sélection du plan */}
      <View style={styles.planSelection}>
        <Text style={styles.subtitle}>Mois ou année?</Text>
        <View style={styles.planOptions}>
          {(["mois", "année"] as const).map((plan) => (
            <TouchableOpacity
              key={plan}
              style={[styles.planOption, selectedPlan === plan && styles.selected]}
              onPress={() => setSelectedPlan(plan)}
            >
              <Text style={styles.optionText}>{plan === "mois" ? "Mois" : "Année"}</Text>
              <Text style={styles.priceText}>{plans[plan]}</Text>
              <Ionicons 
                name={selectedPlan === plan ? "checkbox" : "square-outline"} 
                size={24} 
                color="white" 
                style={styles.checkbox} 
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Sélection du paiement */}
      <Text style={styles.subtitle}>Méthode de paiement</Text>
      <View style={styles.paymentSelection}>
        <TouchableOpacity
          style={styles.paymentOption}
          onPress={() => {
            setSelectedPayment("carte");
            setShowCardForm(true);
          }}
        >
          <Ionicons name="card" size={24} color="white" style={styles.paymentIcon} />
          <Text style={styles.optionText}>Carte bancaire</Text>
          <Ionicons 
            name={selectedPayment === "carte" ? "checkbox" : "square-outline"} 
            size={24} 
            color="white" 
            style={styles.checkbox} 
          />
        </TouchableOpacity>

        {selectedPayment === "carte" && showCardForm && (
          <View style={styles.cardForm}>
            <TextInput
              style={styles.input}
              placeholder="Numéro de carte"
              keyboardType="numeric"
              value={cardNumber}
              onChangeText={setCardNumber}
            />
            <TextInput
              style={styles.input}
              placeholder="Date d'expiration (MM/AA)"
              keyboardType="numeric"
              value={expiryDate}
              onChangeText={setExpiryDate}
            />
            <TextInput
              style={styles.input}
              placeholder="CVV"
              keyboardType="numeric"
              secureTextEntry
              value={cvv}
              onChangeText={setCvv}
            />
          </View>
        )}

        <TouchableOpacity
          style={styles.paymentOption}
          onPress={() => {
            setSelectedPayment("apple");
            setShowCardForm(false);
          }}
        >
          <Ionicons name="logo-apple" size={24} color="white" style={styles.paymentIcon} />
          <Text style={styles.optionText}>Apple Pay</Text>
          <Ionicons 
            name={selectedPayment === "apple" ? "checkbox" : "square-outline"} 
            size={24} 
            color="white" 
            style={styles.checkbox} 
          />
        </TouchableOpacity>
      </View>

      {/* Bouton de paiement */}
      <View style={styles.payButtonContainer}>
        <TouchableOpacity style={styles.payButton}>
          <Text style={styles.payButtonText}>Payer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#101010", flex: 1, justifyContent: "flex-start" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10, color: "#fff" },
  subtitle: { fontSize: 18, marginBottom: 10, textAlign: "left", color: "#fff" },
  planSelection: { flexDirection: "column", alignItems: "flex-start", marginBottom: 20 },
  planOptions: { flexDirection: "column", alignItems: "stretch", marginTop: 10 },
  planOption: { flexDirection: "row", justifyContent: "space-between", width: "100%", padding: 15, borderWidth: 1, borderColor: "#ff6f61", marginVertical: 5, alignItems: "center", borderRadius: 10 },
  optionText: { fontSize: 16, fontWeight: "bold", color: "#fff" },
  priceText: { fontSize: 14, color: "#fff" },
  checkbox: { marginLeft: "auto" },
  paymentSelection: { flexDirection: "column", alignItems: "stretch", marginBottom: 20 },
  paymentOption: { flexDirection: "row", alignItems: "center", padding: 15, backgroundColor: "#2a2625", borderWidth: 1, borderRadius: 10, minWidth: "100%", marginVertical: 5 },
  cardForm: { marginTop: 10 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 10, marginBottom: 10, width: "100%", color: "#fff" },
  inputPlaceholder: { color: "#fff" },
  payButtonContainer: { flex: 1, justifyContent: "flex-end" },
  payButton: { backgroundColor: "#ff6f61", padding: 15, borderRadius: 25, alignItems: "center", alignSelf: "center", width: "100%" },
  payButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  paymentIcon: { marginRight: 10 }
});

export default SubscriptionPlan;
