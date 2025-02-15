import SectionTitle from "../../components/SectionTitle";
import { IoLocationSharp } from "react-icons/io5";
import { FaClock } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
const ContactUs = () => {
  return (
    <section className="lg:mb-20 mb-10">
      <SectionTitle heading={"Contact us"} />
      <div className="lg:flex justify-between gap-6 mt-10 lg:mt-20 lg:p-10 p-5 border rounded-lg">
        <div className="flex-1 mb-5 lg:mb-0">
          <div className="mb-5 text-center lg:text-left">
            <h2 className="lg:text-4xl text-2xl font-bold  lg:mb-5 mb-2">
              Get in Touch
            </h2>
            <p>
              Have questions or need help? Reach out to us via phone, email, or
              visit during business hours. We&apos;re here to assist you!
            </p>
          </div>
          <div className="text-center lg:text-left">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md w-full">
              {/* Address Section */}
              <div className="lg:flex lg:items-start mb-6">
                <div className="bg-[#b0c0f0] text-[#4169e1] flex items-center w-12 h-12  rounded-full p-3 mx-auto lg:mx-0  mb-3 lg:mb-0">
                  <IoLocationSharp className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Our Address
                  </h3>
                  <p className="text-gray-600">
                    1564 Goosetown Drive
                    <br />
                    Matthews, NC 28105
                  </p>
                </div>
              </div>

              {/* Hours of Operation Section */}
              <div className="lg:flex lg:items-start mb-6">
                <div className="bg-[#b0c0f0] text-[#4169e1] flex items-center justify-center w-12 h-12  rounded-full p-3 mx-auto lg:mx-0 mb-3 lg:mb-0">
                  <FaClock className="w-5 h-5" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Hours of Operation
                  </h3>
                  <p className="text-gray-600">
                    Mon - Fri: 9.00am to 5.00pm
                    <br />
                    [2nd Sat Holiday]
                  </p>
                </div>
              </div>

              {/* Contact Section */}
              <div className="lg:flex lg:items-start">
                <div className="bg-[#b0c0f0] text-[#4169e1] flex items-center w-12 h-12  rounded-full p-3 mx-auto lg:mx-0  mb-3 lg:mb-0">
                  <IoIosCall className="w-5 h-5" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Contact
                  </h3>
                  <p className="text-gray-600">
                    +99-35895-4565
                    <br />
                    supportyou@info.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 ">
          <div className="w-full p-6 bg-gray-50 dark:bg-[#191e24] rounded-lg shadow-md">
            <div>
              {/* Name Field */}
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-50"
                >
                  Name*
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Name"
                  className="w-full px-4 py-2 mt-1 border rounded-md"
                />
              </div>

              {/* Email Address Field */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-50"
                >
                  Email Address*
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 mt-1 border rounded-md "
                />
              </div>

              {/* Phone Field */}
              <div className="mb-4">
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-50"
                >
                  Phone*
                </label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="Phone"
                  className="w-full px-4 py-2 mt-1 border rounded-md "
                />
              </div>

              {/* Subject Field */}
              <div className="mb-4">
                <label
                  htmlFor="subject"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Subject*
                </label>
                <input
                  type="text"
                  id="subject"
                  placeholder="Subject"
                  className="w-full px-4 py-2 mt-1 border rounded-md "
                />
              </div>

              {/* Message Field */}
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  placeholder="Message"
                  rows="4"
                  className="w-full px-4 py-2 mt-1 border rounded-md "
                ></textarea>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-white bg-[#4169e1] rounded-md hover:bg-[#2f50b3] "
                >
                  Send Message →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
