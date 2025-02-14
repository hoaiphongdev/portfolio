export default function TechChip({
  tech,
  variant = 'tech',
}: {
  tech: string;
  variant?: 'tech' | 'tool';
}) {
  const styles = {
    tech: 'bg-blue-light text-blue-dark',
    tool: 'bg-gray-100',
  };

  return (
    <span
      className={`px-2.5 py-1 text-sm rounded-full font-medium ${styles[variant]}`}
    >
      {tech}
    </span>
  );
}
