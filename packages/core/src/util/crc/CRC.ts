import { Readable, Writable } from 'stream';
import { Comparable } from '@hdtjs/api';

export default interface CRC extends Comparable<CRC> {
    /** Update this CRC with the content of the buffer, from offset, using length bytes. */
    update(buffer: number[], offset: number, length: number): void;

    /** Update the CRC with the specified byte */
    update(data: number): void;

    /** Write this CRC to an Output Stream */
    writeCRC(out: Writable): void;

    /** Read CRC from InputStream and compare it to this. 
     * 
     * @param in InputStream
     * @return true if the checksum is the same, false if checksum error.
     * @throws IOException
     */
    readAndCheck(inp: Readable): boolean;

    /**
     * Get checksum value.
     * @return
     */
    getValue(): number;

    /**
     * Reset the checksum to the initial value.
     */
    reset(): void;
}
