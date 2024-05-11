# The command below will create some DB in the local environment when working with Docker:
docker run --name some-postgres -e POSTGRES_PASSWORD=pass1234 -p 5432:5432 -d postgres
# You should then run the following command to create the DB with the relevant prisma schemas:
npx prisma migrate dev
# Then run postgraphile:
/bin/bash src/db/run.bash