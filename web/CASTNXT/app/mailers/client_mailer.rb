# app/mailers/client_mailer.rb

class ClientMailer < ActionMailer::Base
    default from: 'notifications@castnxt.com'
  
    def deck_update_email(client)
      @client = client
      mail(to: @client.email, subject: 'Deck Update Notification')
    end
  end
  