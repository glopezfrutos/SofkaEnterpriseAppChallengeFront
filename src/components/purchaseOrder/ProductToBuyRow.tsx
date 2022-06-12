import React from 'react'
import { productType } from '../../shared/productTypes'
import { productInDocumentType } from '../../shared/purchaseOrderTypes'
import { addSelectedProduct } from '../../state/selectedProductsSlice'
import { useAppDispatch } from '../../state/store'

interface IProps {
  p: productType
}

const ProductToBuyRow: React.FunctionComponent<IProps> = ({ p }) => {
  const [selected, setSelected] = React.useState(false)
  const [name, setName] = React.useState(p.name)
  const [quantity, setQuantity] = React.useState(p.stockQuantity < p.min ? p.min - p.stockQuantity : "")
  const [price, setPrice] = React.useState(p.price)

  const onSelectProduct = () => {
    setSelected(!selected)
    pushProduct()
  }

  const inputQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(e.target.value == "" ? "" : +e.target.value)
    console.log(quantity)
    if (quantity == 0 || quantity == "") {
      setSelected(false)
    } else {
      setSelected(true)
      pushProduct()
    }
  }

  // To push a Selected Product in the Purchase Order
  const dispatch = useAppDispatch()
  const pushProduct = () => {
    const selectedProduct: productInDocumentType = { name, quantity: +quantity, price }
    dispatch(addSelectedProduct(selectedProduct))
  }


  return (
    <tr key={p.id}>
      <th scope="row">
        <div className="form-check">
          <input className="form-check-input" type="checkbox" checked={selected} onChange={onSelectProduct} />
        </div>
      </th>
      <th scope="row">{p.name}</th>
      <td><input type="number" aria-label="Last name" className="form-control" value={quantity}
        onChange={(e) => inputQuantity(e)} /></td>
      <td>{p.min}</td>
      <td>{p.max}</td>
      <td>{p.stockQuantity}</td>
    </tr>
  )
}

export default ProductToBuyRow