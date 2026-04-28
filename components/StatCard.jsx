const StatCard = ({ title, value, icon: Icon, trend, color = "primary" }) => {
  const colorClasses = {
    primary: "bg-[#e76f51]/10 text-[#e76f51]",
    secondary: "bg-[#2a9d8f]/10 text-[#2a9d8f]",
    accent: "bg-[#f4a261]/10 text-[#f4a261]",
    blue: "bg-blue-100 text-blue-600"
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-stone-100">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-stone-500 uppercase tracking-wider mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-stone-900">{value}</h3>
          {trend && (
            <p className={`text-xs mt-2 font-medium ${trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
              {trend} <span className="text-stone-400 font-normal ml-1">from last week</span>
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color] || colorClasses.primary}`}>
          {Icon && <Icon size={24} />}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
