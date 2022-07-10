### Steps

1. Run scripts provided in init.sh (make changes as needed). These include scripts necessary for deploying db and app, as well as Prometheus and loki.

2. Once Prometheus stack is up and port-forwarding has been done (look from init.sh), you can access Grafana from http://localhost:3000. Then provide admin / prom-operator as credentials.

3. Configure Grafana to display logs collected by Loki, running in port 3100. This can be done by going to the settings and selecting Data Source > Add data source. Choose Loki and then insert the correct URL. Since the namespace is loki-stack and the name of the service loki, the url would be: http://loki.loki-stack:3100.

4. Go to Explore tab to explore the data.

### Disclaimer

Not sure why, but running all the scripts in init.sh would often result with the error "Unable to connect to the server: net/http: TLS handshake timeout". Therefore it is not easy to test 2.10 in actual Grafana environment.