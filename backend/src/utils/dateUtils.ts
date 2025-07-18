export const stripDateLeadingZeros = (date: string): string => {
    // Match YYYY-MM-DD format and capture each part
    const match = date.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!match) return date;

    const year = match[1];
    const month = parseInt(match[2], 10);
    const day = parseInt(match[3], 10);

    return `${year}-${month}-${day}`;
}
