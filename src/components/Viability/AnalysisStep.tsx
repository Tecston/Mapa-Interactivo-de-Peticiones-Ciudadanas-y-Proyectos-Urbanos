// src/components/Viability/AnalysisStep.tsx
import { useState } from "react"
import { Button } from "../UI/Button"
import { Label }  from "../UI/Label"
import { Input }  from "../UI/Input"
import MapWithDraw from "./MapWithDraw"

interface AnalysisStepProps { onReady: () => void }

export default function AnalysisStep({ onReady }: AnalysisStepProps) {
  const [polygon, setPolygon] = useState<number[][]>([])
  const [budget,  setBudget]  = useState(15_000_000)

  const formValid = polygon.length >= 3 && budget > 0

  return (
    <section className="grid gap-6 p-6 lg:grid-cols-[2fr_1fr]">
      {/* MAPA -------------------------------------------------------- */}
      <div className="h-[480px] w-full overflow-hidden rounded-lg border">
        <MapWithDraw onPolygonComplete={(p) => setPolygon(p)} />
      </div>

      {/* BARRA LATERAL DE PARÁMETROS -------------------------------- */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Parámetros básicos</h2>

        <div>
          <Label htmlFor="budget">Presupuesto (MXN)</Label>
          <Input
            id="budget"
            type="number"
            value={budget}
            onChange={(e) => setBudget(+e.target.value)}
            min={0}
          />
        </div>

        <div className="text-sm text-gray-500">
          Coordenadas capturadas: 
          {polygon.length ? `${polygon.length} vértices` : "— (dibuja un polígono)"}
        </div>

        <Button
          disabled={!formValid}
          className="w-full"
          onClick={onReady}
        >
          Continuar
        </Button>
      </div>
    </section>
  )
}
