/**
 *
 * @param ms - The number of milliseconds to delay
 *
 * @returns A promise that resolves after the specified number of milliseconds
 *
 */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default delay;
