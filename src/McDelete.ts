/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-06-29 | @Updated: 2020-06-29
 * @Company: mConnect.biz | @License: MIT
 * @Description: mcDelete
 */

// imports
import { DeleteTaskFunctionType } from "./types";

class McDelete extends HTMLElement {
    protected action: DeleteTaskFunctionType;
    protected itemId: string;
    protected label: string;

    constructor() {
        super();
        // set the required attributes/props
        this.label = this.getAttribute("label") || "Delete";
        this.action = () => null;
        this.itemId = this.getAttribute("itemid") || "";
        // validate attributes
        this.renderComponent();
    }

    static get observedAttributes() {
        return ["label", "action", "itemid"];
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
        <a href="#" id="mc-delete-action">
            ${this.label}<i class="fa fa-times-circle"></i>
        </a>`;

        // event action (itemAction(itemId))
        const itemDomRef = document.getElementById("mc-delete-action");
        if (itemDomRef && this.Action && (typeof this.Action === "function") && this.ItemId) {
            itemDomRef.onclick = (e) => {
                e.preventDefault();
                this.Action(this.ItemId);
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

    set Action(value: DeleteTaskFunctionType) {
        this.action = value;
        this.setAttribute("action", "new-action-value");
    }

    get ItemId() {
        return this.itemId;
    }

    set ItemId(value: string) {
        this.itemId = value;
        this.setAttribute("itemid", value);
    }
}

let mcDelete;

if (!customElements.get("mc-delete")) {
    mcDelete = customElements.define("mc-delete", McDelete);
}

export default mcDelete;
