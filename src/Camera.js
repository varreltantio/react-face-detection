import React, { useEffect } from 'react';
import { useFace } from './FaceContext';

function Camera({ hidden }) {
  const {
    videoRef,
    checkFaceDirection,
  } = useFace();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((error) => {
        console.error('Error accessing camera:', error);
      });
  }, []);

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline muted style={hidden ? { opacity: 0, position: 'absolute', zIndex: -999 } : {}} onLoadedMetadata={checkFaceDirection} />
    </div>
  );
}

export default Camera;
