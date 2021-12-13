/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-06-29 | @Updated: 2020-06-29
 * @Company: mConnect.biz | @License: MIT
 * @Description: mcDelete
 */

class McDelete extends HTMLElement {
    protected itemId: string;
    protected label: string;

    constructor() {
        super();
        // set the required attributes/props
        this.label = this.getAttribute("label") || "Delete";
        this.itemId = this.getAttribute("itemid") || "";
        // validate attributes
        this.renderComponent();
    }

    static get observedAttributes() {
        return ["label", "itemid"];
    }

    attributeChangedCallback(name: string, oldVal: string, newValue: string) {
        if (oldVal === newValue) {
            return;
        }
        this.renderComponent();
    }

    renderComponent() {
        this.innerHTML = `
        <a href="#" id="mc-delete-action">
            ${this.Label}<i class="fa fa-times-circle"></i>
        </a>`;

        // event action (itemAction(itemId)) | set from parent component(mc-table)

    }

    disconnectedCallback() {
        // cleanup - reset DOM, removeEventLister(s), garbage collection...
        this.innerHTML = "";
    }

    get Label(): string {
        return this.label;
    }

    set Label(value: string) {
        this.label = value;
        this.setAttribute("label", value);
    }

    get ItemId(): string {
        return this.itemId;
    }

    set ItemId(value: string) {
        this.itemId = value;
        this.setAttribute("itemid", value);
    }
}

if (!customElements.get("mc-delete")) {
    customElements.define("mc-delete", McDelete);
}
