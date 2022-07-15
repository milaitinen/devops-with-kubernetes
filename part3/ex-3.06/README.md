# Exercise 3.06: DBaaS vs DIY

### DBaaS

- Easier to manage as you can offload core maintenance to the service provider (db/software upgrade, security, backups, availability, etc.)
- Monitoring made easier with out-of-the-box solutions and alarms
- More time for the developers to focus on their core products -> time is money!
- Networking may be a little more complicated as opposed to DIY databases (configuring access rights, proxies, etc.)
- Can become costly if not careful with configuration - e.g. RDS is one of the most expensive services in AWS
- There is always the small risk that the service provider will close their business at some point in the future

### DIY

- Most likely cheaper to implement in terms of service cost than DBaaS. However, more time-consuming to develop and manage.
- Highly customizable/configurable, giving a lot of freedom to the developer(s)
- Requires good knowledge of db configuration/management and networking
- Maintenance can become expensive if there is fast rotation within the team
- Logging/monitoring more challenging

## Conclusion

When deciding which solution to choose, it is important to consider the likely lifespan of the software in question as well as potential hidden costs. While DIY solution may be cheap in terms of hardware/service costs, it must be noted that if the team does not consist of experienced developers with the necessary skills, the entire cost of planning/training/integration/maintenance can become a lot larger than initially assumed. Such may not be the issue when the project is one man's solo project, but if it is known that the project (and the team) will grow, a self-managed db can become too complex in the future. 

For reference, below is a brief estimate of pricing when provisioning Google Cloud SQL vs. DIY DB container. Note that this is purely based on Google's service costs and ignores all other development costs.

- Google Cloud SQL: 1 instance of Cloud SQL with instance type of standard level (vCPUs: 2, RAM: 7.5GB) and storage of 10GiB -> about 220$/month
- GKE Kubernetes Engine (DIY): 1-3 nodes with standard instance type (vCPUs: 2, RAM: 7.5GB) and some storage -> about 60-180$/month
