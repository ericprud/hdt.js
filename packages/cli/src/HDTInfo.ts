import { ApiCore, ControlInformation } from '@hdtjs/core';
import * as Commander from 'commander';
// import Readable from 'readable-stream';
import * as Fs from "fs";
// import ControlInformation from '@hdtjs/core/lib/options/ControlInformation'
import { Readable } from 'stream';
import { Comparable } from '@hdtjs/api';

function main(argv: string[]) {
    const cli = new Commander.Command()
        .version("0.0.1" /*HDTVersion.get_version_string(".")*/)
        .parse(process.argv);
    const hdtInput = cli.args[0];
    if (hdtInput.endsWith(".gz"))
        throw Error("GZIP not supported")
    const input: Readable = Fs.createReadStream(hdtInput);
    input.on('readable', () => {
        const bytes: number[] = [10, 20, 30];
        // const red = input.read(3);
        // console.log(red);
        // console.log(bytes.map(b => b.toString(16)).join(','));
        const ci = new ControlInformation();
        // @@ add input.pause() to ensure input is in paused mode?
        ci.load(input);
        console.log(new Date(), ApiCore() + ' ci:', ci);
    });

}

if (require.main === module) {
    main(process.argv);
}
