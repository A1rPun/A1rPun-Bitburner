# Bitburner

WIP

### Script info

- fib.js, the attack program that runs remotely
- penhack.js, penetration hack
- krakaboom.js, initialize hack on all servers, uses penhack and the attack program

- hacknet.js, auto buy nodes
- infosec.js, see info about servers
- servers.js, auto buy servers

### Usage

Copy and paste the scripts into the game

```
[home ~/]> nano fib.js
[home ~/]> nano penhack.js
[home ~/]> nano krakaboom.js
```

Initialize hack

```
[home ~/]> run krakaboom.js
```

### Alias

```
alias nodes="kill hacknet.js; run hacknet.js"
alias krakaboom="run krakaboom.js"
alias info="run infosec.js"
alias bs="run servers.js"
alias hop="run hop.js"
alias lb="buy -l"
```
