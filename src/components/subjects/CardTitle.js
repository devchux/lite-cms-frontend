const CardTitle = ({ title, onClick, isActive }) => {
  return (
    <div
      className={`card-subject ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      {title}
    </div>
  );
};

export default CardTitle;
