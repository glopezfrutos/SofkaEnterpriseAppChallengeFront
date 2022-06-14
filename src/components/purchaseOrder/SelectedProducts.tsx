import React from 'react'
import { useSelector } from 'react-redux'
import { fetchStatus } from '../../shared/fetchStatus'
import { providerType } from '../../shared/providerTypes'
import { postPurchaseOrderType, productInDocumentType } from '../../shared/purchaseOrderTypes'
import { getAllProviders, selectProviderFetchError, selectProviderState, selectProviderStatus } from '../../state/providerSlice'
import { postPurchaseOrder } from '../../state/purchaseOrderSlice'
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


    const selectedProducts = useSelector(selectSelectedProductsState())
    // Variables to post a new Purchase order
    const [providerName, setProviderName] = React.useState('')
    const [providerId, setProviderId] = React.useState('')

    // To push a Selected Product in the Purchase Order
    const removeProduct = (p: productInDocumentType) => {
        dispatch(removeSelectedProduct({ name: p.name, price: p.price, quantity: p.quantity }))
    }

    // To post a new Purchase order
    const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault
        // dispatch
        const newOrder: postPurchaseOrderType = { providerName, providerId, products: selectedProducts }
        dispatch(postPurchaseOrder(newOrder))
        setProviderName('')
        setProviderId('')
        dispatch(clearSelectedProduct(''))
        console.log(selectedProducts)
    }

    // To handle options from select list of Providers.
    let selectedProvider
    let selectedProviderHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        let providerSelected = stateProvider.filter(p => (p.id == event.target.value))[0]
        setProviderName(providerSelected.name)
        setProviderId("" + providerSelected.id)
    }

    return (
        <div>
            <div className="mb-3">
                <label className="form-label">Provider</label>
                <select className="form-select" aria-label="Default select example" value={selectedProvider} onChange={(event) => selectedProviderHandler(event)}>
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
                            <tr>
                                <th scope="row">{p.name}</th>
                                <td>{p.price}</td>
                                <td>{p.quantity}</td>
                                <td>
                                    <button type="button" className="btn btn-primary" onClick={() => removeProduct(p)}>Trash</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {providerName && providerId ?
                <button type="button" className="btn btn-primary" onClick={(e) => handleSubmit(e)}>Generate Purchase Order</button> :
                <button type="button" className="btn btn-primary disabled" onClick={(e) => handleSubmit(e)}>Generate Purchase Order</button>
            }
        </div>
    )
}

export default SelectedProducts