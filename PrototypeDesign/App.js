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
        defaultGrade: "10-10-10",
        selectedGrade: "10-10-10",
        selectedGrade2: "",
        selectedGrade3: "",
        nMatchValue : 0,
        pMatchValue : 0,
        kMatchValue : 0,

        foo1: 0,
        foo2: "",
        foo3: "",

        resultText: "Nothing",
        text: "",
        nitrogenSupplied: "",




        inputLabel: ['N', 'P205', 'K20',],
        inputData: [
            [<Item>
              <TextInput
                placeholder = "Enter N value"
                onChangeText={(inputtedValue) => {this.displayInputtedNitrogen(inputtedValue); this.calculateNMatch(inputtedValue);}}
              />
             </Item>,
             <Item>
             <TextInput
               placeholder = "Enter P value"
               onChangeText={(inputtedValue) => {this.displayInputtedPhophorus(inputtedValue); this.calculatePMatch(inputtedValue)}}
             />
            </Item>,
            <Item>
            <TextInput
              placeholder = "Enter K value"
              onChangeText={(inputtedValue) => {this.displayInputtedPotassium(inputtedValue); this.calculateKMatch(inputtedValue)}}
            />
            </Item>],
      ],


        matchLabel: ['Match'],
        NPKLabel: ['N', 'P', 'K'],
        matchData: [
        [
          0,
          0,
          0,
          ],
        ],

        nutrientsSuppliedLabel: ['Nutrients Supplied'],
        nsData: [
        [
          60,
          60,
          60,
        ],
        ],
        nsData2: [
        [
          80,
          80,
          80
        ],
        ],
        nsData3: [
        [
          100,
          100,
          100
        ],
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

      //Displays the inputted amount of nitrogen into table
      displayInputtedNitrogen(inputtedValue: number)
      {
        this.setState
        ({
          nsData:
          [
          [
            inputtedValue,
            inputtedValue,
            inputtedValue,
          ],
          ],
        })
      }

      //Displays the inputted amount of phophorus into table
      displayInputtedPhophorus(inputtedValue: number)
      {
        this.setState
        ({
          nsData2:
          [
          [
            inputtedValue,
            inputtedValue,
            inputtedValue,
          ],
          ],
        })
      }

      //Displays the inputted amount of potassium into table
      displayInputtedPotassium(inputtedValue: number)
      {
        this.setState
        ({
          nsData3:
          [
          [
            inputtedValue,
            inputtedValue,
            inputtedValue,
          ],
          ],
        })
      }


      calculateNMatch(inputtedValue: number) {

        this.state.nMatchValue = inputtedValue / this.state.selectedGrade;
        this.setState({
          matchData: [
          [
            this.state.nMatchValue,
            this.state.pMatchValue,
            this.state.kMatchValue,
            ],
          ],
          })
      }

      calculatePMatch(inputtedValue: number) {

        this.state.pMatchValue = inputtedValue / this.state.selectedGrade2;
        this.setState({
          matchData: [
          [
            this.state.nMatchValue,
            this.state.pMatchValue,
            this.state.kMatchValue,
            ],
          ],
          })
      }

      calculateKMatch(inputtedValue: number) {
        this.state.kMatchValue = inputtedValue / this.state.selectedGrade3;
        this.setState({
          matchData: [
          [
            this.state.nMatchValue,
            this.state.pMatchValue,
            this.state.kMatchValue,
            ],
          ],
          })
      }

      parseValue(value) {


        if(value.charAt(2) == '-')
        {
          temp = parseInt(value.substring(0,2)) / 100;
          temp2 = parseInt(value.substring(3,5)) / 100;
          temp3 = parseInt(value.substring(6,8)) / 100;
        }


      this.setState({
          selectedGrade : temp,
          selectedGrade2: temp2,
          selectedGrade3: temp3,
          foo1: temp,
          foo2: temp2,
          foo3: temp3,
        })

      }






      buttonPressed(text: number) {
        this.setState({
          text : text * text,
          })
      }

      onValueChange(value: string) {
        this.setState({
          selectedGrade: value
          });
 }


    render() {
       const state = this.state;
      return (
        <Container>
       <Header/>
       <Content>




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
              selectedValue={this.state.defaultGrade}
              onValueChange={this.parseValue.bind(this)}
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
           <Rows data={state.nsData} textStyle={styles.text}/>
          <Rows data={state.nsData2} textStyle={styles.text}/>
          <Rows data={state.nsData3} textStyle={styles.text}/>
          <Row data={state.surplusDeficit} style={styles.head} textStyle={styles.text}/>
          <Rows data={state.sdData} />
          <Rows data={state.sdData2} />
          <Rows data={state.sdData3} />
          <Row data={state.scoreLabel} style={styles.head} textStyle={styles.text}/>
          <Rows data={state.scoreData} />
         </Table>

         <Text> {state.foo1}</Text>
         <Text> {state.foo2}</Text>
        <Text> {state.foo3}</Text>
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
