import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { MOCK_CONST } from '../constant/mock';
import { IMGList, INetworkService, IResource, ITokenResponse } from '../interfaze/commom.interface';
import { IForm } from 'magic-form/lib/classes/template.interface';
export class OfflineImpl implements INetworkService {
    keychainPayload: IMGList[];
    keychainLastUpdateAt: string;
    keychain: string;
    http: HttpClient;
    currentUserAuthInfo: ITokenResponse;
    private defaultDelay: number = 0;
    constructor(http: HttpClient) {
        this.http = http;
    }
    createResource(blob: IForm): Observable<IResource> {
        return of(<IResource>{ lastUpdateAt: 'mockDate', location: 'mockID' })
    };
    updateResource(blob: IForm, blobId: string, lastUpdateAt: string): Observable<IResource> {
        return of(<IResource>{ lastUpdateAt: 'mockDate' })
    };
    readResource(blobId: string): Observable<IResource> {
        return of(<IResource>{ lastUpdateAt: 'mockDate', blob: MOCK_CONST.USER_CREATION })
    };
    delteResource(blobId: string): Observable<never> {
        return of();
    };
    getToken(code: string): Observable<boolean> {
        this.currentUserAuthInfo = MOCK_CONST.MOCK_USER;
        return of(true).pipe(delay(this.defaultDelay))
    };
    getUserForms(): Observable<IResource> {
        return of(<IResource>{ lastUpdateAt: 'mockTime', blob: MOCK_CONST.FORM_LIST });
    };
    getFormDetails(formId: string): Observable<IResource> {
        return of(<IResource>{ lastUpdateAt: 'mockTime', blob: MOCK_CONST[formId] });
    };
    getKeyChain(): Observable<string> {
        // return throwError(new HttpErrorResponse({ status: 404 }));
        return of('keyChainId');
    };
    createKeyChain(): Observable<string> {
        return of('keyChainId');
    }
}