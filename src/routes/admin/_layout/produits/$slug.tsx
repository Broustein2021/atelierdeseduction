import { createFileRoute, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ProductForm } from "@/components/admin/ProductForm";
import { fetchProductBySlugAdmin, type ProductWithMedia } from "@/lib/products";

export const Route = createFileRoute("/admin/_layout/produits/$slug")({
  component: EditProductPage,
});

function EditProductPage() {
  const { slug } = Route.useParams();
  const [product, setProduct] = useState<ProductWithMedia | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    fetchProductBySlugAdmin(slug)
      .then((p) => {
        if (!active) return;
        if (!p) {
          setError("notfound");
          return;
        }
        setProduct(p);
      })
      .catch((e) => {
        if (active) setError(e.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [slug]);

  if (loading) {
    return <p className="py-10 text-center text-muted">Chargement…</p>;
  }

  if (error === "notfound" || !product) {
    throw notFound();
  }

  return <ProductForm product={product} />;
}
