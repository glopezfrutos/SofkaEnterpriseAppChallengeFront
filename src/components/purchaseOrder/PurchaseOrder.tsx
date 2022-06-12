import React from 'react'
import { getAllProducts, selectProductFetchError, selectProductState, selectProductStatus } from '../../state/productSlice'
import { selectSelectedProductsState } from '../../state/selectedProductsSlice'
import { useAppDispatch } from '../../state/store'
import ProviderOptions from './ProviderOptions'
import { getAllProviders, selectProviderFetchError, selectProviderState, selectProviderStatus } from '../../state/providerSlice'
import { useSelector } from "react-redux"
import { fetchStatus } from '../../shared/fetchStatus'
import { providerType } from '../../shared/providerTypes'
import { postPurchaseOrderType, productInDocumentType } from '../../shared/purchaseOrderTypes'
import { postPurchaseOrder } from '../../state/purchaseOrderSlice'
import ProductToBuyRow from './ProductToBuyRow'


const PurchaseOrder = () => {
  // Variables to post a new Purchase order
  const [providerName, setProviderName] = React.useState('')
  const [providerId, setProviderId] = React.useState('')
  const [products, setProducts] = React.useState<productInDocumentType[]>([])
  const dispatch = useAppDispatch()

  // Get providers list
  const errorProvider = useSelector(selectProviderFetchError())
  const statusProvider = useSelector(selectProviderStatus())
  const stateProvider = useSelector(selectProviderState())
  React.useEffect(() => {
    if (statusProvider === fetchStatus.IDLE) {
      dispatch(getAllProviders())
    }
  }, [dispatch])

  // Get product list
  const errorProduct = useSelector(selectProductFetchError())
  const statusProduct = useSelector(selectProductStatus())
  const productState = useSelector(selectProductState())
  React.useEffect(() => {
    if (statusProduct === fetchStatus.IDLE) {
      dispatch(getAllProducts())
    }
  }, [dispatch])

  // To handle options from select list of Providers.
  let selectedProvider
  let selectedProviderHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let providerSelected = stateProvider.filter(p => (p.id == event.target.value))[0]
    setProviderName(providerSelected.name)
    setProviderId("" + providerSelected.id)
  }

  // State of selected products
  const selectedProductsState = useSelector(selectSelectedProductsState())

  // To post a new Purchase order
  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault
    setProducts(selectedProductsState)
    // dispatch
    const newOrder: postPurchaseOrderType = { providerName, providerId, products }
    dispatch(postPurchaseOrder(newOrder))
    setProviderName('')
    setProviderId('')
    setProducts([])
  }

  return (
    <div className='m-3'>
      <h3>Purchse Order</h3>
      <h5>Generate new purchase order</h5>
      <form>
        <div className="mb-3">
          <label className="form-label">Provider</label>
          <select className="form-select" aria-label="Default select example" value={selectedProvider} onChange={(event) => selectedProviderHandler(event)}>
            {!errorProvider && stateProvider.map((p: providerType) => <ProviderOptions key={p.id} provider={p} />)}
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
              {!errorProduct && productState.map(prod => <ProductToBuyRow key={prod.name} p={prod} />)}
            </tbody>
          </table>
        </div>
        {providerName && providerId && products ?
          <button type="button" className="btn btn-primary" onClick={(e) => handleSubmit(e)}>Generate Purchase Order</button> :
          <button type="button" className="btn btn-primary disabled" onClick={(e) => handleSubmit(e)}>Generate Purchase Order</button>
        }
      </form >
    </div >
  )
}

export default PurchaseOrder