import { FormControl, FormGroup } from '@angular/forms';
export class UserConsole {
    private _id: string;
    public btnCtrl: FormControl;
    public consoleFG: FormGroup;
    public members: ConsoleBtn[];
    constructor(id: string, btns: ConsoleBtn[], systemFG?: FormGroup) {
        this._id = id;
        this.members = btns;
        this.btnCtrl = new FormControl();
        if (systemFG) {
            systemFG.addControl(this._id, this.btnCtrl);
        } else {
            // do nothing
        }
    }
    setStatus(btnName: ConsoleBtn, status: boolean) {
        // only one btn can be active
        this.members.forEach(each => {
            each.name === btnName.name ? each.status = status : each.status = false;
        });
        this._notify();
    }
    private _notify() {
        this.btnCtrl.setValue(this.getActiveMember() ? this.getActiveMember().name : undefined);
    }
    get(btnName: string): ConsoleBtn {
        return this.members.find(each => each.name === btnName);
    }
    reset() {
        this.members.forEach(each => {
            each.status = false;
        });
        this._notify();
    }
    getActiveMember(): ConsoleBtn {
        return this.members.find(each => each.status === true);
    }
    isMemberActive(name: string): boolean {
        return this.getActiveMember() ? this.getActiveMember().name === name : false;
    }
}
export class ConsoleBtn {
    public name: string;
    private _status = false;
    constructor(name: string, status?: boolean) {
        this.name = name;
        this.status = status;
    }
    set status(nextState: boolean) {
        this._status = nextState;
    }
    get status() {
        return this._status;
    }
    get nextState() {
        return !this.status;
    }
}
