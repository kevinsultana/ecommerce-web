import React from "react";
import { useParams } from "react-router";

export default function ProductDetail() {
  const params = useParams();
  return <div>ProductDetail {params.id}</div>;
}
