"use client";

import React, { useState } from "react";
import { Globe, Network, Wifi, Server } from "lucide-react";

type NetTab = "osi" | "tcp-handshake" | "subnetting" | "routing";

export default function NetworkVisualizer() {
  const [tab, setTab] = useState<NetTab>("osi");

  // Subnetting state
  const [ipInput, setIpInput] = useState("192.168.10.0");
  const [prefix, setPrefix] = useState(26);

  // Compute subnet details
  const computeSubnet = () => {
    try {
      const parts = ipInput.split(".").map(Number);
      if (parts.length !== 4 || parts.some((p) => isNaN(p) || p < 0 || p > 255)) {
        return null;
      }
      const hostBits = 32 - prefix;
      const totalHosts = Math.pow(2, hostBits);
      const usableHosts = Math.max(totalHosts - 2, 0);
      const maskNum = prefix === 0 ? 0 : (~0 << hostBits) >>> 0;
      const maskOctets = [(maskNum >>> 24) & 255, (maskNum >>> 16) & 255, (maskNum >>> 8) & 255, maskNum & 255];
      const ipNum = parts.reduce((acc, p) => (acc << 8) | p, 0) >>> 0;
      const netNum = (ipNum & maskNum) >>> 0;
      const bcastNum = (netNum | (~maskNum >>> 0)) >>> 0;
      const toOctets = (n: number) => [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join(".");
      const firstHost = usableHosts > 0 ? (netNum + 1) >>> 0 : null;
      const lastHost = usableHosts > 0 ? (bcastNum - 1) >>> 0 : null;
      return {
        networkId: toOctets(netNum),
        broadcastId: toOctets(bcastNum),
        subnetMask: maskOctets.join("."),
        firstHost: firstHost !== null ? toOctets(firstHost) : "N/A",
        lastHost: lastHost !== null ? toOctets(lastHost) : "N/A",
        totalHosts,
        usableHosts,
        hostBits,
      };
    } catch {
      return null;
    }
  };

  const subnet = computeSubnet();

  // Routing state
  const [activeStep, setActiveStep] = useState(0);
  const routingSteps = [
    { label: "Client DNS Query", desc: "Client resolves google.com → 142.250.x.x via DNS UDP port 53." },
    { label: "ARP Resolution", desc: "Client broadcasts ARP to find its default gateway MAC address." },
    { label: "Packet Creation", desc: "IP packet formed: Src IP = 192.168.1.10, Dest IP = 142.250.77.206." },
    { label: "Router Forwarding", desc: "Home Router performs NAT, replaces src IP with public IP, forwards to ISP." },
    { label: "ISP Routing (BGP)", desc: "ISP uses Border Gateway Protocol to route packet through AS paths." },
    { label: "TCP SYN (HTTPS)", desc: "Client initiates TCP 3-way handshake to port 443." },
    { label: "TLS Handshake", desc: "Server Certificate verified, symmetric session key established." },
    { label: "HTTP Response", desc: "HTTP/2 response received, web page renders." },
  ];

  const osi_layers = [
    { num: 7, name: "Application", tcp: "HTTP, DNS, SMTP, FTP", color: "#8b5cf6", desc: "User interface, data representation" },
    { num: 6, name: "Presentation", tcp: "SSL/TLS, MIME", color: "#7c3aed", desc: "Encryption, compression, encoding" },
    { num: 5, name: "Session", tcp: "NetBIOS, RPC", color: "#6d28d9", desc: "Session management, synchronization" },
    { num: 4, name: "Transport", tcp: "TCP, UDP", color: "#3b82f6", desc: "End-to-end delivery, segmentation, ports" },
    { num: 3, name: "Network", tcp: "IP, ICMP, OSPF", color: "#0891b2", desc: "Routing, logical addressing (IP)" },
    { num: 2, name: "Data Link", tcp: "Ethernet, Wi-Fi 802.11", color: "#059669", desc: "Framing, MAC addressing, error detection" },
    { num: 1, name: "Physical", tcp: "Cables, Hubs, Bits", color: "#65a30d", desc: "Raw bit transmission over physical media" },
  ];

  const [selectedLayer, setSelectedLayer] = useState<null | typeof osi_layers[0]>(null);

  // TCP Handshake state
  const [hsStep, setHsStep] = useState(0);
  const hsSteps = [
    { from: "Client", to: "Server", label: "SYN", color: "#3b82f6", desc: "Client sends SYN with ISN_c. State: SYN_SENT" },
    { from: "Server", to: "Client", label: "SYN-ACK", color: "#10b981", desc: "Server replies SYN with ISN_s, ACK = ISN_c+1. State: SYN_RECEIVED" },
    { from: "Client", to: "Server", label: "ACK", color: "#f59e0b", desc: "Client sends ACK = ISN_s+1. Connection ESTABLISHED." },
    { from: "Client", to: "Server", label: "HTTP GET/TLS", color: "#8b5cf6", desc: "Data transfer begins. Full duplex communication." },
    { from: "Client", to: "Server", label: "FIN", color: "#ef4444", desc: "Client initiates termination (4-way teardown starts)." },
    { from: "Server", to: "Client", label: "FIN-ACK", color: "#ef4444", desc: "Server acknowledges, sends its own FIN." },
    { from: "Client", to: "Server", label: "ACK (TIME_WAIT)", color: "#94a3b8", desc: "Client in TIME_WAIT for 2*MSL (120s). Connection closed." },
  ];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 space-y-5 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded border border-cyan-500/20">
            Networks Lab
          </span>
          <h3 className="text-xl font-black text-white mt-1">Computer Networks Interactive Visualizer</h3>
        </div>
        <div className="flex gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 flex-wrap">
          {[
            { id: "osi" as NetTab, label: "OSI Model", icon: Wifi },
            { id: "tcp-handshake" as NetTab, label: "TCP Handshake", icon: Network },
            { id: "subnetting" as NetTab, label: "IP Subnetting", icon: Server },
            { id: "routing" as NetTab, label: "Packet Flow", icon: Globe },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                tab === id ? "bg-cyan-700 text-white shadow-md" : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Icon className="h-3 w-3" /> {label}
            </button>
          ))}
        </div>
      </div>

      {/* ===== OSI MODEL ===== */}
      {tab === "osi" && (
        <div className="space-y-3">
          <p className="text-xs text-slate-400">Click a layer to see its protocols, PDU, and devices.</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Layer Stack */}
            <div className="space-y-1.5">
              {osi_layers.map((layer) => (
                <button
                  key={layer.num}
                  onClick={() => setSelectedLayer(selectedLayer?.num === layer.num ? null : layer)}
                  className="w-full rounded-xl p-3 flex items-center gap-3 border transition text-left hover:opacity-90"
                  style={{
                    borderColor: layer.color + "44",
                    backgroundColor: selectedLayer?.num === layer.num ? layer.color + "22" : "#0f172a80",
                  }}
                >
                  <div
                    className="h-8 w-8 rounded-lg flex items-center justify-center text-xs font-black text-white shrink-0"
                    style={{ backgroundColor: layer.color }}
                  >
                    L{layer.num}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-white">{layer.name} Layer</div>
                    <div className="text-xs text-slate-400">{layer.tcp}</div>
                  </div>
                  <div className="text-[10px] text-slate-500 hidden sm:block max-w-[120px] text-right">{layer.desc}</div>
                </button>
              ))}
            </div>

            {/* Layer Detail Panel */}
            {selectedLayer ? (
              <div className="rounded-xl border p-5 space-y-4" style={{ borderColor: selectedLayer.color + "44", backgroundColor: selectedLayer.color + "11" }}>
                <div>
                  <div className="text-xs uppercase tracking-wider font-bold mb-1" style={{ color: selectedLayer.color }}>
                    Layer {selectedLayer.num}
                  </div>
                  <h4 className="text-xl font-black text-white">{selectedLayer.name} Layer</h4>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex gap-2">
                    <span className="text-slate-400 w-24 shrink-0">Protocols:</span>
                    <span className="font-mono font-bold text-white">{selectedLayer.tcp}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-slate-400 w-24 shrink-0">Function:</span>
                    <span className="text-slate-300">{selectedLayer.desc}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-slate-400 w-24 shrink-0">PDU Name:</span>
                    <span className="font-mono text-amber-400">
                      {selectedLayer.num >= 7 ? "Data" : selectedLayer.num === 4 ? "Segment (TCP) / Datagram (UDP)" : selectedLayer.num === 3 ? "Packet" : selectedLayer.num === 2 ? "Frame" : "Bits"}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-slate-400 w-24 shrink-0">Devices:</span>
                    <span className="text-slate-300">
                      {selectedLayer.num >= 5 ? "Gateways, Firewalls" : selectedLayer.num === 4 ? "Firewall (stateful), Load Balancer" : selectedLayer.num === 3 ? "Router, Layer-3 Switch" : selectedLayer.num === 2 ? "Layer-2 Switch, Bridge" : "Hub, Repeater, Cable, NIC"}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-8 flex flex-col items-center justify-center text-center space-y-2">
                <Wifi className="h-8 w-8 text-slate-600" />
                <p className="text-xs text-slate-500">Click any layer to see details, protocols, and devices.</p>
              </div>
            )}
          </div>

          {/* Encapsulation Diagram */}
          <div className="bg-slate-950/60 rounded-xl border border-slate-800 p-4">
            <div className="text-xs font-bold text-slate-300 mb-3">Data Encapsulation (Sender) → Decapsulation (Receiver)</div>
            <div className="flex flex-wrap items-center justify-center gap-1 font-mono text-[10px] font-bold">
              {["L7 Data", "→ [TCP Header | Data]", "→ [IP Header | Segment]", "→ [ETH Header | Packet | ETH Trailer]", "→ 010110..."].map((part, i) => (
                <div key={i} className="px-2 py-1 rounded border border-slate-700 bg-slate-900 text-slate-300">
                  {part}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ===== TCP HANDSHAKE ===== */}
      {tab === "tcp-handshake" && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setHsStep(Math.max(0, hsStep - 1))}
              disabled={hsStep === 0}
              className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-bold text-slate-300 disabled:opacity-40 border border-slate-700 hover:bg-slate-700 transition"
            >
              ← Prev
            </button>
            <span className="text-xs font-mono text-slate-400">Step {hsStep + 1} / {hsSteps.length}</span>
            <button
              onClick={() => setHsStep(Math.min(hsSteps.length - 1, hsStep + 1))}
              disabled={hsStep === hsSteps.length - 1}
              className="px-3 py-1.5 rounded-lg bg-cyan-700 text-xs font-bold text-white disabled:opacity-40 hover:bg-cyan-600 transition"
            >
              Next →
            </button>
            <button onClick={() => setHsStep(0)} className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs text-slate-400 border border-slate-700 hover:bg-slate-700 transition ml-auto">Reset</button>
          </div>

          {/* Animated Sequence Diagram */}
          <div className="bg-slate-950 rounded-xl border border-slate-800 p-6">
            <div className="flex justify-between items-start mb-8">
              <div className="text-center">
                <div className="h-12 w-12 rounded-xl bg-blue-600 flex items-center justify-center mx-auto shadow-lg shadow-blue-500/20">
                  <Network className="h-6 w-6 text-white" />
                </div>
                <div className="text-xs font-bold text-blue-400 mt-2">Client</div>
                <div className="text-[10px] text-slate-500 font-mono">192.168.1.10</div>
              </div>
              <div className="text-center">
                <div className="h-12 w-12 rounded-xl bg-emerald-600 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                  <Server className="h-6 w-6 text-white" />
                </div>
                <div className="text-xs font-bold text-emerald-400 mt-2">Server</div>
                <div className="text-[10px] text-slate-500 font-mono">142.250.77.206</div>
              </div>
            </div>

            {/* Steps */}
            <div className="space-y-2">
              {hsSteps.map((step, i) => {
                if (i > hsStep) return null;
                const isClientToServer = step.from === "Client";
                return (
                  <div key={i} className={`flex items-center gap-2 ${i === hsStep ? "opacity-100" : "opacity-50"}`}>
                    {isClientToServer ? (
                      <>
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black text-white shrink-0" style={{ backgroundColor: step.color }}>{i + 1}</div>
                        <div className="flex-1 h-0.5 relative" style={{ backgroundColor: step.color }}>
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 border-t-4 border-b-4 border-l-8 border-transparent" style={{ borderLeftColor: step.color }}/>
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-4 text-[10px] font-mono font-black px-2 py-0.5 rounded text-white" style={{ backgroundColor: step.color }}>
                            {step.label}
                          </div>
                        </div>
                        <div className="w-8 shrink-0"/>
                      </>
                    ) : (
                      <>
                        <div className="w-8 shrink-0"/>
                        <div className="flex-1 h-0.5 relative" style={{ backgroundColor: step.color }}>
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 border-t-4 border-b-4 border-r-8 border-transparent" style={{ borderRightColor: step.color }}/>
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-4 text-[10px] font-mono font-black px-2 py-0.5 rounded text-white" style={{ backgroundColor: step.color }}>
                            {step.label}
                          </div>
                        </div>
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black text-white shrink-0" style={{ backgroundColor: step.color }}>{i + 1}</div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step Description */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 text-xs text-slate-300 font-medium">
            <span className="font-bold" style={{ color: hsSteps[hsStep].color }}>Step {hsStep + 1}:</span> {hsSteps[hsStep].desc}
          </div>
        </div>
      )}

      {/* ===== IP SUBNETTING ===== */}
      {tab === "subnetting" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">IP Address:</label>
              <input
                value={ipInput}
                onChange={(e) => setIpInput(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm font-mono text-white focus:border-cyan-500 focus:outline-none"
                placeholder="e.g. 192.168.10.0"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">CIDR Prefix Length: /{prefix}</label>
              <input
                type="range" min={1} max={30} value={prefix}
                onChange={(e) => setPrefix(Number(e.target.value))}
                className="w-full accent-cyan-500 mt-2"
              />
            </div>
          </div>

          {subnet && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { label: "Network ID", value: subnet.networkId, color: "text-blue-400" },
                { label: "Subnet Mask", value: subnet.subnetMask, color: "text-emerald-400" },
                { label: "First Usable", value: subnet.firstHost, color: "text-cyan-400" },
                { label: "Last Usable", value: subnet.lastHost, color: "text-cyan-400" },
                { label: "Broadcast ID", value: subnet.broadcastId, color: "text-rose-400" },
                { label: "Usable Hosts", value: subnet.usableHosts.toLocaleString(), color: "text-amber-400" },
              ].map(({ label, value, color }) => (
                <div key={label} className="bg-slate-950/60 rounded-xl border border-slate-800 p-4 space-y-1 text-center">
                  <div className="text-[11px] text-slate-400 font-medium">{label}</div>
                  <div className={`font-mono font-black text-base ${color}`}>{value}</div>
                </div>
              ))}
            </div>
          )}

          {/* Binary Representation */}
          {subnet && (
            <div className="bg-slate-950/60 rounded-xl border border-slate-800 p-4 space-y-2">
              <div className="text-xs font-bold text-slate-300">Binary Subnet Mask Visualization:</div>
              <div className="flex flex-wrap gap-1 font-mono text-[11px]">
                {Array.from({ length: 32 }, (_, i) => (
                  <div
                    key={i}
                    className={`w-5 h-5 flex items-center justify-center rounded font-black ${
                      i < prefix
                        ? "bg-blue-600 text-white"
                        : "bg-slate-800 text-slate-400"
                    }`}
                    title={i < prefix ? `Network bit ${i + 1}` : `Host bit ${i - prefix + 1}`}
                  >
                    {i < prefix ? "1" : "0"}
                  </div>
                ))}
              </div>
              <div className="flex gap-4 text-[10px] mt-1">
                <div className="flex items-center gap-1.5">
                  <div className="h-3 w-3 rounded bg-blue-600" /> Network bits ({prefix})
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-3 w-3 rounded bg-slate-800" /> Host bits ({32 - prefix})
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ===== PACKET ROUTING ===== */}
      {tab === "routing" && (
        <div className="space-y-4">
          <p className="text-xs text-slate-400">Trace how a web request travels from your browser to Google's servers.</p>
          <div className="flex gap-2 flex-wrap">
            {routingSteps.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveStep(i)}
                className={`h-7 w-7 rounded-full text-xs font-bold transition ${
                  i === activeStep ? "bg-cyan-600 text-white" : i < activeStep ? "bg-emerald-600/60 text-white" : "bg-slate-800 text-slate-400"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          {/* Journey Steps */}
          <div className="space-y-2">
            {routingSteps.map((step, i) => (
              <div
                key={i}
                onClick={() => setActiveStep(i)}
                className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition ${
                  i === activeStep
                    ? "bg-cyan-500/10 border-cyan-500/40"
                    : i < activeStep
                    ? "bg-emerald-500/5 border-emerald-500/20 opacity-70"
                    : "bg-slate-950/40 border-slate-800 opacity-40"
                }`}
              >
                <div className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${
                  i === activeStep ? "bg-cyan-600 text-white" : i < activeStep ? "bg-emerald-600 text-white" : "bg-slate-800 text-slate-500"
                }`}>
                  {i < activeStep ? "✓" : i + 1}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-200">{step.label}</div>
                  {i === activeStep && <div className="text-xs text-slate-400 mt-0.5">{step.desc}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
