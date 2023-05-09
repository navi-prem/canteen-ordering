import {prisma} from "@/prisma/prisma"

const handler = async ( req , res ) => {
    if ( req.method == 'POST' ) {
        const data = req.body
        const d2 = await prisma.admin.findMany()
        if ( d2[0].user == data.user && d2[0].pass == data.pass ) {
            return res.json({status:200})
        }
        return res.json({status:500})
    }
    if ( req.method == 'GET' ) {
        const today = new Date()
        const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate())
        const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
        const elements = await prisma.order.findMany({
            where: {
                date: {
                    gte: startOfDay,
                    lt: endOfDay,
                },
            },
        })
        return res.json(elements)
    }
}

export default handler
