const Spinner = ({ color, size }) => {
  return (
    <div className={"spinner-border text-" + color + " " + size} role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export default Spinner;
