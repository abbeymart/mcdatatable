/**
 * @Author: abbeymart | Abi Akindele | @Created: 2019-06-18 | @Updated: 2019-07-02
 * @Company: mConnect.biz | @License: MIT
 * @Description: mc-table-body, for data rows, must match table-header (count/responsive style)
 */

import mcTableTemplate from './templates/TableTemplate';
import TableHelper from './templates/TableHelpers';
import {DataFieldType, DataFieldsType, DataItemsType, DOMType, TablePropsType, TableStyle} from "./types";
import {dtstore} from "./store/DtStore";
import {sortBy} from "lodash";

class McTable extends HTMLElement {
    #pagePosition: string = 'first-page';
    #pageNum: number = 1;
    #sortAsc: boolean = false;
    #sortDesc: boolean = false;
    #itemsIds: string[] = [];
    #DOM: DOMType = {};

    constructor() {
        super()
        // attributes
        this.renderComponent();
    }

    static get observedAttributes() {
        return ['datafields', 'dataitems', 'pagelimit', 'currentpage', 'searchkey'];
    }

    attributeChangedCallback(name: string, oldVal: any, newValue: any) {
        if (oldVal === newValue) {
            return;
        }
        this.renderComponent();
    }

    renderComponent() {
        const props: TablePropsType = {
            tableFields: dtstore.dataFields,
            tableItems: dtstore.dataItems,
            tableRecords: this.tableRecords(),
            tableStyle: dtstore.tableStyle,
            sortStyleAsc: this.sortStyleAsc(),
            sortStyleDesc: this.sortStyleDesc(),
        }
        this.innerHTML = mcTableTemplate(props);

        // event's handlers
        this.#DOM = TableHelper.getPageNavDOM(this.ownerDocument);

        // handle / emit events
        const mcTableHeader = document.getElementsByClassName('mc-table-header');
        if (mcTableHeader && mcTableHeader.length > 0) {
            // @ts-ignore
            for (let colDom of mcTableHeader) {
                colDom.onclick = (e: any) => {
                    e.preventDefault();
                    // capture header-column data value
                    const fieldValue = e.target.getAttribute('data-mc-table-header-field');
                    // emit event, for other sub-components
                    e.target.itemType = 'table-header-column';
                    // e.target.itemValue = parseInt(currentPageNum);
                    McTable.emitTableHeaderEvent(e);
                    // perform page-action
                    if (fieldValue && typeof fieldValue === 'string') {
                        (async () => await this.sortDataByField(JSON.parse(fieldValue)))();
                    }
                };
            }
        }
    }

    // getters and setters
    get sortAsc(): boolean {
        return this.#sortAsc;
    }

    set sortAsc(value: boolean) {
        this.#sortAsc = value;
    }

    get sortDesc(): boolean {
        return this.#sortDesc;
    }

    set sortDesc(value: boolean) {
        this.#sortDesc = value;
    }

    get datafields(): DataFieldsType {
        return [];
    }

    set datafields(value: DataFieldsType) {
        this.setAttribute('datafields', 'new-data-fields');
    }

    get dataitems(): DataItemsType {
        return [];
    }

    set dataitems(value: DataItemsType) {
        this.setAttribute('dataitems', 'new-data-items');
    }

    get searchkey() {
        return this.getAttribute('searchkey');
    }

    set searchkey(value) {
        this.setAttribute('searchkey', 'new-search-value');
    }

    get pagelimit(): number {
        return dtstore.pageLimit;
    }

    set pagelimit(value: number) {
        this.setAttribute('pagelimit', 'new-page-limit');
    }

    get currentpage(): number {
        return 1;
    }

    set currentpage(value: number) {
        this.setAttribute('currentpage', 'new-current-page');
    }

    // computed values (getters)
    dataFields() {
        return this.$store.getters['mcDataTable/getDataFields'];
    }

    dataItemsStore() {
        return this.$store.getters['mcDataTable/getDataItems'];
    }

    dataItems() {
        // transform data-items for complete table-items search
        // console.log('data-items: ', this.dataItemsValue);
        return this.dataItemsStore.map(item => {
            // clone the item
            let itemInfo = Object.assign({}, item);
            this.tableFields.forEach(field => {
                if (field.source.type && field.source.type === 'provider') {
                    if (field.source.params) {
                        let fieldParams;
                        const fieldSourceParams = field.source.params;
                        if (fieldSourceParams && Array.isArray(fieldSourceParams) && fieldSourceParams.length > 0) {
                            if (fieldSourceParams.includes('all') || fieldSourceParams.includes('item')) {
                                fieldParams = item;
                            } else {
                                fieldParams = fieldSourceParams.map(param => item[param]).join(', ');
                            }
                        }
                        if (field.source.transform && typeof field.source.transform === 'function') {
                            itemInfo[field.name] = field.source.transform(fieldParams);
                        }
                    } else if (field.source.transform && typeof field.source.transform === 'function') {
                        itemInfo[field.name] = field.source.transform(itemInfo[field.name]);
                    }
                }
            });
            return itemInfo;
        });
    }

    pageStart() {
        return this.$store.getters['mcDataTable/getPageStart'];
    }

    sortStyle() {
        return this.$store.getters['mcDataTable/getSortStyle'];
    }

    tableStyle() {
        return this.$store.getters['mcDataTable/getTableStyle'];
    }

    pageLimit() {
        return this.$store.getters['mcDataTable/getPageLimit'];
    }

    currentPage() {
        return this.$store.getters['mcDataTable/getCurrentPage'];
    }

    itemTotal() {
        return this.dataItems.length;
    }

    sortStyleAsc() {
        return this.sortAsc ? `${this.sortStyle.asc} mc-table-sort-style` : `${this.sortStyle.asc}`;
    }

    sortStyleDesc() {
        return this.sortDesc ? `${this.sortStyle.desc} mc-table-sort-style` : `${this.sortStyle.desc}`;
    }

    tableFields() {
        return this.$lo.sortBy(this.dataFields, ['order']);
    }

    dataItemsSearch() {
        // search data-items by search-key
        // const searchKey = this.$store.getters['mcDataTable/getSearchKey'];
        const itemKeys = this.dataFields.map(item => item.name);
        return this.dataItems.filter(item => itemKeys.some(key => {
                return item[key] ? item[key].toString().toLowerCase().includes(this.$store.getters['mcDataTable/getSearchKey'].toString().toLowerCase()) : false;
            }
        ));
    }

    tableItems() {
        // determine tableData for the currentPage by pageLimit
        let tableData = [];

        // scenarios for calculating tableData for the currentPage  >> mcTableBody
        const dataSize = this.dataItemsSearch.length;
        // 1. if dataSize <= pageLimit: display all items for the currentPage(1)
        if (dataSize <= this.pageLimit) {
            tableData = this.dataItemsSearch;
        }
        // update dataTotal store-value
        this.$store.dispatch('mcDataTable/setDataTotal', dataSize);

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

    tableRecords() {
        try {
            // transform table-items, by data-fields
            return this.tableItems.map(item => {
                let itemInfo = Object.assign({}, item);
                // initialise the itemInfo fieldsInfo
                itemInfo ['fieldsInfo'] = [];
                // sort by table-field order
                this.tableFields.forEach((field) => {
                    // compose the table field/column
                    // column/field value
                    let fieldSource = field.source,
                        fieldName = field.name,
                        fieldType = field.source.type,
                        fieldTask = '',
                        fieldParams = '',
                        fieldLabel = field['label'],
                        fieldValue = 'N/A';

                    if (fieldType === 'provider') {
                        // field-value already transformed from dataItems computed values
                        fieldValue = item[fieldName];
                    } else {
                        fieldTask = field.source.task ? field.source.task : '';
                        const fieldSourceParams = field.source.params;
                        if (fieldSourceParams && Array.isArray(fieldSourceParams) && fieldSourceParams.length > 0) {
                            if (fieldSourceParams.includes('all') || fieldSourceParams.includes('item')) {
                                fieldParams = item;
                            } else {
                                fieldParams = fieldSourceParams.map(param => item[param]).join(', ');
                            }
                        }
                    }

                    itemInfo ['fieldsInfo'].push({
                        fieldValue: fieldValue,
                        fieldSource: fieldSource,
                        fieldType: fieldType,
                        fieldName: fieldName,
                        fieldTask: fieldTask,
                        fieldParams: fieldParams,
                        fieldLabel: fieldLabel,
                    });
                });

                return itemInfo;
            });

        } catch (e) {
            console.log('error rendering table: ', e.message);
            return [];
        }
    }

    // methods
    async sortDataByField(field: DataFieldType) {
        // toggle sort order, for dataItems
        if (field.sort) {
            if (this.sortAsc) {
                // sort in descending order
                const dataItems = dtstore.dataItems;
                dtstore.dataItems = sortBy(dataItems, [field.name]).reverse();
                this.sortAsc = false;
                this.sortDesc = true;
            } else {
                // sort in ascending order
                const dataItems = dtstore.dataItems;
                dtstore.dataItems = sortBy(dataItems, [field.name]);
                // this.tableItems = this.$lo.sortBy(this.tableItems, [fieldName]);
                this.sortAsc = true;
                this.sortDesc = false;
            }
        }
    }

    disconnectedCallback() {
        // cleanup - reset DOM, removeEventLister(s), garbage collection...
        this.innerHTML = '';
    }

    // events emitter
    static emitTableEvent(e: any) {
        e.preventDefault();
        // emit itemType event | or use observable
        const compItemChange = new CustomEvent(e.target.itemType, {
            bubbles: true,
            cancelable: true,
            detail: {type: e.target.itemType, value: e.target.itemValue}
        });
        e.target.dispatchEvent(compItemChange);
    }

    // @ts-ignore
    static emitTableHeaderEvent(e) {
        e.preventDefault();
        const itemPath = e.target.getAttribute('data-app-top-menu-path');
        const itemTitle = e.target.getAttribute('data-app-top-menu-title');

        // emit 'mc-top-menu-change' event | or use observable
        const appMenuChange = new CustomEvent('mc-top-menu-change', {
            bubbles: true,
            cancelable: true,
            detail: {path: itemPath, title: itemTitle}
        });
        e.target.dispatchEvent(appMenuChange);
    }

    // events handler

}

let mcTable;

if (!customElements.get('mc-table')) {
    mcTable = customElements.define('mc-table', McTable);
}

export default mcTable;
