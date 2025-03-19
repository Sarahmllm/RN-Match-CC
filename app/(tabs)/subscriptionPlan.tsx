import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const SubscriptionPlan = () => {
  const plans = [
    { name: "Basic", price: "Gratuit", description: "Accédez aux fonctionnalités de base et matchez avec des amis." },
    { name: "Premium", price: "9,99€/mois", description: "Profitez de matchs illimités et d'une meilleure visibilité." },
    { name: "Elite", price: "19,99€/mois", description: "Bénéficiez d'un boost quotidien et d'une mise en avant prioritaire." }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choisissez votre abonnement</Text>
      {plans.map((plan, index) => (
        <View key={index} style={styles.planContainer}>
          <Text style={styles.planTitle}>{plan.name}</Text>
          <Text style={styles.price}>{plan.price}</Text>
          <Text style={styles.description}>{plan.description}</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>S'abonner</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  planContainer: { marginBottom: 15, padding: 15, borderRadius: 10, backgroundColor: "#f7f7f7", alignItems: "center" },
  planTitle: { fontSize: 18, fontWeight: "bold" },
  price: { fontSize: 16, color: "#555", marginVertical: 5 },
  description: { fontSize: 14, textAlign: "center", marginBottom: 10 },
  button: { backgroundColor: "#ff6f61", padding: 10, borderRadius: 5 },
  buttonText: { color: "#fff", fontWeight: "bold" },
});

export default SubscriptionPlan;
