import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Homelab = () => {
  const [isDark, setIsDark] = useState(false)

  const theme = {
    background: isDark ? '#1a1a1a' : '#fff',
    text: isDark ? '#e0e0e0' : '#333',
    textSecondary: isDark ? '#999' : '#666',
    border: isDark ? '#444' : '#ccc',
    toggleBg: isDark ? '#2a2a2a' : '#f5f5f5',
    codeBg: isDark ? '#2a2a2a' : '#f5f5f5',
    tableHeader: isDark ? '#2a2a2a' : '#f0f0f0',
    tableRow: isDark ? '#222' : '#fafafa',
  }

  const codeStyle = {
    backgroundColor: theme.codeBg,
    padding: '3px 8px',
    borderRadius: '4px',
    fontFamily: '"JetBrainsMono Nerd Font", "JetBrains Mono", monospace',
    fontSize: '0.85em',
    color: theme.text,
    border: `1px solid ${theme.border}`,
  }

  const codeBlockStyle = {
    backgroundColor: theme.codeBg,
    padding: '20px',
    borderRadius: '8px',
    fontFamily: '"JetBrainsMono Nerd Font", "JetBrains Mono", monospace',
    fontSize: '0.85em',
    color: theme.text,
    overflow: 'auto',
    lineHeight: '1.7',
    border: `1px solid ${theme.border}`,
    whiteSpace: 'pre',
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: theme.background,
      fontFamily: '"JetBrainsMono Nerd Font", "JetBrains Mono", monospace',
      transition: 'background-color 0.3s ease',
      position: 'relative',
      padding: '40px 20px',
    }}>
      {/* Theme Toggle */}
      <button
        onClick={() => setIsDark(!isDark)}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: theme.toggleBg,
          border: `1px solid ${theme.border}`,
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '1.2rem',
          padding: '8px 12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s ease',
          color: theme.text,
          zIndex: 1000,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)'
          e.currentTarget.style.backgroundColor = isDark ? '#333' : '#e8e8e8'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)'
          e.currentTarget.style.backgroundColor = theme.toggleBg
        }}
        title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDark ? '☀️' : '🌙'}
      </button>

      {/* Back Button */}
      <Link
        to="/"
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          color: theme.text,
          textDecoration: 'none',
          fontSize: '1rem',
          transition: 'color 0.2s ease',
          zIndex: 1000,
        }}
      >
        ← back
      </Link>

      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        marginTop: '60px',
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 600,
          marginBottom: '0.5rem',
          color: theme.text,
          transition: 'color 0.3s ease',
        }}>
          🔬 homelab
        </h1>
        
        <p style={{
          color: theme.textSecondary,
          marginBottom: '2.5rem',
          fontSize: '1.1rem',
          lineHeight: '1.6',
        }}>
          The process of building a homelab for local kubernetes development and home networking from my desk. 
        </p>

        {/* Homelab Image */}
        <div style={{
          marginBottom: '3rem',
          textAlign: 'center',
        }}>
          <img 
            src="https://raw.githubusercontent.com/gluk0/homelab/main/img/homelab.jpg" 
            alt="Homelab Rack"
            style={{
              maxWidth: '400px',
              width: '100%',
              height: 'auto',
              borderRadius: '8px',
              border: `1px solid ${theme.border}`,
            }}
          />
        </div>

        <div style={{
          color: theme.text,
          lineHeight: '1.8',
          transition: 'color 0.3s ease',
        }}>
          {/* Bootstrapping Section */}
          <h2 style={{ 
            fontSize: '1.8rem', 
            marginTop: '3rem', 
            marginBottom: '1.2rem',
            fontWeight: 600,
          }}>
            🚀 To bootstrap
          </h2>
          
          <p>From ansible the bootstrapping of infrastructure is done, OpenWRT (DHCP, DNS, Network and Firewall and manually deployed..</p>
          <pre style={codeBlockStyle}>{`cd /home/rich/homelab

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

          {/* Common Tasks */}
          <h2 style={{ 
            fontSize: '1.8rem', 
            marginTop: '3rem', 
            marginBottom: '1.2rem',
            fontWeight: 600,
          }}>
            🔧 Common Tasks
          </h2>
          
          <h3 style={{ 
            fontSize: '1.3rem', 
            marginTop: '2rem', 
            marginBottom: '1rem',
            fontWeight: 500,
          }}>
            WireGuard Status
          </h3>
          
          <pre style={codeBlockStyle}>{`ssh ansible@10.20.0.2
sudo wg show
sudo ufw status
sudo systemctl status wg-quick@wg0`}</pre>

          {/* Default Ports */}
          <h2 style={{ 
            fontSize: '1.8rem', 
            marginTop: '3rem', 
            marginBottom: '1.2rem',
            fontWeight: 600,
          }}>
            🔑 Default Ports
          </h2>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              marginBottom: '2rem',
            }}>
              <thead>
                <tr style={{ backgroundColor: theme.tableHeader }}>
                  <th style={{ 
                    padding: '14px', 
                    textAlign: 'left', 
                    border: `1px solid ${theme.border}`,
                    fontWeight: 600,
                  }}>Service</th>
                  <th style={{ 
                    padding: '14px', 
                    textAlign: 'left', 
                    border: `1px solid ${theme.border}`,
                    fontWeight: 600,
                  }}>Port</th>
                  <th style={{ 
                    padding: '14px', 
                    textAlign: 'left', 
                    border: `1px solid ${theme.border}`,
                    fontWeight: 600,
                  }}>Protocol</th>
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
                  <tr key={i} style={{ backgroundColor: i % 2 === 0 ? 'transparent' : theme.tableRow }}>
                    <td style={{ padding: '12px', border: `1px solid ${theme.border}` }}>{row[0]}</td>
                    <td style={{ padding: '12px', border: `1px solid ${theme.border}` }}>
                      <code style={codeStyle}>{row[1]}</code>
                    </td>
                    <td style={{ padding: '12px', border: `1px solid ${theme.border}` }}>{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Network Components */}
          <h2 style={{ 
            fontSize: '1.8rem', 
            marginTop: '3rem', 
            marginBottom: '1.2rem',
            fontWeight: 600,
          }}>
            🌐 Network Components
          </h2>

          <div style={{
            backgroundColor: theme.codeBg,
            padding: '20px',
            borderRadius: '8px',
            border: `1px solid ${theme.border}`,
            marginBottom: '2rem',
          }}>
            <h3 style={{ 
              fontSize: '1.3rem', 
              marginTop: '0', 
              marginBottom: '1rem',
              fontWeight: 500,
            }}>
              Pi-A (Bastion)
            </h3>
            <ul style={{ marginLeft: '1.2rem', lineHeight: '2', marginBottom: '0' }}>
              <li><strong>Role:</strong> <code style={codeStyle}>pi-bastion</code></li>
              <li><strong>Services:</strong> WireGuard VPN, SSH jump host</li>
              <li><strong>Port:</strong> <code style={codeStyle}>51820/UDP</code> (WireGuard)</li>
              <li><strong>Access:</strong> Primary entry point for remote administration</li>
            </ul>
          </div>

          <div style={{
            backgroundColor: theme.codeBg,
            padding: '20px',
            borderRadius: '8px',
            border: `1px solid ${theme.border}`,
            marginBottom: '2rem',
          }}>
            <h3 style={{ 
              fontSize: '1.3rem', 
              marginTop: '0', 
              marginBottom: '1rem',
              fontWeight: 500,
            }}>
              Pi-B (DNS)
            </h3>
            <ul style={{ marginLeft: '1.2rem', lineHeight: '2', marginBottom: '0' }}>
              <li><strong>Role:</strong> <code style={codeStyle}>pi-hole</code></li>
              <li><strong>Services:</strong> Pi-hole DNS/DHCP, Ad-blocking</li>
              <li><strong>Port:</strong> <code style={codeStyle}>53/TCP/UDP</code> (DNS), <code style={codeStyle}>80/TCP</code> (Web UI)</li>
              <li><strong>Access:</strong> <a href="http://10.20.0.3/admin" target="_blank" rel="noopener noreferrer" style={{ color: theme.text, textDecoration: 'underline' }}>http://10.20.0.3/admin</a></li>
            </ul>
          </div>

          <h3 style={{ 
            fontSize: '1.3rem', 
            marginTop: '2rem', 
            marginBottom: '1rem',
            fontWeight: 500,
          }}>
            Proxmox Mini PCs (HA Kubernetes)
          </h3>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              marginBottom: '2rem',
            }}>
              <thead>
                <tr style={{ backgroundColor: theme.tableHeader }}>
                  <th style={{ 
                    padding: '14px', 
                    textAlign: 'left', 
                    border: `1px solid ${theme.border}`,
                    fontWeight: 600,
                  }}>Host</th>
                  <th style={{ 
                    padding: '14px', 
                    textAlign: 'left', 
                    border: `1px solid ${theme.border}`,
                    fontWeight: 600,
                  }}>IP</th>
                  <th style={{ 
                    padding: '14px', 
                    textAlign: 'left', 
                    border: `1px solid ${theme.border}`,
                    fontWeight: 600,
                  }}>VM ID Range</th>
                  <th style={{ 
                    padding: '14px', 
                    textAlign: 'left', 
                    border: `1px solid ${theme.border}`,
                    fontWeight: 600,
                  }}>Purpose</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['pve-01', '10.20.0.10', '100-199', 'Kubernetes Control Plane + Worker Node VMs'],
                  ['pve-02', '10.20.0.11', '200-299', 'Kubernetes Control Plane + Worker Node VMs'],
                  ['pve-03', '10.20.0.12', '300-399', 'Kubernetes Control Plane + Worker Node VMs'],
                ].map((row, i) => (
                  <tr key={i} style={{ backgroundColor: i % 2 === 0 ? 'transparent' : theme.tableRow }}>
                    <td style={{ padding: '12px', border: `1px solid ${theme.border}` }}>
                      <code style={codeStyle}>{row[0]}</code>
                    </td>
                    <td style={{ padding: '12px', border: `1px solid ${theme.border}` }}>
                      <code style={codeStyle}>{row[1]}</code>
                    </td>
                    <td style={{ padding: '12px', border: `1px solid ${theme.border}` }}>{row[2]}</td>
                    <td style={{ padding: '12px', border: `1px solid ${theme.border}` }}>{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 style={{ 
            fontSize: '1.8rem', 
            marginTop: '3rem', 
            marginBottom: '1.2rem',
            fontWeight: 600,
          }}>
            📶 VLANs
          </h2>
          
          <div style={{
            backgroundColor: theme.codeBg,
            padding: '20px',
            borderRadius: '8px',
            border: `1px solid ${theme.border}`,
            marginBottom: '3rem',
          }}>
            <ul style={{ marginLeft: '1.2rem', lineHeight: '2', marginBottom: '0' }}>
              <li>
                <strong>VLAN 10 - Home:</strong> <code style={codeStyle}>192.168.10.0/24</code>
                <br />
                <span style={{ color: theme.textSecondary, fontSize: '0.9em' }}>WiFi clients and home network</span>
              </li>
              <li>
                <strong>VLAN 20 - Homelab:</strong> <code style={codeStyle}>10.20.0.0/24</code>
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
