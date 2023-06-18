interface DashboardCardCountProps {
  title: string;
  count: number;
}

const DashboardCardCount: React.FC<DashboardCardCountProps> = ({
  title,
  count,
}) => {
  return (
    <div className="border rounded-lg p-4 w-1/3 font-medium">
      <p className="text-sm">{title}</p>
      <p className="text-2xl">{count}</p>
    </div>
  );
};

export default DashboardCardCount;
