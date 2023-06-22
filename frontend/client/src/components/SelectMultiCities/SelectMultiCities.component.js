/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';

import { useSelectMultiCities } from './useSelectMultiCities.hooks';
import {
  CustomMultiSelect,
  CustomMenuList,
  CustomPlaceholder,
  CustomMenu,
} from './selectMultiCities.styles';

export const SelectMultiCities = () => {
  const {
    sortableRef,
    filteredCities,
    options,
    items,
    t,
    handleFilteredCities,
    onChange,
    onSortEnd,
    CustomMultiValue,
    CustomMultiValueRemove,
  } = useSelectMultiCities();

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={onSortEnd}>
      <SortableContext items={items}>
        <CustomMultiSelect
          ref={sortableRef}
          isMulti
          options={options}
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
          placeholder={t('selectMultiCities.placeholder')}
          aria-label="Select Combo Algorithm"
        />
      </SortableContext>
    </DndContext>
  );
};
