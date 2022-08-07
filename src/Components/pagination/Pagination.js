
const Pagination = (props) => {
    return (<div className="d-flex justify-content-center align-items-center">
        <nav aria-label="Page navigation  example">
            <ul className="pagination cursor pagination pagination-lg">
                {props.pages &&
                    props.pages.length > 1 &&
                    props.pages.map((el, index) => (
                        <li key={index} className={`page-item ${props.CurrPage == el ? "active" : ""}`}>
                            <a className="page-link" onClick={() => props.goToPage(el)}>
                                {el}
                            </a>
                        </li>
                    ))}
            </ul>
        </nav>
    </div>)
}
export default Pagination