import { CoreApi } from '@hdtjs/api';

function main(argv: string[]) {
    console.log(CoreApi() + ' HDTInfo', argv.slice(2));
}

if (process.mainModule === module) {
    main(process.argv);
}
