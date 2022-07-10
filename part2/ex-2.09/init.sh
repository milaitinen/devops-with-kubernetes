#!/bin/bash

# k3d cluster delete
# k3d cluster create --port 8082:30080@agent:0 -p 8081:80@loadbalancer --agents 2
kubectl delete all --all -n todo-project

kubectl apply -f manifests/namespace.yaml
kubectl apply -f manifests/persistentvolume.yaml # for image
kubectl apply -f manifests/persistentvolumeclaim.yaml

kubectl apply -f manifests/db
kubectl apply -f manifests/todoapp