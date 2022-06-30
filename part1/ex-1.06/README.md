## Simple Node Express web server

To get the application quickly up and running, run the following commands:

```
$ k3d cluster create --port 8082:30080@agent:0 -p 8081:80@loadbalancer --agents 2
$ kubectl apply -f manifests/
```

Test that the application works in http://localhost:8082.