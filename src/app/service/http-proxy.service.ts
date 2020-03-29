import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OfflineImpl } from '../clazz/offline.impl';
import { OnlineImpl } from '../clazz/online.impl';
import { INetworkService } from '../interfaze/commom.interface';
import { environment } from '../../environments/environment';
/**
 * proxy http to enalbe offline mode and mocking
 */
@Injectable({
  providedIn: 'root'
})
export class HttpProxyService {
  netImpl: INetworkService;
  inProgress = false;
  expireRefresh = false;
  constructor(private http: HttpClient) {
    if (environment.mode === 'offline') {
      this.netImpl = new OfflineImpl(this.http);
    } else {
      this.netImpl = new OnlineImpl(this.http);
    }
  }
}
