import React from 'react'
import { postProductType, productType } from '../../shared/productTypes'
import { getAllProducts, postProduct, selectProductState } from '../../store/productSlice'
import { addSelectedProduct, removeSelectedProduct, selectSelectedProductsState, updateSelectedProduct } from '../../store/selectedProductsSlice'
import { useAppDispatch } from '../../store/store'
import ProviderOptions from './ProviderOptions'
import { getAllProviders, selectProviderFetchError, selectProviderState, selectProviderStatus } from '../../store/providerSlice'
import { useSelector } from "react-redux"
import { fetchStatus } from '../../shared/fetchStatus'
import { providerType } from '../../shared/providerTypes'
import ProductOption from './ProductOption'
import { postPurchaseOrderType, productInDocumentType } from '../../shared/purchaseOrderTypes'
import { postPurchaseOrder, selectPurchaseOrderState, addPurchaseOrder } from '../../store/buySlice'


const Buy = () => {
  const [providerName, setProviderName] = React.useState('')
  const [providerId, setProviderId] = React.useState('')
  const [products, setProducts] = React.useState<productInDocumentType[]>()
  const dispatch = useAppDispatch()

  

  const error = useSelector(selectProviderFetchError())
  const status = useSelector(selectProviderStatus())
  const providerState = useSelector(selectProviderState())
  const inventoryState = useSelector(selectProductState())
  const purchaseOrderState = useSelector(selectPurchaseOrderState())
  const selectedProductsState = useSelector(selectSelectedProductsState())

  React.useEffect(() => {
    if (status === fetchStatus.IDLE) {
      dispatch(getAllProviders())
    }
  }, [dispatch])

  React.useEffect(() => {
    if (status === fetchStatus.IDLE) {
      dispatch(getAllProducts())
    }
  }, [dispatch])


  // To handle options frome select list of Products.
  let selectedProduct
  let selectedProductHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let product = inventoryState.filter(p => (p.id == event.target.value))[0]
    let toShow = { name: product.name, quantity: product.stockQuantity, price: product.price }
    dispatch(addSelectedProduct(toShow))
  }

  let selectedProvider
  let selectedProviderHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let providerSelected = providerState.filter(p => (p.id == event.target.value))[0]
    setProviderName(providerSelected.name)
    setProviderId("" + providerSelected.id)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {  
    e.preventDefault
    console.log(providerName)
    console.log(providerId)
    setProducts(selectedProductsState)
    console.log(products)
    if (providerName && providerId && products) {
      
      // dispatch
      const newOrder: postPurchaseOrderType = { providerName, providerId, products }
      console.log(newOrder)
      dispatch(postPurchaseOrder(newOrder))
      setProviderName('')
      setProviderId('')
      setProducts(undefined)
    }
  }

  return (
    <div className='m-3'>
      <h3>Buy stock</h3>
      <h4>Generate new purchase order</h4>
      <form>
        <div className="mb-3">
          <label className="form-label">Provider</label>
          <select className="form-select" aria-label="Default select example" value={selectedProvider} onChange={(event) => selectedProviderHandler(event)}>
            {!error && providerState.map((p: providerType) => <ProviderOptions key={p.id} provider={p} />)}
          </select>
        </div>


        <div className="mb-3">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Quantity</th>
                <th scope="col">Stock available</th>
                <th scope="col">Price per unit</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {selectedProductsState.map(p => {
                return (
                  <tr key={p.name}>
                    <th scope="row">{p.name}</th>
                    <td><input type="text" aria-label="Last name" className="form-control"
                      onClick={() => dispatch(updateSelectedProduct({name: p.name, quantity: p.quantity}))} /></td>
                    <td>{p.quantity}</td>
                    <td>{p.price}</td>
                    <td>
                      <button className="btn btn-outline-danger" onClick={() => dispatch(removeSelectedProduct(p.name))}>
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className="mb-3">
          <div className='row'>
            <label className="form-label col-2">Add a product: </label>
            <select className="form-select col" aria-label="Default select example" value={selectedProduct} onChange={(event) => selectedProductHandler(event)}>
              {!error && inventoryState.map((p: productType) => p.active ? <ProductOption key={p.id} product={p} /> : "")}
            </select>
          </div>
        </div>

        <button type="button" className="btn btn-primary" onClick={(e) => handleSubmit(e)}>Generate</button>
      </form >
    </div >
  )
}

export default Buy