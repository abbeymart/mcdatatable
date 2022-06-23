import {PageNavPropsType} from "../types";

export default (props: PageNavPropsType) => {
    const firstPageDom = `<a href="#" class="w3-button w3-border w3-round-medium w3-hover-blue"
               id="mc-page-nav-first">First</a>`;
    const previousPageDom = `<a href="#" class="w3-button w3-border w3-round-medium w3-hover-blue"
               id="mc-page-nav-previous">Previous</a>`;
    const middlePagesDom = (page: string) => `
                     <a href="#" class="mc-page-nav-current w3-button w3-border w3-round-medium w3-hover-blue" id="${page}" data-mc-page-num="${page}">
                         ${props.currentPage.toString() === page ? `<span class="mc-current-page">${page}</span>` : `<span>${page}</span>`}           
                     </a>`;
    const nextPageDom = `<a href="#" class="w3-button w3-border w3-round-medium w3-hover-blue"
               id="mc-page-nav-first">Next</a>`;
    const lastPageDom = `<a href="#" class="w3-button w3-border w3-round-medium w3-hover-blue"
               id="mc-page-nav-first">Last</a>`;
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
