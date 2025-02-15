import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const FeedBackModal = ({ feedBackOn, closeFeedBack, id }) => {
  const axiosSecure = useAxiosSecure();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const feedback = e.target.feedback.value;

    try {
      await axiosSecure.patch(`/application/status/${id}`, { feedback });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your  Updated Successful",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    } finally {
      closeFeedBack();
    }
  };

  return (
    <div>
      <Dialog
        open={feedBackOn}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={closeFeedBack}
        __demoMode
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white text-black p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 border"
            >
              <Button
                className="rounded-md bg-red-500 py-1.5 px-3 text-sm/6 font-semibold text-white mb-3 data-[hover]:bg-red-600 "
                onClick={closeFeedBack}
              >
                x
              </Button>
              <DialogTitle>
                <p className="text-2xl font-bold">Feedback</p>
              </DialogTitle>
              <form onSubmit={handleSubmit}>
                <label className="form-control">
                  <div className="label">
                    <span className="label-text">Give Your Feedback</span>
                  </div>
                  <textarea
                    cols={4}
                    name="feedback"
                    className="textarea textarea-bordered h-24"
                    placeholder="Your Feedback"
                    required={true}
                  ></textarea>
                </label>
                <button
                  type="submit"
                  className="rounded-md bg-[#4169e1] py-1.5 px-3 text-sm/6 font-semibold text-white mt-2 data-[hover]:bg-{#4169e1} "
                >
                  Submit
                </button>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};
FeedBackModal.propTypes = {
  feedBackOn: PropTypes.bool.isRequired,
  closeFeedBack: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default FeedBackModal;
