import TooltipOptions from './Interfaces/TooltipOptions';

export default class Tooltip {
    guid: string;
    el: HTMLDivElement;
    // where tooltip div element is going to be appended
    container: HTMLElement = document.body;

    StyleSheets: object = {
        tooltip_class: "di-tooltip",
        tooltip_visible_class: "di-tooltip-open"
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

    private calcCoordinates(el: HTMLElement) {
        var box = el.getBoundingClientRect();

        var body = document.body;
        var docEl = document.documentElement;

        var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
        var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

        var clientTop = docEl.clientTop || body.clientTop || 0;
        var clientLeft = docEl.clientLeft || body.clientLeft || 0;

        var top = box.top + scrollTop - clientTop;
        var left = box.left + scrollLeft - clientLeft;

        return { top: Math.round(top), left: Math.round(left), width: box.width, height: box.height };
    }

    private getTargetPosition(): object {
        let el = this.calcCoordinates(this.defaults.target);

        return {
            top: el.top,
            left: el.left,
            w: el.width,
            h: el.height
        }
    }

    private calcOffsets(placement: string, position: object) {
        let actualHeight = this.el.getBoundingClientRect()["height"], actualWidth = this.el.getBoundingClientRect()["width"];

        switch(placement) {
            case "top":
                return {
                    top: (position["top"] - actualHeight) - 10,
                    left: position["left"] - position["w"] / 2 - actualWidth / 2,
                    h: actualHeight
                }
            case "left":
                return {
                    top: position["top"] + position["height"] / 2 - actualHeight / 2,
                    left: (position["left"] - actualWidth) - 10,
                    h: actualHeight
                }
            case "bottom":
                return {
                    top: (position["top"] + position["height"]) + 10,
                    left: position["left"] + position["w"] / 2 - actualWidth / 2,
                    h: actualHeight
                }
            case "right":
                return {
                    top: position["top"] + position["height"] / 2 - actualHeight / 2,
                    left: position["left"] + position["w"] + 10,
                    h: actualHeight
                }
        }
    }

    private createElement(): void {
        this.el = document.createElement("div");

        // add the css class
        this.el.classList.add(this.StyleSheets["di-tooltip"]);

        /**
         * Get the default or the user preference HTML here
         */
        this.el.innerHTML = this.defaults.contentHTML();

        /**
         * And now appent it before showing up, 
         * so we can calculate offsetTop based on the height of the element
         */
        this.container.appendChild(this.el);

        let placement = this.defaults.position,
            elPosition = this.getTargetPosition(),
            calculatedOffsets = this.calcOffsets(placement, elPosition);

        /**
         * Add calculated top, left and height to the tooltip itself
         */
        this.el.style.top = calculatedOffsets.top + "px";
        this.el.style.left = calculatedOffsets.left + "px";
        this.el.style.height = calculatedOffsets.h + "px";
    };

    private show() {
        this.createElement();

        this.el.addEventListener("click", ev => {
            ev.stopPropagation();
        });

        /**
         * Add the css class to show the tooltip
         */
        this.el.classList.add(this.StyleSheets["di-tooltip-open"]);
    };

    private destroy() {

    };

    // used by "click" event
    private toggle(ev: MouseEvent) {
        ev.stopPropagation();

        // add click event to destroy the tooltip if clicked outside him
        document.addEventListener("click", ev => {
            this.destroy();
        });
    }
}