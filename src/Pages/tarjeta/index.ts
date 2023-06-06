import { SPage, SPageListProps } from 'servisofts-component';

import root from './root';
import _new from './new';
export default SPage.combinePages("tarjeta", {
    "": root,
    "root": root,
    "new": _new

});