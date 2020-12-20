/**
 * @Author: abbeymart | Abi Akindele | @Created: 2019-06-29 | @Updated: 2020-07-01
 * @Company: mConnect.biz | @License: MIT
 * @Description: mc-datatable-template
 */

import '../McTableNoData';
import '../McActive';
import '../McUpdate';
import '../McDelete';
import { TablePropsType } from "../types";

export default (props: TablePropsType) => {
    if (props.tableFields.length > 0 && props.tableItems.length > 0) {
        return `
        <div>
            <table class="${props.tableStyle.table}" id="mc-table-content">
                <thead id="mc-table-header" class="${props.tableStyle.tableHeader}">
                    <tr>
                        ${props.tableFields.map(field => `
                            <th scope="col" id="${field.name}" class="mc-table-header mc-tool-cursor" data-table-header-field="${field.toString()}">
                                <span class="w3-left-align">${field.label} </span>
                                ${field.sort && `
                                    <span class="w3-right-align">
                                        <i class="${props.sortStyleAsc}"> </i> <i class="${props.sortStyleDesc}"/>
                                    </span> 
                                `}
                            </th>
                        `).join("")}
                    </tr>
                </thead>
                <tbody id="mc-table-body" class="${props.tableStyle.tableBody}">
                    ${props.tableRecords.map(item => `
                        <tr id="${item.id || item._id}">
                        ${item.fieldsInfo?.map(fieldItem => `
                            <td id="${fieldItem.fieldName + item._id}">
                            ${
                            fieldItem.fieldType === 'checkbox' && typeof fieldItem.fieldTask === "function" 
                                ? `<input type="checkbox" class="w3-check mc-table-input-check" data-input-field="${fieldItem.fieldName}" data-input-value="${item._id || item.id}">`
                                : fieldItem.fieldType === 'custom' ? `<update class="mc-table-update" label="${fieldItem.fieldLabel}" action="${fieldItem.fieldTask}" data-update-field="${fieldItem.fieldName}" data-update-item="${JSON.stringify(item)}"></update>`
                                : fieldItem.fieldType === 'taskLink' && fieldItem.fieldLabel === 'Update' ? `<update class="mc-table-update" label="${fieldItem.fieldLabel}" data-update-field="${fieldItem.fieldName}" data-update-item="${JSON.stringify(item)}"></update>`
                                : fieldItem.fieldType === 'taskLink' && fieldItem.fieldLabel === 'Delete' ? `<delete class="mc-table-delete" label="${fieldItem.fieldLabel}" data-delete-field="${fieldItem.fieldName}" data-delete-itemid="${item._id || item.id}"></delete>`
                                : fieldItem.fieldSource.domComp ? `<span>${fieldItem.fieldValue}</span>`
                                : `<span class="mc-table-event" data-event-field="${fieldItem.fieldName}" data-event-item="${JSON.stringify(item)}">${fieldItem.fieldValue}</span>`
                            }
                            </td>
                        `)}
                        </tr>
                    `)}
                </tbody>    
            </table> 
        </div>`;
    } else {
        return `
        <div>
            <mc-table-no-data></mc-table-no-data>
        </div>`;
    }
};
