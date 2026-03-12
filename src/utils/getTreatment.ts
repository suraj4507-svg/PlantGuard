import { supabase } from "../lib/supabase"
import diseasesData from "../data/diseases.json"

export type Treatment = {
  description?: string
  organicTreatment?: string
  chemicalTreatment?: string
  prevention?: string[]
}

function normalizeName(name: string) {
  return name.trim()
}

function mapSupabaseRow(row: any): Treatment {
  const prevention =
    Array.isArray(row?.prevention)
      ? row.prevention
      : typeof row?.prevention === "string"
        ? row.prevention.split(/[;,]/).map((s: string) => s.trim()).filter(Boolean)
        : undefined

  return {
    description: row?.description ?? row?.desc ?? undefined,
    organicTreatment: row?.organicTreatment ?? row?.organic ?? undefined,
    chemicalTreatment: row?.chemicalTreatment ?? row?.chemical ?? undefined,
    prevention,
  }
}

function findLocalTreatment(name: string): Treatment | null {
  const match = diseasesData.diseases.find(
    (d) => d.name.toLowerCase() === name.toLowerCase(),
  )
  if (!match) return null
  return {
    description: match.description,
    organicTreatment: match.organicTreatment,
    chemicalTreatment: match.chemicalTreatment,
    prevention: match.prevention,
  }
}

export async function getTreatment(disease: string): Promise<Treatment | null> {
  const target = normalizeName(disease)

  // Try exact match first
  const exact = await supabase
    .from("treatments")
    .select("*")
    .eq("disease", target)
    .limit(1)

  const exactRow = Array.isArray(exact.data) && exact.data.length ? exact.data[0] : null
  if (exactRow) return mapSupabaseRow(exactRow)

  // Try case-insensitive partial match
  const like = await supabase
    .from("treatments")
    .select("*")
    .ilike("disease", `%${target}%`)
    .limit(1)

  const likeRow = Array.isArray(like.data) && like.data.length ? like.data[0] : null
  if (likeRow) return mapSupabaseRow(likeRow)

  // Fallback to local data
  return findLocalTreatment(target)
}
