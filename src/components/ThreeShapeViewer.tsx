import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { RotateCw, Eye, Sparkles, ZoomIn, ZoomOut, Maximize2, RefreshCw } from 'lucide-react';
import { ShapeId } from '../types/geometry';

interface ThreeShapeViewerProps {
  shapeId: ShapeId;
  height?: string;
  autoRotateDefault?: boolean;
  interactiveControls?: boolean;
  customScale?: Record<string, number>;
  compact?: boolean;
}

export const ThreeShapeViewer: React.FC<ThreeShapeViewerProps> = ({
  shapeId,
  height = '420px',
  autoRotateDefault = true,
  interactiveControls = true,
  customScale,
  compact = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const shapeGroupRef = useRef<THREE.Group | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // Interaction state
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const rotationVelocityRef = useRef({ x: 0, y: 0.005 });
  const [isWireframe, setIsWireframe] = useState(false);
  const [autoRotate, setAutoRotate] = useState(autoRotateDefault);
  const [showGuides, setShowGuides] = useState(true);
  const [isControlsOpen, setIsControlsOpen] = useState(!compact);

  // Color scheme constants
  const CYAN = 0x06b6d4;
  const ELECTRIC_BLUE = 0x3b82f6;
  const WHITE = 0xffffff;

  // Build the 3D mesh hierarchy for the specified shape
  const createShapeObjects = useCallback((scene: THREE.Scene, shape: ShapeId, wireframe: boolean, scaleParams?: Record<string, number>) => {
    // Remove existing shape group
    if (shapeGroupRef.current) {
      scene.remove(shapeGroupRef.current);
      shapeGroupRef.current.traverse((child) => {
        if ((child as THREE.Mesh).isMesh || (child as THREE.LineSegments).isLineSegments) {
          const mesh = child as THREE.Mesh;
          if (mesh.geometry) mesh.geometry.dispose();
          if (mesh.material) {
            if (Array.isArray(mesh.material)) {
              mesh.material.forEach((m) => m.dispose());
            } else {
              mesh.material.dispose();
            }
          }
        }
      });
    }

    const group = new THREE.Group();
    shapeGroupRef.current = group;

    // Materials
    const solidMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0f2952,
      emissive: 0x071b3d,
      roughness: 0.25,
      metalness: 0.65,
      clearcoat: 0.9,
      clearcoatRoughness: 0.1,
      transparent: true,
      opacity: wireframe ? 0.15 : 0.88,
      wireframe: wireframe,
      side: THREE.DoubleSide,
    });

    const wireMaterial = new THREE.LineBasicMaterial({
      color: CYAN,
      linewidth: 2,
      transparent: true,
      opacity: 0.9,
    });

    const accentWireMaterial = new THREE.LineBasicMaterial({
      color: 0x67e8f9,
      linewidth: 1,
      transparent: true,
      opacity: 0.45,
    });

    // Helper for subtle floor contact disc
    const floorGeo = new THREE.RingGeometry(0.1, 2.8, 32);
    const floorMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.08,
      side: THREE.DoubleSide,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = -2.1;
    group.add(floorMesh);

    switch (shape) {
      case 'cube': {
        const a = scaleParams?.a ? Math.max(1, Math.min(2.8, (scaleParams.a / 5) * 2.2)) : 2.2;
        const boxGeo = new THREE.BoxGeometry(a, a, a);
        const boxMesh = new THREE.Mesh(boxGeo, solidMaterial);
        group.add(boxMesh);

        // Edges
        const edgesGeo = new THREE.EdgesGeometry(boxGeo);
        const edgesLine = new THREE.LineSegments(edgesGeo, wireMaterial);
        group.add(edgesLine);

        // Corner vertices indicator dots
        const vertexGeo = new THREE.SphereGeometry(0.06, 12, 12);
        const vertexMat = new THREE.MeshBasicMaterial({ color: 0x22d3ee });
        const half = a / 2;
        const corners = [
          [-half, -half, -half], [half, -half, -half],
          [-half, half, -half], [half, half, -half],
          [-half, -half, half], [half, -half, half],
          [-half, half, half], [half, half, half],
        ];
        corners.forEach(([x, y, z]) => {
          const vMesh = new THREE.Mesh(vertexGeo, vertexMat);
          vMesh.position.set(x, y, z);
          group.add(vMesh);
        });
        break;
      }

      case 'cuboid': {
        const l = scaleParams?.l ? Math.max(1.2, Math.min(3.2, (scaleParams.l / 8) * 2.8)) : 2.8;
        const b = scaleParams?.b ? Math.max(0.8, Math.min(2.4, (scaleParams.b / 5) * 1.8)) : 1.8;
        const h = scaleParams?.h ? Math.max(0.8, Math.min(2.2, (scaleParams.h / 4) * 1.4)) : 1.4;
        const boxGeo = new THREE.BoxGeometry(l, h, b);
        const boxMesh = new THREE.Mesh(boxGeo, solidMaterial);
        group.add(boxMesh);

        const edgesGeo = new THREE.EdgesGeometry(boxGeo);
        const edgesLine = new THREE.LineSegments(edgesGeo, wireMaterial);
        group.add(edgesLine);

        // Vertices
        const vertexGeo = new THREE.SphereGeometry(0.06, 12, 12);
        const vertexMat = new THREE.MeshBasicMaterial({ color: 0x60a5fa });
        const hl = l / 2, hh = h / 2, hb = b / 2;
        const corners = [
          [-hl, -hh, -hb], [hl, -hh, -hb],
          [-hl, hh, -hb], [hl, hh, -hb],
          [-hl, -hh, hb], [hl, -hh, hb],
          [-hl, hh, hb], [hl, hh, hb],
        ];
        corners.forEach(([x, y, z]) => {
          const vMesh = new THREE.Mesh(vertexGeo, vertexMat);
          vMesh.position.set(x, y, z);
          group.add(vMesh);
        });
        break;
      }

      case 'cylinder': {
        const r = scaleParams?.r ? Math.max(0.7, Math.min(1.8, (scaleParams.r / 7) * 1.25)) : 1.25;
        const h = scaleParams?.h ? Math.max(1.2, Math.min(3.2, (scaleParams.h / 10) * 2.5)) : 2.5;
        const cylGeo = new THREE.CylinderGeometry(r, r, h, 36);
        const cylMesh = new THREE.Mesh(cylGeo, solidMaterial);
        group.add(cylMesh);

        // Highlight circular rims
        const topCircleGeo = new THREE.BufferGeometry();
        const bottomCircleGeo = new THREE.BufferGeometry();
        const topPts: THREE.Vector3[] = [];
        const botPts: THREE.Vector3[] = [];
        const segs = 48;
        for (let i = 0; i <= segs; i++) {
          const theta = (i / segs) * Math.PI * 2;
          topPts.push(new THREE.Vector3(Math.cos(theta) * r, h / 2, Math.sin(theta) * r));
          botPts.push(new THREE.Vector3(Math.cos(theta) * r, -h / 2, Math.sin(theta) * r));
        }
        topCircleGeo.setFromPoints(topPts);
        bottomCircleGeo.setFromPoints(botPts);

        const rimLineTop = new THREE.Line(topCircleGeo, wireMaterial);
        const rimLineBot = new THREE.Line(bottomCircleGeo, wireMaterial);
        group.add(rimLineTop);
        group.add(rimLineBot);

        // Vertical seam lines
        const seamGeo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(r, -h / 2, 0), new THREE.Vector3(r, h / 2, 0),
          new THREE.Vector3(-r, -h / 2, 0), new THREE.Vector3(-r, h / 2, 0),
        ]);
        const seamLines = new THREE.LineSegments(seamGeo, accentWireMaterial);
        group.add(seamLines);
        break;
      }

      case 'cone': {
        const r = scaleParams?.r ? Math.max(0.8, Math.min(2.0, (scaleParams.r / 3) * 1.35)) : 1.35;
        const h = scaleParams?.h ? Math.max(1.2, Math.min(3.2, (scaleParams.h / 4) * 2.6)) : 2.6;
        const coneGeo = new THREE.ConeGeometry(r, h, 36);
        const coneMesh = new THREE.Mesh(coneGeo, solidMaterial);
        coneMesh.position.y = 0;
        group.add(coneMesh);

        // Circular rim at bottom
        const baseCircleGeo = new THREE.BufferGeometry();
        const basePts: THREE.Vector3[] = [];
        const segs = 48;
        for (let i = 0; i <= segs; i++) {
          const theta = (i / segs) * Math.PI * 2;
          basePts.push(new THREE.Vector3(Math.cos(theta) * r, -h / 2, Math.sin(theta) * r));
        }
        baseCircleGeo.setFromPoints(basePts);
        const baseLine = new THREE.Line(baseCircleGeo, wireMaterial);
        group.add(baseLine);

        // Slant edge lines from apex to base
        const slantGeo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, h / 2, 0), new THREE.Vector3(r, -h / 2, 0),
          new THREE.Vector3(0, h / 2, 0), new THREE.Vector3(-r, -h / 2, 0),
          new THREE.Vector3(0, h / 2, 0), new THREE.Vector3(0, -h / 2, r),
          new THREE.Vector3(0, h / 2, 0), new THREE.Vector3(0, -h / 2, -r),
        ]);
        const slantLines = new THREE.LineSegments(slantGeo, accentWireMaterial);
        group.add(slantLines);

        // Apex indicator sphere
        const apexGeo = new THREE.SphereGeometry(0.07, 12, 12);
        const apexMat = new THREE.MeshBasicMaterial({ color: 0x818cf8 });
        const apexMesh = new THREE.Mesh(apexGeo, apexMat);
        apexMesh.position.set(0, h / 2, 0);
        group.add(apexMesh);
        break;
      }

      case 'sphere': {
        const r = scaleParams?.r ? Math.max(0.9, Math.min(2.0, (scaleParams.r / 7) * 1.5)) : 1.5;
        const sphereGeo = new THREE.SphereGeometry(r, 40, 30);
        const sphereMesh = new THREE.Mesh(sphereGeo, solidMaterial);
        group.add(sphereMesh);

        // Rings: Equator and Prime Meridian guide rings
        const equatorPts: THREE.Vector3[] = [];
        const meridianPts: THREE.Vector3[] = [];
        const segs = 64;
        for (let i = 0; i <= segs; i++) {
          const theta = (i / segs) * Math.PI * 2;
          equatorPts.push(new THREE.Vector3(Math.cos(theta) * r, 0, Math.sin(theta) * r));
          meridianPts.push(new THREE.Vector3(Math.cos(theta) * r, Math.sin(theta) * r, 0));
        }
        const eqGeo = new THREE.BufferGeometry().setFromPoints(equatorPts);
        const merGeo = new THREE.BufferGeometry().setFromPoints(meridianPts);
        const eqLine = new THREE.Line(eqGeo, wireMaterial);
        const merLine = new THREE.Line(merGeo, accentWireMaterial);
        group.add(eqLine);
        group.add(merLine);
        break;
      }

      case 'hemisphere': {
        const r = scaleParams?.r ? Math.max(0.9, Math.min(2.0, (scaleParams.r / 7) * 1.5)) : 1.5;
        // Curved dome surface (phiLength = PI/2)
        const domeGeo = new THREE.SphereGeometry(r, 40, 24, 0, Math.PI * 2, 0, Math.PI / 2);
        const domeMesh = new THREE.Mesh(domeGeo, solidMaterial);
        group.add(domeMesh);

        // Flat circular base at y = 0
        const baseCircleGeo = new THREE.CircleGeometry(r, 48);
        const baseMesh = new THREE.Mesh(baseCircleGeo, solidMaterial);
        baseMesh.rotation.x = Math.PI / 2;
        group.add(baseMesh);

        // Circular boundary rim
        const rimPts: THREE.Vector3[] = [];
        const segs = 64;
        for (let i = 0; i <= segs; i++) {
          const theta = (i / segs) * Math.PI * 2;
          rimPts.push(new THREE.Vector3(Math.cos(theta) * r, 0, Math.sin(theta) * r));
        }
        const rimGeo = new THREE.BufferGeometry().setFromPoints(rimPts);
        const rimLine = new THREE.Line(rimGeo, wireMaterial);
        group.add(rimLine);

        // Dome meridian arc
        const arcPts: THREE.Vector3[] = [];
        for (let i = 0; i <= 32; i++) {
          const theta = (i / 32) * Math.PI;
          arcPts.push(new THREE.Vector3(Math.cos(theta) * r, Math.sin(theta) * r, 0));
        }
        const arcGeo = new THREE.BufferGeometry().setFromPoints(arcPts);
        const arcLine = new THREE.Line(arcGeo, accentWireMaterial);
        group.add(arcLine);

        // Center position adjustment
        group.position.y = -r / 2;
        break;
      }
    }

    scene.add(group);
  }, []);

  // Initialize Three.js scene
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(3.5, 2.5, 4.5);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(0x0e1b38, 1.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x38bdf8, 2.8);
    keyLight.position.set(5, 7, 5);
    scene.add(keyLight);

    const cyanFillLight = new THREE.DirectionalLight(0x06b6d4, 1.8);
    cyanFillLight.position.set(-5, -2, -3);
    scene.add(cyanFillLight);

    const electricRimLight = new THREE.DirectionalLight(0x818cf8, 2.2);
    electricRimLight.position.set(0, 5, -5);
    scene.add(electricRimLight);

    // Initial shape build
    createShapeObjects(scene, shapeId, isWireframe, customScale);

    // Animation Loop
    let lastTime = performance.now();
    const animate = (time: number) => {
      animFrameIdRef.current = requestAnimationFrame(animate);
      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      if (shapeGroupRef.current) {
        if (autoRotate && !isDraggingRef.current) {
          shapeGroupRef.current.rotation.y += 0.8 * delta;
        } else if (!isDraggingRef.current) {
          // Subtle damping of leftover velocity
          shapeGroupRef.current.rotation.y += rotationVelocityRef.current.y;
          shapeGroupRef.current.rotation.x += rotationVelocityRef.current.x;
          rotationVelocityRef.current.y *= 0.94;
          rotationVelocityRef.current.x *= 0.94;
        }
      }

      renderer.render(scene, camera);
    };

    animFrameIdRef.current = requestAnimationFrame(animate);

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [shapeId, createShapeObjects]);

  // Rebuild mesh when wireframe or scale changes
  useEffect(() => {
    if (sceneRef.current) {
      createShapeObjects(sceneRef.current, shapeId, isWireframe, customScale);
    }
  }, [shapeId, isWireframe, customScale, createShapeObjects]);

  // Mouse & Touch Interaction handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    rotationVelocityRef.current = { x: 0, y: 0 };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || !shapeGroupRef.current) return;
    const deltaX = e.clientX - previousMousePositionRef.current.x;
    const deltaY = e.clientY - previousMousePositionRef.current.y;

    shapeGroupRef.current.rotation.y += deltaX * 0.009;
    shapeGroupRef.current.rotation.x += deltaY * 0.009;

    rotationVelocityRef.current = {
      x: deltaY * 0.002,
      y: deltaX * 0.002,
    };

    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (!cameraRef.current) return;
    e.preventDefault();
    const zoomDelta = e.deltaY * 0.003;
    const newZ = cameraRef.current.position.z + zoomDelta;
    if (newZ > 2.5 && newZ < 9) {
      cameraRef.current.position.z = newZ;
    }
  };

  const resetCamera = () => {
    if (!cameraRef.current || !shapeGroupRef.current) return;
    cameraRef.current.position.set(3.5, 2.5, 4.5);
    cameraRef.current.lookAt(0, 0, 0);
    shapeGroupRef.current.rotation.set(0, 0, 0);
    rotationVelocityRef.current = { x: 0, y: 0 };
  };

  const zoomCamera = (direction: 'in' | 'out') => {
    if (!cameraRef.current) return;
    const step = direction === 'in' ? -0.8 : 0.8;
    const newZ = cameraRef.current.position.z + step;
    if (newZ > 2.5 && newZ < 9) {
      cameraRef.current.position.z = newZ;
    }
  };

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#0b142d]/80 via-[#070d1e]/90 to-[#040814] border border-cyan-500/20 shadow-2xl group select-none"
      style={{ height }}
    >
      {/* Background ambient decorative grid */}
      <div className="absolute inset-0 grid-bg-pattern opacity-30 pointer-events-none" />

      {/* Floating 3D Badge */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-2 pointer-events-none">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 backdrop-blur-md shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          Interactive 3D
        </span>
        {!compact && (
          <span className="hidden sm:inline-block text-[11px] text-slate-400 bg-slate-900/60 px-2 py-0.5 rounded border border-slate-700/50">
            Drag to rotate • Scroll to zoom
          </span>
        )}
      </div>

      {/* 3D WebGL Canvas */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onWheel={handleWheel}
      />

      {/* Sleek bottom control dock (Collapsible HUD) */}
      {interactiveControls && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 w-auto max-w-[95%]">
          <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 bg-slate-900/85 backdrop-blur-md rounded-xl border border-cyan-500/30 shadow-xl">
            {/* Auto-rotate toggle */}
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              title={autoRotate ? 'Pause Rotation' : 'Auto Rotate'}
              className={`p-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                autoRotate
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin-slow' : ''}`} />
              <span className="hidden sm:inline text-xs">{autoRotate ? 'Auto' : 'Paused'}</span>
            </button>

            {/* Wireframe toggle */}
            <button
              onClick={() => setIsWireframe(!isWireframe)}
              title={isWireframe ? 'Solid Surface' : 'Wireframe Mode'}
              className={`p-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                isWireframe
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-xs">{isWireframe ? 'Wireframe' : 'Solid'}</span>
            </button>

            {/* Zoom in / out */}
            <button
              onClick={() => zoomCamera('in')}
              title="Zoom In"
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => zoomCamera('out')}
              title="Zoom Out"
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>

            {/* Reset view */}
            <button
              onClick={resetCamera}
              title="Reset View"
              className="p-2 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
