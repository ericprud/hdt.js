import { CoreApi } from '@hdtjs/api';
import { Command } from 'commander';

class HDTInfo {
    parameters: String[] = [];
    static showVersion: boolean;
    hdtInput: String;
    execute(): void {
    }
}

function main(argv: string[]) {
    const hdtInfo: HDTInfo = new HDTInfo();
    com: Command/* = new Command()*/;
    if (HDTInfo.showVersion) {
        console.log("0.0");
        process.exit(0);
    }

    try {
        if (hdtInfo.hdtInput === undefined)
            hdtInfo.hdtInput = hdtInfo.parameters[0];
    } catch (e) {
        process.exit(1);
    }

    hdtInfo.execute();
    console.log(CoreApi() + ' HDTInfo', argv.slice(2), hdtInfo);
}

if (process.mainModule === module) {
    main(process.argv);
}
