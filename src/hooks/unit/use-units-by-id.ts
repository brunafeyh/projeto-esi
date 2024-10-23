import { useUnits } from "./use-units";

export const useUnitsByIdFromList = (id: number | null) => {
    const { units, isLoading, error } = useUnits();
    const unit = units.find((unit) => unit.id === id) || null;

    return {
        unit,
        isLoading,
        error,
    }
}
