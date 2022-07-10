#!/bin/bash

# k3d cluster delete
# k3d cluster create --port 8082:30080@agent:0 -p 8081:80@loadbalancer --agents 2
# docker exec k3d-k3s-default-agent-0 mkdir -p /tmp/kube

helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo add stable https://charts.helm.sh/stable

kubectl create namespace prometheus
helm install prometheus-community/kube-prometheus-stack --generate-name --namespace prometheus

# kubectl get pods -n prometheus
# kubectl -n prometheus port-forward kube-prometheus-stack-<some_id>-grafana-<some_id> 3000

helm repo add grafana https://grafana.github.io/helm-charts
helm repo update
kubectl create namespace loki-stack
helm upgrade --install loki --namespace=loki-stack grafana/loki-stack

kubectl delete all --all -n todo-project

kubectl apply -f manifests/namespace.yaml
kubectl apply -f manifests/persistentvolume.yaml # for image
kubectl apply -f manifests/persistentvolumeclaim.yaml

kubectl apply -f manifests/db
# kubectl apply -f manifests/todoapp