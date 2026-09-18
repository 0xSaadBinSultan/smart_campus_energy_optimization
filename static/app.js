/**
 * GridWise AI — Smart Campus Energy Optimization Dashboard
 * Client Application Logic
 */

// --- Default Scenario Presets ---
const PRESETS = {
  "bup-sample-001": {
    name: "BUP Campus Baseline",
    description: "Standard campus day with solar haze & evening peak restriction",
    scenario_id: "bup-sample-001",
    operator_notes: [
      "Solar output will drop to about 20% from 1 PM to 3 PM due to haze.",
      "Do not charge the battery between 6 PM and 9 PM.",
      "The cafeteria menu changes tomorrow."
    ],
    battery: {
      capacity_kwh: 200.0,
      initial_energy_kwh: 100.0,
      minimum_energy_kwh: 20.0,
      max_charge_kwh_per_hour: 50.0,
      max_discharge_kwh_per_hour: 50.0
    },
    hours: [
      { hour: 0, demand_kwh: 30, solar_kwh: 0, tariff_bdt_per_kwh: 6 },
      { hour: 1, demand_kwh: 28, solar_kwh: 0, tariff_bdt_per_kwh: 6 },
      { hour: 2, demand_kwh: 26, solar_kwh: 0, tariff_bdt_per_kwh: 6 },
      { hour: 3, demand_kwh: 25, solar_kwh: 0, tariff_bdt_per_kwh: 6 },
      { hour: 4, demand_kwh: 25, solar_kwh: 0, tariff_bdt_per_kwh: 6 },
      { hour: 5, demand_kwh: 27, solar_kwh: 5, tariff_bdt_per_kwh: 6 },
      { hour: 6, demand_kwh: 35, solar_kwh: 15, tariff_bdt_per_kwh: 8 },
      { hour: 7, demand_kwh: 45, solar_kwh: 30, tariff_bdt_per_kwh: 8 },
      { hour: 8, demand_kwh: 60, solar_kwh: 45, tariff_bdt_per_kwh: 8 },
      { hour: 9, demand_kwh: 70, solar_kwh: 60, tariff_bdt_per_kwh: 10 },
      { hour: 10, demand_kwh: 75, solar_kwh: 70, tariff_bdt_per_kwh: 10 },
      { hour: 11, demand_kwh: 80, solar_kwh: 75, tariff_bdt_per_kwh: 10 },
      { hour: 12, demand_kwh: 85, solar_kwh: 75, tariff_bdt_per_kwh: 10 },
      { hour: 13, demand_kwh: 88, solar_kwh: 70, tariff_bdt_per_kwh: 10 },
      { hour: 14, demand_kwh: 86, solar_kwh: 60, tariff_bdt_per_kwh: 10 },
      { hour: 15, demand_kwh: 82, solar_kwh: 45, tariff_bdt_per_kwh: 10 },
      { hour: 16, demand_kwh: 78, solar_kwh: 30, tariff_bdt_per_kwh: 12 },
      { hour: 17, demand_kwh: 90, solar_kwh: 15, tariff_bdt_per_kwh: 14 },
      { hour: 18, demand_kwh: 95, solar_kwh: 5, tariff_bdt_per_kwh: 14 },
      { hour: 19, demand_kwh: 92, solar_kwh: 0, tariff_bdt_per_kwh: 14 },
      { hour: 20, demand_kwh: 85, solar_kwh: 0, tariff_bdt_per_kwh: 12 },
      { hour: 21, demand_kwh: 70, solar_kwh: 0, tariff_bdt_per_kwh: 10 },
      { hour: 22, demand_kwh: 50, solar_kwh: 0, tariff_bdt_per_kwh: 8 },
      { hour: 23, demand_kwh: 38, solar_kwh: 0, tariff_bdt_per_kwh: 6 }
    ]
  },
  "high-solar-noon": {
    name: "High Solar Arbitrage",
    description: "Abundant midday solar generation with peak evening tariff shift",
    scenario_id: "high-solar-002",
    operator_notes: [
      "Solar output will drop to 50% between 12 PM and 2 PM due to maintenance.",
      "Maintain minimum 50 kWh battery reserve during evening peak.",
      "Do not discharge the battery between 10 AM and 2 PM."
    ],
    battery: {
      capacity_kwh: 250.0,
      initial_energy_kwh: 80.0,
      minimum_energy_kwh: 30.0,
      max_charge_kwh_per_hour: 60.0,
      max_discharge_kwh_per_hour: 60.0
    },
    hours: [
      { hour: 0, demand_kwh: 32, solar_kwh: 0, tariff_bdt_per_kwh: 5 },
      { hour: 1, demand_kwh: 30, solar_kwh: 0, tariff_bdt_per_kwh: 5 },
      { hour: 2, demand_kwh: 28, solar_kwh: 0, tariff_bdt_per_kwh: 5 },
      { hour: 3, demand_kwh: 27, solar_kwh: 0, tariff_bdt_per_kwh: 5 },
      { hour: 4, demand_kwh: 29, solar_kwh: 0, tariff_bdt_per_kwh: 5 },
      { hour: 5, demand_kwh: 35, solar_kwh: 10, tariff_bdt_per_kwh: 6 },
      { hour: 6, demand_kwh: 45, solar_kwh: 25, tariff_bdt_per_kwh: 8 },
      { hour: 7, demand_kwh: 55, solar_kwh: 45, tariff_bdt_per_kwh: 8 },
      { hour: 8, demand_kwh: 70, solar_kwh: 70, tariff_bdt_per_kwh: 9 },
      { hour: 9, demand_kwh: 80, solar_kwh: 90, tariff_bdt_per_kwh: 10 },
      { hour: 10, demand_kwh: 85, solar_kwh: 105, tariff_bdt_per_kwh: 10 },
      { hour: 11, demand_kwh: 90, solar_kwh: 115, tariff_bdt_per_kwh: 10 },
      { hour: 12, demand_kwh: 92, solar_kwh: 120, tariff_bdt_per_kwh: 10 },
      { hour: 13, demand_kwh: 95, solar_kwh: 110, tariff_bdt_per_kwh: 10 },
      { hour: 14, demand_kwh: 90, solar_kwh: 95, tariff_bdt_per_kwh: 10 },
      { hour: 15, demand_kwh: 85, solar_kwh: 75, tariff_bdt_per_kwh: 10 },
      { hour: 16, demand_kwh: 80, solar_kwh: 45, tariff_bdt_per_kwh: 12 },
      { hour: 17, demand_kwh: 95, solar_kwh: 20, tariff_bdt_per_kwh: 15 },
      { hour: 18, demand_kwh: 105, solar_kwh: 5, tariff_bdt_per_kwh: 16 },
      { hour: 19, demand_kwh: 100, solar_kwh: 0, tariff_bdt_per_kwh: 16 },
      { hour: 20, demand_kwh: 90, solar_kwh: 0, tariff_bdt_per_kwh: 13 },
      { hour: 21, demand_kwh: 75, solar_kwh: 0, tariff_bdt_per_kwh: 10 },
      { hour: 22, demand_kwh: 55, solar_kwh: 0, tariff_bdt_per_kwh: 7 },
      { hour: 23, demand_kwh: 40, solar_kwh: 0, tariff_bdt_per_kwh: 5 }
    ]
  },
  "storm-grid-cap": {
    name: "Monsoon Storm & Grid Cap",
    description: "Severe solar outage + strict 40 kWh grid import cap during evening peak",
    scenario_id: "storm-cap-003",
    operator_notes: [
      "Solar output will drop to about 10% from 9 AM to 3 PM due to thunderstorm.",
      "Cap grid import to 45 kWh from 6 PM to 9 PM.",
      "Maintain minimum 60 kWh battery reserve throughout the afternoon."
    ],
    battery: {
      capacity_kwh: 200.0,
      initial_energy_kwh: 120.0,
      minimum_energy_kwh: 30.0,
      max_charge_kwh_per_hour: 50.0,
      max_discharge_kwh_per_hour: 50.0
    },
    hours: [
      { hour: 0, demand_kwh: 35, solar_kwh: 0, tariff_bdt_per_kwh: 7 },
      { hour: 1, demand_kwh: 32, solar_kwh: 0, tariff_bdt_per_kwh: 7 },
      { hour: 2, demand_kwh: 30, solar_kwh: 0, tariff_bdt_per_kwh: 7 },
      { hour: 3, demand_kwh: 28, solar_kwh: 0, tariff_bdt_per_kwh: 7 },
      { hour: 4, demand_kwh: 30, solar_kwh: 0, tariff_bdt_per_kwh: 7 },
      { hour: 5, demand_kwh: 35, solar_kwh: 2, tariff_bdt_per_kwh: 7 },
      { hour: 6, demand_kwh: 45, solar_kwh: 10, tariff_bdt_per_kwh: 9 },
      { hour: 7, demand_kwh: 60, solar_kwh: 20, tariff_bdt_per_kwh: 9 },
      { hour: 8, demand_kwh: 75, solar_kwh: 35, tariff_bdt_per_kwh: 10 },
      { hour: 9, demand_kwh: 85, solar_kwh: 40, tariff_bdt_per_kwh: 11 },
      { hour: 10, demand_kwh: 90, solar_kwh: 45, tariff_bdt_per_kwh: 11 },
      { hour: 11, demand_kwh: 92, solar_kwh: 45, tariff_bdt_per_kwh: 11 },
      { hour: 12, demand_kwh: 95, solar_kwh: 50, tariff_bdt_per_kwh: 11 },
      { hour: 13, demand_kwh: 90, solar_kwh: 40, tariff_bdt_per_kwh: 11 },
      { hour: 14, demand_kwh: 88, solar_kwh: 35, tariff_bdt_per_kwh: 11 },
      { hour: 15, demand_kwh: 85, solar_kwh: 25, tariff_bdt_per_kwh: 11 },
      { hour: 16, demand_kwh: 80, solar_kwh: 15, tariff_bdt_per_kwh: 13 },
      { hour: 17, demand_kwh: 92, solar_kwh: 5, tariff_bdt_per_kwh: 16 },
      { hour: 18, demand_kwh: 95, solar_kwh: 0, tariff_bdt_per_kwh: 18 },
      { hour: 19, demand_kwh: 90, solar_kwh: 0, tariff_bdt_per_kwh: 18 },
      { hour: 20, demand_kwh: 85, solar_kwh: 0, tariff_bdt_per_kwh: 14 },
      { hour: 21, demand_kwh: 70, solar_kwh: 0, tariff_bdt_per_kwh: 11 },
      { hour: 22, demand_kwh: 55, solar_kwh: 0, tariff_bdt_per_kwh: 9 },
      { hour: 23, demand_kwh: 42, solar_kwh: 0, tariff_bdt_per_kwh: 7 }
    ]
  }
};

// Global App State
let state = {
  scenario: JSON.parse(JSON.stringify(PRESETS["bup-sample-001"])),
  result: null,
  activeChartTab: "dispatch",
  tableFilter: "all",
  isOptimizing: false,
  charts: {
    dispatch: null,
    battery: null,
    tariff: null
  }
};

// --- Initialization ---
document.addEventListener("DOMContentLoaded", () => {
  initIcons();
  initTheme();
  checkHealth();
  renderPresetSelector();
  renderScenarioInputs();
  renderBatteryGauge();
  renderHoursPreviewChart();
  setupEventListeners();

  // Auto-run baseline optimization for instant visual gratification
  optimizeEnergy();
});

function initIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function initTheme() {
  const saved = localStorage.getItem("gridwise_theme");
  if (saved === "light") {
    document.body.classList.add("light-mode");
    const icon = document.getElementById("themeIcon");
    if (icon) icon.setAttribute("data-lucide", "moon");
  }
}

function toggleTheme() {
  const isLight = document.body.classList.toggle("light-mode");
  localStorage.setItem("gridwise_theme", isLight ? "light" : "dark");
  const icon = document.getElementById("themeIcon");
  if (icon) {
    icon.setAttribute("data-lucide", isLight ? "moon" : "sun");
    initIcons();
  }
  // Re-render charts with new theme colors
  renderCharts();
}

// --- API Health Check ---
async function checkHealth() {
  const statusEl = document.getElementById("apiStatusIndicator");
  const textEl = document.getElementById("apiStatusText");
  try {
    const res = await fetch("/health");
    if (res.ok) {
      statusEl.className = "w-2.5 h-2.5 rounded-full bg-emerald-400 pulse-subtle";
      textEl.textContent = "Engine Ready";
      textEl.className = "text-xs font-medium text-emerald-400";
    } else {
      throw new Error("Health check failed");
    }
  } catch (e) {
    statusEl.className = "w-2.5 h-2.5 rounded-full bg-amber-400";
    textEl.textContent = "Standby (Local)";
    textEl.className = "text-xs font-medium text-amber-400";
  }
}

// --- Preset Selector ---
function renderPresetSelector() {
  const selector = document.getElementById("presetSelector");
  if (!selector) return;
  selector.innerHTML = Object.keys(PRESETS)
    .map(key => `<option value="${key}">${PRESETS[key].name}</option>`)
    .join("") + `<option value="custom">-- Custom Scenario --</option>`;

  selector.value = "bup-sample-001";
  selector.addEventListener("change", (e) => {
    if (e.target.value !== "custom") {
      loadPreset(e.target.value);
    }
  });
}

function loadPreset(key) {
  if (!PRESETS[key]) return;
  state.scenario = JSON.parse(JSON.stringify(PRESETS[key]));
  renderScenarioInputs();
  renderBatteryGauge();
  renderHoursPreviewChart();
  optimizeEnergy();
}

// --- Render Inputs ---
function renderScenarioInputs() {
  // Scenario ID
  const scnInput = document.getElementById("scenarioIdInput");
  if (scnInput) scnInput.value = state.scenario.scenario_id;

  // Notes
  renderNotesList();

  // Battery inputs
  const b = state.scenario.battery;
  document.getElementById("batteryCapacity").value = b.capacity_kwh;
  document.getElementById("batteryInitial").value = b.initial_energy_kwh;
  document.getElementById("batteryReserve").value = b.minimum_energy_kwh;
  document.getElementById("batteryChargeMax").value = b.max_charge_kwh_per_hour;
  document.getElementById("batteryDischargeMax").value = b.max_discharge_kwh_per_hour;

  renderBatteryGauge();
}

function renderNotesList() {
  const container = document.getElementById("notesContainer");
  const countBadge = document.getElementById("noteCountBadge");
  const notes = state.scenario.operator_notes;

  if (countBadge) countBadge.textContent = `${notes.length}/3`;

  const addBtn = document.getElementById("addNoteBtn");
  if (addBtn) addBtn.disabled = notes.length >= 3;

  container.innerHTML = notes.map((note, idx) => `
    <div class="relative group bg-slate-800/60 rounded-xl p-3 border border-slate-700/60 transition-all hover:border-slate-600 focus-within:border-cyan-500/80">
      <div class="flex items-center justify-between mb-1.5">
        <span class="text-xs font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
          <i data-lucide="message-square-text" class="w-3.5 h-3.5"></i>
          Directive Note #${idx + 1}
        </span>
        ${notes.length > 1 ? `
          <button onclick="removeNote(${idx})" class="text-slate-400 hover:text-rose-400 p-1 transition-colors" title="Delete note">
            <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
          </button>
        ` : ''}
      </div>
      <textarea
        rows="2"
        class="w-full bg-slate-900/80 text-sm text-slate-100 rounded-lg p-2.5 border border-slate-700/50 focus:outline-none focus:ring-1 focus:ring-cyan-500 resize-none font-sans"
        placeholder="Enter natural language constraint (e.g. drop solar by 80% from 1 PM to 3 PM)"
        onchange="updateNote(${idx}, this.value)"
      >${escapeHtml(note)}</textarea>
    </div>
  `).join("");

  initIcons();
}

function updateNote(idx, value) {
  state.scenario.operator_notes[idx] = value.trim();
  markPresetCustom();
}

function addNote() {
  if (state.scenario.operator_notes.length >= 3) return;
  state.scenario.operator_notes.push("Do not charge the battery between 6 PM and 9 PM.");
  renderNotesList();
  markPresetCustom();
}

function removeNote(idx) {
  if (state.scenario.operator_notes.length <= 1) return;
  state.scenario.operator_notes.splice(idx, 1);
  renderNotesList();
  markPresetCustom();
}

function insertSnippet(text) {
  if (state.scenario.operator_notes.length >= 3) {
    state.scenario.operator_notes[state.scenario.operator_notes.length - 1] = text;
  } else {
    state.scenario.operator_notes.push(text);
  }
  renderNotesList();
  markPresetCustom();
}

function markPresetCustom() {
  const selector = document.getElementById("presetSelector");
  if (selector) selector.value = "custom";
}

// --- Battery Gauge & Parameter updates ---
function updateBatteryParam(key, value) {
  const val = parseFloat(value);
  if (isNaN(val) || val < 0) return;
  state.scenario.battery[key] = val;
  renderBatteryGauge();
  markPresetCustom();
}

function renderBatteryGauge() {
  const b = state.scenario.battery;
  const reservePct = Math.min(100, (b.minimum_energy_kwh / b.capacity_kwh) * 100);
  const initialPct = Math.min(100, (b.initial_energy_kwh / b.capacity_kwh) * 100);

  const reserveEl = document.getElementById("batteryGaugeReserve");
  const fillEl = document.getElementById("batteryGaugeFill");
  const textEl = document.getElementById("batteryGaugeText");

  if (reserveEl) reserveEl.style.width = `${reservePct}%`;
  if (fillEl) fillEl.style.width = `${initialPct}%`;
  if (textEl) {
    textEl.innerHTML = `
      <span class="text-cyan-400 font-semibold">${b.initial_energy_kwh.toFixed(1)} kWh Initial</span>
      <span class="text-slate-400 font-normal">/</span>
      <span class="text-slate-200 font-semibold">${b.capacity_kwh.toFixed(1)} kWh Max</span>
      <span class="text-xs text-rose-400 ml-2">(${b.minimum_energy_kwh.toFixed(1)} kWh Reserve)</span>
    `;
  }
}

// --- Hours Preview Sparkline ---
let previewChart = null;
function renderHoursPreviewChart() {
  const ctx = document.getElementById("hoursPreviewCanvas");
  if (!ctx) return;

  const hours = state.scenario.hours;
  const labels = hours.map(h => `${h.hour}h`);
  const demand = hours.map(h => h.demand_kwh);
  const solar = hours.map(h => h.solar_kwh);
  const tariff = hours.map(h => h.tariff_bdt_per_kwh);

  if (previewChart) {
    previewChart.destroy();
  }

  previewChart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Demand (kWh)",
          data: demand,
          borderColor: "#818cf8",
          backgroundColor: "rgba(129, 140, 248, 0.1)",
          tension: 0.3,
          borderWidth: 2,
          pointRadius: 0,
          fill: true
        },
        {
          label: "Solar (kWh)",
          data: solar,
          borderColor: "#34d399",
          backgroundColor: "rgba(52, 211, 153, 0.15)",
          tension: 0.3,
          borderWidth: 2,
          pointRadius: 0,
          fill: true
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          mode: "index",
          intersect: false,
          backgroundColor: "rgba(15, 23, 42, 0.9)",
          titleColor: "#f8fafc",
          bodyColor: "#94a3b8"
        }
      },
      scales: {
        x: { display: false },
        y: { display: false }
      }
    }
  });
}

// --- Quick Multipliers ---
function applyDemandMultiplier(factor) {
  state.scenario.hours.forEach(h => {
    h.demand_kwh = Math.max(0, Math.round(h.demand_kwh * factor));
  });
  renderHoursPreviewChart();
  markPresetCustom();
}

function applySolarMultiplier(factor) {
  state.scenario.hours.forEach(h => {
    h.solar_kwh = Math.max(0, Math.round(h.solar_kwh * factor));
  });
  renderHoursPreviewChart();
  markPresetCustom();
}

// --- Run Energy Optimization ---
async function optimizeEnergy() {
  if (state.isOptimizing) return;
  state.isOptimizing = true;

  const btn = document.getElementById("optimizeBtn");
  const btnText = document.getElementById("optimizeBtnText");
  const spinner = document.getElementById("optimizeSpinner");

  if (btn) btn.disabled = true;
  if (btnText) btnText.textContent = "Solving MILP Schedule...";
  if (spinner) spinner.classList.remove("hidden");

  // Show progress stepper
  showProgressOverlay(true);

  try {
    updateProgressStep(1, "Validating schema & bounds...");
    await sleep(80);

    updateProgressStep(2, "Gemini parsing operator notes...");
    const payload = {
      scenario_id: state.scenario.scenario_id || "bup-scenario-01",
      operator_notes: state.scenario.operator_notes,
      hours: state.scenario.hours,
      battery: state.scenario.battery
    };

    updateProgressStep(3, "Evaluating deterministic guardrails...");
    const response = await fetch("/optimize-energy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || `Server returned ${response.status}`);
    }

    updateProgressStep(4, "Solving 24-hour MILP cost optimization...");
    const result = await response.json();

    updateProgressStep(5, "Replay verification & neutrality check...");
    await sleep(60);

    state.result = result;
    renderResults();
  } catch (error) {
    console.error("Optimization failed:", error);
    showToast(`Error: ${error.message}`, "error");
  } finally {
    state.isOptimizing = false;
    if (btn) btn.disabled = false;
    if (btnText) btnText.textContent = "Run GridWise Optimization";
    if (spinner) spinner.classList.add("hidden");
    showProgressOverlay(false);
  }
}

function showProgressOverlay(show) {
  const overlay = document.getElementById("optimizationOverlay");
  if (overlay) {
    if (show) {
      overlay.classList.remove("hidden");
      overlay.classList.add("flex");
    } else {
      overlay.classList.add("hidden");
      overlay.classList.remove("flex");
    }
  }
}

function updateProgressStep(step, text) {
  const stepText = document.getElementById("progressStatusText");
  const stepFill = document.getElementById("progressBarFill");
  if (stepText) stepText.textContent = text;
  if (stepFill) stepFill.style.width = `${step * 20}%`;
}

// --- Render Optimization Results ---
function renderResults() {
  if (!state.result) return;
  const res = state.result;

  // 1. Top KPI Summary Cards
  renderKPICards(res);

  // 2. Directives Hub
  renderDirectivesHub(res.directive_interpretation);

  // 3. Plan Summary & Verification Invariants
  renderPlanSummary(res);

  // 4. Interactive Charts
  renderCharts();

  // 5. Hourly Table
  renderHourlyTable();

  // Enable modal / payload inspection
  document.getElementById("viewRawJsonBtn").disabled = false;
  document.getElementById("exportCsvBtn").disabled = false;
  document.getElementById("exportJsonBtn").disabled = false;
}

function renderKPICards(res) {
  // Baseline Cost without battery (pure demand minus solar)
  let baselineCost = 0;
  let totalSolarAvail = 0;
  let totalSolarUsed = 0;

  state.scenario.hours.forEach(h => {
    const directSolar = Math.min(h.demand_kwh, h.solar_kwh);
    const unoptimizedGrid = Math.max(0, h.demand_kwh - directSolar);
    baselineCost += unoptimizedGrid * h.tariff_bdt_per_kwh;
    totalSolarAvail += h.solar_kwh;
  });

  res.hourly_plan.forEach(p => {
    totalSolarUsed += p.solar_used_kwh;
  });

  const costSavings = Math.max(0, baselineCost - res.total_cost_bdt);
  const costSavingsPct = baselineCost > 0 ? (costSavings / baselineCost) * 100 : 0;

  // Cost card
  document.getElementById("kpiTotalCost").textContent = `৳ ${res.total_cost_bdt.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  document.getElementById("kpiSavingsBadge").textContent = `Saved ৳${costSavings.toFixed(0)} (${costSavingsPct.toFixed(1)}%)`;

  // Grid energy card
  document.getElementById("kpiTotalGrid").textContent = `${res.total_grid_kwh.toFixed(1)} kWh`;
  document.getElementById("kpiPeakGrid").textContent = `${res.peak_grid_kwh.toFixed(1)} kW Peak`;

  // Battery neutrality
  const bInitial = state.scenario.battery.initial_energy_kwh;
  const bFinal = res.hourly_plan[23].battery_energy_after_kwh;
  const isNeutral = Math.abs(bFinal - bInitial) < 0.05;
  document.getElementById("kpiBatteryNeutrality").innerHTML = `
    <span class="${isNeutral ? 'text-emerald-400' : 'text-amber-400'}">${bFinal.toFixed(1)} kWh</span>
    <span class="text-xs text-slate-400 block">${isNeutral ? '✓ Verified End-of-Day Neutral' : '⚠ Drift Detected'}</span>
  `;

  // Solar Self-Consumption
  const solarPct = totalSolarAvail > 0 ? Math.min(100, (totalSolarUsed / totalSolarAvail) * 100) : 100;
  document.getElementById("kpiSolarEfficiency").textContent = `${solarPct.toFixed(1)}%`;
}

function renderDirectivesHub(directives) {
  const container = document.getElementById("directivesContainer");
  if (!directives || directives.length === 0) {
    container.innerHTML = `<div class="p-4 text-center text-sm text-slate-400">No directives applied.</div>`;
    return;
  }

  container.innerHTML = directives.map(d => {
    const isApplied = d.applies;
    const badgeClass = isApplied ? "badge-applied" : "badge-noop";
    const statusText = isApplied ? "APPLIED" : "NO-OP / IGNORED";
    const originalNote = state.scenario.operator_notes[d.note_index] || "";

    let adjDetails = "";
    if (d.structured_adjustment) {
      adjDetails = Object.entries(d.structured_adjustment)
        .map(([k, v]) => `<span class="px-2 py-0.5 rounded bg-slate-900/90 text-cyan-300 font-mono text-xs border border-slate-700/60">${k}: ${JSON.stringify(v)}</span>`)
        .join(" ");
    }

    return `
      <div class="glass-panel rounded-xl p-3.5 border ${isApplied ? 'border-emerald-500/30' : 'border-slate-800'} transition-all hover:border-slate-700">
        <div class="flex items-center justify-between gap-2 mb-2">
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded-full text-xs font-semibold ${badgeClass}">
              ${statusText}
            </span>
            <span class="font-mono text-xs text-slate-300 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
              ${d.directive_type}
            </span>
          </div>
          <span class="text-xs text-slate-400 font-medium">Note #${d.note_index + 1}</span>
        </div>
        
        <p class="text-xs text-slate-300 italic mb-2 border-l-2 border-slate-700 pl-2">
          "${escapeHtml(originalNote)}"
        </p>

        ${adjDetails ? `<div class="flex flex-wrap gap-1.5 mb-2">${adjDetails}</div>` : ''}

        <p class="text-xs text-slate-400">
          <span class="text-slate-300 font-medium">AI Reasoning:</span> ${escapeHtml(d.explanation)}
        </p>
      </div>
    `;
  }).join("");
}

function renderPlanSummary(res) {
  const summaryEl = document.getElementById("planSummaryText");
  if (summaryEl) summaryEl.textContent = res.plan_summary;

  // Invariant Badges
  const bInitial = state.scenario.battery.initial_energy_kwh;
  const bFinal = res.hourly_plan[23].battery_energy_after_kwh;
  const isNeutral = Math.abs(bFinal - bInitial) < 0.05;

  let balanceOk = true;
  let noSimultaneous = true;
  res.hourly_plan.forEach((p, idx) => {
    const demand = state.scenario.hours[idx].demand_kwh;
    const charge = p.battery_action === "charge" ? p.battery_kwh : 0;
    const discharge = p.battery_action === "discharge" ? p.battery_kwh : 0;
    const supply = p.grid_kwh + p.solar_used_kwh + discharge;
    const req = demand + charge;
    if (Math.abs(supply - req) > 0.1) balanceOk = false;
  });

  const badgeNeutral = document.getElementById("badgeNeutralityInvariant");
  const badgeBalance = document.getElementById("badgeBalanceInvariant");

  if (badgeNeutral) {
    badgeNeutral.innerHTML = isNeutral
      ? `<i data-lucide="check-circle-2" class="w-3.5 h-3.5 text-emerald-400"></i> Neutrality Exact`
      : `<i data-lucide="alert-triangle" class="w-3.5 h-3.5 text-amber-400"></i> Drift`;
  }
  if (badgeBalance) {
    badgeBalance.innerHTML = balanceOk
      ? `<i data-lucide="check-circle-2" class="w-3.5 h-3.5 text-emerald-400"></i> Energy Balance Exact`
      : `<i data-lucide="alert-triangle" class="w-3.5 h-3.5 text-rose-400"></i> Balance Mismatch`;
  }

  initIcons();
}

// --- Interactive Charts (Chart.js) ---
function renderCharts() {
  if (!state.result) return;
  renderDispatchChart();
  renderBatteryChart();
  renderTariffChart();
}

function renderDispatchChart() {
  const ctx = document.getElementById("dispatchChartCanvas");
  if (!ctx) return;

  const plan = state.result.hourly_plan;
  const hours = state.scenario.hours;
  const labels = plan.map(p => `${String(p.hour).padStart(2, '0')}:00`);

  const demandData = hours.map(h => h.demand_kwh);
  const solarUsed = plan.map(p => p.solar_used_kwh);
  const batteryDischarge = plan.map(p => p.battery_action === "discharge" ? p.battery_kwh : 0);
  const gridImport = plan.map(p => p.grid_kwh);
  const batteryCharge = plan.map(p => p.battery_action === "charge" ? p.battery_kwh : 0);

  if (state.charts.dispatch) state.charts.dispatch.destroy();

  state.charts.dispatch = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Solar Used (kWh)",
          data: solarUsed,
          backgroundColor: "rgba(16, 185, 129, 0.8)",
          borderColor: "#10b981",
          borderWidth: 1,
          stack: "supply"
        },
        {
          label: "Battery Discharge (kWh)",
          data: batteryDischarge,
          backgroundColor: "rgba(245, 158, 11, 0.8)",
          borderColor: "#f59e0b",
          borderWidth: 1,
          stack: "supply"
        },
        {
          label: "Grid Import (kWh)",
          data: gridImport,
          backgroundColor: "rgba(59, 130, 246, 0.8)",
          borderColor: "#3b82f6",
          borderWidth: 1,
          stack: "supply"
        },
        {
          label: "Battery Charge (kWh)",
          data: batteryCharge,
          backgroundColor: "rgba(6, 182, 212, 0.85)",
          borderColor: "#06b6d4",
          borderWidth: 1,
          stack: "charge"
        },
        {
          label: "Demand Curve (kWh)",
          data: demandData,
          type: "line",
          borderColor: "#f1f5f9",
          borderWidth: 2.5,
          tension: 0.2,
          pointRadius: 3,
          pointBackgroundColor: "#f1f5f9",
          order: -1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: "index",
        intersect: false
      },
      plugins: {
        legend: {
          position: "top",
          labels: { color: "#cbd5e1", boxWidth: 14, font: { size: 11 } }
        },
        tooltip: {
          backgroundColor: "rgba(15, 23, 42, 0.95)",
          titleColor: "#f8fafc",
          bodyColor: "#cbd5e1",
          borderColor: "rgba(255, 255, 255, 0.1)",
          borderWidth: 1
        }
      },
      scales: {
        x: {
          stacked: true,
          grid: { color: "rgba(255, 255, 255, 0.05)" },
          ticks: { color: "#94a3b8", font: { size: 10 } }
        },
        y: {
          stacked: true,
          grid: { color: "rgba(255, 255, 255, 0.05)" },
          ticks: { color: "#94a3b8", font: { size: 10 } },
          title: { display: true, text: "Energy (kWh)", color: "#94a3b8" }
        }
      }
    }
  });
}

function renderBatteryChart() {
  const ctx = document.getElementById("batteryChartCanvas");
  if (!ctx) return;

  const plan = state.result.hourly_plan;
  const labels = plan.map(p => `${String(p.hour).padStart(2, '0')}:00`);
  const soc = plan.map(p => p.battery_energy_after_kwh);
  const cap = state.scenario.battery.capacity_kwh;
  const minRes = state.scenario.battery.minimum_energy_kwh;

  if (state.charts.battery) state.charts.battery.destroy();

  state.charts.battery = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Stored Energy (kWh)",
          data: soc,
          borderColor: "#06b6d4",
          backgroundColor: "rgba(6, 182, 212, 0.2)",
          borderWidth: 3,
          fill: true,
          tension: 0.3,
          pointRadius: 4,
          pointBackgroundColor: plan.map(p =>
            p.battery_action === "charge" ? "#22d3ee" :
            p.battery_action === "discharge" ? "#f59e0b" : "#64748b"
          )
        },
        {
          label: "Minimum Reserve (kWh)",
          data: Array(24).fill(minRes),
          borderColor: "#ef4444",
          borderDash: [5, 5],
          borderWidth: 1.5,
          pointRadius: 0,
          fill: false
        },
        {
          label: "Max Capacity (kWh)",
          data: Array(24).fill(cap),
          borderColor: "#10b981",
          borderDash: [3, 3],
          borderWidth: 1.5,
          pointRadius: 0,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
          labels: { color: "#cbd5e1", boxWidth: 14, font: { size: 11 } }
        },
        tooltip: {
          backgroundColor: "rgba(15, 23, 42, 0.95)",
          titleColor: "#f8fafc",
          bodyColor: "#cbd5e1",
          callbacks: {
            afterLabel: (item) => {
              if (item.datasetIndex === 0) {
                const action = plan[item.dataIndex].battery_action;
                const amt = plan[item.dataIndex].battery_kwh;
                return `Action: ${action.toUpperCase()} (${amt.toFixed(1)} kWh)`;
              }
            }
          }
        }
      },
      scales: {
        x: {
          grid: { color: "rgba(255, 255, 255, 0.05)" },
          ticks: { color: "#94a3b8", font: { size: 10 } }
        },
        y: {
          min: 0,
          max: Math.ceil(cap * 1.1),
          grid: { color: "rgba(255, 255, 255, 0.05)" },
          ticks: { color: "#94a3b8", font: { size: 10 } },
          title: { display: true, text: "Battery Energy (kWh)", color: "#94a3b8" }
        }
      }
    }
  });
}

function renderTariffChart() {
  const ctx = document.getElementById("tariffChartCanvas");
  if (!ctx) return;

  const plan = state.result.hourly_plan;
  const hours = state.scenario.hours;
  const labels = plan.map(p => `${String(p.hour).padStart(2, '0')}:00`);

  const gridImport = plan.map(p => p.grid_kwh);
  const tariffRates = hours.map(h => h.tariff_bdt_per_kwh);
  const hourlyCost = plan.map((p, idx) => p.grid_kwh * hours[idx].tariff_bdt_per_kwh);

  if (state.charts.tariff) state.charts.tariff.destroy();

  state.charts.tariff = new Chart(ctx, {
    data: {
      labels,
      datasets: [
        {
          type: "bar",
          label: "Hourly Cost (BDT)",
          data: hourlyCost,
          backgroundColor: "rgba(245, 158, 11, 0.7)",
          borderColor: "#f59e0b",
          borderWidth: 1,
          yAxisID: "yCost"
        },
        {
          type: "bar",
          label: "Grid Import (kWh)",
          data: gridImport,
          backgroundColor: "rgba(59, 130, 246, 0.6)",
          borderColor: "#3b82f6",
          borderWidth: 1,
          yAxisID: "yEnergy"
        },
        {
          type: "line",
          label: "Tariff Rate (BDT/kWh)",
          data: tariffRates,
          borderColor: "#ec4899",
          borderWidth: 2.5,
          tension: 0.2,
          pointRadius: 3,
          pointBackgroundColor: "#ec4899",
          yAxisID: "yTariff"
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
          labels: { color: "#cbd5e1", boxWidth: 14, font: { size: 11 } }
        }
      },
      scales: {
        x: {
          grid: { color: "rgba(255, 255, 255, 0.05)" },
          ticks: { color: "#94a3b8", font: { size: 10 } }
        },
        yCost: {
          position: "left",
          grid: { color: "rgba(255, 255, 255, 0.05)" },
          ticks: { color: "#f59e0b", font: { size: 10 } },
          title: { display: true, text: "Cost (BDT)", color: "#f59e0b" }
        },
        yEnergy: {
          position: "left",
          display: false,
          grid: { display: false }
        },
        yTariff: {
          position: "right",
          grid: { display: false },
          ticks: { color: "#ec4899", font: { size: 10 } },
          title: { display: true, text: "Tariff (BDT/kWh)", color: "#ec4899" }
        }
      }
    }
  });
}

function switchChartTab(tab) {
  state.activeChartTab = tab;

  document.querySelectorAll(".chart-tab-btn").forEach(btn => {
    btn.classList.remove("active");
  });
  const activeBtn = document.getElementById(`tabBtn-${tab}`);
  if (activeBtn) activeBtn.classList.add("active");

  document.getElementById("dispatchChartContainer").classList.toggle("hidden", tab !== "dispatch");
  document.getElementById("batteryChartContainer").classList.toggle("hidden", tab !== "battery");
  document.getElementById("tariffChartContainer").classList.toggle("hidden", tab !== "tariff");

  renderCharts();
}

// --- Hourly Data Table ---
function renderHourlyTable() {
  const tbody = document.getElementById("hourlyTableBody");
  if (!tbody || !state.result) return;

  const plan = state.result.hourly_plan;
  const hours = state.scenario.hours;

  const filter = state.tableFilter;
  const filteredRows = plan.filter(p => {
    if (filter === "charge") return p.battery_action === "charge";
    if (filter === "discharge") return p.battery_action === "discharge";
    if (filter === "solar") return p.solar_used_kwh > 0;
    if (filter === "peak") return hours[p.hour].tariff_bdt_per_kwh >= 12;
    return true;
  });

  tbody.innerHTML = filteredRows.map(p => {
    const h = hours[p.hour];
    const cost = (p.grid_kwh * h.tariff_bdt_per_kwh).toFixed(2);
    let actionBadge = `<span class="badge-idle px-2 py-0.5 rounded text-xs font-medium uppercase">Idle</span>`;
    if (p.battery_action === "charge") {
      actionBadge = `<span class="badge-charge px-2 py-0.5 rounded text-xs font-semibold uppercase flex items-center gap-1 w-fit"><i data-lucide="arrow-down-right" class="w-3 h-3"></i> Charge</span>`;
    } else if (p.battery_action === "discharge") {
      actionBadge = `<span class="badge-discharge px-2 py-0.5 rounded text-xs font-semibold uppercase flex items-center gap-1 w-fit"><i data-lucide="arrow-up-right" class="w-3 h-3"></i> Discharge</span>`;
    }

    return `
      <tr class="border-b border-slate-800/80 hover:bg-slate-800/30 transition-colors font-mono text-xs">
        <td class="py-2.5 px-3 font-semibold text-slate-200">${String(p.hour).padStart(2, '0')}:00</td>
        <td class="py-2.5 px-3 text-slate-300">${h.demand_kwh.toFixed(1)}</td>
        <td class="py-2.5 px-3 text-emerald-400/90">${h.solar_kwh.toFixed(1)}</td>
        <td class="py-2.5 px-3 text-emerald-300 font-medium">${p.solar_used_kwh.toFixed(1)}</td>
        <td class="py-2.5 px-3">${actionBadge}</td>
        <td class="py-2.5 px-3 ${p.battery_kwh > 0 ? 'text-cyan-300 font-semibold' : 'text-slate-500'}">${p.battery_kwh.toFixed(1)}</td>
        <td class="py-2.5 px-3 text-slate-200 font-medium">${p.battery_energy_after_kwh.toFixed(1)}</td>
        <td class="py-2.5 px-3 text-blue-400 font-semibold">${p.grid_kwh.toFixed(1)}</td>
        <td class="py-2.5 px-3 text-pink-400">${h.tariff_bdt_per_kwh.toFixed(1)}</td>
        <td class="py-2.5 px-3 text-amber-300 font-semibold">৳ ${cost}</td>
      </tr>
    `;
  }).join("");

  initIcons();
}

function setTableFilter(filter) {
  state.tableFilter = filter;
  document.querySelectorAll(".table-filter-btn").forEach(btn => {
    btn.classList.remove("active", "bg-slate-700", "text-white");
    btn.classList.add("text-slate-400");
  });
  const active = document.getElementById(`filterBtn-${filter}`);
  if (active) {
    active.classList.add("active", "bg-slate-700", "text-white");
    active.classList.remove("text-slate-400");
  }
  renderHourlyTable();
}

// --- Export Functionalities ---
function exportCsv() {
  if (!state.result) return;
  const plan = state.result.hourly_plan;
  const hours = state.scenario.hours;

  const header = ["Hour,Demand_kWh,Solar_Avail_kWh,Solar_Used_kWh,Battery_Action,Battery_kWh,Battery_SoC_kWh,Grid_kWh,Tariff_BDT,Cost_BDT"];
  const rows = plan.map(p => {
    const h = hours[p.hour];
    const cost = (p.grid_kwh * h.tariff_bdt_per_kwh).toFixed(4);
    return `${p.hour},${h.demand_kwh},${h.solar_kwh},${p.solar_used_kwh},${p.battery_action},${p.battery_kwh},${p.battery_energy_after_kwh},${p.grid_kwh},${h.tariff_bdt_per_kwh},${cost}`;
  });

  const csvContent = "data:text/csv;charset=utf-8," + [header, ...rows].join("\n");
  downloadFile(csvContent, `gridwise_schedule_${state.scenario.scenario_id || "export"}.csv`);
}

function exportJson() {
  const data = state.result || state.scenario;
  const jsonStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
  downloadFile(jsonStr, `gridwise_${state.scenario.scenario_id || "scenario"}.json`);
}

function downloadFile(uri, filename) {
  const a = document.createElement("a");
  a.setAttribute("href", uri);
  a.setAttribute("download", filename);
  document.body.appendChild(a);
  a.click();
  a.remove();
}

// --- Upload JSON ---
function handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const parsed = JSON.parse(e.target.result);
      if (!parsed.hours || parsed.hours.length !== 24 || !parsed.battery) {
        throw new Error("Invalid Scenario format. Must contain 24 hours and battery parameters.");
      }
      state.scenario = parsed;
      renderScenarioInputs();
      renderBatteryGauge();
      renderHoursPreviewChart();
      markPresetCustom();
      optimizeEnergy();
      showToast("Scenario loaded successfully!", "success");
    } catch (err) {
      showToast(`Upload Error: ${err.message}`, "error");
    }
  };
  reader.readAsText(file);
}

// --- Raw JSON Modal ---
function openRawModal() {
  const modal = document.getElementById("rawJsonModal");
  const reqEl = document.getElementById("rawRequestJson");
  const resEl = document.getElementById("rawResponseJson");

  const reqPayload = {
    scenario_id: state.scenario.scenario_id,
    operator_notes: state.scenario.operator_notes,
    hours: state.scenario.hours,
    battery: state.scenario.battery
  };

  reqEl.textContent = JSON.stringify(reqPayload, null, 2);
  resEl.textContent = state.result ? JSON.stringify(state.result, null, 2) : "// No result computed yet";

  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function closeRawModal() {
  const modal = document.getElementById("rawJsonModal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}

function copyJson(elementId) {
  const el = document.getElementById(elementId);
  if (!el) return;
  navigator.clipboard.writeText(el.textContent).then(() => {
    showToast("Copied to clipboard!", "info");
  });
}

// --- Toast Notifications ---
function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  const colorMap = {
    info: "border-cyan-500/50 bg-slate-900 text-cyan-200",
    success: "border-emerald-500/50 bg-slate-900 text-emerald-200",
    error: "border-rose-500/50 bg-slate-900 text-rose-200"
  };

  toast.className = `p-3 rounded-xl border shadow-xl flex items-center gap-2 text-xs font-medium transition-all transform duration-300 translate-y-2 opacity-0 ${colorMap[type] || colorMap.info}`;
  toast.innerHTML = `<span>${escapeHtml(message)}</span>`;

  container.appendChild(toast);
  requestAnimationFrame(() => {
    toast.classList.remove("translate-y-2", "opacity-0");
  });

  setTimeout(() => {
    toast.classList.add("opacity-0", "translate-y-2");
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// --- Helper Functions ---
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function setupEventListeners() {
  // Shortcut Ctrl/Cmd + Enter to trigger optimization
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      optimizeEnergy();
    }
  });
}
