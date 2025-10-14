from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
import os
import uvicorn

from routes import circuit, simulation, results

# Load environment variables
load_dotenv()

app = FastAPI(
    title="XIVIX Quantum Circuit Simulator API",
    description="API for quantum circuit simulation using Qiskit",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("CORS_ORIGIN", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(circuit.router, prefix="/api/circuits", tags=["circuits"])
app.include_router(simulation.router, prefix="/api/simulation", tags=["simulation"])
app.include_router(results.router, prefix="/api/results", tags=["results"])

@app.get("/")
async def root():
    return {"message": "Welcome to XIVIX Quantum Circuit Simulator API"}

@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    return JSONResponse(
        status_code=500,
        content={"message": "Internal server error", "detail": str(exc)}
    )

if __name__ == "__main__":
    uvicorn.run(
        "app:app",
        host="0.0.0.0",
        port=int(os.getenv("API_PORT", 5000)),
        reload=os.getenv("FASTAPI_ENV") == "development"
    )