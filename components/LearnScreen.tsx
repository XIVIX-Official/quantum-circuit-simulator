import React from 'react';

interface LearnScreenProps {
    onBack: () => void;
}

const TutorialCard: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg mb-6">
        <h2 className="text-2xl font-bold text-cyan-400 mb-3">{title}</h2>
        <div className="text-gray-300 space-y-4">
            {children}
        </div>
    </div>
);

export const LearnScreen: React.FC<LearnScreenProps> = ({ onBack }) => {
    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 font-sans p-4 lg:p-8 animate-fade-in">
            <header className="flex items-center justify-between mb-6">
                 <h1 className="text-3xl font-bold text-white tracking-tight">Quantum Crash Course</h1>
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 shadow-md"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Back to Simulator
                </button>
            </header>
            <main>
                <TutorialCard title="Superposition: The Quantum Coin Flip">
                    <p>
                        In classical computing, a bit is either 0 or 1. A quantum bit, or <strong>qubit</strong>, can be in a state of <strong>superposition</strong>, meaning it's a combination of both 0 and 1 at the same time. The <code className="bg-gray-700 text-cyan-300 px-1 py-0.5 rounded text-sm">Hadamard (H)</code> gate is the key to creating superposition.
                    </p>
                    <div>
                        <p className="font-semibold text-gray-200">Try this circuit:</p>
                        <ol className="list-decimal list-inside pl-2 mt-1 space-y-1">
                            <li>Start with a single qubit circuit (you can reduce the qubit count to 1).</li>
                            <li>Tap an <code className="bg-gray-700 text-cyan-300 px-1 py-0.5 rounded text-sm">H gate</code>, then tap the wire to place it.</li>
                            <li>Click <strong>Simulate</strong>.</li>
                        </ol>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-200">Expected Result:</p>
                        <p>The histogram will show that the states |0⟩ and |1⟩ each have a ~50% probability. You've just created a perfect quantum coin flip! The state vector will show equal amplitudes for both states.</p>
                    </div>
                </TutorialCard>

                <TutorialCard title="Entanglement: Spooky Action at a Distance">
                    <p>
                        <strong>Entanglement</strong> is one of the most famous and mind-bending quantum phenomena. When two qubits are entangled, their fates become linked, no matter how far apart they are. Measuring one instantly affects the other. We can create an entangled pair (a <strong>Bell State</strong>) using an H gate and a <code className="bg-gray-700 text-cyan-300 px-1 py-0.5 rounded text-sm">Controlled-NOT (CNOT)</code> gate.
                    </p>
                    <div>
                         <p className="font-semibold text-gray-200">Try this circuit:</p>
                        <ol className="list-decimal list-inside pl-2 mt-1 space-y-1">
                            <li>Use a circuit with at least 2 qubits.</li>
                            <li>Place an <code className="bg-gray-700 text-cyan-300 px-1 py-0.5 rounded text-sm">H gate</code> on the first qubit (|q₀⟩).</li>
                            <li>Place a <code className="bg-gray-700 text-cyan-300 px-1 py-0.5 rounded text-sm">CNOT gate</code> on the same step. The control (●) should be on the first qubit (|q₀⟩) and the target (⊕) should be on the second qubit (|q₁⟩).</li>
                            <li>Click <strong>Simulate</strong>.</li>
                        </ol>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-200">Expected Result:</p>
                        <p>The simulation will only show results for |00⟩ and |11⟩, each with a ~50% probability. The states |01⟩ and |10⟩ will have zero probability. This is entanglement! If you measure the first qubit and get 0, you know instantly the second is also 0.</p>
                    </div>
                </TutorialCard>

                 <TutorialCard title="The Quantum NOT Gate">
                    <p>
                       The <code className="bg-gray-700 text-cyan-300 px-1 py-0.5 rounded text-sm">Pauli-X gate</code> is the quantum equivalent of a classical NOT gate. It flips a qubit's state from |0⟩ to |1⟩ and from |1⟩ to |0⟩. It's fundamental for manipulating quantum information.
                    </p>
                    <div>
                         <p className="font-semibold text-gray-200">Try this circuit:</p>
                        <ol className="list-decimal list-inside pl-2 mt-1 space-y-1">
                            <li>Start with a single qubit, which is initialized to the |0⟩ state.</li>
                            <li>Place an <code className="bg-gray-700 text-cyan-300 px-1 py-0.5 rounded text-sm">X gate</code> on the wire.</li>
                            <li>Click <strong>Simulate</strong>.</li>
                        </ol>
                    </div>
                     <div>
                        <p className="font-semibold text-gray-200">Expected Result:</p>
                        <p>The histogram will show a 100% probability of measuring the state |1⟩. The X gate successfully flipped the initial |0⟩ state. If you place another X gate after the first one, it will flip it back to |0⟩!</p>
                    </div>
                </TutorialCard>
            </main>
        </div>
    );
};
