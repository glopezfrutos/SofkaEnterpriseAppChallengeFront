import React from 'react'
import { getAllProducts, selectProductState } from '../../state/productSlice'
import { addSelectedProduct, selectSelectedProductsState } from '../../state/selectedProductsSlice'
import { useAppDispatch } from '../../state/store'
import ProviderOptions from './ProviderOptions'
import { getAllProviders, selectProviderFetchError, selectProviderState, selectProviderStatus } from '../../state/providerSlice'
import { useSelector } from "react-redux"
import { fetchStatus } from '../../shared/fetchStatus'
import { providerType } from '../../shared/providerTypes'
import { postPurchaseOrderType, productInDocumentType } from '../../shared/purchaseOrderTypes'
import { postPurchaseOrder, selectPurchaseOrderState } from '../../state/buySlice'
import ProductToBuyRow from './ProductToBuyRow'


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


  // To handle options from select list of Products.
  let selectedProduct
  let selectedProductHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let product = inventoryState.filter(p => (p.id == event.target.value))[0]
    let toShow = { name: product.name, stockQuantity: product.stockQuantity, price: product.price }
    dispatch(addSelectedProduct(toShow))
  }

  // To handle options from select list of Providers.
  let selectedProvider
  let selectedProviderHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let providerSelected = providerState.filter(p => (p.id == event.target.value))[0]
    setProviderName(providerSelected.name)
    setProviderId("" + providerSelected.id)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault
    setProducts(selectedProductsState)
    console.log(selectedProductsState)
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
                <th scope="col">Select</th>
                <th scope="col">Product</th>
                <th scope="col">Quantity</th>
                <th scope="col">Minimum suggested </th>
                <th scope="col">Maximum suggested	</th>
                <th scope="col">Stock quantity</th>
              </tr>
            </thead>
            <tbody>
              {!error && inventoryState.map(prod => <ProductToBuyRow key={prod.name} p={prod} />)}
            </tbody>
          </table>
        </div>
        <button type="button" className="btn btn-primary" onClick={(e) => handleSubmit(e)}>Generate</button>
      </form >
    </div >
  )
}

export default Buy