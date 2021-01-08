import { ApiCore } from '@hdtjs/core';
import * as Commander from 'commander';
// import Readable from 'readable-stream';
import * as Fs from "fs";
// import ControlInformation from '@hdtjs/core/lib/options/ControlInformation'
import { ControlInformation } from '@hdtjs/core';
import { Readable } from 'stream';

function main(argv: string[]) {
    const cli = new Commander.Command()
        .version("0.0.1" /*HDTVersion.get_version_string(".")*/)
        .parse(process.argv);
    const hdtInput = cli.args[0];
    if (hdtInput.endsWith(".gz"))
        throw Error("GZIP not supported")
    const input: Readable = Fs.createReadStream(hdtInput);
    const ci = new ControlInformation();
    ci.load(input);
    console.log(new Date(), ApiCore() + ' ci:', ci);
}

if (require.main === module) {
    main(process.argv);
}

