import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { ApiResult, AreaList } from "./area.model";

@Injectable({
  providedIn: "root"
})
export class AreaService {
  constructor(private http: HttpClient) { }

  getAreas(query?: string) {
    return this.http.get<ApiResult<AreaList>>("http://localhost:3000/api/kodepos" + query);
  }

  getPropinsi() {
    return this.http.get<ApiResult<string[]>>("http://localhost:3000/api/kodepos/propinsi");
  }

  getKabupaten(propinsi: string) {
    return this.http.get<ApiResult<string[]>>("http://localhost:3000/api/kodepos/kabupaten/" + propinsi);
  }
}
