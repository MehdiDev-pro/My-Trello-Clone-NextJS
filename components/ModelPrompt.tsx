"use client";
import { useBoardStore } from "@/store/BoardStore";
import { useModelPromptStore } from "@/store/ModelPromptStore";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function ModelPrompt() {
  const [isPromptOpen, closeModelPrompt, deleteInfo] = useModelPromptStore((state) => [state.isPromptOpen, state.closeModelPrompt, state.deleteInfo]);
  const deleteTask = useBoardStore((state) => state.deleteTask);

  const handleClick = () => {
    deleteTask(deleteInfo.index, deleteInfo.todo as Todo, deleteInfo.id as typedColumn);
    closeModelPrompt();
  };

  return (
    <>
      <Transition appear show={isPromptOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModelPrompt}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    Delete Task
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">Would you want to delete this task</p>
                  </div>

                  <div className="flex flex-row justify-end gap-2 mt-2">
                    <button onClick={handleClick} type="button" className="inline-flex justify-center rounded-md border border-transparent bg-red-400 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2">
                      Confirm
                    </button>
                    <button type="button" className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2" onClick={closeModelPrompt}>
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
