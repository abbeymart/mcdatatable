/**
 * @Author: abbeymart | Abi Akindele | @Created: 2019-06-25 | @Updated: 2020-07-01
 * @Company: mConnect.biz | @License: MIT
 * @Description: mc-page-nav, page navigation (numbering, first, last, previous and next)
 */

import PageNavTemplate from "./templates/PageNavTemplate";
import TableHelper from "./templates/TableHelpers";
import { dtstore } from "./store/DtStore";
import { DOMType, PageNavEventType, PageNavValueType } from "./types";

class McPageNav extends HTMLElement {
    #DOM: DOMType = {};

    constructor() {
        super();
        // render component
        this.renderComponent();
    }

    // getters and setters (to trigger re-rendering via observed attributes

    get pagePositions(): string {
        return dtstore.PagePosition;
    }

    get lastPage(): number {
        return Math.ceil(this.dataTotal / this.pageLimit);
    }

    get pageList(): Array<string> {
        let lastPage = 1;
        if (this.dataTotal > this.pageLimit) {
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
        let pageList: Array<string> = [];
        if (lastPage <= 7) {
            let i = 1;
            while (i <= lastPage) {
                pageList.push(i.toString());
                i++;
            }
        }
        if (lastPage > 7) {
            if ([1, 2, 3, 4].includes(this.currentPage)) {
                pageList = ["1", "2", "3", "4", "5", "....", lastPage.toString()];
            } else if (this.currentPage > 4 && this.currentPage < lastPage - 3) {
                pageList = ["1", "....", (this.currentPage - 1).toString(), (this.currentPage).toString(), (this.currentPage + 1).toString(), "...", lastPage.toString()];
            } else if (this.currentPage >= lastPage - 4) {
                pageList = ["1", "....", (lastPage - 4).toString(), (lastPage - 3).toString(), (lastPage - 2).toString(), (lastPage - 1).toString(), lastPage.toString()];
            }
        }
        return pageList;
    }

    get pageLimit(): number {
        return dtstore.PageLimit;
    }

    get CurrentPage(): number {
        return dtstore.CurrentPage;
    }

    set currentPage(value: number) {
        dtstore.CurrentPage = value;
    }

    get dataTotal(): number {
        return dtstore.DataTotal;
    }

    renderComponent() {
        if (dtstore.DataTotal > 0) {
            this.innerHTML = PageNavTemplate({
                currentPage    : this.currentPage,
                lastPage       : this.lastPage,
                pageList       : this.pageList,
                pageNavFirst   : this.pageNavFirst,
                pageNavNext    : this.pageNavNext,
                pageNavPrevious: this.pageNavPrevious,
                pageNavLast    : this.pageNavLast,
                pageNavNumber  : this.pageNavNumber,
            });
        }
        // event"s handlers
        // Component DOM references

        // this.#DOM = TableHelper.getPageNavDOM(this.ownerDocument);
        // const {pageNavFirst, pageNavPrevious, pageNavNext, pageNavLast, pageNavNumber} = this.#DOM;

        // // handle & emit events
        // if (pageNavFirst) {
        //     pageNavFirst.onclick = (e: any) => {
        //         e.preventDefault();
        //         // emit event, for other sub-components
        //         e.target.itemType = "page-nav-first";
        //         e.target.itemValue = 1;
        //         McPageNav.emitPageNavEvent(e);
        //         // perform page-action
        //         this.pageNavFirst(e);
        //     };
        // }
        // if (pageNavPrevious) {
        //     pageNavPrevious.onclick = (e: any) => {
        //         e.preventDefault();
        //         const currentPageNum = this.currentPage--;
        //         // emit event, for other sub-components
        //         e.target.itemType = "page-nav-previous";
        //         e.target.itemValue = currentPageNum;
        //         McPageNav.emitPageNavEvent(e);
        //         // perform page-action
        //         this.pageNavPrevious(e);
        //     };
        // }
        // if (pageNavNext) {
        //     pageNavNext.onclick = (e: any) => {
        //         e.preventDefault();
        //         const currentPageNum = this.currentPage++;
        //         // emit event, for other sub-components
        //         e.target.itemType = "page-nav-next";
        //         e.target.itemValue = currentPageNum;
        //         McPageNav.emitPageNavEvent(e);
        //         // perform page-action
        //         this.pageNavNext(e);
        //
        //     };
        // }
        // if (pageNavLast) {
        //     pageNavLast.onclick = (e: any) => {
        //         e.preventDefault();
        //         if (dtstore.DataTotal && dtstore.DataTotal > this.pageLimit) {
        //             const currentPageNum = Math.ceil((this.dataTotal) / (this.pageLimit));
        //             // emit event, for other sub-components
        //             e.target.itemType = "page-nav-last";
        //             e.target.itemValue = currentPageNum;
        //             McPageNav.emitPageNavEvent(e);
        //             // perform page-action
        //             this.pageNavLast(e);
        //         }
        //     };
        // }
        // if (pageNavNumber && pageNavNumber.length > 0) {
        //     // @ts-ignore
        //     for (let pageItem of pageNavNumber) {
        //         pageItem.onclick = (e: any) => {
        //             e.preventDefault();
        //             const currentPageNum = pageItem.innerText;
        //             // emit event, for other sub-components
        //             e.target.itemType = "page-nav-number";
        //             e.target.itemValue = parseInt(currentPageNum);
        //             McPageNav.emitPageNavEvent(e);
        //             // perform page-action
        //             this.pageNavNumber(e, currentPageNum);
        //             // store  / emit event, for other sub-components
        //             // dtstore.PagePosition = "page-number";
        //             // this.setCurrentPage(currentPageNum);
        //         };
        //     }
        // }
    }

    // methods:
    setCurrentPage(currentPage: number) {
        dtstore.CurrentPage = currentPage;
        // this.renderComponent(); // re-render via attribute change =>
    }

    pageNavFirst(e: Event) {
        // store / emit event, for other sub-components
        dtstore.PagePosition = "first-page";
        this.setCurrentPage(1);
    }

    pageNavPrevious(e: Event) {
        // store / emit event, for other sub-components
        dtstore.PagePosition = "previous-page";
        this.setCurrentPage(this.currentPage - 1);
    }

    pageNavNext(e: Event) {
        // store / emit event, for other sub-components
        dtstore.PagePosition = "next-page";
        this.setCurrentPage(this.currentPage + 1);
    }

    pageNavLast(e: Event) {
        e.preventDefault();
        // store / emit event, for other sub-components
        dtstore.PagePosition = "last-page";
        this.setCurrentPage(Math.ceil(this.dataTotal / this.pageLimit));
    }

    pageNavNumber(e: Event, page: string | number) {
        e.preventDefault();
        // store  / emit event, for other sub-components
        dtstore.PagePosition = "page-number";
        this.setCurrentPage(Number(page));
    }

    static emitPageNavEvent(e: any) {
        e.preventDefault();
        // emit itemType event
        const compChange = new CustomEvent(e.target.itemType, {
            bubbles   : true,
            cancelable: true,
            detail    : {type: e.target.itemType, value: e.target.itemValue}
        });
        e.target.dispatchEvent(compChange);
    }

    disconnectedCallback() {
        // cleanup - reset DOM, removeEventLister(s), garbage collection...
        this.innerHTML = "";
    }
}

let mcPageNav;

if (!customElements.get("mc-page-nav")) {
    mcPageNav = customElements.define("mc-page-nav", McPageNav);
}

export default mcPageNav;
