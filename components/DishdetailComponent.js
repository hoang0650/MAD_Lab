import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList, Modal, StyleSheet, Button, PanResponder, Alert } from 'react-native';
import { Card ,Image, Icon, Input, Rating } from 'react-native-elements';
// redux
import { baseUrl } from '../shared/baseUrl';
import { connect } from 'react-redux';
import { postFavorite, postComment } from '../redux/ActionCreators';
//animation
import * as Animatable from 'react-native-animatable';
const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites
  }
};
const mapDispatchToProps = dispatch => ({
  postFavorite: (dishId) => dispatch(postFavorite(dishId)),
  postComment: (dishId, rating, author, comment) =>
    dispatch(postComment(dishId, rating, author, comment))
});

class RenderDish extends Component {
  render() {
    // gesture
    const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
      if (dx < -200) return true; // right to left
      return false;
    };
    const recognizeComment = ({ dx }) => {
      if (dx > 200) return true; // Left to right
      return false;
    };
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gestureState) => { return true; },
      onPanResponderEnd: (e, gestureState) => {
        if (recognizeDrag(gestureState)) {
          Alert.alert(
            "Thêm vào yêu thích",
          "Bạn có muố thêm món  " + dish.name + " vào danh sách món yêu thích?",
          [
            {
              text: "Cancel",
              onPress: () => {
                /* nothing */
              },
            },
            {
              text: "OK",
              onPress: () =>
                this.props.favorite ? alert("Đã thêm món này vào yêu thích") : this.props.onPress(),
            },
          ],
          { cancelable: false }
        );
      } else if (recognizeComment(gestureState)) {
        this.props.onPressAddComment();
      }
        return true;
      }
    });
      const dish = this.props.dish;
      if (dish != null) {
        return (
          <Card {...panResponder.panHandlers}> 
            <Image source={{ uri: baseUrl + dish.image }} style={{ width: '100%', height: 100, flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Card.FeaturedTitle>{dish.name}</Card.FeaturedTitle>
            </Image>
            <Text style={{ margin: 10 }} >{dish.description}</Text>
              <View style={styles.icons}>
              <Icon raised reverse type='font-awesome' color='#f50'
                name={this.props.favorite ? 'heart' : 'heart-o'} 
                onPress={() => this.props.favorite ? alert('Already favorite') : this.props.onPressFavorite()} />
              <Icon raised reverse type="font-awesome" name="pencil"  color="#512DA8"
                onPress={this.props.onPressAddComment}/>
              </View>
              
              
          </Card>
        );
      }
      return (<View />);
    }
  }

class RenderComments extends Component {
  render() {
    const comments = this.props.comments;
    return (
      <Card>
        <Card.Title>Comments</Card.Title>
        <Card.Divider />
        <FlatList data={comments}
          renderItem={({ item, index }) => this.renderCommentItem(item, index)}
          keyExtractor={item => item.id.toString()} />
      </Card>
      );
    }
  renderCommentItem(item, index) {
      return (
        <View key={index} style={{ margin: 10 }}>
          <Text style={{ fontSize: 14 }}>{item.comment}</Text>
          <Text style={{ fontSize: 12 }}>{item.rating} Stars</Text>
          <Rating imageSize={15} readonly startingValue={item.rating} style={{ alignItems: "flex-start" }}/>
          <Text style={{ fontSize: 12 }}>{'-- ' + item.author + ', ' + item.date} </Text>
        </View>
      );
    };
  }

class Dishdetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
      showModal: false,
      author: "",
      comment: "",
      rating: 5
    };
  }

  markFavorite(dishId) {
    this.props.postFavorite(dishId);
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  handleReservation() {
    console.log(JSON.stringify(this.state));
    this.toggleModal();
  }

  ratingCompleted = rating => {
    this.setState({ rating });
  };

  handleAuthorInput = author => {
    this.setState({ author });
  };

  handleCommentInput = comment => {
    this.setState({ comment });
  };

  resetForm() {
    this.setState({
      guests: 1,
      smoking: false,
      date: "",
      showModal: false
    });
  }

  handleComment() {
    const { rating, author, comment } = this.state;
    const dishId = parseInt(this.props.route.params.dishId);

    this.toggleModal();
    this.props.postComment(dishId, rating, author, comment);
  }

  render() {
      const dishId = parseInt(this.props.route.params.dishId);
      const dish = this.props.dishes.dishes[dishId];
      const comment = this.props.comments.comments.filter(comment => comment.dishId === dishId);
      const favorite = this.props.favorites.some((el) => el === dishId);
    return (
      <ScrollView>
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
        <RenderDish dish={dish} favorite={favorite} onPressFavorite ={() => this.markFavorite(dishId)} onPressAddComment={this.toggleModal}/>
        </Animatable.View>
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
        <RenderComments comments = {comment}/>
        </Animatable.View>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.showModal}
          onDismiss={() => this.toggleModal()}
          onRequestClose={() => this.toggleModal()}
        >
          <View style={styles.modal}>
            <Rating
              imageSize={30}
              startingValue={5}
              showRating
              onFinishRating={this.ratingCompleted}
              style={{ paddingVertical: 10 }}
            />
            <Input
              placeholder="Author"
              onChangeText={this.handleAuthorInput}
              leftIcon={{ type: "font-awesome", name: "user-o" }}
            />
            <Input
              placeholder="Comment"
              onChangeText={this.handleCommentInput}
              leftIcon={{ type: "font-awesome", name: "comment-o" }}
            />
            <View style={{ margin: 10 }}>
              <Button
                onPress={() => {
                  this.handleComment();
                  this.resetForm();
                }}
                color="#512DA8"
                title="Submit"
              />
            </View>
            <View style={{ margin: 10 }}>
              <Button
                onPress={() => {
                  this.toggleModal();
                  this.resetForm();
                }}
                color="gray"
                title="Cancel"
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  icons: {
    // alignItems: "center",
    justifyContent: "center",
    // flex: 1,
    flexDirection: "row"
  },
  formRow: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    margin: 20
  },
  formLabel: {
    fontSize: 18,
    flex: 2
  },
  formItem: {
    flex: 1
  },
  modal: {
    justifyContent: "center",
    margin: 20
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: "#512DA8",
    textAlign: "center",
    color: "white",
    marginBottom: 20
  },
  modalText: {
    fontSize: 18,
    margin: 10
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);