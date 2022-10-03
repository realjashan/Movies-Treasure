import { View, Text, Dimensions } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../components/Header";
import { auth, db } from '../firebase'
import firebase from 'firebase';
import HeaderTabs from "../components/HeaderTabs";
import Hero from "../components/Hero";
import Movies from "../components/Movies";


const Container = styled.ScrollView`
  flex: 1;
  background-color: #000;
`;

const Poster = styled.ImageBackground`
  width: 100%;
  height: ${(Dimensions.get("window").height * 81) / 100}px;
`;

const Gradient = styled(LinearGradient)`
  height: 101%;
`;

const Home = ({navigation}) => {
const[movies,setMovies]=useState(null);
const [user,setUsers]=useState(null);


useLayoutEffect(() => {
 db.collection('users').doc(firebase.auth().currentUser.email).onSnapshot(doc=>{
    if(doc.exists){
        setUsers(doc.data())
    }
 })
}, [firebase.auth().currentUser])



useLayoutEffect(() => {
 const unsubscribe=db.collection('movies').onSnapshot((snapshot)=>setMovies(snapshot.docs.map((doc)=>(
    {
        id:doc.id,
        data:doc.data(),

    }
 ))));
 return unsubscribe;
}, [])






  return (
    <>
      <StatusBar style="light" />
      <Container>
        <Poster
          source={{
            uri: "https://cdn.vox-cdn.com/thumbor/9PqzVk9RnfW0g22byhIyRSPDBYM=/1400x0/filters:no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/8832449/strangerthings.jpg",
          }}
        >
          <Gradient
            locations={[0, 0.2, 0.5, 0.94]}
            colors={[
              "rgba(0,0,0,0.5)",
              "rgba(0,0,0,0.0)",
              "rgba(0,0,0,0.0)",
              "rgba(0,0,0,1)",
            ]}
          >
            <Header login={true} navigation={navigation} />
           <HeaderTabs/>
           <Hero user={user}/>  
           
          </Gradient>
        </Poster>

{
    movies && (
        <React.Fragment>
          	<Movies label='Popular on Netflix' item={movies} />
							<Movies label='US Movies' item={movies} />
							<Movies label='Crime TV Shows' item={movies} />


        </React.Fragment>
    )
}



      </Container>
    </>
  );
};

export default Home;
