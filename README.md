# Quantum Circuit Simulator - React Native Mobile App

An interactive mobile application for building, simulating, and visualizing quantum circuits. Features a touch-optimized interface, premium animations, haptic feedback, and comprehensive quantum gate operations.

![Quantum Circuit Simulator](./icons/icon-512x512.png)

---

## ✨ Features

### Core Functionality
- **Interactive Circuit Editor**: Touch-optimized circuit building with intuitive tap-to-place gates
- **Multiple Qubits**: Simulate circuits with up to 5 qubits
- **Rich Gate Palette**: 
  - **Single-Qubit Gates**: Hadamard (H), Pauli-X, Y, Z, Phase (S), and T gates
  - **Multi-Qubit Gates**: Controlled-NOT (CNOT) and SWAP
  - **Measurement**: Dedicated measurement operation (M)
- **Real-time Simulation**: Instant quantum simulation on your device
- **Rich Visualizations**:
  - Interactive probability histogram
  - Complete state vector display
  - Animated charts with gradient colors

### Mobile-First UX Enhancements
- **Premium Design**: Modern gradients, glassmorphism effects, and smooth animations
- **Touch Gestures**: 
  - Tap to place gates
  - Long-press to remove gates
  - Bi-directional scrolling for large circuits
- **Haptic Feedback**: Physical feedback for all interactions
- **Floating Action Buttons**: Quick access to Simulate and Clear
- **Animated Transitions**: Smooth entrance animations and state changes
- **Interactive Learning**: Built-in tutorials with step-by-step guides
- **Responsive Layout**: Optimized for both phones and tablets

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (optional, but recommended)
- iOS Simulator (for Mac) or Android Emulator

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/XIVIX-Official/quantum-circuit-simulator.git
   cd quantum-circuit-simulator
   ```

2. **Install dependencies:**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Run on your device:**
   - **iOS Simulator:** Press `i` in the terminal
   - **Android Emulator:** Press `a` in the terminal
   - **Physical Device:** Scan the QR code with Expo Go app

## 📱 How to Use

1. **Select a Gate**: Tap any gate from the horizontal scrolling palette
2. **Place the Gate**: Tap an empty cell on a qubit wire to place it
3. **Multi-Qubit Gates**: 
   - Tap the control qubit first
   - Then tap the target qubit on the same step
4. **Adjust Qubits**: Use + and − buttons to change qubit count (1-5)
5. **Simulate**: Tap the floating "Simulate" button with the play icon
6. **View Results**: 
   - Toggle between Histogram and State Vector views
   - Scroll through measurement probabilities
7. **Remove Gates**: Long-press any gate to remove it
8. **Learn**: Tap "Learn with Examples" to explore quantum concepts

## 🎨 UI/UX Highlights

- **Premium Color Scheme**: Cyan-purple gradients with dark mode optimized
- **Smooth Animations**: Spring-based animations powered by Reanimated
- **Haptic Feedback**: Physical feedback using Expo Haptics
- **Gesture Recognition**: React Native Gesture Handler for smooth interactions
- **SVG Graphics**: Custom circuit connectors and visualizations
- **Responsive Charts**: Beautiful probability distributions with react-native-chart-kit

## 🏗️ Architecture

```
.
├── components/              # React Native UI components
│   ├── CircuitBoard.tsx    # Touch-optimized circuit editor
│   ├── Gate.tsx            # Animated gate visualization
│   ├── GatePalette.tsx     # Horizontal scrolling gate selector
│   ├── HistogramChart.tsx  # Probability distribution chart
│   ├── InfoPanel.tsx       # Gate information display
│   ├── LearnScreen.tsx     # Interactive tutorials
│   ├── Logo.tsx            # Animated app logo
│   └── ResultsDisplay.tsx  # Simulation results with tabs
├── lib/                    # Utility libraries
│   └── complex.ts          # Complex number operations
├── services/               # Business logic
│   └── quantumSimulator.ts # Quantum circuit simulation engine
├── App.tsx                 # Main app component
├── constants.ts            # Gate properties and matrices
├── theme.ts                # Design system (colors, typography, spacing)
├── types.ts                # TypeScript definitions
├── index.js                # React Native entry point
├── app.json                # Expo configuration
└── package.json            # Dependencies and scripts
```

## 🔧 Technologies

- **React Native 0.74.5**: Cross-platform mobile framework
- **Expo ~54.0**: Development platform
- **TypeScript**: Type-safe development
- **React Navigation**: Screen navigation
- **React Native Reanimated**: High-performance animations
- **React Native Gesture Handler**: Touch gestures
- **Expo Linear Gradient**: Premium gradient backgrounds
- **Expo Haptics**: Physical feedback
- **React Native SVG**: Custom graphics
- **React Native Chart Kit**: Data visualization

## 🧪 Quantum Gates Reference

- **H (Hadamard)**: Creates superposition - equal probability of |0⟩ and |1⟩
- **X (Pauli-X)**: Quantum NOT gate - flips qubit state
- **Y (Pauli-Y)**: Rotates qubit around Y-axis by π radians
- **Z (Pauli-Z)**: Phase flip - introduces -1 phase to |1⟩ state
- **S (Phase)**: π/2 phase rotation around Z-axis
- **T (π/8)**: π/4 phase rotation - enables universal quantum computation
- **CNOT**: Controlled-NOT - flips target if control is |1⟩
- **SWAP**: Exchanges states of two qubits
- **M (Measure)**: Collapses superposition to classical bit

## 📊 Simulation

The app simulates quantum circuits using:
- State vector propagation
- Complex number arithmetic
- Tensor product operations
- 1024-shot measurement sampling

## 🎯 Future Enhancements

- [ ] Save/Load circuits
- [ ] Share circuits with friends
- [ ] More quantum gates (Toffoli, Fredkin)
- [ ] Custom gate builder
- [ ] Quantum algorithm presets
- [ ] Dark/Light theme toggle
- [ ] Circuit export (OpenQASM)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Powered by XIVIX**

## 🔧 Troubleshooting

### Common Issues

**Installation fails:**
```bash
npm install --legacy-peer-deps --force
```

**Metro bundler issues:**
```bash
npx expo start --clear
```

**iOS build fails:**
```bash
cd ios && pod install && cd ..
```

## 📞 Support

For issues and questions, please open an issue on GitHub or contact XIVIX.