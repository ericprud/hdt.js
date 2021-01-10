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

        this.type = IOUtil.readByte(inp);
        // @@ for unknown, throw IllegalFormatException("The type of the ControlInformation is unknown for this implementation");

        this.format = IOUtil.readLine(inp, 0);
        const propertiesStr: string = IOUtil.readLine(inp, 0)
        for (let item of propertiesStr.split(";")) {
            const pos: number = item.indexOf('=');
            if (pos !== -1) {
                const property = item.substring(0, pos);
                const value = item.substring(pos + 1);
                this.properties.set(property, value);
            }
        }

        inp.readCRCAndCheck();
    }
}
