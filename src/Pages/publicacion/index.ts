import { SPage, SPageListProps } from 'servisofts-component';
import root from './root';
import add from './add';
import edit from './edit';
import likes from './likes';
import comments from './comments';
export const Parent = {
    name: "publicacion",
    path: `/publicacion`,
}
export default SPage.combinePages(Parent.name, {
    "": root,
    add,
    edit,
    likes,
    comments
});