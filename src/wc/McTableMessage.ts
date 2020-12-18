/**
 * @Author: abbeymart | Abi Akindele | @Created: 2019-06-18 | @Updated: 2020-07-01
 * @Company: mConnect.biz | @License: MIT
 * @Description: mc-table-message, to display table-view message(e.g. showing 1 to 10 of 350 records)
 */
import { dtstore } from "./store/DtStore";

class McTableMessage extends HTMLElement {
    constructor() {
        super();
        // render component
        this.renderComponent();
    }

    // getters and setters
    get initialDataTotal(): number {
        return dtstore.InitialDataTotal;
    }

    get dataTotal(): number {
        return dtstore.DataTotal;
    }

    get pageLimit(): number {
        return dtstore.PageLimit;
    }

    get currentPage(): number {
        return dtstore.CurrentPage;
    }

    get itemFrom(): number {
        // calculate per page itemFrom and itemTo records/items
        return this.pageLimit * (this.currentPage - 1) + 1;
    }

    get itemTo(): number {
        if (this.dataTotal < this.pageLimit * this.currentPage) {
            return this.dataTotal;
        }
        return this.pageLimit * this.currentPage;
    }

    renderComponent() {
        this.innerHTML = `<div class="w3-bar">`;
        if (this.itemFrom > 0 && this.itemTo >= this.itemFrom && this.dataTotal >= this.itemTo) {
            this.innerHTML += `
                <div>
                    <span class="w3-text-black">Showing ${this.itemFrom} to ${this.itemTo} of ${this.dataTotal} entries </span>
                    ${this.dataTotal < this.initialDataTotal ? `<span> (filtered from ${this.initialDataTotal} total entries) </span>` : ''}
                    <span class="w3-blue"><strong>[ Page ${this.currentPage} ]</strong></span>
                </div>
            `;
        } else {
            this.innerHTML += `
                <div>
                    <span class="w3-text-black">Page (from/to) information missing</span>
                </div>          
            `
        }
        this.innerHTML += `</div>`
    }

    disconnectedCallback() {
        // cleanup - removeEventLister(s), garbage collection...
        this.innerHTML = '';
    }

}

let mcTableMessage;

if (!customElements.get('mc-table-message')) {
    mcTableMessage = customElements.define('mc-table-message', McTableMessage);
}

export default mcTableMessage;
