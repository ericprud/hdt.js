import { Readable, finished } from 'stream';
import { ControlInfo } from './options/ControlInfo';

interface Comparable<T> {
    compareTo(other: T): number;
}
/* @@ emulates Java's FilterInputStream for now.
*/
class FilterReadable extends Readable {
    inp: Readable;
    done: boolean;
    constructor(inp: Readable) {
        super();
        this.inp = inp;
        this.done = false;
        finished(inp, (err: Error | undefined) => {
            if (err)
                throw err;
            else
                this.done = true;
        });
    }
    read(): number;
    read(b: number[]): number;
    read(b: number[], offset: number, length: number): number;
    read(b?: number[], offset?: number, length?: number): number {
        if (b === undefined)
            return this.inp.read(1);

        if (offset === undefined)
            offset = 0;
        if (length === undefined)
            length = b.length;
        const red: number[] = this.inp.read(length);
        b.splice(offset, red.length, ...red);
        return red.length;
    }
    skip(n: number): number {
        const red: number[] = this.inp.read(n);
        return red.length;
    }
    available(): number {
        // return this.inp.end - this.inp.bytesRead
        // return this.inp.closed ? 0 : 1;
        return 0; // no idea
    }

    // private mustRead(length: number): number[] {
    //     const ret = new number[]
    // }
}

function Api() { return 'Api'; }

export {
    ControlInfo,
    Comparable,
    FilterReadable,
    Api
}
