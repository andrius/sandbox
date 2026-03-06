FROM crystallang/crystal:1.19

WORKDIR /app

COPY shard.yml ./
COPY src ./src
COPY examples ./examples

# No external shards yet, but this keeps the container flow
# aligned with future dependency additions.
RUN shards install

CMD ["crystal", "run", "examples/counter.cr"]
