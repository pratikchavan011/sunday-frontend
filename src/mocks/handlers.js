import { rest } from "msw";

export const handlers = [
  rest.get("http://ocalhost:3030/scoops", (req, res, ctx) => {
    return res(
      ctx.json([
        { name: "Chocolate", imagePath: "/images/chocolate.png" },
        { name: "Venilla", imagePath: "/images/venilla.png" },
      ])
    );
  }),
];