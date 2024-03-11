import { useState } from 'react'

import { setSearchInputZIndex } from '@/context/header'

export const usePopup = () => {
  const [open, setOpen] = useState(false)

  const toggleOpen = () => {
    window.scrollTo(0, 0)
    setOpen(!open)
  }

  const closePopup = () => {
    setOpen(false)
    setSearchInputZIndex(1)
  }

  return { toggleOpen, open, closePopup }
}
