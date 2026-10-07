import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line, Sparkles } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type Point3 = [number, number, number];

type ScanPulseData = {
  id: number;
  position: THREE.Vector3;
};

function CameraRig() {
  const { camera, pointer } = useThree();

  useFrame(() => {
    camera.position.x += (pointer.x * 0.7 - camera.position.x) * 0.035;
    camera.position.y += (pointer.y * 0.35 + 0.4 - camera.position.y) * 0.035;
    camera.lookAt(0, 0, -2);
  });

  return null;
}

function NetworkField() {
  const group = useRef<THREE.Group>(null);

  const nodes = useMemo(() => {
    const result: Point3[] = [];

    for (let i = 0; i < 42; i++) {
      result.push([
        (Math.random() - 0.5) * 11,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 5 - 1,
      ]);
    }

    return result;
  }, []);

  const lines = useMemo(() => {
    const result: [Point3, Point3][] = [];

    for (let i = 0; i < nodes.length; i++) {
      const nearest = nodes
        .map((node, index) => ({
          index,
          distance: new THREE.Vector3(...node).distanceTo(
            new THREE.Vector3(...nodes[i])
          ),
        }))
        .filter((item) => item.index !== i)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 2);

      nearest.forEach(({ index }) => {
        result.push([nodes[i], nodes[index]]);
      });
    }

    return result;
  }, [nodes]);

  useFrame((_, delta) => {
    if (!group.current) return;

    group.current.rotation.y += delta * 0.025;
    group.current.rotation.x = Math.sin(Date.now() * 0.00025) * 0.025;
  });

  return (
    <group ref={group}>
      {nodes.map((position, index) => (
        <mesh key={index} position={position}>
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshBasicMaterial color="#19b5a5" />
        </mesh>
      ))}

      {lines.map((line, index) => (
        <Line
          key={index}
          points={line}
          color="#19b5a5"
          transparent
          opacity={0.13}
          lineWidth={0.7}
        />
      ))}
    </group>
  );
}

function ScanStructure({
  position,
  onDone,
}: {
  position: THREE.Vector3;
  onDone: () => void;
}) {
  const group = useRef<THREE.Group>(null);
  const age = useRef(0);
  const finished = useRef(false);

  useFrame((_, delta) => {
    age.current += delta;

    if (!group.current) return;

    const progress = Math.min(age.current / 1.15, 1);
    const expand = 0.15 + progress * 1.9;
    const fade = Math.max(0, 1 - progress);

    group.current.scale.setScalar(expand);
    group.current.rotation.z += delta * 1.5;
    group.current.rotation.y += delta * 0.9;

    group.current.children.forEach((child) => {
      if (child instanceof THREE.Mesh) {
        const material = child.material;

        if (
          material instanceof THREE.MeshBasicMaterial ||
          material instanceof THREE.MeshStandardMaterial
        ) {
          material.opacity = fade;
        }
      }
    });

    if (age.current >= 1.15 && !finished.current) {
      finished.current = true;
      onDone();
    }
  });

  const ringPoints = useMemo(() => {
    const points: Point3[] = [];

    for (let i = 0; i <= 16; i++) {
      const angle = (i / 16) * Math.PI * 2;
      points.push([
        Math.cos(angle) * 0.75,
        Math.sin(angle) * 0.75,
        0,
      ]);
    }

    return points;
  }, []);

  const radialLines = useMemo(() => {
    const result: Point3[][] = [];

    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;

      result.push([
        [0, 0, 0],
        [Math.cos(angle) * 0.75, Math.sin(angle) * 0.75, 0],
      ]);
    }

    return result;
  }, []);

  return (
    <group ref={group} position={position}>
      <mesh>
        <torusGeometry args={[0.75, 0.018, 8, 48]} />
        <meshBasicMaterial
          color="#19b5a5"
          transparent
          opacity={1}
          toneMapped={false}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.48, 0.012, 8, 40]} />
        <meshBasicMaterial
          color="#7fffe8"
          transparent
          opacity={1}
          toneMapped={false}
        />
      </mesh>

      <Line
        points={ringPoints}
        color="#19b5a5"
        transparent
        opacity={1}
        lineWidth={1}
      />

      {radialLines.map((line, index) => (
        <Line
          key={index}
          points={line}
          color="#19b5a5"
          transparent
          opacity={1}
          lineWidth={0.8}
        />
      ))}

      {Array.from({ length: 8 }).map((_, index) => {
        const angle = (index / 8) * Math.PI * 2;

        return (
          <mesh
            key={index}
            position={[
              Math.cos(angle) * 0.75,
              Math.sin(angle) * 0.75,
              0,
            ]}
          >
            <boxGeometry args={[0.1, 0.1, 0.1]} />
            <meshBasicMaterial
              color="#7fffe8"
              transparent
              opacity={1}
              toneMapped={false}
            />
          </mesh>
        );
      })}

      <mesh position={[0, 0, 0.08]}>
        <sphereGeometry args={[0.09, 12, 12]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={1}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function ClickScanStructures() {
  const { camera, gl } = useThree();
  const [pulses, setPulses] = useState<ScanPulseData[]>([]);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;

      if (target?.closest("button, a, input, textarea, select")) {
        return;
      }

      const rect = gl.domElement.getBoundingClientRect();

      const pointer = new THREE.Vector2(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -((event.clientY - rect.top) / rect.height) * 2 + 1
      );

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(pointer, camera);

      const plane = new THREE.Plane(
        new THREE.Vector3(0, 0, 1),
        0
      );

      const worldPoint = new THREE.Vector3();

      if (raycaster.ray.intersectPlane(plane, worldPoint)) {
        setPulses((current) => [
          ...current,
          {
            id: Date.now() + Math.random(),
            position: worldPoint.clone(),
          },
        ]);
      }
    };

    window.addEventListener("pointerdown", handlePointerDown);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [camera, gl]);

  const removePulse = (id: number) => {
    setPulses((current) => current.filter((pulse) => pulse.id !== id));
  };

  return (
    <>
      {pulses.map((pulse) => (
        <ScanStructure
          key={pulse.id}
          position={pulse.position}
          onDone={() => removePulse(pulse.id)}
        />
      ))}
    </>
  );
}

function SecurityWorld() {
  return (
    <>
      <NetworkField />
      <ClickScanStructures />

      <gridHelper
        args={[24, 24, "#16495b", "#0b2936"]}
        position={[0, -3.2, -2]}
        rotation={[0, 0, 0]}
      />

      <Sparkles
        count={180}
        scale={[14, 8, 8]}
        size={1.4}
        speed={0.25}
        opacity={0.35}
        color="#19b5a5"
      />

      <ambientLight intensity={0.32} />

      <pointLight
        position={[3, 2, 3]}
        intensity={7}
        distance={10}
        color="#19b5a5"
      />

      <pointLight
        position={[-4, -1, 2]}
        intensity={4}
        distance={8}
        color="#2b7fff"
      />
    </>
  );
}

export default function CyberScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.4, 8], fov: 55 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ position: "absolute", inset: 0 }}
    >
      <fog attach="fog" args={["#071923", 5, 18]} />

      <CameraRig />
      <SecurityWorld />
    </Canvas>
  );
}
