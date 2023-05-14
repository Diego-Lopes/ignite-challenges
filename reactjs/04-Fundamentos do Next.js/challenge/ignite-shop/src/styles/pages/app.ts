import { before } from "node:test";
import { styled } from "..";

export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
  minHeight: "100vh",
});

export const Header = styled("header", {
  padding: "2rem 0",
  width: "100%",
  maxWidth: 1180,
  margin: "0 auto",
  display: "flex",
  justifyContent: "space-between",
});

export const ShoppingCart = styled("button", {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
  position: "relative",

  backgroundColor: 'transparent',
  border: 0,
  cursor: "pointer",

  ".value": {
    position: "absolute",
    right: "-10px",
    top: "-10px",
    padding: "12px",
    maxWidth: "70%",
    maxHeight: "70%",
    border: "3px solid black",
    borderRadius: "100%",
    backgroundColor: "$green500",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
  },
});
