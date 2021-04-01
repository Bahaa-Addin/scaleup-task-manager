import { Media } from "reactstrap";

import React from "react";
import Shimmer from "react-shimmer-effect";
import injectSheet from "react-jss";

const LoadingItem= ({ classes }) => {
  return (
    <tr>
      <th scope="row">
        <Media className="align-items-center">
          <a
            className="avatar rounded-circle mr-3"
            onClick={(e) => e.preventDefault()}
          >
             <Shimmer>
              <div className={classes.circle} />
            </Shimmer>
          </a>
          <Media>
             <Shimmer>
              <div className={classes.line} />
            </Shimmer>
          </Media>
        </Media>
      </th>
      <td>
        <Shimmer>
          <div className={classes.line} />
        </Shimmer>
      </td>
      <td>
         <Shimmer>
          <div className={classes.line} />
        </Shimmer>
      </td>
      <td>
        <Shimmer>
          <div className={classes.line} />
        </Shimmer>
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
    width: "100px",
    height: "10px",
    alignSelf: "center",
    marginLeft: "16px",
    borderRadius: "8px"
  }
};

export default injectSheet(styles)(LoadingItem);
