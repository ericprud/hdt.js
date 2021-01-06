import HDTOptionsBase from './HDTOptionsBase';

export default class ControlInformation extends HDTOptionsBase {
    type: number;
    format: String;
    constructor() {
        super();
        console.warn("new ControlInformation");
    }
    load(input: any): void {
    }
}
