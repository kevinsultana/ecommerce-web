import React from "react";
import { useParams } from "react-router";

export default function EditProduct() {
  const params = useParams();
  return <div>EditProduct {params.id}</div>;
}
