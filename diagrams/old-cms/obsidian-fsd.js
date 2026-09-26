/**
 * Obsidian-style 3D FSD knowledge graph.
 * Uses self-contained ForceGraph3D UMD (no Three.js import map).
 * Bright spheres + HTML circle labels with text always visible above the canvas.
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
  let overlay = null;
  const labelEls = new Map();

  function groupMeta(id) {
    return (knowledge.groups && knowledge.groups[id]) || { label: id, color: "#8899aa" };
  }

  function nodeById(id) {
    return knowledge.nodes.find((n) => n.id === id);
  }

  function setStatus(msg) {
    if (el.status) el.status.textContent = msg;
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
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

  function shortLabel(label) {
    let s = String(label || "").trim().replace(/\/$/, "");
    if (s === "Cyberjaya CMS") return "Cyberjaya CMS";
    if (s === "Portal API") return "Portal API";
    if (s.length <= 14) return s;
    const slash = s.lastIndexOf("/");
    if (slash >= 0 && slash < s.length - 1) {
      const tail = s.slice(slash + 1);
      if (tail.length <= 14) return tail;
    }
    return s.slice(0, 12) + "…";
  }

  function nodeFillColor(node) {
    const base = groupMeta(node.group).color;
    if (!highlightNodes.size) return base;
    return highlightNodes.has(node.id) ? base : "#5a6578";
  }

  function nodeTextColor(node) {
    if (highlightNodes.size && !highlightNodes.has(node.id)) return "#d7dee8";
    return "#0b1220";
  }

  function labelSize(node) {
    const v = node.val || 6;
    return Math.max(52, Math.min(110, 34 + v * 3));
  }

  function ensureOverlay() {
    if (overlay) return overlay;
    el.graph.style.position = "relative";
    overlay = document.createElement("div");
    overlay.className = "obs-label-overlay";
    overlay.setAttribute("aria-hidden", "true");
    el.graph.appendChild(overlay);
    return overlay;
  }

  function ensureLabelEl(node) {
    let div = labelEls.get(node.id);
    if (div) return div;
    div = document.createElement("div");
    div.className = "obs-node-chip";
    div.innerHTML = `<span>${escapeHtml(shortLabel(node.label || node.id))}</span>`;
    overlay.appendChild(div);
    labelEls.set(node.id, div);
    return div;
  }

  function paintLabelEl(node, div) {
    const size = labelSize(node);
    const dimmed = highlightNodes.size > 0 && !highlightNodes.has(node.id);
    const selected = selectedId === node.id;
    div.style.width = size + "px";
    div.style.height = size + "px";
    div.style.background = nodeFillColor(node);
    div.style.color = nodeTextColor(node);
    div.style.opacity = dimmed ? "0.4" : "1";
    div.style.borderColor = selected ? "#ffffff" : "rgba(255,255,255,0.45)";
    div.style.borderWidth = selected ? "3px" : "2px";
    div.style.zIndex = selected ? "6" : dimmed ? "2" : "4";
    div.style.fontSize = size >= 90 ? "13px" : size >= 70 ? "12px" : "11px";
    const span = div.querySelector("span");
    if (span) span.textContent = shortLabel(node.label || node.id);
  }

  function syncLabels() {
    if (!Graph || !overlay) return;
    Graph.graphData().nodes.forEach((node) => {
      if (node.x == null || node.y == null || node.z == null) return;
      const div = ensureLabelEl(node);
      paintLabelEl(node, div);
      const coords = Graph.graph2ScreenCoords(node.x, node.y, node.z);
      const size = labelSize(node);
      if (
        !Number.isFinite(coords.x) ||
        !Number.isFinite(coords.y) ||
        coords.x < -120 ||
        coords.y < -120 ||
        coords.x > el.graph.clientWidth + 120 ||
        coords.y > el.graph.clientHeight + 120
      ) {
        div.style.visibility = "hidden";
        return;
      }
      div.style.visibility = "visible";
      div.style.transform = "translate(" + (coords.x - size / 2) + "px," + (coords.y - size / 2) + "px)";
    });
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
    knowledge.links
      .filter(function (l) {
        return (
          l.source === node.id ||
          l.target === node.id ||
          (l.source && l.source.id === node.id) ||
          (l.target && l.target.id === node.id)
        );
      })
      .forEach(function (l) {
        const sid = typeof l.source === "object" ? l.source.id : l.source;
        const tid = typeof l.target === "object" ? l.target.id : l.target;
        const other = sid === node.id ? tid : sid;
        const otherNode = nodeById(other);
        const a = document.createElement("a");
        a.href = "#";
        a.className = "obs-related";
        a.textContent = (otherNode && otherNode.label) || other;
        if (l.label) a.title = l.label;
        a.addEventListener("click", function (e) {
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

  function paintNode(n) {
    return nodeFillColor(n);
  }

  function paintLinkWidth(l) {
    return highlightLinks.has(l) ? 2.4 : 1.2;
  }

  function paintLinkColor(l) {
    return highlightLinks.has(l) ? "rgba(240,244,250,0.95)" : "rgba(170,185,210,0.65)";
  }

  function updateHighlights(node) {
    highlightNodes = new Set();
    highlightLinks = new Set();
    if (node) {
      highlightNodes.add(node.id);
      knowledge.links.forEach(function (l) {
        const sid = typeof l.source === "object" ? l.source.id : l.source;
        const tid = typeof l.target === "object" ? l.target.id : l.target;
        if (sid === node.id || tid === node.id) {
          highlightLinks.add(l);
          highlightNodes.add(sid);
          highlightNodes.add(tid);
        }
      });
    }
    Graph.nodeColor(paintNode).linkWidth(paintLinkWidth).linkColor(paintLinkColor);
    syncLabels();
  }

  function focusNode(id, fromClick) {
    const node = typeof id === "string" ? Graph.graphData().nodes.find(function (n) { return n.id === id; }) : id;
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
    setStatus(fromClick ? "Focused: " + (node.label || node.id) : "Walkthrough: " + (node.label || node.id));
    walkIndex = knowledge.walkthrough.indexOf(node.id);
    updateWalkLabel();
  }

  function updateWalkLabel() {
    const total = knowledge.walkthrough.length;
    el.step.textContent = walkIndex < 0 ? "Walkthrough · " + total + " steps" : "Step " + (walkIndex + 1) + " / " + total;
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
      Graph.nodeColor(paintNode).linkWidth(paintLinkWidth).linkColor(paintLinkColor);
      syncLabels();
      setStatus("Drag to orbit · scroll to zoom · click a node for breakdown");
      return;
    }
    const hits = knowledge.nodes.filter(function (n) {
      return (
        n.id.toLowerCase().includes(query) ||
        (n.label && n.label.toLowerCase().includes(query)) ||
        (n.summary && n.summary.toLowerCase().includes(query)) ||
        (n.group && n.group.toLowerCase().includes(query))
      );
    });
    if (!hits.length) {
      setStatus("No match for “" + q + "”");
      return;
    }
    focusNode(hits[0].id, true);
    setStatus(hits.length + " match" + (hits.length === 1 ? "" : "es") + " · showing " + hits[0].label);
  }

  async function boot() {
    if (typeof ForceGraph3D !== "function") {
      setStatus("3D graph library failed to load (CDN).");
      return;
    }
    setStatus("Loading FSD knowledge…");
    const res = await fetch(GRAPH_URL);
    knowledge = await res.json();

    const data = {
      nodes: knowledge.nodes.map(function (n) {
        return Object.assign({}, n, { name: n.label, color: groupMeta(n.group).color });
      }),
      links: knowledge.links.map(function (l) {
        return Object.assign({}, l);
      }),
    };

    const w = el.graph.clientWidth || 800;
    const h = el.graph.clientHeight || 520;

    Graph = ForceGraph3D()(el.graph)
      .width(w)
      .height(h)
      .backgroundColor("#1a2332")
      .showNavInfo(false)
      .graphData(data)
      .nodeLabel(function () { return null; })
      .nodeColor(paintNode)
      .nodeOpacity(0.92)
      .nodeVal(function (n) { return n.val || 6; })
      .nodeRelSize(5)
      .linkColor(paintLinkColor)
      .linkWidth(paintLinkWidth)
      .linkOpacity(0.85)
      .linkDirectionalParticles(1)
      .linkDirectionalParticleWidth(function (l) { return highlightLinks.has(l) ? 2.2 : 0.8; })
      .onNodeClick(function (n) { focusNode(n, true); })
      .onBackgroundClick(function () {
        selectedId = null;
        highlightNodes = new Set();
        highlightLinks = new Set();
        Graph.nodeColor(paintNode).linkWidth(paintLinkWidth).linkColor(paintLinkColor);
        syncLabels();
        setStatus("Drag to orbit · scroll to zoom · click a node for breakdown");
      })
      .onEngineTick(syncLabels);

    // Place label overlay ABOVE the WebGL canvas
    ensureOverlay();
    const canvas = el.graph.querySelector("canvas");
    if (canvas) {
      canvas.style.position = "relative";
      canvas.style.zIndex = "1";
    }
    overlay.style.zIndex = "5";

    const controls = Graph.controls && Graph.controls();
    if (controls) {
      if ("enableDamping" in controls) controls.enableDamping = true;
      if (typeof controls.addEventListener === "function") {
        controls.addEventListener("change", syncLabels);
      }
    }

    if (Graph.d3Force) {
      const charge = Graph.d3Force("charge");
      if (charge && charge.strength) charge.strength(-160);
    }

    window.addEventListener("resize", function () {
      Graph.width(el.graph.clientWidth).height(el.graph.clientHeight);
      syncLabels();
    });

    document.getElementById("walk-prev").addEventListener("click", function () { walk(-1); });
    document.getElementById("walk-next").addEventListener("click", function () { walk(1); });
    document.getElementById("walk-reset").addEventListener("click", function () {
      walkIndex = -1;
      focusNode("cms", false);
    });
    el.search.addEventListener("keydown", function (e) {
      if (e.key === "Enter") filterSearch(el.search.value);
    });
    document.getElementById("obsidian-search-btn").addEventListener("click", function () {
      filterSearch(el.search.value);
    });

    const legend = document.getElementById("obsidian-legend");
    legend.innerHTML = "";
    Object.keys(knowledge.groups).forEach(function (id) {
      const g = knowledge.groups[id];
      const item = document.createElement("span");
      item.className = "obs-legend-item";
      item.innerHTML = '<i style="background:' + g.color + '"></i>' + escapeHtml(g.label);
      legend.appendChild(item);
    });

    updateWalkLabel();
    setTimeout(function () { focusNode("cms", false); }, 700);
    setStatus("Drag to orbit · scroll to zoom · click a node for breakdown");
  }

  boot().catch(function (err) {
    console.error(err);
    setStatus("Failed to load FSD knowledge graph: " + (err && err.message ? err.message : err));
  });
})();
