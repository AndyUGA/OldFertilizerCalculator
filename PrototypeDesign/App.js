/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';

import { Container, Header, Content, Button, Text } from 'native-base';




  export default class App extends Component {
    render() {
      return (
        <Container>
          <Header />
          <Content>
            <Button light>
              <Text>Click Me!</Text>
            </Button>
          </Content>
        </Container>
      );
    }
  }
