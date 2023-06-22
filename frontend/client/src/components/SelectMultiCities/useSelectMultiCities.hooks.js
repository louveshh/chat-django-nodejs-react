/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import { useCallback, useRef } from 'react';
import { cloneDeep } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { setFilteredCities } from 'store/slices/map';
import { useSortable, arrayMove } from '@dnd-kit/sortable';
import { components } from 'react-select';
import { useTranslation } from 'react-i18next';

import {
  SortableMultiValueDiv,
  CustomMultiValueStyle,
} from './selectMultiCities.styles';

export const useSelectMultiCities = () => {
  const sortableRef = useRef(null);
  const { randomPoints, filteredCities } = useSelector((state) => state.map);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const updateFilteredCities = useCallback(
    (payload) => {
      dispatch(setFilteredCities(payload));
    },
    [dispatch]
  );

  const handleFilteredCities = (event) => {
    const newCities = cloneDeep(event);
    newCities.forEach((point) => {
      point.value.selectedStart = false;
    });
    if (newCities.length > 0) {
      newCities[0].value.selectedStart = true;
    }
    updateFilteredCities(newCities);
  };
  const mappedPoints = randomPoints.map(({ x, y, selectedStart, name }) => ({
    value: { x, y, selectedStart },
    label: name,
  }));

  const CustomMultiValue = (props) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({
        id: `${props.data.value.x}${props.data.value.y}`,
      });

    return (
      <SortableMultiValueDiv
        ref={setNodeRef}
        transform={transform}
        transition={transition}
        {...listeners}
      >
        <CustomMultiValueStyle
          {...props}
          {...attributes}
          innerProps={{
            ...props.innerProps,
          }}
        />
      </SortableMultiValueDiv>
    );
  };

  const CustomMultiValueRemove = (props) => {
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
    if (oldIndex !== -1 && newIndex !== -1) {
      const newValue = arrayMove(filteredCities, oldIndex, newIndex);
      handleFilteredCities(newValue);
    }
  };

  const options = mappedPoints.filter(
    (obj1) =>
      !filteredCities.some(
        (obj2) =>
          `${obj2.value.x}${obj2.value.y}` === `${obj1.value.x}${obj1.value.y}`
      )
  );
  const items = filteredCities?.map((item) => ({
    ...item,
    id: `${item.value.x}${item.value.y}`,
  }));

  return {
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
  };
};
