import { Button } from "reactstrap";
import "./scss/title.scss";

const Title = ({ title, isAdd, buttonClick }) => {
  return (
    <div className="page-title">
      <h5>{title}</h5>
      {!isAdd ? (
        <Button color="primary" onClick={buttonClick}>
          + Add New
        </Button>
      ) : (
        <Button className="btn-default" onClick={buttonClick}>
          &larr; Back
        </Button>
      )}
    </div>
  );
};

Title.defaultProps = {
  title: "",
  isAdd: false,
  buttonClick: () => {},
}

export default Title;
