# gRPC microservices lab
## Start REST API architecture
```sh
docker-compose -f rest-bff/docker-compose.yml  up --build --remove-orphans
```

## Start gRPC API architecture
```sh
docker-compose -f grpc-bff/docker-compose.yml  up --build --remove-orphans
```

## BFF endpoints(gRPC and REST)
- [BFF swagger UI](http://localhost/bff/api-docs)
- [BFF get all users](http://localhost/bff/users/all)

## REST API endpoints
##### Users API
- [Users swagger UI](http://localhost/api/users/api-docs)
- [get users](http://localhost/api/users)
##### Skills API
- [Skills swagger UI](http://localhost/api/skills/api-docs)
- [get userid=1 skills](http://localhost/api/skills/1)
##### Roles API
- [Roles swagger UI](http://localhost/api/auth/api-docs)
- [get userid=1 roles](http://localhost/api/auth/roles/1)
##### Education API
- [Education swagger UI](http://localhost/api/education/api-docs)
- [get userid=1 education](http://localhost/api/education/1)
