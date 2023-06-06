import { SPage, SPageListProps } from 'servisofts-component';

import root from './root';
import add from './add';
import uso from './uso';
import lista from './lista';
export default SPage.combinePages("cupones", {
    "": root,
    "root": root,
    "add": add,
    "uso": uso,
    "lista":lista


});