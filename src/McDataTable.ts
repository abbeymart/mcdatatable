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
import { DataItemsType, DataField, TableStyle, SortStyle, DOMType, DataElementType } from "./types";
import { dtstore } from "./dtStore";

class McDataTable extends HTMLElement {
    protected DOM: DOMType;

    constructor() {
        super();
        this.DOM = {};
        // TODO: paging(fetch/set dataitems by skip/limit), optional feature
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
        return dtstore.PageLimit;
    }

    set pageLimit(value: number) {
        dtstore.PageLimit = value;
    }

    get currentPage(): number {
        return dtstore.CurrentPage;
    }

    set currentPage(value: number) {
        dtstore.CurrentPage = value;
    }

    get paging(): boolean {
        return dtstore.Paging;
    }

    set paging(value: boolean) {
        dtstore.Paging = value;
        this.setAttribute("paging", value.toString());
    }

    get pageStart(): number {
        return dtstore.PageStart;
    }

    set pageStart(value: number) {
        dtstore.PageStart = value;
    }

    get pageLimits(): number[] {
        return dtstore.PageLimits;
    }

    set pageLimits(value: number[]) {
        dtstore.PageLimits = value;
        this.setAttribute("pagelimits", JSON.stringify(value))
    }

    get tableStyle(): TableStyle {
        return dtstore.TableStyle;
    }

    set tableStyle(value: TableStyle) {
        dtstore.TableStyle = value;
        this.setAttribute("tablestyle", JSON.stringify(value));
    }

    get sortStyle(): SortStyle {
        return dtstore.SortStyle;
    }

    set sortStyle(value: SortStyle) {
        dtstore.SortStyle = value;
        this.setAttribute("sortstyle", JSON.stringify(value));
    }

    get dataFields(): Array<DataField> {
        return dtstore.DataFields;
    }

    set dataFields(value: Array<DataField>) {
        dtstore.DataFields = value;
        this.setAttribute("datafields", JSON.stringify(value));
    }

    get dataTotal(): number {
        return dtstore.DataTotal;
    }

    set dataTotal(value: number) {
        dtstore.DataTotal = value;
    }

    get dataItems(): DataItemsType {
        return dtstore.DataItems;
    }

    set dataItems(value: DataItemsType) {
        dtstore.DataItems = value;
        this.setAttribute("dataitems", "new-data-items");
    }

    get dataItemsCount() {
        return dtstore.DataItemsCount;
    }

    get recordTotal() {
        return dtstore.RecordTotal;
    }

    get TotalRecordsCount(): number {
        return dtstore.TotalRecordsCount;
    }

    set TotalRecordsCount(value: number) {
        dtstore.TotalRecordsCount = value;
        this.setAttribute("totalrecordscount", value.toString());
    }

    get permittedEvents(): Array<string> {
        return dtstore.PermittedEvents;
    }

    set permittedEvents(value: Array<string>) {
        dtstore.PermittedEvents = value;
    }

    renderComponent() {
        // render template,
        if (dtstore.RecordTotal > 0 && dtstore.DataFieldsCount > 0 && dtstore.DataItemsCount > 0) {
            this.innerHTML = DataTableTemplate();
        } else {
            this.innerHTML = TableNoDataTemplate();
        }
        // child-components' activation via data-setting | events
        this.DOM.pageLimit = document.querySelector("mc-page-limit") as DataElementType;
        if (this.DOM.pageLimit) {
            this.DOM.pageLimit.pageLimits = dtstore.PageLimits;
        }

        this.DOM.table = document.querySelector("mc-table") as DataElementType;
        if (this.DOM.table) {
            this.DOM.table.currentPage = dtstore.CurrentPage;
            this.DOM.table.pageLimit = dtstore.PageLimit;
            this.DOM.table.searchKey = dtstore.SearchKey;
            this.DOM.table.dataFields = dtstore.DataFields;
            this.DOM.table.dataItems = dtstore.DataItems;
            this.DOM.table.tableStyle = dtstore.TableStyle;
            this.DOM.table.sortStyle = dtstore.SortStyle;
        }
        this.DOM.tableMessage = document.querySelector("mc-table-message") as DataElementType;
        if (this.DOM.tableMessage) {
            this.DOM.tableMessage.currentPage = dtstore.CurrentPage;
            this.DOM.tableMessage.pageLimit = dtstore.PageLimit;
            this.DOM.tableMessage.dataTotal = dtstore.DataTotal;
            this.DOM.tableMessage.totalRecordsCount = dtstore.TotalRecordsCount;
        }
        this.DOM.pageNav = document.querySelector("mc-page-nav") as DataElementType;
        if (this.DOM.pageNav) {
            // this.DOM.pageNav.currentPage = dtstore.CurrentPage; // set at mc-page-nav
            this.DOM.pageNav.pageLimit = dtstore.PageLimit;
            this.DOM.pageNav.dataTotal = dtstore.DataTotal;
        }
        // update dtstore
        if (Object.keys(this.DOM).length > 0) {
            dtstore.Dom = {...dtstore.Dom, ...this.DOM}
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
