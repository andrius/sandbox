dot-env substitution test with docker
=====================================

`.env` normally containing key-value pair and these variables cannot be
substituted.

In given example the `.env` file:

```bash
VALUE1=abcd
VALUE2=${VALUE1}
VALUE3=${VALUE1:-defg}
```

were expected to be rendered as a:

```bash
VALUE1=abcd
VALUE2=abcd
VALUE3=abcd
```

but no way, we get following by executing `docker-compose run --rm blah env`:

```bash
VALUE1=abcd
VALUE2=${VALUE1}
VALUE3=${VALUE1:-defg}
```

And `docker-compose config` output is following:

```yaml
services:
  blah:
    environment:
      VALUE1: abcd
      VALUE2: $${VALUE1}
      VALUE3: $${VALUE1:-defg}
    image: alpine
    network_mode: none
version: '3.7'
```

## References

https://vsupalov.com/docker-arg-env-variable-guide/
https://docs.docker.com/compose/environment-variables/
