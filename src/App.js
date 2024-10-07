import './App.css';
import { useEffect, useRef, useState } from 'react';


function App() {
  const video = useRef(null);
  const canvas = useRef(null);
  const [barcode, setBarcode] = useState(null); 

  const openCam = () => {
    navigator.mediaDevices.getUserMedia( { video: { width: 600, height: 400} } )
    .then(stream => {
      
      video.current.srcObject = stream; 
      video.currrent.play();

      const ctx = canvas.current.getContext('2d');
      // eslint-disable-next-line no-undef
      const barcode = new BarcodeDetector({ formats: ["qr_code", "ean_13"]});
      setInterval(() => {
        canvas.current.width = video.current.videoWidth;
        canvas.current.height = video.current.videoHeight;
        ctx.drawImage(video.current, 0, 0, video.current.videoWidth, video.current.videoHeight);
        barcode.detect(video.current)
          .then(([data]) => 
            setBarcode(data.rawValue)
          )
          .catch(err => console.log(err))
        
      }, 100);

    })
    .catch( err => {
      console.log(err);
    })
  }



  return (
    <div className="">
      
      <button onClick={openCam}> OPEN CAM </button>
      <div>
        <video ref={video} autoPlay muted ></video>
        <canvas ref={canvas}> </canvas>
      </div>
      {barcode && (
        <>
          Bulunan kod: {barcode}
        </>
      )}
    </div>
  );
}

export default App;
