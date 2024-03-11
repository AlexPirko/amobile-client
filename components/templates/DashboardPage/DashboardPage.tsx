import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useStore } from 'effector-react'

import MainSlider from '@/components/elements/Slider/MainSlider'
import CatalogSlider from '@/components/elements/Slider/CatalogSlider'
import SaleSlider from '@/components/elements/Slider/SaleSlider'
import { $mode } from '@/context/mode'
import { getGoodsFx, getOnsalesOrNewPartsFx } from '@/app/api/goods'

import styles from '@/styles/dashboard/index.module.scss'
import { IGoodsUnit, IGoodsUnits } from '@/types/goods-model'

const DashboardPage = () => {
  const [allGoods, setAllGoods] = useState<IGoodsUnit[]>([] as IGoodsUnit[])
  const [onsales, setOnsales] = useState<IGoodsUnits>({} as IGoodsUnits)
  const [spinner, setSpinner] = useState(false)
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  useEffect(() => {
    loadGoodsUnits()
  }, [])

  const loadGoodsUnits = async () => {
    try {
      setSpinner(true)
      const onsales = await getOnsalesOrNewPartsFx('/goods/onsales')
      const allGoods = await getGoodsFx('/goods/all')
      setOnsales(onsales)
      setAllGoods(allGoods)
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSpinner(false)
    }
  }

  const uniqueNamesGoods = allGoods?.filter(
    (obj, index, self) =>
      index === self.findIndex((t) => t.goods_model === obj.goods_model)
  )

  return (
    <section className={`container ${styles.dashboard}`}>
      <div className={styles.dashboard__main_slider}>
        <MainSlider />
      </div>
      <div className={styles.dashboard__catalog_slider}>
        <h2 className={`${styles.dashboard__subtitle} ${darkModeClass}`}>
          Каталог
        </h2>
        <CatalogSlider items={uniqueNamesGoods || []} spinner={spinner} />
      </div>

      <h2 className={`${styles.dashboard__subtitle} ${darkModeClass}`}>
        Акции
      </h2>
      <SaleSlider items={onsales.rows || []} spinner={spinner} />
    </section>
  )
}
export default DashboardPage
