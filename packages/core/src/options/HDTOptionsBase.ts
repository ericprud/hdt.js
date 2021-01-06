export default class HDTOptionsBase {
    properties: Map<string, string>;
    constructor() {
        this.properties = new Map();
        console.warn("new HDTOptionsBase");
    }

    get(key: string): string | undefined { return this.properties.get(key); }
    set(key: string, value: string): void { this.properties.set(key, value); }
    setOptions(options: string) {
        options.split(";").forEach(item => {
            const pos = item.indexOf('=');
            if (pos !== -1) {
                const prop = item.substring(0, pos);
                const val = item.substring(pos + 1);
                this.properties.set(prop, val);
            }
        });
    }
    setInt(key: string, val: number) { this.properties.set(key, "" + val); }
    getInt(key: string): number | undefined {
        const val = this.properties.get(key);
        return val === undefined
            ? 0
            : parseInt(val);
    }
    clear(): void { this.properties.clear(); }
}
