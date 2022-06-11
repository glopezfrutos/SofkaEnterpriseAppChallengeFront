import { productType } from "../../shared/productTypes"

interface IProps {
    p: productType
  }

const ProductRow: React.FunctionComponent<IProps> = ({p}) => {
    return (
        <tr>
          <th scope="row">{p.name}</th>
          <td>{p.min}</td>
          <td>{p.max}</td>
          <td>{p.stockQuantity}</td>
          <td>$ {p.price}</td>
          {/* <td><button className="btn btn-outline-danger" onClick={() => {
            }}
            ><i className="fa-solid fa-trash"></i></button></td> */}
        </tr>
      )
}

export default ProductRow