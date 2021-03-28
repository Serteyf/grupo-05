import productDummy from "../../../assets/product_dummy.svg";

export default function DataCardBig(props) {
  return (
    <div className="col-lg-6 mb-4">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">{props.title}</h6>
        </div>
        <div className="card-body">
          <div className="text-center">
            <img
              className="img-fluid px-3 px-sm-4 mt-3 mb-4"
              style={{ width: "25rem" }}
              src={props.image ? props.image : productDummy}
              alt="Categories"
            />
          </div>
          <p>{props.value[0]}</p>
          <p>{props.value[1]}</p>
          <p>{props.value[2]}</p>
          <p>{props.value[3]}</p>
        </div>
      </div>
    </div>
  );
}
