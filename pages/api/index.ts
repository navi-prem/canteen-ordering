import Razorpay from "razorpay"
import { prisma } from "@/prisma/prisma"

const instance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

const handler = async ( req , res ) => {
    if ( req.method == 'POST' ) {
        const { amount , currency } = req.body
        const order = await instance.orders.create(
          {
            amount,
            currency
          }
        )
        res.json(order)
    }
    if ( req.method == 'GET' ) {
        const all = await prisma.dish.findMany()
        res.json(all)
    }
}

export default handler
