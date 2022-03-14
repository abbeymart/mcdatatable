/**
 * @Author: abbeymart | Abi Akindele | @Created: 2019-06-24 | @Updated: 2020-06-30
 * @Company: mConnect.biz | @License: MIT
 * @Description: mc-data-table web component
 */

//  web-component observed-attributes actions:
//  1. set/activate the observed attributes at components-level
//  2. set observed attributes from parent component and dtstore to reload/re-render the controlled/child component(s)

// templates
import DataTableTemplate from "./templates/DataTableTemplate";
import TableNoDataTemplate from "./templates/TableNoDataTemplate";
import { DataItemsType, DataField, TableStyle, SortStyle, DOMType, DataElementType, DataFetchAlert } from "./types";
import { dtStore, DtStore } from "./dtStore";

class McDataTable extends HTMLElement {
    protected DOM: DOMType;
    protected dtstore: DtStore

    constructor() {
        super();
        this.DOM = {};
        this.dtstore = dtStore()
        // TODO: paging(fetch/set dataitems by skip/limit) - dataFetch
        // if paging === true, pass currentPage, pageLimit, searchKey and order...
        // to determine dataitems (by skip && limit)
        // issue/concerns/considerations: performance with fetch-action for every page

        // render template
        this.renderComponent();
    }

    // observed attributes to re-render mc-data-table
    static get observedAttributes() {
        return ["paging", "pagelimits", "datafields", "dataitems", "totalrecordscount", "tablestyle", "sortstyle",];
    }

    attributeChangedCallback(name: string, oldVal: string, newValue: string) {
        // considering the potentially large size of data-items, reload on change/set
        if (name === "dataitems") {
            this.renderComponent();
            return;
        }
        if (oldVal === newValue) {
            return;
        }
        this.renderComponent();
    }

    // getters and setters (props) for mcDatatable component
    get pageLimit(): number {
        return this.dtstore.PageLimit;
    }

    set pageLimit(value: number) {
        this.dtstore.PageLimit = value;
    }

    get currentPage(): number {
        return this.dtstore.CurrentPage;
    }

    set currentPage(value: number) {
        this.dtstore.CurrentPage = value;
    }

    get paging(): boolean {
        return this.dtstore.Paging;
    }

    set paging(value: boolean) {
        this.dtstore.Paging = value;
        this.setAttribute("paging", value.toString());
    }

    get pageStart(): number {
        return this.dtstore.PageStart;
    }

    set pageStart(value: number) {
        this.dtstore.PageStart = value;
    }

    get pageLimits(): number[] {
        return this.dtstore.PageLimits;
    }

    set pageLimits(value: number[]) {
        this.dtstore.PageLimits = value;
        this.setAttribute("pagelimits", JSON.stringify(value))
    }

    get tableStyle(): TableStyle {
        return this.dtstore.TableStyle;
    }

    set tableStyle(value: TableStyle) {
        this.dtstore.TableStyle = value;
        this.setAttribute("tablestyle", JSON.stringify(value));
    }

    get sortStyle(): SortStyle {
        return this.dtstore.SortStyle;
    }

    set sortStyle(value: SortStyle) {
        this.dtstore.SortStyle = value;
        this.setAttribute("sortstyle", JSON.stringify(value));
    }

    get dataFields(): Array<DataField> {
        return this.dtstore.DataFields;
    }

    set dataFields(value: Array<DataField>) {
        this.dtstore.DataFields = value;
        this.setAttribute("datafields", JSON.stringify(value));
    }

    get dataTotal(): number {
        return this.dtstore.DataTotal;
    }

    set dataTotal(value: number) {
        this.dtstore.DataTotal = value;
    }

    get dataItems(): DataItemsType {
        return this.dtstore.DataItems;
    }

    set dataItems(value: DataItemsType) {
        this.dtstore.DataItems = value;
        this.setAttribute("dataitems", "new-data-items");
    }

    get dataItemsCount() {
        return this.dtstore.DataItemsCount;
    }

    get recordTotal() {
        return this.dtstore.RecordTotal;
    }

    get TotalRecordsCount(): number {
        return this.dtstore.TotalRecordsCount;
    }

    set TotalRecordsCount(value: number) {
        this.dtstore.TotalRecordsCount = value;
        this.setAttribute("totalrecordscount", value.toString());
    }

    get permittedEvents(): Array<string> {
        return this.dtstore.PermittedEvents;
    }

    set permittedEvents(value: Array<string>) {
        this.dtstore.PermittedEvents = value;
    }

    get dataFetchAlert(): DataFetchAlert | null {
        return this.dtstore.DataFetchAlert
    }

    set dataFetchAlert(value: DataFetchAlert | null) {
        this.dtstore.DataFetchAlert = value
    }

    renderComponent() {
        // render template,
        if (this.dtstore.RecordTotal > 0 && this.dtstore.DataFieldsCount > 0 && this.dtstore.DataItemsCount > 0) {
            this.innerHTML = DataTableTemplate();
        } else {
            this.innerHTML = TableNoDataTemplate();
        }
        // child-components' activation via data-setting | events
        this.DOM.pageLimit = document.querySelector("mc-page-limit") as DataElementType;
        if (this.DOM.pageLimit) {
            this.DOM.pageLimit.pageLimits = this.dtstore.PageLimits;
        }

        this.DOM.table = document.querySelector("mc-table") as DataElementType;
        if (this.DOM.table) {
            this.DOM.table.currentPage = this.dtstore.CurrentPage;
            this.DOM.table.pageLimit = this.dtstore.PageLimit;
            this.DOM.table.searchKey = this.dtstore.SearchKey;
            this.DOM.table.dataFields = this.dtstore.DataFields;
            this.DOM.table.dataItems = this.dtstore.DataItems;
            this.DOM.table.tableStyle = this.dtstore.TableStyle;
            this.DOM.table.sortStyle = this.dtstore.SortStyle;
        }
        this.DOM.tableMessage = document.querySelector("mc-table-message") as DataElementType;
        if (this.DOM.tableMessage) {
            this.DOM.tableMessage.currentPage = this.dtstore.CurrentPage;
            this.DOM.tableMessage.pageLimit = this.dtstore.PageLimit;
            this.DOM.tableMessage.dataTotal = this.dtstore.DataTotal;
            this.DOM.tableMessage.totalRecordsCount = this.dtstore.TotalRecordsCount;
        }
        this.DOM.pageNav = document.querySelector("mc-page-nav") as DataElementType;
        if (this.DOM.pageNav) {
            // this.DOM.pageNav.currentPage = this.dtstore.CurrentPage; // set at mc-page-nav
            this.DOM.pageNav.pageLimit = this.dtstore.PageLimit;
            this.DOM.pageNav.dataTotal = this.dtstore.DataTotal;
        }
        // update dtstore
        if (Object.keys(this.DOM).length > 0) {
            this.dtstore.Dom = {...this.dtstore.Dom, ...this.DOM}
        }
    }

    disconnectedCallback() {
        // cleanup - reset DOM, removeEventLister(s), garbage collection...
        this.innerHTML = "";
    }

}

// let mcDataTable;

if (!customElements.get("mc-data-table")) {
    // mcDataTable = customElements.define("mc-data-table", McDataTable);
    customElements.define("mc-data-table", McDataTable);
}
