# Quantum Computing Basics

This guide provides a basic introduction to quantum computing concepts for users of the XIVIX Quantum Circuit Simulator.

## Introduction to Quantum Computing

Quantum computing utilizes the principles of quantum mechanics to perform computations. Unlike classical computers that use bits (0 or 1), quantum computers use quantum bits or qubits.

## Fundamental Concepts

### 1. Qubits

A qubit is the quantum analogue of a classical bit. However, while a classical bit can only be in state 0 or 1, a qubit can be in a superposition of both states.

**Mathematical Representation:**
```
|ψ⟩ = α|0⟩ + β|1⟩

where |α|² + |β|² = 1
```

### 2. Superposition

Superposition is the ability of a quantum system to be in multiple states at once until measured.

Example:
- A qubit in superposition: $\frac{1}{\sqrt{2}}(|0⟩ + |1⟩)$
- When measured, collapses to either |0⟩ or |1⟩

### 3. Measurement

Measuring a qubit causes its superposition state to collapse into a classical state (0 or 1).

Probability of measuring |0⟩ = |α|²
Probability of measuring |1⟩ = |β|²

### 4. Entanglement

Entanglement is a quantum phenomenon where the states of multiple qubits become correlated in such a way that the state of one qubit cannot be described independently.

Example: Bell State
```
|Φ⁺⟩ = \frac{1}{\sqrt{2}}(|00⟩ + |11⟩)
```

## Quantum Gates

### Single-Qubit Gates

1. **Hadamard (H) Gate**
   - Creates superposition
   - Matrix representation:
     ```
     H = \frac{1}{\sqrt{2}} \begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix}
     ```

2. **Pauli Gates**
   - X Gate (NOT):
     ```
     X = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}
     ```
   - Y Gate:
     ```
     Y = \begin{pmatrix} 0 & -i \\ i & 0 \end{pmatrix}
     ```
   - Z Gate:
     ```
     Z = \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}
     ```

### Multi-Qubit Gates

1. **CNOT (Controlled-NOT)**
   - Two-qubit gate
   - Flips target qubit if control qubit is |1⟩
   ```
   CNOT = \begin{pmatrix} 
   1 & 0 & 0 & 0 \\
   0 & 1 & 0 & 0 \\
   0 & 0 & 0 & 1 \\
   0 & 0 & 1 & 0
   \end{pmatrix}
   ```

2. **SWAP**
   - Exchanges states of two qubits
   ```
   SWAP = \begin{pmatrix}
   1 & 0 & 0 & 0 \\
   0 & 0 & 1 & 0 \\
   0 & 1 & 0 & 0 \\
   0 & 0 & 0 & 1
   \end{pmatrix}
   ```

## Common Quantum Circuits

### 1. Bell State Preparation
```
     ┌───┐
q₀: ─┤ H ├─■──
     └───┘ │  
q₁: ───────┼──
           │  
```
Creates an entangled state: $\frac{1}{\sqrt{2}}(|00⟩ + |11⟩)$

### 2. Quantum Teleportation
```
     ┌───┐        ┌─┐
q₀: ─┤ H ├─■──────┤M├
     └───┘ │      └╥┘
q₁: ───────┼───■───╫─
           │   │   ║
q₂: ───────■───┼───╫─
               │   ║
```

## Quantum Algorithms

### 1. Deutsch-Jozsa Algorithm
- Determines if a function is constant or balanced
- Exponential speedup over classical algorithms

### 2. Grover's Algorithm
- Searches unsorted database
- Quadratic speedup over classical search

### 3. Shor's Algorithm
- Factors large numbers
- Exponential speedup over classical factoring

## Common Quantum States

### 1. Computational Basis States
- |0⟩ and |1⟩
- Classical-like states

### 2. Superposition States
- $\frac{1}{\sqrt{2}}(|0⟩ + |1⟩)$ (|+⟩ state)
- $\frac{1}{\sqrt{2}}(|0⟩ - |1⟩)$ (|-⟩ state)

### 3. Bell States
- $\frac{1}{\sqrt{2}}(|00⟩ + |11⟩)$ (|Φ⁺⟩)
- $\frac{1}{\sqrt{2}}(|00⟩ - |11⟩)$ (|Φ⁻⟩)
- $\frac{1}{\sqrt{2}}(|01⟩ + |10⟩)$ (|Ψ⁺⟩)
- $\frac{1}{\sqrt{2}}(|01⟩ - |10⟩)$ (|Ψ⁻⟩)

## Further Reading

1. **Books**
   - "Quantum Computation and Quantum Information" by Nielsen & Chuang
   - "Programming Quantum Computers" by O'Reilly

2. **Online Resources**
   - [Qiskit Textbook](https://qiskit.org/textbook)
   - [Quantum Computing Playground](http://www.quantumplayground.net)

3. **Research Papers**
   - Original papers on quantum algorithms
   - Current research in quantum computing

## Glossary

- **Qubit**: Quantum bit
- **Superposition**: Multiple states simultaneously
- **Entanglement**: Quantum correlation
- **Gate**: Quantum operation
- **Measurement**: State observation
- **Circuit**: Sequence of quantum operations