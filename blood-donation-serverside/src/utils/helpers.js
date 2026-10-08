/**
 * Format date as YYYY-MM-DD
 * @param {Date} date - Date object to format
 * @returns {string} Formatted date string
 */
export const formatDate = (date = new Date()) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
};

/**
 * Check if user can donate blood (90 days since last donation)
 * @param {string} lastDonationDate - Last donation date in YYYY-MM-DD format
 * @returns {boolean} True if can donate
 */
export const canDonateBlood = (lastDonationDate) => {
    if (!lastDonationDate) return true;
    
    const lastDonation = new Date(lastDonationDate);
    const today = new Date();
    const daysDifference = Math.floor((today - lastDonation) / (1000 * 60 * 60 * 24));
    
    return daysDifference >= 90; // 90 days minimum between donations
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Validate blood group
 * @param {string} bloodGroup - Blood group to validate
 * @returns {boolean} True if valid
 */
export const isValidBloodGroup = (bloodGroup) => {
    const validGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    return validGroups.includes(bloodGroup);
};

export default {
    formatDate,
    canDonateBlood,
    isValidEmail,
    isValidBloodGroup
};
