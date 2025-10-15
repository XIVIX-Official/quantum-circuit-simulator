# Start the backend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; python -m venv venv; .\venv\Scripts\activate; pip install -r requirements.txt; python app.py"

# Start the frontend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm install; npm start"