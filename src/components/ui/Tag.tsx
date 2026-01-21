interface TagProps {
  label: string;
}

const tagColors: Record<string, string> = {
  FINANCE: "bg-blue-200 text-blue-800",
  TECH: "bg-indigo-200 text-indigo-800",
  REGULATIONS: "bg-red-200 text-red-800",

  CAREER: "bg-amber-200 text-amber-800",
  EDUCATION: "bg-sky-200 text-sky-800",
  HEALTH: "bg-emerald-200 text-emerald-800",

  LIFESTYLE: "bg-rose-200 text-rose-800",
  TRAVEL: "bg-violet-200 text-violet-800",
};

const Tag = ({ label }: TagProps) => {
  return (
    <span
      className={`rounded-md ${tagColors[label] ?? "bg-gray-200 text-gray-800"} px-2 py-1 text-xs font-medium`}
    >
      {label}
    </span>
  );
};

export default Tag;
