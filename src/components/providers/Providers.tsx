import React from 'react'
import { providerType, fetchStatus } from "../../shared/providerTypes"
import { getAllProviders, selectProviderFetchError, selectProviderState, selectProviderStatus  } from '../../store/providerSlice'
import { useSelector } from "react-redux"
import { useAppDispatch } from "../../store/store"

const Providers = () => {

  const dispatch = useAppDispatch()

  const error = useSelector(selectProviderFetchError())
  const status = useSelector(selectProviderStatus())
  const providerState = useSelector(selectProviderState())

  React.useEffect(() => {
    if (status === fetchStatus.IDLE) {
      dispatch(getAllProviders())
    }
  }, [dispatch])

  console.log(status)

  return (
    <div className="m-3">
      <h2>Providers</h2>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Phone</th>
            <th scope="col">Address</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          {providerState.map((p:providerType) => {
            return (
            <tr key={p.id}>
              <th scope="row">{p.name}</th>
              <td>{p.phone}</td>
              <td>{p.address}</td>
              <td>{p.email}</td>
            </tr>
          )}
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Providers