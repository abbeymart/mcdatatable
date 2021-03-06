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
    if (Object.keys(val).length > 0 && Object.values(val).length > 0) {
        return false
    }
    return true;
}
