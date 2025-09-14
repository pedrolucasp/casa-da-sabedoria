class Api::Internal::GenresController < ApplicationController
  def index
    @genres = Genre.all.order(:name)

    render json: { genres: @genres }
  end

  def create
    @genre = Genre.new(genre_params)

    if @genre.save
      render json: { genre: @genre }
    else
      render json: { error: @genre.errors.full_messages }, status: :unprocessable_content
    end
  end

  private

  def genre_params
    params.require(:genre).permit(:name)
  end
end
