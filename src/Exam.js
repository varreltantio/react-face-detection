import React from 'react';
import { Link } from 'react-router-dom';
import { useFace } from './FaceContext';
import Camera from './Camera';

function Exam() {
  const { result } = useFace();

  return (
    <div>
      <Camera hidden={true} />

      <h3>Soal No 1</h3>
      <p>{result}</p>

      <Link to="/">
        <button>
          Back to home
        </button>
      </Link>
    </div>
  );
}

export default Exam;
