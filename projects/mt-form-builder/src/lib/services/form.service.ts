import { FormControl, FormGroup } from "@angular/forms";
import { IInputConfig } from "../classes/template.interface";
import { Utility } from "./utility";

export class FormService {
    public parseRadioInput(input: IInputConfig): FormGroup {
        if (Utility.notEmpty(input.options)) {
            const control = new FormControl();
            const fg = {};
            fg[input.key] = new FormControl();
            const fgcr = new FormGroup(fg)
            control.setParent(fgcr);
            return new FormGroup({
                
            })
        }
        throw new Error("option cannot be empty");
    }
}