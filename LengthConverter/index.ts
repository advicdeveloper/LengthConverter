import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { LengthConverterComponent, ILengthConverterProps } from "./LengthConverterComponent";

export class LengthConverter implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private notifyOutputChanged: () => void;
    private container: HTMLDivElement;
    private _currentValue: number | null;



    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary,
        container: HTMLDivElement
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
        this.container = container;
        this._currentValue = context.parameters.controlValue.raw;
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {
        const props: ILengthConverterProps = {
            value: context.parameters.controlValue.raw,
            onChange: this.onChange.bind(this),
            baseUnit: context.parameters.baseUnit.raw || 'm'
        };

        ReactDOM.render(
            React.createElement(LengthConverterComponent, props),
            this.container
        );
    }

    private onChange(newValue: number | null): void {
        this._currentValue = newValue;
        this.notifyOutputChanged();
    }

    public getOutputs(): IOutputs {
        return {
            controlValue: this._currentValue ?? undefined
        };
    }

    public destroy(): void {
        ReactDOM.unmountComponentAtNode(this.container);
    }
}
