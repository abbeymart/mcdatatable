/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-06-29 | @Updated: 2020-06-29
 * @Company: mConnect.biz | @License: MIT
 * @Description: mcDelete
 */

// types
import {DeleteTaskFunctionType, ValueType} from "./types";

class McDelete extends HTMLElement {
    protected action: DeleteTaskFunctionType;
    protected itemId: string;
    protected label: string = "";
    constructor() {
        super();
        // set the required attributes/props
        this.label = this.getAttribute("label") || "Update";
        this.action = () => null;
        this.itemId = this.getAttribute("itemid") || "";
        // validate attributes
        this.renderComponent();
    }

    static get observedAttributes() {
        return ["label"];
    }

    attributeChangedCallback(name: string, oldVal: string, newValue: string) {
        if (oldVal === newValue) {
            return;
        }
        if (name === "label") {
            this.renderComponent({label: newValue, action: this.action, itemId: this.itemId});
        }
    }

    renderComponent(props = {label: this.label, action: this.action, itemId: this.itemId}) {
        this.innerHTML = `
        <a href="#" id="mc-delete-action">
            ${props.label}<i class="fa fa-times-circle"></i>
        </a>`;

        // event action (itemAction(itemId))
        const itemDomRef = document.getElementById("mc-delete-action");
        if (itemDomRef && props.action && (typeof props.action === "function") && props.itemId) {
            itemDomRef.onclick = (e) => {
                e.preventDefault();
                props.action(props.itemId);
            }
        }
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

    set mcAction(value: DeleteTaskFunctionType) {
        this.action = value;
        this.setAttribute("action", "new-action-value");
    }

    get mcItemId() {
        return this.itemId;
    }

    set mcItemId(value: string) {
        this.itemId = value;
        this.setAttribute("itemid", value);
    }
}

let mcDelete;

if (!customElements.get("mc-delete")) {
    mcDelete = customElements.define("mc-delete", McDelete);
}

module.exports = mcDelete;
