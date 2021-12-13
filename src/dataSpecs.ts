/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-09-24
 * @Company: Copyright 2020 Abi Akindele  | mConnect.biz
 * @License: All Rights Reserved | LICENSE.md
 * @Description: mc-web3-ts: datatable specs
 */

let itemsIds: Array<string> = []

function addItemId(id: string) {
    itemsIds.push(id)
}

function activeLabel(val: boolean) {
    return val ? "Yes" : "No"
}

function parentName(item: any) {
    return item ? item.firstName + item.lastName : "N/A"
}

function updateItem(item: object) {
    // perform save action
    console.log(item)
}

function deleteItem(item: object) {
    // perform delete action
    console.log(item)
}

const dataFields = [
    {
        name   : "select",
        label  : "Select",
        type   : "boolean",
        default: true,
        order  : 1,
        sort   : false,
        source : {
            type   : "checkbox",
            task   : addItemId,
            params : ["_id"],
            data   : [],
            bind   : itemsIds,
            domComp: false
        },
        events : [{type: "change", task: addItemId, params: ["_id"]}]
    },
    {
        name   : "category",
        label  : "Category",
        type   : "string",
        default: "N/A",
        order  : 2,
        sort   : true,
        source : {type: "provider",},
    },
    {
        name   : "title",
        label  : "Title",
        type   : "string",
        default: "N/A",
        order  : 3,
        sort   : true,
        source : {type: "provider",},
    },
    {
        name   : "type",
        label  : "Type",
        type   : "string",
        default: "N/A",
        order  : 4,
        sort   : true,
        source : {type: "provider",},
    },
    {
        name   : "parentId",
        label  : "Part Of",
        type   : "string",
        default: "N/A",
        order  : 5,
        sort   : true,
        source : {type: "provider", transform: parentName},
    },
    {
        name   : "isActive",
        label  : "isActive",
        type   : "boolean",
        default: false,
        order  : 6,
        sort   : false,
        source : {type: "provider", transform: activeLabel, domComp: true},
    },
    {
        name   : "update",
        label  : "Update",
        type   : "string",
        default: "Update",
        order  : 7,
        sort   : false,
        source : {
            type   : "taskLink",
            task   : updateItem,
            params : ["item"],
            domComp: false
        },
        events : [{type: "click", action: updateItem, params: ["item"]}]
    },
    {
        name   : "delete",
        label  : "Delete",
        type   : "string",
        default: "Delete",
        order  : 8,
        sort   : false,
        source : {
            type   : "taskLink",
            task   : deleteItem,
            params : ["_id"],
            domComp: false
        },
        events : [{type: "click", action: deleteItem, params: ["_id"]}]
    },
]
