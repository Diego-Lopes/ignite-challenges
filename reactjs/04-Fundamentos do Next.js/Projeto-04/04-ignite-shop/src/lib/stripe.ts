import Stripe from "stripe";

export const stripe = new Stripe(
  "sk_test_51MsejQItRknFcmnlmhk1KQfCyiTUY7ylv2ejHc398ZiuLvLxgDG5iGIaskd7bOf8xCH4hrRXRyb0dRiAwA3GOocL008rXy4LaE",
  {
    apiVersion: "2022-11-15",
    appInfo: {
      //fica o log das requisições no stripe.
      name: "ignite shop",
    },
  }
);
