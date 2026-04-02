# Backend Setup Guide

## Installation

```bash
npm install
```

## Dependencies

```json
{
  "cors": "^2.8.6",
  "express": "^5.2.1",
  "mongoose": "^9.1.6"
}
```

## Environment Setup

1. Update `MONGO_URI` in `server.js` with your MongoDB connection string:

```javascript
const MONGO_URI = "your_mongodb_connection_string";
```

## Running the Server

```bash
node server.js
```

Server will run on `http://localhost:5000`

## Project Structure

```
backend/
├── models/
│   ├── User.js              # User profile schema
│   ├── Pet.js               # Pet profile schema
│   └── MedicalRecord.js     # Medical record schema
├── utils/
│   └── vaccineUtils.js      # Vaccine status calculation logic
└── server.js                # Express server entry point
```

## API Routes (To be implemented)

- `POST /register` - Register a new user
- `GET /api/pets/:userID` - Get all pets for a user
- `POST /api/pets` - Create a new pet
- `GET /api/records/:petID` - Get medical records for a pet
- `POST /api/records` - Add a medical record

## Database Models

### User Model
- fullName, dob, gender, email, phone, password

### Pet Model
- name, species, breed, dob, ownerID
- weightHistory (array), microchipID, photoURL

### MedicalRecord Model
- petID, type, description, dateAdministered
- nextDueDate, status, notes, vetName, vetClinic

## Utility Functions

### `checkVaccineStatus(petRecords)`
Evaluates vaccine status and returns:
- Status: 'Critical', 'Warning', or 'Healthy'
- Issues array with severity and details
- Issue count and last checked date

### `getHealthIndicator(status)`
Returns visual indicator object with colors and labels

### `calculatePetAge(dob)`
Calculates pet age in years and months

## Next Steps

1. Implement API routes for CRUD operations
2. Add request validation middleware
3. Implement authentication/JWT
4. Add error handling
5. Connect to frontend API clients
