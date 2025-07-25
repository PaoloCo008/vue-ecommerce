export interface Province {
  province_code: string
  province_name: string
  psgc_code: string
  region_code: string
}

export interface Ward {
  brgy_code: string
  brgy_name: string
  city_code: string
  province_code: string
  region_code: string
}

export interface District {
  city_code: string
  city_name: string
  province_code: string
  psgc_code: string
  region_desc: string
}
