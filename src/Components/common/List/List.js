const List = (props) =>  {
  return (
    <li className="list-group-item my-1 rounded" id="list-item">
      <h2 className="mb-2">{props.primary}</h2>
      <div className="d-flex justify-content-between">
        <div>
          {props.secondary}
        </div>
        {props.actions && (
          <div>
            {props.actions}
          </div>
        )}
      </div>
    </li>
  )
}

export default List;