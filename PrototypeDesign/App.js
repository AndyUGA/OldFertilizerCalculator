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
  Icon,
  Picker,
  } from 'native-base';





  export default class App extends Component {


    constructor(props) {
      super(props)




      this.state = {
        sampleData: [],
        selected: "10-10-10",
        selectedGrade: "",
        resultText: "Nothing",


        inputLabel: ['N', 'P205', 'K20',],
        inputData: [
            [<Item>
              <Input placeholder = "0"/>
             </Item>,
             <Item>
              <Input placeholder="0" />
            </Item>,
            <Item>
              <Input placeholder="0" />
            </Item>],
      ],


        matchLabel: ['Match'],
        NPKLabel: ['N', 'P', 'K'],
        matchData: [
        [<Text>
          600
         </Text>,
         <Text>
          800
         </Text>,
         <Text>
          1000
         </Text>],
        ],

        nutrientsSuppliedLabel: ['Nutrients Supplied'],
        nsData: [
        [<Text>
          60
         </Text>,
         <Text>
          60
         </Text>,
         <Text>
          60
         </Text>],
        ],
        nsData2: [
        [<Text>
          80
         </Text>,
         <Text>
          80
         </Text>,
         <Text>
          80
         </Text>],
        ],
        nsData3: [
        [<Text>
          100
         </Text>,
         <Text>
          100
         </Text>,
         <Text>
          100
         </Text>],
        ],

        surplusDeficit: ['Nutrients Surplus or Deficit'],
        sdData: [
        [<Text style = {styles.green}>
          0
         </Text>,
         <Text style = {styles.red}>
          20
         </Text>,
         <Text style = {styles.red}>
          40
         </Text>],
        ],
        sdData2: [
        [<Text style={styles.blue}>
          20
         </Text>,
         <Text style = {styles.green}>
          0
         </Text>,
         <Text style = {styles.red}>
          20
         </Text>],
        ],
        sdData3: [
        [<Text style = {styles.blue}>
          40
         </Text>,
         <Text style = {styles.blue}>
          20
         </Text>,
         <Text style = {styles.green}>
          0
         </Text>],
        ],

        scoreLabel: ['Score'],
        scoreData: [
        [<Text>
          87
         </Text>,
         <Text>
          93
         </Text>,
         <Text>
          91
         </Text>],
        ],
      };

    }

    _onPressButton() {
      console.log('164');

      return fetch('https://impartial-honey.glitch.me/notes')

      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
            sampleData: responseJson[0].content,

          })
        console.log(responseJson);
        })
        .catch((error) => {
          console.error(error);
      });

}


      buttonPressed() {
        this.setState({
          sampleData : 3,
          })
      }

      onValueChange(value: string) {
        this.setState({
          selected: value
          });
 }


    render() {
       const state = this.state;
      return (
        <Container>
       <Header/>
       <Content>


       <Button onPress={this._onPressButton.bind(this)}>
           <Text>Click Me!</Text>
         </Button>
         <Text> Sample data is {state.sampleData} </Text>

       <Text style = {styles.text}> Recommendation from soil test report</Text>
       <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
         <Row data={state.inputLabel} style={styles.head} textStyle={styles.text}/>
         <Rows data={state.inputData} textStyle={styles.text}/>
       </Table>
         <Form >
         <Picker
              mode="dropdown"
              iosHeader="Select Grade"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: undefined }}
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Picker.Item label="10-10-10" value="10-10-10" />
              <Picker.Item label="5-5-5" value="5-5-5" />
              <Picker.Item label="0-10-0" value="0-10-0" />
              <Picker.Item label="15-0-15" value="15-0-15" />
            </Picker>



         </Form>
         <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
           <Row data={state.matchLabel} style={styles.head} textStyle={styles.text}/>
           <Row data={state.NPKLabel} style={styles.head} textStyle={styles.text}/>
           <Rows data={state.matchData} textStyle={styles.text}/>
           <Row data={state.nutrientsSuppliedLabel} style={styles.head} textStyle={styles.text}/>
           <Rows data={state.nsData}/>
          <Rows data={state.nsData2} />
          <Rows data={state.nsData3} />
          <Row data={state.surplusDeficit} style={styles.head} textStyle={styles.text}/>
          <Rows data={state.sdData} />
          <Rows data={state.sdData2} />
          <Rows data={state.sdData3} />
          <Row data={state.scoreLabel} style={styles.head} textStyle={styles.text}/>
          <Rows data={state.scoreData} />
         </Table>


       </Content>
     </Container>
      );
    }
  }


  const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6, textAlign: 'center', },
  red: {color: 'red'},
  blue: {color: 'blue'},
  green: {color: 'green'},
});
