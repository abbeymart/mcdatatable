/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-11-23
 * @Company: Copyright 2020 Abi Akindele  | mConnect.biz
 * @License: All Rights Reserved | LICENSE.md
 * @Description: mc-datatable: Delete UI component
 */

import { DeletePropsType } from "../types";

export function Active(props: DeletePropsType) {
    const itemLabel = props.itemLabel || "Update"
    // activate update component
    return `
    <a href="#" onclick="${props.itemTask(props.itemId)}">
        ${itemLabel}<i class="fa fa-times-circle"></i>
    </a>`
}
