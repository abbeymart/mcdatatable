/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-12-15
 * @Company: Copyright 2020 Abi Akindele  | mConnect.biz
 * @License: All Rights Reserved | LICENSE.md
 * @Description: mc-datatable types
 */

export interface ActivePropsType {
    isActive?: boolean;
    activeLabel?: string;
    inActiveLabel?: string;
}

export interface UpdateTaskFunctionType {
    (val: object): void
}

export interface UpdatePropsType {
    itemTask: UpdateTaskFunctionType;
    itemData: object;
    itemLabel?: string;
}

export interface DeleteTaskFunctionType {
    (val: string): void
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
