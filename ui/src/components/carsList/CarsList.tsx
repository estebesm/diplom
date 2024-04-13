import { useCarsStore } from '../../store/cars';
import CarsItem from './CarsItem';

const CarsList = () => {
  const cars = useCarsStore(state => state.cars);
  return (
    <ul className='flex flex-col my-4 gap-2'>
      {cars.map((car) => (
        <CarsItem key={car} car={car} />
      ))}
    </ul>
  );
};

export default CarsList;
