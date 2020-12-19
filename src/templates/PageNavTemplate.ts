/**
 * @Author: abbeymart | Abi Akindele | @Created: 2019-06-24 | @Updated: 2020-07-01
 * @Company: mConnect.biz | @License: MIT
 * @Description: mc-datatable-template
 */
import { PageNavPropsType } from "../types";

export default (props: PageNavPropsType) => {
    const firstPageDom = `<a href="#" class="w3-button w3-border w3-round-medium w3-hover-blue"
               id="mc-page-nav-first" onclick="props.pageNavFirst()">First</a>`;
    const previousPageDom = `<a href="#" class="w3-button w3-border w3-round-medium w3-hover-blue"
               id="mc-page-nav-previous">Previous</a>`;
    const middlePagesDom = (page: string) => `
                     <a href="#" class="mc-current-page-item w3-button w3-border w3-round-medium w3-hover-blue" id="${page}" data-mc-page-num="${page}">
                         ${props.currentPage.toString() === page ?
        `<span class="mc-current-page">${page}</span>` :
        `<span>${page}</span>`}           
                     </a>`;
    const nextPageDom = `<a href="#" class="w3-button w3-border w3-round-medium w3-hover-blue"
               id="mc-page-nav-first" onclick="props.pageNavNext()">Next</a>`;
    const lastPageDom = `<a href="#" class="w3-button w3-border w3-round-medium w3-hover-blue"
               id="mc-page-nav-first" onclick="props.pageNavLast()">Last</a>`;
    return `
        <div class="w3-bar" id="mcPageNav">
            <span></span>
            ${(props && props.currentPage > 1 && props.lastPage > 1) ? firstPageDom : ``}
            ${(props && props.currentPage > 1) ? previousPageDom : ``}
            ${props && props.pageList.map(page => middlePagesDom(page)).join(" ")}
            ${(props && props.currentPage < props.lastPage && props.lastPage > 1) ? nextPageDom : ``}
            ${(props && props.currentPage < props.lastPage) ? lastPageDom : ``}
            <style>
                #mcPageNav a {
                    color: #0D47A1;
                }
                #mcPageNav a:hover {
                    font-weight: bolder;
                    background-color: #0D47A1;
                }
                #mcPageNav a:active {
                    font-weight: bolder;
                    background-color: #0c5460;
                }
                .mc-current-page {
                    font-weight: bolder;
                    text-decoration: underline;
                }
            </style>
        </div>
    `;
};
