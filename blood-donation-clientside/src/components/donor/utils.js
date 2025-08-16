// 3 months fulfill
export const isThreeMonthsPassed = (dateString) => {
    const givenDate = new Date(dateString);
    const today = new Date();
    const datePlus3Months = new Date(givenDate);
    datePlus3Months.setMonth(datePlus3Months.getMonth() + 3);
    return today >= datePlus3Months;
}

// Months converts
export const getMonthDayDifference = (fromDateStr) => {
    const fromDate = new Date(fromDateStr); //lastdonation date
    const toDate = new Date(); //today

    let years = toDate.getFullYear() - fromDate.getFullYear();
    let months = toDate.getMonth() - fromDate.getMonth();
    let days = toDate.getDate() - fromDate.getDate();

    if (days < 0) {
        months -= 1;
        const prevMonth = new Date(toDate.getFullYear(), toDate.getMonth(), 0);
        days += prevMonth.getDate();
    }

    if (months < 0) {
        years -= 1;
        months += 12;
    }

    months += years * 12;

    return `${months} month${months !== 1 ? 's' : ''}, ${days} day${days !== 1 ? 's' : ''}`;
};
