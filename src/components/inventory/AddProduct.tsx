import React from "react"
import { postProductType } from "../../shared/productTypes"
import { postProduct } from "../../state/productSlice"
import { useAppDispatch } from "../../state/store"

const AddProduct = () => {
    const [name, setName] = React.useState('')
    const [min, setMin] = React.useState(0)
    const [max, setMax] = React.useState(0)
    const [price, setPrice] = React.useState(0)
    const dispatch = useAppDispatch()

    const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
        if (name && min && max && price) {
          // dispatch
          const newProduct: postProductType = { name, stockQuantity: 0, min, max, price, active: true }
          dispatch(postProduct(newProduct))
          setName('')
          setMin(0)
          setMax(0)
          setPrice(0)
        }
      }

    return (
        <div>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addProviderModal">
                Add products
            </button>
            <div className="modal fade" id="addProviderModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">New product</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label className="form-label">Product name</label>
                                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Minimum suggested in stock</label>
                                    <input type="number" className="form-control" value={min} onChange={(e) => setMin(e.target.valueAsNumber)} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Maximum suggested in stock</label>
                                    <input type="number" className="form-control" value={max} onChange={(e) => setMax(e.target.valueAsNumber)} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Price</label>
                                    <input type="number" className="form-control" value={price} onChange={(e) => setPrice(e.target.valueAsNumber)} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={(e) => handleSubmit(e)}>Add</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddProduct