import { ApiCore, ControlInformation } from '@hdtjs/core';
import * as Commander from 'commander';
// import Readable from 'readable-stream';
import * as Fs from "fs";
// import ControlInformation from '@hdtjs/core/lib/options/ControlInformation'
import { Readable } from 'stream';
import { Comparable } from '@hdtjs/api';

async function main(argv: string[]) {
    const cli = new Commander.Command()
        .version("0.0.1" /*HDTVersion.get_version_string(".")*/)
        .parse(process.argv);
    const hdtInput = cli.args[0];
    if (hdtInput.endsWith(".gz"))
        throw Error("GZIP not supported")
    const input: Readable = Fs.createReadStream(hdtInput);
    await new Promise((accept, reject) => {
        input.on('readable', () => accept(null));
    })
    const ci = new ControlInformation();
    // @@ add input.pause() to ensure input is in paused mode?

    // Load Global ControlInformation
    ci.load(input);

    // Load header
    ci.load(input);
    const headerSize: number = ci.getInt('length');

    // const headerData :number[] = 

    console.log(new Date(), ApiCore() + ' ci:', ci);
    // });

}

if (require.main === module) {
    main(process.argv);
}
