import { create } from 'zustand'
import useElectronStorage from '../use/useElectronStorage';

interface CarsState {
  cars: string[];
  setCars: (cars: string[]) => void;
  addCar: (car: string) => void;
  deleteCar: (car: string) => void;
}

export const useCarsStore = create<CarsState>()((set) => {
  const {setValue } = useElectronStorage();
  return {
    cars: [],
    setCars: (cars) => set(() => {
      return { cars }
    }),
    addCar: (car) => set((state) => {
      setValue('cars', [...state.cars, car]);
      return { cars: [...state.cars, car] }
    }),
    deleteCar: (car) => set((state) => {
      setValue('cars', state.cars.filter(item => item !== car));
      return { cars: state.cars.filter(item => item !== car) }
    }),
  }
})