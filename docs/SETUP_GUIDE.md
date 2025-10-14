# XIVIX Quantum Circuit Simulator Setup Guide

This guide will help you set up the XIVIX Quantum Circuit Simulator for development or production use.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Python:** 3.8 or higher
- **Node.js:** 14.0 or higher
- **npm:** 6.0 or higher
- **Git:** Latest version
- **Docker** (optional, for containerized deployment)

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/XIVIX-Official/quantum-circuit-simulator.git
cd quantum-circuit-simulator
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
```

Edit `.env` with your configuration:
```
FASTAPI_ENV=development
DEBUG=True
API_PORT=5000
CORS_ORIGIN=http://localhost:3000
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
```

Edit `.env` with your configuration:
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Development Setup

### Running the Backend

```bash
# From the backend directory
python app.py
```

The API will be available at `http://localhost:5000`

### Running the Frontend

```bash
# From the frontend directory
npm start
```

The application will be available at `http://localhost:3000`

## Docker Setup

### Using Docker Compose

```bash
# Build and start all services
docker-compose up --build

# Stop all services
docker-compose down

# Remove volumes
docker-compose down -v
```

### Individual Container Setup

Backend:
```bash
cd backend
docker build -t qcs-backend .
docker run -p 5000:5000 qcs-backend
```

Frontend:
```bash
cd frontend
docker build -t qcs-frontend .
docker run -p 3000:3000 qcs-frontend
```

## Testing

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

## Code Style and Linting

### Backend

```bash
# Run Black formatter
black src/

# Run flake8 linter
flake8 src/
```

### Frontend

```bash
# Run ESLint
npm run lint

# Fix ESLint issues
npm run lint -- --fix
```

## Common Issues and Solutions

### Backend Issues

1. **Port already in use**
   ```bash
   # Check what's using the port
   netstat -ano | findstr :5000
   # Kill the process
   taskkill /PID <PID> /F
   ```

2. **Module not found errors**
   - Ensure virtual environment is activated
   - Check `PYTHONPATH` includes project root
   - Reinstall dependencies

### Frontend Issues

1. **Node modules errors**
   ```bash
   # Remove node_modules and reinstall
   rm -rf node_modules
   npm install
   ```

2. **API connection issues**
   - Check API URL in `.env`
   - Ensure backend is running
   - Check CORS settings

## Production Deployment

1. **Backend Preparation**
   ```bash
   # Set production environment
   FASTAPI_ENV=production
   DEBUG=False
   ```

2. **Frontend Build**
   ```bash
   cd frontend
   npm run build
   ```

3. **Docker Production Setup**
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

## Monitoring and Maintenance

1. **Backend Logs**
   ```bash
   docker logs qcs-backend
   ```

2. **Frontend Logs**
   ```bash
   docker logs qcs-frontend
   ```

3. **System Health Check**
   ```bash
   docker-compose ps
   ```

## Support and Resources

- **Documentation:** [docs/](./docs/)
- **Issues:** [GitHub Issues](https://github.com/XIVIX-Official/quantum-circuit-simulator/issues)
- **Discussions:** [GitHub Discussions](https://github.com/XIVIX-Official/quantum-circuit-simulator/discussions)