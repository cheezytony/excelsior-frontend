interface BadgeAttributes {
  children?: React.ReactNode;
}

export const Badge: React.FC = ({ children }: BadgeAttributes) => {
  return (
    <div className="bg-blue-50 flex font-medium gap-2 items-center px-5 py-3 rounded-full text-sm text-blue-300 hover:ring-1 hover:ring-blue-400 hover:text-blue-400">
      {children}
    </div>
  );
};
