import { Component, OnInit, OnDestroy } from "@angular/core";
import { AreaRepository } from "../models/area.repository";
import { AreaDetail } from "../models/area.model";
import { Subscription } from "rxjs";

@Component({
  selector: "area-list",
  templateUrl: "./area-list.component.html"
})
export class AreaListComponent implements OnInit, OnDestroy {
  areas: AreaDetail[] = [];
  areaSubscriber: Subscription;

  // pagination
  currentPage = 1;
  pageSize = 10;
  totalItem: number;
  totalPage: number;

  isLoading = false;

  // search
  propinsiList: string[];
  kabupatenList: string[];

  selectedPropinsi = "";
  selectedKabupaten = "";
  keywords: string;

  constructor(private areaRepository: AreaRepository) { }

  ngOnInit() {
    this.areaRepository.getAreas(this.currentPage, this.pageSize);
    this.isLoading = true;
    this.areaRepository.getPropinsi().subscribe(res => {
      this.propinsiList = res.data;
      this.isLoading = false;
    })
    this.areaSubscriber = this.areaRepository.getAreaListener().subscribe(res => {
      this.totalItem = res.total;
      this.areas = res.areas;
      this.totalPage = Math.ceil(this.totalItem / this.pageSize);
      this.isLoading = false;
    })
  }

  onSearch() {
    this.isLoading = true;
    this.currentPage = 1;
    this.areaRepository.getAreas(this.currentPage, this.pageSize, this.selectedPropinsi, this.selectedKabupaten, this.keywords);
  }

  onNextPage() {
    this.isLoading = true;
    this.areaRepository.getAreas(++this.currentPage, this.pageSize, this.selectedPropinsi, this.selectedKabupaten, this.keywords);
  }
  onPrevPage() {
    this.isLoading = true;
    this.areaRepository.getAreas(--this.currentPage, this.pageSize, this.selectedPropinsi, this.selectedKabupaten, this.keywords);
  }

  onPropinsiChange() {
    if (this.selectedPropinsi) {
      this.areaRepository.getKabupaten(this.selectedPropinsi).subscribe(res => {
        this.kabupatenList = res.data;
      });
    } else {
      this.kabupatenList = [];
      this.selectedKabupaten = "";
    }
  }

  ngOnDestroy() {
    this.areaSubscriber.unsubscribe();
  }
}
