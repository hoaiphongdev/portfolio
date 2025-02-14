import type { IProject } from '@/types/project';

export default function TypeBadge({ type }: { type: IProject['type'] }) {
  const typeStyles = {
    company: 'bg-blue-500/10 text-blue-600',
    oss: 'bg-green-500/10 text-green-600',
    personal: 'bg-purple-500/10 text-purple-600',
  };

  return (
    <span
      className={`px-3 py-1 text-sm rounded-full font-medium ${typeStyles[type]}`}
    >
      {type.toUpperCase()}
    </span>
  );
}
