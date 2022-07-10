Encryption process:
```
- age-keygen -o key.txt
- sops --encrypt --age <age_public_key> --encrypted-regex '^(data)$' secret.yaml > secret.enc.yaml
- sops --decrypt secret.enc.yaml > secret.yaml
```

