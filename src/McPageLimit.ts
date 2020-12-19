/**
 * @Author: abbeymart | Abi Akindele | @Created: 2019-06-24 | @Updated: 2020-07-01
 * @Company: mConnect.biz | @License: MIT
 * @Description: mc-page-limit, for selecting the # of items/records/rows per page
 */

import PageLimitTemplate from "./templates/PageLimitTemplate";
import TableHelper from "./templates/TableHelpers";
import { PageLimitPropsType, SetValueType } from "./types";
import { dtstore } from "./dtStore";
import { isEmptyObject } from "./helper";

class McPageLimit extends HTMLElement {
    constructor() {
        super();
        // render component
        this.renderComponent();
    }

    static get observedAttributes() {
        return ["pagelimit", "pagelimits"];
    }

    attributeChangedCallback(name: string, oldVal: string, newValue: string) {
        if (oldVal === newValue) {
            return;
        }
        this.renderComponent({
            pageLimit   : this.pageLimit,
            pageLimits  : this.pageLimits,
            setPageLimit: this.setPageLimit,
        });
    }

    // getters ands setters
    get pageLimit(): number {
        return dtstore.PageLimit;
    }

    set pageLimit(value: number) {
        dtstore.PageLimit = value;
        this.setAttribute("pagelimit", value.toString())
    }

    get pageLimits(): Array<number> {
        return dtstore.PageLimits;
    }

    set pageLimits(value: Array<number>) {
        dtstore.PageLimits = value;
        this.setAttribute("pagelimits", JSON.stringify(value))
    }

    // methods
    setPageLimit(value: string | number) {
        this.pageLimit = Number(value);     // will update the dstore value
    }

    renderComponent(props: PageLimitPropsType = {
        pageLimit   : this.pageLimit,
        pageLimits  : this.pageLimits,
        setPageLimit: this.setPageLimit
    }) {
        this.innerHTML = PageLimitTemplate(props);
        // events | mc-page-limit-value
        const pageLimitDom = document.getElementById("mc-page-limit-value") as HTMLSelectElement;
        if (pageLimitDom && props.setPageLimit && (typeof props.setPageLimit === "function")) {
            pageLimitDom.onselectionchange = (e) => {
                e.preventDefault();
                const value = pageLimitDom.options[pageLimitDom.selectedIndex].value;
                props.setPageLimit(value);
            }
        }
    }

    disconnectedCallback() {
        // cleanup - reset DOM, removeEventLister(s), garbage collection...
        this.innerHTML = "";
    }
}

let mcPageLimit;

if (!customElements.get("mc-page-limit")) {
    mcPageLimit = customElements.define("mc-page-limit", McPageLimit);
}

export default mcPageLimit;
