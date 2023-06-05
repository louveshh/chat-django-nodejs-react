import { cloneDeep } from 'lodash';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setFilteredCities,
  setZeroStartCity,
  setFilteredCitiesStart,
} from 'store/slices/map';

export const useMultiSelectSort = () => {
  const { randomPoints, filteredCities } = useSelector((state) => state.map);
  const dispatch = useDispatch();

  const handleFilteredCities = (event) => {
    const newCities = cloneDeep(event);
    newCities.forEach((point) => {
      point.value.selectedStart = false;
    });
    if (newCities.length > 0) {
      newCities[0].value.selectedStart = true;
    }
    dispatch(setFilteredCities(newCities));
  };
  const mappedPoints = randomPoints.map(({ x, y, selectedStart, name }) => ({
    value: { x, y, selectedStart },
    label: name,
  }));

  return { handleFilteredCities, mappedPoints, filteredCities };
};
