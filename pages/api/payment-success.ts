import { prisma } from "@/prisma/prisma"

const handler = async ( req , res ) => {
    if ( req.method == 'POST' ) {
        const orders = req.body
        for ( const order of orders ) {
            const value = await prisma.dish.findUnique({
                where: {
                    name: order.name
                }
            })
            const newQuantity = value.quantity - order.count
            await prisma.dish.update({
                where: {
                    name: order.name
                },
                data: {
                    quantity: newQuantity
                }
            })
        }
        const value = orders.map(order => ({ name: order.name , quantity: order.count }))
        const newOrder = await prisma.user.create({
            data: {
                orders: {
                    create: value
                }
            },
            include: {
                orders: true
            }
        })
        res.json(newOrder)
    }
}
export default handler
