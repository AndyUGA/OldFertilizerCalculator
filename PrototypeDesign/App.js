/**
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from "react";
import { TextInput, StyleSheet, View } from "react-native";
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from "react-native-table-component";
import { Container, Header, Content, Button, Text, Form, Item, Input, ListItem, CheckBox, Body, Icon, Picker } from "native-base";

import { rpd, calculateIndividualScore, supplied } from "./Helper.js";

export default class App extends Component {
  constructor(props) {
    super(props);

    let allowUserInput = false;

    this.state = {
      grades: [],
      boxValue: "",
      matchN: 0,
      matchP: 0,
      matchK: 0,
      defaultNValue : 60,

      suppliedNum1: 0,
      suppliedNum2: 0,
      suppliedNum3: 0,

      suppliedNum4: 0,
      suppliedNum5: 0,
      suppliedNum6: 0,

      suppliedNum7: 0,
      suppliedNum8: 0,
      suppliedNum9: 0,

      score1: 0,
      score2: 0,
      score3: 0,

      defaultGrade: "10-10-10",
      defaultAcre : "1000",
      percentGrade1: "",
      percentGrade2: "",
      percentGrade3: "",

      nMatchValue: 0,
      pMatchValue: 0,
      kMatchValue: 0,

      resultText: "Nothing",
      text: "",
      NSupplied: "",

      NInput: 0,
      PInput: 0,
      KInput: 0,

      ns00: 0,
      ns01: 0,
      ns02: 0,
      ns10: 0,
      ns11: 0,
      ns12: 0,
      ns20: 0,
      ns21: 0,
      ns22: 0,

      poundsPerValue1: 0,
      poundsPerValue2: 0,
      poundsPerValue3: 0,

      poundsOuncesSFAcres: "Pounds-SF",
      testSplit: "",
      someNum: 0,

      inputLabel: ["N", "P", "K"],
      inputData: [
        [
          <Item>
            <TextInput
              placeholder="Enter N value"
              onChangeText={inputtedValue => {
                this.displayInputtedN(inputtedValue);
              }}
            />
          </Item>,
          <Item>
            <TextInput
              placeholder="Enter P value"
              onChangeText={inputtedValue => {
                this.displayInputtedP(inputtedValue);
              }}
            />
          </Item>,
          <Item>
            <TextInput
              placeholder="Enter K value"
              onChangeText={inputtedValue => {
                this.displayInputtedK(inputtedValue);
              }}
              onEndEditing={inputtedValue => {
                this.calculateSD();
                this.parseValue(this.state.defaultGrade)
                this.calculatePerAcre(this.state.defaultAcre)
              }}
            />
          </Item>
        ]
      ],

      matchLabel: ["Match"],
      NPKLabel: ["N", "P", "K"],

      nutrientsSuppliedLabel: ["Nutrients Supplied"],

      surplusDeficit: ["Nutrients Surplus or Deficit"],
      scoreLabel: ["Score"],
      scoreLabel: ["Score"]
    };
  }

  //Displays the inputted amount of N into Nutrients Supplied table
  displayInputtedN(inputtedValue: number) {
    this.setState({
      NInput: inputtedValue,
    });
  }

  //Displays the inputted amount of P into Nutrients Supplied table
  displayInputtedP(inputtedValue: number) {
    this.setState({
      PInput: inputtedValue,
    });
  }

  //Displays the inputted amount of K into Nutrients Supplied table
  displayInputtedK(inputtedValue: number) {
    this.setState({
      KInput: inputtedValue,
    });
  }

  //Parses value from grade that is selected
  parseValue(value) {
    this.state.grades = value.split("-");
    let gradeOne = +this.state.grades[0];
    let gradeTwo =  +this.state.grades[1];
    let gradeThree = +this.state.grades[2];

    let matchN = gradeOne ? Math.ceil((this.state.NInput / gradeOne) * 100) : 0;
    let matchP = gradeTwo ? Math.ceil((this.state.PInput / gradeTwo) * 100) : 0;
    let matchK = gradeThree ? Math.ceil((this.state.KInput / gradeThree) * 100) : 0;

    if(gradeOne == 0)
    {
      matchN = 0;
    }
    if(gradeTwo == 0)
    {
      matchP = 0;
    }
    if(gradeThree == 0)
    {
      matchK = 0;
    }

    this.setState(
      {
        nsData2: [[0, 0, 0]],
        defaultGrade: value,
        matchN: matchN,
        matchP: matchP,
        matchK: matchK,

      },
      () => {
        this.calculateScore();
      }
    );
  }

  //Calculate score values
  calculateScore() {
    this.setState(
      {
        suppliedNum1: supplied(+this.state.matchN, +this.state.grades[0]),
        suppliedNum2: supplied(+this.state.matchN, +this.state.grades[1]),
        suppliedNum3: supplied(+this.state.matchN, +this.state.grades[2]),

        suppliedNum4: supplied(+this.state.matchP, +this.state.grades[0]),
        suppliedNum5: supplied(+this.state.matchP, +this.state.grades[1]),
        suppliedNum6: supplied(+this.state.matchP, +this.state.grades[2]),

        suppliedNum7: supplied(+this.state.matchK, +this.state.grades[0]),
        suppliedNum8: supplied(+this.state.matchK, +this.state.grades[1]),
        suppliedNum9: supplied(+this.state.matchK, +this.state.grades[2])
      },
      () => {
        this.calculateFinalScore();
      }
    );
  }

  calculateFinalScore() {
    this.setState({
      score1: calculateIndividualScore(this.state.suppliedNum1, this.state.suppliedNum2, this.state.suppliedNum3, +this.state.NInput, +this.state.PInput, +this.state.KInput),
      score2: calculateIndividualScore(this.state.suppliedNum4, this.state.suppliedNum5, this.state.suppliedNum6, +this.state.NInput, +this.state.PInput, +this.state.KInput),
      score3: calculateIndividualScore(this.state.suppliedNum7, this.state.suppliedNum8, this.state.suppliedNum9, +this.state.NInput, +this.state.PInput, +this.state.KInput)
    });
  }

  //Caculates Nutrients Surplus and Deficit values
  calculateSD() {
    this.setState({
      foo1: 5,
      ns00: this.state.NInput - this.state.NInput,
      ns01: this.state.NInput - this.state.PInput,
      ns02: this.state.NInput - this.state.KInput,

      ns10: this.state.PInput - this.state.NInput,
      ns11: this.state.PInput - this.state.PInput,
      ns12: this.state.PInput - this.state.KInput,

      ns20: this.state.KInput - this.state.NInput,
      ns21: this.state.KInput - this.state.PInput,
      ns22: this.state.KInput - this.state.KInput,

    });
  }

  //Calculates values for pounds/ounces per x square feet/acre
  calculatePerAcre(value) {

    let selectedOption = this.state.poundsOuncesSFAcres.split("-");
    let poundsOrOunces = selectedOption[0];
    let sfOrAcres = selectedOption[1];
    let nResult = 0;
    let pResult = 0;
    let kResult = 0;

    if (poundsOrOunces == "Pounds" && sfOrAcres == "SF") {
      let num1 = 43560 / +value;
      nResult = (this.state.NInput / num1).toFixed(2);
      pResult = (this.state.PInput / num1).toFixed(2);
      kResult = (this.state.KInput / num1).toFixed(2);
    } else if (poundsOrOunces == "Pounds" && sfOrAcres == "A") {
      let num1 = 1 / +value;
      nResult = (this.state.NInput / num1).toFixed(2);
      pResult = (this.state.PInput / num1).toFixed(2);
      kResult = (this.state.KInput / num1).toFixed(2);
    } else if (poundsOrOunces == "Ounces" && sfOrAcres == "A") {
      let num1 = 0.0625 / +value;
      nResult = (this.state.NInput / num1).toFixed(2);
      pResult = (this.state.PInput / num1).toFixed(2);
      kResult = (this.state.KInput / num1).toFixed(2);
    } else if (poundsOrOunces == "Ounces" && sfOrAcres == "SF") {
      let num1 = (0.0625 * 43560) / +value;
      nResult = (this.state.NInput / num1).toFixed(2);
      pResult = (this.state.PInput / num1).toFixed(2);
      kResult = (this.state.KInput / num1).toFixed(2);
    }
    this.setState({
      defaultAcre : value,
      poundsPerValue1: nResult,
      poundsPerValue2: pResult,
      poundsPerValue3: kResult
    });
  }

  render() {
    const state = this.state;
    const valuePerAcreInput = [
      [
        <Item>
          <TextInput
            //editable = {allowUserInput}
            placeholder=" Value per acre "
            value = {this.state.defaultAcre}
            onChangeText={inputtedValue => {
              this.calculatePerAcre(inputtedValue);
            }}
          />
        </Item>
      ]
    ];
    const poundsPerX = [[state.poundsPerValue1, state.poundsPerValue2, state.poundsPerValue3]];

    const sd1 = [[state.ns00, state.ns01, state.ns02]];
    const sd2 = [[state.ns10, state.ns11, state.ns12]];
    const sd3 = [[state.ns20, state.ns21, state.ns22]];

    const nsd1 = [[state.NInput, state.NInput, state.NInput]];
    const nsd2 = [[state.PInput, state.PInput, state.PInput]];
    const nsd3 = [[state.KInput, state.KInput, state.KInput]];

    const matchData = [[state.matchN, state.matchP, state.matchK]];

    const scoreData = [[state.score1, state.score2, state.score3]];

    return (
      <Container>
        <Header/>
        <Content>
        <ListItem>
         <CheckBox onPress = {() => this.setState(this.parseValue("10-10-10"), this.calculateSD(), this.calculatePerAcre(this.state.defaultAcre))} />
         <Body>
           <Text> 10 - 10 - 10</Text>
         </Body>
         <CheckBox onPress = {() => this.setState(this.parseValue("5-5-5"), this.calculateSD(), this.calculatePerAcre(this.state.defaultAcre))} />
         <Body>
           <Text> 5 - 5 - 5</Text>
         </Body>
       </ListItem>
       <ListItem>
        <CheckBox onPress = {() => this.setState(this.parseValue("0-10-10"), this.calculateSD(), this.calculatePerAcre(this.state.defaultAcre))} />
        <Body>
          <Text> 0 - 10 - 10</Text>
        </Body>
        <CheckBox onPress = {() => this.setState(this.parseValue("15-0-15"), this.calculateSD(), this.calculatePerAcre(this.state.defaultAcre))} />
        <Body>
          <Text> 15 - 0 - 15</Text>
        </Body>
      </ListItem>
       <Text> {this.state.boxValue}</Text>
          <Text style={styles.text}> Recommendation from soil test report</Text>
          <Form>
            <Text> Select Grade first </Text>
            <Picker
              mode="dropdown"
              iosHeader="Select Grade"
              iosIcon={<Icon name="arrow-down" />}
              selectedValue={this.state.defaultGrade}
              onValueChange={value => {
                this.setState(this.parseValue(value), this.calculateSD(), this.calculatePerAcre(this.state.defaultAcre));
              }}
            >
              <Picker.Item label="10-10-10" value="10-10-10" />
              <Picker.Item label="5-5-5" value="5-5-5" />
              <Picker.Item label="0-10-10" value="0-10-10" />
              <Picker.Item label="15-0-15" value="15-0-15" />
            </Picker>
          </Form>
          <Form>
            <Text> Pounds or Ounces </Text>
            <Picker
              mode="dropdown"
              iosHeader="Select Grade"
              iosIcon={<Icon name="arrow-down" />}
              selectedValue = {this.state.poundsOuncesSFAcres}
              onValueChange={value => {
                this.setState(
                  { poundsOuncesSFAcres: value }, () => {
                      this.calculatePerAcre(this.state.defaultAcre)
                  }


                  );
              }}
            >
              <Picker.Item label="Pounds - Square Feet" value="Pounds-SF" />
              <Picker.Item label="Pounds - Acre" value="Pounds-A" />
              <Picker.Item label="Ounces - Square Feet" value="Ounces-SF" />
              <Picker.Item label="Ounces - Acre" value="Ounces-A" />
            </Picker>
          </Form>
          {valuePerAcreInput}
          <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
            <Rows data={poundsPerX} textStyle={styles.text} />
            <Row data={state.inputLabel} style={styles.head} textStyle={styles.text} />

            <Rows data={state.inputData} textStyle={styles.text} />
          </Table>
          <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
            <Row data={state.matchLabel} style={styles.head} textStyle={styles.text} />
            <Row data={state.NPKLabel} style={styles.head} textStyle={styles.text} />

            <Rows data={matchData} textStyle={styles.text} />

            <Row data={state.nutrientsSuppliedLabel} style={styles.head} textStyle={styles.text} />

            <Rows data={nsd1} textStyle={styles.text} />
            <Rows data={nsd2} textStyle={styles.text} />
            <Rows data={nsd3} textStyle={styles.text} />
            <Row data={state.surplusDeficit} style={styles.head} textStyle={styles.text} />
            <Rows data={sd1} textStyle={styles.text} />
            <Rows data={sd2} textStyle={styles.text} />
            <Rows data={sd3} textStyle={styles.text} />
            <Row data={state.scoreLabel} style={styles.head} textStyle={styles.text} />
            <Rows data={scoreData} textStyle={styles.text} />
          </Table>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  head: { height: 40, backgroundColor: "#f1f8ff" },
  text: { margin: 6, textAlign: "center" },
  red: { color: "red" },
  blue: { color: "blue" },
  green: { color: "green" }
});
