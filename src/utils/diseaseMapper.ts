import data from "../data/diseases.json"

export function getDiseaseName(index: number) {
  return data.classLabels[index] ?? "Healthy"
}
