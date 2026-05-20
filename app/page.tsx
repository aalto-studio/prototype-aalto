"use client";
import React, { useMemo, useState } from "react";
import {
  Check,
  Copy,
  Download,
  ExternalLink,
  FileText,
  Paintbrush,
  Palette,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { motion } from "framer-motion";

const productLibrary = [
  { name: "Interior Low Sheen", brand: "Aalto Ultra Premium", category: "Interior", finish: "Low Sheen", url: "https://www.AALTO STUDIOpaint.co.nz/shop/product/interior-low-sheen", dataSheet: "https://www.aaltopaint.co.nz/data-sheets?category=interior" },
  { name: "Ultimate Interior Matt", brand: "Aalto Ultra Premium", category: "Interior", finish: "Matt", url: "https://www.aaltopaint.co.nz/shop/product/ultimate-interior-matt", dataSheet: "https://www.aaltopaint.co.nz/data-sheets?category=interior" },
  { name: "Trade Interior Low Sheen", brand: "Aalto Tradeline", category: "Interior", finish: "Low Sheen", url: "https://www.aaltopaint.co.nz/shop/product/trade-interior-low-sheen", dataSheet: "https://www.aaltopaint.co.nz/data-sheets?category=interior" },
  { name: "Ceiling Paint", brand: "Aalto Ultra Premium", category: "Interior", finish: "Flat", url: "https://www.aaltopaint.co.nz/shop/product/ceiling-paint", dataSheet: "https://www.aaltopaint.co.nz/data-sheets?category=interior" },
  { name: "Trade Ceiling Paint", brand: "Aalto Tradeline", category: "Interior", finish: "Flat", url: "https://www.aaltopaint.co.nz/shop/product/trade-ceiling-paint", dataSheet: "https://www.aaltopaint.co.nz/data-sheets?category=interior" },
  { name: "Waterbased Enamel Gloss", brand: "Aalto Ultra Premium", category: "Trims/Doors", finish: "Gloss", url: "https://www.aaltopaint.co.nz/shop/product/waterbased-enamel-gloss", dataSheet: "https://www.aaltopaint.co.nz/data-sheets?category=trims-doors" },
  { name: "Waterbased Enamel Semi Gloss", brand: "Aalto Ultra Premium", category: "Trims/Doors", finish: "Semi Gloss", url: "https://www.aaltopaint.co.nz/shop/product/waterbased-enamel-semi-gloss", dataSheet: "https://www.aaltopaint.co.nz/data-sheets?category=trims-doors" },
  { name: "Waterbased Enamel Satin", brand: "Aalto Ultra Premium", category: "Trims/Doors", finish: "Satin", url: "https://www.aaltopaint.co.nz/shop/product/waterbased-enamel-satin", dataSheet: "https://www.aaltopaint.co.nz/data-sheets?category=trims-doors" },
  { name: "Waterbased Enamel Low Sheen", brand: "Aalto Ultra Premium", category: "Trims/Doors", finish: "Low Sheen", url: "https://www.aaltopaint.co.nz/shop/product/waterbased-enamel-low-sheen", dataSheet: "https://www.aaltopaint.co.nz/data-sheets?category=interior" },
  { name: "Trade WB Enamel Satin", brand: "Aalto Tradeline", category: "Trims/Doors", finish: "Satin", url: "https://www.aaltopaint.co.nz/shop/product/trade-wb-enamel-satin", dataSheet: "https://www.aaltopaint.co.nz/data-sheets?category=interior" },
  { name: "Trade WB Enamel Flat", brand: "Aalto Tradeline", category: "Trims/Doors", finish: "Flat", url: "https://www.aaltopaint.co.nz/shop/product/trade-wb-enamel-flat", dataSheet: "https://www.aaltopaint.co.nz/data-sheets?category=interior" },
  { name: "3 in 1 Primer Sealer Undercoat", brand: "Aalto Ultra Premium", category: "Preparation", finish: "Undercoat", url: "https://www.aaltopaint.co.nz/shop/product/3-in-1-primer-sealer-undercoat", dataSheet: "https://www.aaltopaint.co.nz/data-sheets" },
  { name: "Primer Sealer Undercoat", brand: "Aalto Tradeline", category: "Preparation", finish: "Undercoat", url: "https://www.aaltopaint.co.nz/shop/product/primer-sealer-undercoat", dataSheet: "https://www.aaltopaint.co.nz/data-sheets" },
  { name: "Interior Sealer Undercoat", brand: "Aalto Tradeline", category: "Preparation", finish: "Undercoat", url: "https://www.aaltopaint.co.nz/shop/product/interior-sealer-undercoat", dataSheet: "https://www.aaltopaint.co.nz/data-sheets" },
  { name: "Easy Sand Sealer Undercoat", brand: "Aalto Tradeline", category: "Preparation", finish: "Undercoat", url: "https://www.aaltopaint.co.nz/shop/product/easy-sand-sealer-undercoat", dataSheet: "https://www.aaltopaint.co.nz/data-sheets" },
  { name: "Curated Palette Library Fandeck", brand: "Fandeck", category: "Colour Charts", finish: "Colour Tool", url: "https://www.aaltopaint.co.nz/shop/product/master-palette-fandeck", dataSheet: "https://www.aaltopaint.co.nz/shop/products" },
  { name: "Exterior Paint Gloss", brand: "Aalto Ultra Premium", category: "Exterior", finish: "Gloss", url: "https://www.aaltopaint.co.nz/shop/product/exterior-paint-gloss", dataSheet: "https://www.aaltopaint.co.nz/data-sheets?category=exterior" },
  { name: "Exterior Paint Semi Gloss", brand: "Aalto Ultra Premium", category: "Exterior", finish: "Semi Gloss", url: "https://www.aaltopaint.co.nz/shop/product/exterior-paint-semi-gloss", dataSheet: "https://www.aaltopaint.co.nz/data-sheets?category=exterior" },
  { name: "Exterior Paint Satin", brand: "Aalto Ultra Premium", category: "Exterior", finish: "Satin", url: "https://www.aaltopaint.co.nz/shop/product/exterior-paint-satin", dataSheet: "https://www.aaltopaint.co.nz/data-sheets?category=exterior" },
  { name: "Exterior Paint Low Sheen", brand: "Aalto Ultra Premium", category: "Exterior", finish: "Low Sheen", url: "https://www.aaltopaint.co.nz/shop/product/exterior-paint-low-sheen", dataSheet: "https://www.aaltopaint.co.nz/data-sheets?category=exterior" },
  { name: "Trade Exterior Semi Gloss", brand: "Aalto Tradeline", category: "Exterior", finish: "Semi Gloss", url: "https://www.aaltopaint.co.nz/shop/product/trade-exterior-semi-gloss", dataSheet: "https://www.aaltopaint.co.nz/data-sheets?category=exterior" },
  { name: "Trade Exterior Low Sheen", brand: "Aalto Tradeline", category: "Exterior", finish: "Low Sheen", url: "https://www.aaltopaint.co.nz/shop/product/trade-exterior-low-sheen", dataSheet: "https://www.aaltopaint.co.nz/data-sheets?category=exterior" },
  { name: "Roof Paint", brand: "Aalto Ultra Premium", category: "Exterior", finish: "Roof", url: "https://www.aaltopaint.co.nz/shop/product/roof-paint", dataSheet: "https://www.aaltopaint.co.nz/data-sheets?category=exterior" },
  { name: "Flexibuild", brand: "Aalto Ultra Premium", category: "Exterior", finish: "High Build", url: "https://www.aaltopaint.co.nz/shop/product/flexibuild", dataSheet: "https://www.aaltopaint.co.nz/data-sheets?category=exterior" },
];

const masterPalette = [
  { name: "Aalto Black", hex: "#353A39", lrv: 5, code: "348.105.25", page: "33C", story: "A deep true black." },
  { name: "Aalto White", hex: "#FAFEFA", lrv: 86, code: "133.100.25", page: "28A", story: "A true, pure white." },
  { name: "Accolade", hex: "#AFBEC8", lrv: 48, code: "104.100.25", page: "44A", story: "A soft mid-blue with a pale grey undertone." },
  { name: "Acme", hex: "#979173", lrv: 27, code: "346.103.25", page: "116A", story: "An earthy, sophisticated hue." },
  { name: "Acronym", hex: "#AF9588", lrv: 31, code: "250.102.25", page: "70A", story: "A soft, putty-toned pink." },
  { name: "Aerial", hex: "#4B4E49", lrv: 8, code: "48.105.25", page: "5C", story: "A moody, muted green-brown." },
  { name: "Align", hex: "#EEEFE3", lrv: 74, code: "271.100.25", page: "69A", story: "An easy white that works with many tones." },
  { name: "Alma", hex: "#FFFFDC", lrv: 90, code: "325.100.25", page: "105A", story: "A soulful yellow." },
  { name: "Almond Meal", hex: "#DDC7B0", lrv: 53.78, code: "254.100.25", page: "74B", story: "A soft neutral with earthy apricot undertones." },
  { name: "Amble", hex: "#ADB387", lrv: 39, code: "57.103.25", page: "119C", story: "A balanced green." },
  { name: "Apartment", hex: "#E2E0CD", lrv: 65, code: "302.100.25", page: "114A", story: "A balanced neutral with soft yellow oxide pigments." },
  { name: "Aperol", hex: "#FFB387", lrv: 52, code: "226.102.25", page: "83A", story: "A bright, lively orange." },
  { name: "Arthouse", hex: "#FBFFFF", lrv: 88, code: "152.100.25", page: "92A", story: "A soft, gentle white." },
  { name: "Artifice", hex: "#3D3A3E", lrv: 5, code: "180.105.25", page: "54C", story: "A dramatic deep red-black." },
  { name: "Aviary", hex: "#BFABA3", lrv: 39, code: "189.102.25", page: "56C", story: "A muted, dusky pink." },
  { name: "Ballet Shoes", hex: "#E4D2C0", lrv: 59, code: "248.100.25", page: "75B", story: "A pale European pink." },
  { name: "Baltic Sea", hex: "#69817D", lrv: 20, code: "94.105.25", page: "33B", story: "A blue-toned green." },
  { name: "Barely", hex: "#FBF9E7", lrv: 82, code: "349.100.25", page: "92B", story: "A creamy white." },
  { name: "Black Tie", hex: "#494942", lrv: 7, code: "72.105.25", page: "14C", story: "A deep almost-black with chocolate undertones." },
  { name: "Blue Porcelain", hex: "#97BDCF", lrv: 43, code: "111.103.25", page: "37B", story: "A refined blue." },
  { name: "Boddam", hex: "#BFB1A0", lrv: 41.19, code: "266.102.25", page: "69B", story: "A warm neutral hue." },
  { name: "Botany", hex: "#4F5D70", lrv: 10, code: "125.105.25", page: "48B", story: "A dark denim blue." },
  { name: "Campbells", hex: "#C7C1BA", lrv: 49, code: "170.100.25", page: "55C", story: "A soft mushroom hue." },
  { name: "Certain", hex: "#E4E3D3", lrv: 67, code: "13.100.25", page: "10A", story: "A soft organic tone." },
  { name: "Charleston", hex: "#4D6169", lrv: 11, code: "95.105.25", page: "38C", story: "A cool charcoal with rich blue undertones." },
  { name: "Charmed", hex: "#ECE6DE", lrv: 70, code: "188.100.25", page: "56B", story: "A gentle powdery pink." },
  { name: "Cirrus", hex: "#E8DFD0", lrv: 72, code: "284.100.25", page: "93B", story: "A soft powdery taupe." },
  { name: "Clovelly", hex: "#8C9A90", lrv: 29, code: "83.102.25", page: "32C", story: "A smoky green-blue." },
  { name: "Coincidence", hex: "#AABDB8", lrv: 44, code: "92.100.25", page: "29C", story: "A calming blue-green." },
  { name: "Context", hex: "#DBD3BE", lrv: 58, code: "285.100.25", page: "89A", story: "A soft beige with layered undertones." },
  { name: "Corbel", hex: "#C4BBA6", lrv: 45, code: "296.100.25", page: "88C", story: "A rich but understated neutral." },
  { name: "Corten", hex: "#945644", lrv: 14, code: "232.105.25", page: "84B", story: "A rich rusted red." },
  { name: "Covert", hex: "#373E3B", lrv: 5, code: "36.105.25", page: "117C", story: "A liquorice-toned black." },
  { name: "Cracroft", hex: "#ACA695", lrv: 35, code: "34.102.25", page: "16C", story: "An earthy hue." },
];

const productName = (product: any) => `${product.brand} ${product.name}`;
const productsForSelect = productLibrary.map(productName);

const starterRows = [
  {
    zone: "Exterior",
    area: "Weatherboards, fibre cement",
    undercoat: productName(productLibrary[11]),
    firstCoat: productName(productLibrary[18]),
    secondCoat: productName(productLibrary[18]),
    colour: "Context",
    notes: "Premium exterior system with linked TDS.",
  },
  {
    zone: "Exterior",
    area: "Timber battens",
    undercoat: productName(productLibrary[11]),
    firstCoat: productName(productLibrary[18]),
    secondCoat: productName(productLibrary[18]),
    colour: "Clovelly",
    notes: "Confirm timber manufacturer coating guidance.",
  },
  {
    zone: "Interior",
    area: "Walls throughout",
    undercoat: productName(productLibrary[13]),
    firstCoat: productName(productLibrary[0]),
    secondCoat: productName(productLibrary[0]),
    colour: "Aalto White",
    notes: "Low odour, washable interior wall system.",
  },
  {
    zone: "Interior",
    area: "Windows, trims, doors",
    undercoat: productName(productLibrary[11]),
    firstCoat: productName(productLibrary[7]),
    secondCoat: productName(productLibrary[7]),
    colour: "Certain",
    notes: "Waterbased enamel finish.",
  },
];

function runPrototypeTests() {
  console.assert(productLibrary.length === 24, "Expected all 24 Aalto products to be loaded.");
  console.assert(masterPalette.length > 0, "Expected Master Palette colours to be loaded.");
  console.assert(masterPalette.every((colour) => /^#[0-9A-F]{6}$/i.test(colour.hex)), "Every colour needs a valid HEX value.");
  console.assert(starterRows.every((row) => masterPalette.some((colour) => colour.name === row.colour)), "Starter rows must use existing colours.");
  console.assert(starterRows.every((row) => productsForSelect.includes(row.undercoat) && productsForSelect.includes(row.firstCoat) && productsForSelect.includes(row.secondCoat)), "Starter rows must use existing products.");
}

runPrototypeTests();

function findProduct(label: string) {
  return productLibrary.find((product) => productName(product) === label) || productLibrary[0];
}

function findColour(name: string) {
  return masterPalette.find((colour) => colour.name === name) || masterPalette[0];
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1">
      <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-500">{label}</span>
      {children}
    </label>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className="w-full rounded-[0.9rem] border border-stone-200 bg-white/90 px-3 py-2 text-sm outline-none transition focus:border-[#7d1a2a] focus:ring-2 focus:ring-[#7d1a2a]/10" />;
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className="min-h-[86px] w-full rounded-[0.9rem] border border-stone-200 bg-white/90 px-3 py-2 text-sm outline-none transition focus:border-[#7d1a2a] focus:ring-2 focus:ring-[#7d1a2a]/10" />;
}

function Select({
  value,
  onChange,
  children,
}: {
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  children: React.ReactNode
}) {
  return (
    <select value={value} onChange={onChange} className="w-full rounded-[0.9rem] border border-stone-200 bg-white/90 px-3 py-2 text-sm outline-none transition focus:border-[#7d1a2a] focus:ring-2 focus:ring-[#7d1a2a]/10">
      {children}
    </select>
  );
}

function ColourSwatch({
  colourName,
  compact = false,
}: {
  colourName: string
  compact?: boolean
}) {
  const product = findProduct(colourName);

  return (
    <div className="space-y-1">
      <a href={product.url} target="_blank" rel="noreferrer" className="font-medium text-stone-950 underline decoration-[#7d1a2a]/30 underline-offset-2 hover:text-[#7d1a2a]">
        {productName(product)}
      </a>
      <div className="flex gap-2 text-[10px] uppercase tracking-wide text-stone-500">
        <span>{product.category}</span>
        <span>·</span>
        <span>{product.finish}</span>
      </div>
    </div>
  );
}

export default function AaltoSpecBuilderPrototype() {
  const [copied, setCopied] = useState(false);
  const [colourSearch, setColourSearch] = useState("");
  const [productFilter, setProductFilter] = useState("All");
  const [project, setProject] = useState({
    specNo: "AP030325",
    issue: "2",
    preparedBy: "Victoria Burnette",
    principal: "JKW Architecture & Design\nJanice Kumar-Ward",
    facility: "Farr Residence, Piha",
    scope: "To prepare and paint the interior and exterior of a residential property.",
    preparation: "Ensure all areas to be painted are free from dust, dirt, grease, mould, loose or flaking paint, or any other contaminants that may affect adhesion.\n\nEnsure all areas are prepared suitably for the required paint finish — refer to linked Product Data Sheets.",
    guarantee: "Aalto Ultra Premium and Tradeline products are guaranteed for 15 years, provided they are applied on properly prepared surfaces as per label and technical data sheet instructions.",
  });
  const [rows, setRows] = useState(starterRows);

  const filteredColours = useMemo(() => {
    const search = colourSearch.toLowerCase();
    return masterPalette
      .filter((colour) => `${colour.name} ${colour.code} ${colour.page} ${colour.story}`.toLowerCase().includes(search))
      .slice(0, 24);
  }, [colourSearch]);

  const groupedRows = useMemo(() => {
    return rows.reduce((acc: Record<string, typeof rows>, row) => {
      if (!acc[row.zone]) acc[row.zone] = [];
      acc[row.zone].push(row);
      return acc;
    }, {});
  }, [rows]);

  const visibleProducts = useMemo(() => {
    return productFilter === "All" ? productLibrary : productLibrary.filter((product) => product.category === productFilter);
  }, [productFilter]);

  const updateProject = (key: string, value: string) => {
    setProject((current) => ({ ...current, [key]: value }));
  };

  const updateRow = (index: number, key: string, value: string) => {
    setRows((current) => current.map((row, rowIndex) => (rowIndex === index ? { ...row, [key]: value } : row)));
  };

  const addRow = () => {
    setRows((current) => [
      ...current,
      {
        zone: "Interior",
        area: "New area",
        undercoat: productName(productLibrary[11]),
        firstCoat: productName(productLibrary[0]),
        secondCoat: productName(productLibrary[0]),
        colour: "Aalto White",
        notes: "",
      },
    ]);
  };

  const deleteRow = (index) => {
    setRows((current) => current.filter((_, rowIndex) => rowIndex !== index));
  };

  const copySummary = async () => {
    const rowText = rows
      .map((row) => `${row.zone} | ${row.area} | ${row.undercoat} | ${row.firstCoat} | ${row.secondCoat} | ${row.colour}`)
      .join("\n");
    const summary = `Aalto Studio ${project.specNo} issue #${project.issue}\n${project.facility}\n${rowText}`;

    await navigator.clipboard.writeText(summary);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="min-h-screen bg-[#E7DED6] text-stone-950">
      <header className="sticky top-0 z-20 border-b border-black/5 bg-[#E7DED6]/80 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500"><Paintbrush size={16} /> Aalto Studio</div>
            <h1 className="text-3xl font-black tracking-[-0.04em]">Editorial Specification Studio</h1>
          </div>
          <div className="flex gap-2">
            <button onClick={copySummary} className="inline-flex items-center gap-2 rounded-[0.9rem] bg-white px-4 py-2 text-sm font-semibold shadow-sm ring-1 ring-black/5">
              {copied ? <Check size={16} /> : <Copy size={16} />} {copied ? "Copied" : "Copy Summary"}
            </button>
            <button onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-[0.9rem] bg-[#7d1a2a] px-4 py-2 text-sm font-semibold text-white shadow-sm">
              <Download size={16} /> Export Presentation
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-[1600px] gap-8 px-6 py-8 lg:grid-cols-[420px_1fr]">
        <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
          <div className="rounded-[1.4rem] border border-white/60 bg-white/75 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.04)] backdrop-blur-xl">
            <div className="mb-4 flex items-center gap-2"><FileText size={18} className="text-[#7d1a2a]" /><h2 className="text-lg font-bold">Project Overview</h2></div>
            <div className="grid gap-3">
              <div className="grid grid-cols-2 gap-3">
                <Field label="Spec number"><Input value={project.specNo} onChange={(event) => updateProject("specNo", event.target.value)} /></Field>
                <Field label="Issue"><Input value={project.issue} onChange={(event) => updateProject("issue", event.target.value)} /></Field>
              </div>
              <Field label="Principal"><Textarea value={project.principal} onChange={(event) => updateProject("principal", event.target.value)} /></Field>
              <Field label="Facility"><Input value={project.facility} onChange={(event) => updateProject("facility", event.target.value)} /></Field>
              <Field label="Scope of work"><Textarea value={project.scope} onChange={(event) => updateProject("scope", event.target.value)} /></Field>
              <Field label="Preparation"><Textarea value={project.preparation} onChange={(event) => updateProject("preparation", event.target.value)} /></Field>
            </div>
          </div>

          <div className="rounded-[1.4rem] border border-white/60 bg-white/75 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.04)] backdrop-blur-xl">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2"><Palette size={18} className="text-[#7d1a2a]" /><h2 className="text-lg font-bold">Master Palette</h2></div>
              <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold text-stone-600">{masterPalette.length} colours loaded</span>
            </div>
            <div className="relative mb-3">
              <Search size={16} className="absolute left-3 top-2.5 text-stone-400" />
              <input value={colourSearch} onChange={(event) => setColourSearch(event.target.value)} placeholder="Search colour, code, story..." className="w-full rounded-[0.9rem] border border-stone-200 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-[#7d1a2a]" />
            </div>
            <div className="grid max-h-[430px] grid-cols-1 gap-2 overflow-auto pr-1 sm:grid-cols-2">
              {filteredColours.map((colour) => (
                <button key={colour.name} onClick={() => rows.length > 0 && updateRow(rows.length - 1, "colour", colour.name)} className="text-left">
                  <ColourSwatch colourName={colour.name} />
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[1.4rem] border border-white/60 bg-white/75 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.04)] backdrop-blur-xl">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-bold">Material System Library</h2>
              <Select value={productFilter} onChange={(event) => setProductFilter(event.target.value)}>
                <option>All</option><option>Interior</option><option>Exterior</option><option>Trims/Doors</option><option>Preparation</option><option>Colour Charts</option>
              </Select>
            </div>
            <div className="max-h-64 space-y-2 overflow-auto pr-1">
              {visibleProducts.map((product) => (
                <a key={productName(product)} href={product.url} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-[0.9rem] border border-stone-200 p-3 text-sm hover:border-[#7d1a2a]/40">
                  <div><strong>{productName(product)}</strong><div className="text-xs text-stone-500">{product.category} · {product.finish}</div></div>
                  <ExternalLink size={14} className="text-stone-400" />
                </a>
              ))}
            </div>
          </div>
        </motion.section>

        <section className="space-y-5">
          <div className="rounded-[1.4rem] border border-white/60 bg-white/75 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.04)] backdrop-blur-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">Specification Composer</h2>
              <button onClick={addRow} className="inline-flex items-center gap-2 rounded-[0.9rem] bg-stone-950 px-3 py-2 text-sm font-semibold text-white"><Plus size={16} /> Add row</button>
            </div>
            <div className="space-y-4">
              {rows.map((row, index) => (
                <div key={`${row.zone}-${row.area}-${index}`} className="rounded-[1rem] border border-stone-200/70 bg-[#f8f6f2] p-5">
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <div className="grid flex-1 grid-cols-2 gap-3">
                      <Field label="Section"><Select value={row.zone} onChange={(event) => updateRow(index, "zone", event.target.value)}><option>Exterior</option><option>Interior</option></Select></Field>
                      <Field label="Area"><Input value={row.area} onChange={(event) => updateRow(index, "area", event.target.value)} /></Field>
                    </div>
                    <button onClick={() => deleteRow(index)} className="mt-5 rounded-xl p-2 text-stone-400 hover:bg-white hover:text-red-600"><Trash2 size={18} /></button>
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    <Field label="Undercoat"><Select value={row.undercoat} onChange={(event) => updateRow(index, "undercoat", event.target.value)}>{productsForSelect.map((product) => <option key={product}>{product}</option>)}</Select></Field>
                    <Field label="First coat"><Select value={row.firstCoat} onChange={(event) => updateRow(index, "firstCoat", event.target.value)}>{productsForSelect.map((product) => <option key={product}>{product}</option>)}</Select></Field>
                    <Field label="Second coat"><Select value={row.secondCoat} onChange={(event) => updateRow(index, "secondCoat", event.target.value)}>{productsForSelect.map((product) => <option key={product}>{product}</option>)}</Select></Field>
                    <Field label="Colour"><Select value={row.colour} onChange={(event) => updateRow(index, "colour", event.target.value)}>{masterPalette.map((colour) => <option key={colour.name}>{colour.name}</option>)}</Select></Field>
                    <Field label="Notes"><Input value={row.notes} onChange={(event) => updateRow(index, "notes", event.target.value)} placeholder="Optional" /></Field>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="overflow-hidden rounded-[3rem] border border-white/60 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.06)] print:shadow-none">
            <div className="bg-[#5B2D2F] px-10 py-14 text-white">
              <div className="mb-12 flex justify-between text-xs uppercase tracking-[0.25em] text-white/70"><span>AALTO STUDIO</span><span>{project.specNo} · issue #{project.issue}</span></div>
              <h2 className="max-w-xl text-5xl font-medium leading-[1] tracking-[-0.04em]">{project.facility}</h2>
              <p className="mt-5 max-w-lg text-white/80">A design-led specification platform for architects, designers, and specifiers.</p>
            </div>
            <div className="p-8">
              <div className="mb-8 grid gap-5 rounded-[1rem] bg-[#E7DED6] p-8 text-sm md:grid-cols-[140px_1fr]">
                <div className="font-semibold text-stone-500">Principal</div><div className="whitespace-pre-line">{project.principal}</div>
                <div className="font-semibold text-stone-500">Facility</div><div>{project.facility}</div>
                <div className="font-semibold text-stone-500">Scope of Work</div><div>{project.scope}</div>
                <div className="font-semibold text-stone-500">Preparation</div><div className="whitespace-pre-line">{project.preparation}</div>
              </div>
              <div className="my-8 flex items-end justify-between border-b border-[#7d1a2a]/30 pb-3">
                <div><h3 className="text-xl font-bold">Specification Schedule</h3><p className="text-sm text-stone-500">Refer to linked Product Data Sheets for application detail.</p></div>
                <a href="https://www.aaltopaint.co.nz/data-sheets" target="_blank" rel="noreferrer" className="text-sm font-semibold text-[#7d1a2a] underline underline-offset-4">View all data sheets</a>
              </div>

              {Object.entries(groupedRows).map(([zone, zoneRows]) => (
                <div key={zone} className="mb-8">
                  <h4 className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-[#7d1a2a]">{zone}</h4>
                  <div className="grid gap-4">
                    {zoneRows.map((row, index) => {
                      const colour = findColour(row.colour);
                      return (
                        <div key={`${zone}-${row.area}-${index}`} className="grid gap-4 rounded-[1rem] border border-stone-200/80 bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] md:grid-cols-[1.05fr_1.6fr_180px]">
                          <div>
                            <div className="text-xs uppercase tracking-wide text-stone-500">Area</div>
                            <div className="mt-1 font-bold text-stone-950">{row.area}</div>
                            <p className="mt-2 text-xs text-stone-500">{row.notes}</p>
                          </div>
                          <div className="grid gap-3 text-xs md:grid-cols-3">
                            <div><div className="mb-1 font-semibold text-stone-500">Undercoat</div><ProductRef label={row.undercoat} /></div>
                            <div><div className="mb-1 font-semibold text-stone-500">First Coat</div><ProductRef label={row.firstCoat} /></div>
                            <div><div className="mb-1 font-semibold text-stone-500">Second Coat</div><ProductRef label={row.secondCoat} /></div>
                          </div>
                          <div className="rounded-[1.75rem] bg-[#E7DED6] p-4">
                            <div className="mb-2 h-24 rounded-[0.9rem] border border-black/10 shadow-inner" style={{ backgroundColor: colour.hex }} />
                            <div className="font-bold">{colour.name}</div>
                            <div className="text-xs text-stone-500">LRV {colour.lrv} · {colour.code}</div>
                            <div className="mt-1 text-xs text-stone-500">Fandeck {colour.page}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}

              <div className="mt-8 grid gap-4 rounded-[1.4rem] bg-[#111111] p-8 text-sm text-white md:grid-cols-[140px_1fr]">
                <div className="font-semibold text-white/50">Guarantee</div><div>{project.guarantee}</div>
                <div className="font-semibold text-white/50">Colour</div><div><strong>Only Aalto Paint can give you Aalto Colour.</strong><br />Due to the multi-pigmented nature of Aalto colours, they cannot be matched.</div>
              </div>
              <footer className="mt-10 flex items-end justify-between border-t border-stone-200 pt-6 relative">
                <div className="text-xs text-stone-500">Specification prepared by<br /><strong className="text-stone-900">{project.preparedBy}</strong><br />Aalto Group Ltd. · aaltopaint.co.nz</div>
                <img src="https://www.aaltopaint.co.nz/cdn/shop/files/aalto-logo-black.png" alt="Aalto" className="h-7 w-auto opacity-90" />
              </footer>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
