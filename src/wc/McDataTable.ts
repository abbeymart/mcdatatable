/**
 * @Author: abbeymart | Abi Akindele | @Created: 2019-06-24 | @Updated: 2020-06-30
 * @Company: mConnect.biz | @License: MIT
 * @Description: mc-data-table web component
 */

// TODO:
//  events option:
//  1. for change/other component(s)-trigger event, update store & create custom event
//  2. listen to triggered custom-event, update store & perform necessary action(s)/re-render
//  pub-sub option (preferred / cleaner):
//  1. set prop to store value via component event/action/observed attrs/props
//  2. on/from-set store value(s), re-publish the observable(s)
//  3. subscribe to published observable(s) from the store & re-render affected component(s)

// templates
import DataTableTemplate from './templates/DataTableTemplate';
import TableNoDataTemplate from './templates/TableNoDataTemplate';

// helper functions
import TableHelper from './templates/TableHelpers';

import {DataItemsType, DataFieldsType, TableStyle, SortStyle, DOMType} from "./types";
import {dtstore} from "./store/DtStore";

type ObValueType = number | DataItemsType | DataFieldsType | TableStyle | SortStyle;

class McDataTable extends HTMLElement {
    // properties
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
        this.pageLimit = dtstore.PageLimit;
        this.currentPage = dtstore.CurrentPage;
        this.dataFields = dtstore.DataFields;
        this.dataItems = dtstore.DataItems;
        this.dataTotal = dtstore.RecordTotal;
        this.initialDataTotal = dtstore.RecordTotal;
        this.paging = dtstore.Paging;
        this.pageStart = dtstore.PageStart;
        this.pageLimits = dtstore.PageLimits;
        this.tableStyle = dtstore.TableStyle;
        this.sortStyle = dtstore.SortStyle;
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
    }

    get PageLimit(): number {
        return dtstore.PageLimit;
    }

    set PageLimit(value: number) {
        this.pageLimit = value;
        dtstore.PageLimit = value;
        // TODO: reload affected component(s)
    }

    get CurrentPage(): number {
        return dtstore.CurrentPage;
    }

    set CurrentPage(value: number) {
        this.currentPage = value;
        dtstore.CurrentPage = value;
    }

    get Paging(): boolean {
        return dtstore.Paging;
    }

    set Paging(value: boolean) {
        this.paging = value;
        dtstore.Paging = value;
    }

    get PageStart(): number {
        return this.pageStart;
    }

    set PageStart(value: number) {
        this.pageStart = value;
        dtstore.PageStart = value;
    }

    get PageLimits(): number[] {
        return this.pageLimits;
    }

    set PageLimits(value: number[]) {
        this.pageLimits = value;
        dtstore.PageLimits = value;
    }

    get TableStyle(): TableStyle {
        return this.TableStyle;
    }

    set TableStyle(value: TableStyle) {
        this.tableStyle = value;
        dtstore.TableStyle = value;
        // this.setAttribute('tablestyle', 'new-table-style');
    }

    get SortStyle(): SortStyle {
        return this.sortStyle;
    }

    set SortStyle(value: SortStyle) {
        this.sortStyle = value;
        dtstore.SortStyle = value;
        // this.setAttribute('sortstyle', 'new-sort-style');
    }

    get DataFields(): DataFieldsType {
        return this.dataFields;
    }

    set DataFields(value: DataFieldsType) {
        this.dataFields = value;
        dtstore.DataFields = value;
        // this.setAttribute('datafields', 'new-data-fields');
    }

    get DataTotal(): number {
        return this.dataTotal;
    }

    set DataTotal(value: number) {
        this.dataTotal = value;
        dtstore.DataTotal = value;
    }

    get DataItems(): DataItemsType {
        return this.dataItems;
    }

    set DataItems(value: DataItemsType) {
        this.dataItems = value;
        dtstore.DataItems = value;
        // this.setAttribute('dataitems', 'new-data-items');
    }

    get DataCount() {
        return this.dataItems.length;
    }

    get RecordTotal() {
        return this.dataTotal ? this.dataTotal : this.DataCount;
    }

    renderComponent() {
        // render template,
        if (dtstore.RecordTotal > 0 && (Array.isArray(dtstore.DataFields) && dtstore.DataFields.length > 0) &&
            (Array.isArray(dtstore.DataItems) && dtstore.DataItems.length > 0)) {
            this.innerHTML = DataTableTemplate();
        } else {
            this.innerHTML = TableNoDataTemplate();
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

    // events' handlers ==> TODO: publish-subscribe
    pageEvents(domScope: DOMType) {
        // pageNav events handler
    }
}

let mcDataTable;

if (!customElements.get('mc-data-table')) {
    mcDataTable = customElements.define('mc-data-table', McDataTable);
}

export default mcDataTable;
