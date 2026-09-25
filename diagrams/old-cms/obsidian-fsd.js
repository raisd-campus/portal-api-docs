/**
 * Obsidian-style 3D FSD knowledge graph.
 * Shared Three.js via import map + esm.sh external=three so labeled circle
 * sprites always render (not hover-only), brightly, with text inside.
 */
import ForceGraph3D from "https://esm.sh/3d-force-graph@1.73.3?external=three";
import * as THREE from "three";

const GRAPH_URL = "./fsd-knowledge.json";
const CANVAS_SIZE = 256;

const el = {
  graph: document.getElementById("obsidian-graph"),
  title: document.getElementById("panel-title"),
  group: document.getElementById("panel-group"),
  summary: document.getElementById("panel-summary"),
  tables: document.getElementById("panel-tables"),
  menus: document.getElementById("panel-menus"),
  raisd: document.getElementById("panel-raisd"),
  links: document.getElementById("panel-links"),
  step: document.getElementById("walk-step"),
  search: document.getElementById("obsidian-search"),
  status: document.getElementById("obsidian-status"),
};

let knowledge = null;
let Graph = null;
let highlightNodes = new Set();
let highlightLinks = new Set();
let selectedId = null;
let walkIndex = -1;

function groupMeta(id) {
  return (knowledge.groups && knowledge.groups[id]) || { label: id, color: "#8899aa" };
}

function nodeById(id) {
  return knowledge.nodes.find((n) => n.id === id);
}

function setStatus(msg) {
  if (el.status) el.status.textContent = msg;
}

function renderList(target, items, empty) {
  target.innerHTML = "";
  if (!items || !items.length) {
    const li = document.createElement("li");
    li.className = "muted";
    li.textContent = empty;
    target.appendChild(li);
    return;
  }
  items.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `<code>${escapeHtml(item)}</code>`;
    target.appendChild(li);
  });
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function shortLabel(label) {
  let s = String(label || "").trim().replace(/\/$/, "");
  if (s === "Cyberjaya CMS") return "Cyberjaya\nCMS";
  if (s === "Portal API") return "Portal\nAPI";
  if (s === "r_student") return "r_student";
  if (s.length <= 12) return s;
  const slash = s.lastIndexOf("/");
  if (slash >= 0 && slash < s.length - 1) {
    const tail = s.slice(slash + 1);
    if (tail.length <= 12) return tail;
  }
  return `${s.slice(0, 10)}…`;
}

function wrapLines(ctx, text, maxWidth, maxLines) {
  const lines = [];
  String(text)
    .split("\n")
    .forEach((chunk) => {
      const words = chunk.split(/\s+/).filter(Boolean);
      let line = "";
      words.forEach((word) => {
        const test = line ? `${line} ${word}` : word;
        if (ctx.measureText(test).width <= maxWidth) line = test;
        else {
          if (line) lines.push(line);
          line = word;
        }
      });
      if (line) lines.push(line);
    });
  if (lines.length <= maxLines) return lines;
  const kept = lines.slice(0, maxLines);
  kept[maxLines - 1] = `${kept[maxLines - 1].replace(/…$/, "")}…`;
  return kept;
}

function nodeFillColor(node) {
  const base = groupMeta(node.group).color;
  if (!highlightNodes.size) return base;
  return highlightNodes.has(node.id) ? base : "#3a4558";
}

function nodeTextColor(node) {
  if (highlightNodes.size && !highlightNodes.has(node.id)) return "#c5cdd8";
  return "#0b1220";
}

function drawNodeCanvas(node) {
  const canvas = node.__canvas;
  const ctx = node.__ctx;
  if (!canvas || !ctx) return;

  const size = CANVAS_SIZE;
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 2;

  ctx.clearRect(0, 0, size, size);

  // Bright filled circle
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = nodeFillColor(node);
  ctx.fill();

  ctx.lineWidth = selectedId === node.id ? 12 : 6;
  ctx.strokeStyle = selectedId === node.id ? "#ffffff" : "rgba(255,255,255,0.35)";
  ctx.stroke();

  const label = shortLabel(node.label || node.id);
  ctx.fillStyle = nodeTextColor(node);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const maxWidth = r * 1.4;
  let fontSize = node.val >= 16 ? 44 : node.val >= 11 ? 36 : 30;
  ctx.font = `800 ${fontSize}px "Segoe UI", system-ui, sans-serif`;
  let lines = wrapLines(ctx, label, maxWidth, 3);
  while (fontSize > 18 && lines.some((l) => ctx.measureText(l).width > maxWidth)) {
    fontSize -= 2;
    ctx.font = `800 ${fontSize}px "Segoe UI", system-ui, sans-serif`;
    lines = wrapLines(ctx, label, maxWidth, 3);
  }

  const lineHeight = fontSize * 1.1;
  const startY = cy - ((lines.length - 1) * lineHeight) / 2;
  lines.forEach((line, i) => ctx.fillText(line, cx, startY + i * lineHeight));

  if (node.__texture) node.__texture.needsUpdate = true;
}

function spriteScale(node) {
  const v = node.val || 6;
  return Math.max(22, Math.min(52, 14 + v * 1.35));
}

function createNodeObject(node) {
  const canvas = document.createElement("canvas");
  canvas.width = CANVAS_SIZE;
  canvas.height = CANVAS_SIZE;
  node.__canvas = canvas;
  node.__ctx = canvas.getContext("2d");

  const texture = new THREE.CanvasTexture(canvas);
  if (THREE.SRGBColorSpace) texture.colorSpace = THREE.SRGBColorSpace;
  node.__texture = texture;
  drawNodeCanvas(node);

  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthWrite: false,
    sizeAttenuation: true,
  });
  const sprite = new THREE.Sprite(material);
  const s = spriteScale(node);
  sprite.scale.set(s, s, 1);
  node.__sprite = sprite;
  return sprite;
}

function refreshNodeCanvases() {
  if (!Graph) return;
  Graph.graphData().nodes.forEach((n) => drawNodeCanvas(n));
}

function fillPanel(node) {
  if (!node) return;
  const g = groupMeta(node.group);
  el.title.textContent = node.label;
  el.group.textContent = g.label;
  el.group.style.background = `${g.color}22`;
  el.group.style.borderColor = g.color;
  el.group.style.color = g.color;
  el.summary.textContent = node.summary || "No summary yet.";
  renderList(el.tables, node.tables, "No primary tables listed");
  renderList(el.menus, node.menus, "No menu capabilities listed");
  el.raisd.textContent = node.raisd || "—";

  el.links.innerHTML = "";
  knowledge.links
    .filter(
      (l) =>
        l.source === node.id ||
        l.target === node.id ||
        (l.source && l.source.id === node.id) ||
        (l.target && l.target.id === node.id)
    )
    .forEach((l) => {
      const sid = typeof l.source === "object" ? l.source.id : l.source;
      const tid = typeof l.target === "object" ? l.target.id : l.target;
      const other = sid === node.id ? tid : sid;
      const otherNode = nodeById(other);
      const a = document.createElement("a");
      a.href = "#";
      a.className = "obs-related";
      a.textContent = (otherNode && otherNode.label) || other;
      if (l.label) a.title = l.label;
      a.addEventListener("click", (e) => {
        e.preventDefault();
        focusNode(other, true);
      });
      el.links.appendChild(a);
    });
  if (node.href) {
    const open = document.createElement("a");
    open.href = node.href;
    open.className = "obs-related obs-open";
    open.textContent = "Open detail →";
    el.links.appendChild(open);
  }
  if (!el.links.children.length) {
    const span = document.createElement("span");
    span.className = "muted";
    span.textContent = "No linked nodes";
    el.links.appendChild(span);
  }
}

function updateHighlights(node) {
  highlightNodes = new Set();
  highlightLinks = new Set();
  if (node) {
    highlightNodes.add(node.id);
    knowledge.links.forEach((l) => {
      const sid = typeof l.source === "object" ? l.source.id : l.source;
      const tid = typeof l.target === "object" ? l.target.id : l.target;
      if (sid === node.id || tid === node.id) {
        highlightLinks.add(l);
        highlightNodes.add(sid);
        highlightNodes.add(tid);
      }
    });
  }
  refreshNodeCanvases();
  Graph.linkWidth(paintLinkWidth).linkColor(paintLinkColor);
}

function paintLinkWidth(l) {
  return highlightLinks.has(l) ? 2.4 : 1.1;
}

function paintLinkColor(l) {
  return highlightLinks.has(l) ? "rgba(230,235,245,0.95)" : "rgba(160,175,200,0.55)";
}

function focusNode(id, fromClick) {
  const node = typeof id === "string" ? Graph.graphData().nodes.find((n) => n.id === id) : id;
  if (!node) return;
  selectedId = node.id;
  fillPanel(nodeById(node.id) || node);
  updateHighlights(node);

  const dist = 200;
  const cam = Graph.cameraPosition();
  const dx = node.x - (cam.x || 0);
  const dy = node.y - (cam.y || 0);
  const dz = node.z - (cam.z || 0);
  const len = Math.hypot(dx, dy, dz) || 1;
  Graph.cameraPosition(
    { x: node.x + (dx / len) * dist, y: node.y + (dy / len) * dist, z: node.z + (dz / len) * dist },
    node,
    900
  );
  setStatus(fromClick ? `Focused: ${node.label || node.id}` : `Walkthrough: ${node.label || node.id}`);
  walkIndex = knowledge.walkthrough.indexOf(node.id);
  updateWalkLabel();
}

function updateWalkLabel() {
  const total = knowledge.walkthrough.length;
  el.step.textContent =
    walkIndex < 0 ? `Walkthrough · ${total} steps` : `Step ${walkIndex + 1} / ${total}`;
}

function walk(delta) {
  if (!knowledge.walkthrough.length) return;
  if (walkIndex < 0) walkIndex = delta > 0 ? 0 : knowledge.walkthrough.length - 1;
  else walkIndex = (walkIndex + delta + knowledge.walkthrough.length) % knowledge.walkthrough.length;
  focusNode(knowledge.walkthrough[walkIndex], false);
}

function filterSearch(q) {
  const query = (q || "").trim().toLowerCase();
  if (!query) {
    selectedId = null;
    highlightNodes = new Set();
    highlightLinks = new Set();
    refreshNodeCanvases();
    Graph.linkWidth(paintLinkWidth).linkColor(paintLinkColor);
    setStatus("Drag to orbit · scroll to zoom · click a node for breakdown");
    return;
  }
  const hits = knowledge.nodes.filter(
    (n) =>
      n.id.toLowerCase().includes(query) ||
      (n.label && n.label.toLowerCase().includes(query)) ||
      (n.summary && n.summary.toLowerCase().includes(query)) ||
      (n.group && n.group.toLowerCase().includes(query))
  );
  if (!hits.length) {
    setStatus(`No match for “${q}”`);
    return;
  }
  focusNode(hits[0].id, true);
  setStatus(`${hits.length} match${hits.length === 1 ? "" : "es"} · showing ${hits[0].label}`);
}

async function boot() {
  setStatus("Loading FSD knowledge…");
  const res = await fetch(GRAPH_URL);
  knowledge = await res.json();

  const data = {
    nodes: knowledge.nodes.map((n) => ({
      ...n,
      name: n.label,
      color: groupMeta(n.group).color,
    })),
    links: knowledge.links.map((l) => ({ ...l })),
  };

  const w = el.graph.clientWidth || 800;
  const h = el.graph.clientHeight || 520;

  Graph = ForceGraph3D()(el.graph)
    .width(w)
    .height(h)
    .backgroundColor("#1a2332")
    .showNavInfo(false)
    .graphData(data)
    .nodeThreeObject(createNodeObject)
    .nodeThreeObjectExtend(false)
    .nodeVal((n) => n.val || 6)
    .linkColor(paintLinkColor)
    .linkWidth(paintLinkWidth)
    .linkOpacity(0.85)
    .linkDirectionalParticles(1)
    .linkDirectionalParticleWidth((l) => (highlightLinks.has(l) ? 2.2 : 0.8))
    .onNodeClick((n) => focusNode(n, true))
    .onBackgroundClick(() => {
      selectedId = null;
      highlightNodes = new Set();
      highlightLinks = new Set();
      refreshNodeCanvases();
      Graph.linkWidth(paintLinkWidth).linkColor(paintLinkColor);
      setStatus("Drag to orbit · scroll to zoom · click a node for breakdown");
    });

  const controls = Graph.controls && Graph.controls();
  if (controls && "enableDamping" in controls) controls.enableDamping = true;

  window.addEventListener("resize", () => {
    Graph.width(el.graph.clientWidth).height(el.graph.clientHeight);
  });

  document.getElementById("walk-prev").addEventListener("click", () => walk(-1));
  document.getElementById("walk-next").addEventListener("click", () => walk(1));
  document.getElementById("walk-reset").addEventListener("click", () => {
    walkIndex = -1;
    focusNode("cms", false);
  });
  el.search.addEventListener("keydown", (e) => {
    if (e.key === "Enter") filterSearch(el.search.value);
  });
  document.getElementById("obsidian-search-btn").addEventListener("click", () =>
    filterSearch(el.search.value)
  );

  const legend = document.getElementById("obsidian-legend");
  legend.innerHTML = "";
  Object.entries(knowledge.groups).forEach(([, g]) => {
    const item = document.createElement("span");
    item.className = "obs-legend-item";
    item.innerHTML = `<i style="background:${g.color}"></i>${escapeHtml(g.label)}`;
    legend.appendChild(item);
  });

  // Brighter charge so clusters open and labels stay readable
  if (Graph.d3Force) {
    const charge = Graph.d3Force("charge");
    if (charge && charge.strength) charge.strength(-140);
  }

  updateWalkLabel();
  setTimeout(() => focusNode("cms", false), 700);
  setStatus("Drag to orbit · scroll to zoom · click a node for breakdown");
}

boot().catch((err) => {
  console.error(err);
  setStatus(`Failed to load FSD knowledge graph: ${err && err.message ? err.message : err}`);
});
