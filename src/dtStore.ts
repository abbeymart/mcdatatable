/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-05-27 | @Updated: 2020-06-29
 * @Company: mConnect.biz | @License: MIT
 * @Description: mc-datatable store, single source of truth for mc-datatable data
 */

import {
    TableStyle, SortStyle, DataFieldsType, DataItemsType,
    PagePositionType, DataFieldType, ItemValueType,
} from "./types";
import { sortBy } from "lodash"
// import { Observable, Subscriber } from "rxjs";

class DtStore {
    // properties
    protected tableStyle: TableStyle;
    protected sortStyle: SortStyle;
    protected dataFields: DataFieldsType;
    protected dataItems: DataItemsType;
    protected paging: boolean;
    protected pageStart: number;
    protected pageLimit: number;
    protected pagePosition: PagePositionType;
    protected pageLimits: Array<number>;
    protected currentPage: number;
    protected searchKey: string;
    protected dataTotal: number;
    protected initialDataTotal: number;     // to limit number of records to process
    protected sortAsc: boolean;
    protected sortDesc: boolean;
    protected permittedEvents: Array<string>;

    constructor() {
        // required attributes | default values
        this.pageLimit = 10;
        this.currentPage = 1;
        this.dataFields = [];
        this.dataItems = [];
        this.dataTotal = 0;
        this.initialDataTotal = 0;
        this.paging = true;
        this.pageStart = 1;
        this.pageLimit = 10;
        this.pagePosition = "first-page";
        this.pageLimits = [10, 20, 30, 50, 100, 200];
        this.tableStyle = {
            table      : "w3-table w3-striped w3-border w3-hoverable",
            tableHeader: "w3-red",
            tableBody  : "w3-hover w3-hover-grey",
        };
        this.sortStyle = {
            asc : "fa fa-caret-up",
            desc: "fa fa-caret-down",
        };
        this.searchKey = "";
        this.dataTotal = 0;
        this.sortAsc = false;
        this.sortDesc = false;
        this.permittedEvents = ["click", "mouseover", "mouseleave", "mouseenter"];
    }

    // getters & setters
    get TableStyle(): TableStyle {
        return this.tableStyle;
    }

    set TableStyle(value: TableStyle) {
        this.tableStyle = value;
    }

    get SortStyle(): SortStyle {
        return this.sortStyle;
    }

    set SortStyle(value: SortStyle) {
        this.sortStyle = value;
    }

    get DataFields(): DataFieldsType {
        return this.dataFields;
    }

    set DataFields(value: DataFieldsType) {
        this.dataFields = value;
    }

    get DataItems(): DataItemsType {
        return this.dataItems;
    }

    set DataItems(value: DataItemsType) {
        this.dataItems = value;
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
    }

    get CurrentPage(): number {
        return this.currentPage;
    }

    set CurrentPage(value: number) {
        this.currentPage = value;
    }

    get SearchKey(): string {
        return this.searchKey;
    }

    set SearchKey(value: string) {
        this.searchKey = value;
    }

    get DataTotal(): number {
        return this.dataTotal;
    }

    set DataTotal(value: number) {
        this.dataTotal = value;
        // set in the affected components (pageNav,...)??
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
        return this.dataItems.length;
    }

    get DataFieldsCount() {
        return this.DataFields.length;
    }

    get RecordTotal() {
        return this.dataTotal ? this.dataTotal : this.DataItemsCount;
    }

    get InitialDataTotal(): number {
        return this.RecordTotal
    }

    set InitialDataTotal(value: number) {
        this.initialDataTotal = this.RecordTotal;
    }

    get PermittedEvents(): Array<string>{
        return this.permittedEvents;
    }

    set PermittedEvents(value: Array<string>) {
        this.permittedEvents = value;
    }
}

// constructor/instance function
function dtStore(options = {}) {
    return new DtStore();
}

// singleton
const dtstore = dtStore();

export { DtStore, dtStore, dtstore };
