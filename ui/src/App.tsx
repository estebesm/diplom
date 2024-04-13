import { useEffect, useState } from 'react';
import './App.css';
import { findCarPlateNumber } from './helpers/car_plate';
import AddCarForm from './components/carForms/AddCarForm';
import CarsList from './components/carsList/CarsList';
import useElectronStorage from './use/useElectronStorage';
import { useCarsStore } from './store/cars';

function App() {
  const { getValue } = useElectronStorage();
  const [carPlate, setCarPlate] = useState<string | undefined>();
  const [opened, setOpened] = useState(false);
  const setCars = useCarsStore((s) => s.setCars);
  const cars = useCarsStore((s) => s.cars);

  useEffect(() => {
    window.ipcRenderer.on('main-process-message', (_event, message) => {
      const car_plate = findCarPlateNumber(message);
      if (car_plate) {
        setCarPlate(car_plate);
      }
    });

    getValue('cars').then((cars) => {
      setCars(cars || []);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (cars.includes(carPlate as string)) {
      setOpened(true);
    } else {
      setOpened(false);
    }
  }, [carPlate, cars]);

  return (
    <div className="w-screen h-screen min-w-[600px]">
      <div className="container py-8">
        <div className="flex flex-col gap-4">
          <div className="flex gap-x-8">
            <div>
              <AddCarForm />
              <CarsList />
            </div>
            <div>
              <div className='flex items-center gap-4 mb-4'>
                <div className='py-2'>Статус</div>
                <div className={`w-2 h-2 rounded-full ${opened ? 'bg-green-500' : 'bg-red-500'}`} />
              </div>
              <div className="mx-auto py-20 border rounded-2xl shadow w-[50vw] flex justify-center">
                <span className="text-2xl">{carPlate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
