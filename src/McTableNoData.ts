/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-06-13 | @Updated: 2020-06-13
 * @Company: mConnect.biz | @License: MIT
 * @Description: mc-table-no-data: to display when dataItems = []
 */

import mcTableNoDataTemplate from './templates/TableNoDataTemplate';

class McTableNoData extends HTMLElement {
    connectedCallback() {
        // attributes, set from parent component
        this.pageLimit   = parseInt(this.getAttribute('pagelimit'));
        this.itemTotal   = parseInt(this.getAttribute('itemtotal'));
        this.currentPage = parseInt(this.getAttribute('currentpage'));
        // calculate itemFrom and itemTo, for the currentPage
        this.getPageMessageValues({
            pageLimit  : this.pageLimit,
            itemTotal  : this.itemTotal,
            currentPage: this.currentPage,
        });

        this.props = {
            itemFrom : this.itemFrom,
            itemTo   : this.itemTo,
            itemTotal: this.itemTotal
        };
        // render component
        this.renderComponent(this.props);
    }

    static get observedAttributes() {
        return ['pagelimit', 'itemtotal', 'currentpage'];
    }

    attributeChangedCallback(name, oldVal, newValue) {
        if (oldVal === newValue) {
            return;
        }
        switch (name) {
            case 'pagelimit':
                this.props.pageLimit = this.pageLimit = parseInt(newValue);
                // re-calculate itemFrom and itemTo, for the currentPage
                this.renderComponent(this.props);
                break;
            case 'itemtotal':
                this.props.itemTotal = this.itemTotal = parseInt(newValue);
                // re-calculate itemFrom and itemTo, for the currentPage
                this.renderComponent(this.props);
                break;
            case 'currentpage':
                this.props.currentPage = this.currentPage = parseInt(newValue);
                // re-calculate itemFrom and itemTo, for the currentPage
                this.renderComponent(this.props);
                break;
        }
    }

    get pagelimit() {
        return this.getAttribute('pagelimit');
    }

    set pagelimit(value) {
        this.setAttribute('pagelimit', value);
    }

    get itemtotal() {
        return this.getAttribute('itemtotal');
    }

    set itemtotal(value) {
        this.setAttribute('itemtotal', value);
    }

    get currentpage() {
        return this.getAttribute('currentpage');
    }

    set currentpage(value) {
        this.setAttribute('currentpage', value);
    }

    renderComponent(props) {
        if (props && props.itemFrom > 0 && props.itemTo >= props.itemFrom && props.itemTotal >= props.itemTo) {
            this.innerHTML = mcTableNoDataTemplate(props);
        }
    }

    disconnectedCallback() {

    }

    getPageMessageValues(props) {
        // calculate per page itemFrom and itemTo records/items
        this.itemFrom = (props.pageLimit * (props.currentPage - 1)) + 1;
        this.itemTo   = (props.pageLimit * (props.currentPage));
    }
}

let mcTableNoData;

if (!customElements.get('mc-table-no-data')) {
    mcTableNoData = customElements.define('mc-table-no-data', McTableNoData);
}

export default mcTableNoData;
