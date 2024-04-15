Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
      if Rails.env.production?
        origins 'castnxtspring.herokuapp.com'  # Domain when deployed to production
      else
        origins '127.0.0.1:3000'  # Domains used in development
      end
  
      resource '*',
        headers: :any,
        methods: [:get, :post, :put, :delete, :options, :head],
        credentials: false
    end
  end
  