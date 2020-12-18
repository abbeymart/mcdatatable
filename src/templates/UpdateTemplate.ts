/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-11-23
 * @Company: Copyright 2020 Abi Akindele  | mConnect.biz
 * @License: All Rights Reserved | LICENSE.md
 * @Description: mc-datatable: Update ui component
 */

import { UpdatePropsType } from "../types";

export function Active(props: UpdatePropsType) {
    const itemLabel = props.itemLabel || "Update"
        // activate update component
    return `
    <a href="#" onclick="${props.itemTask(props.itemData)}">
        ${itemLabel}<i class="fa fa-edit"></i>
    </a>`
}
