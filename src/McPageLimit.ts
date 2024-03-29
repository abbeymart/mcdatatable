/**
 * @Author: abbeymart | Abi Akindele | @Created: 2019-06-24 | @Updated: 2020-07-01
 * @Company: mConnect.biz | @License: MIT
 * @Description: mc-page-limit, for selecting the # of items/records/rows per page
 */

import PageLimitTemplate from "./templates/PageLimitTemplate";
import { PageLimitPropsType } from "./types";
import { dtstore } from "./dtStore";

class McPageLimit extends HTMLElement {
    constructor() {
        super();
        // render component
        this.renderComponent();
    }

    static get observedAttributes() {
        return ["pagelimits"];
    }

    attributeChangedCallback(name: string, oldVal: string, newValue: string) {
        if (oldVal === newValue) {
            return;
        }
        this.renderComponent();
    }

    // getters ands setters
    get pageLimit(): number {
        return dtstore.PageLimit;
    }

    set pageLimit(value: number) {
        dtstore.PageLimit = value;
    }

    get pageLimits(): Array<number> {
        return dtstore.PageLimits;
    }

    set pageLimits(value: Array<number>) {
        // set from parent component (mc-data-table) & dtstore
        this.setAttribute("pagelimits", JSON.stringify(value));
    }

    // methods
    setPageLimit(value: string | number) {
        this.pageLimit = Number(value);     // will update the dtstore value
    }

    renderComponent(props: PageLimitPropsType = {
        pageLimit : this.pageLimit,
        pageLimits: this.pageLimits,
    }) {
        this.innerHTML = PageLimitTemplate(props);
        // events | mc-page-limit-value
        const pageLimitDom = document.getElementById("mc-page-limit-value") as HTMLSelectElement
        if (pageLimitDom && this.setPageLimit && (typeof this.setPageLimit === "function")) {
            pageLimitDom.onselectionchange = (e) => {
                e.preventDefault();
                const value = pageLimitDom.options[pageLimitDom.selectedIndex].value;
                this.setPageLimit(value);
            }
        }
    }

    disconnectedCallback() {
        // cleanup - reset DOM, removeEventLister(s), garbage collection...
        this.innerHTML = "";
    }
}

if (!customElements.get("mc-page-limit")) {
    customElements.define("mc-page-limit", McPageLimit);
}
