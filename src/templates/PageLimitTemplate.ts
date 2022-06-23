import {PageLimitPropsType} from "../types";

export default function PageLimitTemplate(props: PageLimitPropsType) {
    // build select-options-DOM
    let optionDom = props.pageLimits.map((val, ind) => {
        return ind === 0 ? `<option value="${val}" id="${ind + 1}" selected> ${val}</option>` :
            `<option value="${val}" id="${ind + 1}"> ${val}</option>`
    }).join("");

    // activate active component | onchange="props.setPageLimit(e, this.value)
    return `
    <div>
        <span>Show </span>
        <select id="mc-page-limit-value" name="mc-page-limit-value" class="w3-round" data-page-limit="${props.pageLimit}">
            ${optionDom}
        </select>
        <span> items</span>
    </div>`
}
