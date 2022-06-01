/**
 * @Author: abbeymart | Abi Akindele | @Created: 2019-06-18 | @Updated: 2020-07-01
 * @Company: mConnect.biz | @License: MIT
 * @Description: mc-table-search, simple auto search/filtering of the table data/records
 */


class McTableSearch extends HTMLElement {
    constructor() {
        super();
        // render component
        this.renderComponent();
    }


    // methods
    renderComponent() {
        this.innerHTML = `
            <div>
                <input class="w3-input mc-bold-label" type="text" id="mc-table-search-key" placeholder="Enter Search Keywords">
            </div>
        `;
    }

    disconnectedCallback() {
        // cleanup - reset DOM, removeEventLister(s), garbage collection...
        this.innerHTML = '';
    }
}

if (!customElements.get('mc-table-search')) {
    customElements.define('mc-table-search', McTableSearch);
}
