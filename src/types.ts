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

export interface ItemValueType {
    [key: string]: any;

    fieldsInfo?: Array<ItemFieldsInfoType>;
}

export interface SetValueType {
    (val: any): void;
}

export interface ItemFieldType {
    [key: string]: any;
}

export interface UpdateTaskFunctionType {
    (item: ItemValueType): any
}

export interface UpdatePropsType {
    itemTask: UpdateTaskFunctionType;
    itemData: ItemValueType;
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

// export type ValueType = string | object | number | UpdateTaskFunctionType | DeleteTaskFunctionType;

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
    dataFields: Array<DataFieldType>;
    dataItems: Array<ItemValueType>;
    currentPage: number;
    dataTotal: number;         // default: 0
    recordTotal: number;       // computed from dataTotal or dataItems
    paging: boolean;           // default: true
    pageStart: number;          // default: 1
    pageLimits: Array<number>  // default: [10, 20, 30, 50, 100, 200]
    tableStyle: {
        table: string;      // default: "w3-table w3-striped w3-border w3-bordered w3-hoverable"
        tableHeader: string;    // default: "w3-red"
        tableBody: string;  // default: "w3-hover"
    };
    sortStyle: {
        asc: string;    // default: "fa fa-caret-up"
        desc: string;   // default: "fa fa-caret-down"
    }
}

export interface TablePropsType {
    isActive?: boolean;
    activeLabel?: string;
    inActiveLabel?: string;
}

export interface PageLimitPropsType {
    pageLimit: number;
    pageLimits: Array<number>;
    setPageLimit: (val: string | number) => void;
}

export interface PageNavPropsType {
    currentPage: number;
    pageList: Array<string>;
    pageNavFirst: () => void;
    pageNavNext: () => void;
    pageNavPrevious: () => void;
    pageNavLast: () => void;
    pageNavNumber: (val: string | number) => void;
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

export type DataItemsType = Array<ItemValueType>;

export interface DataFieldType {
    name: string;
    label: string;
    type: string; // "boolean"
    default?: boolean | string | number | object | Array<boolean> | Array<string> | Array<number> | Array<object>;
    order: number;
    sort?: boolean;
    source: DataSourceType;
    events?: Array<EventType>;
}

export interface ItemFieldsInfoType {
    fieldValue: any;
    fieldSource: DataSourceType;
    fieldType: any;
    fieldName: string;
    fieldTask?: TaskFunctionType | null;
    fieldParams?: string | ItemValueType;
    fieldLabel: string;
}

export type DataFieldsType = Array<DataFieldType>;

export interface HTMLDataType extends HTMLElement, DataTablePropsType {
    // currentPage: string;
}

export interface DOMType {
    pageMessage?: HTMLDataType | HTMLElement | null;
    pageLimit?: HTMLDataType | HTMLElement | null;
    pageNav?: HTMLDataType | HTMLElement | null;
    tableSearch?: HTMLDataType | HTMLElement | null;
    table?: HTMLDataType | HTMLElement | null;
    tableMessage?: HTMLDataType | HTMLElement | null;
    pageNavFirst?: HTMLDataType | HTMLElement | null;
    pageNavNext?: HTMLDataType | HTMLElement | null;
    pageNavPrevious?: HTMLDataType | HTMLElement | null;
    pageNavLast?: HTMLDataType | HTMLElement | null;
    pageNavNumber?: HTMLCollection | null;
    pageLimitValue?: HTMLDataType | HTMLElement | null;
    tableContent?: HTMLDataType | HTMLElement | null;
    tableHeader?: HTMLDataType | HTMLElement | null;
    tableBody?: HTMLDataType | HTMLElement | null;
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
