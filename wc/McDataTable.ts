/**
 * @Author: abbeymart | Abi Akindele | @Created: 2019-06-24 | @Updated: 2020-06-30
 * @Company: mConnect.biz | @License: MIT
 * @Description: mc-data-table web component
 */

// TODO:
//  events option:
//  1. for change/other component(s)-trigger event, update store & create custom event
//  2. listen to triggered custom-event, update store & perform necessary action(s)/re-render
//  pub-sub option:
//  1. set prop to store value via component event/action/observed attrs/props
//  2. on/from-set store value(s), re-publish the observable(s)
//  3. subscribe to published observable(s) from the store & re-render affected component(s)

// templates
import mcDataTableTemplate from './templates/mcDataTableTemplate';
import mcTableNoDataTemplate from './templates/mcTableNoDataTemplate';

// helper functions
import TableHelper from './templates/mcTableHelpers';

import {DataItemsType, DataFieldsType, TableStyle, SortStyle, DOMType} from "./types";
import {dtstore} from "./store/DtStore";

type ObValueType = number | DataItemsType | DataFieldsType | TableStyle | SortStyle;

class McDataTable extends HTMLElement {
    // private properties
    protected pageLimit: number;
    protected currentPage: string | number;
    protected dataFields: DataFieldsType;
    protected dataItems: DataItemsType;
    protected dataTotal: number;
    protected initialDataTotal: number;
    protected paging: boolean;
    protected pageStart: number;
    protected pageLimits: number[];
    protected tableStyle: TableStyle;
    protected sortStyle: SortStyle;
    protected DOM: DOMType = {};

    constructor() {
        super();
        // initial properties setting..., from the store

        this.pageLimit = dtstore.mcPageLimit;
        this.currentPage = dtstore.mcCurrentPage;

        this.dataFields = dtstore.mcDataFields;
        this.dataItems = dtstore.mcDataItems;
        this.dataTotal = dtstore.mcRecordTotal;
        this.initialDataTotal = dtstore.mcRecordTotal;
        this.paging = dtstore.mcPaging;
        this.pageStart = dtstore.mcPageStart;
        this.pageLimits = dtstore.mcPageLimits;
        this.tableStyle = dtstore.mcTableStyle;
        this.sortStyle = dtstore.mcSortStyle;
        this.DOM = {};
        // TODO: paging(fetch/set dataitems by skip/limit), optional feature?
        // if paging === true, pass currentPage, pageLimit, searchKey and order...
        // to determine dataitems (by skip && limit)
        // issue/concerns/considerations: performance with fetch-action for every page

        // render template,
        this.renderComponent();
    }

    // TODO: observed attributes to re-render component(s)
    //  i.e. subscribe to appropriate prop(s) and re-render impacted component(s)
    static get observedAttributes() {
        return ['datatotal', 'dataitems', 'datafields', 'initialdatatotal', 'tablestyle', 'sortstyle'];
    }

    attributeChangedCallback(name: string, oldVal: ObValueType, newValue: ObValueType) {
        if (oldVal === newValue) {
            return;
        }
        // change observed attributes in impacted components to trigger re-rendering
        switch (name) {
            case 'datatotal':
                // impacts page-nav and page-message components
                this.DOM = TableHelper.getDOM(this.ownerDocument);
                if (this.DOM.pageNav) {
                    this.DOM.pageNav.dataTotal = newValue;
                }
                if (this.DOM.pageMessage) {
                    this.DOM.pageMessage.dataTotal = newValue;
                }
                break;
            case 'dataitems':
                // impacts page-nav, table and page-message components
                this.DOM = TableHelper.getDOM(this.ownerDocument);
                this.DOM.table.dataItems = newValue;
                this.DOM.pageNav.currentTotal = this.dataItems.length;
                this.DOM.pageMessage.currentTotal = this.dataItems.length;
                break;
            case 'datafields':
                // impacts table-header and table-body components
                this.DOM = TableHelper.getDOM(this.ownerDocument);
                this.DOM.table.dataFields = newValue;
                break;
            case 'initialdatatotal':
                // impact page-nav and page-message components
                this.DOM = TableHelper.getDOM(this.ownerDocument);
                this.DOM.pageNav.pagelimit = newValue;
                this.DOM.pageMessage.pagelimit = newValue;
                break;
            case 'tablestyle':
                // impact table-header and table-body
                this.DOM = TableHelper.getDOM(this);
                this.DOM.table.searchkey = newValue;
                break;
            case 'sortstyle':
                // impact table-header and table-body
                this.DOM = TableHelper.getDOM(this.ownerDocument);
                this.DOM.table.searchkey = newValue;
                break;
        }
    }

    get mcPageLimit(): number {
        return dtstore.mcPageLimit;
    }

    set mcPageLimit(value: number) {
        this.pageLimit = value;
        dtstore.mcPageLimit = value;
        // TODO: reload affected component(s)
    }

    get mcCurrentPage(): number {
        return dtstore.mcCurrentPage;
    }

    set mcCurrentPage(value: number) {
        this.currentPage = value;
        dtstore.mcCurrentPage = value;
    }

    get mcPaging(): boolean {
        return dtstore.mcPaging;
    }

    set mcPaging(value: boolean) {
        this.paging = value;
        dtstore.mcPaging = value;
    }

    get mcPageStart(): number {
        return this.pageStart;
    }

    set mcPageStart(value: number) {
        this.pageStart = value;
        dtstore.mcPageStart = value;
    }

    get mcPageLimits(): number[] {
        return this.pageLimits;
    }

    set mcPageLimits(value: number[]) {
        this.pageLimits = value;
        dtstore.mcPageLimits = value;
    }

    get mcTableStyle(): TableStyle {
        return this.mcTableStyle;
    }

    set mcTableStyle(value: TableStyle) {
        this.tableStyle = value;
        dtstore.mcTableStyle = value;
        // this.setAttribute('tablestyle', 'new-table-style');
    }

    get mcSortStyle(): SortStyle {
        return this.sortStyle;
    }

    set mcSortStyle(value: SortStyle) {
        this.sortStyle = value;
        dtstore.mcSortStyle = value;
        // this.setAttribute('sortstyle', 'new-sort-style');
    }

    get mcDataFields(): DataFieldsType {
        return this.dataFields;
    }

    set mcDataFields(value: DataFieldsType) {
        this.dataFields = value;
        dtstore.mcDataFields = value;
        // this.setAttribute('datafields', 'new-data-fields');
    }

    get mcDataTotal(): number {
        return this.dataTotal;
    }

    set mcDataTotal(value: number) {
        this.dataTotal = value;
        dtstore.mcDataTotal = value;
    }

    get mcDataItems(): DataItemsType {
        return this.dataItems;
    }

    set mcDataItems(value: DataItemsType) {
        this.dataItems = value;
        dtstore.mcDataItems = value;
        // this.setAttribute('dataitems', 'new-data-items');
    }

    get mcDataCount() {
        return this.dataItems.length;
    }

    get mcRecordTotal() {
        return this.dataTotal ? this.dataTotal : this.mcDataCount;
    }

    renderComponent() {
        // render template,
        if (dtstore.mcRecordTotal > 0 && (Array.isArray(dtstore.mcDataFields) && dtstore.mcDataFields.length > 0) &&
            (Array.isArray(dtstore.mcDataItems) && dtstore.mcDataItems.length > 0)) {
            this.innerHTML = mcDataTableTemplate();
        } else {
            this.innerHTML = mcTableNoDataTemplate();
        }
        // component #DOM elements/references
        this.DOM = TableHelper.getDOM(this.ownerDocument);
        // sub-components' events handling
        if (this.DOM) {
            this.pageEvents(this.DOM);
        }
    }

    disconnectedCallback() {
    }

    // events' handlers
    pageEvents(domScope: DOMType) {
        // pageNav events handler
        this.addEventListener('page-nav-first', (e) => {
            if (domScope.pageNav) {
                domScope.pageNav.currentPage = e.detail.itemValue;
            }
            if (domScope.pageMessage) {
                domScope.pageMessage.currentpage = e.detail.itemValue;
            }
            if (domScope.table) {
                domScope.table.currentpage = e.detail.itemValue;
            }
        });
        this.addEventListener('page-nav-previous', (e) => {
            if (domScope.pageNav) {
                domScope.pageNav.currentPage = e.detail.itemValue;
            }
            if (domScope.pageMessage) {
                domScope.pageMessage.currentpage = e.detail.itemValue;
            }
            if (domScope.table) {
                domScope.table.currentpage = e.detail.itemValue;
            }
        });
        this.addEventListener('page-nav-next', (e) => {
            if (domScope.pageNav) {
                domScope.pageNav.currentPage = e.detail.itemValue;
            }
            if (domScope.pageMessage) {
                domScope.pageMessage.currentpage = e.detail.itemValue;
            }
            if (domScope.table) {
                domScope.table.currentpage = e.detail.itemValue;
            }
        });
        this.addEventListener('page-nav-last', (e) => {
            if (domScope.pageNav) {
                domScope.pageNav.currentPage = e.detail.itemValue;
            }
            if (domScope.pageMessage) {
                domScope.pageMessage.currentpage = e.detail.itemValue;
            }
            if (domScope.table) {
                domScope.table.currentpage = e.detail.itemValue;
            }
        });
        this.addEventListener('page-nav-number', (e) => {
            if (domScope.pageNav) {
                domScope.pageNav.currentPage = e.detail.itemValue;
            }
            if (domScope.pageMessage) {
                domScope.pageMessage.currentpage = e.detail.itemValue;
            }
            if (domScope.table) {
                domScope.table.currentpage = e.detail.itemValue;
            }
        });
        this.addEventListener('mc-page-limit', (e) => {
            if (domScope.tableMessage) {
                domScope.tableMessage.pagelimit = e.detail.itemValue;
            }
            if (domScope.pageMessage) {
                domScope.pageMessage.currentpage = e.detail.itemValue;
            }
            if (domScope.table) {
                domScope.table.currentpage = e.detail.itemValue;
            }
        });
        this.addEventListener('mc-table-search', (e) => {
            if (domScope.table) {
                domScope.table.searchkey = e.detail.itemValue;
            }
        });
    }
}

let mcDataTable;

if (!customElements.get('mc-data-table')) {
    mcDataTable = customElements.define('mc-data-table', McDataTable);
}

export default mcDataTable;
