import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Media,
  Progress,
  UncontrolledDropdown,
} from "reactstrap";
import React from "react";
import injectSheet from "react-jss";
import {calcTaskCompletionPercent, completionColor} from "../../shared/helpers";

const TeamRowItem= (props) => {
  const { teamMember: { NAME, POSITION, ASSIGNED_TASKS }} = props;
  const completionPercent = calcTaskCompletionPercent(ASSIGNED_TASKS)

  return (
    <tr>
      <th scope="row">
        <Media className="align-items-center">
          <a
            className="avatar rounded-circle mr-3"
            onClick={(e) => e.preventDefault()}
          >
            <img
              alt="..."
              src={
                require("../../assets/img/user-avatar.png")
                  .default
              }
              style={{'height': '100%'}}
            />
          </a>
          <Media>

            <span className="mb-0 text-sm"> {NAME} </span>
          </Media>
        </Media>
      </th>
      <td> {POSITION} </td>
      <td> {ASSIGNED_TASKS ? ASSIGNED_TASKS.length : 0} </td>
      <td>
        <div className="d-flex align-items-center">
          <span className="mr-2">{completionPercent}%</span>
          <div>
            <Progress
              max="100"
              value={completionPercent}
              barClassName={`bg-${completionColor(completionPercent)}`}
            />
          </div>
        </div>
      </td>
      <td className="text-right">
        <UncontrolledDropdown>
          <DropdownToggle
            className="btn-icon-only text-light"
            role="button"
            size="sm"
            color=""
            onClick={(e) => e.preventDefault()}
          >
            <i className="fas fa-ellipsis-v" />
          </DropdownToggle>
          <DropdownMenu className="dropdown-menu-arrow" right>
            <DropdownItem
              onClick={(e) => e.preventDefault()}
            >
              Action
            </DropdownItem>
            <DropdownItem
              onClick={(e) => e.preventDefault()}
            >
              Another action
            </DropdownItem>
            <DropdownItem
              onClick={(e) => e.preventDefault()}
            >
              Something else here
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </td>
    </tr>
  );
}

const styles = {
  container: {
    border: "0px solid rgba(255, 255, 255, 1)",
    boxShadow: "0px 0px 20px rgba(0, 0, 0, .3)",
    borderRadius: "4px",
    backgroundColor: "white",
    display: "flex",
    padding: "16px",
    width: "200px"
  },
  circle: {
    height: "46px",
    width: "46px",
    borderRadius: "50%"
  },
  line: {
    width: "96px",
    height: "8px",
    alignSelf: "center",
    marginLeft: "16px",
    borderRadius: "8px"
  }
};

export default injectSheet(styles)(TeamRowItem);
