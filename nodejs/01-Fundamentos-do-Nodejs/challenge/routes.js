export const routes = [
  {
    method: "GET",
    path: "/taks",
    handler: (req, res) => {
      console.log(req.query);
      return res.end("ok in method GET");
    },
  },
];
