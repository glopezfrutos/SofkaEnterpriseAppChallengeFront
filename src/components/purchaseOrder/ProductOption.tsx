import React from 'react'
import { productType } from '../../shared/productTypes'

interface IProps {
    product: productType
}

const ProductOption: React.FunctionComponent<IProps> = ({product}) => {
    return (
        <option value={product.id}>{product.name}</option>
    )
}

export default ProductOption