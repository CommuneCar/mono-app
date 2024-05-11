# Local postgres DB deployment
In order to avoid cases where code mistakes end up corrupting the DB, you can work (and normally should) work with a dev DB. Since we're working with prisma, setting up a local development DB is quite simple.

## Prerequisites
Either have `Docker` installed or `pg` installed on your computer. This guide refers to Docker specifically on mac, if you need a solution for PC / with pg, ask GPT to translate the commands in the bash files.

## First time
In order to create a DB that you can play around with, you can execute the local.bash file. This will also run the run.bash script which starts a postgraphile GraphQL on top of the DB.

Open your terminal in the directory of this project, then execute the local.bash script:
```bash
$ /bin/bash /deployment/db/local.bash 
```

You can then go ahead to the URL from the CLI (normally localhost:5000/graphiql) and access the GraphQL layer on top of your newly created DB. If everything seems alright, feel free to close it (CTRL + C) and head over to app/README.md.

## Once the DB is initialized
You should probably head over to app/README.md and just execute the BE. But if for some reason you want to run postgraphile without the BE, you can open your terminal in the directory of this project, then execute the local.bash script:
```bash
$ /bin/bash /deployment/db/run.bash 
```
