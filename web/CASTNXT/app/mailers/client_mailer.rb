# app/mailers/client_mailer.rb

class ClientMailer < ActionMailer::Base
    default from: 'castnxt@gmail.com' # TODO: creare gmail account for this
  
    def deck_update_email(client)
      @client = client
      mail(to: @client.email, subject: 'Deck Update Notification')
    end
  end
  