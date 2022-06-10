import { providerType } from "../../shared/providerTypes"

interface IProviderRowProps {
    p: providerType
  }

const ProviderRow: React.FunctionComponent<IProviderRowProps> = ({p}) => {
    return (
        <tr>
          <th scope="row">{p.name}</th>
          <td>{p.phone}</td>
          <td>{p.address}</td>
          <td>{p.email}</td>
        </tr>
      )
}

export default ProviderRow