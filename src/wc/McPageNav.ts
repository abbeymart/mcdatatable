/**
 * @Author: abbeymart | Abi Akindele | @Created: 2019-06-25 | @Updated: 2020-07-01
 * @Company: mConnect.biz | @License: MIT
 * @Description: mc-page-nav, page navigation (numbering, first, last, previous and next)
 */

import mcPageNavTemplate from './templates/PageNavTemplate';
import TableHelper from './templates/TableHelpers';
import {dtstore} from "./store/DtStore";
import {DOMType, PageNavEventType, PageNavValueType} from "./types";

class McPageNav extends HTMLElement {
    #DOM: DOMType = {};

    constructor() {
        super();
        // render component
        this.renderComponent();
    }

    static get observedAttributes() {
        // to trigger template re-rendering / updates, from inside/outside the component
        return ['currentpage', 'pagelimit', 'datatotal', 'lastpage',];
    }

    attributeChangedCallback(name: string, oldVal: PageNavValueType, newValue: PageNavValueType) {
        if (oldVal === newValue) {
            return;
        }
        // re-render component for change to any of the observed attributes change
        this.renderComponent();
    }

    // getters and setters (to trigger re-rendering via observed attributes
    get pageList(): string[] {
        let lastPage = 1;
        if (this.dataTotal && this.dataTotal > this.pageLimit) {
            lastPage = Math.ceil(this.dataTotal / this.pageLimit);
        }

        // pageNav scenarios
        // [First][Previous]...pages...[Next][Last]
        // show all pages, if lastPage <= 7 : i.e. 1...lastPage
        // render pages: show first(1) and last(30) pages, show first five pages if currentPage: 1 2 3 4
        // for currentPage: 5 to lastPage-4, i.e. 1 ... three pages from currentPage ... 30
        // show 1 ... 5 6 7 ... 30
        // for currentPage: lastPage-4, -3, -2, -1, lastPage
        // show: 1 ... 26 27 28 29 30
        let pageList = [];
        if (lastPage <= 7) {
            let i = 1;
            while (i <= lastPage) {
                pageList.push(i.toString());
                i++;
            }
        }
        if (lastPage > 7) {
            if ([1, 2, 3, 4].includes(this.currentPage)) {
                pageList = ['1', '2', '3', '4', '5', '....', lastPage.toString()];
            } else if (this.currentPage > 4 && this.currentPage < lastPage - 3) {
                pageList = ['1', '....', (this.currentPage - 1).toString(), (this.currentPage).toString(), (this.currentPage + 1).toString(), '...', lastPage.toString()];
            } else if (this.currentPage >= lastPage - 4) {
                pageList = ['1', '....', (lastPage - 4).toString(), (lastPage - 3).toString(), (lastPage - 2).toString(), (lastPage - 1).toString(), lastPage.toString()];
            }
        }
        return pageList;
    }

    get currentPage(): number {
        return dtstore.currentPage;
    }

    set currentPage(value: number) {
        dtstore.currentPage = value;
        this.setAttribute('currentpage', value.toString());
    }

    get pageLimit(): number {
        return dtstore.pageLimit;
    }

    set pageLimit(value: number) {
        this.setAttribute('pagelimit', value.toString());
    }

    get dataTotal(): number {
        return dtstore.dataTotal;
    }

    set dataTotal(value: number) {
        this.setAttribute('datatotal', value.toString());
    }

    get lastPage(): number {
        return Math.ceil(this.dataTotal / this.pageLimit);
    }

    set lastPage(value: number) {
        this.setAttribute('lastpage', value.toString());
    }

    renderComponent() {
        if (dtstore.dataTotal > 0) {
            this.innerHTML = mcPageNavTemplate({
                currentPage: this.currentPage,
                lastPage: this.lastPage,
                pageList: this.pageList,
            });
        }
        // event's handlers
        // Component DOM references
        this.#DOM = TableHelper.getPageNavDOM(this.ownerDocument);
        const {pageNavFirst, pageNavPrevious, pageNavNext, pageNavLast, pageNavNumber} = this.#DOM;

        // handle & emit events
        if (pageNavFirst) {
            pageNavFirst.onclick = (e: any) => {
                e.preventDefault();
                // emit event, for other sub-components
                e.target.itemType = 'page-nav-first';
                e.target.itemValue = 1;
                McPageNav.emitPageNavEvent(e);
                // perform page-action
                this.pageNavFirst();
            };
        }

        if (pageNavPrevious) {
            pageNavPrevious.onclick = (e: any) => {
                e.preventDefault();
                const currentPageNum = this.currentPage--;
                // emit event, for other sub-components
                e.target.itemType = 'page-nav-previous';
                e.target.itemValue = currentPageNum;
                McPageNav.emitPageNavEvent(e);
                // perform page-action
                this.pageNavPrevious();
            };
        }

        if (pageNavNext) {
            pageNavNext.onclick = (e: any) => {
                e.preventDefault();
                const currentPageNum = this.currentPage++;
                // emit event, for other sub-components
                e.target.itemType = 'page-nav-next';
                e.target.itemValue = currentPageNum;
                McPageNav.emitPageNavEvent(e);
                // perform page-action
                this.pageNavNext();

            };
        }

        if (pageNavLast) {
            pageNavLast.onclick = (e: any) => {
                e.preventDefault();
                if (dtstore.dataTotal && dtstore.dataTotal > this.pageLimit) {
                    const currentPageNum = Math.ceil((this.dataTotal) / (this.pageLimit));
                    // emit event, for other sub-components
                    e.target.itemType = 'page-nav-last';
                    e.target.itemValue = currentPageNum;
                    McPageNav.emitPageNavEvent(e);
                    // perform page-action
                    this.pageNavLast();
                }
            };
        }

        if (pageNavNumber && pageNavNumber.length > 0) {
            // @ts-ignore
            for (let pageItem of pageNavNumber) {
                pageItem.onclick = (e: any) => {
                    e.preventDefault();
                    const currentPageNum = pageItem.innerText;
                    // emit event, for other sub-components
                    e.target.itemType = 'page-nav-number';
                    e.target.itemValue = parseInt(currentPageNum);
                    McPageNav.emitPageNavEvent(e);
                    // perform page-action
                    this.pageNavNumber(currentPageNum);
                };
            }
        }
    }

    // methods:
    pageAction(currentPage: number) {
        dtstore.currentPage = currentPage;
        // this.renderComponent(); // re-render via attribute change =>
        this.currentPage = currentPage;
    }

    pageNavFirst() {
        // store / emit event, for other sub-components
        dtstore.pagePosition = 'first-page';
        this.pageAction(1);
    }

    pageNavPrevious() {
        // store / emit event, for other sub-components
        dtstore.pagePosition = 'previous-page';
        this.pageAction(this.currentPage - 1);
    }

    pageNavNext() {
        // store / emit event, for other sub-components
        dtstore.pagePosition = 'next-page';
        this.pageAction(this.currentPage + 1);
    }

    pageNavLast() {
        // store / emit event, for other sub-components
        dtstore.pagePosition = 'last-page';
        this.pageAction(Math.ceil(this.dataTotal / this.pageLimit));
    }

    pageNavNumber(page: string) {
        // store  / emit event, for other sub-components
        dtstore.pagePosition = 'page-number';
        this.pageAction(parseInt(page));
    }

    static emitPageNavEvent(e: any) {
        e.preventDefault();
        // emit itemType event
        const compChange = new CustomEvent(e.target.itemType, {
            bubbles: true,
            cancelable: true,
            detail: {type: e.target.itemType, value: e.target.itemValue}
        });
        e.target.dispatchEvent(compChange);
    }

    disconnectedCallback() {
        // cleanup - reset DOM, removeEventLister(s), garbage collection...
        this.innerHTML = '';
    }
}

let mcPageNav;

if (!customElements.get('mc-page-nav')) {
    mcPageNav = customElements.define('mc-page-nav', McPageNav);
}

export default mcPageNav;
