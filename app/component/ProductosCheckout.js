export default function ProductosCheckout() {
    const products = [
        {
            id: 1,
            name: 'Basic Tee',
            color: 'Black',
            href: '#',
            size: 'Large',
            price: '$32.00',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/checkout-page-02-product-01.jpg',
            imageAlt: "Front of men's Basic Tee in black."
        },
        {
            id: 2,
            name: 'Basic Tee 2',
            href: '#',
            price: '$32.00',
            color: 'Orage',
            size: 'Large',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/checkout-page-02-product-02.jpg',
            imageAlt: "Front of men's Basic Tee in black."
        }
        // More products...
    ]
    return { 
        products, 
    }
}