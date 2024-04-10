import {
  Dodecahedron,
  Environment,
  Grid,
  MeshDistortMaterial,
  MeshWobbleMaterial,
  RenderTexture,
  Text3D,
} from "@react-three/drei";
import {  useThree } from "@react-three/fiber";
import { useControls } from "leva";
import CameraHandler from "./CameraHandler";
import { scenes } from "./scenes";
import { Scene } from "./Scene";
import * as font from 'three/examples/fonts/helvetiker_bold.typeface.json';

export const Experience = () => {
  const viewport = useThree((state) => state.viewport);
  const { slideDistance } = useControls({
    slideDistance: {
      value: 1,
      min: 0,
      max: 10,
    },
  });
  return (
    <>
      <ambientLight intensity={0.2} />
      <Environment preset={"city"} />
      <CameraHandler slideDistance={slideDistance} />
      {/* MAIN WORLD */}
      <group>
        <mesh position-y={viewport.height / 2 + 1.5}>
          <sphereGeometry args={[1, 32, 32]} />
          <MeshDistortMaterial color={scenes[0].mainColor} speed={3} />
        </mesh>

        <mesh
          position-x={viewport.width + slideDistance}
          position-y={viewport.height / 2 + 1.5}
        >
          <boxGeometry />
          <MeshDistortMaterial color={scenes[1].mainColor} speed={3} />
        </mesh>

        <Dodecahedron
          position-x={2 * (viewport.width + slideDistance)}
          position-y={viewport.height / 2 + 1.5}
        >
          <MeshDistortMaterial color={scenes[2].mainColor} speed={3} />
        </Dodecahedron>
                <mesh
          position-x={3* (viewport.width + slideDistance)}
          position-y={viewport.height / 2 + 1.5}
        >
          <coneGeometry />
          <MeshDistortMaterial color={scenes[3].mainColor} speed={3} />
        </mesh>
        {/*
          <mesh
          position-x={4* (viewport.width + slideDistance)}
          position-y={viewport.height / 2 + 1.5}
        >
          <torusGeometry />
          <MeshDistortMaterial color={scenes[4].mainColor} speed={3} />
        </mesh>
        */}
      </group>

      <Grid
        position-y={-viewport.height / 2}
        sectionSize={1}
        sectionColor={"purple"}
        sectionThickness={1}
        cellSize={0.5}
        cellColor={"#6f6f6f"}
        cellThickness={0.6}
        infiniteGrid
        fadeDistance={50}
        fadeStrength={5}
      />
      {scenes.map((scene, index) => (
        <mesh
          key={index}
          position={[index * (viewport.width + slideDistance), 0, 0]}
        >
        <Text3D
        font={font}
        scale={[0.1,0.1,0.1]}
        position={[-1, 1.1, 0.2]}
        >PBL(Project Based Learning)
        <MeshWobbleMaterial factor={0.1}  />
        </Text3D>
          <planeGeometry args={[viewport.width, viewport.height]} />
          <meshBasicMaterial toneMapped={false}>
            <RenderTexture attach="map">
              <Scene {...scene} />
            </RenderTexture>
          </meshBasicMaterial>
        </mesh>
      ))}
    </>
  );
};

