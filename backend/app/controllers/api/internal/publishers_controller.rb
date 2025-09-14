class Api::Internal::PublishersController < ApplicationController
  def index
    @publishers = Publisher.all.order(:name)

    render json: { publishers: @publishers }
  end

  def create
    @publisher = Publisher.new(publisher_params)

    if @publisher.save
      render json: { publisher: @publisher }
    else
      render json: {
        error: @publisher.errors.full_messages
      }, status: :unprocessable_content
    end
  end

  private

  def publisher_params
    params.require(:publisher).permit(:name, :location)
  end
end
