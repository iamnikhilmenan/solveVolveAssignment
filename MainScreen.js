import React, { useState } from "react";
import {
  Platform,
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

function MainScreen(props) {
  const [foodItemList, setFoodItemList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [foodName, setFoodName] = useState("");
  const [foodPrice, setFoodPrice] = useState("");

  const onAddButtonPress = () => {
    setModalVisible(!modalVisible);
  };

  const onAddFoodItemButtonPress = () => {
    setModalVisible(!modalVisible);

    setFoodItemList((prevState) => [
      ...prevState,
      { food: foodName, price: foodPrice },
    ]);
  };

  const onDeleteButtonPress = (index) => {
    setFoodItemList((foodItemList) =>
      foodItemList.filter((_, i) => i !== index)
    );
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text style={[styles.text, { fontSize: 20, textAlign: "center" }]}>
          Food List
        </Text>

        <View style={styles.listContainer}>
          {foodItemList.map((item, index) => (
            <View style={[styles.foodContainer]}>
              <Text
                style={[styles.text, { flex: 1, textTransform: "capitalize" }]}
              >
                {item.food}
              </Text>
              <Text>
                Price <Text style={[styles.text]}>₹ {item.price}</Text>
              </Text>
              <View style={[styles.componentSeparator]}></View>
              <MaterialIcons
                name="edit"
                size={24}
                color="black"
                style={[styles.icon]}
              />
              <MaterialIcons
                name="delete"
                size={24}
                color="black"
                style={[styles.icon]}
                onPress={() => onDeleteButtonPress(index)}
              />
            </View>
          ))}

          <TouchableOpacity
            style={[styles.customAddButtonContainer]}
            onPress={onAddButtonPress}
          >
            <Entypo name="plus" size={24} color="black" style={[styles.icon]} />
            <Text style={[styles.text]}>Add Food Item</Text>
          </TouchableOpacity>
        </View>

        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={[styles.modalContainer]}>
            <Text style={[styles.text]}>Add Food</Text>
            <View style={[styles.textInputContainer]}>
              <Text style={[styles.text, { fontSize: 12 }]}>Food Name</Text>
              <TextInput
                style={[styles.textInput]}
                value={foodName}
                onChangeText={(foodName) => setFoodName(foodName)}
              />
            </View>
            <View style={[styles.textInputContainer]}>
              <Text style={[styles.text, { fontSize: 12 }]}>Food Price</Text>
              <TextInput
                style={[styles.textInput]}
                value={foodPrice}
                onChangeText={(foodPrice) => setFoodPrice(foodPrice)}
                keyboardType="numeric"
              />
            </View>
            <Button
              title="Add Food Item"
              color="green"
              onPress={onAddFoodItemButtonPress}
            />
          </View>
        </Modal>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  customAddButtonContainer: {
    alignItems: "center",
    backgroundColor: "#E1F6EC",
    borderRadius: 8,
    borderColor: "#74D6A7",
    borderWidth: 2,
    flexDirection: "row",
    paddingVertical: 6,
  },

  componentSeparator: {
    borderColor: "black",
    borderWidth: 0.2,
    height: "100%",
    marginHorizontal: 12,
  },

  container: {
    backgroundColor: "white",
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
  },

  foodContainer: {
    alignItems: "center",
    backgroundColor: "#F4F4F4",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 4,
    flexDirection: "row",
    height: 48,
    justifyContent: "space-around",
    marginBottom: "5%",
    paddingHorizontal: 12,
  },

  icon: {
    padding: 6,
  },

  listContainer: {
    margin: "5%",
  },

  modalContainer: {
    backgroundColor: "#74D6A7",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    bottom: 0,
    padding: 18,
    position: "absolute",
    width: "100%",
  },

  text: {
    fontSize: 16,
    fontWeight: "bold",
  },

  textInputContainer: {
    marginVertical: 12,
  },

  textInput: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 16,
    padding: 8,
  },
});

export default MainScreen;
