Freeswitch behind ngrok
=======================

__UNFINISHED!!!__

Attempt to run freeswitch WSS behind ngrok in order to setup development
environment

```bash
curl $(docker-compose port ngrok 4040)/api/tunnels
```

```bash
curl --silent $(docker-compose port ngrok 4040)/api/tunnels | jq ".tunnels | .[].public_url " | grep https
```
