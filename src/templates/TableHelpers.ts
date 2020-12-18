/**
 * @Author: abbeymart | Abi Akindele | @Created: 2019-06-24 | @Updated: 2020-07-01
 * @Company: mConnect.biz | @License: MIT
 * @Description: mc-table helper functions
 */

import { DOMType } from "../types";

export default {
    getDOM(domScope: Document): DOMType {
        if (domScope) {
            return {
                pageLimit      : domScope.getElementById('mc-page-limit'),
                pageNav        : domScope.getElementById('mc-page-nav'),
                tableSearch    : domScope.getElementById('mc-table-search-key'),
                table          : domScope.getElementById('mc-table'),
                tableMessage   : domScope.getElementById('mc-table-message'),
                pageNavFirst   : domScope.getElementById('mc-page-nav-first'),
                pageNavPrevious: domScope.getElementById('mc-page-nav-previous'),
                pageNavNext    : domScope.getElementById('mc-page-nav-next'),
                pageNavLast    : domScope.getElementById('mc-page-nav-last'),
                pageNavNumber  : domScope.getElementsByClassName('mc-current-page'),
                pageLimitValue : domScope.getElementById('mc-page-limit-value'),
                tableContent   : domScope.getElementById('mc-table-content'),
                tableHeader    : domScope.getElementById('mc-table-header'),
                tableBody      : domScope.getElementById('mc-table-body'),
            };
        } else {
            return {};
        }
    },
    getPageNavDOM(domScope: HTMLDocument): DOMType {
        if (domScope) {
            return {
                pageNavFirst   : domScope.getElementById('mc-page-nav-first'),
                pageNavPrevious: domScope.getElementById('mc-page-nav-previous'),
                pageNavNext    : domScope.getElementById('mc-page-nav-next'),
                pageNavLast    : domScope.getElementById('mc-page-nav-last'),
                pageNavNumber  : domScope.getElementsByClassName('mc-current-page'),
            }
        } else {
            return {};
        }
    },
    getPageLimitDOM(domScope: Document): DOMType {
        if (domScope) {
            return {
                pageLimitValue: domScope.getElementById('mc-page-limit-value'),
            }
        } else {
            return {};
        }
    },
    getTableDOM(domScope: Document): DOMType {
        if (domScope) {
            return {
                tableContent: domScope.getElementById('mc-table-content'),
                tableHeader : domScope.getElementById('mc-table-header'),
                tableBody   : domScope.getElementById('mc-table-body'),
            }
        } else {
            return {};
        }
    },
    getTableSearch(domScope: Document): DOMType {
        if (domScope) {
            return {
                tableSearch: domScope.getElementById('mc-table-search-key'),
            };
        } else {
            return {};
        }
    },
    render() {

    },

};
