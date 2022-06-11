import React from 'react'
import {productType} from "../../shared/productTypes";
import {useAppDispatch} from "../../store/store";
import {useSelector} from "react-redux";
import {
  getAllProducts,
  selectProductFetchError,
  selectProductState,
  selectProductStatus
} from "../../store/productSlice";
import {fetchStatus} from "../../shared/fetchStatus";
import ProductRow from "./ProductRow";
import AddProduct from './AddProduct';

const Inventory = () => {

  const dispatch = useAppDispatch()

  const error = useSelector(selectProductFetchError())
  const status = useSelector(selectProductStatus())
  const inventoryState = useSelector(selectProductState())

  React.useEffect(() => {
    if (status === fetchStatus.IDLE) {
      dispatch(getAllProducts())
    }
  }, [dispatch])

  return (
      <div className="m-3">
        <h2>Inventory</h2>
        <table className="table table-hover">
          <thead>
          <tr>
            <th scope="col">Product name</th>
            <th scope="col">Minimum suggested</th>
            <th scope="col">Maximum suggested</th>
            <th scope="col">Stock quantity</th>
            <th scope="col">Price</th>
            {/* <th scope="col"></th> */}
          </tr>
          </thead>
          <tbody>
          {!error && inventoryState.map((p:productType) => p.active?<ProductRow key={p.id} p={p} /> :"")}
          </tbody>
        </table>
        <AddProduct />
      </div>
  )
}

export default Inventory
