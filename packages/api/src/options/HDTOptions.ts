interface HDTOptions {
    get(key: string): string,
    set(key: string, value: string): void,
    setOptions(options: string): void,
    getInt(key: string): number,
    setInt(key: string, value: number): void,
    clear(): void
}

export default HDTOptions;