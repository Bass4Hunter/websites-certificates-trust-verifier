import Link from 'next/link'
import * as React from 'react';
import TrustStores from '../../components/TrustStores';
import { google } from '../../constants/google'

const Google = () => {
    return <TrustStores data={google}/>
}

export default Google