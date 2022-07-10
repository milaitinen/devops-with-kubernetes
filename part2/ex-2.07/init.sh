#!/bin/bash

# k3d cluster delete
# k3d cluster create --port 8082:30080@agent:0 -p 8081:80@loadbalancer --agents 2
# kubectl create namespace applications
kubectl delete all --all -n applications

kubectl apply -f manifests/secret.yaml
kubectl apply -f manifests/postgres-ss.yaml
kubectl apply -f manifests/postgres-cm.yaml
kubectl apply -f manifests/postgres-svc.yaml

kubectl apply -f manifests/logoutput-deployment.yaml
kubectl apply -f manifests/logoutput-cm.yaml
kubectl apply -f manifests/logoutput-svc.yaml
kubectl apply -f manifests/logoutput-ing.yaml

kubectl apply -f manifests/pingpong-deployment.yaml
kubectl apply -f manifests/pingpong-svc.yaml
