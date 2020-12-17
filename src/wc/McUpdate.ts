/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-06-29 | @Updated: 2020-06-29
 * @Company: mConnect.biz | @License: MIT
 * @Description: mcUpdate
 */

// types
import {UpdateTaskFunctionType, ValueType} from "./types";

class McUpdate extends HTMLElement {
    protected action: UpdateTaskFunctionType;
    protected item: object;
    protected label: string = '';

    constructor() {
        super();
        // set the required attributes/props
        this.label = this.getAttribute('label') || 'Update';
        this.action = () => null;
        this.item = {};
        // validate attributes
        this.renderComponent();
    }

    static get observedAttributes() {
        return ['label'];
    }

    attributeChangedCallback(name: string, oldVal: ValueType, newValue: ValueType) {
        if (oldVal === newValue) {
            return;
        }
        if (name === 'label') {
            this.renderComponent({label: newValue as string, action: this.action, item: this.item});
        }
    }

    renderComponent(props = {label: this.label, action: this.action, item: this.item}) {
        this.innerHTML = `
        <a href="#" id="mc-update-action">
            ${props.label}<i class="fa fa-edit"></i>
        </a>`;

        // event action (itemAction(itemId))
        const itemDomRef = document.getElementById('mc-update-action');
        if (itemDomRef && props.action && (typeof props.action === 'function') && Object.keys(props.item).length) {
            itemDomRef.onclick = (e) => {
                e.preventDefault();
                props.action(props.item);
            }
        }
    }

    get mcLabel() {
        return this.label;
    }

    set mcLabel(value: string) {
        this.label = value;
        this.setAttribute('label', value);
    }

    get mcAction() {
        return this.action;
    }

    set mcAction(value: UpdateTaskFunctionType) {
        this.action = value;
        this.setAttribute('action', 'new-action-value');
    }

    get mcItem() {
        return this.item;
    }

    set mcItem(value: object) {
        this.item = value;
        this.setAttribute('item', 'new-item-value');
    }
}

let mcUpdate;

if (!customElements.get('mc-update')) {
    mcUpdate = customElements.define('mc-update', McUpdate);
}

module.exports = mcUpdate;
