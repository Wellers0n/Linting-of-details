import React, { useState } from "react";
import { AsyncStorage, View, Alert, Text } from "react-native";
import { Form } from "native-base";
import styled from "styled-components";
import Input from "./../components/input";
import { graphql, commitMutation } from "react-relay";
import Environment from "./../relay/environment";
import Button from "./../components/button";
import Icon from "react-native-vector-icons/Ionicons";
import { NavigationScreenProp } from "react-navigation";

// navigationOption
export const navigationOptionsLogin = ({navigation}: Props) => ({
  headerStyle: {
    backgroundColor: "#3479ff"
  },
  headerTitle: (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          color: "white",
          fontWeight: "500",
          fontSize: 24,
          alignSelf: "center"
        }}
      >
        Login
      </Text>
    </View>
  ),
  headerLeft: <View style={{ flex: 1 }} />,
  headerRight: <View style={{ flex: 1 }} />
});

// styled's
const Container = styled(View)`
  height: 100%;
  background: #463064;
  justify-content: flex-start;
  align-items: center;
`;

const ContainerForm = styled(Form)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
`;

const ContainerButton = styled(View)`
  display: flex;
  margin-top: 40px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ButtonRegister = styled(Button)`
  margin-right: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35%;
`;
const ButtonLogin = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35%;
`;

const IconMeteor = styled(Icon)`
  padding: 20px 0px;
  font-size: 150px;
  color: white;
`;

type Props = {
  navigation: NavigationScreenProp<any, any>;
};

// main
const Login = ({ navigation }: Props) => {
  const [email, setEmail] = useState("wellerson.coffee@gmail.com");
  const [password, setPassword] = useState("123");

  // mutation query
  const mutation = graphql`
    mutation LoginQuery($input: singInMutationInput!) {
      signInMutation(input: $input) {
        token
        error
      }
    }
  `;

  // set token in the localStorage
  const _storeData = async (token: string) => {
    try {
      await AsyncStorage.setItem("token", token);
    } catch (error) {
      // Error saving data
      Alert.alert(error);
    }
  };

  // function mutation login
  const loginIn = () => {
    commitMutation(Environment, {
      mutation,
      variables: { input: { email, password } },
      onCompleted: async (response: any, errors: any) => {
        if (errors) {
          Alert.alert(errors.toString());
        }

        const token = response.signInMutation.token;
        if (token) {
          _storeData(token);
          return navigation.navigate("HomeDrawerScreen");
        }
        Alert.alert(response.signInMutation.error.toString());
      },

      onError: (err: any) => {
        return Alert.alert(err.toString());
      }
    });
  };

  // change email and password
  function _inputChange(email: any, password: any) {
    if (email) {
      setEmail(email);
    } else {
      setPassword(password);
    }
  }

  // render()
  return (
    <Container>
      <IconMeteor name="md-planet" />
      <ContainerForm>
        <Input
          tintColor="white"
          nameInput="Email"
          value={email}
          onChangeText={(value: any) => _inputChange(value, null)}
        />
        <Input
          nameInput="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(value: any) => _inputChange(null, value)}
        />
        <ContainerButton>
          <ButtonRegister
            light
            onPress={() => navigation.navigate("RegisterScreen")}
            color="#463064"
            nameButton="register"
          />
          <ButtonLogin
            light
            bordered
            onPress={loginIn}
            color="#463064"
            nameButton="login"
          />
        </ContainerButton>
      </ContainerForm>
    </Container>
  );
};

export default Login;
