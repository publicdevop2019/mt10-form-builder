import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { IEvent } from '../classes/template.interface';
/**
 * @description inculdes single & group event observable
 *
 */
@Injectable({
    providedIn: 'root'
})
export class BaseService {
    public sub: ReplaySubject<IEvent> = new ReplaySubject();
    public nextProxy(e: IEvent) {
        this.sub.next(e);
    }
    /** @description reset replaySub in */
    public reset() {
        this.sub = new ReplaySubject();
    }
}
