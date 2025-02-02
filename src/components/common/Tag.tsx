interface Props {
  title: string;
  icon: any;
}

export default function Tag({ title, icon }: Props) {
  return (
    <p className="flex items-center gap-x-2 rounded-[8px] bg-foreground px-2 py-1 !text-secondary">
      {icon && icon}
      <span className="text-xs font-medium">{title}</span>
    </p>
  );
}
