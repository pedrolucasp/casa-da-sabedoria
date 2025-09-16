class Api::V1::BooksController < ApplicationController
  def show
    @book = Book
      .includes(:genres, :authors)
      .find_by(id: params[:id])

    if @book
      render json: ::BookSerializer.new(@book, view: :show, root: :book)
    else
      render json: { error: "Book not found" }, status: :not_found
    end
  end
end
