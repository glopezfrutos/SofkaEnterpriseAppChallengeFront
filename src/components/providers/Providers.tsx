import React from 'react'
import { providerType } from "../../shared/providerTypes"
import { fetchStatus } from '../../shared/fetchStatus' 
import { getAllProviders, selectProviderFetchError, selectProviderState, selectProviderStatus  } from '../../store/providerSlice'
import { useSelector } from "react-redux"
import { useAppDispatch } from "../../store/store"
import ProviderRow from './ProviderRow'
import AddProvider from './AddProvider'

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
          {!error && providerState.map((p:providerType) => <ProviderRow key={p.id} p={p} />)}
        </tbody>
      </table>
      <AddProvider />
    </div>
  )
}

export default Providers