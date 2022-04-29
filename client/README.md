# Screen share via web rtc to VR player
Aframe + WebVr + RTCMultiConnection

## Usage
```
yarn install 
yarn start
ngrok http 3000
```

Navigate to the ngrok url from both laptop and phone. Enjoy!

Note: you may have to adjust viewer parameters in src/setupWebVR.js


## TODO
- Dynamic device size detection (dpdb currently turned off)
- For some reason you have to confirm screen share twice 
