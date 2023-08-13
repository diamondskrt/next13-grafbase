import { FC, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Button from './Button';

interface ConfirmDialogProps {
  isOpen: boolean;
  title?: string;
  text?: string;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmDialog: FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  text,
  onClose,
  onConfirm
}) => {
  return (
    <Transition show={isOpen} appear as={Fragment}>
      <Dialog as="div" className="relative" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-sm rounded theme-bg">
                <div className="grid gap-4 p-4">
                  {title ? (
                    <Dialog.Title className="text-lg">{title}</Dialog.Title>
                  ) : null}
                  <Dialog.Description>
                    {text || 'Are you sure?'}
                  </Dialog.Description>
                </div>
                <div className="flex justify-end gap-4 px-4 py-2">
                  <Button variant="text" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button onClick={onConfirm}>Confirm</Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ConfirmDialog;
