/**
 * Obsidian-style 3D FSD knowledge graph (3d-force-graph).
 * Click a node to focus + open breakdown; Walkthrough steps the guided path.
 */
(function () {
  const GRAPH_URL = "./fsd-knowledge.json";
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

  function fillPanel(node) {
    if (!node) return;
    const g = groupMeta(node.group);
    el.title.textContent = node.label;
    el.group.textContent = g.label;
    el.group.style.background = g.color + "22";
    el.group.style.borderColor = g.color;
    el.group.style.color = g.color;
    el.summary.textContent = node.summary || "No summary yet.";
    renderList(el.tables, node.tables, "No primary tables listed");
    renderList(el.menus, node.menus, "No menu capabilities listed");
    el.raisd.textContent = node.raisd || "—";

    el.links.innerHTML = "";
    const related = knowledge.links.filter(
      (l) => l.source === node.id || l.target === node.id ||
        (l.source && l.source.id === node.id) ||
        (l.target && l.target.id === node.id)
    );
    related.forEach((l) => {
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
    if (!node) {
      Graph.nodeColor(paintNode).linkWidth(paintLinkWidth).linkColor(paintLinkColor);
      return;
    }
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
    Graph.nodeColor(paintNode).linkWidth(paintLinkWidth).linkColor(paintLinkColor);
  }

  function paintNode(n) {
    const base = groupMeta(n.group).color;
    if (!highlightNodes.size) return base;
    return highlightNodes.has(n.id) ? base : "rgba(120,130,150,0.25)";
  }

  function paintLinkWidth(l) {
    return highlightLinks.has(l) ? 2.2 : 0.6;
  }

  function paintLinkColor(l) {
    return highlightLinks.has(l) ? "rgba(200,210,230,0.85)" : "rgba(100,110,130,0.25)";
  }

  function focusNode(id, fromClick) {
    const node = typeof id === "string" ? Graph.graphData().nodes.find((n) => n.id === id) : id;
    if (!node) return;
    selectedId = node.id;
    fillPanel(nodeById(node.id) || node);
    updateHighlights(node);

    const dist = 180;
    const cam = Graph.cameraPosition();
    const dx = node.x - (cam.x || 0);
    const dy = node.y - (cam.y || 0);
    const dz = node.z - (cam.z || 0);
    let len = Math.hypot(dx, dy, dz) || 1;
    Graph.cameraPosition(
      { x: node.x + (dx / len) * dist, y: node.y + (dy / len) * dist, z: node.z + (dz / len) * dist },
      node,
      900
    );
    setStatus(fromClick ? `Focused: ${node.label || node.id}` : `Walkthrough: ${node.label || node.id}`);
    const wi = knowledge.walkthrough.indexOf(node.id);
    walkIndex = wi;
    updateWalkLabel();
  }

  function updateWalkLabel() {
    const total = knowledge.walkthrough.length;
    if (walkIndex < 0) {
      el.step.textContent = `Walkthrough · ${total} steps`;
    } else {
      el.step.textContent = `Step ${walkIndex + 1} / ${total}`;
    }
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
      highlightNodes = new Set();
      highlightLinks = new Set();
      Graph.nodeColor(paintNode).linkWidth(paintLinkWidth).linkColor(paintLinkColor);
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
    if (typeof ForceGraph3D !== "function") {
      setStatus("3D graph library failed to load (CDN).");
      return;
    }
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
      .backgroundColor("#0b0f17")
      .graphData(data)
      .nodeLabel((n) => `${n.label}\n${groupMeta(n.group).label}`)
      .nodeColor(paintNode)
      .nodeVal((n) => n.val || 6)
      .nodeOpacity(0.95)
      .linkColor(paintLinkColor)
      .linkWidth(paintLinkWidth)
      .linkOpacity(0.7)
      .linkDirectionalParticles(1)
      .linkDirectionalParticleWidth((l) => (highlightLinks.has(l) ? 2 : 0))
      .onNodeClick((n) => focusNode(n, true))
      .onBackgroundClick(() => {
        selectedId = null;
        highlightNodes = new Set();
        highlightLinks = new Set();
        Graph.nodeColor(paintNode).linkWidth(paintLinkWidth).linkColor(paintLinkColor);
        setStatus("Drag to orbit · scroll to zoom · click a node for breakdown");
      });

    Graph.controls().enableDamping = true;
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

    // Legend
    const legend = document.getElementById("obsidian-legend");
    Object.entries(knowledge.groups).forEach(([id, g]) => {
      const item = document.createElement("span");
      item.className = "obs-legend-item";
      item.innerHTML = `<i style="background:${g.color}"></i>${escapeHtml(g.label)}`;
      legend.appendChild(item);
    });

    updateWalkLabel();
    setTimeout(() => focusNode("cms", false), 600);
    setStatus("Drag to orbit · scroll to zoom · click a node for breakdown");
  }

  boot().catch((err) => {
    console.error(err);
    setStatus("Failed to load FSD knowledge graph.");
  });
})();
