$: << File.join(File.dirname(__FILE__), 'app')

require 'bundler'
Bundler.require
require './app/app'

# activerecord tasks
require "sinatra/activerecord/rake"
namespace :db do
  task :load_config do
    require "./app/app"
  end
end

namespace :redshift do
  namespace :auditlog do
    desc 'Import audit log files into polizei'
    task :auditlog_import do
      Tasks::AuditLog.update_from_s3
    end

    desc 'Discard old audit log entries'
    task :auditlog_retention do
      Tasks::AuditLog.new.enforce_retention_period
    end
  end

  namespace :tablereport do
    desc 'Update tables report'
    task :update do
      Reports::Table.new.run
    end
  end
end
