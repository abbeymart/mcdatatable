/**
 * @Author: abbeymart | Abi Akindele | @Created: 2019-06-18 | @Updated: 2019-07-02
 * @Company: mConnect.biz | @License: MIT
 * @Description: mc-table-body, for data rows, must match table-header (count/responsive style)
 */

import TableTemplate from "./templates/TableTemplate";
import {
    DataFieldType, DataFieldsType, DataItemsType,
    TablePropsType, TableStyle, SortStyle,
} from "./types";
import { dtstore } from "./dtStore";
import { sortBy } from "lodash";

class McTable extends HTMLElement {
    protected itemIds: Set<string>;
    // protected sortAsc: boolean;
    // protected sortDesc: boolean;

    constructor() {
        super()
        // attributes
        this.itemIds = new Set<string>();
        this.renderComponent();
    }

    static get observedAttributes() {
        return ["currentpage", "pagelimit", "tablestyle", "sortstyle",
            "searchkey", "dataitems", "datafields"];
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

    renderComponent(props: TablePropsType = {
        tableFields  : this.dataFields,
        tableItems   : this.dataItems,
        tableRecords : this.tableRecords,
        tableStyle   : this.tableStyle,
        sortStyleAsc : this.sortStyleAsc,
        sortStyleDesc: this.sortStyleDesc,
    }) {
        this.innerHTML = TableTemplate(props);
        // handle / emit events
        // select-checkbox action
        const tableCheckboxDom: any = document.getElementsByClassName("mc-table-checkbox");
        if (tableCheckboxDom && tableCheckboxDom.length > 0) {
            for (const domItem of tableCheckboxDom) {
                domItem.onchange = (e: any) => {
                    e.preventDefault();
                    const domItemValue = e.target.getAttribute("data-input-value");
                    if (domItem.checked) {
                        // add itemId to the itemIds set
                        this.itemIds.add(domItemValue);
                    } else {
                        // if itemId exists, remove from itemIds set
                        if (this.itemIds.has(domItemValue)) {
                            this.itemIds.delete(domItemValue);
                        }
                    }
                    // get fieldTask from tableFields, by itemFieldName
                    const itemFieldName = e.target.getAttribute("data-input-field");
                    const itemField = props.tableFields.find(it => it.name === itemFieldName)
                    const itemFunc = itemField?.source.task;
                    if (itemFunc && typeof itemFunc === "function") {
                        itemFunc(Array.from(this.itemIds));     // convert set to array: Array.from() or ...spread?
                    } else {
                        throw  new Error("undefined task-function");
                    }
                }
            }
        }

        // update action
        const tableUpdateDom: any = document.getElementsByClassName("mc-table-update");
        if (tableUpdateDom && tableUpdateDom.length > 0) {
            for (const domItem of tableUpdateDom) {
                domItem.onclick = (e: any) => {
                    e.preventDefault();
                    const domItemValue = JSON.parse(e.target.getAttribute("data-update-item"));
                    // get fieldTask from tableFields, by fieldName (update)
                    const itemFieldName = e.target.getAttribute("data-update-field");
                    const itemField = props.tableFields.find(it => it.name === itemFieldName)
                    const itemFunc = itemField?.source.task;
                    if (itemFunc && typeof itemFunc === "function") {
                        itemFunc(domItemValue);
                    } else {
                        throw  new Error("undefined task-function");
                    }
                }
            }
        }

        // delete action
        const tableDeleteDom: any = document.getElementsByClassName("mc-table-delete");
        if (tableDeleteDom && tableDeleteDom.length > 0) {
            for (const domItem of tableUpdateDom) {
                domItem.onclick = (e: any) => {
                    e.preventDefault();
                    const domItemValue = e.target.getAttribute("data-delete-itemid");
                    // get fieldTask from tableFields, by fieldName(delete)
                    const itemFieldName = e.target.getAttribute("data-delete-field");
                    const itemField = props.tableFields.find(it => it.name === itemFieldName)
                    const itemFunc = itemField?.source.task;
                    if (itemFunc && typeof itemFunc === "function") {
                        itemFunc(domItemValue);
                    } else {
                        throw  new Error("undefined task-function");
                    }
                }
            }
        }

        // custom actions by field-specs
        const tableEventDom: any = document.getElementsByClassName("mc-table-event");
        if (tableEventDom && tableEventDom.length > 0) {
            for (const domItem of tableEventDom) {
                const domItemValue = JSON.parse(domItem.getAttribute("data-event-value"));
                const domItemField = domItem.getAttribute("data-event-field");
                const itemField = props.tableFields.find(it => it.name === domItemField)
                const fieldEvents = itemField?.events;
                if (fieldEvents && fieldEvents.length > 0) {
                    let fieldParams = ""
                    for (const ev of fieldEvents) {
                        // check permitted events
                        if (!dtstore.PermittedEvents.includes(ev.type)) {
                            continue;
                        }
                        // params
                        if (ev.params && Array.isArray(ev.params) && ev.params.length > 0) {
                            if (ev.params.includes("all") || ev.params.includes("item")) {
                                fieldParams = domItemValue
                            } else {
                                fieldParams = ev.params.map(param => domItemValue[param]).join(", ");
                            }
                        }
                        // activate field-events
                        switch (ev.type) {
                            case "click":
                                domItem.onclick = (e: any) => {
                                    e.preventDefault();
                                    const itemFunc = ev.task;
                                    if (itemFunc && typeof itemFunc === "function") {
                                        itemFunc(fieldParams);
                                    } else {
                                        throw  new Error(`undefined task-function for event-type: ${ev.type}`);
                                    }
                                }
                                break
                            case "change":
                                domItem.onchange = (e: any) => {
                                    e.preventDefault();
                                    if (ev.task && typeof ev.task === "function") {
                                        ev.task(fieldParams);
                                    } else {
                                        throw  new Error(`undefined task-function for event-type: ${ev.type}`);
                                    }
                                }
                                break
                            case "keyup":
                                domItem.onkeyup = (e: any) => {
                                    e.preventDefault();
                                    if (ev.task && typeof ev.task === "function") {
                                        ev.task(fieldParams);
                                    } else {
                                        throw  new Error(`undefined task-function for event-type: ${ev.type}`);
                                    }
                                }
                                break
                            case "keydown":
                                domItem.onkeydown = (e: any) => {
                                    e.preventDefault();
                                    if (ev.task && typeof ev.task === "function") {
                                        ev.task(fieldParams);
                                    } else {
                                        throw  new Error(`undefined task-function for event-type: ${ev.type}`);
                                    }
                                }
                                break
                            case "mouseover":
                                domItem.onmouseover = (e: any) => {
                                    e.preventDefault();
                                    if (ev.task && typeof ev.task === "function") {
                                        ev.task(fieldParams);
                                    } else {
                                        throw  new Error(`undefined task-function for event-type: ${ev.type}`);
                                    }
                                }
                                break;
                            case "mouseleave":
                                domItem.onmouseleave = (e: any) => {
                                    e.preventDefault();
                                    if (ev.task && typeof ev.task === "function") {
                                        ev.task(fieldParams);
                                    } else {
                                        throw  new Error(`undefined task-function for event-type: ${ev.type}`);
                                    }
                                }
                                break;
                            case "mouseenter":
                                domItem.onmouseenter = (e: any) => {
                                    e.preventDefault();
                                    if (ev.task && typeof ev.task === "function") {
                                        ev.task(fieldParams);
                                    } else {
                                        throw  new Error(`undefined task-function for event-type: ${ev.type}`);
                                    }
                                }
                                break;
                            default:
                                throw  new Error(`unsupported event-type: ${ev.type}`);
                        }
                    }
                }
            }
        }
    }

    // computed values (getters)
    get sortAsc(): boolean {
        return dtstore.SortAsc;
    }

    set sortAsc(value: boolean) {
        dtstore.SortAsc = value;
    }

    get sortDesc(): boolean {
        return dtstore.SortDesc;
    }

    set sortDesc(value: boolean) {
        dtstore.SortDesc = value;
    }

    get searchKey(): string {
        return dtstore.SearchKey;
    }

    set searchKey(value: string) {
        this.setAttribute("searchkey", value);
    }

    get pageStart(): number {
        return dtstore.PageStart;
    }

    get pageLimit(): number {
        return dtstore.PageLimit;
    }

    set pageLimit(value: number) {
        this.setAttribute("pagelimit", value.toString());
    }

    get dataFields(): DataFieldsType {
        return dtstore.DataFields;
    }

    set dataFields(value: DataFieldsType) {
        this.setAttribute("datafields", JSON.stringify(value));
    }

    get dataItems(): DataItemsType {
        return dtstore.DataItems;
    }

    set dataItems(value: DataItemsType) {
        this.setAttribute("dataitems", "new-dataitems");
    }

    set dataTotal(value: number) {
        dtstore.DataTotal = value;
    }

    get tableDataItems() {
        // transform data-items for complete table-items search
        // console.log("data-items: ", this.dataItemsValue);
        return this.dataItemsStore.map(item => {
            // clone the item
            let itemInfo = Object.assign({}, item);
            this.tableFields.forEach(field => {
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

    get sortStyle() {
        return dtstore.SortStyle;
    }

    set sortStyle(value: SortStyle) {
        this.setAttribute("sortstyle", JSON.stringify(value));
    }

    get tableStyle() {
        return dtstore.TableStyle;
    }

    set tableStyle(value: TableStyle) {
        this.setAttribute("tablestyle", JSON.stringify(value));
    }

    get sortStyleAsc() {
        return dtstore.SortAsc ? `${dtstore.SortStyle.asc} mc-table-sort-style` : `${dtstore.SortStyle.asc}`;
    }

    get sortStyleDesc(): string {
        return dtstore.SortDesc ? `${dtstore.SortStyle.desc} mc-table-sort-style` : `${dtstore.SortStyle.desc}`;
    }

    get currentPage(): number {
        return dtstore.CurrentPage;
    }

    set currentPage(value: number) {
        this.setAttribute("currentpage", value.toString());
    }

    get itemsTotal(): number {
        return dtstore.DataItems.length;
    }

    get tableFields(): DataFieldsType {
        return sortBy(dtstore.DataFields, ["order"]);
    }

    get dataItemsStore(): DataItemsType {
        return dtstore.DataItems;
    }

    get dataItemsSearch() {
        // search data-items by search-key
        const itemKeys = this.dataFields.map(item => item.name);
        return this.dataItems.filter(item => itemKeys.some(key => {
                return item[key] ? item[key].toString().toLowerCase().includes(this.searchKey.toString().toLowerCase()) : false;
            }
        ));
    }

    get tableItems(): DataItemsType {
        // determine tableData for the currentPage by pageLimit
        let tableData: DataItemsType = [];

        // scenarios for calculating tableData for the currentPage  >> mcTableBody
        const dataSize = this.dataItemsSearch.length;
        // 1. if dataSize <= pageLimit: display all items for the currentPage(1)
        if (dataSize <= this.pageLimit) {
            tableData = this.dataItemsSearch;
        }
        // update dataTotal store-value
        this.dataTotal = dataSize
        // this.$store.dispatch("mcDataTable/setDataTotal", dataSize);

        // 2. if dataSize > pageLimit:
        if (dataSize > this.pageLimit) {
            // currentPage === 1
            if (this.currentPage === 1) {
                // slice records from the start of currentPage up to pageLimit
                tableData = this.dataItemsSearch.slice(0, this.pageLimit)
            }
            // dataSize is less than the total records up to the end of the currentPage
            else if (dataSize <= this.currentPage * this.pageLimit) {
                // slice records from the start of the currentPage to end of dataItems
                tableData = this.dataItemsSearch.slice(((this.currentPage - 1) * this.pageLimit));
            } else {
                // slice records from the start of the currentPage to end of currentPage
                tableData = this.dataItemsSearch.slice(((this.currentPage - 1) * this.pageLimit), (this.currentPage * this.pageLimit));
            }
        }
        return tableData;
    }

    get tableRecords(): DataItemsType {
        try {
            // transform table-items, by data-fields
            return this.tableItems.map(item => {
                let itemInfo = Object.assign({}, item);
                // initialise the itemInfo fieldsInfo
                itemInfo ["fieldsInfo"] = [];
                // sort by table-field order
                this.tableFields.forEach((field) => {
                    // compose the table field/column
                    // column/field value
                    let fieldSource = field.source,
                        fieldName = field.name,
                        fieldType = field.source.type,
                        fieldTask,
                        fieldParams,
                        fieldLabel = field["label"],
                        fieldValue = "N/A";

                    if (fieldType === "provider") {
                        // field-value already transformed from dataItems computed values
                        fieldValue = item[fieldName];
                    } else {
                        fieldTask = field.source.task ? field.source.task : null;
                        const fieldSourceParams = field.source.params;
                        if (fieldSourceParams && Array.isArray(fieldSourceParams) && fieldSourceParams.length > 0) {
                            if (fieldSourceParams.includes("all") || fieldSourceParams.includes("item")) {
                                fieldParams = item;
                            } else {
                                fieldParams = fieldSourceParams.map(param => item[param]).join(", ");
                            }
                        }
                    }

                    itemInfo ["fieldsInfo"]?.push({
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
            if (this.sortAsc) {
                // sort in descending order
                const dataItems = dtstore.DataItems;
                dtstore.DataItems = sortBy(dataItems, [field.name]).reverse();
                this.sortAsc = false;
                this.sortDesc = true;
            } else {
                // sort in ascending order
                const dataItems = dtstore.DataItems;
                dtstore.DataItems = sortBy(dataItems, [field.name]);
                // this.tableItems = this.$lo.sortBy(this.tableItems, [fieldName]);
                this.sortAsc = true;
                this.sortDesc = false;
            }
        }
    }

    disconnectedCallback() {
        // cleanup - reset DOM, removeEventLister(s), garbage collection...
        this.innerHTML = "";
    }

}

if (!customElements.get("mc-table")) {
    customElements.define("mc-table", McTable);
}
