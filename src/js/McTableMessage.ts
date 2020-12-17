/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-11-23
 * @Company: Copyright 2020 Abi Akindele  | mConnect.biz
 * @License: All Rights Reserved | LICENSE.md
 * @Description: mc-datatable: message component
 */


const messageContent = () => `
    <div class="w3-bar">
      <div v-if="itemFrom > 0 && itemTo >= itemFrom && dtDataTotal >= itemTo">
        <span class="w3-text-black">Showing {{ itemFrom }} to {{ itemTo }} of {{ dtDataTotal }} entries </span>
        <span v-if="dtDataTotal < dtInitialDataTotal"> (filtered from {{ dtInitialDataTotal }} total entries) </span>
        <span class="w3-blue"><strong>[ Page {{ dtCurrentPage }} ]</strong></span>
      </div>
      <div v-else>
        <span class="w3-text-black">Page (from/to) information missing</span>
      </div>
    </div>
`
