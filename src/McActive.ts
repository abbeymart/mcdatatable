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

    attributeChangedCallback(name: string, oldVal: string | boolean, newValue: string | boolean) {
        if (oldVal === newValue) {
            return;
        }
        switch (name) {
            case "label":
                this.renderComponent({label: newValue as string, active: this.active});
                break;
            case "active":
                this.renderComponent({label: this.label, active: Boolean(newValue)});
                break;
        }
    }

    renderComponent(props = {label: this.label, active: this.active}) {
        let activeLabel;
        if (props.active) {
            activeLabel = `<span>${props.label} <i class="fa fa-check"></i></span>`;
        } else {
            activeLabel = `<span>${props.label} <i class="fa fa-power-off"></i></span>`;
        }

        this.innerHTML = activeLabel;
    }

    get mcActive() {
        return this.active;
    }

    set mcActive(value: boolean) {
        this.active = value;
        this.setAttribute("active", value.toString());
    }

    get mcLabel() {
        return this.label;
    }

    set mcLabel(value: string) {
        this.label = value;
        this.setAttribute("label", value);
    }
}

let mcActive;

if (!customElements.get("mc-active")) {
    mcActive = customElements.define("mc-active", McActive);
}

export default mcActive;
