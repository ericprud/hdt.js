import ControlInformation from './options/ControlInformation';
import { Api } from '@hdtjs/api';



function ApiCore() { return Api() + ' Core'; }

export {
    ControlInformation,
    ApiCore
}
