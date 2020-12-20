/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-06-13 | @Updated: 2020-06-13
 * @Company: mConnect.biz | @License: MIT
 * @Description: mc-table-no-data: to display when dataItems = []
 */

import { dtstore } from "./dtStore";

class McTableNoData extends HTMLElement {
    constructor() {
        super();
        // render component
        this.renderComponent();
    }

    static get observedAttributes() {
        return ["dataitemscount"];
    }

    attributeChangedCallback(name: string, oldVal: string, newValue: string) {
        if (oldVal === newValue) {
            return;
        }
        this.renderComponent();
    }

    // getters and setters
    get dataItemsCount(): number {
        return dtstore.DataItemsCount;
    }

    set dataItemsCount(value: number) {
        // TODO: should be set from dstore or controlling component (mc-table / mc-data-table) | optional
        this.setAttribute("dataitemscount", value.toString())
    }

    renderComponent() {
        this.innerHTML = ``;
        if (this.dataItemsCount < 1) {
            this.innerHTML = `
                <div class="w3-container w3-yellow">
                    <h4>... Loading or No data available / Ensure that you're logged in ...</h4>
                </div>
            `;
        } else {
            this.innerHTML = `
                <div>
                    <h4>... Loading or Unable to process data / Ensure that you're logged in ...</h4>
                </div>          
            `
        }
    }

    disconnectedCallback() {
        // cleanup - removeEventLister(s), garbage collection...
        this.innerHTML = '';
    }

}

let mcTableNoData;

if (!customElements.get('mc-table-no-data')) {
    mcTableNoData = customElements.define('mc-table-no-data', McTableNoData);
}

export default mcTableNoData;
