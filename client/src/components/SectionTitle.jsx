import PropTypes from "prop-types";

const SectionTitle = ({ heading }) => {
  return (
    <div>
      <h2 className="md:text-4xl text-2xl font-bold text-center uppercase text-[#4169e1]">
        {heading}
      </h2>
    </div>
  );
};

SectionTitle.propTypes = {
  heading: PropTypes.string,
};

export default SectionTitle;
