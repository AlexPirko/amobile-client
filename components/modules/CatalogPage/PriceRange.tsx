import { Range, getTrackBackground } from 'react-range'
import { IPriceRangeProps } from '@/types/catalog'

const STEP = 1
const MIN = 5000
const MAX = 90000

const PriceRange = ({
  priceRange,
  setPriceRange,
  setIsPriceRangeChanged,
}: IPriceRangeProps) => {
  const handlePriceRangeChange = (values: number[]) => {
    setIsPriceRangeChanged(true)
    setPriceRange(values)
  }

  return (
    <Range
      values={priceRange}
      step={STEP}
      min={MIN}
      max={MAX}
      onChange={handlePriceRangeChange}
      renderTrack={({ props, children }) => (
        <div
          onMouseDown={props.onMouseDown}
          onTouchStart={props.onTouchStart}
          style={{
            ...props.style,
            height: 'auto',
            display: 'flex',
            width: '100%',
          }}
        >
          <div
            ref={props.ref}
            style={{
              height: '5px',
              width: '100%',
              borderRadius: '4px',
              background: getTrackBackground({
                values: priceRange,
                colors: ['#C1C1C1', '#C1C1C1', '#C1C1C1'],
                min: MIN,
                max: MAX,
              }),
              alignSelf: 'center',
            }}
          >
            {children}
          </div>
        </div>
      )}
      renderThumb={({ props, index }) => (
        <div
          {...props}
          style={{
            ...props.style,
            position: 'absolute',
            height: '40px',
            width: '69px',
            borderRadius: '8px',
            background: '#BCC5FF',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#454545',
            fontFamily: 'Roboto',
            fontSize: '14px',
            fontWeight: '300',
          }}
        >
          {index === 0 ? priceRange[0] : priceRange[1]}
        </div>
      )}
    />
  )
}

export default PriceRange
