import { Readable, Writable } from 'stream';
import CRC16 from '../util/crc/CRC16';
import HDTOptionsBase from './HDTOptionsBase';
import { ControlInfo } from '@hdtjs/api';
import CRCInputStream from '../util/crc/CRCInputStream';
import IOUtil from '../util/io/IOUtil';

export default class ControlInformation extends HDTOptionsBase implements ControlInfo {
    type: ControlInfo.Type;
    format: string;
    constructor() {
        super();
    }
    getType(): ControlInfo.Type { return this.type; }
    setType(type: ControlInfo.Type): void { this.type = type; }
    getFormat(): string { return this.format; }
    setFormat(format: string): void { this.format = format; }
    save(output: Writable): void {
    }
    load(input: Readable): void {
        const inp: CRCInputStream = new CRCInputStream(input, new CRC16());

        const magic: string = IOUtil.readChars(inp, 4);
        if (magic !== '$HDT')
            throw Error(`Non-HDT Section, expected "$HDT", got "${magic}"`);
    }
}
