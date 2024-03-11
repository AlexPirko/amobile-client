export interface IGoodsUnit {
  id: number
  goods_model: string
  price: number
  vendor_code: string
  name: string
  description: string
  images: string
  in_stock: number
  bestseller: boolean
  new: boolean
  popularity: number
  discount: number
  memory: number
  ram: number
  cores_num: number
}

export interface IGoodsUnits {
  count: number
  rows: IGoodsUnit[]
}
