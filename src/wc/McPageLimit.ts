/**
 * @Author: abbeymart | Abi Akindele | @Created: 2019-06-24 | @Updated: 2020-07-01
 * @Company: mConnect.biz | @License: MIT
 * @Description: mc-page-limit, for selecting the # of items/records/rows per page
 */

import PageLimitTemplate from "./templates/PageLimitTemplate";
import TableHelper from "./templates/TableHelpers";
import { DOMType } from "./types";
import { dtstore } from "./store/DtStore";

class McPageLimit extends HTMLElement {
    protected DOM: DOMType = {};

    constructor() {
        super();
        // render component
        this.renderComponent();
    }

    // getters ands setters
    get PageLimit(): number {
        return dtstore.PageLimit;
    }

    get PageLimits(): Array<number> {
        return dtstore.PageLimits;
    }

    set PageLimit(value: number) {
        dtstore.PageLimit = value;
    }

    // methods
    setPageLimit(e: Event, value: string | number) {
        e.preventDefault();
        // var selectBox = document.getElementById("mc-page-limit-value");
        // var value = selectBox?.options[selectBox.selectedIndex].value;
        // alert(selectedValue);
        this.PageLimit = Number(value);
    }

    renderComponent() {
        this.innerHTML = PageLimitTemplate({
            pageLimit   : this.PageLimit,
            pageLimits  : this.PageLimits,
            setPageLimit: this.setPageLimit,
        });
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
