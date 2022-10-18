import Link from 'next/link'
import * as React from 'react';
import TrustStores from '../../components/TrustStores';
import { firefox } from '../../constants/firefox'

const Mozilla = () => {
    return <TrustStores data={firefox} />
}

export default Mozilla