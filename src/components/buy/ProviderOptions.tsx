import React from 'react'
import { providerType } from '../../shared/providerTypes'


interface IProps {
    provider: providerType
}

const ProviderOptions: React.FunctionComponent<IProps> = ({provider}) => {
    return (
        <option value={provider.id}>{provider.name}</option>
    )
}

export default ProviderOptions