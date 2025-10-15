@echo off
echo Starting Quantum Circuit Simulator...

REM Create and activate virtual environment for backend
cd backend
if not exist venv (
    echo Creating virtual environment...
    python -m venv venv
)
call venv\Scripts\activate
echo Installing backend dependencies...
pip install -r requirements.txt
pip install qiskit-aer

REM Start backend in a new window
start cmd /k "cd backend && call venv\Scripts\activate && python app.py"

REM Start frontend in a new window
cd ../frontend
echo Installing frontend dependencies...
call npm install --legacy-peer-deps
start cmd /k "cd frontend && npm start"

echo Setup complete! The application should open in your browser shortly.
echo Backend is running at http://localhost:5000
echo Frontend is running at http://localhost:3000