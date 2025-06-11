"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/custom-dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Train } from "lucide-react"
import { tokyoLines, getLinesByGroup } from "@/lib/data/tokyo-lines"

interface StationSelectModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedStations: string[]
  onStationsChange: (stations: string[]) => void
}

export function StationSelectModal({
  open,
  onOpenChange,
  selectedStations,
  onStationsChange,
}: StationSelectModalProps) {
  const [selectedLines, setSelectedLines] = useState<string[]>([])
  const [expandedLines, setExpandedLines] = useState<string[]>([])
  const [tempSelectedStations, setTempSelectedStations] = useState<string[]>(selectedStations)

  // 路線グループを取得
  const lineGroups = getLinesByGroup()

  // モーダルが開かれたときに選択状態を初期化
  useEffect(() => {
    if (open) {
      setTempSelectedStations(selectedStations)
    }
  }, [open, selectedStations])

  // 路線の選択状態を切り替える
  const toggleLine = (lineId: string) => {
    // 路線の選択状態を更新
    setSelectedLines((prev) => (prev.includes(lineId) ? prev.filter((id) => id !== lineId) : [...prev, lineId]))

    // 路線が選択された場合、展開状態も更新
    if (!selectedLines.includes(lineId)) {
      setExpandedLines((prev) => [...prev, lineId])
    } else {
      // 選択が解除された場合は展開状態も解除
      setExpandedLines((prev) => prev.filter((id) => id !== lineId))
    }
  }

  // 駅の選択状態を切り替える
  const toggleStation = (station: string) => {
    setTempSelectedStations((prev) => (prev.includes(station) ? prev.filter((s) => s !== station) : [...prev, station]))
  }

  // 特定の路線の全駅を選択
  const selectAllStations = (lineId: string) => {
    const line = tokyoLines.find((l) => l.id === lineId)
    if (line) {
      const newStations = [...tempSelectedStations]
      line.stations.forEach((station) => {
        if (!newStations.includes(station)) {
          newStations.push(station)
        }
      })
      setTempSelectedStations(newStations)
    }
  }

  // 特定の路線の全駅の選択を解除
  const deselectAllStations = (lineId: string) => {
    const line = tokyoLines.find((l) => l.id === lineId)
    if (line) {
      setTempSelectedStations((prev) => prev.filter((station) => !line.stations.includes(station)))
    }
  }

  // 選択を確定
  const confirmSelection = () => {
    onStationsChange(tempSelectedStations)
    onOpenChange(false)
  }

  // 路線セクションをレンダリングする関数
  const renderLineSection = (title: string, lineIds: string[]) => {
    const filteredLines = tokyoLines.filter((line) => lineIds.includes(line.id))

    return (
      <div className="mb-6">
        <h4 className="font-medium text-primary mb-2 border-b pb-1">{title}</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {filteredLines.map((line) => (
            <div key={line.id}>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`modal-line-${line.id}`}
                  checked={selectedLines.includes(line.id)}
                  onCheckedChange={() => toggleLine(line.id)}
                />
                <Label htmlFor={`modal-line-${line.id}`} className="cursor-pointer">
                  {line.name}
                </Label>
              </div>

              {/* 路線が選択されている場合、その下に駅選択を表示 */}
              {expandedLines.includes(line.id) && (
                <div className="ml-6 mt-2 mb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => selectAllStations(line.id)}
                      className="text-xs py-0 h-7 w-full sm:w-auto"
                    >
                      全ての駅を選択
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deselectAllStations(line.id)}
                      className="text-xs py-0 h-7 w-full sm:w-auto"
                    >
                      チェックを全て外す
                    </Button>
                  </div>
                  <div className="max-h-[150px] overflow-y-auto p-2 border rounded-md">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {line.stations.map((station) => (
                        <div key={station} className="flex items-center space-x-2">
                          <Checkbox
                            id={`modal-station-${line.id}-${station}`}
                            checked={tempSelectedStations.includes(station)}
                            onCheckedChange={() => toggleStation(station)}
                          />
                          <Label htmlFor={`modal-station-${line.id}-${station}`} className="cursor-pointer text-sm">
                            {station}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>路線・駅を選択</DialogTitle>
        </DialogHeader>

        {/* 選択中の駅表示 */}
        {tempSelectedStations.length > 0 && (
          <div className="bg-secondary/30 p-4 rounded-lg mb-4">
            <h3 className="font-medium mb-2">選択中の駅: {tempSelectedStations.length}駅</h3>
            <div className="flex flex-wrap gap-2">
              {tempSelectedStations.map((station) => (
                <div
                  key={station}
                  className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center"
                >
                  {station}
                  <button className="ml-1 text-primary/70 hover:text-primary" onClick={() => toggleStation(station)}>
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-6">
          {/* 路線選択 */}
          <div>
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <Train className="mr-2 h-5 w-5 text-primary" />
              路線を選択
            </h3>

            {/* JR路線 */}
            {renderLineSection("JR線", lineGroups.jr)}

            {/* 東急線 */}
            {renderLineSection("東急線", lineGroups.tokyu)}

            {/* 東武線 */}
            {renderLineSection("東武線", lineGroups.tobu)}

            {/* 京急線 */}
            {renderLineSection("京急線", lineGroups.keikyu)}

            {/* 小田急線 */}
            {renderLineSection("小田急線", lineGroups.odakyu)}

            {/* 京王線 */}
            {renderLineSection("京王線", lineGroups.keio)}

            {/* 東京メトロ */}
            {renderLineSection("東京メトロ", lineGroups.metro)}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            キャンセル
          </Button>
          <Button onClick={confirmSelection}>選択を確定 ({tempSelectedStations.length}駅)</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
