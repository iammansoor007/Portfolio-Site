import { useRef, useMemo, useCallback, memo } from 'react';
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber';
import { Float, MeshDistortMaterial, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { useMousePosition } from '@/hooks/useMousePosition';
import { useAnimationFrame } from '@/hooks/useAnimationFrame';

/**
 * Constants for consistent configuration
 */
const CONFIG = {
  COLORS: {
    PRIMARY: '#00d4ff',
    SECONDARY: '#a855f7',
    TERTIARY: '#3b82f6',
  },
  LIGHTING: {
    AMBIENT_INTENSITY: 0.3,
    DIRECTIONAL_INTENSITY: 0.5,
    POINT_INTENSITY: 0.5,
  },
  MOUSE_SENSITIVITY: {
    ROTATION: 0.2,
    POSITION: 0.3,
    PARTICLE: 0.1,
  },
} as const;

/**
 * Types for better type safety
 */
type Position = [number, number, number];
type SphereProps = {
  position: Position;
  size: number;
  speed: number;
  color?: string;
  opacity?: number;
};

/**
 * Optimized floating sphere with memoization
 */
const FloatingSphere = memo(({ 
  position, 
  size, 
  speed, 
  color = CONFIG.COLORS.PRIMARY,
  opacity = 0.6 
}: SphereProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { normalizedX, normalizedY } = useMousePosition();
  
  // Use lerp for smoother animations
  const targetRotation = useRef({ x: 0, y: 0 });
  const targetPosition = useRef(position);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Smoothly interpolate towards target
    const lerpFactor = 0.1;
    
    // Calculate target rotation with time-based animation
    targetRotation.current.x = normalizedY * CONFIG.MOUSE_SENSITIVITY.ROTATION + 
      Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    targetRotation.current.y = normalizedX * CONFIG.MOUSE_SENSITIVITY.ROTATION + 
      state.clock.elapsedTime * 0.15;

    // Smooth rotation
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      targetRotation.current.x,
      lerpFactor
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      targetRotation.current.y,
      lerpFactor
    );

    // Smooth position
    meshRef.current.position.lerp(
      new THREE.Vector3(
        position[0] + normalizedX * CONFIG.MOUSE_SENSITIVITY.POSITION,
        position[1] + normalizedY * CONFIG.MOUSE_SENSITIVITY.POSITION,
        position[2]
      ),
      lerpFactor
    );
  });

  return (
    <Float 
      speed={speed} 
      rotationIntensity={0.5} 
      floatIntensity={0.5}
      floatingRange={[-0.1, 0.1]}
    >
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[size, 2]} /> {/* Increased detail */}
        <MeshDistortMaterial
          color={color}
          distort={0.4}
          speed={2}
          roughness={0.1} // More reflective
          metalness={0.9}
          transparent
          opacity={opacity}
          clearcoat={0.5}
          clearcoatRoughness={0}
          envMapIntensity={1}
        />
      </mesh>
    </Float>
  );
});

FloatingSphere.displayName = 'FloatingSphere';

/**
 * Enhanced glowing torus with trail effect
 */
const GlowingTorus = memo(({ position }: { position: Position }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { normalizedX, normalizedY } = useMousePosition();

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Smooth rotation with mouse interaction
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 + 
      normalizedY * CONFIG.MOUSE_SENSITIVITY.ROTATION * 2;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 + 
      normalizedX * CONFIG.MOUSE_SENSITIVITY.ROTATION * 2;
  });

  return (
    <group position={position}>
      {/* Main torus */}
      <mesh ref={meshRef}>
        <torusGeometry args={[1.8, 0.06, 32, 200]} /> {/* More segments for smoother look */}
        <meshPhysicalMaterial
          color={CONFIG.COLORS.SECONDARY}
          emissive={CONFIG.COLORS.SECONDARY}
          emissiveIntensity={0.8}
          transparent
          opacity={0.8}
          transmission={0.2} // Glass-like effect
          thickness={0.5}
          roughness={0}
          metalness={0.5}
        />
      </mesh>
      
      {/* Inner glow effect */}
      <mesh>
        <torusGeometry args={[1.6, 0.02, 16, 100]} />
        <meshBasicMaterial
          color={CONFIG.COLORS.SECONDARY}
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
});

GlowingTorus.displayName = 'GlowingTorus';

/**
 * Optimized particle field with instanced rendering
 */
const ParticleField = memo(() => {
  const count = 300; // Increased particle count
  const pointsRef = useRef<THREE.Points>(null);
  const { normalizedX, normalizedY } = useMousePosition();
  
  // Generate particles with varying sizes
  const { positions, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      // Spherical distribution
      const radius = 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      // Varying sizes
      sizes[i] = Math.random() * 0.03 + 0.01;
    }
    
    return { positions, sizes };
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    // Smooth particle field rotation
    pointsRef.current.rotation.y = THREE.MathUtils.lerp(
      pointsRef.current.rotation.y,
      state.clock.elapsedTime * 0.01 + normalizedX * CONFIG.MOUSE_SENSITIVITY.PARTICLE,
      0.05
    );
    pointsRef.current.rotation.x = THREE.MathUtils.lerp(
      pointsRef.current.rotation.x,
      normalizedY * CONFIG.MOUSE_SENSITIVITY.PARTICLE,
      0.05
    );
    
    // Pulsing effect
    const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    pointsRef.current.scale.setScalar(scale);
  });

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color={CONFIG.COLORS.PRIMARY}
        transparent
        opacity={0.7}
        sizeAttenuation
        alphaTest={0.01}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
});

ParticleField.displayName = 'ParticleField';

/**
 * Custom camera with smooth movement
 */
const SmoothCamera = () => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const { normalizedX, normalizedY } = useMousePosition();

  useFrame((state) => {
    if (!cameraRef.current) return;
    
    // Subtle camera movement based on mouse
    const targetX = normalizedX * 0.5;
    const targetY = normalizedY * 0.5;
    
    cameraRef.current.position.x = THREE.MathUtils.lerp(
      cameraRef.current.position.x,
      targetX,
      0.05
    );
    cameraRef.current.position.y = THREE.MathUtils.lerp(
      cameraRef.current.position.y,
      targetY,
      0.05
    );
    
    cameraRef.current.lookAt(0, 0, 0);
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={[0, 0, 10]}
      fov={50}
      near={0.1}
      far={100}
    />
  );
};

/**
 * Performance monitoring component (development only)
 */
const PerformanceMonitor = () => {
  useFrame((state) => {
    if (process.env.NODE_ENV === 'development') {
      // Log performance every 5 seconds
      if (Math.floor(state.clock.elapsedTime) % 5 === 0) {
        console.log(`Frame time: ${state.clock.getDelta().toFixed(3)}s`);
      }
    }
  });
  return null;
};

/**
 * Main 3D scene component for hero section
 */
const Scene3D = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        shadows={false}
        frameloop="always"
      >
        {/* Camera */}
        <SmoothCamera />
        
        {/* Lighting with fallback for older devices */}
        <ambientLight intensity={CONFIG.LIGHTING.AMBIENT_INTENSITY} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={CONFIG.LIGHTING.DIRECTIONAL_INTENSITY}
          castShadow={false}
        />
        <pointLight 
          position={[-10, -10, -10]} 
          color={CONFIG.COLORS.SECONDARY}
          intensity={CONFIG.LIGHTING.POINT_INTENSITY}
          distance={50}
          decay={2}
        />
        <pointLight 
          position={[10, 10, 10]} 
          color={CONFIG.COLORS.PRIMARY}
          intensity={0.4}
          distance={50}
          decay={2}
        />
        
        {/* Fog for depth */}
        <fog attach="fog" args={['#000000', 5, 25]} />

        {/* 3D Elements with optimized positioning */}
        <group>
          <FloatingSphere 
            position={[3, 1, -2]} 
            size={0.8} 
            speed={1.5}
            color={CONFIG.COLORS.PRIMARY}
            opacity={0.7}
          />
          <FloatingSphere 
            position={[-4, -1, -3]} 
            size={0.5} 
            speed={2}
            color={CONFIG.COLORS.TERTIARY}
            opacity={0.5}
          />
          {/* Additional sphere for more depth */}
          <FloatingSphere 
            position={[1, -2, -4]} 
            size={0.6} 
            speed={1}
            color={CONFIG.COLORS.SECONDARY}
            opacity={0.4}
          />
        </group>
        
        <GlowingTorus position={[0, 0, -5]} />
        <ParticleField />
        
        {/* Performance monitor for development */}
        {process.env.NODE_ENV === 'development' && <PerformanceMonitor />}
      </Canvas>
    </div>
  );
};

export default memo(Scene3D);