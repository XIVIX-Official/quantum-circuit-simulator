# Use the official Python image
FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Copy requirements file
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose port
EXPOSE 5000

# Start application
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "5000", "--reload"]