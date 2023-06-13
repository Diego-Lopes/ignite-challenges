import { styled } from "@/styles";
import Image from "next/image";
export const CardContainer = styled("div", {
  width: "100%",
  height: "100%",
});

export const CardContent = styled("div", {
  display: "flex",
  width: "100%",
  maxHeight: '93px',
  minWidth: "384px",
  gap: "20px",
});

export const Img = styled(Image, {
  objectFit: "cover",
  borderRadius: '8px'
});

export const BoxInfo = styled("div", {
  display: "flex",
  flexDirection: "column",
  "p, span": {
    fontFamily: "'Roboto', sans-serif",
    fontSize: "1.125rem",
    fontWeight: "400",
    lineHeight: "160%",
  },

  p: {},

  span: {
    fontWeight: "bold",
  },
});

export const Button = styled("button", {
  color: "$green500",
  background: "transparent",
  borderColor: "transparent",
  width: "auto",
  alignSelf: "flex-start",

  fontSize: '1rem',
  fontFamily: 'Roboto, sans-serif',
  fontWeight: "bold",
  marginTop: '8px'
});
