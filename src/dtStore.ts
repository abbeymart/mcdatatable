/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-05-27 | @Updated: 2020-06-29
 * @Company: mConnect.biz | @License: MIT
 * @Description: mc-datatable store, single source of truth for mc-datatable data
 */

import {
    TableStyle, SortStyle, DataField, PagePositionType, DOMType, DataStats,
    DataFetchAlert, DataFetchAlertResult, DataTableProps, ObjectType, ObjectRefType,
    GetRequestType,
} from "./types";

class DtStore {
    // singleton variable
    private static _mcStore: DtStore
    // properties
    protected tableStyle: TableStyle;
    protected sortStyle: SortStyle;
    protected dataFields: Array<DataField>;
    protected dataItems: Array<ObjectRefType>;
    protected dataStats: DataStats;
    protected dataFetchAlert?: DataFetchAlert | null;
    protected fetchAlertResult: DataFetchAlertResult;
    protected dataItemsCount: number;
    protected searchItemsCount: number;
    protected paging: boolean;
    protected pageStart: number;
    protected pageLimit: number;
    protected pagePosition: PagePositionType;
    protected pageLimits: Array<number>;
    protected currentPage: number;
    protected startPage: number;
    protected endPage: number;
    protected searchKey: string;
    protected dataCount: number;
    protected dataTotal: number;
    protected totalRecordsCount: number; // to limit number of records to process
    protected sortAsc: boolean;
    protected sortDesc: boolean;
    protected permittedEvents: Array<string>;
    protected DOM: DOMType;

    constructor(props?: DataTableProps) {
        // required attributes | default values
        this.pageLimit = props?.pageLimit || 10;
        this.currentPage = 1;
        this.startPage = 1;
        this.endPage = 1;
        this.dataFields = props?.dataFields || [];
        this.dataItems = props?.dataItems || [];
        this.dataStats = props?.dataStats || {};
        this.dataCount = 0;
        this.dataTotal = 0;
        this.totalRecordsCount = 0;
        this.paging = props?.paging || true;
        this.pageStart = props?.pageStart || 1;
        this.pageLimit = props?.pageLimit || 10;
        this.pagePosition = "first-page";
        this.pageLimits = props?.pageLimits || [10, 20, 30, 50, 100, 200];
        this.tableStyle = props?.tableStyle || {
            table      : "w3-table w3-striped w3-border w3-bordered w3-hoverable",
            tableHeader: "w3-red",
            tableBody  : "w3-hover w3-hover-grey",
        };
        this.sortStyle = props?.sortStyle || {
            asc : "fa fa-caret-up",
            desc: "fa fa-caret-down",
        };
        this.searchKey = "";
        this.dataTotal = 0;
        this.dataItemsCount = 0;
        this.searchItemsCount = 0;
        this.dataFetchAlert = props?.dataFetchAlert || null;
        this.fetchAlertResult = {skip: 0,}
        this.sortAsc = false;
        this.sortDesc = false;
        this.permittedEvents = ["click", "change", "mouseover", "keyup", "keydown", "mouseleave", "mouseenter"];
        this.DOM = {};

        if (!this.dataFetchAlert) {
            this.dataFetchAlert = async (val: DataFetchAlertResult, getRequest?: GetRequestType) => {
                // store fetchAlertResult
                this.fetchAlertResult = val
                // perform the required crud-action/task
                if (val.fetchAlert && getRequest) {
                    await getRequest({
                        skip : val.skip,
                        limit: val.limit,
                    })
                }
            }
        }
    }

    public static get DtStoreInstance(): DtStore {
        return this._mcStore || (this._mcStore = new this())
    }

    // getters & setters
    // activate dom-elements' values from the setters: pageLimit, tableSearch, table, pageNav, tableMessage
    get Dom(): DOMType {
        return this.DOM;
    }

    set Dom(value: DOMType) {
        this.DOM = value;
    }

    get TableStyle(): TableStyle {
        return this.tableStyle;
    }

    set TableStyle(value: TableStyle) {
        this.tableStyle = value;
        // activate component re-rendering
        if (this.DOM.table) {
            this.DOM.table.tableStyle = dtstore.TableStyle;
        }
    }

    get SortStyle(): SortStyle {
        return this.sortStyle;
    }

    set SortStyle(value: SortStyle) {
        this.sortStyle = value;
        // activate component re-rendering
        if (this.DOM.table) {
            this.DOM.table.sortStyle = dtstore.SortStyle;
        }
    }

    get DataFields(): Array<DataField> {
        return this.dataFields;
    }

    set DataFields(value: Array<DataField>) {
        this.dataFields = value;
        // activate component re-rendering
        if (this.DOM.table) {
            this.DOM.table.dataFields = dtstore.DataFields;
        }
    }

    get DataItems(): Array<ObjectType> {
        return this.dataItems;
    }

    set DataItems(value: Array<ObjectType>) {
        this.dataItems = value;
        this.dataItemsCount = value.length

        // activate component re-rendering
        if (this.DOM.table) {
            this.DOM.table.dataItems = dtstore.DataItems;
        }
    }

    get Paging(): boolean {
        return this.paging;
    }

    set Paging(value: boolean) {
        this.paging = value;
    }

    get PageStart(): number {
        return this.pageStart;
    }

    set PageStart(value: number) {
        this.pageStart = value;
    }

    get PageLimit(): number {
        return this.pageLimit;
    }

    set PageLimit(value: number) {
        this.pageLimit = value;
        // activate component re-rendering
        if (this.DOM.table) {
            this.DOM.table.pageLimit = dtstore.PageLimit;
        }
        if (this.DOM.tableMessage) {
            this.DOM.tableMessage.pageLimit = dtstore.PageLimit;
        }
        if (this.DOM.pageNav) {
            this.DOM.pageNav.pageLimit = dtstore.PageLimit;
        }
    }

    get PagePosition(): PagePositionType {
        return this.pagePosition;
    }

    set PagePosition(value: PagePositionType) {
        this.pagePosition = value;
    }

    get PageLimits(): number[] {
        return this.pageLimits;
    }

    set PageLimits(value: number[]) {
        this.pageLimits = value;
        // activate component re-rendering
        if (this.DOM.pageLimit) {
            this.DOM.pageLimit.pageLimits = dtstore.PageLimits;
        }
    }

    get CurrentPage(): number {
        return this.currentPage;
    }

    set CurrentPage(value: number) {
        this.currentPage = value;
        // activate component re-rendering
        if (this.DOM.table) {
            this.DOM.table.currentPage = dtstore.CurrentPage;
        }
        if (this.DOM.tableMessage) {
            this.DOM.tableMessage.currentPage = dtstore.CurrentPage;
        }
    }

    get SearchKey(): string {
        return this.searchKey;
    }

    set SearchKey(value: string) {
        this.searchKey = value;
        // activate component re-rendering
        if (this.DOM.table) {
            this.DOM.table.searchKey = dtstore.SearchKey;
        }
    }

    get DataTotal(): number {
        return this.dataTotal;
    }

    set DataTotal(value: number) {
        this.dataTotal = value;
        // activate component re-rendering
        if (this.DOM.tableMessage) {
            this.DOM.tableMessage.dataTotal = dtstore.DataTotal;
        }
        if (this.DOM.pageNav) {
            this.DOM.pageNav.dataTotal = dtstore.DataTotal;
        }
    }

    get SortAsc(): boolean {
        return this.sortAsc;
    }

    set SortAsc(value: boolean) {
        this.sortAsc = value;
    }

    get SortDesc(): boolean {
        return this.sortDesc;
    }

    set SortDesc(value: boolean) {
        this.sortDesc = value;
    }

    get DataItemsCount() {
        return this.DataItems.length;
    }

    get DataFieldsCount() {
        return this.DataFields.length;
    }

    set SearchItemsCount(value: number) {
        this.searchItemsCount = value;
    }

    set DataItemsTotal(value: number) {
        this.dataTotal = value;
    }

    get RecordTotal() {
        return this.DataTotal ? this.DataTotal : this.DataItemsCount;
    }

    get TotalRecordsCount(): number {
        return this.totalRecordsCount
    }

    set TotalRecordsCount(value: number) {
        this.totalRecordsCount = value || this.RecordTotal;
        // activate component re-rendering
        if (this.DOM.tableMessage) {
            this.DOM.tableMessage.totalRecordsCount = dtstore.TotalRecordsCount;
        }
    }

    get PermittedEvents(): Array<string> {
        return this.permittedEvents;
    }

    set PermittedEvents(value: Array<string>) {
        this.permittedEvents = value;
    }

    get DataFetchAlert(): DataFetchAlert | null {
        return this.dataFetchAlert || null
    }

    set DataFetchAlert(value: DataFetchAlert | null) {
        this.dataFetchAlert = value
    }
}

// constructor/instance function
function dtStore(props?: DataTableProps) {
    return new DtStore(props);
}

// singleton
const dtstore = DtStore.DtStoreInstance

export { DtStore, dtStore, dtstore };
