/**
 * @Author: abbeymart | Abi Akindele | @Created: 2019-06-18 | @Updated: 2019-07-02
 * @Company: mConnect.biz | @License: MIT
 * @Description: mc-table-body, for data rows, must match table-header (count/responsive style)
 */

import TableTemplate from "./templates/TableTemplate";
import TableHelper from "./templates/TableHelpers";
import {
    DataFieldType,
    DataFieldsType,
    DataItemsType,
    DOMType,
    TablePropsType,
    TableStyle,
    ItemValueType, EventType
} from "./types";
import { dtstore } from "./store/DtStore";
import { sortBy } from "lodash";

class McTable extends HTMLElement {
    constructor() {
        super()
        // attributes
        this.renderComponent();
    }

    renderComponent() {
        const props: TablePropsType = {
            tableFields  : dtstore.DataFields,
            tableItems   : dtstore.DataItems,
            tableRecords : this.TableRecords,
            tableStyle   : dtstore.TableStyle,
            sortStyleAsc : this.SortStyleAsc,
            sortStyleDesc: this.SortStyleDesc,
        }
        this.innerHTML = TableTemplate(props);
        // handle / emit events
    }

    // computed values (getters)
    get SortAsc(): boolean {
        return dtstore.SortAsc;
    }

    set SortAsc(value: boolean) {
        dtstore.SortAsc = value;
    }

    get SortDesc(): boolean {
        return dtstore.SortDesc;
    }

    set SortDesc(value: boolean) {
        dtstore.SortDesc = value;
    }

    get SearchKey(): string {
        return dtstore.SearchKey;
    }

    get PageStart(): number {
        return dtstore.PageStart;
    }

    get PageLimit(): number {
        return dtstore.PageLimit;
    }

    get DataFields(): DataFieldsType {
        return dtstore.DataFields;
    }

    get DataItems(): DataItemsType {
        return dtstore.DataItems;
    }

    set DataItems(value: DataItemsType) {
        dtstore.DataItems = value;
    }

    set DataTotal(value: number) {
        dtstore.DataTotal = value;
    }

    get dataItems() {
        // transform data-items for complete table-items search
        // console.log("data-items: ", this.dataItemsValue);
        return this.DataItemsStore.map(item => {
            // clone the item
            let itemInfo = Object.assign({}, item);
            this.TableFields.forEach(field => {
                if (field.source.type && field.source.type === "provider") {
                    if (field.source.params) {
                        let fieldParams;
                        const fieldSourceParams = field.source.params;
                        if (fieldSourceParams && Array.isArray(fieldSourceParams) && fieldSourceParams.length > 0) {
                            if (fieldSourceParams.includes("all") || fieldSourceParams.includes("item")) {
                                fieldParams = item;
                            } else {
                                fieldParams = fieldSourceParams.map(param => item[param]).join(", ");
                            }
                        }
                        if (field.source.transform && typeof field.source.transform === "function") {
                            itemInfo[field.name] = field.source.transform(fieldParams);
                        }
                    } else if (field.source.transform && typeof field.source.transform === "function") {
                        itemInfo[field.name] = field.source.transform(itemInfo[field.name]);
                    }
                }
            });
            return itemInfo;
        });
    }

    get SortStyle() {
        return dtstore.SortStyle;
    }

    get TableStyle() {
        return dtstore.TableStyle;
    }

    get SortStyleAsc() {
        return dtstore.SortAsc ? `${dtstore.SortStyle.asc} mc-table-sort-style` : `${dtstore.SortStyle.asc}`;
    }

    get SortStyleDesc(): string {
        return dtstore.SortDesc ? `${dtstore.SortStyle.desc} mc-table-sort-style` : `${dtstore.SortStyle.desc}`;
    }

    get CurrentPage(): number {
        return dtstore.CurrentPage;
    }

    get ItemsTotal(): number {
        return dtstore.DataItems.length;
    }

    get TableFields(): DataFieldsType {
        return sortBy(dtstore.DataFields, ["order"]);
    }

    get DataItemsStore(): DataItemsType {
        return dtstore.DataItems;
    }

    get DataItemsSearch() {
        // search data-items by search-key
        // const searchKey = this.$store.getters["mcDataTable/getSearchKey"];
        const itemKeys = this.DataFields.map(item => item.name);
        return this.DataItems.filter(item => itemKeys.some(key => {
                return item[key] ? item[key].toString().toLowerCase().includes(dtstore.SearchKey.toString().toLowerCase()) : false;
            }
        ));
    }

    get TableItems(): DataItemsType {
        // determine tableData for the currentPage by pageLimit
        let tableData: DataItemsType = [];

        // scenarios for calculating tableData for the currentPage  >> mcTableBody
        const dataSize = this.DataItemsSearch.length;
        // 1. if dataSize <= pageLimit: display all items for the currentPage(1)
        if (dataSize <= this.PageLimit) {
            tableData = this.DataItemsSearch;
        }
        // update dataTotal store-value
        this.DataTotal = dataSize
        // this.$store.dispatch("mcDataTable/setDataTotal", dataSize);

        // 2. if dataSize > pageLimit:
        if (dataSize > this.PageLimit) {
            // currentPage === 1
            if (this.CurrentPage === 1) {
                // slice records from the start of currentPage up to pageLimit
                tableData = this.DataItemsSearch.slice(0, this.PageLimit)
            }
            // dataSize is less than the total records up to the end of the currentPage
            else if (dataSize <= this.CurrentPage * this.PageLimit) {
                // slice records from the start of the currentPage to end of dataItems
                tableData = this.DataItemsSearch.slice(((this.CurrentPage - 1) * this.PageLimit));
            } else {
                // slice records from the start of the currentPage to end of currentPage
                tableData = this.DataItemsSearch.slice(((this.CurrentPage - 1) * this.PageLimit), (this.CurrentPage * this.PageLimit));
            }
        }
        return tableData;
    }

    get TableRecords(): DataItemsType {
        try {
            // transform table-items, by data-fields
            return this.TableItems.map(item => {
                let itemInfo = Object.assign({}, item);
                // initialise the itemInfo fieldsInfo
                itemInfo ["fieldsInfo"] = [];
                // sort by table-field order
                this.TableFields.forEach((field) => {
                    // compose the table field/column
                    // column/field value
                    let fieldSource = field.source,
                        fieldName = field.name,
                        fieldType = field.source.type,
                        fieldTask = null,
                        fieldParams = null,
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

    // methods
    async sortDataByField(field: DataFieldType) {
        // toggle sort order, for dataItems
        if (field.sort) {
            if (this.SortAsc) {
                // sort in descending order
                const dataItems = dtstore.DataItems;
                dtstore.DataItems = sortBy(dataItems, [field.name]).reverse();
                this.SortAsc = false;
                this.SortDesc = true;
            } else {
                // sort in ascending order
                const dataItems = dtstore.DataItems;
                dtstore.DataItems = sortBy(dataItems, [field.name]);
                // this.tableItems = this.$lo.sortBy(this.tableItems, [fieldName]);
                this.SortAsc = true;
                this.SortDesc = false;
            }
        }
    }

    // TODO: events implementation for item/record-fields
    async eventAction(item: ItemValueType, fieldEvents: Array<EventType>) {
        let eventsTask = ""
        if (fieldEvents && fieldEvents.length > 0) {
            let fieldParams: ItemValueType | string = {}
            fieldEvents.forEach(ev => {
                switch (ev.type) {
                    case "click":
                        // params
                        if (ev.params && Array.isArray(ev.params) && ev.params.length > 0) {
                            if (ev.params.includes("all") || ev.params.includes("item")) {
                                fieldParams = item
                            } else {
                                fieldParams = ev.params.map(param => item[param]).join(", ");
                            }
                        }
                        eventsTask += `click=${ev.task? ev.task(fieldParams) : null} `
                        break
                    case "change":
                        if (ev.params && Array.isArray(ev.params) && ev.params.length > 0) {
                            if (ev.params.includes("all") || ev.params.includes("item")) {
                                fieldParams = item
                            } else {
                                fieldParams = ev.params.map(param => item[param]).join(", ");
                            }
                        }
                        eventsTask += `change=${ev.task? ev.task(fieldParams) : null} `
                        break
                    case "mouseover":
                        if (ev.params && Array.isArray(ev.params) && ev.params.length > 0) {
                            if (ev.params.includes("all") || ev.params.includes("item")) {
                                fieldParams = item
                            } else {
                                fieldParams = ev.params.map(param => item[param]).join(", ");
                            }
                        }
                        eventsTask += `mouseover=${ev.task? ev.task(fieldParams) : null} `
                        break
                    default:
                        break
                }
            })
        }
        return eventsTask
    }


    // events emitter
    static emitTableEvent(e: any) {
        e.preventDefault();
        // emit itemType event | or use observable
        const compItemChange = new CustomEvent(e.target.itemType, {
            bubbles   : true,
            cancelable: true,
            detail    : {type: e.target.itemType, value: e.target.itemValue}
        });
        e.target.dispatchEvent(compItemChange);
    }

    // @ts-ignore
    static emitTableHeaderEvent(e) {
        e.preventDefault();
        const itemPath = e.target.getAttribute("data-app-top-menu-path");
        const itemTitle = e.target.getAttribute("data-app-top-menu-title");

        // emit "mc-top-menu-change" event | or use observable
        const appMenuChange = new CustomEvent("mc-top-menu-change", {
            bubbles   : true,
            cancelable: true,
            detail    : {path: itemPath, title: itemTitle}
        });
        e.target.dispatchEvent(appMenuChange);
    }


    disconnectedCallback() {
        // cleanup - reset DOM, removeEventLister(s), garbage collection...
        this.innerHTML = "";
    }

}

let mcTable;

if (!customElements.get("mc-table")) {
    mcTable = customElements.define("mc-table", McTable);
}

export default mcTable;
