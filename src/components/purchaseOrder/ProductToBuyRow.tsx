import React from 'react'
import { useSelector } from 'react-redux'
import { productType } from '../../shared/productTypes'
import { productInDocumentType } from '../../shared/purchaseOrderTypes'
import { selectProductStatus } from '../../state/productSlice'
import { addSelectedProduct, selectSelectedProductsState } from '../../state/selectedProductsSlice'
import { useAppDispatch } from '../../state/store'

interface IProps {
  p: productType
}

const ProductToBuyRow: React.FunctionComponent<IProps> = ({ p }) => {
  const [quantity, setQuantity] = React.useState(0)

  const selectedProducts = useSelector(selectSelectedProductsState())

  // To push a Selected Product in the Purchase Order
  const dispatch = useAppDispatch()
  const selectProduct = () => {
    if (quantity > 0) {
      const selectedProduct: productInDocumentType = { name: p.name, quantity: +quantity, price: p.price }
      dispatch(addSelectedProduct(selectedProduct))
    }
  }

  const inputQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value >= 0) {
      setQuantity(+e.target.value)
    }
  }


  return (
    <tr key={p.id}>
      <th scope="row">{p.name}</th>
      <td><input type="number" className="form-control" value={quantity}
        onChange={(e) => inputQuantity(e)} /></td>
      <td>{p.min}</td>
      <td>{p.max}</td>
      <td>{p.stockQuantity}</td>
      <th scope="row">
        <button type="button" className="btn btn-primary" onClick={() => selectProduct()}>Add</button>
      </th>
    </tr>
  )
}

export default ProductToBuyRow