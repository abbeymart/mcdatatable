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

    // getters ands setters
    get searchKey(): string {
        return dtstore.SearchKey;
    }

    set searchKey(value: string) {
        dtstore.SearchKey = value;
    }

    // methods
    setSearchKey(e: Event, val: string) {
        e.preventDefault();
        this.searchKey = val;
    }

    renderComponent() {
        this.innerHTML = `
            <div>
                <input class="w3-input mc-bold-label" type="text" id="mc-table-search-key" placeholder="Enter Search Keywords" onkeyup="this.setSearchKey(e, e.target.value)">
            </div>
        `;
    }

    disconnectedCallback() {
        // cleanup - reset DOM, removeEventLister(s), garbage collection...
        this.innerHTML = '';
    }

}

let mcTableSearch;

if (!customElements.get('mc-table-search')) {
    mcTableSearch = customElements.define('mc-table-search', McTableSearch);
}

export default mcTableSearch;
