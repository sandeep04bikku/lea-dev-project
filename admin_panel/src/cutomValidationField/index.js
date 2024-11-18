export const validateNoStartOrEndSpace = (value) => {
    if (value && value.trim() !== value) {
        return false; // Check if there are leading or trailing spaces
    }
    return true;
};

export const validateNoTrailingDot = (value) => {
    if (value && value.endsWith('.')) {
        return false;
    }
    return true;
};

// export const instructionValidation = (value) => {
//     if (!value) {
//         return false;
//     }

//     const lines = value.split('\n');
//     return lines.every(line => line.trim().endsWith('.'));
// };

export const validateMarksInPercentageRange = (value) => {
    const numberValue = parseInt(value, 10);
    return !isNaN(numberValue) && numberValue >= 0 && numberValue <= 100;
};

export const instructionValidation = (value) => {
    return value.trim().endsWith('.');
};
