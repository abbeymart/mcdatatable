/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-12-16
 * @Company: Copyright 2020 Abi Akindele  | mConnect.biz
 * @License: All Rights Reserved | LICENSE.md
 * @Description: helper functions
 */

export function strToBool(val = "n"): boolean {
    const strVal = val.toLowerCase();
    if (strVal === "true" || strVal === "t" || strVal === "yes" || strVal === "y") {
        return true;
    } else if (strVal === "false" || strVal === "f" || strVal === "no" || strVal === "n") {
        return false;
    } else return Number(strVal) > 0;
}

export function isEmptyObject(val: object): boolean {
    return !(Object.keys(val).length > 0 && Object.values(val).length > 0);
}

export function setLocalStorage(storeId: string, storeValue: any) {
    localStorage.setItem(storeId, JSON.stringify(storeValue))
}

export function getLocalStorage(storeId: string): any {
    return localStorage.getItem(storeId)
}