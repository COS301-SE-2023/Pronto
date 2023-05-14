import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState } from "react";
import { Card } from "react-native-paper";

addToModules = () => {};

const SearchFilter = ({ data, input, setInput }) => {
  return (
    <View style={{ marginTop: 10 }}>
      <FlatList
      
        data={data}
        renderItem={({ item }) => {
          if (
            item.code.toLowerCase().includes(input.toLowerCase()) &&
            input != ""
          ) {
            return (
              <View style={{ margin: 20 }}>
                <Card
                  style={{ height: 50, backgroundColor: "white" }}
                  onPress={addToModules}
                >
                  <Card.Content>
                    <View>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                      >
                        {item.code} : {item.name}
                      </Text>
                      <Text
                        style={{
                          height: 1,
                          marginTop: 5,
                        }}
                      ></Text>
                    </View>
                  </Card.Content>
                </Card>
              </View>
            );
          }
        }}
      />
    </View>
  );
};

export default SearchFilter;

const styles = StyleSheet.create({});
