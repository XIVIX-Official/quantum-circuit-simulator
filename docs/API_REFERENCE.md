# XIVIX Quantum Circuit Simulator API Reference

## Base URL

```
http://localhost:5000/api
```

## Authentication

Currently, the API does not require authentication.

## Endpoints

### Circuits

#### Create a New Circuit

```http
POST /circuits
```

**Request Body:**

```json
{
  "name": "My Circuit",
  "num_qubits": 2,
  "num_classical_bits": 2
}
```

**Response:**

```json
{
  "id": "uuid",
  "name": "My Circuit",
  "num_qubits": 2,
  "num_classical_bits": 2,
  "gates": []
}
```

#### Get Circuit

```http
GET /circuits/{circuit_id}
```

**Response:**

```json
{
  "id": "uuid",
  "name": "My Circuit",
  "num_qubits": 2,
  "num_classical_bits": 2,
  "gates": [
    {
      "type": "h",
      "target_qubit": 0
    },
    {
      "type": "cx",
      "target_qubit": 1,
      "control_qubit": 0
    }
  ]
}
```

#### Add Gate

```http
POST /circuits/{circuit_id}/gates
```

**Request Body:**

```json
{
  "gate_type": "h",
  "target_qubit": 0,
  "control_qubit": null,
  "params": null
}
```

**Response:**

Updated circuit object

### Simulation

#### Simulate Circuit

```http
POST /simulation/circuits/{circuit_id}/simulate
```

**Request Body:**

```json
{
  "shots": 1024
}
```

**Response:**

```json
{
  "counts": {
    "00": 512,
    "11": 512
  },
  "shots": 1024,
  "success": true
}
```

#### Get Statevector

```http
GET /simulation/circuits/{circuit_id}/statevector
```

**Response:**

```json
{
  "statevector": [0.707, 0, 0, 0.707],
  "success": true
}
```

#### Get Unitary

```http
GET /simulation/circuits/{circuit_id}/unitary
```

**Response:**

```json
{
  "unitary": [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 0, 1], [0, 0, 1, 0]],
  "success": true
}
```

### Results

#### Save Results

```http
POST /results
```

**Request Body:**

```json
{
  "circuit_id": "uuid",
  "counts": {
    "00": 512,
    "11": 512
  },
  "shots": 1024,
  "timestamp": "2023-10-14T12:00:00Z"
}
```

#### Get Circuit Results

```http
GET /results/circuits/{circuit_id}
```

**Response:**

Array of result objects

## Error Responses

The API uses conventional HTTP response codes:

- `200`: Success
- `201`: Created
- `400`: Bad Request
- `404`: Not Found
- `500`: Internal Server Error

Error responses include a message:

```json
{
  "message": "Error description",
  "detail": "Additional error details"
}
```

## Rate Limiting

Currently, there are no rate limits implemented.

## Versioning

The current API version is v1.0.0.