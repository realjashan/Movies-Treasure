import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { db } from "../firebase";
import firebase from "firebase";
import { TouchableOpacity } from "react-native";
import {
  Montserrat_200ExtraLight,
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/montserrat";
import styled from "styled-components/native";
import { StatusBar } from "expo-status-bar";
import Header from "../components/Header";

const Container = styled.ScrollView`
  flex: 1;
  background-color: #000;
`;

const MovieScroll = styled.View`
  padding-left: 10px;
  margin: 30px;
  margin-left: 10px;
  flex-wrap: wrap;
  flex-direction: row;
  width: 100%;
`;

const MoviePoster = styled.Image`
  width: ${Math.round((Dimensions.get("window").width * 30) / 100)}px;
  height: 200px;
  border-radius: 10px;
`;

const MovieCard = styled.View`
  padding-right: 9px;
`;

const Warning = styled.Text`
  color: #fff;
  font-family: "Montserrat_400Regular";
  font-size: 23px;
  text-align: center;
`;

const WarningButton = styled.TouchableOpacity`
  background-color: #e7442e;
  padding: 10px;
  border-radius: 10px;
  margin: 10px;
`;

const WarningButtonText = styled.Text`
  color: white;
  font-family: "Montserrat_300Light";
  font-size: 15px;
`;

const WarningWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  position: absolute;
  z-index: 50;
  top: 40%;
`;

const MyList = () => {
  const navigation = useNavigation();

  let [fontsLoaded] = useFonts({
    Montserrat_200ExtraLight,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
  });

  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    db.collection("users")
      .doc(firebase.auth().currentUser.email)
      .collection("myList")
      .onSnapshot((snapShot) => {
        setMovies(snapShot.docs.map((doc) => doc.data()));
      });
  }, []);

  return (
    fontsLoaded && (
      <>
        <StatusBar style="light" />
        {movies?.length == 0 && (
          <WarningWrapper>
            <Warning>There are no movies in the list</Warning>
            <WarningButton
              activeOpacity={0.5}
              onPress={() => {
                navigation.navigate("Home");
              }}
            >
              <WarningButtonText>Browse Movies</WarningButtonText>
            </WarningButton>
          </WarningWrapper>
        )}
        <Container>
          <Header login={true} goBack={navigation.goBack} label="My List" />

          <MovieScroll>
            {movies?.map((movie, item) => {
              console.log(movie.banner);
              return (
                <TouchableOpacity
                  activeOpacity={0.5}
                  key={item}
                  onPress={() => {
                    navigation.navigate("ViewMovie", {
                      id: movie.movieID,
                    });
                  }}
                >
                  <MovieCard>
                    <MoviePoster
                      resizeMode="cover"
                      source={{ uri: movie.banner }}
                    />
                  </MovieCard>
                </TouchableOpacity>
              );
            })}
          </MovieScroll>
        </Container>
      </>
    )
  );
};

export default MyList;

const styles = StyleSheet.create({});
