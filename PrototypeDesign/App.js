/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import { TextInput, StyleSheet, View,  } from 'react-native'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
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
        tableHead: ['N', 'P205', 'K20',],
      tableData: [
        [<Item>
          <Input placeholder = "N"/>
        </Item>, <Item>
          <Input placeholder="P" />
        </Item>, <Item>
          <Input placeholder="K" />
        </Item>],


      ]
      };

    }

      buttonPressed(text) {
        this.setState({
            resultText: text,

          })
      }


    render() {
       const state = this.state;
      return (
        <Container>
       <Header />
       <Content>
       <Text> Recommendation from soil test report</Text>
       <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
         <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
         <Rows data={state.tableData} textStyle={styles.text}/>
       </Table>
         <Form>

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
         <View style={styles.container}>

      </View>
       </Content>
     </Container>
      );
    }
  }


  const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 }
});
