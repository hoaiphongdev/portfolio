interface StatCardProps {
  number: string;
  label: string;
}

export default function StatCard({ number, label }: StatCardProps) {
  return (
    <div className="flex flex-col">
      <span className="text-4xl font-bold text-gray-600 mb-2">{number}</span>
      <span className="text-gray-500 text-sm uppercase tracking-wider">{label}</span>
    </div>
  );
};
