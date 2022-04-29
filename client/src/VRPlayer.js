import {useEffect, useRef, useCallback} from 'react'
import * as AFRAME from 'aframe';
import {Entity, Scene} from 'aframe-react';

AFRAME.registerComponent('emit-rotation', {
  tick: function(){ //preserve reference to "this"
    this.el.emit('rotate', this.el.object3D.rotation)
  }
});
export default ({src}) => {
  const cameraRotation = useRef(null)
  const screenRef = useRef(null)
  const onCameraRotate = useCallback(({detail:rotation}) => {
    cameraRotation.current=rotation
    if(screenRef.current){
      // move the screen so what we are the same distance away from it 
      const el = screenRef.current
      el.object3D.rotation.set(-rotation.x, -rotation.y, -rotation.z)
    }
  },[])
  const setScreenRef = useCallback((elm) => {
    screenRef.current = elm
  }, [])
  return <div style={{flex:1}} >
      <Scene embedded vr-mode-ui="enabled: true" background="color: black">
        <Entity camera look-controls position="0 0 0" emit-rotation 
          events={{rotate:onCameraRotate}}
        >
          <Entity
            material={`shader: flat; side: double; src: ${src}` }
              geometry="primitive: sphere; radius: 50; theta-start: 45; theta-length: 90; phi-start:180;
  phi-length:180;" position="0 0 25" rotation="0 0 0" scale="-1 1 1"
            _ref={setScreenRef}
          />
        </Entity>
      </Scene>
    </div>
}
