import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import PropTypes from "prop-types";

const DetailsModal = ({ detailsOpen, detailClose, application }) => {
  return (
    <div>
      <Dialog
        open={detailsOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={detailClose}
        __demoMode
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white text-black p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 border"
            >
              <DialogTitle as="h3" className="text-base/7 font-medium ">
                <b>University Name:</b> {application.universityName}
              </DialogTitle>
              <p className="mt-2 text-sm/6 ">
                <b>Applied Degree:</b> {application.degree}
              </p>
              <p className="mt-2 text-sm/6 ">
                <b>Scholarship Category:</b> {application.category}
              </p>

              <div className="mt-4">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-red-500 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-red-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={detailClose}
                >
                  Close
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};
DetailsModal.propTypes = {
  detailsOpen: PropTypes.bool.isRequired,
  detailClose: PropTypes.func.isRequired,
  application: PropTypes.object,
};

export default DetailsModal;
