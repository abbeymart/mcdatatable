/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-06-29 | @Updated: 2020-07-01
 * @Company: mConnect.biz | @License: MIT
 * @Description: datatable types
 */

import { CrudParamsType, ObjectRefType } from "./mcTypes";

export interface ObjectType {
    [key: string]: any;
}

export type Task = ((item?: ObjectType | any) => any) | null;
export type TransformTask = ((item?: any) => any) | null;
export type TaskUpdate = (item?: ObjectType) => any;
export type TaskDelete = (itemId?: string) => any;
export type Value = string | ObjectType | TaskUpdate | TaskDelete | object;

export type DataSourceTypes = "provider" | "taskLink" | "checkbox" | "custom";

export interface DataSource {
    type: DataSourceTypes;
    task?: Task;    // e.g addItemId
    params?: Array<string>; // reserved keywords: "item" & "record" for item-record param-value only
    data?: Array<ObjectType>,
    bind?: Array<string>;   // itemsIds
    domComp?: boolean,
    transform?: TransformTask;   // shortDesc
}

export type PermittedEvents = "click" | "mouseover" | "mouseleave" | "mouseenter" | "change";

export interface EventType {
    type: PermittedEvents;
    task?: Task;
    action?: Task;
    params?: Array<string>;
}

export type FieldTypes = "boolean" | "string" | "number" | ObjectType | "object" | "custom";

export interface DataField {
    name: string;
    label: string;
    type: FieldTypes;
    default?: boolean | string | number | ObjectType | object;
    order?: number;
    sort?: boolean;
    source: DataSource;
    events?: Array<EventType>;
}

export interface TableStyle {
    table: string;
    tableHeader: string;
    tableBody: string;
}

export interface SortStyle {
    asc: string;
    desc: string;
}

export type PagePosition = "" | "first-page" | "next-page" | "previous-page" | "last-page" | "page-number";

export interface DataStats {
    skip?: number;
    limit?: number;
    recordsTotal?: number;
    totalRecordsCount?: number;      // set to initialRecordTotal
    pages?: {
        start: number;      // calculate from skip/limit/totalRecordsCount
        end: number;        // calculate from skip/limit/totalRecordsCount
    };
    currentPages?: {        // calculate from pageLimit, skip, limit, recordsTotal/totalRecordsCount & pages
        start: number;
        end: number;
    };
    previousPages?: {
        start: number;
        end: number;
    };
    nextPages?: {
        start: number;
        end: number;
    };
}

export interface DataFetchAlertResult {
    skip: number;
    limit?: number;
    fetchAlert?: boolean;
    currentStats?: {        // calculate from pageLimit, skip, limit, recordsTotal/totalRecordsCount & pages
        startPage: number;
        endPage: number;
        currentPage: number;
        dataItemsTotal: number;
    };
}

export type GetRequestType = (crudParams: CrudParamsType) => any

export type DataFetchAlert = (val: DataFetchAlertResult, getRequest?: GetRequestType) => void

export interface DataTableProps {
    dataFields: Array<DataField>
    dataItems: Array<ObjectType>
    dataStats?: DataStats;
    totalRecordsCount?: number;
    dataFetchAlert?: DataFetchAlert;
    dataTotal?: number;
    paging?: boolean;
    pageStart?: number;
    pageLimit?: number;
    pageLimits?: Array<number>;
    tableStyle?: TableStyle;
    sortStyle?: SortStyle;
    permittedEvents?: Array<PermittedEvents>;
}

export interface DataTableState {
    dataFields: Array<DataField>;
    dataItems: Array<ObjectType>;
    dataStats: DataStats;
    totalRecordsCount: number;
    dataFetchAlert?: DataFetchAlert;
    dataTotal: number;
    paging: boolean;
    pageStart: number;
    pageLimits: Array<number>;
    tableStyle: TableStyle;
    sortStyle: SortStyle;
    permittedEvents: Array<PermittedEvents>;
    dataCount: number;
    pageLimit: number;
    currentPage: number;
    searchKey: string;
    dataItemsCount: number;
    recordTotal: number;
    dataFieldsCount: number;
}

export type SetPageLimit = (val: number) => void;

export interface PageLimitProps {
    pageLimit?: number;
    pageLimits?: Array<number>;
    setPageLimit: SetPageLimit;
}

export interface PageLimitState {
    pageLimit: number;
    pageLimits: Array<number>;
    setPageLimit: SetPageLimit;
    labelOn: boolean
}

export type SetCurrentPage = (val: number) => void;

export interface PageNavProps {
    pagePosition?: PagePosition;
    dataTotal?: number;
    pageLimit?: number;
    currentPage?: number;
    dataStats?: DataStats;
    setCurrentPage: SetCurrentPage;
    totalRecordsCount?: number;
    dataFetchAlert?: DataFetchAlert;
}

export interface PageNavState {
    pagePosition: PagePosition;
    dataTotal: number;
    pageLimit: number;
    currentPage: number;
    dataStats: DataStats;
    setCurrentPage: SetCurrentPage;
    totalRecordsCount: number;
    dataFetchAlert?: DataFetchAlert;
    lastPage: number;
    pageList: Array<string>;
}

export interface TableMessageProps {
    totalRecordsCount?: number;
    dataTotal?: number;
    pageLimit?: number;
    currentPage?: number;
}

export interface TableMessageState {
    totalRecordsCount: number;
    dataTotal: number;
    pageLimit: number;
    currentPage: number;
    itemFrom: number;
    itemTo: number;
}

export interface TableNoDataProps {
    dataItemsCount?: number;
}

export interface TableNoDataState {
    dataItemsCount: number;
}

export type SetSearchKey = (val: string) => void;

export interface TableSearchProps {
    searchKey?: string;
    setSearchKey: SetSearchKey;
}

export interface TableSearchState {
    searchKey: string;
    setSearchKey: SetSearchKey;
}


export type SetDataItems = (val: Array<ObjectType>) => void;

export type SetDataItemsTotal = (val: number) => void;

export interface TableProps {
    itemsIds?: Array<string>;
    sortAsc?: boolean;
    sortDesc?: boolean;
    dataFields: Array<DataField>
    dataItems: Array<ObjectType>
    pageLimit?: number;
    currentPage?: number;
    tableStyle: TableStyle;
    sortStyle: SortStyle;
    searchKey?: string;
    setDataItems: SetDataItems;
    setDataTotal: SetDataItemsTotal;
    permittedEvents: Array<string>;

}

export interface TableState {
    itemsIds: Array<string>;
    sortAsc: boolean;
    sortDesc: boolean;
    dataFields: Array<DataField>;
    dataItems: Array<ObjectType>;
    pageLimit: number;
    currentPage: number;
    tableStyle: TableStyle;
    sortStyle: SortStyle;
    searchKey: string;
    setDataItems: SetDataItems;
    setDataTotal: SetDataItemsTotal;
    permittedEvents: Array<string>;
    // computed fields
    tableFields: Array<DataField>;
    computedDataItems: Array<ObjectType>;
    itemsTotal: number;
    sortStyleCopy: SortStyle;
    sortStyleAsc: string;
    sortStyleDesc: string;
    dataItemsSearch: Array<ObjectType>;
    tableItems: Array<ObjectType>;
    tableRecords: Array<ItemData>;
}

export interface FieldItemInfo {
    fieldValue: any;
    fieldSource: DataSource;
    fieldType: "provider" | "taskLink" | "checkbox" | "custom";
    fieldName: string;
    fieldTask: Task | TaskUpdate | TaskDelete;
    fieldParams: ObjectType;
    fieldLabel: string;
    fieldEvents: Array<EventType>;
}

export interface ItemData extends ObjectType {
    fieldsInfo: Array<FieldItemInfo>;
    itemRecord: ObjectType;
}

export interface ActiveProps {
    isActive?: boolean;
    activeLabel?: string;
    inActiveLabel?: string;
}

export interface DeleteProps {
    itemTask: TaskDelete;
    itemId: string;
    itemLabel?: string;
}

export interface UpdateProps {
    itemTask: TaskUpdate;
    itemData: ObjectType;
    itemLabel?: string;
}

export interface ActiveProps {
    isActive?: boolean;
    activeLabel?: string;
    inActiveLabel?: string;
}

export interface DeleteProps {
    itemTask: TaskDelete;
    itemId: string;
    itemLabel?: string;
}

export interface UpdateProps {
    itemTask: TaskUpdate;
    itemData: ObjectType;
    itemLabel?: string;
}
// types

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

export interface ActivePropsType {
    isActive?: boolean;
    activeLabel?: string;
    inActiveLabel?: string;
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


export interface DataTablePropsType extends HTMLElement{
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
}

export interface PageNavPropsType {
    currentPage: number;
    lastPage: number;
    pageList: Array<string>;
}

export interface DataSourceType {
    type: DataSourceTypes;
    task?: Task;        // this.addItemId | deleteItem | updateItem
    params?: string[];
    data?: object[],
    bind?: string[];    // this.itemsIds
    domComp?: boolean,
    transform?: Task;   // shortDesc
}

// export interface EventType {
//     type: string;
//     task?: Task;
//     action?: Task;
//     params?: string[];
// }

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
    fieldTask?: Task | null;
    fieldParams?: string | ItemValueType;
    fieldLabel: string;
}

export type DataFieldsType = Array<DataFieldType>;

// export interface HTMLDataType extends DataTablePropsType {
//     // currentPage: string;
// }

export interface DataElementType extends HTMLElement {
    tableStyle: TableStyle;
    sortStyle: SortStyle;
    dataFields: Array<DataField>;
    dataItems: Array<ObjectType>;
    paging: boolean;
    pageStart: number;
    pageLimit: number;
    pagePosition: PagePositionType;
    pageLimits: Array<number>;
    currentPage: number;
    searchKey: string;
    dataTotal: number;
    totalRecordsCount: number;     // to limit number of records to process
    sortAsc: boolean;
    sortDesc: boolean;
}

export interface DataSelectElementType extends HTMLSelectElement {
    pageLimits: Array<number>;
}

export interface DOMType {
    pageMessage?: DataElementType;
    pageLimit?: DataElementType | DataSelectElementType;
    pageNav?: DataElementType;
    tableSearch?: DataElementType;
    table?: DataElementType;
    tableMessage?: DataElementType;
    pageNavFirst?: DataElementType;
    pageNavNext?: DataElementType;
    pageNavPrevious?: DataElementType;
    pageNavLast?: DataElementType;
    pageNavNumber?: HTMLCollection | null;
    pageLimitValue?: DataElementType;
    tableContent?: DataElementType;
    tableHeader?: DataElementType;
    tableBody?: DataElementType;
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
