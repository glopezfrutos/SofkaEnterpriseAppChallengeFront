import React from 'react'
import { getAllProducts, selectProductFetchError, selectProductState, selectProductStatus } from '../../state/productSlice'
import { useAppDispatch } from '../../state/store'
import ProviderOptions from './ProviderOptions'
import { getAllProviders, selectProviderFetchError, selectProviderState, selectProviderStatus } from '../../state/providerSlice'
import { useSelector } from "react-redux"
import { fetchStatus } from '../../shared/fetchStatus'
import { providerType } from '../../shared/providerTypes'
import ProductToBuyRow from './ProductToBuyRow'
import SelectedProducts from './SelectedProducts'


const PurchaseOrder = () => {

  const dispatch = useAppDispatch()

  

  // Get product list
  const errorProduct = useSelector(selectProductFetchError())
  const statusProduct = useSelector(selectProductStatus())
  const productState = useSelector(selectProductState())
  React.useEffect(() => {
    if (statusProduct === fetchStatus.IDLE) {
      dispatch(getAllProducts())
    }
  }, [dispatch])

 



  return (
    <div className='m-3'>
      <h3>Purchse Order</h3>
      <div className='row'>
        <div className='col-lg-8'>
          <div className='card'>
            <div className="card-body">
              <h3 className="card-title">Generate new purchase order</h3>
              <div className="card-text">
                <form>
                  
                  <div className="mb-3">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Product</th>
                          <th scope="col">Quantity</th>
                          <th scope="col">Minimum suggested </th>
                          <th scope="col">Maximum suggested	</th>
                          <th scope="col">Stock quantity</th>
                          <th scope="col">Select</th>
                        </tr>
                      </thead>
                      <tbody>
                        {!errorProduct && productState.map(prod => <ProductToBuyRow key={prod.id} p={prod} />)}
                      </tbody>
                    </table>
                  </div>
                  {statusProduct === fetchStatus.FAILED ?
                    <p>Sorry, there was an error loading data.</p> :
                    ""}
                  
                </form>
                {statusProduct === fetchStatus.PENDING ?
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div> :
                  ""}
              </div>
            </div>
          </div>
        </div>

        <div className='col-lg-4'>
          <div className='card'>
            <div className="card-body">
              <h3 className="card-title">Purchase order preview</h3>
              <div className="card-text">
                <SelectedProducts />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PurchaseOrder