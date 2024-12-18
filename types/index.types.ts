export declare type User = {
    $id: string,
    firstName: string,
    lastName: string,
    email: string,
}

export declare type Product = {
    productId: string,
    imgSrc: string,
    otherImgSrcSet: string[],
    name: string,
    form: string,
    weight: number,
    actualPrice: number,
    offerPrice: number,
    rating: number,
    ingredients: string[],
    description: string,
    highlights: string[],
}

export declare type Category = {
    id: string,
    categoryName: string,
    imgSrc: string,
    productsId: string[],
}

export interface QueryParams {
    categoryId?: string,
    productId?: string,
    search?: string,
}

export type CartItem = {
    productId: string,
    quantity: number,
}

export type Cart = {
    cart: Set<CartItem>,
}
