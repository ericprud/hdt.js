import { Readable, Writable } from "stream";
import HDTOptions from './HDTOptions';

export namespace ControlInfo {
    export enum Type {
        UNKNOWN,
        GLOBAL,
        HEADER,
        DICTIONARY,
        TRIPLES,
        INDEX
    }
}

export interface ControlInfo extends HDTOptions {
    getType: () => ControlInfo.Type,
    setType: (type: ControlInfo.Type) => void,
    getFormat: () => string,
    setFormat: (format: string) => void,
    save: (output: Writable) => void,
    load: (input: Readable) => void
}
