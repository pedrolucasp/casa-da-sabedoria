class Api::Internal::AuthorsController < ApplicationController
  def index
    @authors = Author.all.order(:name)

    render json: { authors: @authors }
  end

  def create
    @author = Author.new(author_params)

    if @author.save
      render json: { author: @author }
    else
      render json: { error: @author.errors.full_messages }, status: :unprocessable_content
    end
  end

  private

  def author_params
    params.require(:author).permit(:name, :location)
  end
end
