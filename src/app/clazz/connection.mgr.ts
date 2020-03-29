import { TempWorker } from './temp.worker';

/**
 * @description manager connections between inputs
 */
export class ConnectionMgr {
    private _connections: {};
    private _connectionResultKeys: string[] = [];
    public singleObjs: { [key: string]: any };
    private _tempWorker: TempWorker;
    constructor(singles: { [key: string]: any }, tempWorker: TempWorker) {
        this.singleObjs = singles;
        this._tempWorker = tempWorker;
    }
    get connectionKeys() {
        return this._connectionResultKeys;
    }
    public generate(extraInfo?: string[]) {
        /**
         * connect two inputs
         */
        if (this.singleObjs.length > 1) {
            this._connections = this._tempWorker.genSingleCon(this.singleObjs[0], this.singleObjs[1], extraInfo);
            this._connections = Object.assign(this._connections,
                this._tempWorker.genSingleCon(this.singleObjs[1], this.singleObjs[0], extraInfo));
        } else {
            window.alert('Please select two inputs');
        }
        this._connectionResultKeys = Object.keys(this._connections);
    }
    /**
     * @description Add connections to JSON, individual BR
     */
    public addConnection(key: string) {
        this._tempWorker.updateJSON(this._connections[key]);
    }
}
