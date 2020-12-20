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
import { Observable, Subscriber } from "rxjs";

//  constants | defaults
const PageLimit = 10,
    CurrentPage = 1,
    DataFields = [],
    DataItems = [],
    DataTotal = 0,
    InitialDataTotal = 0,
    Paging = true,
    PageStart = 1,
    PagePosition = "first-page",
    PageLimits = [10, 20, 30, 50, 100, 200],
    TableStyle = {
        table      : "w3-table w3-striped w3-border w3-hoverable",
        tableHeader: "w3-red",
        tableBody  : "w3-hover w3-hover-grey",
    },
    SortStyle = {
        asc : "fa fa-caret-up",
        desc: "fa fa-caret-down",
    },
    SearchKey = "",
    SortAsc = false,
    SortDesc = false;

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
    // other props
    // protected activeLabel: string;
    // protected deleteLabel: string;
    // protected updateLabel: string;
    // protected itemId: string;
    // protected itemData: ItemValueType;

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

    // component methods: computed, event-based etc. => used within web-components
    sortStyleAsc() {
        return this.sortAsc ? `${this.sortStyle.asc} mc-table-sort-style` : `${this.sortStyle.asc}`;
    }

    sortStyleDesc() {
        return this.sortDesc ? `${this.sortStyle.desc} mc-table-sort-style` : `${this.sortStyle.desc}`;
    }

    tableFields() {
        return sortBy(this.dataFields, ["order"]);
    }

    dataItemsSearch(): object[] {
        // search data-items by search-key
        const itemKeys = this.dataFields.map(item => item.name);
        return this.dataItems.filter(item => itemKeys.some(key => {
                // @ts-ignore
                return item[key] ? item[key].toString().toLowerCase().includes(this.searchKey.toString().toLowerCase()) : false;
            }
        ));
    }

    tableItems(): object[] {
        // determine tableData for the currentPage by pageLimit
        let tableData = [];

        // scenarios for calculating tableData for the currentPage  >> mcTableBody
        const dataSize = this.dataItemsSearch.length;
        // 1. if dataSize <= pageLimit: display all items for the currentPage(1)
        if (dataSize <= this.pageLimit) {
            // @ts-ignore
            tableData = this.dataItemsSearch;
        }
        // update dataTotal store-value
        this.dataTotal = dataSize;
        // this.$store.dispatch("mcDataTable/setDataTotal", dataSize);

        // 2. if dataSize > pageLimit:
        if (dataSize > this.pageLimit) {
            // currentPage === 1
            if (this.currentPage === 1) {
                // slice records from the start of currentPage up to pageLimit
                // @ts-ignore
                tableData = this.dataItemsSearch.slice(0, this.pageLimit)
            }
            // dataSize is less than the total records up to the end of the currentPage
            else if (dataSize <= this.currentPage * this.pageLimit) {
                // slice records from the start of the currentPage to end of dataItems
                // @ts-ignore
                tableData = this.dataItemsSearch.slice(((this.currentPage - 1) * this.pageLimit));
            } else {
                // slice records from the start of the currentPage to end of currentPage
                // @ts-ignore
                tableData = this.dataItemsSearch.slice(((this.currentPage - 1) * this.pageLimit), (this.currentPage * this.pageLimit));
            }
        }
        return tableData;
    }

    tableRecords() {
        try {
            // transform table-items, by data-fields
            // @ts-ignore
            return this.tableItems.map(item => {
                let itemInfo = Object.assign({}, item);
                // initialise the itemInfo fieldsInfo
                itemInfo ["fieldsInfo"] = [];
                // sort by table-field order
                // @ts-ignore
                this.tableFields.forEach((field) => {
                    // compose the table field/column
                    // column/field value
                    let fieldSource = field.source,
                        fieldName = field.name,
                        fieldType = field.source.type,
                        fieldTask = "",
                        fieldParams = "",
                        fieldLabel = field["label"],
                        fieldValue = "N/A";

                    if (fieldType === "provider") {
                        // field-value already transformed from dataItems computed values
                        fieldValue = item[fieldName];
                    } else {
                        fieldTask = field.source.task ? field.source.task : "";
                        const fieldSourceParams = field.source.params;
                        if (fieldSourceParams && Array.isArray(fieldSourceParams) && fieldSourceParams.length > 0) {
                            if (fieldSourceParams.includes("all") || fieldSourceParams.includes("item")) {
                                fieldParams = item;
                            } else {
                                fieldParams = fieldSourceParams.map(param => item[param]).join(", ");
                            }
                        }
                    }

                    itemInfo ["fieldsInfo"].push({
                        fieldValue : fieldValue,
                        fieldSource: fieldSource,
                        fieldType  : fieldType,
                        fieldName  : fieldName,
                        fieldTask  : fieldTask,
                        fieldParams: fieldParams,
                        fieldLabel : fieldLabel,
                    });
                });

                return itemInfo;
            });

        } catch (e) {
            console.log("error rendering table: ", e.message);
            return [];
        }
    }

    async sortDataByField(field: DataFieldType) {
        // toggle sort order, for dataItems
        if (field.sort) {
            if (this.sortAsc) {
                // sort in descending order
                const dataItems = this.dataItems;
                this.dataItems = sortBy(dataItems, [field.name]).reverse();
                // this.tableItems = this.$lo.sortBy(this.dataItems, [fieldName]).reverse();
                this.sortAsc = false;
                this.sortDesc = true;
            } else {
                // sort in ascending order
                const dataItems = this.dataItems;
                this.dataItems = sortBy(dataItems, [field.name]);
                // this.tableItems = this.$lo.sortBy(this.tableItems, [fieldName]);
                this.sortAsc = true;
                this.sortDesc = false;
            }
        }
    }

    // published observables | to be subscribed-to as required by subscribers (e.g. on event-trigger)
    tableStyleObservable() {
        return new Observable((subscriber: Subscriber<TableStyle>) => {
            try {
                (async () => {
                    subscriber.next(this.tableStyle);
                    subscriber.complete();
                })();
            } catch (e) {
                subscriber.error(e);
            }
        });

    }

    sortStyleObservable() {
        return new Observable((subscriber: Subscriber<SortStyle>) => {
            try {
                (async () => {
                    subscriber.next(this.sortStyle);
                    subscriber.complete();
                })();
            } catch (e) {
                subscriber.error(e);
            }
        });
    }

    dataFieldsObservable() {
        return new Observable((subscriber: Subscriber<object[]>) => {
            try {
                (async () => {
                    subscriber.next(this.dataFields);
                    subscriber.complete();
                })();
            } catch (e) {
                subscriber.error(e);
            }
        });
    }

    dataItemsObservable() {
        return new Observable((subscriber: Subscriber<object[]>) => {
            try {
                (async () => {
                    subscriber.next(this.dataItems);
                    subscriber.complete();
                })();
            } catch (e) {
                subscriber.error(e);
            }
        });
    }

    pagingObservable() {
        return new Observable((subscriber: Subscriber<boolean>) => {
            try {
                (async () => {
                    subscriber.next(this.paging);
                    subscriber.complete();
                })();
            } catch (e) {
                subscriber.error(e);
            }
        });

    }

    pageStartObservable() {
        return new Observable((subscriber: Subscriber<number>) => {
            try {
                (async () => {
                    subscriber.next(this.pageStart);
                    subscriber.complete();
                })();
            } catch (e) {
                subscriber.error(e);
            }
        });
    }

    pageLimitObservable() {
        return new Observable((subscriber: Subscriber<number>) => {
            try {
                (async () => {
                    subscriber.next(this.pageLimit);
                    subscriber.complete();
                })();
            } catch (e) {
                subscriber.error(e);
            }
        });
    }

    pagePositionObservable() {
        return new Observable((subscriber: Subscriber<string>) => {
            try {
                (async () => {
                    subscriber.next(this.pagePosition);
                    subscriber.complete();
                })();
            } catch (e) {
                subscriber.error(e);
            }
        });
    }

    pageLimitsObservable() {
        return new Observable((subscriber: Subscriber<number[]>) => {
            try {
                (async () => {
                    subscriber.next(this.pageLimits);
                    subscriber.complete();
                })();
            } catch (e) {
                subscriber.error(e);
            }
        });
    }

    currentPageObservable() {
        return new Observable((subscriber: Subscriber<number>) => {
            try {
                (async () => {
                    subscriber.next(this.currentPage);
                    subscriber.complete();
                })();
            } catch (e) {
                subscriber.error(e);
            }
        });
    }

    searchKeyObservable() {
        return new Observable((subscriber: Subscriber<string>) => {
            try {
                (async () => {
                    subscriber.next(this.searchKey);
                    subscriber.complete();
                })();
            } catch (e) {
                subscriber.error(e);
            }
        });
    }

    dataTotalObservable() {
        return new Observable((subscriber: Subscriber<number>) => {
            try {
                (async () => {
                    subscriber.next(this.dataTotal);
                    subscriber.complete();
                })();
            } catch (e) {
                subscriber.error(e);
            }
        });
    }

    initialDataTotalObservable() {
        return new Observable((subscriber: Subscriber<number>) => {
            try {
                (async () => {
                    subscriber.next(this.initialDataTotal);
                    subscriber.complete();
                })();
            } catch (e) {
                subscriber.error(e);
            }
        });
    }

    sortAscObservable() {
        return new Observable((subscriber: Subscriber<boolean>) => {
            try {
                (async () => {
                    subscriber.next(this.sortAsc);
                    subscriber.complete();
                })();
            } catch (e) {
                subscriber.error(e);
            }
        });
    }

    sortDescObservable() {
        return new Observable((subscriber: Subscriber<boolean>) => {
            try {
                (async () => {
                    subscriber.next(this.sortDesc);
                    subscriber.complete();
                })();
            } catch (e) {
                subscriber.error(e);
            }
        });
    }
}

// constructor/instance function
function dtStore(options = {}) {
    return new DtStore();
}

// singleton
const dtstore = dtStore();

export { DtStore, dtStore, dtstore };