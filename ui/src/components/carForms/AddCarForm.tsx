import { useState } from 'react';
import { checkCarPlatePattern } from '../../helpers/car_plate';
import { useCarsStore } from '../../store/cars';

export default function AddCarForm() {
  const [value, setValue] = useState<string>('');
  const addCar = useCarsStore((state) => state.addCar);

  const submit = () => {
    addCar(value);
  };

  return (
    <form className="flex gap-1" onSubmit={submit}>
      <input
        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-sky-500 uppercase"
        type="text"
        placeholder="001ABC"
        value={value}
        onChange={(event) => setValue(event.target.value.toUpperCase())}
      />
      <button
        className="bg-sky-500 text-white shadow-lg focus:outline-sky-800 rounded px-6 m-0 font-normal disabled:bg-gray-400 border-none"
        disabled={!checkCarPlatePattern(value)}
      >
        Добавить
      </button>
    </form>
  );
}
