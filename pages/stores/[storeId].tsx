import {useEffect, useState} from "react"
import axios from "axios"
import {useRouter} from "next/router"

const id = () => {
    const router = useRouter()
    const [ allItems , setAll ] = useState([])
    const [ id , setId ] = useState('')

    const handleRazorpay = async (e, amount) => {

        if ( amount == 0 ) return

        e.preventDefault()
        const {data} = await axios.post("/api", {
            amount: amount * 100,
            currency: "INR"
        })

        const options = {
            key: process.env.KEY_ID,
            amount: data.amount,
            currency: data.currency,
            name: 'Transaction',
            description: 'Summa Transaction',
            order_id: data.id,
            handler: async function (response) {
                const result = allItems.filter(item => item.count > 0)
                const { data } = await axios.post('../api/payment-success', result )
                setId(data.id)
            },
            theme: {
                color: '##2563eb',
            },
        }
        
        const ins = new Razorpay(options)
        ins.open()
    }


    useEffect(()=> {
        const func = async () => {
            const { data } = await axios.get(`../api/ping/${router.query.storeId}`)
            const items = data.map(item => 
                    {
                    return {...item, count: 0}
                    }
                    )
            setAll(items)
        }
        if(router.query.storeId) func()
    },[router.query.storeId])

  return (
  <>
    <div className="flex flex-row h-[300px] justify-around">
        {allItems.length === 0 ? "There are no items to display" : (
            allItems.map((value, idx) => (
                <div style={{ backgroundImage: `url(${value.url})` }} className="flex-1 h-full p-1 m-3 font-bold bg-gray-400 bg-cover rounded-lg hover:bg-slate-300 hover:border-4 hover:border-blue-400 h-80 basis-1/3" key={idx}>{value.name} <p className="font-medium">{'₹'} {value.price}</p>
                <button className="px-2 py-1 text-white bg-black rounded-md hover:bg-slate-600" onClick={() => {
                    if ( value.count != 0 ) value.count -= 1;
                    setAll([...allItems])
                }}>-</button>
                {' '}{value.count}{' '}
                <button className="px-2 py-1 text-white bg-black rounded-md hover:bg-slate-600" onClick={() => {
                    if ( value.count != value.quantity ) value.count += 1;
                    setAll([...allItems])
                }}>+</button>
                </div>
                ))
            )}
    </div>
    <br/><br/>
    <div className="flex justify-center">
    <button className="px-2 py-1 text-white bg-black rounded-full hover:bg-slate-600" onClick={(e) => handleRazorpay(e, allItems.map(i => i.price * i.count).reduce((i, tot) => i + tot, 0))}>Checkout</button>
    </div>
    <br/>
    {id === '' ? "" : <div className="flex justify-center">
    <p className="font-bold">Your order id: <button onClick={() => navigator.clipboard.writeText(id)}>{id}</button></p>
    </div>}
  </>
  )
}

export default id
