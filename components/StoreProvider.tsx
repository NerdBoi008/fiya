import { AppStore, makeStrore } from '@/lib/redux/store'
import React, { useRef } from 'react'
import { Provider } from 'react-redux'

const StoreProvider = ({
    children
}: {
    children: React.ReactNode
}) => {
    
    const storeRef = useRef<AppStore | null>(null)

    if (!storeRef.current) {
        storeRef.current = makeStrore()
    }
    
    return (
        <Provider store={storeRef.current}>
            {children}
        </Provider>
    )
}

export default StoreProvider