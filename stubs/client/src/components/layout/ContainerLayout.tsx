interface Props {
  children: React.ReactNode;
  className?: string;
}

const ContainerLayout = ({ children, className = '' }: Props) => (
  <div className={`flex gap-2 items-center relative ${className}`}>
    {children}
  </div>
);

export default ContainerLayout;
