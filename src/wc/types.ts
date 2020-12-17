/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-06-29 | @Updated: 2020-07-01
 * @Company: mConnect.biz | @License: MIT
 * @Description: datatable types
 */

// export type TaskType = (item?: any) => any;
// export type TaskUpdateType = (item?: object) => any;
// export type TaskDeleteType = (itemId?: string) => any;

export interface ActivePropsType {
    isActive?: boolean;
    activeLabel?: string;
    inActiveLabel?: string;
}

export interface TaskFunctionType {
    (val?: any): any
}

export interface UpdateTaskFunctionType {
    (item: object): any
}

export interface UpdatePropsType {
    itemTask: UpdateTaskFunctionType;
    itemData: object;
    itemLabel?: string;
}

export interface DeleteTaskFunctionType {
    (itemId: string): any
}

export interface DeletePropsType {
    itemTask: DeleteTaskFunctionType;
    itemId: string;
    itemLabel?: string;
}

export type ValueType = string | object | UpdateTaskFunctionType | DeleteTaskFunctionType;

export interface TableStyle {
    table: string;
    tableHeader: string;
    tableBody: string;
}

export interface SortStyle {
    asc: string;
    desc: string;
}

export interface DataTablePropsType {
    dataFields: Array<object>;
    dataItems: Array<object>;
    currentPage: string;
    dataTotal?: number;         // default: 0
    paging?: boolean;           // default: true
    pageStart: number;          // default: 1
    pageLimits?: Array<number>  // default: [10, 20, 30, 50, 100, 200]
    tableStyle?: {
        table: string;      // default: "w3-table w3-striped w3-border w3-bordered w3-hoverable"
        tableHeader: string;    // default: "w3-red"
        tableBody: string;  // default: "w3-hover"
    };
    sortStyle?: {
        asc: string;    // default: "fa fa-caret-up"
        desc: string;   // default: "fa fa-caret-down"
    }
}

export interface DataSourceType {
    type: "provider" | "taskLink";
    task?: TaskFunctionType;        // this.addItemId | deleteItem | updateItem
    params?: string[];
    data?: object[],
    bind?: string[];    // this.itemsIds
    domComp?: boolean,
    transform?: TaskFunctionType;   // shortDesc
}

export interface EventType {
    type: string;
    task?: TaskFunctionType;
    action?: TaskFunctionType;
    params?: string[];
}

export type DataItemsType = Array<object>;

export interface DataFieldType {
    name: string;
    label: string;
    type: string; // "boolean"
    default?: boolean | string | number | object | Array<boolean> | Array<string> | Array<number> | Array<object>;
    order?: number;
    sort?: boolean;
    source: DataSourceType;
    events?: Array<EventType>;
}

export type DataFieldsType = Array<DataFieldType>;

export interface HTMLDataType extends HTMLElement, DataTablePropsType {
    // currentPage: string;
}

export interface DOMType {
    pageMessage?: HTMLDataType | null;
    pageLimit?: HTMLDataType | null;
    pageNav?: HTMLDataType | null;
    tableSearch?: HTMLDataType | null;
    table?: HTMLDataType | null;
    tableMessage?: HTMLDataType | null;
    pageNavFirst?: HTMLDataType | null;
    pageNavNext?: HTMLDataType | null;
    pageNavPrevious?: HTMLDataType | null;
    pageNavLast?: HTMLDataType | null;
    pageNavNumber?: HTMLCollection | null;
    pageLimitValue?: HTMLDataType | null;
    tableContent?: HTMLDataType | null;
    tableHeader?: HTMLDataType | null;
    tableBody?: HTMLDataType | null;
}

export type PageNavValueType = string | number | Array<string>;

export interface PageNavPropsType {
    currentPage: number;
    lastPage: number;
    pageList: string[];
}

export interface TablePropsType {
    tableFields: DataFieldsType;
    tableItems: DataItemsType;
    tableRecords: DataItemsType;
    tableStyle: TableStyle;
    sortStyleAsc: string;
    sortStyleDesc: string;
}

export type PagePositionType = "first-page" | "next-page" | "previous-page" | "last-page" | "page-number";

export type PageNavEventType =
    "page-nav-first"
    | "page-nav-next"
    | "page-nav-previous"
    | "page-nav-last"
    | "page-nav-number";
