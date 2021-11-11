import "./scss/centeredWrapper.scss";

const CenteredWrapper = ({ children }) => {
  return <div className="rounded centered-wrapper">{children}</div>;
};

export default CenteredWrapper;
