import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  BarChart,
  Bar,
  RadialBarChart,
  RadialBar,
  Legend
} from "recharts";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

function Analytics() {
  const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}, ];
  const Theme = useSelector((state)=>state.Theme.curstate)


const renderLineChart = (
  <LineChart width={600} height={300} data={data}>
    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
    <CartesianGrid stroke="#ccc" />
    <XAxis dataKey="name" />
    <YAxis />
  </LineChart>
);
  const expenseRedux = useSelector((state) => state.expense.arr);
  const backgroundColor = useSelector((state) => state.expense.backgroundColor);
  const formatDate = (dateStr) => {
    const [day, month, year] = dateStr.split("-").map(Number); // Convert string to numbers
    const correctDate = new Date(year, month - 1, day); // Adjust month (0-based index)

    return correctDate.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    }); // "Mar 2025"
  };
  function calculateExpensesPerMonth(data) {
    const monthlyExpenses = {};
    const monthNames = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
    ];

    data.forEach(entry => {
        const [day, month, year] = entry.date.split("-").map(Number);
        const monthYear = `${monthNames[month - 1]} ${year}`; // Convert month number to name
        const amount = Number(entry.SPENT) || 0;

        if (!monthlyExpenses[monthYear]) {
            monthlyExpenses[monthYear] = 0;
        }

        monthlyExpenses[monthYear] += amount;
    });

    return Object.entries(monthlyExpenses).map(([monthYear, totalExpense]) => ({
        monthYear,
        totalExpense
    }));
}

  const formattedData = expenseRedux.map((item) => ({
    ...item,
    SPENT: parseInt(item.SPENT, 10), // Convert to number
    formattedDate: formatDate(item?.date), // Ensure correct parsing
  }));
  const calculateMonthlyTotal = calculateExpensesPerMonth(expenseRedux);
  return (
<div className="bg-gray-900 min-h-screen p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
  
  {/* Line Chart */}
  <div className=" p-4 w-auto rounded-lg shadow-lg" style={{backgroundColor: Theme}}>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={formattedData}  margin={{ top: 10, right: 30, left: 50, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Selector" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="SPENT" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  </div>
  <div className="bg-gray-800 p-4 w-auto rounded-lg shadow-lg" style={{backgroundColor: Theme}}>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={formattedData}  margin={{ top: 10, right: 30, left: 50, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Selector" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="SPENT" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  </div>
  {/* Pie Chart */}
  <div className="bg-gray-800 p-4 rounded-lg shadow-lg flex justify-center" style={{backgroundColor: Theme}}>
    <ResponsiveContainer width="100%" height={300}>
      <PieChart margin={{ top: 10, right: 30, left: 50, bottom: 10 }}s>
        <Pie
          data={formattedData}
          dataKey="SPENT"
          nameKey="Selector"
          cx="50%"
          cy="50%"
          outerRadius={130}
          fill="#8884d8"
          label
        />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>

  {/* Bar Chart */}
  <div className="bg-gray-800 p-4 w-auto rounded-lg shadow-lg" style={{backgroundColor: Theme}}>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={calculateMonthlyTotal} margin={{ top: 10, right: 30, left: 50, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="monthYear" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="totalExpense" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  </div>

</div>

  );
}

export default Analytics;




