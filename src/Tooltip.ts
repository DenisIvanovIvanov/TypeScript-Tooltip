import TooltipOptions from './Interfaces/TooltipOptions';

export default class Tooltip {
    guid: string;
    el: HTMLDivElement;

    StyleSheets: object = {
        tooltip_class: "",
        tooltip_visible_class: ""
    };

    defaults: TooltipOptions = {
        target: document.getElementsByTagName("body")[0],
        position: "top",
        trigger: "hover",
        contentHTML: (): string => {
            return "<p>Test</p>"
        }
    };

    constructor(options: TooltipOptions) {
        // override user options with defaults
        this.defaults = Object.assign(this.defaults, options);

        // add event listeners to the target
        this.attachEventListeners();
    };

    private attachEventListeners(): void {
        let self = this;

        // based on user preferences or the default if no supplied
        switch(this.defaults.trigger) {
            case "hover":
                // on mouse enter show
                self.defaults.target.addEventListener("mouseenter", self.show);
                
                // on mouse leave destroy the tooltip
                self.defaults.target.addEventListener("mouseleave", self.destroy);
                break;
            case "click":
                self.defaults.target.addEventListener("click", self.toggle);
                break;
        };
    };

    private createElement(): void {
        this.el = document.createElement("div");
    };

    private show() {
        
    };

    private destroy() {

    };

    // used by "click" event
    private toggle() {

    }
}