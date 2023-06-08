/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-props-no-spreading */
import { useState, useRef, useEffect } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { useSortable, SortableContext, arrayMove } from '@dnd-kit/sortable';
import Select, { components } from 'react-select';
import { useMultiSelectSort } from './useMultiSelectSort.hooks';
import './styles.css';

const SortableMultiValue = (props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: `${props.data.value.x}${props.data.value.y}`,
    });

  let isLastElement = false;
  if (props.selectProps.selectedProps.length > 0) {
    isLastElement =
      props.data.value ===
      props.selectProps.selectedProps[
        props.selectProps.selectedProps.length - 1
      ].value;
  }

  const style = {
    width: '70%',
    position: 'relative',
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
  };
  const additionalClass = !isLastElement ? 'sortable-multi-value' : 'last';

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="sortable-multi-value"
      {...listeners}
    >
      <components.MultiValue
        {...props}
        {...attributes}
        innerRef={undefined}
        innerProps={{
          ...props.innerProps,
        }}
      />
    </div>
  );
};

const SortableMultiValueLabel = (props) => {
  return <components.MultiValueLabel {...props} />;
};
const MultiValueRemove = ({ ...props }) => {
  const { value } = props.data;
  const selected = props.selectProps.selectedProps;
  const setSelected = props.selectProps.setSelectedProps;
  const remove = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setSelected(selected.filter((option) => option.value !== value));
  };
  return (
    <components.MultiValueRemove
      onClick={remove}
      {...props}
      innerProps={{
        ...props.innerProps,
        onMouseDown: remove,
      }}
    />
  );
};
export const MultiSelectSort = () => {
  const { handleFilteredCities, mappedPoints, filteredCities } =
    useMultiSelectSort();
  const sortableRef = useRef(null);

  const onChange = (selectedOptions) => handleFilteredCities(selectedOptions);

  const onSortEnd = ({ active, over }) => {
    if (!active?.id) {
      return;
    }
    if (!over?.id) {
      return;
    }
    let oldIndex;
    let newIndex;
    if (active.id !== over.id) {
      oldIndex = filteredCities?.findIndex(
        (item) => `${item.value.x}${item.value.y}` === active.id
      );
      newIndex = filteredCities?.findIndex(
        (item) => `${item.value.x}${item.value.y}` === over.id
      );
    }
    console.log(active, over);
    if (oldIndex !== -1 && newIndex !== -1) {
      const newValue = arrayMove(filteredCities, oldIndex, newIndex);
      handleFilteredCities(newValue);
    }
  };
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
              !filteredCities.some(
                (obj2) =>
                  `${obj2.value.x}${obj2.value.y}` ===
                  `${obj1.value.x}${obj1.value.y}`
              )
          )}
          value={filteredCities}
          onChange={onChange}
          selectedProps={filteredCities}
          setSelectedProps={handleFilteredCities}
          closeMenuOnSelect={false}
          components={{
            MultiValue: SortableMultiValue,
            SortableMultiValueLabel: SortableMultiValueLabel,
            MultiValueRemove: MultiValueRemove,
          }}
        />
      </SortableContext>
    </DndContext>
  );
};