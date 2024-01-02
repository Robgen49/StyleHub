export interface Product {
    id: number;
    price: number;
    title: string;
    image: string;
    AwerageRaiting: number;
    typeId: number;
    currentCount: number;
    saledCount: number;
    createdAt: string;
    updatedAt: string;
}
export interface ProductInfo {
    product: Product;
    productInfoArray: ProductInfoItem[]
}
export interface ProductInfoItem {
    id: number;
    productId: number;
    attributeId: number;
    value: string;
    createdAt: string;
    updatedAt: string;
}
export interface Attibutes {
    attributes: Attribute[]
}
export interface Attribute {
    id: number;
    typeId: number;
    name: string;
    createdAt: string;
    updatedAt: string;
}
export interface CartItem {
    cartId: number;
    productId: number;
    count: number;
    id: number;
}
export interface CartSum {
    sum: number;
}
export interface Order {
    id: number;
    userId: number;
    completedAt: string;
    createdAt: string;
}
export interface OrderItem {
    id: number;
    productId: number;
    orderId: number;
    count: number;
}