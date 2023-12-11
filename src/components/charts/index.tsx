import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ArcElement,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const LineChart: React.FC<{ data: ChartData<"line"> }> = ({ data }) => <Line data={data} />;

export const DoughnutChart: React.FC<{ data: ChartData<"doughnut"> }> = ({ data }) => <Doughnut data={data} />;
