# Steps

- Create a project, e.g. dwk-gke in Google Kubernetes Engine (GKE)
- Install Google Cloud SDK (gloud)
- Login to GKE with `$ gcloud auth login`
- Set project with the `$ gcloud config set project <project_id>`. Project id can be found by listing existing projects with the command `$ gcloud projects list`.

Set up cluster:
- Enable the service container.googleapis.com: `$ gcloud services enable container.googleapis.com`
- `$ gcloud container clusters create dwk-cluster --zone=europe-north1-b --cluster-version=1.22` (euro-north1-b -> Finland, cluster-version=1.22 -> GKE version)

This sets up kubeconfig to point to the given cluster. However, if you need to redo it again in the future it can be completed with the following command:
`$ gcloud container clusters get-credentials dwk-cluster --zone=europe-north1-b`

Cluster info can be checked with `$ kubectl cluster-info` that it is indeed pointing to the right direction.

Once the cluster is up, you can deploy the resources in manifests using the usual `$ kubectl apply -f manifests/...`. Fetch the external IP for load balancer with `$ kubectl get svc -n applications` and check that the desired output is there by visiting http://<ip_address>.

## Tips

Deleting clusters:
`$ gcloud container clusters delete dwk-cluster --zone=europe-north1-b`

Resuming a cluster:
`$ gcloud container clusters create dwk-cluster --zone=europe-north1-b --cluster-version=1.22`