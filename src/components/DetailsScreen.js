
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking
} from 'react-native';
import { createReactNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import autobind from 'class-autobind';
import { fetchMovieDetails, imageBaseURL } from '../reducers/movieReducers';

class DetailsScreen extends React.Component {
  static navigationOptions = {
    title: "Details"
  }

  constructor(props) {
    super(props);
    autobind(this);

  }

  componentDidMount() {
    this.props.fetchMovieDetails(this.props.navigation.getParam('id'))
  }

  render() {
    const selectedMovie = this.props.selectedMovie;

    let genreString = "";
    if (selectedMovie.genres) {
      genreString = " | "
      for (var i in selectedMovie.genres) {
        const genre = selectedMovie.genres[i];
        genreString += `${genre.name}, `
      }
      genreString = genreString.substring(0, genreString.length-2)
    }


    return (
      <View style={{flex: 1, backgroundColor: 'black'}}>
        <ScrollView style={{flex:1}} contentContainerStyle={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center'}}>
          <View style={{flex: 1, backgroundColor: 'black', alignSelf: 'stretch'}}>
            {
              selectedMovie && selectedMovie.backdrop_path?
              <Image style={{height: 200, alignSelf: 'stretch'}} source={{uri: imageBaseURL + selectedMovie.backdrop_path}} resizeMode="cover"/>
              :
              null
            }
            <View style={{paddingVertical: 12, paddingHorizontal: 8, backgroundColor: '#333333'}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{color: 'white', fontSize: 24, fontWeight: '600'}}>{selectedMovie.title}</Text>
                <Text style={{color: "#999999", fontSize: 16}}>{selectedMovie.release_date? " (" + selectedMovie.release_date.substring(0,4) + ")": null}</Text>
              </View>
              <Text style={{marginTop: 4, color: '#999999', fontSize: 14}}>{selectedMovie.runtime + " min" + genreString}</Text>
            </View>
            <View style={{paddingVertical: 12, paddingHorizontal: 8, flexDirection: 'row', backgroundColor: '#555555'}}>
              <View style={{flex: 0.3}}>
                <Image style={{height: 150, width: 100}} source={{uri: imageBaseURL + selectedMovie.poster_path}} resizeMode="contain"/>
                <View style={{marginTop: 8, justifyContent: 'space-between'}}>
                  <Text style={{marginBottom: 4, color: '#FFFFFF', fontSize: 16, textAlign: 'center'}}>⭐ {selectedMovie.vote_average}/10</Text>
                  <Text style={{marginBottom: 4, color: '#AAAAAA', fontSize: 14, textAlign: 'center'}}>{"(" + selectedMovie.vote_count +" ratings)"}</Text>
                </View>
              </View>
              <View style={{marginHorizontal: 8, backgroundColor: '#BBBBBB', alignSelf: 'center'}}/>
              <View style={{flex: 0.7, justifyContent: 'space-between'}}>
                <Text style={{color: 'white', fontSize: 14}}>{selectedMovie.overview}</Text>
                {
                  selectedMovie.homepage?
                  <TouchableOpacity style={{marginTop: 8, marginBottom: 8, height: 35, backgroundColor: '#3399FF', borderRadius: 6, justifyContent: 'center', alignItems: 'center'}} onPress={()=>this.websiteButtonTapped(selectedMovie.homepage)}>
                    <Text style={{color: 'white', fontSize: 14}}>Visit Website →</Text>
                  </TouchableOpacity>
                  :
                  null
                }
              </View>

            </View>
          </View>

        </ScrollView>
      </View>
    )
  }

  websiteButtonTapped(website) {
    Linking.openURL(website);
  }

}


const mapStateToProps = ({ selectedMovie }) => ({
  selectedMovie
})

const mapDispatchToProps = (dispatch) => ({
  fetchMovieDetails: (id) => {
    fetchMovieDetails(dispatch, id)
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(DetailsScreen);
