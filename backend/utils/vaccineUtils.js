/**
 * Utility function to evaluate vaccine and medical record status for a pet
 * @param {Array} petRecords - Array of medical record objects
 * @returns {Object} - { status: 'Critical'|'Warning'|'Healthy', details: Array }
 */
function checkVaccineStatus(petRecords) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const issues = [];
    let statusLevel = 'Healthy'; // Default status

    // Filter for vaccine records with nextDueDate
    const vaccineRecords = petRecords.filter(record => {
        return (record.type === 'Vaccine' || record.type === 'Checkup') && record.nextDueDate;
    });

    // Check each vaccine record for due dates
    vaccineRecords.forEach(record => {
        const nextDue = new Date(record.nextDueDate);
        nextDue.setHours(0, 0, 0, 0);

        const daysUntilDue = Math.floor((nextDue - today) / (1000 * 60 * 60 * 24));

        // Critical: Overdue (daysUntilDue < 0)
        if (daysUntilDue < 0) {
            statusLevel = 'Critical';
            issues.push({
                severity: 'Critical',
                type: record.type,
                description: record.description,
                daysOverdue: Math.abs(daysUntilDue),
                message: `${record.description} is ${Math.abs(daysUntilDue)} days overdue!`
            });
        }
        // Warning: Due within 14 days
        else if (daysUntilDue <= 14 && daysUntilDue > 0) {
            if (statusLevel !== 'Critical') statusLevel = 'Warning';
            issues.push({
                severity: 'Warning',
                type: record.type,
                description: record.description,
                daysDue: daysUntilDue,
                message: `${record.description} is due in ${daysUntilDue} days`
            });
        }
    });

    return {
        status: statusLevel,
        issues: issues,
        issueCount: issues.length,
        lastChecked: today
    };
}

/**
 * Get health indicator color based on vaccine status
 * @param {String} status - 'Critical', 'Warning', or 'Healthy'
 * @returns {Object} - { color: Tailwind color string, bgColor, textColor, icon }
 */
function getHealthIndicator(status) {
    const indicators = {
        'Critical': {
            color: 'red',
            bgColor: 'bg-red-100',
            textColor: 'text-red-700',
            borderColor: 'border-red-300',
            icon: '⚠️',
            label: 'Action Required'
        },
        'Warning': {
            color: 'yellow',
            bgColor: 'bg-yellow-100',
            textColor: 'text-yellow-700',
            borderColor: 'border-yellow-300',
            icon: '⏱️',
            label: 'Upcoming Due'
        },
        'Healthy': {
            color: 'green',
            bgColor: 'bg-green-100',
            textColor: 'text-green-700',
            borderColor: 'border-green-300',
            icon: '✅',
            label: 'All Clear'
        }
    };

    return indicators[status] || indicators['Healthy'];
}

/**
 * Calculate pet's age in years and months
 * @param {Date} dob - Date of birth
 * @returns {Object} - { years, months, display: "X years, Y months" }
 */
function calculatePetAge(dob) {
    const today = new Date();
    let years = today.getFullYear() - dob.getFullYear();
    let months = today.getMonth() - dob.getMonth();

    if (months < 0) {
        years--;
        months += 12;
    }

    return {
        years,
        months,
        display: `${years}y ${months}m`
    };
}

module.exports = {
    checkVaccineStatus,
    getHealthIndicator,
    calculatePetAge
};
