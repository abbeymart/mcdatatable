/**
 * @Author: abbeymart | Abi Akindele | @Created: 2019-06-29 | @Updated: 2019-07-03
 * @Company: mConnect.biz | @License: MIT
 * @Description: mc-table-body-template
 */

export default (props = {}) => {
    try {
        let tableRows = props.tableData.map(item => {
            let tableFields = '';

            props.tableFields.forEach((field) => {
                // compose the table field/column
                let clickEvent     = null,
                    changeEvent    = null,
                    mouseOverEvent = null;

                // column/field value
                let fieldValue = 'n/a';
                switch (field.source.type) {
                    case 'provider':
                        fieldValue = item[field.name];
                        if (field.transform) {
                            fieldValue = field.transform(fieldValue);
                        }
                        break;
                    case 'checkbox':
                        fieldValue = `<input type="checkbox">`;
                        break;
                    case 'select':
                        fieldValue = `<select name="mc-table-selector">
                                        <option value="" selected disabled>${field.label}</option>
                                        ${field.source.data.map(list => `<option value="${list['value']}">${list['label']}</option>`).join('')}
                                      </select>`;
                        break;
                }

                // events handling
                let fieldEvents = field['events'];
                if (Array.isArray(fieldEvents) && fieldEvents.length > 0) {
                    fieldEvents.forEach(event => {
                        let taskParams    = '';
                        const eventParams = event['params'];
                        if (eventParams && Array.isArray(eventParams) && eventParams.length > 0) {
                            if (eventParams.includes('all') || eventParams.includes('item')) {
                                taskParams = item;
                            } else {
                                taskParams = eventParams.map(param => item[param]).join(', ');
                            }
                        }

                        switch (field['event']['type']) {
                            case 'click':
                                clickEvent = {
                                    task  : event['task'],
                                    params: taskParams,
                                };
                                break;
                            case 'change':
                                changeEvent = {
                                    task  : event['task'],
                                    params: taskParams,
                                };
                                break;
                            case 'mouseover':
                                mouseOverEvent = {
                                    task  : event['task'],
                                    params: taskParams,
                                };
                                break;
                        }
                    })
                }

                let tableField = `<td onclick="clickEvent.task(clickEvent.params)" onchange="changeEvent.task(clickEvent.params)" >
                                     ${fieldValue}
                                  </td>`;

                tableFields += tableField;

            });

            return `<tr>${tableFields}</tr>`;
        }).join('');

        return `<tbody>${tableRows}</tbody>`;

    } catch (e) {
        console.log('error rendering table: ', e.message);
        return `error rendering table body: ${e.message}`;
    }
};
