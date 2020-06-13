FROM ruby:2.5.1

ENV APP="/docker_example_for_chat-space" \
  CONTAINER_ROOT="./" \
  NOKOGIRI_OPTION="--use-system-libraries \
  --with-xml2-config=/usr/bin/xml2-config \
  --with-xslt-config=/usr/bin/xslt-config" \
  MYSQL_PORT=4306 \
  SERVER_PORT=4000

# 必要なパッケージのインストール（基本的に必要になってくるものだと思うので削らないこと）
RUN apt-get update -qq && \
  apt-get install -y --no-install-recommends \
  build-essential \
  libpq-dev \
  libfontconfig1 && \
  rm -rf /var/lib/apt/lists/*

WORKDIR $APP

COPY Gemfile Gemfile.lock $CONTAINER_ROOT
RUN bundle config build.nokogiri --use-system-libraries
ENV RAILS_SERVE_STATIC_FILES=true \
  PORT=$SERVER_PORT \
  TERM=xterm
ENTRYPOINT [ \
  "prehook", "ruby -v", "--", \
  "prehook", "bundle install -j3 --quiet --path vendor/bundle", "--", \
  "prehook", "npm install --no-optional", "--", \
  "prehook", "bower install --allow-root", "--", \
  "prehook", "sh docker/xvfb.sh", "--", \
  "prehook", "ruby docker/setup.rb", "--"]

EXPOSE $SERVER_PORT
EXPOSE $MYSQL_PORT
