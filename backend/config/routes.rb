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


  namespace :api do
   namespace :internal do
     resources :users, only: [:show, :update] do
       get "me", on: :collection, action: :me
     end

     resources :shops, only: [:index, :create, :destroy, :show, :update] do
       get "mine", on: :collection, action: :mine
     end

     resources :shelves, only: [:index, :create, :destroy] do
       get "mine", on: :collection, action: :mine
     end

     resources :authors, only: [:index, :create]
     resources :publishers, only: [:index, :create]
     resources :genres, only: [:index, :create]
   end
  end
end
