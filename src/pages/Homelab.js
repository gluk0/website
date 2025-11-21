import React from 'react'
import ThemeToggle from '../components/ThemeToggle'
import BackButton from '../components/BackButton'
import { useTheme } from '../hooks'
import './Homelab.css'

const Homelab = () => {
  const { isDark, theme, toggleTheme } = useTheme()

  const codeInlineStyle = {
    backgroundColor: theme.codeBg,
    color: theme.text,
    borderColor: theme.border,
  }

  const codeBlockStyle = {
    backgroundColor: theme.codeBg,
    color: theme.text,
    borderColor: theme.border,
  }

  const infoCardStyle = {
    backgroundColor: theme.codeBg,
    borderColor: theme.border,
  }

  return (
    <div className="homelab-container" style={{ backgroundColor: theme.background }}>
      <ThemeToggle isDark={isDark} onToggle={toggleTheme} theme={theme} />
      <BackButton theme={theme} />

      <div className="homelab-content">
        <h1 className="homelab-title" style={{ color: theme.text }}>
          🔬 homelab
        </h1>
        
        <p className="homelab-subtitle" style={{ color: theme.textSecondary }}>
          The process of building a homelab for local kubernetes development and home networking from my desk. 
        </p>

        <div className="homelab-image-wrapper">
          <img 
            src="https://raw.githubusercontent.com/gluk0/homelab/main/img/homelab.jpg" 
            alt="Homelab Rack"
            className="homelab-image"
            style={{ borderColor: theme.border }}
          />
        </div>

        <div className="homelab-text" style={{ color: theme.text }}>
          <h2 className="homelab-section-title">
            🚀 To bootstrap
          </h2>
          
          <p>From ansible the bootstrapping of infrastructure is done, OpenWRT (DHCP, DNS, Network and Firewall and manually deployed..</p>
          <pre className="code-block" style={codeBlockStyle}>{`cd /home/rich/homelab

# 1. Bootstrap (first time only)
make bootstrap

# 2. Setup Pis
make setup-pis

# 3. Setup Proxmox
make setup-proxmox

# 4. Create Proxmox Cluster
make setup-proxmox-cluster

# 5. Setup Kubernetes VMs
make setup-k8s

# 6. Deploy Kubernetes
make deploy-k8s

# 7. Setup Portainer
make setup-portainer

# 8. Check status
make status`}</pre>

          <h2 className="homelab-section-title">
            🔧 Common Tasks
          </h2>
          
          <h3 className="homelab-subsection-title">
            WireGuard Status
          </h3>
          
          <pre className="code-block" style={codeBlockStyle}>{`ssh ansible@10.20.0.2
sudo wg show
sudo ufw status
sudo systemctl status wg-quick@wg0`}</pre>

          <h2 className="homelab-section-title">
            🔑 Default Ports
          </h2>
          
          <div className="table-wrapper">
            <table className="homelab-table" style={{ '--table-row-bg': theme.tableRow }}>
              <thead>
                <tr style={{ backgroundColor: theme.tableHeader }}>
                  <th style={{ borderColor: theme.border }}>Service</th>
                  <th style={{ borderColor: theme.border }}>Port</th>
                  <th style={{ borderColor: theme.border }}>Protocol</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['SSH', '22', 'TCP'],
                  ['DNS', '53', 'TCP/UDP'],
                  ['HTTP', '80', 'TCP'],
                  ['HTTPS', '443', 'TCP'],
                  ['WireGuard', '51820', 'UDP'],
                  ['Proxmox Web', '8006', 'TCP'],
                ].map((row, i) => (
                  <tr key={i}>
                    <td style={{ borderColor: theme.border }}>{row[0]}</td>
                    <td style={{ borderColor: theme.border }}>
                      <code className="code-inline" style={codeInlineStyle}>{row[1]}</code>
                    </td>
                    <td style={{ borderColor: theme.border }}>{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="homelab-section-title">
            🌐 Network Components
          </h2>

          <div className="info-card" style={infoCardStyle}>
            <h3 className="info-card-title">
              Pi-A (Bastion)
            </h3>
            <ul className="info-list">
              <li><strong>Role:</strong> <code className="code-inline" style={codeInlineStyle}>pi-bastion</code></li>
              <li><strong>Services:</strong> WireGuard VPN, SSH jump host</li>
              <li><strong>Port:</strong> <code className="code-inline" style={codeInlineStyle}>51820/UDP</code> (WireGuard)</li>
              <li><strong>Access:</strong> Primary entry point for remote administration</li>
            </ul>
          </div>

          <div className="info-card" style={infoCardStyle}>
            <h3 className="info-card-title">
              Pi-B (DNS)
            </h3>
            <ul className="info-list">
              <li><strong>Role:</strong> <code className="code-inline" style={codeInlineStyle}>pi-hole</code></li>
              <li><strong>Services:</strong> Pi-hole DNS/DHCP, Ad-blocking</li>
              <li><strong>Port:</strong> <code className="code-inline" style={codeInlineStyle}>53/TCP/UDP</code> (DNS), <code className="code-inline" style={codeInlineStyle}>80/TCP</code> (Web UI)</li>
              <li><strong>Access:</strong> <a href="http://10.20.0.3/admin" target="_blank" rel="noopener noreferrer" style={{ color: theme.text, textDecoration: 'underline' }}>http://10.20.0.3/admin</a></li>
            </ul>
          </div>

          <h3 className="homelab-subsection-title">
            Proxmox Mini PCs (HA Kubernetes)
          </h3>
          
          <div className="table-wrapper">
            <table className="homelab-table" style={{ '--table-row-bg': theme.tableRow }}>
              <thead>
                <tr style={{ backgroundColor: theme.tableHeader }}>
                  <th style={{ borderColor: theme.border }}>Host</th>
                  <th style={{ borderColor: theme.border }}>IP</th>
                  <th style={{ borderColor: theme.border }}>VM ID Range</th>
                  <th style={{ borderColor: theme.border }}>Purpose</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['pve-01', '10.20.0.10', '100-199', 'Kubernetes Control Plane + Worker Node VMs'],
                  ['pve-02', '10.20.0.11', '200-299', 'Kubernetes Control Plane + Worker Node VMs'],
                  ['pve-03', '10.20.0.12', '300-399', 'Kubernetes Control Plane + Worker Node VMs'],
                ].map((row, i) => (
                  <tr key={i}>
                    <td style={{ borderColor: theme.border }}>
                      <code className="code-inline" style={codeInlineStyle}>{row[0]}</code>
                    </td>
                    <td style={{ borderColor: theme.border }}>
                      <code className="code-inline" style={codeInlineStyle}>{row[1]}</code>
                    </td>
                    <td style={{ borderColor: theme.border }}>{row[2]}</td>
                    <td style={{ borderColor: theme.border }}>{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="homelab-section-title">
            📶 VLANs
          </h2>
          
          <div className="info-card" style={infoCardStyle}>
            <ul className="info-list">
              <li>
                <strong>VLAN 10 - Home:</strong> <code className="code-inline" style={codeInlineStyle}>192.168.10.0/24</code>
                <br />
                <span style={{ color: theme.textSecondary, fontSize: '0.9em' }}>WiFi clients and home network</span>
              </li>
              <li>
                <strong>VLAN 20 - Homelab:</strong> <code className="code-inline" style={codeInlineStyle}>10.20.0.0/24</code>
                <br />
                <span style={{ color: theme.textSecondary, fontSize: '0.9em' }}>Isolated lab environment</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Homelab
