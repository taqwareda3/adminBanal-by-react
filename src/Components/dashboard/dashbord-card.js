import { Link } from "react-router-dom";

const DashBoardCard = (props) => {
  return (
    <>
      <div className="col-xl-3 col-sm-6 py-2">
        <div className={"card text-white bg-" + props.color + " h-100"}>
          <div className="card-body">
            <div className="rotate">
              <i className="fa fa-share fa-4x"></i>
            </div>
            <Link
              to={"/" + props.to ? props.to : ""}
              className="text-white text-decoration-none"
            >
              <h6 className="text-uppercase">{props.title}</h6>
              <h1 className="display-4">{props.result}</h1>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default DashBoardCard;
