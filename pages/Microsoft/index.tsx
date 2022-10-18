import Link from 'next/link'
import * as React from 'react';
import TrustStores from '../../components/TrustStores';
import { microsoft } from '../../constants/microsoft'

const Microsoft = () => {
    return <TrustStores data={microsoft} />
}

export default Microsoft