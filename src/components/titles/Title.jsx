import { Button } from "reactstrap";
import { useNavigation } from "../../hooks/useNavigation";
import { settingsMenuOptions } from "./constants";
import "./scss/title.scss";

const Title = ({ title, isAdd, buttonClick, isSettings }) => {
  return (
    <div className="page-title">
      <h5>{title}</h5>
      {!isSettings ? !isAdd ? (
        <Button color="primary" onClick={buttonClick}>
          + Add New
        </Button>
      ) : (
        <Button className="btn-default" onClick={buttonClick}>
          &larr; Back
        </Button>
      ) : (
        <select>
          {settingsMenuOptions.map(menu => (
            <option>{menu}</option>
          ))}
        </select>
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
