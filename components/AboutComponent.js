import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Avatar, Card, ListItem } from 'react-native-elements';
import { FlatList, ScrollView } from 'react-native';
import Loading from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { connect } from 'react-redux';
//animtion 
import * as Animatable from 'react-native-animatable';
const mapStateToProps = state => {
  return {
    leaders: state.leaders
  }
};

class History extends Component 
{
    render() 
    {
        return (
            <Card>
                <Card.Title>
                    Our History
                </Card.Title>
                <Card.Divider />
                <Text style={{ margin: 10 }}>
                    Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.
                </Text>
                <Text style={{ margin: 10}}>
                    The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.
                </Text>
            </Card>
        );
    }
}

class LeaderShip extends Component 
{

    render() 
    {
        const leader = this.props.leader;
        if (this.props.isLoading) {
            return (
              <Card>
                <Card.Title>Corporate Leadership</Card.Title>
                <Card.Divider />
                <Loading />
              </Card>
            );
          } else if (this.props.errMess) {
            return (
              <Card>
                <Card.Title>Corporate Leadership</Card.Title>
                <Card.Divider />
                <Text>{this.props.errMess}</Text>
              </Card>
            );
          } else {
            return (
                <FlatList 
                data={this.props.items}
                renderItem={({ item, index }) => this.renderLeader(item, index)}
                keyExtractor={(item) => item.id.toString()} />
            );
          }
        
    }

    renderLeader(item, index) 
    {
       
        return (
            <ListItem key={index}>
                 <Avatar rounded source={{ uri: baseUrl + item.image }} />
                <ListItem.Content>
                    <ListItem.Title>{item.name}</ListItem.Title>
                    <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        );
    }
}

class About extends Component 
{
    render() 
    {
        const items = this.props.leaders.leaders.filter((leader) => leader.featured === true)[0];
        return (
            <ScrollView>
                <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                    <History/>
                    </Animatable.View>
                <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
                <Card>
                    <Card.Title>
                        Corporate LeaderShip
                </Card.Title>
                    <Card.Divider />
                    <LeaderShip items={this.props.leaders.leaders}
                                isLoading={this.props.leaders.isLoading}
                                errMess={this.props.leaders.errMess} 
                                />
                </Card>
                </Animatable.View>
            </ScrollView>
        )

    };
}

export default connect(mapStateToProps)(About);