import {useState} from 'react'
import logo from './logo.svg';
import './App.css';
import VRPlayer from './VRPlayer'
import RTCMultiConnection from 'rtcmulticonnection'


function App() {
  const [videoId, setVideoId] = useState("loading")
  const startSharing = () => {
    var connection = new RTCMultiConnection();
    connection.socketURL = 'https://muazkhan.com:9001/';
    //// if you want audio+video conferencing
    connection.session = {
      screen: true,
      oneway: true
    };

    connection.openOrJoin('your-room-id');

    return navigator.mediaDevices.getDisplayMedia()
      .catch(err => { console.error("Error:" + err); return null; });
  }
  const joinSession = () => {
    if(DeviceMotionEvent.requestPermission){
      DeviceMotionEvent.requestPermission()
    }
    var connection = new RTCMultiConnection();
    connection.socketURL = 'https://muazkhan.com:9001/';
    //// if you want audio+video conferencing
    connection.session = {
      screen: false,
      oneway: true
    };
    const width = 2880
    const height = 1800
    connection.mediaConstraints = {
      video: {
        mandatory: {
          minWidth: 2880,
          maxWidth: 2880,
          minHeight: 1800,
          maxHeight: 1800,
          minFrameRate: 30,
        },
        optional: [{
          facingMode: 'user' // or "application"
        }]
      }
    };
    connection.openOrJoin('your-room-id');
    const oldOnStream = connection.onstream
    connection.onstream = (e) => {
      oldOnStream(e)
      const elm = document.getElementsByTagName("video")[0]
      elm.width=100
      setVideoId(elm.id)
    }
  }
  return <div style={{height:"80vh", display:"flex"}}>
    <div>
      <button onClick={startSharing}>Share Screen</button>
      <button onClick={joinSession}>Join Session</button>
    </div>

    <video id="loading" width={200} height={200} src="/sampleVideo.m4v" autoPlay muted loop playsInline/>
    {
    videoId && <div id="player" style={{
      height:200, width:200, display:"flex", overflow:"hidden", position:"relative"}}>
        <VRPlayer src={`#${videoId}`}/>
      </div>
    }
  </div>
}

export default App;
