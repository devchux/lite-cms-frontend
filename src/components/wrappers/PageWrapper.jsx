import "./scss/pageWrapper.scss";

const PageWrapper = ({ children, className }) => {
  return (
    <div className={`rounded page-wrapper ${className ? className : ""}`}>
      {children}
    </div>
  );
};

export default PageWrapper;
