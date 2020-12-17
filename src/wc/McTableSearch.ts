/**
 * @Author: abbeymart | Abi Akindele | @Created: 2019-06-18 | @Updated: 2020-07-01
 * @Company: mConnect.biz | @License: MIT
 * @Description: mc-table-search, simple auto search/filtering of the table data/records
 */

import {DOMType} from "./types";
import {dtstore} from "./store/DtStore";
import TableHelper from "./templates/TableHelpers";

class McTableSearch extends HTMLElement {
    #DOM: DOMType = {};

    constructor() {
        super();
        // render component
        this.renderComponent();
    }

    static get observedAttributes() {
        return ['dataitems'];
    }

    attributeChangedCallback(name: string, oldVal: number[], newValue: number[]) {
        if (oldVal === newValue) {
            return;
        }
        this.renderComponent();
    }

    // getters ands setters
    get searchKey(): string {
        return dtstore.searchKey;
    }

    set searchKey(value: string) {
        dtstore.searchKey = value;
        // this.setAttribute('searchKey', value.toString());
    }

    renderComponent() {
        this.innerHTML = `
            <div>
                <input class="w3-input mc-bold-label" type="text" id="mc-table-search-key" placeholder="Enter Search Keywords">
            </div>
        `;
        // event's handlers
        // Component DOM references
        this.#DOM = TableHelper.getTableSearch(this.ownerDocument);
        const tableSearch = this.#DOM.tableSearch;

        // handle & emit events
        if (tableSearch) {
            tableSearch.onchange = (e: any) => {
                e.preventDefault();
                // emit event, for other sub-components
                e.target.itemType = 'table-search';
                e.target.itemValue = e.target.value || '';
                McTableSearch.emitPageEvent(e);
                // update store value(s):
                if (e.target.value) {
                    this.searchKey = e.target.value;
                }
            };
        }
    }

    disconnectedCallback() {
        // cleanup - reset DOM, removeEventLister(s), garbage collection...
        this.innerHTML = '';
    }

    static emitPageEvent(e: any) {
        e.preventDefault();
        // emit 'itemType event
        const compChange = new CustomEvent(e.target.itemType, {
            bubbles: true,
            cancelable: true,
            detail: {type: e.target.itemType, value: e.target.itemValue}
        });
        e.target.dispatchEvent(compChange);
    }
}

let mcTableSearch;

if (!customElements.get('mc-table-search')) {
    mcTableSearch = customElements.define('mc-table-search', McTableSearch);
}

export default mcTableSearch;
