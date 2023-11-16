import React from 'react';
import { Link } from 'react-router-dom';
import { useFace } from './FaceContext';
import Camera from './Camera';

function Home() {
  const {
    result,
    isExamButtonDisabled,
    requestCameraPermission,
  } = useFace();

  return (
    <div>
      <Camera />
      <div id="result">{result}</div>
      <button id="startRecording" onClick={requestCameraPermission}>
        Mulai Rekam
      </button>
      <Link to="/exam">
        <button id="startExam" disabled={isExamButtonDisabled}>
          Mulai Ujian
        </button>
      </Link>
    </div>
  );
}

export default Home;
