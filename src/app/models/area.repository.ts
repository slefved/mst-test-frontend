import { Injectable } from "@angular/core";
import { AreaService } from "./area.service";
import { AreaDetail } from "./area.model";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AreaRepository {
  private areas: AreaDetail[];
  private areaListener = new Subject<{ total: number, areas: AreaDetail[] }>();
  constructor(private areaService: AreaService) { }

  getAreas(
    currentPage: number,
    pageSize: number,
    propinsi?:string,
    kabupaten?:string,
    keywords?:string) {

    let query = `?p=${ currentPage }&size=${ pageSize }`
    if (propinsi) {
      query = query + `&prop=${ propinsi }`;
    }
    if (kabupaten) {
      query = query + `&kab=${ kabupaten }`;
    }
    if (keywords) {
      query = query + `&k=${ keywords }`;
    }

    this.areaService.getAreas(query).subscribe(res => {
      this.areas = res.data.areas;
      this.areaListener.next({
        total: res.data.total,
        areas: [...this.areas]
      })
    })
  }

  getAreaListener() {
    return this.areaListener.asObservable()
  }

  getPropinsi() {
    return this.areaService.getPropinsi();
  }

  getKabupaten(propinsi: string) {
    return this.areaService.getKabupaten(propinsi);
  }
}
