function getRandomInt(min: number, max: number): number {
// Create a random integer between min and max
return Math.floor(Math.random() * (max - min + 1)) + min;
}
  
export function getUniqueRandomInts(count: number, min: number, max: number): number[] {
    const uniqueNumbers: Set<number> = new Set();

    while (uniqueNumbers.size < count) {
        const randomNumber = getRandomInt(min, max);
        uniqueNumbers.add(randomNumber);
    }

    return Array.from(uniqueNumbers);
}