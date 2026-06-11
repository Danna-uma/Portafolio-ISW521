import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

/* ═══════════════════════════════════════════════════════════════
   Toyota bZ4X — Dashboard de Configuración y Diagnóstico 3D
   ═══════════════════════════════════════════════════════════════ */

/* ────────────────────────────────────────────────────────────
   1. VIEWER 3D (Three.js WebGL)
   ──────────────────────────────────────────────────────────── */
class Viewer3D {
    constructor(container, loaderUi) {
        this.container = container;
        this.loaderUi = loaderUi;
        this.progressBar = loaderUi?.querySelector('#loader-progress-fill');
        this.progressPct = loaderUi?.querySelector('#loader-percentage');

        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.model = null;
        this.carBodyMaterials = null;
        this.interactionTimeout = null;

        this.targetCameraPos = new THREE.Vector3();
        this.targetControlsTarget = new THREE.Vector3();
        this.isAnimatingCamera = false;

        this.init();
    }

    init() {
        // Scene setup
        this.scene = new THREE.Scene();

        // Camera setup
        this.camera = new THREE.PerspectiveCamera(45, this.container.clientWidth / this.container.clientHeight, 0.1, 100);
        this.camera.position.set(-6, 2.5, 7);

        // Renderer setup
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.0;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        this.container.appendChild(this.renderer.domElement);

        // Environment
        const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
        this.scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        this.scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 2.0);
        dirLight.position.set(5, 10, 5);
        dirLight.castShadow = true;
        dirLight.shadow.mapSize.width = 2048;
        dirLight.shadow.mapSize.height = 2048;
        dirLight.shadow.camera.near = 0.5;
        dirLight.shadow.camera.far = 25;
        dirLight.shadow.camera.left = -6;
        dirLight.shadow.camera.right = 6;
        dirLight.shadow.camera.top = 6;
        dirLight.shadow.camera.bottom = -6;
        dirLight.shadow.bias = -0.0005;
        this.scene.add(dirLight);

        // Soft shadow plane
        const shadowPlane = new THREE.Mesh(
            new THREE.PlaneGeometry(30, 30),
            new THREE.ShadowMaterial({ opacity: 0.6 })
        );
        shadowPlane.rotation.x = -Math.PI / 2;
        shadowPlane.receiveShadow = true;
        shadowPlane.position.y = 0;
        this.scene.add(shadowPlane);

        // Controls
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.minDistance = 3.5;
        this.controls.maxDistance = 12;
        this.controls.maxPolarAngle = Math.PI / 2 - 0.02; // Prevent going fully below ground
        this.controls.autoRotate = true;
        this.controls.autoRotateSpeed = 1.2;
        this.controls.target.set(0, 0.8, 0);

        // Events
        window.addEventListener('resize', this.onWindowResize.bind(this));

        this.controls.addEventListener('start', () => {
            this.container.classList.add('grabbing');
            this.controls.autoRotate = false;
            this.isAnimatingCamera = false;
            clearTimeout(this.interactionTimeout);
        });

        this.controls.addEventListener('end', () => {
            this.container.classList.remove('grabbing');
            this.interactionTimeout = setTimeout(() => {
                this.controls.autoRotate = true;
            }, 3000);
        });

        // Load Model
        this.loadModel();

        // Animation Loop
        this.renderer.setAnimationLoop(this.animate.bind(this));
    }

    loadModel() {
        const loader = new GLTFLoader();

        loader.load(
            './assets/toyota_bz4x.glb',
            (gltf) => {
                this.model = gltf.scene;

                // Auto-scale the model so its largest dimension is ~4.5 units (standard car length)
                const box = new THREE.Box3().setFromObject(this.model);
                const size = new THREE.Vector3();
                box.getSize(size);
                const maxDim = Math.max(size.x, size.y, size.z);
                if (maxDim > 0) {
                    const scaleFactor = 4.5 / maxDim;
                    this.model.scale.set(scaleFactor, scaleFactor, scaleFactor);
                }

                // Process materials and shadows
                this.model.traverse((child) => {
                    if (child.isMesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;

                        // Heuristic to find car paint material
                        if (child.material && child.material.name) {
                            const name = child.material.name.toLowerCase();
                            if (name.includes('paint') || name.includes('body') || name.includes('carroceria') || name.includes('color')) {
                                if (!this.carBodyMaterials) this.carBodyMaterials = [];
                                if (!this.carBodyMaterials.includes(child.material)) {
                                    this.carBodyMaterials.push(child.material);
                                }
                            }
                        }
                    }
                });

                // Fallback heuristic: find largest mesh by volume
                if (!this.carBodyMaterials || this.carBodyMaterials.length === 0) {
                    console.warn("Could not identify car body material by name. Falling back to largest mesh.");
                    let largestMesh = null;
                    let maxVolume = 0;
                    this.model.traverse((child) => {
                        if (child.isMesh && child.material) {
                            child.geometry.computeBoundingBox();
                            if (child.geometry.boundingBox) {
                                const size = new THREE.Vector3();
                                child.geometry.boundingBox.getSize(size);
                                const volume = size.x * size.y * size.z;
                                if (volume > maxVolume) {
                                    maxVolume = volume;
                                    largestMesh = child;
                                }
                            }
                        }
                    });
                    if (largestMesh) {
                        this.carBodyMaterials = [largestMesh.material];
                    }
                }

                // Initial subtle floating spawn
                this.model.position.y = -0.5;

                this.scene.add(this.model);

                // Hide loader
                if (this.loaderUi) {
                    this.loaderUi.style.opacity = '0';
                    setTimeout(() => {
                        this.loaderUi.style.visibility = 'hidden';
                    }, 600);
                }

                // Show Canvas smoothly
                this.renderer.domElement.classList.add('canvas-ready');

                // Intro Animation
                this.camera.position.set(-8, 3, 10);
                this.animateCameraTo(new THREE.Vector3(-5, 2, 6), new THREE.Vector3(0, 0.8, 0));

                showToast('Modelo 3D cargado con éxito');
            },
            (xhr) => {
                if (this.loaderUi) {
                    const percent = (xhr.loaded / 29595960) * 100;
                    const safePercent = Math.min(100, Math.max(0, Math.round(percent)));
                    if (this.progressBar) this.progressBar.style.width = safePercent + '%';
                    if (this.progressPct) this.progressPct.textContent = safePercent + '%';
                }
            },
            (error) => {
                console.error('An error happened loading the GLB', error);
                if (this.loaderUi) {
                    this.loaderUi.innerHTML = '<p style="color:var(--danger)">Error al cargar el modelo 3D.</p>';
                }
            }
        );
    }

    setCarColor(hexColor) {
        if (!this.carBodyMaterials) return;
        const color = new THREE.Color(hexColor);
        this.carBodyMaterials.forEach(mat => {
            if (mat.color) {
                // Initialize targetColor if it doesn't exist
                if (!mat.userData.targetColor) mat.userData.targetColor = mat.color.clone();
                mat.userData.targetColor.copy(color);
            }
        });
    }

    animateCameraTo(position, target) {
        this.targetCameraPos.copy(position);
        this.targetControlsTarget.copy(target);
        this.isAnimatingCamera = true;
        this.controls.autoRotate = false;

        clearTimeout(this.interactionTimeout);
        this.interactionTimeout = setTimeout(() => {
            this.controls.autoRotate = true;
        }, 5000);
    }

    onWindowResize() {
        if (!this.camera || !this.renderer) return;
        this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    }

    animate() {
        this.controls.update();

        // Model float entrance logic
        if (this.model && this.model.position.y < 0) {
            this.model.position.y += (0 - this.model.position.y) * 0.05;
        }

        // Smooth color transition
        if (this.carBodyMaterials) {
            this.carBodyMaterials.forEach(mat => {
                if (mat.userData.targetColor) {
                    mat.color.lerp(mat.userData.targetColor, 0.08);
                }
            });
        }

        // Camera animation
        if (this.isAnimatingCamera) {
            this.camera.position.lerp(this.targetCameraPos, 0.04);
            this.controls.target.lerp(this.targetControlsTarget, 0.04);

            if (this.camera.position.distanceTo(this.targetCameraPos) < 0.05) {
                this.isAnimatingCamera = false;
            }
        }

        this.renderer.render(this.scene, this.camera);
    }
}


/* ────────────────────────────────────────────────────────────
   2. ANIMATED COUNTER (IntersectionObserver)
   ──────────────────────────────────────────────────────────── */
class AnimatedCounter {
    constructor(card) {
        this.card = card;
        this.valueEl = card.querySelector('.stat-value');
        this.target = parseFloat(card.dataset.count ?? 0);
        this.suffix = card.dataset.suffix ?? '';
        this.decimals = parseInt(card.dataset.decimals ?? 0);
        this.started = false;
        this._observe();
    }

    _observe() {
        const io = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !this.started) {
                this.started = true;
                this._run();
                io.disconnect();
            }
        }, { threshold: 0.3 });
        io.observe(this.card);
    }

    _run() {
        const DURATION = 1400;
        const start = performance.now();

        const tick = now => {
            const t = Math.min((now - start) / DURATION, 1);
            const val = (1 - Math.pow(1 - t, 3)) * this.target; // Ease out cubic
            this.valueEl.textContent = val.toFixed(this.decimals) + this.suffix;

            if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }
}

/* ────────────────────────────────────────────────────────────
   3. BUY BUTTON FEEDBACK
   ──────────────────────────────────────────────────────────── */
function initBuyButtons() {
    document.querySelectorAll('.btn-buy:not(:disabled)').forEach(btn => {
        btn.addEventListener('click', () => {
            const original = btn.textContent;

            btn.textContent = '✓ Ordenado';
            btn.style.background = '#6B8E6B';
            btn.style.boxShadow = '0 2px 8px rgba(107, 142, 107, 0.3)';
            showToast('Repuesto agregado a la cotización ✓');

            setTimeout(() => {
                btn.textContent = original;
                btn.style.background = '';
                btn.style.boxShadow = '';
            }, 2000);
        });
    });
}

/* ────────────────────────────────────────────────────────────
   UTILIDAD: Toast de Notificación
   ──────────────────────────────────────────────────────────── */
function showToast(msg, duration = 2500) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = msg;
    toast.classList.add('toast--show');

    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
        toast.classList.remove('toast--show');
    }, duration);
}

/* ────────────────────────────────────────────────────────────
   INICIALIZADOR PRINCIPAL
   ──────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

    // 1. Init 3D Viewer
    const container = document.getElementById('canvas3d-container');
    const loaderUi = document.getElementById('glb-loader');

    let viewer = null;
    if (container) {
        viewer = new Viewer3D(container, loaderUi);
    }

    // 2. Color Configurator
    const colorButtons = document.querySelectorAll('.color-swatch-btn');
    const colorNames = {
        '#B22222': 'Rojo Carmesí',
        '#F5F5F0': 'Blanco Perlado',
        '#121212': 'Negro Eclipse',
        '#4F5154': 'Gris Titanio',
        '#0033A0': 'Azul Eléctrico',
        '#A5A9B4': 'Plata Lunar'
    };

    colorButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const hex = btn.dataset.color;

            // UI Update
            colorButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const colorNameEl = document.getElementById('selected-color-name');
            if (colorNameEl && colorNames[hex]) {
                colorNameEl.textContent = colorNames[hex];
            }

            // 3D Update
            if (viewer) {
                viewer.setCarColor(hex);
            }

            // Trigger shine overlay animation on UI if present
            const shineOverlay = document.querySelector('.shine-overlay');
            if (shineOverlay) {
                shineOverlay.classList.remove('shine-animate');
                void shineOverlay.offsetWidth;
                shineOverlay.classList.add('shine-animate');
            }

            showToast(`Color carrocería: ${colorNames[hex] || 'Personalizado'} 🎨`);
        });
    });

    // 3. Camera Presets
    if (viewer) {
        document.getElementById('btn-view-front')?.addEventListener('click', () => {
            viewer.animateCameraTo(new THREE.Vector3(-4, 1.2, 5), new THREE.Vector3(0, 0.8, 0));
            document.getElementById('active-view-name').textContent = 'Vista Frontal (Tres Cuartos)';
        });
        document.getElementById('btn-view-rear')?.addEventListener('click', () => {
            viewer.animateCameraTo(new THREE.Vector3(4, 1.5, -5), new THREE.Vector3(0, 0.8, 0));
            document.getElementById('active-view-name').textContent = 'Vista Trasera (Tres Cuartos)';
        });
        document.getElementById('btn-view-left')?.addEventListener('click', () => {
            viewer.animateCameraTo(new THREE.Vector3(-6, 1.2, 0), new THREE.Vector3(0, 0.8, 0));
            document.getElementById('active-view-name').textContent = 'Vista Lateral Izquierda';
        });
        document.getElementById('btn-view-right')?.addEventListener('click', () => {
            viewer.animateCameraTo(new THREE.Vector3(6, 1.2, 0), new THREE.Vector3(0, 0.8, 0));
            document.getElementById('active-view-name').textContent = 'Vista Lateral Derecha';
        });
        document.getElementById('btn-view-top')?.addEventListener('click', () => {
            viewer.animateCameraTo(new THREE.Vector3(0, 6, 0.1), new THREE.Vector3(0, 0, 0));
            document.getElementById('active-view-name').textContent = 'Vista Superior Aérea';
        });
        document.getElementById('btn-view-reset')?.addEventListener('click', () => {
            viewer.animateCameraTo(new THREE.Vector3(-5, 2, 6), new THREE.Vector3(0, 0.8, 0));
            document.getElementById('active-view-name').textContent = 'Vista de Inspección restablecida';
            showToast('Configurador restablecido ↺');
        });

        // Image Toolbar Controls map to 3D Camera
        document.getElementById('btn-zoom-in')?.addEventListener('click', () => {
            if (viewer.camera && viewer.controls) {
                const dir = new THREE.Vector3().subVectors(viewer.controls.target, viewer.camera.position).normalize();
                viewer.camera.position.add(dir.multiplyScalar(0.8));
                viewer.controls.update();
            }
        });
        document.getElementById('btn-zoom-out')?.addEventListener('click', () => {
            if (viewer.camera && viewer.controls) {
                const dir = new THREE.Vector3().subVectors(viewer.camera.position, viewer.controls.target).normalize();
                viewer.camera.position.add(dir.multiplyScalar(0.8));
                viewer.controls.update();
            }
        });
        document.getElementById('btn-reset')?.addEventListener('click', () => {
            viewer.animateCameraTo(new THREE.Vector3(-5, 2, 6), new THREE.Vector3(0, 0.8, 0));
        });
    }

    // 3.5 Theme Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.body.classList.add('dark-theme');
        }

        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            showToast(isDark ? 'Modo oscuro activado 🌕' : 'Modo claro activado 🔆');
        });
    }

    // 4. Modal Screen (Fullscreen 3D)
    const fullscreenModal = document.getElementById('fullscreen-modal');
    const btnFullscreen = document.getElementById('btn-fullscreen');
    const btnCloseModal = document.getElementById('modal-close');
    const modalContainer = document.getElementById('modal-img-container');

    // Instead of duplicating WebGL context, we just full-screen the container itself
    // using the browser's native Fullscreen API for a better experience.
    btnFullscreen?.addEventListener('click', () => {
        const heroFig = document.getElementById('hero-figure');
        if (heroFig) {
            if (heroFig.requestFullscreen) {
                heroFig.requestFullscreen();
            } else if (heroFig.webkitRequestFullscreen) {
                heroFig.webkitRequestFullscreen();
            }
        }
    });

    // 5. Init Counters & Buttons
    document.querySelectorAll('.stat-card[data-count]').forEach(card => {
        new AnimatedCounter(card);
    });

    initBuyButtons();

    // Welcome message
    setTimeout(() => {
        showToast('Bienvenido al Configurador de Toyota bZ4X Premium 🔋');
    }, 1000);
});
