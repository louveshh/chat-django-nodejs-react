import { getBiomes } from 'store/slices/map/mapAsync';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

export const usePaginationBiomes = () => {
  const { t } = useTranslation();
  const { biomes, loading } = useSelector((state) => state.map);
  const dispatch = useDispatch();
  const updateBiomes = useCallback(
    (payload) => {
      dispatch(getBiomes(payload));
    },
    [dispatch]
  );

  const handlePageUp = () => {
    if (loading || !biomes) {
      return;
    }
    const biomesPage = Number(biomes.page);
    const biomesTotal = Number(biomes.total);
    if (biomesPage < biomesTotal) {
      updateBiomes(biomesPage + 1);
    }
  };

  const handlePageDown = () => {
    if (loading || !biomes) {
      return;
    }
    const biomesPage = Number(biomes.page);
    if (biomesPage > 1) {
      updateBiomes(biomesPage - 1);
    }
  };

  useEffect(() => {
    updateBiomes(1);
  }, [updateBiomes]);

  const newBiomes = biomes ? biomes.biomes : [];
  const allBiomes =
    newBiomes.length === 1 ? [...newBiomes, { name: '-' }] : newBiomes;
  const newTotal = biomes ? biomes.total : 1;
  const newPage = biomes ? biomes.page : 1;

  return { allBiomes, newPage, newTotal, t, handlePageUp, handlePageDown };
};
