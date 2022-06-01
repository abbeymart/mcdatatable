/**
 * @Author: abbeymart | Abi Akindele | @Created: 2019-06-24 | @Updated: 2019-07-01
 * @Company: mConnect.biz | @License: MIT
 * @Description: mc-data-table template
 */

// sub-components
import '../McPageLimit';
import '../McTableSearch';
import '../McTable';
import '../McTableMessage';
import '../McPageNav';
import { DataTableProps } from '../types';

export default (props: DataTableProps) => {
    const mcData = `
      <div class="w3-row-padding">
        <div class="w3-half w3-left">
          <mc-page-limit id="mc-page-limit"></mc-page-limit>
        </div>
        <div class="w3-half w3-right">
          <mc-table-search id="mc-table-search"></mc-table-search>
        </div>
      </div>
      <div class="w3-panel">
        <mc-table id="mc-table"></mc-table>
      </div>
      <div class="w3-row-padding">
        <div class="w3-half w3-left">
          <mc-table-message id="mc-table-message"></mc-table-message>
        </div>
        <div class="w3-half w3-right">
          <mc-page-nav id="mc-page-nav"></mc-page-nav>
        </div>
      </div>        
    `
    return `
            <div class="w3-container">
                ${mcData}
            </div>
        `;
};
