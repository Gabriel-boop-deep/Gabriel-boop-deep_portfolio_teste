import { useEffect, useRef } from "react";
import type * as ThreeModule from "three";

const strandSteps = 72;
const rungSteps = 24;
const helixHeight = 7.6;
const helixRadius = 1.05;
const turns = 3.25;
const particleCount = 170;
const fragmentCount = 34;

type Three = typeof ThreeModule;

const getCssColor = (THREE: Three, name: string, fallback: [number, number, number]) => {
  const root = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const [hue, saturation, lightness] = root
    ? root.split(/\s+/).slice(0, 3).map((value) => Number.parseFloat(value))
    : fallback;

  return new THREE.Color().setHSL(hue / 360, saturation / 100, lightness / 100);
};

const ScrollDnaBackground = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let disposed = false;
    let cleanup = () => {};

    const setupScene = async () => {
      const THREE: Three = await import("three");
      if (disposed || !mountRef.current) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, preserveDrawingBuffer: true });
      const startedAt = performance.now();

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);

      const createHelixCurve = (phase: number) =>
        new THREE.CatmullRomCurve3(
          Array.from({ length: strandSteps }, (_, index) => {
            const progress = index / (strandSteps - 1);
            const angle = progress * Math.PI * 2 * turns + phase;

            return new THREE.Vector3(
              Math.cos(angle) * helixRadius,
              (progress - 0.5) * helixHeight,
              Math.sin(angle) * helixRadius,
            );
          }),
        );

      const createCylinderBetween = (
        start: ThreeModule.Vector3,
        end: ThreeModule.Vector3,
        material: ThreeModule.Material,
        radius = 0.015,
      ) => {
        const direction = new THREE.Vector3().subVectors(end, start);
        const geometry = new THREE.CylinderGeometry(radius, radius, direction.length(), 10);
        const cylinder = new THREE.Mesh(geometry, material);

        cylinder.position.copy(start).add(end).multiplyScalar(0.5);
        cylinder.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());

        return cylinder;
      };

      const primary = getCssColor(THREE, "--primary", [215, 70, 55]);
      const accent = getCssColor(THREE, "--accent", [200, 75, 50]);
      const foreground = getCssColor(THREE, "--foreground", [210, 20, 95]);

      const group = new THREE.Group();
      group.rotation.x = -0.12;
      scene.add(group);

      const particleGroup = new THREE.Group();
      scene.add(particleGroup);

      const strandMaterialA = new THREE.MeshStandardMaterial({
        color: primary,
        emissive: primary,
        emissiveIntensity: 0.32,
        metalness: 0.2,
        roughness: 0.36,
        transparent: true,
        opacity: 0.26,
      });

      const strandMaterialB = new THREE.MeshStandardMaterial({
        color: accent,
        emissive: accent,
        emissiveIntensity: 0.28,
        metalness: 0.2,
        roughness: 0.38,
        transparent: true,
        opacity: 0.24,
      });

      const rungMaterial = new THREE.MeshStandardMaterial({
        color: foreground,
        emissive: foreground,
        emissiveIntensity: 0.07,
        roughness: 0.58,
        transparent: true,
        opacity: 0.12,
      });

      const nodeMaterialA = new THREE.MeshStandardMaterial({
        color: primary,
        emissive: primary,
        emissiveIntensity: 0.48,
        roughness: 0.3,
        transparent: true,
        opacity: 0.38,
      });

      const nodeMaterialB = new THREE.MeshStandardMaterial({
        color: accent,
        emissive: accent,
        emissiveIntensity: 0.42,
        roughness: 0.3,
        transparent: true,
        opacity: 0.34,
      });

      const particleGeometry = new THREE.BufferGeometry();
      const particlePositions = new Float32Array(particleCount * 3);
      const particleColors = new Float32Array(particleCount * 3);
      const mixedColor = primary.clone().lerp(accent, 0.52);

      for (let index = 0; index < particleCount; index += 1) {
        const progress = index / particleCount;
        const angle = progress * Math.PI * 2 * turns + Math.sin(index * 7.13) * 0.55;
        const orbitalRadius = helixRadius + 0.72 + (index % 9) * 0.12;
        const y = (progress - 0.5) * (helixHeight + 1.35) + Math.sin(index * 1.77) * 0.26;
        const radialNoise = Math.sin(index * 2.41) * 0.22;
        const color = index % 3 === 0 ? primary : index % 3 === 1 ? accent : mixedColor;

        particlePositions[index * 3] = Math.cos(angle) * (orbitalRadius + radialNoise);
        particlePositions[index * 3 + 1] = y;
        particlePositions[index * 3 + 2] = Math.sin(angle) * (orbitalRadius + radialNoise);
        particleColors[index * 3] = color.r;
        particleColors[index * 3 + 1] = color.g;
        particleColors[index * 3 + 2] = color.b;
      }

      particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
      particleGeometry.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

      const particleMaterial = new THREE.PointsMaterial({
        size: window.innerWidth < 768 ? 0.035 : 0.028,
        vertexColors: true,
        transparent: true,
        opacity: 0.34,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      const particles = new THREE.Points(particleGeometry, particleMaterial);
      particleGroup.add(particles);

      const fragmentGeometry = new THREE.TetrahedronGeometry(0.055, 0);
      const fragmentMaterial = new THREE.MeshStandardMaterial({
        color: mixedColor,
        emissive: mixedColor,
        emissiveIntensity: 0.26,
        roughness: 0.42,
        transparent: true,
        opacity: 0.24,
        depthWrite: false,
      });
      const fragments: ThreeModule.Mesh[] = [];

      for (let index = 0; index < fragmentCount; index += 1) {
        const progress = index / fragmentCount;
        const angle = progress * Math.PI * 2 * (turns + 0.8) + Math.cos(index * 1.91) * 0.9;
        const fragment = new THREE.Mesh(fragmentGeometry, fragmentMaterial);
        const radius = helixRadius + 1.25 + (index % 6) * 0.18;

        fragment.position.set(
          Math.cos(angle) * radius,
          (progress - 0.5) * (helixHeight + 1.2) + Math.cos(index * 0.73) * 0.18,
          Math.sin(angle) * radius,
        );
        fragment.rotation.set(index * 0.37, index * 0.61, index * 0.23);
        fragment.scale.setScalar(0.65 + (index % 5) * 0.14);
        fragments.push(fragment);
        particleGroup.add(fragment);
      }

      const curveA = createHelixCurve(0);
      const curveB = createHelixCurve(Math.PI);
      const tubeA = new THREE.Mesh(new THREE.TubeGeometry(curveA, 180, 0.032, 14, false), strandMaterialA);
      const tubeB = new THREE.Mesh(new THREE.TubeGeometry(curveB, 180, 0.032, 14, false), strandMaterialB);
      group.add(tubeA, tubeB);

      const sphereGeometry = new THREE.SphereGeometry(0.095, 20, 20);
      for (let index = 0; index < rungSteps; index += 1) {
        const progress = index / (rungSteps - 1);
        const pointA = curveA.getPointAt(progress);
        const pointB = curveB.getPointAt(progress);
        const rung = createCylinderBetween(pointA, pointB, rungMaterial, 0.012);
        const nodeA = new THREE.Mesh(sphereGeometry, nodeMaterialA);
        const nodeB = new THREE.Mesh(sphereGeometry, nodeMaterialB);

        nodeA.position.copy(pointA);
        nodeB.position.copy(pointB);
        group.add(rung, nodeA, nodeB);
      }

      scene.add(new THREE.AmbientLight(0xffffff, 0.28));

      const keyLight = new THREE.PointLight(primary, 8, 16);
      keyLight.position.set(2.7, 3.8, 4.2);
      scene.add(keyLight);

      const rimLight = new THREE.PointLight(accent, 6, 14);
      rimLight.position.set(-3.6, -2.2, -3.2);
      scene.add(rimLight);

      const resize = () => {
        const width = mount.clientWidth;
        const height = mount.clientHeight;
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };

      let targetScroll = window.scrollY / Math.max(document.body.scrollHeight - window.innerHeight, 1);
      let easedScroll = targetScroll;
      let animationId = 0;

      const updateScroll = () => {
        targetScroll = window.scrollY / Math.max(document.body.scrollHeight - window.innerHeight, 1);
      };

      const render = () => {
        const time = (performance.now() - startedAt) / 1000;
        easedScroll += (targetScroll - easedScroll) * 0.075;

        const orbit = easedScroll * Math.PI * 2.2 + 0.52;
        const radius = window.innerWidth < 768 ? 15 : 12;
        camera.position.set(Math.sin(orbit) * radius, Math.sin(orbit * 0.5) * 0.7, Math.cos(orbit) * radius);
        camera.lookAt(0, 0, 0);

        group.position.y = Math.sin(time * 0.45) * 0.08;
        group.rotation.y = Math.sin(time * 0.18) * 0.035;
        particleGroup.rotation.y = -easedScroll * Math.PI * 0.42 + time * 0.018;
        particleGroup.rotation.x = Math.sin(time * 0.12) * 0.025;
        particles.rotation.z = time * 0.006;
        fragments.forEach((fragment, index) => {
          fragment.rotation.x += 0.002 + index * 0.00003;
          fragment.rotation.y -= 0.0015 + index * 0.00002;
        });

        renderer.render(scene, camera);
        animationId = window.requestAnimationFrame(render);
      };

      resize();
      render();

      window.addEventListener("resize", resize);
      window.addEventListener("scroll", updateScroll, { passive: true });

      cleanup = () => {
        window.removeEventListener("resize", resize);
        window.removeEventListener("scroll", updateScroll);
        window.cancelAnimationFrame(animationId);
        renderer.dispose();
        scene.traverse((object) => {
          if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
            object.geometry.dispose();
            const materials = Array.isArray(object.material) ? object.material : [object.material];
            materials.forEach((material) => material.dispose());
          }
        });
        if (renderer.domElement.parentNode === mount) {
          mount.removeChild(renderer.domElement);
        }
      };
    };

    void setupScene();

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-60 md:opacity-75" aria-hidden="true">
      <div ref={mountRef} className="absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,hsl(var(--primary)/0.08),transparent_30%),radial-gradient(circle_at_50%_70%,hsl(var(--accent)/0.05),transparent_34%)]" />
    </div>
  );
};

export default ScrollDnaBackground;
