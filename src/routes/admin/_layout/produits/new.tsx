import { createFileRoute } from "@tanstack/react-router";
import { ProductForm } from "@/components/admin/ProductForm";

export const Route = createFileRoute("/admin/_layout/produits/new")({
  component: NewProductPage,
});

function NewProductPage() {
  return <ProductForm />;
}
