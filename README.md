# XIVIX Quantum Circuit Simulator

<div align="center">

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Python](https://img.shields.io/badge/python-3.8+-blue.svg)](https://www.python.org/)
[![React](https://img.shields.io/badge/react-18+-blue.svg)](https://reactjs.org/)
[![Qiskit](https://img.shields.io/badge/qiskit-latest-blue.svg)](https://qiskit.org/)

A powerful web-based quantum circuit builder and simulator leveraging Qiskit for quantum computing simulations and React for an intuitive user interface.

[Documentation](#documentation) • [Quick Start](#quick-start) • [Features](#features)

</div>

---

## 🎯 Overview

XIVIX Quantum Circuit Simulator is an open-source platform designed to democratize quantum computing education and experimentation. It provides an intuitive graphical interface for building quantum circuits and executing them using IBM's Qiskit framework, making quantum computing accessible to beginners and researchers alike.

**Key Mission:** Bridging the gap between quantum computing theory and practical implementation through interactive visualization and simulation.

---

## ✨ Features

### Current Features
- **Interactive Circuit Builder:** Drag-and-drop interface for quantum gate placement
- **Multiple Quantum Gates:** Support for single-qubit and multi-qubit gates (Pauli, Hadamard, CNOT, etc.)
- **Real-time Simulation:** Execute circuits and view results instantly
- **Circuit Visualization:** Clear representation of quantum circuits
- **Measurement Support:** Collapse quantum states and view measurement outcomes
- **Result Visualization:** Histograms and state vector displays

### Planned Features
- Circuit optimization algorithms
- Advanced gate decomposition
- Quantum algorithm templates (Grover's, VQE, etc.)
- Multi-backend simulation support
- Circuit export/import functionality
- Collaborative circuit design
- Performance benchmarking tools

---

## 📁 Project Structure

```
quantum-circuit-simulator/
├── backend/
│   ├── app.py                      # Flask/FastAPI main application
│   ├── requirements.txt            # Python dependencies
│   ├── config.py                   # Configuration settings
│   ├── src/
│   │   ├── __init__.py
│   │   ├── qiskit_engine.py        # Qiskit integration & simulation engine
│   │   ├── circuit_manager.py      # Circuit creation & manipulation
│   │   ├── gates.py                # Quantum gate definitions
│   │   ├── validators.py           # Circuit validation logic
│   │   └── utils.py                # Utility functions
│   ├── routes/
│   │   ├── __init__.py
│   │   ├── circuit.py              # Circuit-related endpoints
│   │   ├── simulation.py           # Simulation endpoints
│   │   └── results.py              # Result management endpoints
│   ├── tests/
│   │   ├── __init__.py
│   │   ├── test_qiskit_engine.py
│   │   ├── test_circuit_manager.py
│   │   ├── test_gates.py
│   │   └── test_validators.py
│   └── .env.example                # Environment variable template
│
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   ├── favicon.ico
│   │   └── manifest.json
│   ├── src/
│   │   ├── index.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── components/
│   │   │   ├── CircuitBuilder/
│   │   │   │   ├── CircuitBuilder.jsx
│   │   │   │   ├── CircuitCanvas.jsx
│   │   │   │   └── CircuitBuilder.css
│   │   │   ├── GatePalette/
│   │   │   │   ├── GatePalette.jsx
│   │   │   │   ├── GateButton.jsx
│   │   │   │   └── GatePalette.css
│   │   │   ├── ControlPanel/
│   │   │   │   ├── ControlPanel.jsx
│   │   │   │   ├── ControlPanel.css
│   │   │   │   └── SimulationControls.jsx
│   │   │   ├── ResultsDisplay/
│   │   │   │   ├── ResultsDisplay.jsx
│   │   │   │   ├── HistogramChart.jsx
│   │   │   │   ├── StateVectorDisplay.jsx
│   │   │   │   └── ResultsDisplay.css
│   │   │   ├── Sidebar/
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   └── Sidebar.css
│   │   │   └── Common/
│   │   │       ├── Header.jsx
│   │   │       ├── Footer.jsx
│   │   │       └── LoadingSpinner.jsx
│   │   ├── hooks/
│   │   │   ├── useCircuit.js       # Circuit state management
│   │   │   ├── useSimulation.js    # Simulation hook
│   │   │   └── useAPI.js           # API communication hook
│   │   ├── utils/
│   │   │   ├── circuitUtils.js
│   │   │   ├── apiClient.js
│   │   │   └── constants.js
│   │   ├── styles/
│   │   │   ├── variables.css
│   │   │   ├── globals.css
│   │   │   └── responsive.css
│   │   └── services/
│   │       └── api.js              # API service layer
│   ├── package.json
│   ├── .env.example
│   └── public/
│
├── docs/
│   ├── ARCHITECTURE.md             # System design documentation
│   ├── API_REFERENCE.md            # API endpoint documentation
│   ├── SETUP_GUIDE.md              # Detailed setup instructions
│   ├── USER_GUIDE.md               # User documentation
│   ├── DEVELOPMENT.md              # Development workflow guide
│   └── QUANTUM_BASICS.md           # Quantum computing primer
│
├── .gitignore
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                  # CI/CD pipeline
│   │   └── tests.yml               # Automated testing
│   └── ISSUE_TEMPLATE/
│       ├── bug_report.md
│       └── feature_request.md
├── docker-compose.yml              # Docker configuration
├── Dockerfile                       # Backend Docker image
├── LICENSE
├── README.md                        # This file
└── ROADMAP.md                       # Project roadmap

```

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Python:** 3.8 or higher
- **Node.js:** 14.0 or higher
- **npm:** 6.0 or higher
- **Git:** Latest version
- **Docker** (optional, for containerized development)

---

## 🚀 Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/XIVIX-Project/quantum-circuit-simulator.git
cd quantum-circuit-simulator
```

### Step 2: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create a virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create environment file
cp .env.example .env

# Verify installation
python -c "import qiskit; print(qiskit.__version__)"
```

### Step 3: Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Verify installation
npm --version
```

### Step 4: Configuration

Update the `.env` files in both backend and frontend with your configuration:

**backend/.env:**
```
FLASK_ENV=development
DEBUG=True
API_PORT=5000
CORS_ORIGIN=http://localhost:3000
```

**frontend/.env:**
```
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🎯 Quick Start

### Start the Backend Server

```bash
cd backend
source venv/bin/activate  # or venv\Scripts\activate on Windows
python app.py
```

The API will be available at `http://localhost:5000`

### Start the Frontend Development Server

In a new terminal:

```bash
cd frontend
npm start
```

The application will open at `http://localhost:3000`

### Create Your First Circuit

1. Open the browser to `http://localhost:3000`
2. Drag quantum gates from the Gate Palette onto the Circuit Canvas
3. Specify the target qubits for each gate
4. Click "Simulate" to execute the circuit
5. View results in the Results Display panel

---

## 🏗️ Architecture

### System Overview

```
┌─────────────────────────────────────────────────────┐
│                 React Frontend                      │
│  (CircuitBuilder, GatePalette, ResultsDisplay)      │
└──────────────────┬──────────────────────────────────┘
                   │ REST API
                   ↓
┌─────────────────────────────────────────────────────┐
│              Flask/FastAPI Backend                  │
│  (Routes, Circuit Manager, Validators)              │
└──────────────────┬──────────────────────────────────┘
                   │
                   ↓
┌─────────────────────────────────────────────────────┐
│           Qiskit Simulation Engine                  │
│  (Gate Operations, Measurement, State Vectors)      │
└─────────────────────────────────────────────────────┘
```

### Technology Stack

**Backend:**
- Flask/FastAPI: REST API framework
- Qiskit: Quantum computing framework
- NumPy: Numerical computing
- pytest: Testing framework

**Frontend:**
- React: UI library
- Recharts: Data visualization
- Axios: HTTP client
- CSS3: Styling

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Key Endpoints

#### Create Circuit
```
POST /circuits
Content-Type: application/json

{
  "name": "My First Circuit",
  "num_qubits": 2,
  "num_classical_bits": 2
}
```

#### Add Gate
```
POST /circuits/{circuit_id}/gates
Content-Type: application/json

{
  "gate_type": "h",
  "target_qubit": 0,
  "control_qubit": null
}
```

#### Simulate Circuit
```
POST /circuits/{circuit_id}/simulate
Content-Type: application/json

{
  "shots": 1024
}
```

#### Get Results
```
GET /circuits/{circuit_id}/results
```

For detailed API documentation, see [API_REFERENCE.md](docs/API_REFERENCE.md)

---

## 📖 Usage Guide

### Building a Simple Bell State Circuit

1. **Create Circuit:** Set up a 2-qubit circuit
2. **Add Hadamard Gate:** Apply H-gate to qubit 0
3. **Add CNOT Gate:** Apply CNOT with control on qubit 0, target on qubit 1
4. **Add Measurements:** Measure both qubits to classical bits
5. **Simulate:** Run the circuit with 1024 shots
6. **Analyze:** View the results showing the Bell state (00 or 11)

For more examples and tutorials, see [USER_GUIDE.md](docs/USER_GUIDE.md)

---

## 🛠️ Development

### Setting Up Development Environment

```bash
# Install development dependencies
cd backend
pip install -r requirements-dev.txt

# For frontend
cd frontend
npm install
```

### Code Style

- **Python:** Follow PEP 8 (use `black` for formatting)
- **JavaScript/React:** Follow Airbnb style guide (use `eslint`)

### Running Linters

```bash
# Backend
cd backend
flake8 src/
black src/

# Frontend
cd frontend
npm run lint
```

---

## ✅ Testing

### Backend Tests

```bash
cd backend
pytest tests/ -v
```

### Frontend Tests

```bash
cd frontend
npm test
```

### Coverage Report

```bash
# Backend
cd backend
pytest tests/ --cov=src

# Frontend
cd frontend
npm test -- --coverage
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Support & Community

- **Issues & Bug Reports:** [GitHub Issues](https://github.com/XIVIX-Official/quantum-circuit-simulator/issues)
- **Discussions:** [GitHub Discussions](https://github.com/XIVIX-Official/quantum-circuit-simulator/discussions)
- **Email:** info@codexustechnologies.com

---

## 🎓 Learning Resources

New to quantum computing? Check out [QUANTUM_BASICS.md](docs/QUANTUM_BASICS.md) for an introduction to quantum concepts before diving into circuit design.

---

<div align="center">

**Powered by XIVIX**

</div>