const UrgencyBadge = ({ urgency }) => {
  const styles = {
    Critical: "bg-red-100 text-red-700 border-red-200",
    High: "bg-orange-100 text-orange-700 border-orange-200",
    Medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
    Low: "bg-green-100 text-green-700 border-green-200",
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${styles[urgency] || styles.Medium}`}>
      {urgency}
    </span>
  );
};

export default UrgencyBadge;
