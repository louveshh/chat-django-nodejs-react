/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { useMultiSelectSort } from './useMultiSelectSort.hooks';
import {
  CustomMultiSelect,
  CustomMenuList,
  CustomPlaceholder,
  CustomMenu,
} from './selectStyled.styles';

export const MultiSelectSort = () => {
  const {
    sortableRef,
    mappedPoints,
    filteredCities,
    handleFilteredCities,
    onChange,
    onSortEnd,
    CustomMultiValue,
    CustomMultiValueRemove,
  } = useMultiSelectSort();

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={onSortEnd}>
      <SortableContext
        items={filteredCities?.map((item) => ({
          ...item,
          id: `${item.value.x}${item.value.y}`,
        }))}
      >
        <CustomMultiSelect
          ref={sortableRef}
          isMulti
          options={mappedPoints.filter(
            (obj1) =>
              !filteredCities.some(
                (obj2) => `${obj2.value.x}${obj2.value.y}` === `${obj1.value.x}${obj1.value.y}`
              )
          )}
          value={filteredCities}
          onChange={onChange}
          selectedProps={filteredCities}
          setSelectedProps={handleFilteredCities}
          closeMenuOnSelect={false}
          components={{
            MultiValue: CustomMultiValue,
            MultiValueRemove: CustomMultiValueRemove,
            Menu: CustomMenu,
            MenuList: CustomMenuList,
            Placeholder: CustomPlaceholder,
          }}
          placeholder="Select at least two city"
          aria-labelledby="Select Board Algorithm"
          aria-label="Select Board Algorithm"
        />
      </SortableContext>
    </DndContext>
  );
};
