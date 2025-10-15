@echo off
echo Cleaning up previous installations...

REM Clean backend
cd backend
if exist venv\Scripts\activate (
    call venv\Scripts\activate
    call venv\Scripts\deactivate
)
echo Removing backend virtual environment...
if exist venv rmdir /s /q venv

REM Clean frontend
cd ../frontend
echo Removing frontend node_modules...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json

echo Cleanup complete!
echo You can now run start.bat to set up the project

cd ..