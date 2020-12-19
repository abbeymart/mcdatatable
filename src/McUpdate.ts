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
            this.renderComponent({label: this.Label, action: this.Action, item: this.Item});
        }

        if (oldVal === newValue) {
            return;
        }
        this.renderComponent({label: this.Label, action: this.Action, item: this.Item});
    }

    renderComponent(props = {label: this.Label, action: this.Action, item: this.Item}) {
        this.innerHTML = `
        <a href="#" id="mc-update-action">
            ${props.label}<i class="fa fa-edit"></i>
        </a>`;

        // event action (itemAction(itemId))
        const itemDomRef = document.getElementById("mc-update-action");
        if (itemDomRef && props.action && (typeof props.action === "function") && !isEmptyObject(props.item)) {
            itemDomRef.onclick = (e) => {
                e.preventDefault();
                props.action(props.item);
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
