import React from "react"
import { postProviderType } from "../../shared/providerTypes"
import { postProvider } from "../../state/providerSlice"
import { useAppDispatch } from "../../state/store"

const AddProvider = () => {
    const [name, setName] = React.useState('')
    const [phone, setPhone] = React.useState('')
    const [address, setAddress] = React.useState('')
    const [active, setActive] = React.useState('')
    const [email, setEmail] = React.useState('')
    const dispatch = useAppDispatch()

    const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
        if (name && phone && address && email) {
          // dispatch
          const newProvider: postProviderType = { name, phone, address, active: true, email }
          dispatch(postProvider(newProvider))
          setName('')
          setPhone('')
          setAddress('')
          setActive('')
          setEmail('')
        }
      }

    return (
        <div>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addProviderModal">
                Add provider
            </button>
            <div className="modal fade" id="addProviderModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">New provider</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="providerName" className="form-label">Name</label>
                                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="providerPhone" className="form-label">Phone</label>
                                    <input type="tel" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="providerAddress" className="form-label">Address</label>
                                    <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="providerEmail" className="form-label">Email address</label>
                                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
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

export default AddProvider