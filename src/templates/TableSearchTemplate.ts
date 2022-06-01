export default (props: {searchKey: ""}) => {
    return `
        <div>
            <input class="w3-input mc-bold-label" type="text" id="mc-table-search-key" placeholder="${props.searchKey || 'Enter Search Keywords'}">
        </div>
    `;
}
