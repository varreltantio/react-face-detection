import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';

const FaceContext = createContext();

export function FaceProvider({ children }) {
  const [cameraStream, setCameraStream] = useState(null);
  const [result, setResult] = useState('Result: -');
  const [isExamButtonDisabled, setIsExamButtonDisabled] = useState(true);

  const videoRef = useRef(null);

  useEffect(() => {
    async function startFaceDetection() {
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
      await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
    }

    startFaceDetection();

    const intervalId = setInterval(() => {
      checkFaceDirection();
    }, 1000);

    return () => {
      clearInterval(intervalId);
      if (cameraStream) {
        cameraStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  async function requestCameraPermission() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setCameraStream(stream);
      setIsExamButtonDisabled(false);
    } catch (error) {
      console.error('Error accessing the camera:', error);
    }
  }

  async function checkFaceDirection() {
    if (!videoRef.current) {
      return;
    }

    if (!videoRef.current.videoWidth || !videoRef.current.videoHeight) {
      // Tunggu hingga metadata video dimuat sepenuhnya
      return;
    }

    const detections = await faceapi.detectAllFaces(videoRef.current,
      new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors();

    if (detections.length === 0) {
      setResult('Result: Tidak ada wajah terdeteksi.');
      setIsExamButtonDisabled(true);
    } else {
      setResult('Result: Wajah melihat ke depan layar.');
      setIsExamButtonDisabled(false);
    }
  }

  return (
    <FaceContext.Provider value={{ videoRef, result, isExamButtonDisabled, checkFaceDirection, requestCameraPermission }}>
      {children}
    </FaceContext.Provider>
  );
}

export function useFace() {
  return useContext(FaceContext);
}
