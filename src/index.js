import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import {
  getUserstarted,
  saveUserstarted,
  removeUserstarted,
  getUserpitch,
  saveUserpitch,
  removeUserpitch,
  getUserend,
  saveUserend,
  removeUserend,
  getUserresult,
  saveUserresult,
  removeUserresult,
  saveUservideo,
  saveUsernumber,
} from '../actions';
import {connect} from 'react-redux';
import Voice from '@react-native-community/voice';
import Video from 'react-native-video';
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';

const screenWidth = Math.round(Dimensions.get('window').width);
const Dog = {
  uri:
    'https://assets.mixkit.co/videos/preview/mixkit-little-dog-running-in-snow-in-slow-motion-25225-large.mp4',
};
const Cat = {
  uri:
    'https://assets.mixkit.co/videos/preview/mixkit-beautiful-cat-meowing-outside-the-window-33154-large.mp4',
};

class App extends React.Component {
  videoPlayer;
  constructor(props) {
    super(props);
    this.state = {
      currentTime: 0,
      duration: 0,
      isLoading: true,
      paused: false,
      playerState: PLAYER_STATES.PLAYING,
      screenType: 'cover',
    };
  }

  componentDidMount() {
    console.log(this.props);
    Voice.onSpeechStart = this.onSpeechStart;
    Voice.onSpeechEnd = this.onSpeechEnd;
    Voice.onSpeechPartialResults = this.onSpeechResults;
    Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged;
  }

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }

  onSpeechStart = () => {
    this.props.saveUserstarted('√');
  };

  onSpeechEnd = () => {
    this.props.saveUserend('√');
  };

  onSpeechResults = (e) => {
    if (e.value == 'show me dogs') {
      this.props.saveUservideo('true');
      this.props.saveUsernumber('1');
    }
    if (e.value == 'I want to see cats') {
      this.props.saveUservideo('true');
      this.props.saveUsernumber('2');
    }
    this.props.saveUserresult(e.value.toString());
  };

  onSpeechVolumeChanged = (e) => {
    this.props.saveUserpitch(e.value.toString());
  };

  startRecognizing = async () => {
    try {
      await Voice.start('en-US');
      this.props.removeUserstarted();
      this.props.removeUserpitch();
      this.props.removeUserend();
      this.props.removeUserresult();
      this.props.saveUservideo('false');
    } catch (e) {
      console.error(e);
    }
  };

  destroyRecognizer = async () => {
    try {
      await Voice.destroy();
      this.props.removeUserstarted();
      this.props.removeUserpitch();
      this.props.removeUserend();
      this.props.removeUserresult();
      this.props.saveUservideo('false');
    } catch (e) {
      console.error(e);
    }
  };

  onSeek = (seek) => {
    this.videoPlayer.seek(seek);
  };

  onPaused = (playerState) => {
    this.setState({
      paused: !this.state.paused,
      playerState,
    });
  };

  onReplay = () => {
    this.setState({playerState: PLAYER_STATES.PLAYING});
    this.videoPlayer.seek(0);
  };

  onProgress = (data) => {
    const {isLoading, playerState} = this.state;
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      this.setState({currentTime: data.currentTime});
    }
  };

  onLoad = (data) => this.setState({duration: data.duration, isLoading: false});

  onLoadStart = (data) => this.setState({isLoading: true});

  onEnd = () => this.setState({playerState: PLAYER_STATES.ENDED});

  onError = () => alert('Oh! ', error);

  renderToolbar = () => (
    <View style={styles.toolbar}>
      <Text>I'm a custom toolbar </Text>
    </View>
  );

  onSeeking = (currentTime) => this.setState({currentTime});

  render() {
    let video = this.props.voice.number == '1' ? Dog : Cat;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.titleText}>Voice Recognition</Text>
          <Text style={styles.textStyle}>Press mike to start Recognition</Text>
          <View style={styles.headerContainer}>
            <Text style={styles.textWithSpaceStyle}>
              Started: {this.props.voice.started}
            </Text>
            <Text style={styles.textWithSpaceStyle}>
              End: {this.props.voice.end}
            </Text>
          </View>
          <TouchableHighlight onPress={this.startRecognizing}>
            <Image
              style={styles.imageButton}
              source={require('./images/mike.png')}
            />
          </TouchableHighlight>
          <Text style={styles.textStyle}>Result</Text>
          <Text>{this.props.voice.result}</Text>
          <View style={styles.horizontalView}>
            <TouchableHighlight
              onPress={this.destroyRecognizer}
              style={styles.buttonStyle}>
              <Text style={styles.buttonTextStyle}>Clear</Text>
            </TouchableHighlight>
          </View>
          {this.props.voice.video == 'true' ? (
            <View style={{marginTop: 20}}>
              <Video
                volume={10}
                muted={false}
                onEnd={this.onEnd}
                onLoad={this.onLoad}
                onLoadStart={this.onLoadStart}
                onProgress={this.onProgress}
                paused={this.state.paused}
                posterResizeMode={'cover'}
                ref={(videoPlayer) => (this.videoPlayer = videoPlayer)}
                resizeMode={this.state.screenType}
                source={video}
                style={styles.backgroundVideo}
              />
              <MediaControls
                duration={this.state.duration}
                isLoading={this.state.isLoading}
                isFullScreen={false}
                onPaused={this.onPaused}
                onReplay={this.onReplay}
                onSeek={this.onSeek}
                onSeeking={this.onSeeking}
                playerState={this.state.playerState}
                progress={this.state.currentTime}
                mainColor={'orange'}
                toolbar={this.renderToolbar()}
              />
            </View>
          ) : null}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  titleText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonStyle: {
    flex: 1,
    justifyContent: 'center',
    marginVertical: 15,
    padding: 10,
    backgroundColor: '#8ad24e',
    marginRight: 2,
    marginLeft: 2,
  },
  buttonTextStyle: {
    color: '#fff',
    textAlign: 'center',
  },
  horizontalView: {
    position: 'absolute',
    bottom: 0,
  },
  textStyle: {
    textAlign: 'center',
    padding: 12,
  },
  imageButton: {
    width: 50,
    height: 50,
  },
  textWithSpaceStyle: {
    flex: 1,
    textAlign: 'center',
    color: '#B0171F',
  },
  backgroundVideo: {
    height: 250,
    width: screenWidth - 20,
  },
  toolbar: {
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
});

const mapStateToProps = (state) => ({
  voice: state.voice,
});

const mapDispatchToProps = (dispatch) => ({
  getUserstarted: () => dispatch(getUserstarted()),
  saveUserstarted: (data) => dispatch(saveUserstarted(data)),
  removeUserstarted: () => dispatch(removeUserstarted()),
  getUserend: () => dispatch(getUserend()),
  saveUserend: (data) => dispatch(saveUserend(data)),
  removeUserend: () => dispatch(removeUserend()),
  getUserpitch: () => dispatch(getUserpitch()),
  saveUserpitch: (data) => dispatch(saveUserpitch(data)),
  removeUserpitch: () => dispatch(removeUserpitch()),
  getUserresult: () => dispatch(getUserresult()),
  saveUserresult: (data) => dispatch(saveUserresult(data)),
  removeUserresult: () => dispatch(removeUserresult()),
  saveUservideo: (data) => dispatch(saveUservideo(data)),
  saveUsernumber: (data) => dispatch(saveUsernumber(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
