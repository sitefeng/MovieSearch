
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { fetchMovies, imageBaseURL } from '../reducers/movieReducers.js';
import SearchBar from 'react-native-search-bar';
import GridView from 'react-native-gridview'
import autobind from 'class-autobind'

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Home"
  }

  constructor(props) {
    super(props);
    autobind(this);
  }

  componentDidMount() {
    this.props.fetchMovies('Iron man')
  }

  render() {
    return (
      <View style={{flex: 1, alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center'}}>
        <View style={{alignSelf: 'stretch', backgroundColor: 'yellow'}}>
          <SearchBar
            ref={(s)=> this.searchBar = s}
            placeholder='Search for movies'
            onChangeText={this.onSearchBarChangeText}
            onSearchButtonPress={this.onSearchBarButtonPress}
            onCancelButtonPress={()=>{}}
            />
        </View>
        <View style={{flex: 1, alignSelf: 'stretch', backgroundColor: 'black'}}>
          {
            this.props.movies.length === 0?
            this.renderEmptyView()
            :
            this.renderGridView()
          }
        </View>
      </View>
    )
  }

  renderGridView() {
    return (
      <GridView
        data={this.props.movies}
        itemsPerRow={3}
        renderItem={this.gridViewRenderItem}
      />
    )
  }

  gridViewRenderItem(item, sectionID, rowID, itemIndex, itemID) {
    const imageUrl = imageBaseURL + item.poster_path;
    return (
      <TouchableOpacity style={{ flex: 1, height: 220, backgroundColor: '#333333', borderWidth: 2}} onPress={()=>this.movieItemTapped(item.id)}>
        <Image style={{height: 170}} source={{uri: imageUrl}} resizeMode="cover"/>
        <View style={{flex: 1, justifyContent: 'space-between'}}>
          <Text style={{marginTop: 4, marginHorizontal: 2, fontSize: 12, color: 'white', textAlign: 'center'}}>{item.title}</Text>
          <Text style={{marginBottom: 4, color: '#AAAAAA', fontSize: 12, textAlign: 'center'}}>⭐ {item.vote_average}/10</Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderEmptyView() {
    return (
      <TouchableOpacity activeOpacity={1} style={{flex:1, alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center'}} onPress={this.backgroundTapped}>
        <Image style={{width: 80, tintColor: 'gray'}} source={require("../images/searchDecal.png")} resizeMode="contain"/>
        <Text style={{marginTop: 10, fontSize: 16, color: 'gray'}}>No Results</Text>
        <Text style={{marginTop: 10, fontSize: 16, color: 'gray'}}>Tap the search bar to begin</Text>
      </TouchableOpacity>
    )
  }

  backgroundTapped() {
    this.searchBar.blur();
  }

  onSearchBarChangeText(searchText) {
    this.searchText = searchText;
  }

  onSearchBarButtonPress() {
    this.searchBar.blur();
    this.props.fetchMovies(this.searchText);
  }

  movieItemTapped(id) {
    this.props.navigation.navigate('Details', {id: id})
  }

}

const mapStateToProps = ({ movies, loading }) => ({
  movies,
  loading
})

const mapDispatchToProps = dispatch => ({
  fetchMovies: (searchTerm)=> {
    fetchMovies(dispatch, searchTerm)
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
