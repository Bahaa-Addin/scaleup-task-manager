import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  UncontrolledTooltip,
} from "reactstrap";

import {TASK_STATUS} from "../../shared/lookups";
import React, {Fragment} from "react";
import {deleteTask, updateTask} from "../../actions/task.actions";
import useTasksContext from "../../shared/hooks/useTasksContext";
import useUserContext from "../../shared/hooks/useUserContext";

const TaskRowItem = (props) => {
  const { task: { ID, TITLE, STATUS, CREATOR, ASSIGNEES} } = props;
  const tasks = useTasksContext()
  const user = useUserContext();

  const updateTaskStatus = (newStatus) => {
    updateTask({ ID, STATUS: newStatus })
      .then(tasks.updateTask)
      .then(user.updateAssignedTask);
  }

  const deleteSelectedTask = (taskId) => {
    deleteTask(taskId)
      .then(tasks.deleteTask)
      .then(user.deleteAssignedTask);
  }

  return (
    <tr>
      <th scope="row">
        <span className="mb-0 text-sm"> {TITLE} </span>
      </th>
      <td>
        <Badge color="" className="badge-dot mr-4">
          <i className={`bg-${TASK_STATUS[STATUS].color}`} />
          {TASK_STATUS[STATUS].name}
        </Badge>
      </td>
      <td>
        <div className="avatar-group">
          <a
            className="avatar avatar-sm"
            id={`tooltip-${ CREATOR.ID}`}
            onClick={(e) => e.preventDefault()}
          >
            <img
              alt="..."
              className="rounded-circle"
              src={
                require("../../assets/img/user-avatar.png")
                  .default
              }
            />
          </a>
          <UncontrolledTooltip
            delay={0}
            target={`tooltip-${ CREATOR.ID}`}
          >
            {CREATOR.NAME}
          </UncontrolledTooltip>
        </div>
      </td>
      <td>
        <div className="avatar-group">
        {
          ASSIGNEES.map(assignee => (
            <Fragment key={assignee.ID}>
              <a
                className="avatar avatar-sm"
                id={`tooltip-${assignee.ID}`}
                onClick={(e) => e.preventDefault()}
              >
                <img
                  alt="..."
                  className="rounded-circle"
                  src={
                    require("../../assets/img/user-avatar.png")
                      .default
                  }
                />
              </a>
              <UncontrolledTooltip
                delay={0}
                target={`tooltip-${assignee.ID}`}
              >
                {assignee.NAME}
              </UncontrolledTooltip>
            </Fragment>
         ))
        }
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
            {STATUS !== TASK_STATUS.COMPLETED.value
              && <DropdownItem onClick={() => updateTaskStatus(TASK_STATUS.COMPLETED.value)}>
                    Mark Completed
                    <i className="ni ni-check-bold text-success px-1 float-right"/>
                </DropdownItem>
            }
            {STATUS !== TASK_STATUS.IN_PROGRESS.value
              && <DropdownItem onClick={() => updateTaskStatus(TASK_STATUS.IN_PROGRESS.value)}>
                    Mark In Progress
                    <i className="fas fa-spinner text-info px-1 float-right"/>
                </DropdownItem>
            }
            {STATUS !== TASK_STATUS.PENDING.value
              && <DropdownItem onClick={() => updateTaskStatus(TASK_STATUS.PENDING.value)} >
                    Mark Pending
                    <i className="fas fa-clock text-default px-1 float-right" />
                </DropdownItem>
            }
            <DropdownItem
              onClick={() => deleteSelectedTask(ID)}
            >
              Delete task
              <i className="fas fa-trash text-warning px-1 float-right" />
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </td>
    </tr>
  );
};

export default TaskRowItem;