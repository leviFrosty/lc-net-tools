# Quick Example Configurations

## Juniper

These configurations are only for reference. Use these at your own risk.

### Log in to Device via Terminal

```
test devices: 10.10.10.170 (vm)
ssh root@10.10.10.170
password:

192.168.50.40 (pps)
ssh lightch@192.168.50.40
password: ITGlue
```

### Disable and enable interface

```
cli // Must go into CLI before config mode

edit
set interfaces lo0 unit 1 disable
commit


edit
delete interfaces lo0 unit 1 disable
commit
```

### Show command logs

```
cli
show log interactive-commands
```

### Set interface description

```
edit
set interfaces lo0 description TEST_DESCRIPTION_1
```
