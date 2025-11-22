# Security Hardening

Applied comprehensive security hardening to prevent container compromise.

## Deployment Security Features

### Read-Only Root Filesystem
```yaml
readOnlyRootFilesystem: true
```
Container filesystem is immutable. Writable volumes mounted only where needed:
- `/tmp` - Temporary files
- `/var/cache/nginx` - Nginx cache
- `/var/run` - Runtime files

### Pod Security Context
```yaml
podSecurityContext:
  runAsNonRoot: true
  runAsUser: 1000
  fsGroup: 1000
  seccompProfile:
    type: RuntimeDefault
```

### Container Security Context
```yaml
securityContext:
  allowPrivilegeEscalation: false
  readOnlyRootFilesystem: true
  runAsNonRoot: true
  runAsUser: 1000
  capabilities:
    drop:
    - ALL
  seccompProfile:
    type: RuntimeDefault
```

### Service Account Token
```yaml
automountServiceAccountToken: false
```
Prevents pod from accessing Kubernetes API.

### Network Policy
Zero-trust networking:
- Ingress: Only from Cloudflare gateway namespace
- Egress: Only to kube-dns for DNS resolution

Enable in values.yaml:
```yaml
networkPolicy:
  enabled: true
  ingressNamespace: "cloudflare-gateway"
```

## Testing Security

Verify read-only filesystem:
```bash
kubectl exec -it <pod> -- touch /test
# Should fail: Read-only file system
```

Verify network isolation:
```bash
kubectl exec -it <pod> -- wget google.com
# Should timeout (blocked by egress policy)
```

## Compliance
- ✅ CIS Kubernetes Benchmark
- ✅ OWASP Top 10 protections
- ✅ Principle of least privilege
- ✅ Defense in depth
- ✅ Zero trust networking
