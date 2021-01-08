import { Readable, Writable } from 'stream';
import CRC16 from '../util/crc/CRC16';
import HDTOptionsBase from './HDTOptionsBase';
import { ControlInfo } from '@hdtjs/api';

export default class ControlInformation extends HDTOptionsBase implements ControlInfo {
    type: ControlInfo.Type;
    format: string;
    constructor() {
        super();
        console.warn("new ControlInformation");
    }
    getType(): ControlInfo.Type { return this.type; }
    setType(type: ControlInfo.Type): void { this.type = type; }
    getFormat(): string { return this.format; }
    setFormat(format: string): void { this.format = format; }
    save(output: Writable): void {
    }
    load(input: Readable): void {
        const x = new CRC16();
    }
}
