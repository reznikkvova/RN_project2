import React from "react";
import {
  Image,
  TouchableOpacity,
  View,
  Text,
  StyleSheet
} from "react-native";
import { fetchById } from "../data";
export default class MovieRouteComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieInfo: null
    };
  }

  //get id params from movieTitle item navigation
  componentDidMount() {
    this.getMoviesById(this.props.navigation.getParam("id", "n/a"));
  }
  //get id results from fetchById
  getMoviesById = async id => {
    const results = await fetchById(id);
    this.setState({ movieInfo: results });
  };

  render() {
    return (
      <View style={styles.movieContainer}>
        <TouchableOpacity
          style={styles.touchableOp}
          onPress={() => {
            this.props.navigation.navigate("MainRoute");
          }}
        >
          <Text style={styles.touchableText}>Go Back</Text>
        </TouchableOpacity>
        {this.state.movieInfo && this.state.movieInfo.Poster ? (
          <Image
            resizeMode="cover"
            source={{ uri: this.state.movieInfo.Poster }}
            style={styles.image}
          />
        ) : null}
        {this.state.movieInfo && (
          <View>
            <Text style={styles.title}>{this.state.movieInfo.Title}</Text>
            <Text>Year: {this.state.movieInfo.Released}</Text>
            <Text>Genre: {this.state.movieInfo.Genre}</Text>
            <Text>Rated: {this.state.movieInfo.Rated}</Text>
            <Text>{this.state.movieInfo.Director}</Text>
            <Text>--------------------</Text>
            <Text style={styles.actors}>{this.state.movieInfo.Actors}</Text>
            <Text>--------------------</Text>
            <Text style={styles.plot}>{this.state.movieInfo.Plot}</Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  movieContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 25,
    borderColor: "orange",
    padding: 5
  },
  image: {
    width: 300,
    height: 300,
    borderColor: "orange",
    borderWidth: 5,
    marginBottom: 50
  },
  plot: {
    marginTop: 5,
    fontWeight: "bold"
  },
  actors: {
    marginTop: 5,
    fontStyle: "italic"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black"
  },
  touchableOp: {
    backgroundColor: "orange",
    borderRadius: 5,
    padding: 10,
    marginBottom: 50
  },
  touchableText: {
    fontSize: 20,
    color: "white"
  }
});
