import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import firebase from "firebase";
import {
  useFonts,
  Montserrat_200ExtraLight,
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
} from "@expo-google-fonts/montserrat";
import {
  AntDesign,
  MaterialIcons,
  Ionicons,
  Feather,
} from "@expo/vector-icons";
import styled from "styled-components/native";
import { Video } from "expo-av";
import { StatusBar } from "expo-status-bar";
import Header from "../components/Header";

const Container = styled.ScrollView`
  flex: 1;
  background-color: #000;
`;

const HeaderIcons = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  color: white;
  font-size: 24px;
  margin: 10px;
  font-family: "Montserrat_700Bold";
`;

const MovieBadge = styled.Text`
  color: #a2a2a2;
  background-color: #373737;
  padding: 2px;
  border-radius: 5px;
  width: 38px;
  text-align: center;
  margin: 15px;
`;

const Subtitle = styled.Text`
  color: #a2a2a2;
  margin: 5px;
`;

const Button = styled.TouchableOpacity`
  align-items: center;
`;
const TextButton = styled.Text`
  color: #fff;
  font-size: 13px;
  margin-top: 3px;
`;

const MovieSubDetails = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: -17px;
`;

const Play = styled.TouchableOpacity`
  flex-direction: row;
  background-color: #fff;
  width: 95%;
  height: 32px;
  border-radius: 2px;
  align-items: center;
  justify-content: center;
  margin: 10px;
`;

const TextButtonPlay = styled.Text`
  font-size: 15px;
  font-weight: bold;
  padding-left: 5px;
`;

const Download = styled.TouchableOpacity`
  flex-direction: row;
  background-color: #262626;
  width: 95%;
  height: 32px;
  border-radius: 2px;
  align-items: center;
  justify-content: center;
`;

const TextButtonDownload = styled.Text`
  font-size: 15px;
  font-weight: 700;
  color: white;
  padding-left: 5px;
`;

const ActionButtons = styled.View`
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const MovieDescription = styled.Text`
  color: white;
  width: 98%;
  margin-left: 10px;
  margin: 10px;
  font-weight: 100;
  font-family: "Montserrat_300Light";
  line-height: 20px;
  margin-top: 25px;
`;

const Tag = styled.Text`
  color: #fff;
  font-family: "Montserrat_400Regular";
`;

const TagDot = styled.View`
  margin: 10px;
  background-color: white;
  height: 2px;
  width: 2px;
`;

const Tags = styled.View`
  flex-direction: row;
  justify-content: center;
  margin: 10px 0 5px 3px;
  align-items: center;
  flex-wrap: wrap;
  width: 99%;
`;

const TagWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ActionButtons2 = styled.View`
  flex-direction: row;
  justify-content: center;
  margin: 20px;
  align-items: center;
`;

const ActionButton = styled.TouchableOpacity`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px;

  margin-top: 20px;
`;

const ActionButtonLabel = styled.Text`
  color: white;
  font-family: "Montserrat_300Light";
  font-size: 15px;
`;

const ViewMovie = ({ navigation, route }) => {
  const [user, setUser] = useState(null);
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.collection("users")
      .doc(firebase.auth().currentUser.email)
      .onSnapshot((doc) => {
        if (doc.exists) {
          setUser(doc.data());
        }
      });
  }, []);

//   useEffect(() => {
//     db.collection("movies")
//       .doc(route.params.id)
//       .onSnapshot((doc) => {
//         setMovies(doc.data());
//       });

//     setLoading(false);
//   }, [route]);

useEffect(() => {
    db.collection('movies').doc(route.params.id).onSnapshot(doc => {
        setMovies(doc.data());
    })

    setLoading(false);
}, [route])

  let [fontsLoaded] = useFonts({
    Montserrat_200ExtraLight,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
  });

  return fontsLoaded && !loading ? (
    <>
      <StatusBar style="light" />
      <Container>
        <Header login={true} goBack={navigation.goBack} />
        <Video
          source={{
            uri: movies?.videoUrl,
          }}
          isMuted={false}
          shouldPlay={true}
          style={{ height: 225, marginTop: 15 }}
          resizeMode="contain"
          usePoster={true}
          posterSource={{ uri: movies?.banner }}
          useNativeControls={true}
        />

        <Title>{movies?.name}</Title>
        <MovieSubDetails>
          <MovieBadge>13+</MovieBadge>
          <Subtitle>{movies?.yearOfRelease}</Subtitle>
        </MovieSubDetails>

        <ActionButton>
          <Play activeOpacity={0.5}>
            <Ionicons size={26} name="ios-play" />
            <TextButtonPlay>Play</TextButtonPlay>
          </Play>

          <Download activeOpacity={0.5}>
            <Feather
              name="download"
              size={24}
              style={{ color: "white", margin: 4 }}
            />
            <TextButtonDownload>Download</TextButtonDownload>
          </Download>
        </ActionButton>
        <MovieDescription>{movies?.description}</MovieDescription>

        <Tags>
          {movies?.tags.map((tag, i) => {
            if (i + 1 == movies?.tags.length) {
              return (
                <TagWrapper>
                  <Tag>{tag}</Tag>
                </TagWrapper>
              );
            } else {
              return (
                <TagWrapper>
                  <Tag>{tag}</Tag>
                  <TagDot />
                </TagWrapper>
              );
            }
          })}
        </Tags>

        <ActionButtons2>
          {movies && user?.list.includes(movies.id) ? (
            <ActionButton
              activeOpacity={0.5}
              onPress={() => {
                db.collection("users")
                  .doc(firebase.auth().currentUser.email)
                  .collection("myList")
                  .doc(movies.id)
                  .delete();

                var list = user.list;
                list.splice(list.indexOf(movies.id), 1);

                db.collection("users")
                  .doc(firebase.auth().currentUser.email)
                  .update({
                    list,
                  });
              }}
            >
              <Feather name="check" size={35} color="white" />
              <ActionButtonLabel>My List</ActionButtonLabel>
            </ActionButton>
          ) : (
            <ActionButton
              activeOpacity={0.5}
              onPress={() => {
                db.collection("users")
                  .doc(firebase.auth().currentUser.email)
                  .collection("myList")
                  .doc(movies.id)
                  .set({
                    movieID: movies.id,
                    banner: movies.banner,
                  });

                var list = user.list;
                list.push(movies.id);

                db.collection("users")
                  .doc(firebase.auth().currentUser.email)
                  .update({
                    list,
                  });
              }}
            >
              <Ionicons name="add-outline" size={35} color="white" />
              <ActionButtonLabel>My List</ActionButtonLabel>
            </ActionButton>
          )}
          <ActionButton activeOpacity={0.5}>
            <AntDesign
              name="like2"
              size={30}
              color="white"
              style={{ marginBottom: 7 }}
            />
            <ActionButtonLabel>Rate</ActionButtonLabel>
          </ActionButton>
          <ActionButton activeOpacity={0.5}>
            <AntDesign
              name="sharealt"
              size={27}
              color="white"
              style={{ marginBottom: 7 }}
            />
            <ActionButtonLabel>Share</ActionButtonLabel>
          </ActionButton>
        </ActionButtons2>
      </Container>
    </>
  ) : (
    <Container />
  );
};

export default ViewMovie;
