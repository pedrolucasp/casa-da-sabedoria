# syntax=docker/dockerfile:1
# check=error=true

# This is a rip-off from the original generated Dockerfile, generated for a
# production environment
ARG RUBY_VERSION=3.4.4
FROM ruby:3.4.4-alpine3.22 AS base

# Rails app lives here
WORKDIR /backend

# Install base packages
RUN apk add -U --no-cache build-base bash postgresql-dev tzdata \
	shared-mime-info gcompat less curl yarn nodejs git yaml-dev shadow

# Set production environment
ENV RAILS_ENV="development" \
    BUNDLE_PATH="/usr/local/bundle" \
    BUNDLE_WITHOUT="production"

# Throw-away build stage to reduce size of final image
FROM base AS build

# Install application gems with a bunch of optimizations for size, blah blah blah
COPY Gemfile Gemfile.lock ./
RUN bundle install && \
    rm -rf ~/.bundle/ "${BUNDLE_PATH}"/ruby/*/cache "${BUNDLE_PATH}"/ruby/*/bundler/gems/*/.git && \
    bundle exec bootsnap precompile --gemfile

# Copy application code
COPY . .

# Precompile bootsnap code for faster boot times
RUN bundle exec bootsnap precompile app/ lib/

# Final stage for app image
FROM base

# Copy built artifacts: gems, application
COPY --from=build "${BUNDLE_PATH}" "${BUNDLE_PATH}"
COPY --from=build /backend /backend

# Run and own only the runtime files as a non-root user for security
RUN groupadd --system --gid 1000 rails && \
    useradd rails --uid 1000 --gid 1000 --create-home --shell /bin/bash && \
    chown -R rails:rails .
USER 1000:1000

EXPOSE 3000
CMD ["bundle", "exec", "rails", "server", "-b 0.0.0.0"]
