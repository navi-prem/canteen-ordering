import {prisma} from "@/prisma/prisma"

const handler = async (req, res) => {
    console.log('here')
    if ( req.method == 'GET' ) {
        const data = await prisma.stores.findMany()
        return res.json(data)
    }
}

export default handler
