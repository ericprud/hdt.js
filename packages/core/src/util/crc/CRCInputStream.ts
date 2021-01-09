import { FilterReadable } from '@hdtjs/api';
import { Readable } from 'stream';
import CRC from './CRC';

export default class CRCInputStream extends FilterReadable {
    crc: CRC;
    constructor(inp: Readable, crc: CRC) {
        super(inp);
        this.crc = crc;
    }
    setCrc(crc: CRC): void { this.crc = crc; }
    getCrc(): CRC { return this.crc; }
    readCRCAndCheck(): boolean {
        return this.crc.readAndCheck(this.inp);
    }
    read(): number;
    read(b: number[]): number;
    read(b: number[], offset: number, length: number): number;
    read(b?: number[], offset?: number, length?: number): number {
        if (b === undefined) {
            const i: number = this.inp.read(1);
            this.crc.update(i & 0xFF);
            return i;
        }

        if (offset === undefined)
            offset = 0;
        if (length === undefined)
            length = b.length;
        const red: number[] = this.inp.read(length);
        b.splice(offset, red.length, ...red);
        this.crc.update(b, offset, red.length);
        return red.length;
    }
}
