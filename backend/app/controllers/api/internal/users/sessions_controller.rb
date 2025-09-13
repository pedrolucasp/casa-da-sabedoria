# app/controllers/api/internal/users/sessions_controller.rb
module Api
  module Internal
    module Users
      class SessionsController < Devise::SessionsController
        respond_to :json

        private

        def respond_with(resource, _opts = {})
          render json: {
            message: "Logged in successfully.",
            user: resource
          }, status: :ok
        end

        def respond_to_on_destroy
          head :no_content
        end
      end
    end
  end
end
