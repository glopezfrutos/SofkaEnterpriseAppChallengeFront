import React from 'react'
import { useSelector } from 'react-redux'
import { fetchStatus } from '../../shared/fetchStatus'
import { productType, selectedProductToPurchaseType } from '../../shared/productTypes'
import { providerType } from '../../shared/providerTypes'
import { postPurchaseOrderType } from '../../shared/purchaseOrderTypes'
import { putProduct } from '../../state/productSlice'
import { getAllProviders, selectProviderFetchError, selectProviderState, selectProviderStatus } from '../../state/providerSlice'
import { getAllPurchaseOrders, postPurchaseOrder, selectPurchaseOrderState } from '../../state/purchaseOrderSlice'
import { clearSelectedProduct, removeSelectedProduct, selectSelectedProductsState } from '../../state/selectedProductsSlice'
import { useAppDispatch } from '../../state/store'
import ProviderOptions from './ProviderOptions'

const SelectedProducts = () => {
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


    // Get Purchase Orders list
    const [refresh, setRefresh] = React.useState(false)
    const statePurchaseOrder = useSelector(selectPurchaseOrderState())
    React.useEffect(() => {
        dispatch(getAllPurchaseOrders())
    }, [dispatch, refresh])


    const selectedProducts = useSelector(selectSelectedProductsState())
    // Variables to post a new Purchase order
    const [providerName, setProviderName] = React.useState('')
    const [providerId, setProviderId] = React.useState('')

    // To push a Selected Product in the Purchase Order
    const removeProduct = (p: productType) => {
        dispatch(removeSelectedProduct(p))
    }

    // To post a new Purchase order
    const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault
        // dispatch Purchase Order
        const newOrder: postPurchaseOrderType = {
            providerName,
            providerId,
            products: selectedProducts.map(product => {
                return {
                    id: product.id,
                    name: product.name,
                    quantity: product.selectedQuantity,
                    price: product.price
                }
            })
        }
        dispatch(postPurchaseOrder(newOrder))
        // Handle Stock
        selectedProducts.forEach(product => {
            handleStock(product)
        });
        // Refresh
        setRefresh(true)
        // Reset values
        dispatch(clearSelectedProduct(''))
    }

    // To handle options from select list of Providers.
    let selectedProvider
    let selectedProviderHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        let providerSelected = stateProvider.filter(p => (p.id == event.target.value))[0]
        setProviderName(providerSelected.name)
        setProviderId("" + providerSelected.id)
    }


    // To modify each produc stock
    const handleStock = async (product: selectedProductToPurchaseType) => {
        const newQuantity = product.stockQuantity + product.selectedQuantity;
        dispatch(putProduct({
            id: product.id,
            name: product.name,
            price: product.price,
            min: product.min,
            max: product.max,
            stockQuantity: newQuantity,
            active: product.active
        }))
    }

    return (
        <div>
            <div className="mb-3">
                <label className="form-label">Provider</label>
                <select className="form-select" aria-label="Default select example" value={selectedProvider} onChange={(event) => selectedProviderHandler(event)}>
                    <option disabled selected hidden> --- Select an option --- </option>
                    {!errorProvider && stateProvider.map((p: providerType) => <ProviderOptions key={p.id} provider={p} />)}
                </select>
                {statusProvider === fetchStatus.PENDING ?
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div> :
                    ""}
                {statusProvider === fetchStatus.FAILED ?
                    <p>Sorry, there was an error loading data.</p> :
                    ""}
            </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Product name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        {/* <th scope="col"></th> */}
                    </tr>
                </thead>
                <tbody>
                    {selectedProducts.map(p => {
                        return (
                            <tr key={p.id}>
                                <th scope="row">{p.name}</th>
                                <td>{p.selectedQuantity}</td>
                                <td>
                                    <button type="button" className="btn btn-primary" onClick={() => removeProduct(p)}>Trash</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {providerName && providerId ?
                <button type="button" className="btn btn-primary" onClick={(e) => handleSubmit(e)} data-bs-toggle="modal" data-bs-target="#addProviderModal">Generate Purchase Order</button> :
                <button type="button" className="btn btn-primary disabled" onClick={(e) => handleSubmit(e)}>Generate Purchase Order</button>
            }


            {/* Generated Purchase Order MODAL */}
            <div className="modal fade" id="addProviderModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="exampleModalLabel">New purchase order generated:</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {statePurchaseOrder
                                .slice(-1)
                                .map(order => {
                                    return (
                                        <div key={order.id}>
                                            <h5> Order Number: {statePurchaseOrder.slice(-2).map(order => order.orderNumber ? order.orderNumber : 0)[0]+1}</h5>
                                            <p> Provider: {order.providerName} </p>
                                            <p> Date: {order.date}</p>

                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Product name</th>
                                                        <th scope="col">Product quantity</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {order.products.map(product => {
                                                        return (
                                                            <tr key={product.id}>
                                                                <td>{product.name}</td>
                                                                <td>{product.quantity}</td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                            <br />
                                        </div>
                                    )
                                })
                            }

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>


        </div >
    )
}

export default SelectedProducts