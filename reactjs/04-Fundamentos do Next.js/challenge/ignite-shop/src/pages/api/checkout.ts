import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/stripe";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { items } = req.body;

    if(req.method !== 'POST') {
        return res.status(405).json({error: 'Method not allowed.'})
    }

    if(!items) {
        return res.status(400).json({error: 'Price not found.'})
    }

    const success_url = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancel_url = `${process.env.NEXT_URL}/`;

    const arrayOfProducts = Object.keys(items).map((key) => items[key])
    const pricesId = arrayOfProducts.map((item) => item.price_id)

    const lineItems = pricesId.map((priceId) => {
        return {
          price: priceId,
          quantity: 1,
        }
      })

      console.log('line items', lineItems);

    const checkoutSession = await stripe.checkout.sessions.create({
        success_url,
        cancel_url,
        mode: 'payment',
        line_items: lineItems
    })

    return res.status(201).json({
        checkoutSessionId: checkoutSession.url,
    })
}