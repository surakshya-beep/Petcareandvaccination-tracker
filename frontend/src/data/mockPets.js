// Mock pet data for initial dashboard display

const mockPets = [
  {
    id: 1,
    name: 'Charlie',
    species: 'Dog',
    breed: 'Golden Retriever',
    dob: '2021-05-15',
    microchipID: 'CHIP001',
    photoURL: 'https://images.unsplash.com/photo-1633722715463-d30628cca4e5?w=400&h=400&fit=crop',
    weightHistory: [
      { date: '2024-01-15', value: 32, unit: 'kg' },
      { date: '2024-06-20', value: 33, unit: 'kg' },
      { date: '2024-11-10', value: 33.5, unit: 'kg' }
    ],
    medicalRecords: [
      {
        id: 'rec001',
        type: 'Vaccine',
        description: 'Rabies',
        dateAdministered: '2023-11-01',
        nextDueDate: '2026-11-01',
        status: 'Completed',
        vetName: 'Dr. Smith',
        vetClinic: 'Happy Paws Clinic'
      },
      {
        id: 'rec002',
        type: 'Vaccine',
        description: 'DHPP',
        dateAdministered: '2024-03-15',
        nextDueDate: '2025-03-15',
        status: 'Pending',
        vetName: 'Dr. Smith',
        vetClinic: 'Happy Paws Clinic'
      },
      {
        id: 'rec003',
        type: 'Checkup',
        description: 'Annual Physical',
        dateAdministered: '2024-09-20',
        nextDueDate: '2025-09-20',
        status: 'Completed',
        vetName: 'Dr. Johnson',
        vetClinic: 'Pet Health Center'
      }
    ]
  },
  {
    id: 2,
    name: 'Luna',
    species: 'Cat',
    breed: 'Siamese',
    dob: '2022-08-22',
    microchipID: 'CHIP002',
    photoURL: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=400&fit=crop',
    weightHistory: [
      { date: '2024-02-10', value: 3.2, unit: 'kg' },
      { date: '2024-08-15', value: 3.5, unit: 'kg' }
    ],
    medicalRecords: [
      {
        id: 'rec004',
        type: 'Vaccine',
        description: 'Rabies',
        dateAdministered: '2024-02-01',
        nextDueDate: '2025-02-01',
        status: 'Pending',
        vetName: 'Dr. Williams',
        vetClinic: 'Feline Friends Clinic'
      },
      {
        id: 'rec005',
        type: 'Vaccine',
        description: 'FVRCP',
        dateAdministered: '2024-04-10',
        nextDueDate: '2025-04-10',
        status: 'Pending',
        vetName: 'Dr. Williams',
        vetClinic: 'Feline Friends Clinic'
      }
    ]
  },
  {
    id: 3,
    name: 'Max',
    species: 'Dog',
    breed: 'German Shepherd',
    dob: '2020-03-10',
    microchipID: 'CHIP003',
    photoURL: 'https://images.unsplash.com/photo-1568152950566-c1bf43f0b866?w=400&h=400&fit=crop',
    weightHistory: [
      { date: '2024-01-12', value: 38, unit: 'kg' },
      { date: '2024-07-22', value: 38.5, unit: 'kg' }
    ],
    medicalRecords: [
      {
        id: 'rec006',
        type: 'Vaccine',
        description: 'Rabies',
        dateAdministered: '2023-06-15',
        nextDueDate: '2025-06-15',
        status: 'Pending',
        vetName: 'Dr. Brown',
        vetClinic: 'K9 Care Center'
      },
      {
        id: 'rec007',
        type: 'Checkup',
        description: 'Annual Physical',
        dateAdministered: '2024-10-05',
        nextDueDate: '2025-10-05',
        status: 'Completed',
        vetName: 'Dr. Brown',
        vetClinic: 'K9 Care Center'
      }
    ]
  }
]

export default mockPets
