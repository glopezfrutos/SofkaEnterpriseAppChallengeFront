import React from 'react'
import { productType } from '../../shared/productTypes'
import { productToSelectType } from '../../shared/purchaseOrderTypes'
import { useAppDispatch } from '../../state/store'

interface IProps {
  p: productType
}

const ProductToBuyRow: React.FunctionComponent<IProps> = ({ p }) => {
  const [selectedProducts, setSelectedProducts] = React.useState('')
  const [quantity, setQuantity] = React.useState('')
  const dispatch = useAppDispatch()

  return (
    <tr key={p.id}>
      <th scope="row">
        <div className="form-check">
          <input className="form-check-input" type="checkbox" value="" />
        </div>
      </th>
      <th scope="row">{p.name}</th>
      <td><input type="text" aria-label="Last name" className="form-control" value={quantity}
        onChange={(e) => {
          setQuantity(e.target.value)
          // dispatch(updateSelectedProduct({name: p.name, quantity: e.target.value}))
        }} /></td>
      <td>{p.min}</td>
      <td>{p.max}</td>
      <td>{p.stockQuantity}</td>
    </tr>
  )
}

export default ProductToBuyRow