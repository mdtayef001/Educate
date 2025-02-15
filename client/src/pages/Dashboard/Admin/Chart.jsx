import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import PropTypes from "prop-types";

const Chart = ({ adminStats }) => {
  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-xl font-bold text-center mb-4">Data Overview</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={adminStats}
          margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
Chart.propTypes = {
  adminStats: PropTypes.array.isRequired,
};

export default Chart;
