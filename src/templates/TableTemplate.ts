/**
 * @Author: abbeymart | Abi Akindele | @Created: 2019-06-29 | @Updated: 2020-07-01
 * @Company: mConnect.biz | @License: MIT
 * @Description: mc-datatable-template
 */

import '../McTableNoData';
import '../McActive';
import '../McUpdate';
import '../McDelete';
import {TablePropsType, TableStyle} from "../types";

// default values
const defaultTableStyle = {
    table: 'w3-table w3-striped w3-border w3-bordered w3-hoverable',
    tableHeader: 'w3-red',
    tableBody: 'w3-hover',
};

export default (props: TablePropsType) => {
    const tableFields = props && props.tableFields ? props.tableFields : [];
    const tableItems = props && props.tableItems ? props.tableItems : [];
    const tableRecords = props && props.tableRecords ? props.tableRecords : [];
    const tableStyle = props && props.tableStyle ? props.tableStyle : defaultTableStyle;
    const sortStyleAsc = props && props.sortStyleAsc ? props.sortStyleAsc : '';
    const sortStyleDesc = props && props.sortStyleDesc ? props.sortStyleDesc : '';

    if(tableFields.length && tableItems.length) {
        return `
        <div>
            <table class="${tableStyle.table}" id="mc-table-content">
                <thead id="mc-table-header" class="${tableStyle.tableHeader}">
                <tr>
                    ${tableFields.map(field => {
                        `
                        <th scope="col" id="${field.name}" class="mc-table-header mc-tool-cursor" data-table-header-field="${field.toString()}">
                            <span class="w3-left-align">${field.label} </span>
                            ${field.sort &&
                                `
                                <span class="w3-right-align">
                                    <i class="${sortStyleAsc}"> </i> <i class="${sortStyleDesc}"/>
                                </span> 
                                `
                            }
                            
                        </th>
                        `
                            
                    }).join('')}
                </tr>
                </thead>
                <tbody id="mc-table-body" class="${tableStyle.tableBody}">
                    ${tableRecords.map(item => {
                        `
                        <tr id="${item.id || item._id}">
                                                           
                        })}
                        </tr>
                        `            
                    })}
                    
                </tbody>    
            </table>
            
        </div>
    `;
    } else {
        return `
        <div>
            <mc-table-no-data></mc-table-no-data>
        </div>
    `;
    }

};
