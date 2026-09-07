import { i as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-mKqPXrKx.mjs";
import { t as getSupabaseBrowser } from "./supabase-browser-CscVNh-D.mjs";
import { r as resolveMediaPath } from "./products-C02qIZJU.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime, b as useNavigate, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as CloudUpload, b as ArrowLeft, f as LoaderCircle, i as Save, m as ImagePlus, r as Trash2 } from "../_libs/lucide-react.mjs";
import { g as colors, p as categories, u as Button } from "./router-nc0T7Vaq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ProductForm-B5xVzQ9y.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MAX_IMAGES = 10;
var BUCKET$1 = "product-images";
var ACCEPT$1 = [
	"image/jpeg",
	"image/png",
	"image/webp"
];
var MAX_SIZE$1 = 10485760;
function ImageUploader({ supabase, productId, images, onChange }) {
	const inputRef = (0, import_react.useRef)(null);
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [progress, setProgress] = (0, import_react.useState)(0);
	const uploadFiles = (0, import_react.useCallback)(async (files) => {
		setError("");
		const fileList = Array.from(files);
		const total = fileList.length;
		let done = 0;
		for (const file of fileList) {
			if (!ACCEPT$1.includes(file.type)) {
				setError(`Format non supporté : ${file.name || file.type}. Utilisez JPG, PNG ou WebP.`);
				return;
			}
			if (file.size > MAX_SIZE$1) {
				setError(`Le fichier ${file.name} dépasse 10 Mo.`);
				return;
			}
		}
		setUploading(true);
		const uploaded = [];
		for (const file of fileList) {
			const ext = file.name.split(".").pop() || "jpg";
			const path = `${productId}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
			const { error: uploadErr } = await supabase.storage.from(BUCKET$1).upload(path, file, {
				contentType: file.type,
				cacheControl: "3600"
			});
			if (uploadErr) {
				setError(`Erreur d'upload : ${uploadErr.message}`);
				setUploading(false);
				return;
			}
			uploaded.push({
				storagePath: `${BUCKET$1}/${path}`,
				isPrimary: images.length === 0
			});
			done += 1;
			setProgress(Math.round(done / total * 100));
		}
		onChange([...images, ...uploaded].slice(0, MAX_IMAGES));
		setUploading(false);
		setProgress(0);
	}, [
		images,
		onChange,
		productId
	]);
	const removeImage = (0, import_react.useCallback)(async (storagePath) => {
		const next = images.filter((i) => i.storagePath !== storagePath);
		if (next.length > 0 && !next.some((i) => i.isPrimary)) next[0] = {
			...next[0],
			isPrimary: true
		};
		onChange(next);
		const path = storagePath.replace(`${BUCKET$1}/`, "");
		supabase.storage.from(BUCKET$1).remove([path]);
	}, [
		images,
		onChange,
		supabase
	]);
	const setPrimary = (0, import_react.useCallback)((storagePath) => {
		onChange(images.map((i) => ({
			...i,
			isPrimary: i.storagePath === storagePath
		})));
	}, [images, onChange]);
	const visibleCount = images.length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap gap-3",
			children: images.map((img) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "group relative h-28 w-24 overflow-hidden rounded-lg border border-line bg-sand",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: resolveMediaPath(img.storagePath),
						alt: "",
						className: "h-full w-full object-cover"
					}),
					img.isPrimary ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute left-1 top-1 rounded bg-burgundy px-1.5 py-0.5 text-[9px] tracking-wide text-paper",
						children: "Principal"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setPrimary(img.storagePath),
						className: cn("absolute left-1 top-1 rounded bg-paper/95 px-1.5 py-0.5 text-[9px] tracking-wide text-ink-soft", "opacity-0 transition-opacity group-hover:opacity-100"),
						children: "Définir principal"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => void removeImage(img.storagePath),
						className: "absolute right-1 top-1 rounded bg-red-600/90 p-1 text-paper opacity-0 transition-opacity group-hover:opacity-100",
						"aria-label": "Supprimer l'image",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
					})
				]
			}, img.storagePath))
		}),
		uploading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 flex items-center gap-3 rounded-md border border-line bg-paper px-4 py-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin text-burgundy" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-1.5 w-full overflow-hidden rounded-full bg-sand",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full rounded-full bg-burgundy transition-all",
							style: { width: `${progress}%` }
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-xs text-muted",
					children: [progress, "%"]
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => inputRef.current?.click(),
			disabled: visibleCount >= MAX_IMAGES,
			className: "mt-4 inline-flex h-11 items-center gap-2 rounded-md border border-dashed border-rose-deep/50 px-4 text-sm text-rose-deep hover:bg-sand disabled:opacity-40",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "size-4" }), visibleCount >= MAX_IMAGES ? `${MAX_IMAGES} images maximum` : "Ajouter des images"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			ref: inputRef,
			type: "file",
			accept: "image/jpeg,image/png,image/webp",
			multiple: true,
			className: "hidden",
			onChange: (e) => {
				if (e.target.files?.length) uploadFiles(e.target.files);
				e.target.value = "";
			}
		}),
		error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-red-600",
			children: error
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-xs text-muted",
			children: "JPG, PNG ou WebP — 10 Mo max par image. Cliquez pour sélectionner plusieurs fichiers."
		})
	] });
}
var MAX_VIDEOS = 3;
var BUCKET = "product-videos";
var ACCEPT = [
	"video/mp4",
	"video/webm",
	"video/quicktime"
];
var MAX_SIZE = 52428800;
function VideoUploader({ supabase, productId, videos, onChange }) {
	const inputRef = (0, import_react.useRef)(null);
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [progress, setProgress] = (0, import_react.useState)(0);
	const [currentFile, setCurrentFile] = (0, import_react.useState)("");
	const uploadFiles = (0, import_react.useCallback)(async (files) => {
		setError("");
		const fileList = Array.from(files);
		for (const file of fileList) {
			if (!ACCEPT.includes(file.type)) {
				setError(`Format non supporté : ${file.name || file.type}. Utilisez MP4, WebM ou MOV.`);
				return;
			}
			if (file.size > MAX_SIZE) {
				setError(`La vidéo ${file.name} dépasse 50 Mo.`);
				return;
			}
			if (videos.length + 1 > MAX_VIDEOS) {
				setError(`Maximum ${MAX_VIDEOS} vidéos par article.`);
				return;
			}
		}
		setUploading(true);
		const uploaded = [];
		for (const file of fileList) {
			setCurrentFile(file.name);
			const ext = file.name.split(".").pop() || "mp4";
			const path = `${productId}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
			const { error: uploadErr } = await supabase.storage.from(BUCKET).upload(path, file, {
				contentType: file.type,
				cacheControl: "3600"
			});
			if (uploadErr) {
				setError(`Erreur d'upload : ${uploadErr.message}`);
				setUploading(false);
				return;
			}
			uploaded.push(`${BUCKET}/${path}`);
			setProgress((prev) => prev + Math.round(100 / fileList.length));
		}
		onChange([...videos, ...uploaded].slice(0, MAX_VIDEOS));
		setUploading(false);
		setProgress(0);
		setCurrentFile("");
	}, [videos, onChange]);
	const removeVideo = (0, import_react.useCallback)(async (storagePath) => {
		onChange(videos.filter((v) => v !== storagePath));
		const path = storagePath.replace(`${BUCKET}/`, "");
		supabase.storage.from(BUCKET).remove([path]);
	}, [
		videos,
		onChange,
		supabase
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		videos.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3 sm:grid-cols-2",
			children: videos.map((v, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "group relative overflow-hidden rounded-lg border border-line bg-ink",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
						src: resolveMediaPath(v),
						controls: true,
						preload: "metadata",
						className: "aspect-video w-full"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => void removeVideo(v),
						className: "absolute right-2 top-2 rounded bg-red-600/90 p-1.5 text-paper opacity-0 transition-opacity group-hover:opacity-100",
						"aria-label": "Supprimer la vidéo",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "absolute left-2 top-2 rounded bg-ink/70 px-1.5 py-0.5 text-[10px] text-paper",
						children: ["Vidéo ", i + 1]
					})
				]
			}, v))
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: "Aucune vidéo ajoutée."
		}),
		uploading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 flex items-center gap-3 rounded-md border border-line bg-paper px-4 py-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin text-burgundy" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: currentFile ? `Upload de ${currentFile}…` : "Upload en cours…"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 h-1.5 w-full overflow-hidden rounded-full bg-sand",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full rounded-full bg-burgundy transition-all",
							style: { width: `${Math.min(progress, 100)}%` }
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-xs text-muted",
					children: [Math.min(progress, 100), "%"]
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => inputRef.current?.click(),
			disabled: videos.length >= MAX_VIDEOS,
			className: "mt-4 inline-flex h-11 items-center gap-2 rounded-md border border-dashed border-rose-deep/50 px-4 text-sm text-rose-deep hover:bg-sand disabled:opacity-40",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, { className: "size-4" }), videos.length >= MAX_VIDEOS ? `${MAX_VIDEOS} vidéos maximum` : "Ajouter des vidéos"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			ref: inputRef,
			type: "file",
			accept: "video/mp4,video/webm,video/quicktime",
			multiple: true,
			className: "hidden",
			onChange: (e) => {
				if (e.target.files?.length) uploadFiles(e.target.files);
				e.target.value = "";
			}
		}),
		error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-red-600",
			children: error
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-xs text-muted",
			children: "MP4, WebM ou MOV — 50 Mo max par vidéo, 3 maximum par article."
		})
	] });
}
var SIZE_OPTIONS = [
	"S",
	"M",
	"L",
	"XL",
	"XXL"
];
var emptyForm = {
	name: "",
	slug: "",
	ref: "",
	category: "ensembles",
	price: "",
	short: "",
	description: "",
	material: "",
	care: "",
	colors: [],
	sizes: [
		"S",
		"M",
		"L"
	],
	isNew: false,
	featured: false,
	isPublished: false
};
var inputCls = "h-11 w-full rounded-md border border-line bg-paper px-3 text-sm outline-none focus:border-burgundy";
function ProductForm({ product }) {
	const navigate = useNavigate();
	const supabase = getSupabaseBrowser();
	const [form, setForm] = (0, import_react.useState)(emptyForm);
	const [images, setImages] = (0, import_react.useState)([]);
	const [videos, setVideos] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [saving, setSaving] = (0, import_react.useState)(false);
	const isEdit = Boolean(product);
	(0, import_react.useEffect)(() => {
		if (product) {
			setForm({
				name: product.name,
				slug: product.slug,
				ref: product.ref,
				category: product.category,
				price: String(product.price),
				short: product.short,
				description: product.description,
				material: product.material,
				care: product.care,
				colors: product.colors,
				sizes: product.sizes,
				isNew: product.isNew ?? false,
				featured: product.featured ?? false,
				isPublished: true
			});
			setImages(product.images.map((src) => ({
				storagePath: src,
				isPrimary: false
			})));
			setVideos(product.videos ?? []);
		}
	}, [product]);
	const set = (patch) => setForm((f) => ({
		...f,
		...patch
	}));
	const slugify = (s) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
	const onNameChange = (name) => {
		set({
			name,
			slug: isEdit ? form.slug : slugify(name)
		});
	};
	const validate = () => {
		if (!form.name.trim()) return "Le nom est requis.";
		if (!form.slug.trim()) return "Le slug est requis.";
		const price = Number(form.price);
		if (!price || price <= 0) return "Le prix est requis et doit Ãªtre > 0.";
		if (form.colors.length === 0) return "SÃ©lectionnez au moins une couleur.";
		return "";
	};
	const saveDraft = async (publish) => {
		const verr = validate();
		if (verr) {
			setError(verr);
			return;
		}
		setError("");
		setSaving(true);
		const price = Number(form.price);
		const payload = {
			name: form.name,
			slug: form.slug,
			ref: form.ref || form.slug.toUpperCase(),
			category: form.category,
			price,
			short: form.short,
			description: form.description,
			material: form.material,
			care: form.care,
			colors: form.colors,
			sizes: form.sizes,
			is_new: form.isNew,
			featured: form.featured,
			is_published: publish
		};
		try {
			const { data: saved, error: err } = isEdit ? await supabase.from("products").update(payload).eq("id", product.id).select().single() : await supabase.from("products").insert(payload).select().single();
			if (err) throw new Error(err.message);
			saved.slug;
			if (isEdit) {
				const existingLocal = product.images;
				const keepPaths = images.map((i) => i.storagePath);
				for (const oldSrc of existingLocal) if (!keepPaths.includes(oldSrc) && !oldSrc.startsWith("/images/")) await supabase.from("product_images").delete().eq("product_id", product.id).eq("storage_path", oldSrc);
			}
			const storageImages = images.filter((i) => !i.storagePath.startsWith("/images/"));
			if (isEdit && storageImages.length > 0) for (const img of storageImages) {
				const existing = await supabase.from("product_images").select("id").eq("product_id", product.id).eq("storage_path", img.storagePath).maybeSingle();
				if (!existing.data) await supabase.from("product_images").insert({
					product_id: product.id,
					storage_path: img.storagePath,
					is_cover: img.isPrimary
				});
				else await supabase.from("product_images").update({ is_cover: img.isPrimary }).eq("id", existing.data.id);
			}
			if (!isEdit && storageImages.length > 0) for (let i = 0; i < storageImages.length; i++) await supabase.from("product_images").insert({
				product_id: saved.id,
				storage_path: storageImages[i].storagePath,
				position: i,
				is_cover: storageImages[i].isPrimary
			});
			const videoPaths = videos;
			if (isEdit) {
				const existingVids = product.videos ?? [];
				for (const oldV of existingVids) if (!videoPaths.includes(oldV) && !oldV.startsWith("/images/")) await supabase.from("product_videos").delete().eq("product_id", product.id).eq("storage_path", oldV);
				for (let i = 0; i < videoPaths.length; i++) {
					if (videoPaths[i].startsWith("/images/")) continue;
					if (!(await supabase.from("product_videos").select("id").eq("product_id", product.id).eq("storage_path", videoPaths[i]).maybeSingle()).data) await supabase.from("product_videos").insert({
						product_id: product.id,
						storage_path: videoPaths[i],
						position: i
					});
				}
			} else if (videoPaths.length > 0) for (let i = 0; i < videoPaths.length; i++) await supabase.from("product_videos").insert({
				product_id: saved.id,
				storage_path: videoPaths[i],
				position: i
			});
			setSaving(false);
			navigate({ to: "/admin" });
		} catch (err) {
			setError(err instanceof Error ? err.message : "Erreur d'enregistrement.");
			setSaving(false);
		}
	};
	const deleteProduct = async () => {
		if (!product) return;
		if (!window.confirm(`Supprimer dÃ©finitivement Â« ${product.name} Â» ? Cette action est irrÃ©versible.`)) return;
		setLoading(true);
		try {
			await supabase.from("product_images").delete().eq("product_id", product.id);
			await supabase.from("product_videos").delete().eq("product_id", product.id);
			await supabase.from("products").delete().eq("id", product.id);
			navigate({ to: "/admin" });
		} catch (err) {
			setError(err instanceof Error ? err.message : "Erreur de suppression.");
			setLoading(false);
		}
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "py-10 text-center text-muted",
		children: "Chargementâ€¦"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/admin",
				className: "mb-4 inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-ink",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Retour au tableau de bord"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl sm:text-4xl",
				children: isEdit ? `Modifier : ${product.name}` : "Nouvel article"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 space-y-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
						title: "Informations",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Nom de l'article *",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: form.name,
									onChange: (e) => onNameChange(e.target.value),
									className: inputCls,
									placeholder: "Ex : Ensemble Dentelle Ivoire"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Slug (URL)",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: form.slug,
										onChange: (e) => set({ slug: slugify(e.target.value) }),
										className: inputCls,
										placeholder: "ensemble-dentelle-ivoire"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "RÃ©fÃ©rence",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: form.ref,
										onChange: (e) => set({ ref: e.target.value }),
										className: inputCls,
										placeholder: "AS-DEN-IV"
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Prix (F CFA) *",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									min: "0",
									step: "500",
									value: form.price,
									onChange: (e) => set({ price: e.target.value }),
									className: inputCls,
									placeholder: "18000"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "CatÃ©gorie",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: form.category,
									onChange: (e) => set({ category: e.target.value }),
									className: inputCls,
									children: categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: c.id,
										children: c.label
									}, c.id))
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Description courte (affichÃ©e sur la carte)",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									value: form.short,
									onChange: (e) => set({ short: e.target.value }),
									className: "min-h-20 w-full rounded-md border border-line bg-paper px-3 py-2 text-sm outline-none focus:border-burgundy",
									placeholder: "Courte phrase accrocheuse"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Description complÃ¨te",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									value: form.description,
									onChange: (e) => set({ description: e.target.value }),
									className: "min-h-28 w-full rounded-md border border-line bg-paper px-3 py-2 text-sm outline-none focus:border-burgundy",
									placeholder: "Description dÃ©taillÃ©e de la piÃ¨ce"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "MatiÃ¨re",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: form.material,
										onChange: (e) => set({ material: e.target.value }),
										className: inputCls,
										placeholder: "Dentelle, tulle, satinâ€¦"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Entretien",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: form.care,
										onChange: (e) => set({ care: e.target.value }),
										className: inputCls,
										placeholder: "Lavage Ã\xA0 la mainâ€¦"
									})
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						title: "Couleurs *",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: colors.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => set({ colors: form.colors.includes(c.id) ? form.colors.filter((x) => x !== c.id) : [...form.colors, c.id] }),
								className: `inline-flex h-10 items-center gap-2 rounded-full border px-3 text-xs tracking-[0.08em] uppercase ${form.colors.includes(c.id) ? "border-burgundy bg-burgundy text-paper" : "border-line bg-paper text-ink-soft"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "size-2.5 rounded-full border border-black/10",
									style: { background: c.swatch }
								}), c.label]
							}, c.id))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						title: "Tailles",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: SIZE_OPTIONS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => set({ sizes: form.sizes.includes(s) ? form.sizes.filter((x) => x !== s) : [...form.sizes, s] }),
								className: `flex size-11 items-center justify-center rounded-md border text-sm ${form.sizes.includes(s) ? "border-burgundy bg-burgundy text-paper" : "border-line bg-paper hover:border-ink/30"}`,
								children: s
							}, s))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						title: "Images",
						hint: "Photos de l'article â€” couvrez la piÃ¨ce sous tous les angles.",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageUploader, {
							supabase,
							productId: isEdit ? product.id : `new-${Date.now()}`,
							images,
							onChange: setImages
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						title: "VidÃ©os",
						hint: "Montrez l'article en mouvement. VidÃ©o 50 Mo max, MP4 conseillÃ©.",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoUploader, {
							supabase,
							productId: isEdit ? product.id : `new-${Date.now()}`,
							videos,
							onChange: setVideos
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						title: "Options",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-3 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-3 rounded-md border border-line bg-paper px-4 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: form.isNew,
									onChange: (e) => set({ isNew: e.target.checked }),
									className: "size-4 accent-burgundy"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm",
									children: "Marquer comme nouveau"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-3 rounded-md border border-line bg-paper px-4 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: form.featured,
									onChange: (e) => set({ featured: e.target.checked }),
									className: "size-4 accent-burgundy"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm",
									children: "Mettre en avant sur l'accueil"
								})]
							})]
						})
					}),
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700",
						children: error
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-3 sm:flex-row sm:items-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "lg",
								onClick: () => void saveDraft(true),
								disabled: saving,
								className: "sm:w-auto",
								children: [saving ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "size-4" }), isEdit ? "Enregistrer les modifications" : "Publier l'article"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "lg",
								variant: "outline",
								onClick: () => void saveDraft(false),
								disabled: saving,
								className: "sm:w-auto",
								children: "Enregistrer comme brouillon"
							}),
							isEdit ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => void deleteProduct(),
								className: "ml-auto inline-flex h-11 items-center gap-2 rounded-md px-4 text-sm text-red-600 hover:bg-red-50 disabled:opacity-40",
								disabled: saving,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" }), "Supprimer"]
							}) : null
						]
					})
				]
			})
		]
	});
}
function Section({ title, hint, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl border border-line bg-paper p-5 sm:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl",
				children: title
			}),
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted",
				children: hint
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 space-y-4",
				children
			})
		]
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: "mb-1.5 block text-[11px] tracking-[0.14em] uppercase text-muted",
		children: label
	}), children] });
}
//#endregion
export { ProductForm as t };
