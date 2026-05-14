'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

function EnergyCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  const shaderMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uColor1: { value: new THREE.Color('#00f0ff') },
          uColor2: { value: new THREE.Color('#b000ff') },
        },
        vertexShader: `
          varying vec2 vUv;
          varying vec3 vPosition;
          uniform float uTime;
          void main() {
            vUv = uv;
            vPosition = position;
            vec3 pos = position;
            float displacement = sin(pos.x * 10.0 + uTime * 2.0) * 0.02 +
                                 sin(pos.y * 8.0 + uTime * 1.5) * 0.02 +
                                 sin(pos.z * 12.0 + uTime * 3.0) * 0.015;
            pos += normal * displacement;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform float uTime;
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          varying vec2 vUv;
          varying vec3 vPosition;

          void main() {
            float fresnel = pow(1.0 - abs(dot(normalize(vPosition), vec3(0.0, 0.0, 1.0))), 3.0);
            vec3 color = mix(uColor1, uColor2, sin(vUv.y * 6.28 + uTime) * 0.5 + 0.5);
            float pulse = sin(uTime * 2.0) * 0.15 + 0.85;
            float alpha = fresnel * pulse * 0.8;
            gl_FragColor = vec4(color, alpha);
          }
        `,
        transparent: true,
        side: THREE.DoubleSide,
      }),
    []
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    shaderMaterial.uniforms.uTime.value = t;
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.15;
      meshRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
    }
    if (glowRef.current) {
      const s = 1 + Math.sin(t * 2) * 0.05;
      glowRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group>
      <mesh ref={meshRef} material={shaderMaterial}>
        <icosahedronGeometry args={[1.2, 5]} />
      </mesh>
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshBasicMaterial
          color="#00f0ff"
          transparent
          opacity={0.03}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

function OrbitalRings() {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.2;
      ring1Ref.current.rotation.z = t * 0.1;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = t * 0.15;
      ring2Ref.current.rotation.x = Math.PI * 0.3 + t * 0.05;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = t * 0.12;
      ring3Ref.current.rotation.y = Math.PI * 0.6 + t * 0.08;
    }
  });

  return (
    <group>
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.5, 0.008, 16, 100]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.4} />
      </mesh>
      <mesh ref={ring2Ref}>
        <torusGeometry args={[3.0, 0.006, 16, 100]} />
        <meshBasicMaterial color="#b000ff" transparent opacity={0.3} />
      </mesh>
      <mesh ref={ring3Ref}>
        <torusGeometry args={[3.5, 0.004, 16, 100]} />
        <meshBasicMaterial color="#ff00aa" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

function FloatingParticles({ count = 200 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const particles = useMemo(() => {
    const positions: number[] = [];
    const speeds: number[] = [];
    const offsets: number[] = [];
    for (let i = 0; i < count; i++) {
      positions.push(
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 12
      );
      speeds.push(Math.random() * 0.5 + 0.2);
      offsets.push(Math.random() * Math.PI * 2);
    }
    return { positions, speeds, offsets };
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    const matrix = new THREE.Matrix4();

    for (let i = 0; i < count; i++) {
      const x = particles.positions[i * 3] + Math.sin(t * particles.speeds[i] + particles.offsets[i]) * 0.3;
      const y = particles.positions[i * 3 + 1] + Math.cos(t * particles.speeds[i] * 0.7 + particles.offsets[i]) * 0.4;
      const z = particles.positions[i * 3 + 2] + Math.sin(t * particles.speeds[i] * 0.5) * 0.2;

      const scale = 0.01 + Math.sin(t * 2 + particles.offsets[i]) * 0.005;
      matrix.makeTranslation(x, y, z);
      matrix.scale(new THREE.Vector3(scale, scale, scale));
      meshRef.current.setMatrixAt(i, matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#00f0ff" transparent opacity={0.6} />
    </instancedMesh>
  );
}

function MouseLight() {
  const lightRef = useRef<THREE.PointLight>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    if (lightRef.current) {
      const x = (state.pointer.x * viewport.width) / 2;
      const y = (state.pointer.y * viewport.height) / 2;
      lightRef.current.position.lerp(new THREE.Vector3(x, y, 3), 0.1);
    }
  });

  return <pointLight ref={lightRef} color="#00f0ff" intensity={0.8} distance={8} />;
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-[3]" style={{ pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ pointerEvents: 'auto' }}
      >
        {/* No background color - alpha: true gives us transparency */}

        <ambientLight intensity={0.15} />
        <pointLight position={[5, 5, 5]} color="#00f0ff" intensity={0.5} />
        <pointLight position={[-5, -3, 3]} color="#b000ff" intensity={0.3} />
        <MouseLight />

        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <EnergyCore />
        </Float>

        <OrbitalRings />
        <FloatingParticles count={150} />

        <Stars
          radius={50}
          depth={50}
          count={2000}
          factor={3}
          saturation={0.5}
          fade
          speed={0.5}
        />
      </Canvas>
    </div>
  );
}
