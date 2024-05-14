export const Button = ({ type, label, className, onClick = () => {} }) => {
  return (
    <button type={type} className={`button ${className}`} onClick={onClick}>
      <span>{label}</span>
    </button>
  );
};
