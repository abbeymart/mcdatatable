/**
 * @Author: abbeymart | Abi Akindele | @Created: 2019-06-24 | @Updated: 2020-07-01
 * @Company: mConnect.biz | @License: MIT
 * @Description: mc-page-limit, for selecting the # of items/records/rows per page
 */

import mcPageLimitTemplate from './templates/PageLimitTemplate';
import TableHelper from './templates/TableHelpers';
import {DOMType} from "./types";
import {dtstore} from "./store/DtStore";

class McPageLimit extends HTMLElement {
    protected DOM: DOMType = {};

    constructor() {
        super();
        // render component
        this.renderComponent();
    }

    static get observedAttributes() {
        return ['pagelimits'];
    }

    attributeChangedCallback(name: string, oldVal: number[], newValue: number[]) {
        if (oldVal === newValue) {
            return;
        }
        this.renderComponent();
    }

    // getters ands setters
    set pageLimit(value: number) {
        dtstore.mcPageLimit = value;
        // this.setAttribute('pagelimit', value.toString());
    }

    get pagelimits(): number[] {
        return dtstore.mcPageLimits;
    }

    set pageLimits(value: number[]) {
        dtstore.mcPageLimits = value;
        this.setAttribute('pagelimits', value.toString());
    }

    renderComponent() {
        this.innerHTML = mcPageLimitTemplate({limits: this.pageLimits});
        // event's handlers
        // Component DOM references
        this.DOM = TableHelper.getPageLimitDOM(this.ownerDocument);
        const pageLimitValue = this.DOM.pageLimitValue;

        // handle & emit events
        if (pageLimitValue) {
            pageLimitValue.onchange = (e: any) => {
                e.preventDefault();
                // emit event, for other sub-components
                e.target.itemType = 'page-limit';
                e.target.itemValue = e.target.value || 10;
                McPageLimit.emitPageEvent(e);
                // update store value(s):
                if (e.target.value) {
                    this.pageLimit = e.target.value;
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

let mcPageLimit;

if (!customElements.get('mc-page-limit')) {
    mcPageLimit = customElements.define('mc-page-limit', McPageLimit);
}

export default mcPageLimit;
