/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import Select from 'react-select';
import { useMultiSelectSort } from './useMultiSelectSort.hooks';
import './styles.css';

export const MultiSelectSort = () => {
  const {
    sortableRef,
    mappedPoints,
    filteredCities,
    handleFilteredCities,
    onChange,
    onSortEnd,
    MultiValue,
    MultiValueRemove,
  } = useMultiSelectSort();

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={onSortEnd}>
      <SortableContext
        items={filteredCities?.map((item) => ({
          ...item,
          id: `${item.value.x}${item.value.y}`,
        }))}
      >
        <Select
          ref={sortableRef}
          isMulti
          options={mappedPoints.filter(
            (obj1) =>
              !filteredCities.some((obj2) => `${obj2.value.x}${obj2.value.y}` === `${obj1.value.x}${obj1.value.y}`)
          )}
          value={filteredCities}
          onChange={onChange}
          selectedProps={filteredCities}
          setSelectedProps={handleFilteredCities}
          closeMenuOnSelect={false}
          components={{
            MultiValue,
            MultiValueRemove,
          }}
        />
      </SortableContext>
    </DndContext>
  );
};
