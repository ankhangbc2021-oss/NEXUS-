'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function WeaponModel({ color, shape }: { color: string; shape: 'blade' | 'cannon' | 'pistol' | 'rifle' }) {
  const groupRef = useRef<THREE.Group>(null);

  const shaderMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: new THREE.Color(color) },
        },
        vertexShader: `
          varying vec3 vNormal;
          varying vec3 vPosition;
          uniform float uTime;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vPosition = position;
            vec3 pos = position;
            pos += normal * sin(pos.y * 5.0 + uTime * 2.0) * 0.01;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 uColor;
          uniform float uTime;
          varying vec3 vNormal;
          varying vec3 vPosition;
          void main() {
            float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.5);
            float scanLine = sin(vPosition.y * 30.0 + uTime * 3.0) * 0.5 + 0.5;
            vec3 col = uColor * (0.6 + fresnel * 0.8 + scanLine * 0.1);
            float alpha = 0.7 + fresnel * 0.3;
            gl_FragColor = vec4(col, alpha);
          }
        `,
        transparent: true,
        side: THREE.DoubleSide,
      }),
    [color]
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    shaderMat.uniforms.uTime.value = t;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.3;
    }
  });

  const geometry = useMemo(() => {
    switch (shape) {
      case 'blade':
        return <boxGeometry args={[0.08, 2.5, 0.3]} />;
      case 'cannon':
        return <cylinderGeometry args={[0.15, 0.3, 2.2, 8]} />;
      case 'pistol':
        return <boxGeometry args={[0.15, 0.8, 1.2]} />;
      case 'rifle':
        return <boxGeometry args={[0.12, 0.5, 2.0]} />;
    }
  }, [shape]);

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.4}>
      <group ref={groupRef}>
        <mesh material={shaderMat} rotation={[0, 0, shape === 'blade' ? 0.3 : 0]}>
          {geometry}
        </mesh>
        {/* Glow sphere */}
        <mesh>
          <sphereGeometry args={[1.5, 16, 16]} />
          <meshBasicMaterial color={color} transparent opacity={0.02} side={THREE.BackSide} />
        </mesh>
      </group>
    </Float>
  );
}

const shapeMap: Record<string, 'blade' | 'cannon' | 'pistol' | 'rifle'> = {
  'PHANTOM EDGE': 'blade',
  'RIFT CANNON': 'cannon',
  'VOID PISTOL': 'pistol',
  'NOVA RIFLE': 'rifle',
};

export default function WeaponViewer({ weaponName, color }: { weaponName: string; color: string }) {
  return (
    <div className="w-full h-[250px] md:h-[300px]">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        {/* alpha: true handles transparency */}
        <ambientLight intensity={0.2} />
        <pointLight position={[3, 3, 3]} color={color} intensity={1} />
        <pointLight position={[-3, -2, 2]} color="#ffffff" intensity={0.2} />
        <WeaponModel color={color} shape={shapeMap[weaponName] || 'rifle'} />
      </Canvas>
    </div>
  );
}
