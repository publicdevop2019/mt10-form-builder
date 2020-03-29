import { Observable } from 'rxjs';
import { IForm } from 'magic-form/lib/classes/template.interface';

// regulate interface
export interface INetworkService {
    currentUserAuthInfo: ITokenResponse;
    keychain: string;
    keychainPayload: IMGList[];
    keychainLastUpdateAt: string;
    getToken: (code: string) => Observable<boolean>;
    getKeyChain: () => Observable<string>;
    createKeyChain: () => Observable<string>;
    getUserForms: () => Observable<IResource>;
    getFormDetails: (formId: string) => Observable<IResource>;
    createResource: (blob: IForm) => Observable<IResource>;
    updateResource: (blob: IForm | IMGList[], blobId: string, lastUpdateAt: string) => Observable<IResource>;
    readResource: (blobId: string) => Observable<IResource>;
    delteResource: (blobId: string) => Observable<never>;
}
export interface ITokenResponse {
    access_token: string;
    refresh_token?: string;
    token_type?: string;
    expires_in?: string;
    scope?: string;
}
export interface IMGList {
    id: string;
    desc: string
}
export interface IResource {
    location?: string,
    lastUpdateAt: string,
    blob?: any
}