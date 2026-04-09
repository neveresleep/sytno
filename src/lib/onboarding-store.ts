import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface OnboardingState {
  gender: string | null
  age_range: string | null
  region: string | null
  goal: string | null
  weight_kg: number | null
  height_cm: number | null
  kcal_target: number | null
  protein_g: number | null
  fat_g: number | null
  carbs_g: number | null
  people_count: number | null
  cook_frequency: string | null
  allergies: string[]
  conditions: string[]
  disliked_products: string | null
  liked_dish_types: string[]
  disliked_dish_types: string[]

  setField: <K extends keyof OnboardingState>(key: K, value: OnboardingState[K]) => void
  reset: () => void
}

const initialState = {
  gender: null,
  age_range: null,
  region: null,
  goal: null,
  weight_kg: null,
  height_cm: null,
  kcal_target: null,
  protein_g: null,
  fat_g: null,
  carbs_g: null,
  people_count: null,
  cook_frequency: null,
  allergies: [],
  conditions: [],
  disliked_products: null,
  liked_dish_types: [],
  disliked_dish_types: [],
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      ...initialState,
      setField: (key, value) => set({ [key]: value } as Partial<OnboardingState>),
      reset: () => set(initialState),
    }),
    { name: 'sytno-onboarding' }
  )
)
