import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { ApiResult, AreaList } from "./area.model";

@Injectable({
  providedIn: "root"
})
export class AreaService {
  constructor(private http: HttpClient) { }

  getAreas(query?: string) {
    return this.http.get<ApiResult<AreaList>>("http://mitrasolusi-env.eba-zjq2m2px.us-east-2.elasticbeanstalk.com/api/kodepos" + query);
  }

  getPropinsi() {
    return this.http.get<ApiResult<string[]>>("http://mitrasolusi-env.eba-zjq2m2px.us-east-2.elasticbeanstalk.com/api/kodepos/propinsi");
  }

  getKabupaten(propinsi: string) {
    return this.http.get<ApiResult<string[]>>("http://mitrasolusi-env.eba-zjq2m2px.us-east-2.elasticbeanstalk.com/api/kodepos/kabupaten/" + propinsi);
  }
}
