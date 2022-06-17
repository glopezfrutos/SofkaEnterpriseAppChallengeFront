import React from 'react'
import { useSelector } from 'react-redux'
import { productType } from '../../shared/productTypes'
import { addSelectedProduct, selectSelectedProductsState } from '../../state/selectedProductsSlice'
import { useAppDispatch } from '../../state/store'

interface IProps {
  p: productType
}

const ProductToBuyRow: React.FunctionComponent<IProps> = ({ p }) => {
  const [selectedQuantity, setSelectedQuantity] = React.useState(0)
  const selectedProducts = useSelector(selectSelectedProductsState())

  const checkIsAlreadySelected = () => {
    let check = false
    selectedProducts.forEach(product => {
      if (product.id == p.id) {
        check = true
      }
    });
    return check
  }

  // To push a Selected Product in the Purchase Order
  const dispatch = useAppDispatch()
  const selectProduct = () => {
    
    if (selectedQuantity > 0 && selectedQuantity <= p.stockQuantity && !checkIsAlreadySelected()) {
      dispatch(addSelectedProduct({
        id: p.id,
        name: p.name,
        stockQuantity: p.stockQuantity,
        min: p.min,
        max: p.max,
        price: p.price,
        active: p.active,
        selectedQuantity
      }))
    }
  }

  const inputQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value >= 0) {
      setSelectedQuantity(+e.target.value)
    }
  }


  return (
    <tr key={p.id}>
      <th scope="row">{p.name}</th>
      <td><input type="number" className="form-control" value={selectedQuantity}
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