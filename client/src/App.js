import {useState, useCallback} from 'react'
import VRPlayer from './VRPlayer'
import RTCMultiConnection from 'rtcmulticonnection'
import sha256 from 'crypto-js/sha256';

// generate a room id based on url
const roomId = sha256("81ji0fjo73h2j-"+ window.location.href).toString()
console.log("roomID", roomId)

function App() {
  const [videoId, setVideoId] = useState(null)
  const startSharing = useCallback(() => {
    var connection = new RTCMultiConnection();
    connection.socketURL = 'https://muazkhan.com:9001/';
    //// if you want audio+video conferencing
    connection.session = {
      screen: true,
      oneway: true
    };

    connection.openOrJoin(roomId);

    return navigator.mediaDevices.getDisplayMedia()
      .catch(err => { console.error("Error:" + err); return null; });
  }, [])
  const joinSession = useCallback(() => {
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
          minWidth: width,
          maxWidth: width,
          minHeight: height,
          maxHeight: height,
          minFrameRate: 30,
        },
        optional: [{
          facingMode: 'user' // or "application"
        }]
      }
    };
    connection.openOrJoin(roomId);
    const oldOnStream = connection.onstream
    connection.onstream = (e) => {
      oldOnStream(e)
      const elm = document.getElementsByTagName("video")[0]
      elm.width=100
      setVideoId(elm.id)
    }
  }, [])
  return <div style={{height:"80vh", display:"flex"}}>
    <div>
      <button onClick={startSharing}>Share Screen</button>
      <button onClick={joinSession}>Join Session</button>
    </div>

    {
    videoId && <div id="player" style={{
      height:200, width:200, display:"flex", overflow:"hidden", position:"relative"}}>
        <VRPlayer src={`#${videoId}`}/>
      </div>
    }
  </div>
}

export default App;
