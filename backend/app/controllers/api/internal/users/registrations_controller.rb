module Api
  module Internal
    module Users
      class RegistrationsController < Devise::RegistrationsController
        respond_to :json

        private

        def respond_with(resource, opts = {})
          if resource.persisted?
            render json: {
              message: "Signed up fine!",
              user: resource
            }, status: :created
          else
            render json: {
              errors: resource.errors.full_messages
            }, status: :unprocessable_entity
          end
        end
      end
    end
  end
end
