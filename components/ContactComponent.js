import React, { Component } from 'react';
import { View } from 'react-native';
import { ScrollView, Text } from 'react-native';
import { Card, Button, Icon} from 'react-native-elements';
//animtion 
import * as Animatable from 'react-native-animatable';
//Mail composer
import * as MailComposer from 'expo-mail-composer';

class RenderContact extends Component {
  render() {
      return (
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
          <View>
              <Card>
                <Card.Title>
                Contact Information
                </Card.Title>
                <Card.Divider/>
                <Text style={{ marginBottom: 10 }}>
          121, Clear Water Bay Road
          </Text>
          <Text style={{ marginBottom: 10 }}>
          Clear Water Bay, Kowloon
          </Text>
          <Text style={{ marginBottom: 10 }}>
          HONG KONG
          </Text>
          <Text style={{ marginBottom: 10 }}>
          Tel: +852 1234 5678
          </Text>
          <Text style={{ marginBottom: 10 }}>
          Fax: +852 8765 4321
          </Text>
          <Text style={{ marginBottom: 10 }}>
          Email:confusion@food.new
          </Text>
          <Button title=' Send Email' buttonStyle={{ backgroundColor: '#7cc' }}
            icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
            onPress={this.sendMail} />
            </Card>
          </View>  
        </Animatable.View>
      );
    }
    sendMail() {
      MailComposer.composeAsync({
        recipients: ['hoang.ph2158@sinhvien.hoasen.edu.vn'],
        subject: 'From Confusion',
        body: 'Hello my friends ...'
      });
    }
}


class Contact extends Component {
  render() {
    return (
      <ScrollView>
        <RenderContact />
      </ScrollView>
    );
  }
}
export default Contact;