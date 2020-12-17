/**
 * @Author: abbeymart | Abi Akindele | @Created: 2019-06-29 | @Updated: 2019-07-03
 * @Company: mConnect.biz | @License: MIT
 * @Description: mc-table-header-template
 */

export default (props) => {
    try {
        const headerRows = props.tableFields.map((field) => {
            // compose the table header field/column
            // sort style based on sort status
            let sortStyle = '';
            if (field.sort) {
                sortStyle = 'fa fa-up fa-down';
            }
            // column/field value
            return `<td onclick="" class="${sortStyle} mc-table-sort" data-sort-field="${field.name}">${field.label}</td>`;
        }).join('');

        const tableRow = `<tr>${headerRows}</tr>`;
        return `<thead>${tableRow}</thead>`;

    } catch (e) {
        console.log('error rendering header: ', e.message);
        return `error rendering table header: ${e.message}`;
    }
};
