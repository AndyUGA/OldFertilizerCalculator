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

import {rpd} from './Helper.js';
import {calc} from './Helper.js';
import {supplied} from './Helper.js';


  export default class App extends Component {


    constructor(props) {
      super(props)


      var allowUserInput = false;


      this.state = {
        grades: [],
        resultNum :0,
        someNum : 0,

        matchN: 0,
        matchP: 0,
        matchK: 0,

        suppliedNum1 : 0,
        suppliedNum2 : 0,
        suppliedNum3 : 0,

        suppliedNum4 : 0,
        suppliedNum5 : 0,
        suppliedNum6 : 0,

        suppliedNum7 : 0,
        suppliedNum8 : 0,
        suppliedNum9 : 0,

        score1: 0,
        score2: 0,
        score3: 0,

        defaultGrade: "",
        percentGrade1: "",
        percentGrade2: "",
        percentGrade3: "",

        nMatchValue : 0,
        pMatchValue : 0,
        kMatchValue : 0,

        foo1: "",
        foo2: "",
        foo3: "",

        resultText: "Nothing",
        text: "",
        nitrogenSupplied: "",

        nitrogenInput : 0,
        phophorusInput : 0,
        potassiumInput : 0,

        ns00: 0,
        ns01: 0,
        ns02: 0,
        ns10: 0,
        ns11: 0,
        ns12: 0,
        ns20: 0,
        ns21: 0,
        ns22: 0,




        //comment 2
        inputLabel: ['N', 'P205', 'K20',],
        inputData: [
            [<Item>
              <TextInput

                //editable = {allowUserInput}
                placeholder = "Enter N value"
                onChangeText={(inputtedValue) => {this.displayInputtedNitrogen(inputtedValue); this.calculateNMatch(inputtedValue);}}
              />
             </Item>,
             <Item>
             <TextInput
               //editable = {allowUserInput}
               placeholder = "Enter P value"
               onChangeText={(inputtedValue) => {this.displayInputtedPhophorus(inputtedValue); this.calculatePMatch(inputtedValue)}}
             />
            </Item>,
            <Item>
            <TextInput
              //editable = {allowUserInput}
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
        //ns = Nutrients Supplied
        nsData: [
        [
          0,
          0,
          0,
        ],
        ],
        nsData2: [
        [
          0,
          0,
          0
        ],
        ],
        nsData3: [
        [
          0,
          0,
          0
        ],
        ],

        surplusDeficit: ['Nutrients Surplus or Deficit'],
        //sd = surplusDeficit
        sdData: [
        [<Text style = {styles.green}>
          0
         </Text>,
         <Text style = {styles.red}>
          0
         </Text>,
         <Text style = {styles.red}>
          0
         </Text>],
        ],
        sdData2: [
        [<Text style={styles.blue}>
          0
         </Text>,
         <Text style = {styles.green}>
          0
         </Text>,
         <Text style = {styles.red}>
          0
         </Text>],
        ],
        sdData3: [
        [<Text style = {styles.blue}>
          0
         </Text>,
         <Text style = {styles.blue}>
          0
         </Text>,
         <Text style = {styles.green}>
          0
         </Text>],
        ],

        scoreLabel: ['Score'],
        scoreData: [
        [<Text>
          0
         </Text>,
         <Text>
          0
         </Text>,
         <Text>
          0
         </Text>],
        ],
      };

    }






    calculateSD()
    {
      this.setState({
        ns00: this.state.nitrogenInput - this.state.nitrogenInput,
        ns01: this.state.nitrogenInput - this.state.phophorusInput,
        ns02: this.state.nitrogenInput - this.state.potassiumInput,
        foo1: this.state.nitrogenInput +  " - " + this.state.potassiumInput,

        ns10: this.state.phophorusInput - this.state.nitrogenInput,
        ns11: this.state.phophorusInput - this.state.phophorusInput,
        ns12: this.state.phophorusInput - this.state.potassiumInput,

        ns20: this.state.potassiumInput - this.state.nitrogenInput,
        ns21: this.state.potassiumInput - this.state.phophorusInput,
        ns22: this.state.potassiumInput - this.state.potassiumInput,
        sdData:
        [
        [
          this.state.ns00,
          this.state.ns01,
          this.state.ns02,
        ],
        ],
        sdData2:
        [
        [
          this.state.ns10,
          this.state.ns11,
          this.state.ns12,
        ],
        ],
        sdData3:
        [
        [
          this.state.ns20,
          this.state.ns21,
          this.state.ns22,
        ],
        ],
        })
    }

    //Displays the inputted amount of nitrogen into table
    displayInputtedNitrogen(inputtedValue: number)
    {

      this.setState ({
        nitrogenInput : inputtedValue,
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
        phophorusInput: inputtedValue,
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
        potassiumInput: inputtedValue,
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

    //Calculates Nitrogen Match value
    calculateNMatch(inputtedValue: number) {

      this.state.nMatchValue = inputtedValue / this.state.percentGrade1;
      this.setState({
        matchData: [
        [
          this.state.nMatchValue,
          this.state.pMatchValue,
          this.state.kMatchValue,
          ],
        ],
        })
        this.calculateSD();
    }

    //Calculates Phophorus match value
    calculatePMatch(inputtedValue: number) {

      this.state.pMatchValue = inputtedValue / this.state.percentGrade2;
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

    //Calculates Potassium match value
    calculateKMatch(inputtedValue: number) {

      this.state.kMatchValue = inputtedValue / this.state.percentGrade3;
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



    refresh() {
      this.setState({
        inputData: [
            [<Item>
              <TextInput
                editable = {allowUserInput}
                placeholder = "Enter N value"
                onChangeText={(inputtedValue) => {this.displayInputtedNitrogen(inputtedValue); this.calculateNMatch(inputtedValue);}}
              />
             </Item>,
             <Item>
             <TextInput
               editable = {allowUserInput}
               placeholder = "Enter P value"
               onChangeText={(inputtedValue) => {this.displayInputtedPhophorus(inputtedValue); this.calculatePMatch(inputtedValue)}}
             />
            </Item>,
            <Item>
            <TextInput
              editable = {allowUserInput}
              placeholder = "Enter K value"
              onChangeText={(inputtedValue) => {this.displayInputtedPotassium(inputtedValue); this.calculateKMatch(inputtedValue)}}
            />
            </Item>],
      ]
        })
    }

    //Parses value from grade that is selected
    parseValue(value) {
      allowUserInput = true;
      //this.refresh();
      this.state.defaultGrade = value;
      var j = 0;
      var tempNum = "";
      for (i = 0; i < value.length; i++) {
          currentChar = value.charAt(i);
          if(currentChar != '-')
          {
            tempNum += value.charAt(i)
          }
          if(currentChar == '-' || i == (value.length - 1))
          {
            this.state.grades[j] = tempNum;
            j++;
            tempNum = "";
          }

      }








    this.setState({

        matchN: +this.state.grades[0] ? this.state.nitrogenInput / +this.state.grades[0] *100 : 0,
        matchP: +this.state.grades[1] ? this.state.phophorusInput / +this.state.grades[1] *100 : 0,
        matchK: +this.state.grades[2] ? this.state.potassiumInput / +this.state.grades[2] *100 : 0,
        percentGrade1: parseInt(this.state.grades[0]) / 100,
        percentGrade2: parseInt(this.state.grades[1]) / 100,
        percentGrade3: parseInt(this.state.grades[2]) / 100,
        foo1: parseInt(this.state.grades[0]) / 100,
        foo2: parseInt(this.state.grades[1]) / 100,
        foo3: parseInt(this.state.grades[2]) / 100,
      })

    }


    quickFunction()
    {
      this.setState({

          suppliedNum1 : supplied(this.state.matchN, this.state.grades[0]),
          suppliedNum2 : supplied(this.state.matchN, this.state.grades[1]),
          suppliedNum3 : supplied(this.state.matchN, this.state.grades[2]),

          suppliedNum4 : supplied(this.state.matchP, this.state.grades[0]),
          suppliedNum5 : supplied(this.state.matchP, this.state.grades[1]),
          suppliedNum6 : supplied(this.state.matchP, this.state.grades[2]),

          suppliedNum7 : supplied(this.state.matchK, this.state.grades[0]),
          suppliedNum8 : supplied(this.state.matchK, this.state.grades[1]),
          suppliedNum9 : supplied(this.state.matchK, this.state.grades[2]),


          score1 :calc(this.state.suppliedNum1,this.state.suppliedNum2,this.state.suppliedNum3,+this.state.nitrogenInput,+this.state.phophorusInput,+this.state.potassiumInput),
          score2 :calc(this.state.suppliedNum4,this.state.suppliedNum5,this.state.suppliedNum6,+this.state.nitrogenInput,+this.state.phophorusInput,+this.state.potassiumInput),
          score3 :calc(this.state.suppliedNum7,this.state.suppliedNum8,this.state.suppliedNum9,+this.state.nitrogenInput,+this.state.phophorusInput,+this.state.potassiumInput),
          scoreData: [
          [<Text>
            {this.state.score1}
           </Text>,
           <Text>
            {this.state.score2}
           </Text>,
           <Text>
            {this.state.score3}
           </Text>],
          ]

        })

    }



    rpd = (v1,v2) => this.setState({
      resultNum: this.calcScore(10,10,10),
    })


     calcScore = (sn, sp, sk) => {
       let sc;

       if (sn + sp + sk == 0) {
         return 0;
       }
       sc = 100;

       if (10 > 0 && sn == 0) {
         sc -= 25;
       } else if (10 > 0 && (sn < 0.9 * 10 || sn > 1.1 * 10)) {
         sc -= 10 * this.rpd(sn, 10);
       } else {
         sc -= 5 * this.rpd(sn, 10);
       }

       if (20 > 0 && sp == 0) {
         sc -= 25;
       } else if (sp > 20 * 1.05) {
         sc -= 20 * this.rpd(sp, 20);
       } else {
         sc -= 10 * this.rpd(sp, 20);
       }

       if (30 > 0 && sk == 0) {
         sc -= 25;
       } else if (sk < 30) {
         sc -= 20 * this.rpd(sk, 30);
       } else {
         sc -= 10 * this.rpd(sk, 30);
       }

       this.setState({
            resultNum: sc,
         })
     }






    render() {
       const state = this.state;
      return (
        <Container>
       <Header/>
       <Content>




       <Text style = {styles.text}> Recommendation from soil test report</Text>
       <Form>
       <Text> Select Grade frist </Text>
       <Picker
            mode="dropdown"
            iosHeader="Select Grade"
            iosIcon={<Icon name="arrow-down" />}
            selectedValue={this.state.defaultGrade}
            onValueChange={(value) => {this.setState(this.parseValue(value));}}
          >
            <Picker.Item label="10-10-10" value="10-10-10" />
            <Picker.Item label="5-5-5" value="5-5-5" />
            <Picker.Item label="0-10-0" value="0-10-0" />
            <Picker.Item label="15-0-15" value="15-0-15" />
          </Picker>



       </Form>
       <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
         <Row data={state.inputLabel} style={styles.head} textStyle={styles.text}/>
         <Rows data={state.inputData} textStyle={styles.text}/>
       </Table>

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
         <Text> Nitrogen: {state.nitrogenInput} </Text>
         <Text> Phophorus: {state.phophorusInput} </Text>
         <Text> Potassium: {state.potassiumInput} </Text>
         <Text> Grade 1: {state.grades[0]} </Text>
         <Text> Grade 2: {state.grades[1]} </Text>
         <Text> Grade 3: {state.grades[2]} </Text>
         <Text> matchN: {state.matchN} </Text>
         <Text> suppliedNum: {state.suppliedNum} </Text>

         <Button onPress={() =>this.quickFunction()}>
           <Text>Calculate Score </Text>
         </Button>
         <Button onPress={() =>this.calculateSD()}>
           <Text>Calculate SD</Text>
         </Button>


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
