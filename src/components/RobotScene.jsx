
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import {
  ContactShadows,
  Environment,
  OrbitControls,
  useAnimations,
} from '@react-three/drei';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { clone } from 'three/addons/utils/SkeletonUtils.js';

function AnimatedRobot({ onInteract, isActive }) {
  const source = useLoader(FBXLoader, '/models/robot-luxury.fbx');

  const floatingRef = useRef();
  const robotRef = useRef();
  const [hovered, setHovered] = useState(false);

  const model = useMemo(() => {
    const character = clone(source);

    character.updateMatrixWorld(true);

    const originalBounds = new THREE.Box3().setFromObject(character);
    const originalSize = new THREE.Vector3();
    originalBounds.getSize(originalSize);

    if (originalSize.y > 0) {
      character.scale.multiplyScalar(2.8 / originalSize.y);
    }

    character.updateMatrixWorld(true);

    const bounds = new THREE.Box3().setFromObject(character);
    const center = new THREE.Vector3();
    bounds.getCenter(center);

    character.position.x -= center.x;
    character.position.z -= center.z;
    character.position.y -= bounds.min.y;

    character.traverse((object) => {
      if (!object.isMesh) return;

      object.castShadow = true;
      object.receiveShadow = true;

      const materials = Array.isArray(object.material)
        ? object.material
        : [object.material];

      const updatedMaterials = materials.map((originalMaterial) => {
        const material = originalMaterial.clone();

        const originalColor = material.color
          ? material.color.clone()
          : new THREE.Color('#eeeeee');

        const brightness =
          originalColor.r * 0.2126 +
          originalColor.g * 0.7152 +
          originalColor.b * 0.0722;

        if (brightness < 0.16) {
          material.color.set('#35232b');
          material.metalness = 0.65;
          material.roughness = 0.32;
        } else {
          material.color.set('#fff1df');
          material.metalness = 0.22;
          material.roughness = 0.3;
        }

        material.needsUpdate = true;
        return material;
      });

      object.material = Array.isArray(object.material)
        ? updatedMaterials
        : updatedMaterials[0];
    });

    return character;
  }, [source]);

  const { actions, names } = useAnimations(model.animations, robotRef);

  useEffect(() => {
    const firstAction = names.length ? actions[names[0]] : null;

    if (firstAction) {
      firstAction.reset().fadeIn(0.5).play();
    }

    return () => {
      firstAction?.fadeOut(0.2);
    };
  }, [actions, names]);

  useFrame((state, delta) => {
    if (floatingRef.current) {
      floatingRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 1.2) * 0.045;
    }

    if (robotRef.current) {
      const targetRotation = hovered ? 0.18 : 0;

      robotRef.current.rotation.y = THREE.MathUtils.damp(
        robotRef.current.rotation.y,
        targetRotation,
        3,
        delta
      );
    }
  });

  return (
    <group ref={floatingRef}>
      <group
        ref={robotRef}
        scale={isActive ? 1.06 : 1}
        onClick={(event) => {
          event.stopPropagation();
          onInteract();
        }}
        onPointerOver={(event) => {
          event.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
      >
        <primitive object={model} />
      </group>
    </group>
  );
}

// Destellos geométricos dorados que flotan independientemente del robot.
function GoldenSparkles() {
  const groupRef = useRef();

  const sparkles = useMemo(
    () => [
      { x: -1.05, y: 2.25, z: -0.25, size: 0.075, speed: 0.9, phase: 0 },
      { x: 0.9, y: 2.05, z: -0.3, size: 0.055, speed: 1.2, phase: 1.3 },
      { x: -1.15, y: 1.25, z: -0.2, size: 0.045, speed: 0.8, phase: 2.1 },
      { x: 1.1, y: 1.45, z: -0.25, size: 0.075, speed: 1.1, phase: 0.7 },
      { x: -0.8, y: 0.55, z: -0.3, size: 0.05, speed: 1.3, phase: 2.8 },
      { x: 0.85, y: 0.65, z: -0.25, size: 0.045, speed: 0.85, phase: 1.8 },
      { x: 0.15, y: 2.45, z: -0.35, size: 0.04, speed: 1.4, phase: 3.2 },
    ],
    []
  );

  const starGeometry = useMemo(() => {
    const shape = new THREE.Shape();

    shape.moveTo(0, 1);
    shape.quadraticCurveTo(0.12, 0.12, 1, 0);
    shape.quadraticCurveTo(0.12, -0.12, 0, -1);
    shape.quadraticCurveTo(-0.12, -0.12, -1, 0);
    shape.quadraticCurveTo(-0.12, 0.12, 0, 1);

    return new THREE.ShapeGeometry(shape);
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.elapsedTime;

    groupRef.current.children.forEach((star, index) => {
      const item = sparkles[index];

      star.position.y =
        item.y + Math.sin(time * item.speed + item.phase) * 0.09;

      star.rotation.z =
        Math.sin(time * 0.65 + item.phase) * 0.18;

      const shimmer =
        0.8 + (Math.sin(time * 2 + item.phase) + 1) * 0.25;

      star.material.emissiveIntensity = shimmer;
    });
  });

  useEffect(() => {
    return () => {
      starGeometry.dispose();
    };
  }, [starGeometry]);

  return (
    <group ref={groupRef}>
      {sparkles.map((sparkle, index) => (
        <mesh
          key={index}
          geometry={starGeometry}
          position={[sparkle.x, sparkle.y, sparkle.z]}
          scale={sparkle.size}
        >
          <meshStandardMaterial
            color="#e6bd79"
            emissive="#c99443"
            emissiveIntensity={0.9}
            metalness={0.55}
            roughness={0.3}
            side={THREE.DoubleSide}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function Scene() {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <ambientLight intensity={1.5} />

      <directionalLight
        position={[4, 7, 5]}
        intensity={3}
        color="#fff0dc"
        castShadow
      />

      <pointLight
        position={[-3, 2, 2]}
        intensity={18}
        color="#a83d59"
        distance={8}
      />

      <pointLight
        position={[3, 3, -2]}
        intensity={12}
        color="#e7c28b"
        distance={7}
      />

      <Environment preset="studio" />

      <GoldenSparkles />

      <AnimatedRobot
        isActive={isActive}
        onInteract={() => setIsActive((current) => !current)}
      />

      <ContactShadows
        position={[0, 0.01, 0]}
        opacity={0.4}
        scale={8}
        blur={2.5}
        far={4}
        color="#18070e"
      />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2}
        target={[0, 1.2, 0]}
      />
    </>
  );
}

export default function RobotScene() {
  return (
    <Canvas
      camera={{ position: [0, 1.8, 5.5], fov: 35 }}
      shadows
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <Scene />
    </Canvas>
  );
}
