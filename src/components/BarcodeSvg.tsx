import { useEffect, useRef } from 'react'
import JsBarcode from 'jsbarcode'

interface BarcodeSvgProps {
  value: string
  format?: string
}

/** Renderöi viivakoodin SVG:nä jsbarcodella. */
function BarcodeSvg({ value, format = 'CODE128' }: BarcodeSvgProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current || !value) return
    try {
      JsBarcode(svgRef.current, value, {
        format,
        lineColor: '#0f172a',
        width: 2,
        height: 80,
        displayValue: true,
        fontOptions: 'bold',
      })
    } catch {
      // Virheellinen arvo valitulle formaatille — jätetään koodi piirtämättä.
    }
  }, [value, format])

  return <svg ref={svgRef} />
}

export default BarcodeSvg
