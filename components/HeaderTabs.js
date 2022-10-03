import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";

const Container=styled.View`
justify-content:space-between;
flex-direction:row;
align-items:center;
padding:25px 50px 0 50px;
width:100%;


`

const Tab=styled.Text`
font-size:20px;
font-weight:500;
color:#fff;

`




const HeaderTabs = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <TouchableOpacity activeOpacity={0.5}>
        <Tab>TV Shows</Tab>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.5}>
        <Tab> Movies</Tab>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.5} onPress={()=>{
        navigation.navigate('MyList')
      }}>
        <Tab>My List</Tab>
      </TouchableOpacity>
    </Container>
  );
};

export default HeaderTabs;
