import { CheckCircleIcon, TrashIcon } from '@heroicons/react/20/solid'
export default function ProductoCheckoutView(product) {
    // console.log(product.product.id)
    return (
        <>
            <li key={product.product.id} className='flex px-4 py-6 sm:px-6'>
                    <div className='flex-shrink-0'>
                      <img src={product.product.imageSrc} alt={product.product.imageAlt} className='w-20 rounded-md' />
                    </div>

                    <div className='ml-6 flex flex-1 flex-col'>
                      <div className='flex'>
                        <div className='min-w-0 flex-1'>
                          <h4 className='text-sm'>
                            <a href={product.product.href} className='font-medium text-gray-700 hover:text-gray-800'>
                              {product.product.title}
                            </a>
                          </h4>
                          <p className='mt-1 text-sm text-gray-500'>{product.product.color}</p>
                          <p className='mt-1 text-sm text-gray-500'>{product.product.size}</p>
                        </div>

                        <div className='ml-4 flow-root flex-shrink-0'>
                          <button
                            type='button'
                            className='-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500'
                          >
                            <span className='sr-only'>Remove</span>
                            <TrashIcon className='h-5 w-5' aria-hidden='true' />
                          </button>
                        </div>
                      </div>

                      <div className='flex flex-1 items-end justify-between pt-2'>
                        <p className='mt-1 text-sm font-medium text-gray-900'>{product.product.price}</p>

                        <div className='ml-4'>
                          <label htmlFor='quantity' className='sr-only'>
                            Quantity
                          </label>
                          <select
                            id='quantity'
                            name='quantity'
                            className='rounded-md border border-gray-300 text-left text-base font-medium text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm'
                          >
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </li>
        </>
    )
}