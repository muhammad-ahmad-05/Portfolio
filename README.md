Interactive 3D Creative Portfolio

A premium, highly interactive 3D creative portfolio architected with **React Three Fiber**, **Three.js**, and **GSAP ScrollTrigger**. The site abandons traditional static layouts for a continuous, mathematically driven WebGL particle system that morphs seamlessly across sections while maintaining accessibility on low-power mobile devices.

---

## 🚀 Architectural Highlights

* **Mathematical Vector Field Morphs:** Drives a uniform cloud of 6,400 active vertex particles across 5 distinct geometrical states (Orb, Double Helix DNA, Splintered Side Columns, Crash Volumetric Core, and Supernova Plane) mapped directly to scroll velocity and position.
* **Adaptive Contrast Inversion:** Implements CSS hardware-accelerated `mix-blend-mode: difference` layers over pure white text blocks, causing typography to dynamically invert into high-contrast reciprocal colors whenever bright WebGL elements pass behind them.
* **Mobile-First Performance Engineering:** Automatically scales geometric bounds, caps high-DPR (Device Pixel Ratio) displays to a performant max of 1.5, disables resource-heavy antialiasing on mobile GPUs, and decouples `<Canvas />` pointer events to prevent mobile touch-scroll hijacking.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework & Core** | React 18, Vite, JavaScript (ES6+) |
| **3D Engine & Rendering** | Three.js, React Three Fiber (@react-three/fiber), Three Drei (@react-three/drei) |
| **Animation & Scroll Mechanics** | GSAP (GreenSock Animation Platform), ScrollTrigger, `@gsap/react` |
| **Post-Processing Effects** | React Three Postprocessing (Real-time Mipmap Blur Bloom) |
| **Styling & Layout** | Tailwind CSS, CSS Blend Modes |

---

## 📂 Featured Projects Showcased

### 1. Aetheria // 3D Creative Portfolio
* **Tech Stack:** React Three Fiber, Three.js, GSAP ScrollTrigger, Postprocessing, Tailwind CSS
* Architected an interactive, continuous 3D particle system rendering 6,400 points driven by custom mathematical vector field equations.
* Engineered dynamic asset-framing and responsive spatial checks to transition shapes flawlessly between complex geometries on mobile viewports.
* Integrated custom CSS hardware acceleration layers using `mix-blend-mode: difference` for adaptive text visibility against real-time WebGL canvas objects.

### 2. Movers.pk (Final Year Project - In Progress)
* **Tech Stack:** Node.js, PostgreSQL, Socket.io, Google Maps API, React, React Native
* B2B/B2C digital freight matching platform utilizing a React web portal for shippers and a React Native mobile app for transport drivers.
* Architected geospatial queries for dynamic radius location searches and implemented live GPS asset tracking using persistent WebSockets.

### 3. MERN Stack Freelancing Website
* **Tech Stack:** MongoDB, Express.js, React, Node.js, Material-UI (MUI), AWS SES, JWT
* Secured sensitive user records and authentication routes with JSON Web Tokens (JWT) and integrated transactional mail routing via AWS SES.
* Optimized front-end state hydration and performance with a centralized Redux state management architecture.

### 4. ByteForge & Modern E-Commerce Platform
* **Tech Stack:** Vite, Firebase, Tailwind CSS
* High-performance e-commerce engine deployed on serverless architecture with fully responsive, mobile-optimized UI.
* Engineered secure client-side user authentication modules and real-time database cloud synchronization hooks.

### 5. Native C++ Management System
* **Tech Stack:** Native C++, SFML (Simple and Fast Multimedia Library)
* Engineered an interactive graphical user interface and desktop frontend rendering layer leveraging the SFML graphics pipeline.
* Enforced clean Object-Oriented Programming (OOP) architectures alongside strict manual memory optimizations and deterministic asset loading protocols.

---

## ⚙️ Development & Installation

### Prerequisites
Ensure you have **Node.js (v18+)** and **npm** installed on your machine.

### Installation Steps

1. Clone the repository:
   ```bash
   git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
   cd your-repo-name
