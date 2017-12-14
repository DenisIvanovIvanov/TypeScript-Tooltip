import TooltipOptions from './Interfaces/TooltipOptions';

export default class Tooltip {

    defaults: TooltipOptions = {
        target: document.getElementsByTagName("body")[0],
        position: "top",
        trigger: "hover",
        contentHTML: () => {
            return "<p>Test</p>"
        }
    }

    el: HTMLDivElement;

    constructor(options: TooltipOptions) {
        // override user options with defaults
        this.defaults = Object.assign(this.defaults, options);

        this.show();
    }

    createElement() {
        this.el = document.createElement("div");
    }

    show() {

    }

    destroy() {

    }
}