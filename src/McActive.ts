/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-06-29 | @Updated: 2020-06-29
 * @Company: mConnect.biz | @License: MIT
 * @Description: mcActive
 */

class McActive extends HTMLElement {
    protected active: boolean;
    protected label: string;

    constructor() {
        super();
        // set the required attributes/props
        this.active = Boolean(this.getAttribute("active")) || false;
        this.label = this.getAttribute("label") || "No";
        // validate attributes
        this.renderComponent();
    }

    static get observedAttributes() {
        return ["active", "label"];
    }

    attributeChangedCallback(name: string, oldVal: string, newValue: string) {
        if (oldVal === newValue) {
            return;
        }
        this.renderComponent();
    }

    renderComponent(props = {label: this.Label, active: this.Active}) {
        let activeLabel;
        if (props.active) {
            activeLabel = `<span>${props.label} <i class="fa fa-check"></i></span>`;
        } else {
            activeLabel = `<span>${props.label} <i class="fa fa-power-off"></i></span>`;
        }

        this.innerHTML = activeLabel;
    }

    disconnectedCallback() {
        // cleanup - reset DOM, removeEventLister(s), garbage collection...
        this.innerHTML = "";
    }

    get Active() {
        return this.active;
    }

    set Active(value: boolean) {
        this.active = value;
        this.setAttribute("active", value.toString());
    }

    get Label() {
        return this.label;
    }

    set Label(value: string) {
        this.label = value;
        this.setAttribute("label", value);
    }
}

let mcActive;

if (!customElements.get("mc-active")) {
    mcActive = customElements.define("mc-active", McActive);
}

export default mcActive;
