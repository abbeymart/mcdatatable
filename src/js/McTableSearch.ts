/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-11-23
 * @Company: Copyright 2020 Abi Akindele  | mConnect.biz
 * @License: All Rights Reserved | LICENSE.md
 * @Description: mc-datatable: search component
 */

function emitPageEvent(e: any) {
    e.preventDefault();
    // emit 'itemType event
    const compChange = new CustomEvent(e.target.itemType, {
        bubbles: true,
        cancelable: true,
        detail: {type: e.target.itemType, value: e.target.itemValue}
    });
    e.target.dispatchEvent(compChange);
}

// set the value of the search keyword
const updateSearchKey = () => {
    const tableSearch = document.getElementById('mc-table-search-key');
    // handle & emit events
    if (tableSearch) {
        tableSearch.onchange = (e: any) => {
            e.preventDefault();
            // emit event, for other sub-components
            e.target.itemType = 'table-search';
            e.target.itemValue = e.target.value || '';
            emitPageEvent(e);
            // update store value(s):
            // if (e.target.value) {
            //     this.searchKey = e.target.value;
            // }
        };
    }

}

const tableSearchContent = () => `
    <div>
      <label for="mc-table-search-key" hidden><span class="w3-text-black">Search</span></label>
      <input class="w3-input mc-bold-label" type="text" id="mc-table-search-key" name="mc-table-search-key"
             placeholder="Enter Search Keywords" onkeyup="updateSearchKey()">
    </div>
`

export function McTableSearch() {
    return tableSearchContent()
}
