import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {useRouter} from 'next/router'

const Layout = () => {
    const router = useRouter()
    return (
        <div className='flex flex-row-reverse p-3 text-white bg-black'>
            <button onClick={() => router.push('/')} className='rounded transition-all p-3 font-bold hover:scale-[1.25]'>Home</button>
            <button onClick={() => router.push('order')} className='rounded transition-all hover:scale-[1.25] p-3 font-bold'>Order</button>
            <button onClick={() => router.push('admin')} className='rounded transition-all hover:scale-[1.25] p-3 font-bold'>Admin</button>
        </div>
    )
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className='w-full h-screen'>
        <Layout />
        <Component {...pageProps} />
    </div>
  )
}
