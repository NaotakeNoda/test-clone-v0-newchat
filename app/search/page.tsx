"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useRouter, useSearchParams } from "next/navigation"
import { Train } from "lucide-react"
import { tokyoLines, getLinesByGroup } from "@/lib/data/tokyo-lines"

// SearchPage コンポーネントの実装を変更
export default function SearchPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [selectedLines, setSelectedLines] = useState<string[]>([])
  const [selectedStations, setSelectedStations] = useState<string[]>([])
  const [expandedLines, setExpandedLines] = useState<string[]>([])

  // URLパラメータから初期値を取得
  const initialLocation = searchParams.get("location") || ""
  const initialSubject = searchParams.get("subject") || ""
  const initialGrade = searchParams.get("grade") || ""
  const initialType = searchParams.get("type") || ""

  // 検索フォームの状態
  const [location, setLocation] = useState(initialLocation)

  // 路線グループを取得
  const lineGroups = getLinesByGroup()

  // URLパラメータから初期値を設定
  useEffect(() => {
    // 駅名が指定されている場合、その駅を含む路線を展開
    if (initialLocation) {
      const matchingLines = tokyoLines.filter((line) =>
        line.stations.some((station) => station.includes(initialLocation)),
      )

      if (matchingLines.length > 0) {
        // 一致する路線を選択状態にする
        setSelectedLines(matchingLines.map((line) => line.id))
        setExpandedLines(matchingLines.map((line) => line.id))

        // 一致する駅を選択状態にする
        const matchingStations = matchingLines.flatMap((line) =>
          line.stations.filter((station) => station.includes(initialLocation)),
        )
        setSelectedStations(matchingStations)
        setLocation(initialLocation)
      }
    }
  }, [initialLocation])

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
    setSelectedStations((prev) => (prev.includes(station) ? prev.filter((s) => s !== station) : [...prev, station]))
  }

  // 特定の路線の全駅を選択
  const selectAllStations = (lineId: string) => {
    const line = tokyoLines.find((l) => l.id === lineId)
    if (line) {
      const newStations = [...selectedStations]
      line.stations.forEach((station) => {
        if (!newStations.includes(station)) {
          newStations.push(station)
        }
      })
      setSelectedStations(newStations)
    }
  }

  // 特定の路線の全駅の選択を解除
  const deselectAllStations = (lineId: string) => {
    const line = tokyoLines.find((l) => l.id === lineId)
    if (line) {
      setSelectedStations((prev) => prev.filter((station) => !line.stations.includes(station)))
    }
  }

  // 検索を実行 - 修正版
  const handleSearch = () => {
    if (selectedStations.length === 0) return

    console.log("選択された駅の数:", selectedStations.length)
    console.log("選択された駅:", selectedStations)

    // 選択された駅をJSONとしてエンコード
    const stationsJson = JSON.stringify(selectedStations)

    // URLSearchParamsオブジェクトを作成
    const queryParams = new URLSearchParams()

    // 駅の配列を単一のJSONエンコードされたパラメータとして追加
    queryParams.append("stations", stationsJson)

    // URLを構築して遷移
    const queryString = queryParams.toString()
    console.log("構築されたクエリ文字列:", queryString)

    const url = `/jobs?${queryString}`
    console.log("遷移先URL:", url)

    // スクロール位置をリセット（クライアントサイドでのみ実行）
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0)
    }

    router.push(url)
  }

  // 路線セクションをレンダリングする関数
  const renderLineSection = (title: string, lineIds: string[]) => {
    const filteredLines = tokyoLines.filter((line) => lineIds.includes(line.id))

    return (
      <div className="mb-6">
        <h4 className="font-medium text-primary mb-2 border-b pb-1">{title}</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredLines.map((line) => (
            <div key={line.id}>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`line-${line.id}`}
                  checked={selectedLines.includes(line.id)}
                  onCheckedChange={() => toggleLine(line.id)}
                />
                <Label htmlFor={`line-${line.id}`} className="cursor-pointer">
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
                  <div className="max-h-[200px] overflow-y-auto p-2 border rounded-md">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {line.stations.map((station) => (
                        <div key={station} className="flex items-center space-x-2">
                          <Checkbox
                            id={`station-${line.id}-${station}`}
                            checked={selectedStations.includes(station)}
                            onCheckedChange={() => toggleStation(station)}
                          />
                          <Label htmlFor={`station-${line.id}-${station}`} className="cursor-pointer text-sm">
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
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">求人を探す</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>路線・駅を選択</CardTitle>
          <CardDescription>希望する路線と駅を選択して、最適な求人を見つけましょう</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
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
        </CardContent>
      </Card>

      {/* 検索ボタンをカードの外に配置 */}
      <div className="flex justify-center mb-8">
        <Button onClick={handleSearch} disabled={selectedStations.length === 0} className="w-full md:w-auto" size="lg">
          <Train className="mr-2 h-4 w-4" />
          検索する
        </Button>
      </div>

      {/* 選択状態の表示 */}
      {selectedStations.length > 0 && (
        <div className="bg-secondary/30 p-4 rounded-lg mb-8">
          <h3 className="font-medium mb-2">選択中の駅:</h3>
          <div className="flex flex-wrap gap-2">
            {selectedStations.map((station) => (
              <div key={station} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                {station}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
