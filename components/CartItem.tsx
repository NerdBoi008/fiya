// 'use client'

import Image from 'next/image'
import React, { useReducer } from 'react'

type CartProductType = {
    imgSrc: string,
    name: string,
    weight: number,
    actualPrice: number,
    offerPrice: number,
}

type CartItemProps = {
    product: CartProductType,
    quantity: number,
}

function reducer(
    state: { quantity: number },
    action: { type: 'INC' } | { type: 'DEC' }
): { quantity: number } {
    switch (action.type) {
        case 'INC':
            return { quantity: state.quantity + 1 };
        case 'DEC':
            if (state.quantity <= 0) {
                return { quantity: 0 };
            }
            return { quantity: state.quantity - 1 }
        default:
            return state;
    }
}

const CartItem = ({ product, quantity }: CartItemProps) => {
    
    const { imgSrc, name, weight, actualPrice, offerPrice } = product
    const [state, dispatch] = useReducer(reducer, { quantity: quantity })

    return (
        <div className='border-2 p-3 rounded-md flex items-center max-sm:items-start  flex-col sm:flex-row justify-between gap-2'>
            <div className='flex gap-3'>
                <Image
                src={imgSrc}
                alt={name}
                height={100}
                width={100}
                />
                <div>
                    <p className='text-xl '>{name}</p>
                    <p className='text-sm text-muted-foreground'>{weight}g</p>
                    <div className="flex gap-2 items-center mt-3">
                        <p className="text-2xl">&#8377; {offerPrice}</p>
                        <div className="flex gap-1">
                            <p className="line-through text-muted-foreground">{actualPrice}</p>
                            <p className="text-green-600 font-medium">{((actualPrice-offerPrice) / actualPrice * 100).toPrecision(2)}% off</p>
                        </div>  
                    </div>
                </div>
            </div>
            
            <div className='flex flex-row gap-1 items-center'>
                <p className='text-muted-foreground'>Quantity:</p>
                <div className='flex gap-3 items-center '>
                        <Image
                            src='/remove.svg'
                            alt='add icon'
                            className='size-5 border-[1px] border-primary rounded-sm cursor-pointer select-none'
                            height={12}
                            width={12}
                            onClick={() => {
                                dispatch({ type: 'DEC' })
                            }}
                        />
                        <p className='text-xl'>{state.quantity}</p>
                        <Image
                            src='/add.svg'
                            alt='add icon'
                            className='size-5 border-[1px] border-primary rounded-sm cursor-pointer select-none'
                            height={12}
                            width={12}
                            onClick={() => {
                                dispatch({ type: 'INC' })
                            }}
                        />
                </div>
            </div>
            
        </div>
    )
}

export default CartItem