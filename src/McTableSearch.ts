/**
 * @Author: abbeymart | Abi Akindele | @Created: 2019-06-18 | @Updated: 2020-07-01
 * @Company: mConnect.biz | @License: MIT
 * @Description: mc-table-search, simple auto search/filtering of the table data/records
 */

import { dtstore } from "./dtStore";

class McTableSearch extends HTMLElement {
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
    setSearchKey(value: string) {
        dtstore.SearchKey = value;
    }

    renderComponent() {
        this.innerHTML = `
            <div>
                <input class="w3-input mc-bold-label" type="text" id="mc-table-search-key" placeholder="${this.searchKey || 'Enter Search Keywords'}">
            </div>
        `;

        // event"s handlers | to set the search-key value
        const searchKeyDom = document.getElementById("mc-table-search-key") as HTMLInputElement;
        if (searchKeyDom) {
            searchKeyDom.onkeyup = (e) => {
                e.preventDefault();
                this.setSearchKey(searchKeyDom.value);
            }
        }
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
