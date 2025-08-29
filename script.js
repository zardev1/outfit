// === Data produk ===
const PRODUCTS = [
  { id: 3001, name: "Sepatu Knit Abu", price: 159000, price_before: 229000, sold: 102, image: "images/sepatu-knit.jpg", url: "#" },
  { id: 2131, name: "Asym Knit Elegant", price: 89000,  price_before: 129000, sold: 206, image: "images/asym.jpg",        url: "#" },
  // tambah item lain… {id, name, price, price_before, sold, image, url}
];

// === Helper ===
const toIDR = n => new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(n);
const discPct = (now, before) => Math.max(0, Math.round(((before-now)/before)*100));

// === Render ===
function render(list){
  const grid = document.getElementById("grid");
  const tpl  = document.getElementById("cardTpl");
  grid.innerHTML = "";

  list.forEach(p=>{
    const node = tpl.content.cloneNode(true);
    const a    = node.querySelector(".card");
    a.href = p.url;

    // badge diskon
    node.querySelector(".disc").textContent = `-${discPct(p.price, p.price_before)}%`;

    // gambar (fallback teks bila gagal)
    const img = node.querySelector("img");
    img.src = p.image;
    img.alt = p.name;
    img.addEventListener("error", ()=>{ img.replaceWith(document.createTextNode("Gambar tidak ditemukan")); });

    node.querySelector(".name").textContent = `${p.id}. ${p.name}`;
    node.querySelector(".now").textContent  = toIDR(p.price);
    node.querySelector(".cut").textContent  = toIDR(p.price_before);
    node.querySelector(".sold").textContent = `Terjual ${p.sold}`;

    node.querySelector(".btn").addEventListener("click", e=>{
      e.preventDefault();
      window.open(p.url, "_blank");
    });

    grid.appendChild(node);
  });
}

// === Search + Sort ===
function apply(){
  const q = document.getElementById("q").value.trim().toLowerCase();
  const sort = document.getElementById("sort").value;

  let list = PRODUCTS.filter(p =>
    String(p.id).includes(q) || p.name.toLowerCase().includes(q)
  );

  switch(sort){
    case "latest":     list.sort((a,b)=>b.id-a.id); break;
    case "price-asc":  list.sort((a,b)=>a.price-b.price); break;
    case "price-desc": list.sort((a,b)=>b.price-a.price); break;
    case "sold-desc":  list.sort((a,b)=>b.sold-a.sold); break;
  }
  render(list);
}

document.getElementById("q").addEventListener("input", apply);
document.getElementById("sort").addEventListener("change", apply);

// init
apply();