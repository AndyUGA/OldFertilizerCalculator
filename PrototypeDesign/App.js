/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import { TextInput } from 'react-native'
import {
  Container,
  Header,
  Content,
  Button,
  Text,
  Form,
  Item,
  Input,
  ListItem,
  CheckBox,
  Body,
  } from 'native-base';





  export default class App extends Component {


    constructor() {
      super()

      this.state = {
        resultText: "Nothing",
      };

    }

      buttonPressed(text) {
        this.setState({
            resultText: text,

          })
      }


    render() {
      return (
        <Container>
       <Header />
       <Content>
       <Text> Recommendation from soil test report</Text>
         <Form>
           <Item>
             <Input placeholder="N" />
           </Item>
           <Item last>
             <Input placeholder="P" />
           </Item>
           <Item last>
             <Input placeholder="K" />
           </Item>
           <Text> Grades </Text>
           <ListItem>
            <CheckBox onPress = {() => this.buttonPressed("10-10-10")}/>
            <Body>
              <Text> 10-10-10</Text>
            </Body>
          </ListItem>
          <ListItem>
            <CheckBox onPress = {() => this.buttonPressed("5-5-5")}  />
            <Body>
              <Text> 5-5-5</Text>
            </Body>
          </ListItem>
          <ListItem>
            <CheckBox color="green"/>
            <Body>
              <Text> 0-10-10</Text>
            </Body>
          </ListItem>

           <Button onPress = {() => this.buttonPressed()} >
            <Text>Calculate</Text>

          </Button>
         </Form>
         <Text> {this.state.resultText}</Text>
       </Content>
     </Container>
      );
    }
  }
