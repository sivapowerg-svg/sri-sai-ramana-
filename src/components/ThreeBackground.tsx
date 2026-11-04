import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL to adapt performance gracefully
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // 1. Scene Setup - Deep Forest Emerald with Warm Amber Depth
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x071b12, 0.04);

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 9);

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 4. Lighting Rig (Warm golden temple key light + emerald fill)
    const ambientLight = new THREE.AmbientLight(0xfff5ea, 0.75);
    scene.add(ambientLight);

    const goldKeyLight = new THREE.PointLight(0xffb703, 3.2, 28);
    goldKeyLight.position.set(4, 5, 5);
    scene.add(goldKeyLight);

    const emeraldFillLight = new THREE.PointLight(0x10b981, 2.5, 25);
    emeraldFillLight.position.set(-5, -4, 3);
    scene.add(emeraldFillLight);

    // 5. Traditional South Indian 3D Sacred Brass Mandala & Urli Elements
    const centerpiece = new THREE.Group();
    scene.add(centerpiece);
    centerpiece.position.set(0, 0.5, -1);

    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.85,
      roughness: 0.25,
    });

    const bronzeMat = new THREE.MeshStandardMaterial({
      color: 0xb45309,
      metalness: 0.8,
      roughness: 0.35,
    });

    // Concentric orbiting sacred geometry rings
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(3.2, 0.035, 16, 80), brassMat);
    centerpiece.add(ring1);

    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.4, 0.025, 16, 64), bronzeMat);
    ring2.rotation.x = Math.PI / 4;
    centerpiece.add(ring2);

    const ring3 = new THREE.Mesh(new THREE.TorusGeometry(1.6, 0.02, 16, 48), brassMat);
    ring3.rotation.y = Math.PI / 3;
    centerpiece.add(ring3);

    // Glowing Diya Centerpiece
    const flameCore = new THREE.Mesh(
      new THREE.SphereGeometry(0.3, 20, 20),
      new THREE.MeshStandardMaterial({
        color: 0xffaa00,
        emissive: 0xff8800,
        emissiveIntensity: 2.2,
        roughness: 0.1,
      })
    );
    centerpiece.add(flameCore);

    // 6. Floating Golden Saffron & Spice Embers (Instanced Mesh)
    const particleCount = isSoftwareGl ? 60 : 180;
    const particleGeom = new THREE.DodecahedronGeometry(0.065, 0);
    const particleMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xd97706,
      emissiveIntensity: 1.1,
      roughness: 0.3,
      metalness: 0.6,
    });

    const instancedParticles = new THREE.InstancedMesh(particleGeom, particleMat, particleCount);
    instancedParticles.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

    const dummy = new THREE.Object3D();
    const particleData: {
      pos: THREE.Vector3;
      vel: THREE.Vector3;
      rot: THREE.Vector3;
      rotSpeed: THREE.Vector3;
      scale: number;
    }[] = [];

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.0 + Math.random() * 6.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI * 0.7;

      const pos = new THREE.Vector3(
        radius * Math.cos(theta) * Math.cos(phi),
        radius * Math.sin(phi),
        (Math.random() - 0.5) * 5
      );

      const vel = new THREE.Vector3(
        (Math.random() - 0.5) * 0.004,
        0.003 + Math.random() * 0.006,
        (Math.random() - 0.5) * 0.004
      );

      const rot = new THREE.Vector3(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      const rotSpeed = new THREE.Vector3(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02
      );

      const scale = 0.6 + Math.random() * 1.0;

      particleData.push({ pos, vel, rot, rotSpeed, scale });

      dummy.position.copy(pos);
      dummy.rotation.set(rot.x, rot.y, rot.z);
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      instancedParticles.setMatrixAt(i, dummy.matrix);
    }
    instancedParticles.instanceMatrix.needsUpdate = true;
    scene.add(instancedParticles);

    // 7. Interactive Parallax & Scroll Listener
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let scrollY = 0;
    let targetScrollY = 0;

    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const onScroll = () => {
      targetScrollY = window.scrollY;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    const onResize = () => {
      if (!renderer || !camera) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', onResize);

    // 8. Animation Loop
    let frameId = 0;
    const clock = new THREE.Clock();

    function animate() {
      const time = clock.getElapsedTime();

      // Smooth mouse and scroll interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      scrollY += (targetScrollY - scrollY) * 0.06;

      // Gentle rotation of sacred rings
      centerpiece.rotation.y = time * 0.12 + mouseX * 0.4;
      centerpiece.rotation.x = Math.sin(time * 0.1) * 0.1 + mouseY * 0.2;
      centerpiece.position.y = 0.5 - (scrollY * 0.0015); // gentle depth parallax on scroll
      ring1.rotation.z = time * 0.08;
      ring2.rotation.y = -time * 0.1;
      ring3.rotation.x = time * 0.15;

      // Diya flame pulse
      flameCore.scale.setScalar(1 + Math.sin(time * 2.5) * 0.12);

      // Light orbit
      goldKeyLight.position.x = 4 + Math.sin(time * 0.4) * 2 + mouseX * 2;
      goldKeyLight.position.y = 5 + Math.cos(time * 0.3) * 1.5 - mouseY * 2;

      // Particles flow smoothly upwards
      for (let i = 0; i < particleCount; i++) {
        const p = particleData[i];
        p.pos.y += p.vel.y;
        p.pos.x += p.vel.x + Math.sin(time + i) * 0.002;
        p.rot.x += p.rotSpeed.x;
        p.rot.y += p.rotSpeed.y;

        if (p.pos.y > 6) {
          p.pos.y = -5;
          p.pos.x = (Math.random() - 0.5) * 12;
        }

        dummy.position.copy(p.pos);
        dummy.rotation.set(p.rot.x, p.rot.y, p.rot.z);
        dummy.scale.setScalar(p.scale * (1 + Math.sin(time * 1.8 + i) * 0.15));
        dummy.updateMatrix();
        instancedParticles.setMatrixAt(i, dummy.matrix);
      }
      instancedParticles.instanceMatrix.needsUpdate = true;

      // Camera subtle parallax
      camera.position.x = mouseX * 1.0;
      camera.position.y = -mouseY * 0.8;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    }

    frameId = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);

      ring1.geometry.dispose();
      ring2.geometry.dispose();
      ring3.geometry.dispose();
      flameCore.geometry.dispose();
      particleGeom.dispose();

      brassMat.dispose();
      bronzeMat.dispose();
      particleMat.dispose();

      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};
