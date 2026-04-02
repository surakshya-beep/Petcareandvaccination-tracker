// Vaccine utility functions for calculating pet health status

export const checkVaccineStatus = (medicalRecords = []) => {
  const now = new Date()
  const issues = []
  let issueCount = 0

  if (!medicalRecords || medicalRecords.length === 0) {
    return {
      status: 'Warning',
      issues: [{ message: 'No medical records found' }],
      issueCount: 1
    }
  }

  medicalRecords.forEach(record => {
    if (record.type === 'Vaccine' && record.nextDueDate) {
      const dueDate = new Date(record.nextDueDate)
      const daysUntilDue = Math.floor((dueDate - now) / (1000 * 60 * 60 * 24))

      if (daysUntilDue < 0) {
        issues.push({
          type: 'OVERDUE',
          message: `${record.description} is ${Math.abs(daysUntilDue)} days overdue`,
          severity: 'critical'
        })
        issueCount++
      } else if (daysUntilDue < 30) {
        issues.push({
          type: 'DUE_SOON',
          message: `${record.description} due in ${daysUntilDue} days`,
          severity: 'warning'
        })
        issueCount++
      }
    }
  })

  const status = issueCount === 0 ? 'Healthy' : issues.some(i => i.severity === 'critical') ? 'Critical' : 'Warning'

  return { status, issues, issueCount }
}

export const getHealthIndicator = (status) => {
  const indicators = {
    'Healthy': { color: 'green', icon: '✅', badgeColor: 'bg-success-100 text-success-700' },
    'Warning': { color: 'yellow', icon: '⚠️', badgeColor: 'bg-warning-100 text-warning-700' },
    'Critical': { color: 'red', icon: '🔴', badgeColor: 'bg-danger-100 text-danger-700' }
  }
  return indicators[status] || indicators['Healthy']
}

export const calculatePetAge = (dob) => {
  const today = new Date()
  const birthDate = new Date(dob)
  
  let years = today.getFullYear() - birthDate.getFullYear()
  let months = today.getMonth() - birthDate.getMonth()
  
  if (months < 0) {
    years--
    months += 12
  }

  return { years, months }
}

export const getVaccineSchedule = (petType = 'Dog') => {
  const schedules = {
    Dog: [
      { name: 'Rabies', interval: 365 * 3, description: 'Every 3 years' },
      { name: 'DHPP', interval: 365, description: 'Annually' },
      { name: 'Bordetella', interval: 365, description: 'Annually' }
    ],
    Cat: [
      { name: 'Rabies', interval: 365 * 3, description: 'Every 3 years' },
      { name: 'FVRCP', interval: 365, description: 'Annually' },
      { name: 'FeLV', interval: 365, description: 'Annually' }
    ]
  }
  return schedules[petType] || schedules.Dog
}
