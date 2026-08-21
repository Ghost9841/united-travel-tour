function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="mt-1 text-2xl font-bold text-[#0b3558]">
            {value}
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0b3558]/10 text-[#0b3558]">
          {icon}
        </div>
      </div>
    </div>
  );
}

export default StatCard;