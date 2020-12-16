/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-06-29 | @Updated: 2020-07-01
 * @Company: mConnect.biz | @License: MIT
 * @Description: datatable types
 */

export type TaskType = (item?: any) => any;
export type TaskUpdateType = (item?: object) => any;
export type TaskDeleteType = (itemId?: string) => any;
export type ValueType = string | object | TaskUpdateType | TaskDeleteType;

export interface ActivePropsType {
    isActive?: boolean;
    activeLabel?: string;
    inActiveLabel?: string;
}

export interface UpdateTaskFunctionType {
    (val: object): any
}

export interface UpdatePropsType {
    itemTask: UpdateTaskFunctionType;
    itemData: object;
    itemLabel?: string;
}

export interface DeleteTaskFunctionType {
    (val: string): any
}

export interface DeletePropsType {
    itemTask: DeleteTaskFunctionType;
    itemId: string;
    itemLabel?: string;
}

export interface DataTablePropsType {
    dataFields: Array<object>;
    dataItems: Array<object>;
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
    task?: TaskType;        // this.addItemId | deleteItem | updateItem
    params?: string[];
    data?: object[],
    bind?: string[];    // this.itemsIds
    domComp?: boolean,
    transform?: TaskType;   // shortDesc
}

export interface EventType {
    type: string;
    task?: TaskType;
    action?: TaskType;
    params?: string[];
}

export type DataItemsType = object[];

export interface DataFieldType {
    name: string;
    label: string;
    type: string; // "boolean"
    default?: boolean | string | number | object;
    order?: number;
    sort?: boolean;
    source: DataSourceType;
    events?: EventType[];
}

export type DataFieldsType = DataFieldType[];

export interface TableStyle {
    table: string;
    tableHeader: string;
    tableBody: string;
}

export interface SortStyle {
    asc: string;
    desc: string;
}

export interface DOMType {
    pageMessage?: HTMLElement | null;
    pageLimit?: HTMLElement | null;
    pageNav?: HTMLElement | null;
    tableSearch?: HTMLElement | null;
    table?: HTMLElement | null;
    tableMessage?: HTMLElement | null;
    pageNavFirst?: HTMLElement | null;
    pageNavNext?: HTMLElement | null;
    pageNavPrevious?: HTMLElement | null;
    pageNavLast?: HTMLElement | null;
    pageNavNumber?: HTMLCollection | null;
    pageLimitValue?: HTMLElement | null;
    tableContent?: HTMLElement | null;
    tableHeader?: HTMLElement | null;
    tableBody?: HTMLElement | null;
}

export type PageNavValueType = string | number | string[];

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

export type PageNavEventType = "page-nav-first" | "page-nav-next" | "page-nav-previous" | "page-nav-last" | "page-nav-number";
