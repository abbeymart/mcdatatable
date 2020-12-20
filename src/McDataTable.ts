/**
 * @Author: abbeymart | Abi Akindele | @Created: 2019-06-24 | @Updated: 2020-06-30
 * @Company: mConnect.biz | @License: MIT
 * @Description: mc-data-table web component
 */

// TODO:
//  web-component observed-attributes option:
//  1. activate observed attributes,
//  2. set observed attributes from parent/controlling component to reload the controlled/child component(s)

// templates
import DataTableTemplate from "./templates/DataTableTemplate";
import TableNoDataTemplate from "./templates/TableNoDataTemplate";
import { DataItemsType, DataFieldsType, TableStyle, SortStyle, DOMType, DataStoreType } from "./types";
import { dtstore } from "./dtStore";

type ObValueType = number | DataItemsType | DataFieldsType | TableStyle | SortStyle;

class McDataTable extends HTMLElement {
    constructor() {
        super();
        // TODO: paging(fetch/set dataitems by skip/limit), optional feature?
        // if paging === true, pass currentPage, pageLimit, searchKey and order...
        // to determine dataitems (by skip && limit)
        // issue/concerns/considerations: performance with fetch-action for every page

        // render template
        this.renderComponent();
    }

    // observed attributes to re-render mc-data-table
    static get observedAttributes() {
        return ["paging", "pagelimits", "datafields", "dataitems", "initialdatatotal", "tablestyle", "sortstyle",];
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
        // TODO: reload affected component(s) - PageNav and PageLimit
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

    get dataFields(): DataFieldsType {
        return dtstore.DataFields;
    }

    set dataFields(value: DataFieldsType) {
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

    get initialDataTotal(): number {
        return dtstore.InitialDataTotal;
    }

    set initialDataTotal(value: number) {
        dtstore.InitialDataTotal = value;
        this.setAttribute("initialdatatotal", value.toString());
    }

    renderComponent() {
        // render template,
        if (dtstore.RecordTotal > 0 && dtstore.DataFieldsCount > 0 && dtstore.DataItemsCount > 0) {
            this.innerHTML = DataTableTemplate();
        } else {
            this.innerHTML = TableNoDataTemplate();
        }
        // child-components' activation via data-setting | events
        const pageLimitDom = document.querySelector("mc-page-limit") as DataStoreType;
        if (pageLimitDom) {
            // pageLimitDom.pageLimit = dtstore.PageLimit;
            pageLimitDom.pageLimits = dtstore.PageLimits;
        }
        const tableSearchDom = document.querySelector("mc-table-search") as DataStoreType;
        const tableDom = document.querySelector("mc-table") as DataStoreType;

        const tableMessageDom = document.querySelector("mc-table-message") as DataStoreType;
        if (tableMessageDom) {
            tableMessageDom.currentPage = dtstore.CurrentPage;
            tableMessageDom.pageLimit = dtstore.PageLimit;
            tableMessageDom.dataTotal = dtstore.DataTotal;
            tableMessageDom.initialDataTotal = dtstore.InitialDataTotal;
        }
        const pageNavDom = document.querySelector("mc-page-nav") as DataStoreType;
        if (pageNavDom) {
            pageNavDom.pageLimit = dtstore.PageLimit;
            pageNavDom.dataTotal = dtstore.DataTotal;
        }
    }

    disconnectedCallback() {
        // cleanup - reset DOM, removeEventLister(s), garbage collection...
        this.innerHTML = "";
    }

}

let mcDataTable;

if (!customElements.get("mc-data-table")) {
    mcDataTable = customElements.define("mc-data-table", McDataTable);
}

export default mcDataTable;
