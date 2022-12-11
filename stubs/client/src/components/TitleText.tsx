interface Props {
  label: string;
  children?: React.ReactNode | JSX.Element | JSX.Element[];
  className?: string;
}

const TitleText = ({ label, children, className = '' }: Props) => (
  <h1
    className={`flex gap-2 justify-center items-center text-3xl font-bold pb-4 pt-2 capitalize ${className}`}
  >
    {label ? <span>{label}</span> : children}
  </h1>
);
export default TitleText;
