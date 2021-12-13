/**
 * @Author: abbeymart | Abi Akindele | @Created: 2019-06-25 | @Updated: 2020-07-01
 * @Company: mConnect.biz | @License: MIT
 * @Description: mc-page-nav, page navigation (numbering, first, last, previous and next)
 */

import PageNavTemplate from "./templates/PageNavTemplate";
import { dtstore } from "./dtStore";
import { PageNavPropsType } from "./types";

class McPageNav extends HTMLElement {
    constructor() {
        super();
        // render component
        this.renderComponent();
    }

    static get observedAttributes() {
        return ["currentpage", "pagelimit", "datatotal"];
    }

    attributeChangedCallback(name: string, oldVal: string, newValue: string) {
        if (oldVal === newValue) {
            return;
        }
        this.renderComponent();
    }

    // getters and setters
    get pagePosition(): string {
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

    set pageLimit(value: number) {
        // set from the parent component (mc-data-table) & dtstore
        this.setAttribute("pagelimit", value.toString());
    }

    get currentPage(): number {
        return dtstore.CurrentPage;
    }

    set currentPage(value: number) {
        // set from the controlling component (mc-page-nav)
        dtstore.CurrentPage = value;
        this.setAttribute("currentpage", value.toString());
    }

    get dataTotal(): number {
        return dtstore.DataTotal;
    }

    set dataTotal(value: number) {
        // set from the parent component (mc-data-table) & dtstore
        this.setAttribute("datatotal", value.toString());
    }

    renderComponent(props: PageNavPropsType = {
        currentPage    : this.currentPage,
        lastPage       : this.lastPage,
        pageList       : this.pageList,
    }) {
        if (dtstore.DataTotal > 0) {
            this.innerHTML = PageNavTemplate(props);
        }
        // event"s handlers | to set the mc-page-limit-value
        const pageNavFirst  = document.getElementById("mc-page-nav-first");
        if (pageNavFirst  && (typeof this.pageNavFirst === "function")) {
            pageNavFirst .onclick = (e) => {
                e.preventDefault();
                // const value = pageLimitDom.options[pageLimitDom.selectedIndex].value;
                this.pageNavFirst();
            }
        }
        const pageNavNext = document.getElementById("mc-page-nav-next");
        if (pageNavNext && (typeof this.pageNavNext === "function")) {
            pageNavNext.onclick = (e) => {
                e.preventDefault();
                this.pageNavNext();
            }
        }
        const pageNavPrevious = document.getElementById("mc-page-nav-previous");
        if (pageNavPrevious && (typeof this.pageNavPrevious === "function")) {
            pageNavPrevious.onclick = (e) => {
                e.preventDefault();
                this.pageNavPrevious();
            }
        }
        const pageNavLast = document.getElementById("mc-page-nav-last");
        if (pageNavLast && (typeof this.pageNavLast === "function")) {
            pageNavLast.onclick = (e) => {
                e.preventDefault();
                this.pageNavLast();
            }
        }
        const pageNavNumber: any = document.getElementsByClassName("mc-page-nav-current");
        if (pageNavNumber && pageNavNumber.length > 0) {
            for (const domItem of pageNavNumber) {
                domItem.onclick = (e: any) => {
                    e.preventDefault();
                    const domItemValue = e.target.getAttribute("data-mc-page-num");
                    this.pageNavNumber(domItemValue);
                }
            }
        }
    }

    // methods:
    setCurrentPage(value: number) {
        this.currentPage = value;
    }

    pageNavFirst() {
        // store / emit event, for other sub-components
        dtstore.PagePosition = "first-page";
        this.setCurrentPage(1);
    }

    pageNavPrevious() {
        // store / emit event, for other sub-components
        dtstore.PagePosition = "previous-page";
        this.setCurrentPage(this.currentPage - 1);
    }

    pageNavNext() {
        // store / emit event, for other sub-components
        dtstore.PagePosition = "next-page";
        this.setCurrentPage(this.currentPage + 1);
    }

    pageNavLast() {
        // store / emit event, for other sub-components
        dtstore.PagePosition = "last-page";
        this.setCurrentPage(Math.ceil(this.dataTotal / this.pageLimit));
    }

    pageNavNumber(page: string | number) {
        dtstore.PagePosition = "page-number";
        this.setCurrentPage(Number(page));
    }

    disconnectedCallback() {
        // cleanup - reset DOM, removeEventLister(s), garbage collection...
        this.innerHTML = "";
    }
}

// let mcPageNav;

if (!customElements.get("mc-page-nav")) {
    customElements.define("mc-page-nav", McPageNav);
}

// export default mcPageNav;
