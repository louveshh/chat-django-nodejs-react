/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-props-no-spreading */
import { useState, useRef, useEffect } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { useSortable, SortableContext, arrayMove } from '@dnd-kit/sortable';
import Select, { components } from 'react-select';
import './styles.css';

const SortableMultiValue = (props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props.data.value,
    });

  let isLastElement = false;
  if (props.selectProps.selectedProps.length > 0) {
    console.log(
      props.selectProps.selectedProps[
        props.selectProps.selectedProps.length - 1
      ]
    );
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
      className={additionalClass}
      {...listeners}
    >
      <components.MultiValue {...props} {...attributes} innerRef={undefined} />
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
  const newProps = {
    ...props.innerProps,
    onMouseDown: remove,
  };
  return (
    <components.MultiValueRemove
      onClick={remove}
      onMouseDown={remove}
      {...props}
      innerProps={newProps}
    />
  );
};
export const MultiSelectSort = () => {
  const colourOptions = [
    // { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
    // { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
    { value: 'purple', label: 'Purple', color: '#5243AA' },
    { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
    { value: 'orange', label: 'Orange', color: '#FF8B00' },
    { value: 'yellow', label: 'Yellow', color: '#FFC400' },
    { value: 'green', label: 'Green', color: '#36B37E' },
    { value: 'forest', label: 'Forest', color: '#00875A' },
    { value: 'slate', label: 'Slate', color: '#253858' },
    { value: 'silver', label: 'Silver', color: '#666666' },
  ];
  const sortableRef = useRef(null);
  const [selected, setSelected] = useState([
    colourOptions[4],
    colourOptions[5],
  ]);

  const onChange = (selectedOptions) => setSelected(selectedOptions);

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
      oldIndex = selected.findIndex((item) => item.value === active.id);
      newIndex = selected.findIndex((item) => item.value === over.id);
    }
    if (oldIndex !== -1 && newIndex !== -1) {
      const newValue = arrayMove(selected, oldIndex, newIndex);
      setSelected(newValue);
    }
  };
  useEffect(() => {
    console.log(selected);
  }, [selected]);
  const own = 'xd';

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={onSortEnd}>
      <SortableContext items={selected.map((item) => item.value)}>
        <Select
          ref={sortableRef}
          isMulti
          options={colourOptions}
          value={selected}
          onChange={onChange}
          selectedProps={selected}
          setSelectedProps={setSelected}
          closeMenuOnSelect={false}
          components={{
            MultiValue: SortableMultiValue,
            SortableMultiValueLabel: SortableMultiValueLabel,
            MultiValueRemove: (own) => MultiValueRemove(own),
          }}
        />
      </SortableContext>
    </DndContext>
  );
};
