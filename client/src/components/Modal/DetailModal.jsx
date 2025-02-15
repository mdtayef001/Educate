import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import PropTypes from "prop-types";

const DetailModal = ({ detailClose, detailsOpen, application }) => {
  return (
    <>
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
                <b>Location:</b> {application.universityAddress?.country}{" "}
                {application.universityAddress?.city}
              </p>
              <p className="mt-2 text-sm/6 ">
                <b>Feedback:</b> {application.applicationFeedback}
              </p>
              <p className="mt-2 text-sm/6 ">
                <b>Feedback:</b> {application.subjectCategory}
              </p>
              <p className="mt-2 text-sm/6 ">
                <b>Degree:</b> {application.appliedDegree}
              </p>
              <p className="mt-2 text-sm/6 ">
                <b>Application Fees:</b> ${application.applicationFees}
              </p>
              <p className="mt-2 text-sm/6 ">
                <b>Service Charge:</b> ${application.serviceCharge}
              </p>
              <p className="mt-2 text-sm/6 ">
                <b>Status:</b> {application.applicationStatus}
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
    </>
  );
};
DetailModal.propTypes = {
  detailsOpen: PropTypes.bool,
  detailClose: PropTypes.func,
  application: PropTypes.object,
};

export default DetailModal;
