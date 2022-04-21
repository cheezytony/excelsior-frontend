import { useState } from 'react';

interface Listeners {
  close: Array<VoidFunction>;
  open: Array<VoidFunction>;
  toggle: Array<ToggleEventListener>;
}

type ToggleEventListener = (isOpen: boolean) => void;

export const useDisclosure = (initialValue = false) => {
  // Define states.
  const [listeners, setListeners] = useState<Listeners>({
    close: [],
    open: [],
    toggle: [],
  });
  const [isOpen, setIsOpen] = useState<boolean>(initialValue);

  // Define mutators
  const close = () => {
    setIsOpen(false);
    handleEvent('close');
  };
  const open = () => {
    setIsOpen(true);
    handleEvent('open');
  };
  const toggle = () => {
    setIsOpen(!isOpen);
    handleEvent('toggle');
  };

  // Define event listeners
  const onClose = (add?: VoidFunction, remove?: VoidFunction) => {
    add && addListener('close', add);
    remove && removeListener('close', remove);
  };
  const onOpen = (add?: VoidFunction, remove?: VoidFunction) => {
    add && addListener('open', add);
    remove && removeListener('open', remove);
  };
  const onToggle = (
    add?: ToggleEventListener,
    remove?: ToggleEventListener
  ) => {
    add && addListener('toggle', add);
    remove && removeListener('toggle', remove);
  };
  const addListener = (
    type: keyof Listeners,
    listenerToAdd: VoidFunction | ToggleEventListener
  ) => {
    setListeners({
      ...listeners,
      [type]: [...listeners[type], listenerToAdd],
    });
  };
  const removeListener = (
    type: keyof Listeners,
    listenerToRemove: VoidFunction | ToggleEventListener
  ) => {
    setListeners({
      ...listeners,
      [type]: listeners[type].filter(
        (listener) => listener !== listenerToRemove
      ),
    });
  };
  const handleEvent = (type: keyof Listeners) => {
    listeners[type].every((listener) => {
      type === 'toggle' ? listener(isOpen) : (listener as VoidFunction)();
    });
  };

  return { isOpen, close, open, toggle, onClose, onOpen, onToggle };
};
