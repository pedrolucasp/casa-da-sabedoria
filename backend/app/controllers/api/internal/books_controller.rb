class Api::Internal::BooksController < ApplicationController
  def create
    service = Books::Create.new(params: book_params, user: current_user)

    if service.call
      render json: service.book.as_json(
        include: [:authors, :publisher, :genres]
      ), status: :created
    else
      render json: { errors: service.errors.full_messages },
        status: :unprocessable_content
    end
  end

  private

  def book_params
    params.require(:book)
      .permit(
        :title,
        :description,
        :year,
        :publisher_id,
        shelf_ids: [],
        genre_ids: [],
        author_ids: []
      )
  end
end
