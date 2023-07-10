import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const useDisplayHoverCity = () => {
  const { t } = useTranslation();
  const { mouseMoveCity } = useSelector((state) => state.map);
  const newCityInfo = useMemo(() => {
    const city = new Map();
    if (!mouseMoveCity) {
      city.set('Name: ', '-');
      city.set('User: ', '-');
      city.set('Biome: ', '-');
      city.set('Size: ', '-');
      city.set('X-coordinate: ', '-');
      city.set('Y-coordinate: ', '-');
      return city;
    }
    city.set('Name: ', mouseMoveCity.name);
    city.set('User: ', mouseMoveCity.user);
    city.set('Biome: ', t(`biome.${mouseMoveCity.biome_name}`));
    city.set('Size: ', mouseMoveCity.weight);
    city.set('X-coordinate: ', mouseMoveCity.x.toFixed(1));
    city.set('Y-coordinate: ', mouseMoveCity.y.toFixed(1));
    return city;
  }, [mouseMoveCity, t]);

  return { newCityInfo, t };
};
