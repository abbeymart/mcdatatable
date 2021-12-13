/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-06-29 | @Updated: 2020-06-29
 * @Company: mConnect.biz | @License: MIT
 * @Description: mcUpdate
 */

// imports
import { ItemValueType } from "./types";

class McUpdate extends HTMLElement {
    protected item: ItemValueType;
    protected label: string;

    constructor() {
        super();
        // set the required attributes/props
        this.label = this.getAttribute("label") || "Update";
        this.item = {};
        // validate attributes
        this.renderComponent();
    }

    static get observedAttributes() {
        return ["label", "item"];
    }

    attributeChangedCallback(name: string, oldVal: string, newValue: string) {
        if (oldVal === newValue) {
            return;
        }
        this.renderComponent();
    }

    renderComponent() {
        this.innerHTML = `
        <a href="#" id="mc-update-action">
            ${this.Label}<i class="fa fa-edit"></i>
        </a>`;

        // event action (itemAction(itemId)) | set from parent component(mc-table)

        // const itemDomRef = document.getElementById("mc-update-action");
        // if (itemDomRef && this.Action && (typeof this.Action === "function") && !isEmptyObject(this.Item)) {
        //     itemDomRef.onclick = (e) => {
        //         e.preventDefault();
        //         this.Action(this.Item);
        //     }
        // }
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


    get Item(): ItemValueType {
        return this.item;
    }

    set Item(value: ItemValueType) {
        this.item = value;
        this.setAttribute("item", JSON.stringify(value));
    }
}

if (!customElements.get("mc-update")) {
    customElements.define("mc-update", McUpdate);
}
