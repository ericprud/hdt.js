import { CoreApi } from '@hdtjs/api';
import * as Commander from 'commander';
// import Readable from 'readable-stream';
import * as Fs from "fs";
import { ControlInformation } from '@hdtjs/core';

function main(argv: string[]) {
    const cli = new Commander.Command()
        .version("0.0.1" /*HDTVersion.get_version_string(".")*/)
        .parse(process.argv);
    const hdtInput = cli.args[0];
    if (hdtInput.endsWith(".gz"))
        throw Error("GZIP not supported")
    const input = Fs.createReadStream(hdtInput);
    const ci = new ControlInformation();
    ci.load(input);
    const x = input.read();
    console.log(new Date(), CoreApi() + ' hdtInput:', hdtInput);
}

if (process.mainModule === module) {
    main(process.argv);
}
