@echo off
REM Navigate to the root directory of the project
cd /d "%~dp0..\..\"

REM Check if Python and Uvicorn are available
python --version > nul 2>&1
if errorlevel 1 (
    echo Python is not installed or not added to PATH. Please install Python and try again.
    pause
    exit /b
)

REM Navigate to the API directory
cd api

REM Install required Python packages if not already installed
echo Installing dependencies...
pip install -r requirements.txt

REM Start the FastAPI server
start /B python -m uvicorn main:app --host 127.0.0.1 --port 8000

REM Wait a moment for the server to start
timeout /t 5 > nul

REM Navigate back to the app directory to open the frontend
cd ..\app

REM Open the web app in the default browser
start http://127.0.0.1:5500/app/index.html
