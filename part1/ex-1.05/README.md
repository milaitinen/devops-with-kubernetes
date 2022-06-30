## Simple Node Express web server

To get the application quickly up and running, run the following command:
`$ kubectl apply -f manifests/deployment.yaml`

Once the container is running in kubernetes, connect local port to the pod by running (e.g.) the following command:
`kubectl port-forward <pod-name> 3003:3000`

Verify that the connection works by visiting http://localhost:3003/.