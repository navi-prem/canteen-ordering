import axios from "axios"
import {useRouter} from "next/router"
import {useEffect, useState} from "react"

const shops = () => {
    const [stores, setStores] = useState([])
    const router = useRouter()

    const func = async () => {
        const { data } = await axios.get('../api/stores')
        setStores(data)
    }

    useEffect(() => {
        func()
    },[])

    return (
        <div className="flex flex-row w-screen h-full">
            {stores.map((value, idx) => (
                <div style={{ backgroundImage: `url(${value.url})` }} className="flex items-end flex-1 h-[50%] p-1 m-3 font-bold bg-gray-400 bg-cover rounded-lg hover:bg-slate-300 hover:border-4 hover:border-blue-400 basis-1/3" key={idx}>
                    <div className="w-full">{value.name}</div>
                    <br/>
                    <button className="px-2 py-1 text-white bg-black rounded-md hover:bg-slate-600" onClick={() => router.push(`/stores/${value.id}`)}>Shop at {value.id}</button>
                </div>
            ))}
        </div>
    )
}

export default shops
