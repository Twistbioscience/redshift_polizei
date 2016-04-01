FROM ruby

ADD . /apps/polizei

WORKDIR /apps/polizei
RUN bundle config

# ADD config/database.sample.yml /apps/polizei/config/database.yml
# ADD config/polizei.sample.yml /apps/polizei/config/polizei.yml

CMD ["bundle", "exec", "rackup", "--host", "0.0.0.0", "-p", "5000"]
CMD ['shotgun',  "--host", "0.0.0.0"]
