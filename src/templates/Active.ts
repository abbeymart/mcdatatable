/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-11-23
 * @Company: Copyright 2020 Abi Akindele  | mConnect.biz
 * @License: All Rights Reserved | LICENSE.md
 * @Description: mc-datatable: active ui component
 */

import { strToBool } from "@mconnect/mcutils";
import { ActivePropsType } from "../types";

export function Active(props: ActivePropsType) {
    const yesLabel = props.activeLabel || "yes";
    const noLabel = props.inActiveLabel || "no";
    const isActive = props.isActive || false
    const activeDom = isActive ? `<span>${yesLabel} <i class="fa fa-check"></i></span>` :
        `<span>${noLabel} <i class="fa fa-power-off"></i></span>`

    // activate active component
    return `<td>${activeDom}</td>`
}
