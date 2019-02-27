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

      matchN: 0,
      matchP: 0,
      matchK: 0,

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

      defaultGrade: "",
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

      //comment 2
      inputLabel: ["N", "P205", "K20"],
      inputData: [
        [
          <Item>
            <TextInput
              //editable = {allowUserInput}
              placeholder="Enter N value"
              onChangeText={inputtedValue => {
                this.displayInputtedN(inputtedValue);
              }}
            />
          </Item>,
          <Item>
            <TextInput
              //editable = {allowUserInput}
              placeholder="Enter P value"
              onChangeText={inputtedValue => {
                this.displayInputtedP(inputtedValue);
              }}
            />
          </Item>,
          <Item>
            <TextInput
              //editable = {allowUserInput}
              placeholder="Enter K value"
              onChangeText={inputtedValue => {
                this.displayInputtedK(inputtedValue);
              }}
              onEndEditing={inputtedValue => {
                this.calculateSD();
                //this.calculateScore();
              }}
            />
          </Item>
        ]
      ],

      matchLabel: ["Match"],
      NPKLabel: ["N", "P", "K"],

      nutrientsSuppliedLabel: ["Nutrients Supplied"],

      surplusDeficit: ["Nutrients Surplus or Deficit"],
      scoreLabel: ["Score"]
    };
  }

  //Displays the inputted amount of N into table
  displayInputtedN(inputtedValue: number) {
    this.setState({
      NInput: inputtedValue,
      nsData: [[inputtedValue, inputtedValue, inputtedValue]]
    });
  }

  //Displays the inputted amount of P into table
  displayInputtedP(inputtedValue: number) {
    this.setState({
      PInput: inputtedValue,
      nsData2: [[inputtedValue, inputtedValue, inputtedValue]]
    });
  }

  //Displays the inputted amount of K into table
  displayInputtedK(inputtedValue: number) {
    this.setState({
      KInput: inputtedValue,
      nsData3: [[inputtedValue, inputtedValue, inputtedValue]]
    });
  }

  refresh() {
    this.setState({
      inputData: [
        [
          <Item>
            <TextInput
              editable={allowUserInput}
              placeholder="Enter N value"
              onChangeText={inputtedValue => {
                this.displayInputtedN(inputtedValue);
                this.calculateNMatch(inputtedValue);
              }}
            />
          </Item>,
          <Item>
            <TextInput
              editable={allowUserInput}
              placeholder="Enter P value"
              onChangeText={inputtedValue => {
                this.displayInputtedP(inputtedValue);
                this.calculatePMatch(inputtedValue);
              }}
            />
          </Item>,
          <Item>
            <TextInput
              editable={allowUserInput}
              placeholder="Enter K value"
              onChangeText={inputtedValue => {
                this.displayInputtedK(inputtedValue);
                this.calculateKMatch(inputtedValue);
              }}
            />
          </Item>
        ]
      ]
    });
  }

  //Parses value from grade that is selected
  parseValue(value) {
    this.state.grades = value.split("-");

    this.setState(
      {
        matchN: +this.state.grades[0] ? (this.state.NInput / +this.state.grades[0]) * 100 : 0,
        matchP: +this.state.grades[1] ? (this.state.PInput / +this.state.grades[1]) * 100 : 0,
        matchK: +this.state.grades[2] ? (this.state.KInput / +this.state.grades[2]) * 100 : 0,
        percentGrade1: parseInt(this.state.grades[0]) / 100,
        percentGrade2: parseInt(this.state.grades[1]) / 100,
        percentGrade3: parseInt(this.state.grades[2]) / 100,
        foo1: parseInt(this.state.grades[0]) / 100,
        foo2: parseInt(this.state.grades[1]) / 100,
        foo3: parseInt(this.state.grades[2]) / 100
      },
      () => {
        this.calculateScore();
      }
    );
  }

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
      sdData: [[this.state.ns00, this.state.ns01, this.state.ns02]],
      sdData2: [[this.state.ns10, this.state.ns11, this.state.ns12]],
      sdData3: [[this.state.ns20, this.state.ns21, this.state.ns22]]
    });
  }

  render() {
    const state = this.state;
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
        <Header />
        <Content>
          <Text style={styles.text}> Recommendation from soil test report</Text>
          <Form>
            <Text> Select Grade frist </Text>
            <Picker
              mode="dropdown"
              iosHeader="Select Grade"
              iosIcon={<Icon name="arrow-down" />}
              selectedValue={this.state.defaultGrade}
              onValueChange={value => {
                this.setState(this.parseValue(value));
              }}
            >
              <Picker.Item label="10-10-10" value="10-10-10" />
              <Picker.Item label="5-5-5" value="5-5-5" />
              <Picker.Item label="0-10-0" value="0-10-0" />
              <Picker.Item label="15-0-15" value="15-0-15" />
            </Picker>
          </Form>
          <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
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
