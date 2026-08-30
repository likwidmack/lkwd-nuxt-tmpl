# Optional overlays

These packs live in-repo but stay **off by default**. Enable only when a project needs them — see each guide under [`docs/overlays/`](../docs/overlays/).

| Overlay                     | Guide                                                           | Stub / fragments                             |
| --------------------------- | --------------------------------------------------------------- | -------------------------------------------- |
| PrimeVue                    | [primevue.md](../docs/overlays/primevue.md)                     | [primevue/](./primevue/)                     |
| Content + Image + i18n      | [content-image-i18n.md](../docs/overlays/content-image-i18n.md) | [content-image-i18n/](./content-image-i18n/) |
| PWA                         | [pwa.md](../docs/overlays/pwa.md)                               | [pwa/](./pwa/)                               |
| AWS (primary deploy recipe) | [aws.md](../docs/overlays/aws.md)                               | [aws/](./aws/)                               |
| Docker                      | [docker.md](../docs/overlays/docker.md)                         | [docker/](./docker/)                         |

Do not add these modules to `nuxt.config.ts` until dependencies are installed and the overlay guide is followed.
