# Log output application

### Exercise 1.07

To get the desired results, run the following commands:
```
$ k3d cluster create --port 8082:30080@agent:0 -p 8081:80@loadbalancer --agents 2
$ kubectl apply -f manifests/
```

If all goes well, the generated random string should be visible when visiting http://localhost:8081/.
Logs can also be viewed with the command `kubectl logs <pod-name>`.