import '../McUpdate';
import '../McDelete';
import {ItemFieldsInfoType, ItemValueType, TablePropsType} from "../types";

// TODO: include data-field-value in td
export default (props: TablePropsType): string => {
    const checkBoxDom = (fieldItem: ItemFieldsInfoType, item: ItemValueType) => {
        return `<input type="checkbox" class="w3-check mc-table-checkbox" data-input-field="${fieldItem.fieldName}" data-input-value="${item.id || item._id}" id="${fieldItem.fieldName}_${item.id || item._id}">`;
    }
    const updateDom = (fieldItem: ItemFieldsInfoType, item: ItemValueType) => {
        return `<update class="mc-table-update" label="${fieldItem.fieldLabel}" data-update-field="${fieldItem.fieldName}" data-update-item="${JSON.stringify(item)}" id="${fieldItem.fieldName}_${item.id || item._id}></update>`;
    }
    const deleteDom = (fieldItem: ItemFieldsInfoType, item: ItemValueType) => {
        return `<delete class="mc-table-delete" label="${fieldItem.fieldLabel}" data-delete-field="${fieldItem.fieldName}" data-delete-itemid="${item.id || item._id}" id="${fieldItem.fieldName}_${item.id || item._id}></delete>`;
    }
    const customEventDom = (fieldItem: ItemFieldsInfoType, item: ItemValueType) => {
        return `<span class="mc-table-event" data-event-field="${fieldItem.fieldName}" data-event-item="${JSON.stringify(item)}" id="${fieldItem.fieldName}_${item.id || item._id}>${fieldItem.fieldValue}</span>`
    }
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
                            <td id="${fieldItem.fieldName + (item.id || item._id)}">
                            ${
        fieldItem.fieldType === 'checkbox' && typeof fieldItem.fieldTask === "function"
            ? checkBoxDom(fieldItem, item)
            : fieldItem.fieldType === 'custom' ? updateDom(fieldItem, item)
                : fieldItem.fieldType === 'taskLink' && fieldItem.fieldLabel === 'Update' ? updateDom(fieldItem, item)
                    : fieldItem.fieldType === 'taskLink' && fieldItem.fieldLabel === 'Custom' ? updateDom(fieldItem, item)
                        : fieldItem.fieldType === 'taskLink' && fieldItem.fieldLabel === 'Delete' ? deleteDom(fieldItem, item)
                            : fieldItem.fieldSource.domComp ? `<span>${fieldItem.fieldValue}</span>`
                                : customEventDom(fieldItem, item)
    }
                            </td>
                        `).join("")}
                        </tr>
                    `).join("")}
                </tbody>    
            </table> 
        </div>`;
};
