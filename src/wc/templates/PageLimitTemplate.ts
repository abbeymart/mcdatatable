/**
 * @Author: abbeymart | Abi Akindele | @Created: 2019-06-24 | @Updated: 2020-07-01
 * @Company: mConnect.biz | @License: MIT
 * @Description: mc-datatable-template
 */

import { PageLimitPropsType } from "../types";

export default function PageLimitTemplate(props: PageLimitPropsType) {
    // build select-options-DOM
    let optionDom = props.pageLimits.map((val, ind) => {
        return ind === 0 ? `<option value="${val}" id="${ind + 1}" selected> ${val}</option>` :
            `<option value="${val}" id="${ind + 1}"> ${val}</option>`
    }).join(" ");

    // activate active component
    return `
    <div>
        <label for="mc-page-limit-value" disabled></label>
        <span>Show </span>
        <select id="mc-page-limit-value" name="mc-page-limit-value" class="w3-round"
              value="${props.pageLimit}" onchange="props.setPageLimit(e, this.value)">
            ${optionDom}
        </select>
        <span> items</span>
    </div>`
}
