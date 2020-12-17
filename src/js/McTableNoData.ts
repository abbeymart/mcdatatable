/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-11-23
 * @Company: Copyright 2020 Abi Akindele  | mConnect.biz
 * @License: All Rights Reserved | LICENSE.md
 * @Description: mc-datatable: ui component for no data-found
 */

const noDataContent = () => `
    <div class="w3-container w3-yellow">
      <h4>... Loading or No data available / Ensure that you're logged in ...</h4>
    </div>
`;

const dataLoadingContent = () => `
    <div>
      <h4>... Loading or Unable to process data / Ensure that you're logged in ...</h4>
    </div>
`;

export function McTableNoData(dataItemsCount = 0): string {
    return `
        <div>
            ${dataItemsCount < 1 ? noDataContent() : dataLoadingContent()}
        </div>
    `;
}
