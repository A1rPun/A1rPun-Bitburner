# Bitburner

WIP

### Script info

- fib.js, the attack program that runs remotely
- penhack.js, penetration hack
- krakaboom.js, initialize hack on all servers, uses penhack and the attack program
- hacknet.js, auto buy nodes
- infosec.js, see info about servers
- purchase-server.js, auto buy servers
- factions.js, backdoor known servers

### Usage

- Copy and paste the scripts into the game
- Initialize hack with alias

```
[home ~/]> krakaboom
```

### Alias

```
alias nodes="kill hacknet.js; run hacknet.js"
alias bs="kill purchase-server.js; run purchase-server.js"
alias krakaboom="run krakaboom.js"
alias info="run infosec.js"
alias hop="run util/hop.js"
alias lb="buy -l"
```

### TODO

- copy this repository script
- purchase-server.js - automate server purchase and deletion
- hacknet.js - purchase cheapest upgrade first
- run all scripts with one command
