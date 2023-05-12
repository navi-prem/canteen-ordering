import axios from "axios"
import {useEffect, useState} from "react"

const admin = () => {
    const [ something , setSomething ] = useState(true)
    const [ user , setUser ] = useState('')
    const [ pass , setPass ] = useState('')
    const [ items , setItems ] = useState([])
    const [ red , setRed ] = useState(false)

    const func = async () => {
        const { data } = await axios.get('../api/admin')
        setItems(data)
    }

    useEffect(() => {
        func()
    },[something])

    const handle = async (e) => {
        e.preventDefault()
        const { data: { status } } = await axios.post('../api/admin', {
            user,
            pass
        })
        if ( status == 200 ) setSomething(false)
        else {
            setRed(true)
            setTimeout(() => setRed(false), 500)
        }
    }

    if ( red ) return (
        <div className="flex items-center justify-center w-full h-[75%]">
            <form onSubmit={handle} className='p-4 border-2 border-black space-y-2 rounded-md'>
                <label className="font-bold">Username: &nbsp;</label>
                <input className="border-2 border-red-500 hover:border-red-500 rounded-md" onChange={(e) => setUser(e.target.value)} type="text"/>
                <br/>
                <label className="font-bold">Password: &nbsp;&nbsp;</label>
                <input className="border-2 border-red-500 rounded-md" onChange={(e) => setPass(e.target.value)} type="password"/>
                <br/>
                <button className="transition-all font-bold px-1 py-[4px] text-black border-2 border-black bg-white rounded-lg" type='submit'>Enter</button>
            </form>
        </div>
    )
    else if ( something ) return (
        <div className="flex items-center justify-center w-full h-[75%]">
            <form onSubmit={handle} className='p-4 border-2 border-black space-y-2 rounded-md'>
                <label className="font-bold">Username: &nbsp;</label>
                <input className="border-2 border-black rounded-md" onChange={(e) => setUser(e.target.value)} type="text"/>
                <br/>
                <label className="font-bold">Password: &nbsp;&nbsp;</label>
                <input className="border-2 border-black rounded-md" onChange={(e) => setPass(e.target.value)} type="password"/>
                <br/>
                <button className="hover:bg-black transition-all hover:text-white font-bold px-1 py-[4px] text-black border-2 border-black bg-transparent rounded-lg" type='submit'>Enter</button>
            </form>
        </div>
    )
    else return (
        <>
        <div className="flex items-center justify-center w-full h-[75%]">
            {items.length != 0 ? (
                <table className=''>
                    {items.map((i,idx) => {
                        return (
                                <tr key={idx}>
                                <td className="p-4 border border-slate-700">{i.name}</td>
                                <td className="p-4 border border-slate-700">{i.quantity}</td>
                                <td className="p-4 border border-slate-700">{i.userId}</td>
                                <td className="p-4 border border-slate-700">{i.store}</td>
                                </tr>
                               )
                        })}
                </table>) : (
                    <p>There are no items to display</p>
                )
            }
        </div>
        </>
    )
}

export default admin
