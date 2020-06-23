export interface ApiResult<T> {
  status: string;
  data: T;
  message: string;
}

export interface AreaList {
  total: number,
  areas: AreaDetail[]
}

export interface AreaDetail {
  kode_pos: string;
  kelurahan: string;
  kecamatan: string;
  jenis: string;
  kabupaten: string;
  propinsi: string;
}
