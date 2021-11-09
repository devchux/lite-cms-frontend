import "./scss/pageWrapper.scss";

const PageWrapper = ({ children, className }) => {
  return (
    <div className={`container page-wrapper ${className ? className : ""}`}>
      {children}
    </div>
  );
};

export default PageWrapper;
