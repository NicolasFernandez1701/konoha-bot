export const validToShowErrorMessage = (code: number) => {
    const codes = [
        1000
    ];
    return codes.includes(code);
}