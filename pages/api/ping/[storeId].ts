import {prisma} from "@/prisma/prisma"
import {stringify} from "querystring"


const handler = async (req, res) => {
    if ( req.method == 'GET' ) {
        const { storeId } = req.query
        const all = await prisma.dish.findMany({
            where: {
                storeId: parseInt(storeId)
            }
        })
        res.json(all)
    }
}

export default handler
