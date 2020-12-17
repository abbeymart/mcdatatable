/**
 * @Author: abbeymart | Abi Akindele | @Created: 2019-06-24 | @Updated: 2020-07-01
 * @Company: mConnect.biz | @License: MIT
 * @Description: mc-datatable-template
 */

export default (props = {limits: [10, 20, 30, 50, 100, 200]}) => {
    props.limits = props && Array.isArray(props.limits) && props.limits.length > 0? props.limits : [10, 20, 30, 50, 100, 200];
    return `
        <div>
            <span>Show</span>
            <select id="mc-page-limit-value" name="mc-page-limit-value">
                ${props.limits.map((limit, index) => `<option value="${limit}" id="pageLimit-${index}">${limit}</option>` ).join('')}
            </select>
            <span>items</span>
        </div>
    `;
};
