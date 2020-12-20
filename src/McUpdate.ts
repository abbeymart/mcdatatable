/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-06-29 | @Updated: 2020-06-29
 * @Company: mConnect.biz | @License: MIT
 * @Description: mcUpdate
 */

// imports
import { ItemValueType, UpdateTaskFunctionType } from "./types";
import { isEmptyObject } from "./helper";

class McUpdate extends HTMLElement {
    protected action: UpdateTaskFunctionType;
    protected item: ItemValueType;
    protected label: string;

    constructor() {
        super();
        // set the required attributes/props
        this.label = this.getAttribute("label") || "Update";
        this.action = (val: ItemValueType) => null;
        this.item = {};
        // validate attributes
        this.renderComponent();
    }

    static get observedAttributes() {
        return ["label", "action", "item"];
    }

    attributeChangedCallback(name: string, oldVal: string, newValue: string) {
        if (name === "action") {
            this.renderComponent();
        }

        if (oldVal === newValue) {
            return;
        }
        this.renderComponent();
    }

    renderComponent(props = {label: this.Label}) {
        this.innerHTML = `
        <a href="#" id="mc-update-action">
            ${this.label}<i class="fa fa-edit"></i>
        </a>`;

        // event action (itemAction(itemId))
        const itemDomRef = document.getElementById("mc-update-action");
        if (itemDomRef && this.Action && (typeof this.Action === "function") && !isEmptyObject(this.Item)) {
            itemDomRef.onclick = (e) => {
                e.preventDefault();
                this.Action(this.Item);
            }
        }
    }

    disconnectedCallback() {
        // cleanup - reset DOM, removeEventLister(s), garbage collection...
        this.innerHTML = "";
    }

    get Label() {
        return this.label;
    }

    set Label(value: string) {
        this.label = value;
        this.setAttribute("label", value);
    }

    get Action() {
        return this.action;
    }

    set Action(value: UpdateTaskFunctionType) {
        this.action = value;
        this.setAttribute("action", "new-action-value");
    }

    get Item() {
        return this.item;
    }

    set Item(value: object) {
        this.item = value;
        this.setAttribute("item", JSON.stringify(value));
    }
}

let mcUpdate;

if (!customElements.get("mc-update")) {
    mcUpdate = customElements.define("mc-update", McUpdate);
}

export default mcUpdate;
