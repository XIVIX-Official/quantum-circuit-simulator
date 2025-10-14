from qiskit import QuantumCircuit, Aer, execute
from qiskit.quantum_info import Operator, Statevector
from typing import List, Dict, Optional, Union
import numpy as np

class QiskitEngine:
    """
    Core class for quantum circuit operations using Qiskit
    """
    def __init__(self):
        self.backend = Aer.get_backend('qasm_simulator')
        self.statevector_backend = Aer.get_backend('statevector_simulator')
        self.unitary_backend = Aer.get_backend('unitary_simulator')

    def create_circuit(self, num_qubits: int, num_classical_bits: int) -> QuantumCircuit:
        """
        Create a new quantum circuit with specified number of qubits and classical bits
        """
        return QuantumCircuit(num_qubits, num_classical_bits)

    def add_gate(self, 
                 circuit: QuantumCircuit, 
                 gate_type: str, 
                 target_qubit: int, 
                 control_qubit: Optional[int] = None, 
                 params: Optional[List[float]] = None) -> QuantumCircuit:
        """
        Add a quantum gate to the circuit
        """
        if gate_type == "h":
            circuit.h(target_qubit)
        elif gate_type == "x":
            circuit.x(target_qubit)
        elif gate_type == "y":
            circuit.y(target_qubit)
        elif gate_type == "z":
            circuit.z(target_qubit)
        elif gate_type == "cx" and control_qubit is not None:
            circuit.cx(control_qubit, target_qubit)
        elif gate_type == "rz" and params:
            circuit.rz(params[0], target_qubit)
        elif gate_type == "rx" and params:
            circuit.rx(params[0], target_qubit)
        elif gate_type == "ry" and params:
            circuit.ry(params[0], target_qubit)
        elif gate_type == "measure":
            circuit.measure(target_qubit, target_qubit)
        return circuit

    def simulate_circuit(self, circuit: QuantumCircuit, shots: int = 1024) -> Dict:
        """
        Execute the quantum circuit and return measurement results
        """
        job = execute(circuit, self.backend, shots=shots)
        result = job.result()
        counts = result.get_counts(circuit)
        return {
            "counts": counts,
            "shots": shots,
            "success": True
        }

    def get_statevector(self, circuit: QuantumCircuit) -> Dict:
        """
        Get the statevector representation of the quantum state
        """
        job = execute(circuit, self.statevector_backend)
        result = job.result()
        statevector = result.get_statevector()
        return {
            "statevector": statevector.tolist(),
            "success": True
        }

    def get_unitary(self, circuit: QuantumCircuit) -> Dict:
        """
        Get the unitary matrix representation of the circuit
        """
        job = execute(circuit, self.unitary_backend)
        result = job.result()
        unitary = result.get_unitary()
        return {
            "unitary": unitary.tolist(),
            "success": True
        }

    def validate_circuit(self, circuit: QuantumCircuit) -> bool:
        """
        Validate the quantum circuit
        """
        try:
            # Check if the circuit has valid operations
            Operator(circuit)
            return True
        except Exception:
            return False