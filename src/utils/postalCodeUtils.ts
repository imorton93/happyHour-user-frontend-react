
//returns true for A1A1A1 or A1A 1A1
export function isValidCanadianPostalCode(input: string): boolean {
    const regex = /^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/;
    return regex.test(input.trim());
}

export function formatPostalCode(input: string): string{
    return input.toUpperCase().replace(/\s+/g, '').replace(/^(.{3})(.{3})$/, "$1 $2");
}