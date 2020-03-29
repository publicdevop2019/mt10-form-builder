import { INetworkService, ITokenResponse, IMGList, IResource } from '../interfaze/commom.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, never } from 'rxjs';
import { environment } from '../../environments/environment';
import { CONST } from '../constant/constant';
import { IForm } from 'mt-form-builder/lib/classes/template.interface';

export class OnlineImpl implements INetworkService {
    keychainPayload: IMGList[];
    keychainLastUpdateAt: string;
    keychain: string;
    currentUserAuthInfo: ITokenResponse;
    constructor(private http: HttpClient) {
    }
    getToken(code: string): Observable<boolean> {
        let header = new HttpHeaders().append('Authorization', 'Basic ' + btoa(CONST.APP_ID + ':' + CONST.APPP_SECRET_PUBLIC));
        const formData = new FormData();
        formData.append('grant_type', 'authorization_code');
        formData.append('code', code);
        formData.append('redirect_uri', environment.oauthRedirectUri);
        return new Observable<boolean>(e => {
            this.http.post<ITokenResponse>(environment.getTokenUri, formData, { headers: header }).subscribe(next => {
                this.currentUserAuthInfo = next;
                e.next(true);
            }, error => {
                e.next(false);
                // @todo rediret to error page
            });
        });
    }
    createResource(blob: IForm): Observable<IResource> {
        return new Observable<IResource>(e => {
            this.http.post(environment.resourceUri, blob, { observe: 'response' }).subscribe(next => {
                e.next(<IResource>{ location: next.headers.get('location'), lastUpdateAt: next.headers.get('lastupdateat') });
            });
        })
    };
    updateResource(blob: IForm, blobId: string, lastUpdateAt: string): Observable<IResource> {
        const httpOptions = {
            headers: new HttpHeaders({ 'lastupdateat': lastUpdateAt }),
            observe: 'response' as 'response',
        };
        return new Observable<IResource>(e => {
            this.http.put(environment.resourceUri + '/' + blobId, blob, httpOptions).subscribe(next => {
                e.next(<IResource>{ lastUpdateAt: next.headers.get('lastupdateat') });
            });
        })
    };
    readResource(blobId: string): Observable<IResource> {
        return new Observable<IResource>(e => {
            this.http.get<any>(environment.resourceUri + '/' + blobId, { observe: 'response' }).subscribe(next => {
                e.next(<IResource>{ lastUpdateAt: next.headers.get('lastupdateat'), blob: next.body });
            });
        })
    };
    delteResource(blobId: string): Observable<never> {
        return new Observable<never>(e => {
            this.http.delete<void>(environment.resourceUri + '/' + blobId).subscribe(next => {
                e.next();
            });
        })

    };
    createKeyChain(): Observable<string> {
        return new Observable<string>(e => {
            this.http.post<void>(environment.keyChainUri, null, { observe: 'response' }).subscribe(next => {
                e.next(next.headers.get('location'));
            });
        })
    };
    getKeyChain(): Observable<string> {
        return new Observable<string>(e => {
            this.http.get<void>(environment.keyChainUri, { observe: 'response' }).subscribe(next => {
                e.next(next.headers.get('location'));
            }, error => {
                e.error(error)
            });
        })
    };
    getUserForms(): Observable<IResource> {
        return this.readResource(this.keychain)
    };
    getFormDetails(formId: string): Observable<IResource> {
        return this.readResource(formId)
    };
}