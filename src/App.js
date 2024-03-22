import './App.css';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Leva } from 'leva';
import { Experience } from './components/Experience';
import { Suspense } from 'react';
import { Overlay } from './components/Overlay';

function App() {


  return (
    <>
    <Suspense fallback={<div />}>
    <Leva hidden />
    <Overlay />
    <Canvas shadows camera={{position: [0,0,5], fov: 30}}>
    <color attach='background' args={["#ececec"]} />
      <Experience />
    </Canvas>
    </Suspense>
    </>
  );
}

export default App;
