import { useSelector } from 'react-redux';
import { useMemo } from 'react';

export const useDisplayHoverCity = () => {
  const { mouseMoveCity } = useSelector((state) => state.map);
  const newCityInfo = useMemo(() => {
    if (!mouseMoveCity) {
      return null;
    }
    const city = new Map();
    city.set('Name: ', mouseMoveCity.name);
    city.set('User: ', mouseMoveCity.user);
    city.set('Biome: ', mouseMoveCity.biome_name);
    city.set('Size: ', mouseMoveCity.weight);
    city.set('X-coordinate: ', mouseMoveCity.x.toFixed(1));
    city.set('Y-coordinate: ', mouseMoveCity.y.toFixed(1));
    return city;
  }, [mouseMoveCity]);

  return { newCityInfo };
};
