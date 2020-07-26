This is an example showing how to deliver a Looker SSO embed signature into the dom on load for the dashboard to pick it up. After that dashboard is loaded, this example has several dashboards that load on scroll.

to use 

```
git clone git@github.com:bryan-at-looker/embed-dashboard-on-load-and-scroll-example.git
cd embed-dashboard-on-load-and-scroll-example
mv .env.example .env
```

- update .env file to include your SSO Embed Signature and host name
- update config/demo.json to include your dashboard id and host name ( same as in .env but with https://)
- update config/user.json for your embed user values. make sure you update the models property to include your model


```
yarn install
yarn dev
```