# Migraciones

Este proyecto utiliza **TypeORM** para manejar las migraciones de base de datos.

Para ejecutar las migraciones y aplicar los cambios pendientes en la base de datos:

```bash
npm run migration:run
```

Para generar un nuevo archivo de migración automáticamente:

```bash
npm run migration:generate --name=create_table_users
```


