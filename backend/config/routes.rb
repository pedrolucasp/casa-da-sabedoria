Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  devise_for :users, path: "api/internal/users", defaults: { format: :json },
    controllers: {
      registrations: "api/internal/users/registrations",
      sessions: "api/internal/users/sessions"
    }


  #namespace :api do
  #  namespace :internal do
  #  end
  #end
end
