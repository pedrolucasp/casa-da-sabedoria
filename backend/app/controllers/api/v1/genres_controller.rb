class Api::V1::GenresController < ApplicationController
  def index
    @genres = Genre.all.order(:name)

    render json: { genres: @genres }
  end
end
