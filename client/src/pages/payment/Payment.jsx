import { Helmet } from "react-helmet-async";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useParams } from "react-router-dom";
import useScholarshipDetails from "../../hooks/useScholarshipDetails";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK_KEY);
const Payment = () => {
  const { id } = useParams();
  const [scholarDetails] = useScholarshipDetails(id);
  const scholarShipID = {
    id,
  };

  return (
    <section>
      <Helmet>
        <title>Educate | Payment</title>
      </Helmet>
      <Elements stripe={stripePromise}>
        <CheckoutForm
          scholarDetails={scholarDetails}
          scholarShipID={scholarShipID}
        />
      </Elements>
    </section>
  );
};

export default Payment;
